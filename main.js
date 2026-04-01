// Carrega as variáveis de ambiente do arquivo .env (como DB_HOST, DB_USER, etc.)
// Deve ser a primeira linha do arquivo para garantir que as variáveis estejam disponíveis em todo o projeto
require('dotenv').config();

// Importa os módulos principais do Electron:
// - app: controla o ciclo de vida da aplicação
// - BrowserWindow: cria e gerencia janelas do aplicativo
// - ipcMain: permite comunicação entre o processo principal (main.js) e a interface (index.html)
const { app, BrowserWindow, ipcMain } = require('electron');

// Importa a função de conexão com o banco de dados
const { getConnection } = require('./src/database/connection');

// Função responsável por criar a janela principal da aplicação
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Permite usar require() dentro do index.html (necessário para usar ipcRenderer)
      nodeIntegration: true,
      // Desativa o isolamento de contexto para permitir comunicação direta com o Node.js
      contextIsolation: false
    }
  });

  // Carrega o arquivo HTML que será exibido na janela
 win.loadFile('src/pages/index.html')

  // Handler: retorna o nome do banco de dados conectado
  // Chamado pelo index.html via ipcRenderer.invoke('get-database')
  ipcMain.handle('get-database', async () => {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT DATABASE() as banco');
    await conn.end(); // Fecha a conexão após o uso
    return rows[0].banco;
  });

  // Handler: insere um usuário de teste na tabela user
  // Chamado pelo index.html via ipcRenderer.invoke('inserir-user')
  ipcMain.handle('inserir-user', async () => {
    const conn = await getConnection();
    // Usa placeholders (?) para evitar SQL Injection
    await conn.execute(
      'INSERT INTO user (nome, login, senha, nivel_acesso) VALUES (?, ?, ?, ?)',
      ['Bruno Teste', 'bruno', '123456', 'admin']
    );
    await conn.end();
  });

  // Handler: busca e retorna todos os usuários da tabela user
  // Chamado pelo index.html via ipcRenderer.invoke('listar-users')
  ipcMain.handle('listar-users', async () => {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM user');
    await conn.end();
    return rows; // Retorna um array com todos os usuários
  });
}

// Inicia a aplicação assim que o Electron estiver pronto
app.whenReady().then(createWindow);
