const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('vkteplice', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Definice modelu pro klub
const Klub = sequelize.define('klub', {
  id_klub: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  jmeno: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  icona: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
});

// Definice modelu pro kategorie
const Kategorie = sequelize.define('kategorie', {
  id_kategorie: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nazev: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  poradi: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  universal_ano: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
});

// Definice modelu pro universal
const Universal = sequelize.define('universal', {
  id_universal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_kategorie: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  obsah: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
});
// Definice modelu pro sponzor
const Sponzor = sequelize.define('sponzor', {
  id_sponzor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  odkaz: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
});

// Definice modelu pro pohlavi
const Pohlavi = sequelize.define('pohlavi', {
  id_pohlavi: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nazev: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

// Definice modelu pro tag
const Tag = sequelize.define('tag', {
  id_tag: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nazev: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

// Definice modelu pro tym
const Tym = sequelize.define('tym', {
  id_tym: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING(64),
    allowNull: true,
  },
  popisek: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
});

// Definice modelu pro prispevek
const Prispevek = sequelize.define('prispevek', {
  id_prispevek: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nadpis: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  popisek: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  cas_pridani: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
});

// Definice modelu pro tags
const Tagy = sequelize.define('tagy', {
  id_tagy: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

// Definice modelu pro sit
const Sit = sequelize.define('sit', {
  id_sit: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  odkaz: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
});

// Definice vztahů mezi modely
Kategorie.belongsTo(Klub, { foreignKey: 'id_klub', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' });
Universal.belongsTo(Kategorie, { foreignKey: 'id_kategorie', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' });
Sponzor.belongsTo(Klub, { foreignKey: 'id_klub', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' });
Tag.belongsTo(Pohlavi, { foreignKey: 'id_pohlavi', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' });
Tym.belongsTo(Tag, { foreignKey: 'id_tag', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' });
Tagy.belongsTo(Tag, { foreignKey: 'id_tag', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' });
Tagy.belongsTo(Prispevek, { foreignKey: 'id_prispevek', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' });
Sit.belongsTo(Klub, { foreignKey: 'id_klub', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' });


// Synchronizace s databází
sequelize.sync({ force: true }) // force: true vymaže stávající tabulky (používat opatrně)
  .then(() => {
    console.log('Databáze synchronizována.');
  })
  .catch((err) => {
    console.error('Chyba při synchronizaci databáze:', err);
  });

  

sequelize.authenticate()
module.exports = sequelize;