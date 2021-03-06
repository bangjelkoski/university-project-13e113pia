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
        type: DataTypes.DECIMAL(10, 2),
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

  return Rasadnik;
}
