const mysqldump = require('mysqldump');


async function dumpDatabase() {
  try {
    await mysqldump({
      connection: {
        host: 'localhost',  
        user: 'root',       
        password: '',       
        database: 'plateforme_safe_base',
      },
      dumpToFile: './backup/dump.sql',
    });
    console.log('Dump de la base de données effectué avec succès.');
  } catch (error) {
    console.error('Erreur lors du dump de la base de données :', error);
  }
}

dumpDatabase();
