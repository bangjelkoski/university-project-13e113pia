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

  return Ocena;
}
