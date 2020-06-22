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

export const komentiraj = async (ProizvodId, KorisnikId, komentar) => {
  try {
    const noviKomentar = await db.Komentar.create({
      ProizvodId,
      KorisnikId,
      komentar,
    });

    return await db.Komentar.findOne({
      where: { id: noviKomentar.id },
      include: [
        {
          model: db.Korisnik,
        },
      ],
    });
  } catch (error) {
    return ApiError.throw(error, 'Настала је грешка');
  }
};
