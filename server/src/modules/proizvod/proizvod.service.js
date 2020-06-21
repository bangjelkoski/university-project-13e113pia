import db from '~/database/index';

export const proizvod = async (id) => {
  try {
    return await db.Proizvod.findOne({
      where: { id },
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

export const azuriraj = async ({ id, name }) => {
  try {
    const proizvod = await db.Proizvod.findOne({
      where: { id },
    });

    await proizvod.update({ name });
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
