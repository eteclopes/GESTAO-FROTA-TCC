require('dotenv').config();
require('electron-reload')(__dirname, {
  ignored: /node_modules/
});

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

  win.loadFile('src/pages/index.html');

  ipcMain.handle('fazer-login', async (event, { login, senha }) => {
    const conn = await getConnection();
    const [rows] = await conn.execute(
      'SELECT * FROM user WHERE login = ? AND senha = ? AND ativo = 1',
      [login, senha]
    );
    await conn.end();

    if (rows.length > 0) {
      return { sucesso: true, usuario: rows[0] };
    } else {
      return { sucesso: false };
    }
  });
}

app.whenReady().then(createWindow);