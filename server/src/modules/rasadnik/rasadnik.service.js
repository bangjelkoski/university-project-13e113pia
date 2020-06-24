import db from '~/database/index';
import ApiError from '~/handlers/ApiError';

export const rasadnik = async (id) => {
  try {
    return await db.Rasadnik.findOne({
      where: { id },
      include: [
        {
          model: db.Sadnik,
          as: 'Sadnici',
        },
      ],
    });
  } catch (error) {
    return ApiError.throw(error, 'Расадник није пронађен');
  }
};

export const rasadnici = async (PoljoprivrednikId) => {
  try {
    return await db.Rasadnik.findAll({
      where: { PoljoprivrednikId },
      include: [
        {
          model: db.Sadnik,
          as: 'Sadnici',
        },
      ],
    });
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};

export const kreiraj = async ({
  PoljoprivrednikId,
  name,
  location,
  width,
  length,
}) => {
  try {
    const rasadnik = await db.Rasadnik.create({
      PoljoprivrednikId,
      name,
      location,
      width,
      length,
    });

    await db.Magacin.create({ RasadnikId: rasadnik.id });
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};

export const setTemperature = async (id, temperature) => {
  try {
    const rasadnik = await db.Rasadnik.findOne({ where: { id } });
    await rasadnik.update({ temperature });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const setWaterLevel = async (id, waterLevel) => {
  try {
    const rasadnik = await db.Rasadnik.findOne({ where: { id } });
    await rasadnik.update({ waterLevel });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
