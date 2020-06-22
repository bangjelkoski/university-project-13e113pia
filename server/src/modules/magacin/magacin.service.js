import db from '~/database/index';
import ApiError from '~/handlers/ApiError';

export const magacin = async (PoljoprivrednikId, RasadnikId) => {
  try {
    return await db.Magacin.findOne({
      where: { RasadnikId },
      include: [
        {
          model: db.Narudzbina,
          as: 'Narudzbine',
          include: [
            {
              model: db.NaruceniProizvod,
              as: 'NaruceniProizvodi',
            },
          ],
        },
        {
          model: db.Rasadnik,
        },
      ],
    });
  } catch (error) {
    return ApiError.throw(error, 'Магацин није пронађен');
  }
};
