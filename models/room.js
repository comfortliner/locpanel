'use strict';

module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      field: 'name',
      type: DataTypes.STRING,
      allowNull: false
    },
    columns: {
      field: 'columns',
      type: DataTypes.STRING,
      allowNull: false
    },
    panelmode: {
      field: 'panelmode',
      type: DataTypes.STRING,
      allowNull: true
    },
    boardwidth: {
      field: 'boardwidth',
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    freezeTableName: true,
    tableName: 'tblLOCPANEL_rooms',
    timestamps: false
  });

  Room.associate = function (models) {
    Room.hasMany(models.Card, {
      foreignKey: 'extidroom'
    });
  };

  return Room;
};
