import { DataTypes } from 'sequelize';

export default function init(sequelize) {
  const Narudzbina = sequelize.define(
    'Narudzbina',
    {
      total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Narudzbina;
}
