import { DataTypes } from 'sequelize';

export default function init(sequelize) {
  const Sadnik = sequelize.define(
    'Sadnik',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      manufacturer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Milisekundi od datuma kreiranja potrebno da se sadnik razvije
      ms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // Datum kada treba izvaditi sadnicu sa rasadnika
      izvadiNa: {
        type: DataTypes.DATE,
        allowNull: true,
        default: null,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Sadnik;
}
