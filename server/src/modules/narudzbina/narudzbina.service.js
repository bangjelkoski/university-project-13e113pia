import db from '~/database/index';
import ApiError from '~/handlers/ApiError';

export const narudzbina = async (id, PreduzeceId) => {
  try {
    return await db.Narudzbina.findOne({
      where: { id, PreduzeceId },
      include: [
        {
          model: db.Kurir,
        },
        {
          model: db.NaruceniProizvod,
          as: 'NaruceniProizvod',
        },
      ],
    });
  } catch (error) {
    return ApiError.throw(error, 'Наруђбина није пронађена');
  }
};

export const narudzbine = async (PreduzeceId) => {
  try {
    return await db.Narudzbina.findAll({
      where: { PreduzeceId },
      include: [
        {
          model: db.Kurir,
        },
        {
          model: db.NaruceniProizvod,
          as: 'NaruceniProizvodi',
        },
      ],
    });
  } catch (error) {
    return ApiError.throw(error, 'Наруђбина није пронађена');
  }
};

export const odobri = async (id, preduzeceId) => {
  try {
    await db.Narudzbina.odobri(id, preduzeceId);
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};

export const odbij = async (id, preduzeceId) => {
  try {
    await db.Narudzbina.odbij(id, preduzeceId);
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};
