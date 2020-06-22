import { DataTypes } from 'sequelize';

export default function init(sequelize) {
  const Magacin = sequelize.define(
    'Magacin',
    {},
    {
      freezeTableName: true,
    }
  );

  return Magacin;
}
