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

  return Preduzece;
}
