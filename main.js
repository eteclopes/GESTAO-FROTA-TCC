require('dotenv').config();
const { app, BrowserWindow, ipcMain } = require('electron');
const { getConnection } = require('./src/database/connection');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');

  ipcMain.handle('get-database', async () => {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT DATABASE() as banco');
    await conn.end();
    return rows[0].banco;
  });

  ipcMain.handle('inserir-user', async () => {
    const conn = await getConnection();
    await conn.execute(
      'INSERT INTO user (nome, login, senha, nivel_acesso) VALUES (?, ?, ?, ?)',
      ['Bruno Teste', 'bruno', '123456', 'admin']
    );
    await conn.end();
  });

  ipcMain.handle('listar-users', async () => {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM user');
    await conn.end();
    return rows;
  });
}

app.whenReady().then(createWindow);