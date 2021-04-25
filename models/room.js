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
    }
  }, {
    freezeTableName: true,
    tableName: 'tbllocpanelrooms',
    timestamps: false
  });

  Room.associate = function (models) {
    Room.hasMany(models.Card, {
      foreignKey: 'extidroom'
    });
  };

  return Room;
};
