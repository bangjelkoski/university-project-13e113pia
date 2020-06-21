import db from '~/database/index';
import ApiError from '~/handlers/ApiError';

export const ocene = async (ProizvodId) => {
  try {
    return await db.Ocena.findAll({
      where: { ProizvodId },
      include: [
        {
          model: db.Korisnik,
        },
      ],
    });
  } catch (error) {
    return ApiError.throw(error, 'Оцене нису пронађене');
  }
};
