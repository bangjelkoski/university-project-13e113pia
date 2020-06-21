import db from '~/database/index';
import ApiError from '~/handlers/ApiError';

export const komentari = async (ProizvodId) => {
  try {
    return await db.Komentar.findAll({
      where: { ProizvodId },
      include: [
        {
          model: db.Korisnik,
        },
      ],
    });
  } catch (error) {
    return ApiError.throw(error, 'Коментари нису пронађени');
  }
};
