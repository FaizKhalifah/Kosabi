 module.exports=(sequalize,dataTypes)=>{
    const Rent = sequalize.define('Rent', {
        id: {
            type: dataTypes.UUID,
            defaultValue: dataTypes.UUIDV4,
            primaryKey: true,
          },
          userId: {
            type: dataTypes.UUID,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id',
            },
          },
          kostanId: {
            type: dataTypes.UUID,
            allowNull: false,
            references: {
              model: 'Rooms',
              key: 'id',
            },
          },
          startDate: {
            type: dataTypes.DATE,
            allowNull: false,
          },
          endDate: {
            type: dataTypes.DATE,
            allowNull: false,
          },
          status: {
            type: dataTypes.ENUM('pending', 'active', 'completed', 'cancelled'),
            allowNull: false,
            defaultValue: 'pending',
          },
    })
 }