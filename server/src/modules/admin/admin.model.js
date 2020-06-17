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

  Admin.associate = function associate(models) {
    this.korisnik = this.belongsTo(models.Korisnik);
  };

  Admin.prototype.toJson = async () => {
    return { ...this.get() };
  };

  return Admin;
}
