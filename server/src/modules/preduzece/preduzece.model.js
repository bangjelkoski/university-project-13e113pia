import { DataTypes } from 'sequelize';

export default function init(sequelize) {
  const Preduzece = sequelize.define(
    'Preduzece',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfCreation: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  Preduzece.associate = function associate(models) {
    this.korisnik = this.belongsTo(models.Korisnik);
    this.kuriri = this.hasMany(models.Kurir);
  };

  Preduzece.prototype.toJson = async () => {
    return { ...this.get() };
  };

  return Preduzece;
}
