import db from '~/database/index';
import ApiError from '~/handlers/ApiError';

export const preduzeca = async () => {
  try {
    return await db.Preduzece.findAll({
      include: [
        {
          model: db.Proizvod,
          as: 'Proizvodi',
        },
      ],
    });
  } catch (error) {
    return ApiError.throw(error, 'Настала је грешка');
  }
};
