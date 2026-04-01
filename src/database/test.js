const { getConnection } = require('./connection');

async function testar() {
  try {
    const conn = await getConnection();
    console.log('✅ Conectado ao MySQL com sucesso!');
    await conn.end();
  } catch (err) {
    console.error('❌ Erro ao conectar:');
    console.error('Código:', err.code);
    console.error('Mensagem:', err.message);
    console.error('SQL State:', err.sqlState);
    console.error(err); // erro completo
  }
}

testar();