const {User} = require("../../models/user");

class UserRepository{
    async findAll(){
        return await User.findAll();
    }

    async findById(id) {
        return await User.findByPk(id);
    }

    async create(userData) {
        return await User.create(userData);
      }
    
      async update(id, updatedData) {
        return await User.update(updatedData, { where: { id } });
      }
    
      async delete(id) {
        return await User.destroy({ where: { id } });
      }
}

module.exports= new UserRepository();