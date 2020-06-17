import { DataTypes } from 'sequelize';

export default function init(sequelize) {
  const Rasadnik = sequelize.define(
    'Rasadnik',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      width: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      length: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      temperature: {
        type: DataTypes.INTEGER,
        defaultValue: 18,
      },
      waterLevel: {
        type: DataTypes.INTEGER,
        defaultValue: 200,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  Rasadnik.associate = function associate(models) {
    this.poljoprivrednik = this.belongsTo(models.Poljoprivrednik);
    this.magacin = this.hasOne(models.Magacin);
  };

  Rasadnik.prototype.toJson = async () => {
    return { ...this.get() };
  };

  return Rasadnik;
}
