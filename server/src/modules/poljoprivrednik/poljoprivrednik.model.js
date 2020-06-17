import { DataTypes } from 'sequelize';

export default function init(sequelize) {
  const Poljoprivrednik = sequelize.define(
    'Poljoprivrednik',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthPlace: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  Poljoprivrednik.associate = function associate(models) {
    this.korisnik = this.belongsTo(models.Korisnik);
  };

  Poljoprivrednik.prototype.toJson = async () => {
    return { ...this.get() };
  };

  return Poljoprivrednik;
}
