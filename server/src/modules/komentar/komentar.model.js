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

  return Komentar;
}
