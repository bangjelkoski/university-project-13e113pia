import db from '~/database/index';
import ApiError from '~/handlers/ApiError';

export const proizvod = async (id) => {
  try {
    return await db.Proizvod.findOne({
      where: { id },
      include: [
        {
          model: db.Ocena,
          as: 'Ocene',
        },
        {
          model: db.Komentar,
          as: 'Komentari',
        },
      ],
    });
  } catch (error) {
    return ApiError.throw(error, 'Производ није пронађен');
  }
};

export const proizvodi = async (PreduzeceId) => {
  try {
    return await db.Proizvod.findAll({
      where: { PreduzeceId },
    });
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};

export const kreiraj = async ({
  PreduzeceId,
  name,
  manufacturer,
  description,
  image,
  price,
  type,
  quantity,
  value,
}) => {
  try {
    await db.Proizvod.create({
      PreduzeceId,
      name,
      manufacturer,
      description,
      image,
      price,
      type,
      quantity,
      value,
    });
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};

export const obrisi = async (id) => {
  try {
    const proizvod = await db.Proizvod.findOne({
      where: { id },
    });

    await proizvod.destroy();
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};

export const obrisiNarucen = async (id) => {
  try {
    const proizvod = await db.NaruceniProizvod.findOne({
      where: { id },
    });

    await proizvod.destroy();
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};
