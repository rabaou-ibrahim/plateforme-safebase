const { exec } = require('child_process');
const fs = require('fs');

function restoreDatabase() {
  const dumpFile = './backup/dump.sql';

  if (!fs.existsSync(dumpFile)) {
    console.error('Le fichier de dump n’existe pas.');
    return;
  }

  const command = `mysql -u root -p nom_de_ta_base < ${dumpFile}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de la restauration : ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Erreur : ${stderr}`);
      return;
    }
    console.log('Restauration de la base de données réussie.');
  });
}

restoreDatabase();
