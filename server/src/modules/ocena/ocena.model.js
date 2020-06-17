import { DataTypes } from 'sequelize';

export default function init(sequelize) {
  const Ocena = sequelize.define(
    'Ocena',
    {
      ocena: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Ocena.associate = function associate(models) {
    this.korisnik = this.belongsTo(models.Korisnik);
    this.proizvod = this.belongsTo(models.Proizvod);
  };

  Ocena.prototype.toJson = async () => {
    return { ...this.get() };
  };

  return Ocena;
}
