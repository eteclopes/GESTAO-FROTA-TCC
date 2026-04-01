# 🚗 Gestão de Frotas TCC

Sistema desktop de gestão de frotas desenvolvido com Electron + Node.js + MySQL.

---

## 📋 Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [MySQL](https://dev.mysql.com/downloads/mysql/) (versão 8 ou superior)
- [Git](https://git-scm.com/)

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone <url-do-repositório>
cd Gestao_de_frotas_tcc
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar o banco de dados

Abra o terminal do MySQL e execute:

```sql
CREATE DATABASE gestao_frota;
USE gestao_frota;
SOURCE C:/caminho/completo/ate/Gestao_de_frotas_tcc/database/gestao_frota_final.sql;
```

> Substitua o caminho pelo caminho real do projeto no seu computador.

### 4. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=gestao_frota
```

> ⚠️ O arquivo `.env` nunca deve ser commitado no repositório pois contém dados sensíveis.

### 5. Testar a conexão com o banco

```bash
node src/database/test.js
```

Se aparecer ✅ **Conectado ao MySQL com sucesso!** pode seguir para o próximo passo.

### 6. Rodar o projeto

```bash
npm start
```

---

## 📁 Estrutura do projeto

```
Gestao_de_frotas_tcc/
├── main.js                          # Processo principal do Electron
├── .env                             # Variáveis de ambiente (não commitado)
├── .gitignore                       # Arquivos ignorados pelo Git
├── package.json                     # Dependências e scripts do projeto
├── README.md                        # Documentação do projeto
├── database/
│   └── gestao_frota_final.sql       # Dump do banco de dados
└── src/
    ├── database/
    │   ├── connection.js            # Configuração da conexão com o MySQL
    │   └── test.js                  # Script para testar a conexão
    └── pages/
        └── index.html               # Interface gráfica da aplicação
```

---

## 🧭 Guia de Navegação do Código

> Use este guia para saber exatamente onde mexer quando precisar implementar algo novo.

### 🔌 Quero mexer na conexão com o banco de dados
**Arquivo:** `src/database/connection.js`
Configure host, usuário, senha e nome do banco. As credenciais vêm do `.env`.

---

### 🖥️ Quero criar ou editar uma tela
**Arquivo:** `src/pages/index.html` (ou criar novos arquivos em `src/pages/`)
Toda a interface visual fica aqui. Para criar uma nova tela, adicione um novo `.html` em `src/pages/`.

---

### ⚙️ Quero criar uma nova função que acessa o banco
**Arquivo:** `main.js`
Adicione um novo `ipcMain.handle('nome-da-funcao', async () => { ... })`.
Na tela, chame com `ipcRenderer.invoke('nome-da-funcao')`.

---

### 🗄️ Quero alterar a estrutura do banco de dados
**Arquivo:** `database/gestao_frota_final.sql`
Após alterar o banco localmente, atualize o dump com:
```bash
mysqldump -u root -p gestao_frota > database/gestao_frota_final.sql
```
Depois commite o arquivo atualizado.

---

### 📦 Quero adicionar uma nova biblioteca
```bash
npm install nome-da-biblioteca
```
O `package.json` é atualizado automaticamente. Commite ele após instalar.

---

> ✏️ **Para o time:** sempre que implementar uma funcionalidade nova, adicione ela aqui neste guia indicando o arquivo responsável.

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Função |
|---|---|
| [Electron](https://www.electronjs.org/) | Framework para aplicações desktop |
| [Node.js](https://nodejs.org/) | Ambiente de execução JavaScript |
| [MySQL](https://www.mysql.com/) | Banco de dados relacional |
| [mysql2](https://www.npmjs.com/package/mysql2) | Driver de conexão com o MySQL |
| [dotenv](https://www.npmjs.com/package/dotenv) | Gerenciamento de variáveis de ambiente |

---

## 👥 Como contribuir (trabalho em equipe)

### Fluxo de trabalho com Git

```bash
# Sempre antes de começar a trabalhar, atualize sua branch
git pull origin main

# Crie uma branch para sua funcionalidade
git checkout -b minha-funcionalidade

# Após desenvolver, commite e envie
git add .
git commit -m "descrição do que foi feito"
git push origin minha-funcionalidade
```

### ⚠️ Atenção

- **Nunca** commite o arquivo `.env`
- **Sempre** atualize o `gestao_frota_final.sql` se alterar a estrutura do banco
- **Sempre** rode `npm install` após clonar ou ao puxar atualizações que alterem o `package.json`
- **Sempre** atualize o Guia de Navegação ao criar novas funcionalidades

---

## ❓ Problemas comuns

**Erro `ECONNREFUSED` ao conectar no banco**
→ O MySQL não está rodando. Inicie o serviço do MySQL.

**Erro `ER_ACCESS_DENIED_ERROR`**
→ Usuário ou senha incorretos no `.env`.

**Erro `ER_BAD_DB_ERROR`**
→ O banco de dados não foi criado. Execute o passo 3 novamente.

**Tela em branco ao abrir o Electron**
→ Verifique se o arquivo `index.html` existe em `src/pages/`.

https://claude.ai/share/6b6d739f-07eb-4ed1-ba57-83f1f600edd5
