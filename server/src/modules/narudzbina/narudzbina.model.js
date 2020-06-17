import { DataTypes } from 'sequelize';

export default function init(sequelize) {
  const Narudzbina = sequelize.define(
    'Narudzbina',
    {
      total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Narudzbina.associate = function associate(models) {
    this.preduzece = this.hasOne(models.Preduzece);
    this.kurir = this.hasOne(models.Kurir);
    this.magacin = this.hasOne(models.Magacin);
  };

  Narudzbina.prototype.toJson = async () => {
    return { ...this.get() };
  };

  return Narudzbina;
}
