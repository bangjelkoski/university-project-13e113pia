import { DataTypes } from 'sequelize';

export default function init(sequelize) {
  const Komentar = sequelize.define(
    'Komentar',
    {
      komentar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Komentar.associate = function associate(models) {
    this.korisnik = this.belongsTo(models.Korisnik);
    this.proizvod = this.belongsTo(models.Proizvod);
  };

  Komentar.prototype.toJson = async () => {
    return { ...this.get() };
  };

  return Komentar;
}
