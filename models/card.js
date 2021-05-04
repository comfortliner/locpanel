'use strict';

module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    extidroom: {
      field: 'extidroom',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    isActive: {
      field: 'isActive',
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 'true'
    },
    isAdmin: {
      field: 'isAdmin',
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 'false'
    },
    KID: {
      field: 'KID',
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      field: 'text',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    x: {
      field: 'x',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 300
    },
    y: {
      field: 'y',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 300
    },
    x2: {
      field: 'x2',
      type: DataTypes.FLOAT,
      allowNull: true
    },
    y2: {
      field: 'y2',
      type: DataTypes.FLOAT,
      allowNull: true
    },
    x3: {
      field: 'x3',
      type: DataTypes.FLOAT,
      allowNull: true
    },
    y3: {
      field: 'y3',
      type: DataTypes.FLOAT,
      allowNull: true
    },
    x4: {
      field: 'x4',
      type: DataTypes.FLOAT,
      allowNull: true
    },
    y4: {
      field: 'y4',
      type: DataTypes.FLOAT,
      allowNull: true
    },
    x5: {
      field: 'x5',
      type: DataTypes.FLOAT,
      allowNull: true
    },
    y5: {
      field: 'y5',
      type: DataTypes.FLOAT,
      allowNull: true
    },
    rot: {
      field: 'rot',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    colour: {
      field: 'colour',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'white'
    }
  }, {
    freezeTableName: true,
    tableName: 'tbllocpanelcards',
    timestamps: false
  });

  Card.associate = function (models) {
    Card.belongsTo(models.Room, {
      foreignKey: 'extidroom'
    });
  };

  return Card;
};
