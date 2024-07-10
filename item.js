const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./connection');

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
}, {freezeTableName: true,});

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
  href: {
    type: DataTypes.STRING(64),
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
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {freezeTableName: true,});

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
    type: DataTypes.STRING(1024),
    allowNull: true,
  },
}, {freezeTableName: true,});

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
}, {freezeTableName: true,});

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
    unique: true,
  },
}, {freezeTableName: true,});

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
}, {freezeTableName: true,});

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
}, {freezeTableName: true,});

const Tags = sequelize.define('tags', {
  id_tags: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
}, {freezeTableName: true,});

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
}, {freezeTableName: true,});

const Img = sequelize.define('img', {
  id_img: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
}, {freezeTableName: true,});

const Akce = sequelize.define('akce', {
  id_akce: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nazev: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  konec: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {freezeTableName: true,});

const AkceTag = sequelize.define('akceTag', {
  id_akceTag: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_akce: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_tag: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {freezeTableName: true,});

Img.belongsTo(Prispevek, { foreignKey: 'id_prispevek', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' });
Kategorie.belongsTo(Klub, { foreignKey: 'id_klub', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' });
Universal.belongsTo(Kategorie, { foreignKey: 'id_kategorie', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' });
Sponzor.belongsTo(Klub, { foreignKey: 'id_klub', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' });
Tym.belongsTo(Tag, { foreignKey: 'id_tag', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' });
Tym.belongsTo(Klub, { foreignKey: 'id_klub', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' });
Tags.belongsTo(Tag, { foreignKey: 'id_tag', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' });
Tags.belongsTo(Prispevek, { foreignKey: 'id_prispevek', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' });
Sit.belongsTo(Klub, { foreignKey: 'id_klub', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' });
Prispevek.hasMany(Img, { foreignKey: 'id_prispevek', as: 'imgs'});
Prispevek.belongsToMany(Tag, { through: 'Tags', foreignKey: 'id_prispevek' });
Tag.belongsToMany(Prispevek, { through: 'Tags', foreignKey: 'id_tag' });
Akce.belongsToMany(Tag, { through: 'AkceTag', foreignKey: 'id_akce' });
Tag.belongsToMany(Akce, { through: 'AkceTag', foreignKey: 'id_tag' });
Kategorie.hasOne(Universal, { foreignKey: 'id_kategorie' });


sequelize.sync();

module.exports = {
  Klub,
  Kategorie,
  Universal,
  Sponzor,
  Tag,
  Tym,
  Prispevek,
  Tags,
  Sit,
  Img,
  Akce,
  AkceTag
};