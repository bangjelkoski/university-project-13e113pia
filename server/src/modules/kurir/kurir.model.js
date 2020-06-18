import { DataTypes } from 'sequelize';

export default function init(sequelize) {
  const Kurir = sequelize.define(
    'Kurir',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zauzetDo: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Kurir;
}
