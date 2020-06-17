import { DataTypes } from 'sequelize';
import { PRODUCT_TYPE } from '~/utils/types';

export default function init(sequelize) {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM([PRODUCT_TYPE.sadnica, PRODUCT_TYPE.preparat]),
      allowNull: false,
    },
    value: {
      // Ili vreme ubrzanja ili vreme razvoja zavisi za tip
      type: DataTypes.DATE,
      allowNull: false,
    },
  };

  const tableParams = {
    freezeTableName: true,
  };

  const Proizvod = sequelize.define('Proizvod', schema, tableParams);

  const KupljeniProizvod = sequelize.define(
    'KupljeniProizvod',
    schema,
    tableParams
  );

  Proizvod.associate = function associate(models) {
    this.preduzece = this.belongsTo(models.Preduzece);
  };

  KupljeniProizvod.associate = function associate(models) {
    this.narudzbina = this.belongsTo(models.Narudzbina);
  };

  Proizvod.prototype.toJson = async () => {
    return { ...this.get() };
  };

  Proizvod.prototype.toNarudzbinu = async () => {
    //
  };

  KupljeniProizvod.prototype.toJson = async () => {
    return { ...this.get() };
  };

  return [Proizvod, KupljeniProizvod];
}
