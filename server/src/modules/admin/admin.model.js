import { DataTypes } from 'sequelize';

export default function init(sequelize) {
  const Admin = sequelize.define(
    'Admin',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Admin;
}
