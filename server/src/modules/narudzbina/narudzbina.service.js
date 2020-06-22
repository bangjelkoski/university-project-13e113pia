import db from '~/database/index';
import ApiError from '~/handlers/ApiError';
import { proizvod } from '../proizvod/proizvod.service';

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

export const kreiraj = async (RasadnikId, proizvodi) => {
  try {
    const PreduzeceId = proizvodi[0].PreduzeceId;
    const magacin = await db.Magacin.findOne({ where: { RasadnikId } });
    const total = proizvodi.reduce((previous, { quantity, price }) => {
      return previous + quantity * price;
    }, 0);

    const narudzbina = await db.Narudzbina.create({
      total,
      MagacinId: magacin.id,
      PreduzeceId,
    });

    await Promise.all(
      proizvodi.map(
        async ({
          id,
          name,
          quantity,
          description,
          manufacturer,
          image,
          value,
          price,
          type,
        }) => {
          return await db.NaruceniProizvod.create({
            name,
            description,
            type,
            manufacturer,
            image,
            quantity,
            price,
            value,
            ProizvodId: id,
            NarudzbinaId: narudzbina.id,
          });
        }
      )
    );

    // Za svaki proizvod updejtuj stanje u databazi
    await Promise.all(
      proizvodi.map(async (proizvod) => {
        const proizvodResult = await db.Proizvod.findOne({
          where: { id: proizvod.id },
        });

        await proizvodResult.update({
          quantity: proizvodResult.quantity - proizvod.quantity,
        });
      })
    );

    // Vrati proizvode
    return await db.Proizvod.findAll({ where: { PreduzeceId } });
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
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
