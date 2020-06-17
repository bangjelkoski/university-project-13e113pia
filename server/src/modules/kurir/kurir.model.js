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

  Kurir.associate = function associate(models) {
    this.preduzece = this.belongsTo(models.Preduzece);
    this.narudzbina = this.belongsTo(models.Narudzbina);
  };

  Kurir.prototype.toJson = async () => {
    return { ...this.get() };
  };

  return Kurir;
}
