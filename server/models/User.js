module.exports=(sequalize,dataTypes)=>{
    const User = sequalize.define('User',{
    id: {
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    domicile: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: dataTypes.ENUM('guest', 'renter', 'admin'),
      allowNull: false,
      defaultValue: 'guest',
    },
  }, {
    timestamps: false
  }
    )
}