module.exports = (sequelize, DataTypes) => {
  const Rent = sequelize.define('Rent', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    roomId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Rooms',
        key: 'id',
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'active', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
  }, {
    timestamps: true
  });

  Rent.associate = (models) => {
    Rent.belongsTo(models.User, { foreignKey: 'userId', as: 'renter' });
    Rent.belongsTo(models.Room, { foreignKey: 'roomId', as: 'room' });
  };

  return Rent;
};
