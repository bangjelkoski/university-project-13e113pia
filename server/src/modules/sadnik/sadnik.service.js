import db from '~/database/index';
import ApiError from '~/handlers/ApiError';

export const preparat = async (sadnikId, preparatId) => {
  try {
    const sadnik = await db.Sadnik.findOne({ where: { id: sadnikId } });
    const preparat = await db.NaruceniProizvod.findOne({
      where: { id: preparatId },
    });

    if (preparat.quantity <= 0) {
      throw new Error('Препарат није доступан.');
    }

    await sadnik.update({
      ms: sadnik.ms > preparat.value ? sadnik.ms - preparat.value : 0,
    });

    await preparat.update({
      quantity: preparat.quantity - 1,
    });

    return await db.Sadnik.findOne({ where: { id: sadnikId } });
  } catch (error) {
    return ApiError.throw(error, 'Садник није пронађен');
  }
};

export const izvadi = async (id) => {
  try {
    const sadnik = await db.Sadnik.findOne({ where: { id } });

    await sadnik.update({
      izvadiNa: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
    });

    return await db.Sadnik.findOne({ where: { id } });
  } catch (error) {
    return ApiError.throw(error, 'Садник није пронађен');
  }
};

export const dodaj = async (id, RasadnikId) => {
  try {
    const { name, manufacturer, value } = await db.NaruceniProizvod.findOne({
      where: { id },
    });

    return await db.Sadnik.create({
      name,
      RasadnikId,
      manufacturer,
      ms: value,
    });
  } catch (error) {
    return ApiError.throw(error, 'Садник није пронађен');
  }
};
