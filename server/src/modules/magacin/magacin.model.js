export default function init(sequelize) {
  const Magacin = sequelize.define(
    'Magacin',
    {},
    {
      freezeTableName: true,
    }
  );

  Magacin.associate = function associate(models) {
    this.rasadnik = this.belongsTo(models.Rasadnik);
    this.narudzbine = this.hasMany(models.Narudzbina);
  };

  Magacin.prototype.toJson = async () => {
    return { ...this.get() };
  };

  return Magacin;
}
