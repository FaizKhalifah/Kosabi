'use strict';
import { Model } from "sequelize";
export default(sequelize, DataTypes) => {
  class Kamar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kamar.init({
    nomorKamar: DataTypes.INTEGER,
    tipe: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kamar',
  });
  return Kamar;
};