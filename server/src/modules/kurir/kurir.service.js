import db from '~/database/index';
import ApiError from '~/handlers/ApiError';

export const kuriri = async (PreduzeceId) => {
  try {
    return await db.Kurir.findAll({
      where: { PreduzeceId },
      include: [
        {
          model: db.Narudzbina,
        },
      ],
    });
  } catch (error) {
    return ApiError.throw(error, 'Курири не постоје');
  }
};

export const dodeli = async ({ id, narudzbinaId, zauzetDo }) => {
  try {
    const narudzbina = await db.Narudzbina.findOne({
      where: { id: narudzbinaId },
    });

    await narudzbina.update({ KurirId: id });

    const kurir = await db.Kurir.findOne({
      where: { id },
    });

    await kurir.update({ zauzetDo });

    const updatedNarudzbina = await db.Narudzbina.findOne({
      where: { id: narudzbinaId },
      include: [
        {
          model: db.Kurir,
        },
      ],
    });

    const updatedKurir = await db.Kurir.findOne({
      where: { id },
      include: [
        {
          model: db.Narudzbina,
        },
      ],
    });

    return [updatedKurir, updatedNarudzbina];
  } catch (error) {
    return ApiError.throw(error, 'Настала је грешка');
  }
};
