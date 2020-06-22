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

export const oceni = async (ProizvodId, KorisnikId, ocena) => {
  try {
    const novaOcena = await db.Ocena.create({
      ProizvodId,
      KorisnikId,
      ocena,
    });

    return await db.Ocena.findOne({
      where: { id: novaOcena.id },
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
