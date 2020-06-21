import { DataTypes } from 'sequelize';
import ORDER_STATUS from '~/utils/order-status';

export default function init(sequelize) {
  const Narudzbina = sequelize.define(
    'Narudzbina',
    {
      total: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM([
          ORDER_STATUS.naCekanju,
          ORDER_STATUS.odobrena,
          ORDER_STATUS.odbijena,
        ]),
        defaultValue: ORDER_STATUS.naCekanju,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Narudzbina.odobri = async function (id, PreduzeceId) {
    try {
      const narudzbina = await Narudzbina.findOne({
        where: { id, PreduzeceId },
      });

      if (!narudzbina) {
        throw new Error('Нарудђбина није пронађен');
      }

      return await narudzbina.update({
        status: ORDER_STATUS.odobrena,
      });
    } catch (error) {
      return ApiError.throw(error, 'Настала ја грешка.');
    }
  };

  Narudzbina.odbij = async function (id, PreduzeceId) {
    try {
      const narudzbina = await Narudzbina.findOne({
        where: { id, PreduzeceId },
      });

      if (!narudzbina) {
        return ApiError.throw({}, 'Нарудђбина није пронађен');
      }

      return await narudzbina.update({
        status: ORDER_STATUS.odbijena,
      });
    } catch (error) {
      return ApiError.throw(error, 'Настала ја грешка.');
    }
  };

  return Narudzbina;
}
