module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    timestamps: true
  });

  Room.associate = (models) => {
    Room.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
    Room.hasMany(models.Rent, { foreignKey: 'roomId', as: 'rentals' });
  };

  return Room;
};
