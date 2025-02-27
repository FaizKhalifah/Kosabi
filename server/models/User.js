module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    domicile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('guest', 'renter', 'admin'),
      allowNull: false,
      defaultValue: 'guest',
    },
  }, {
    timestamps: true
  });

  User.associate = (models) => {
    User.hasMany(models.Room, { foreignKey: 'ownerId', as: 'rooms' });
    User.hasMany(models.Rent, { foreignKey: 'userId', as: 'rents' });
  };

  return User;
};
