module.exports=(sequalize,dataTypes)=>{
    const Room = sequalize.define('Room',{
        id: {
            type: dataTypes.UUID,
            defaultValue: dataTypes.UUIDV4,
            primaryKey: true,
          },
          number: {
            type: dataTypes.INTEGER,
            allowNull: false,
          },  
          type:{
            type: dataTypes.STRING,
            allowNull: false,
          },
          price: {
            type: dataTypes.INTEGER,
            allowNull: false,
          },
    })
}