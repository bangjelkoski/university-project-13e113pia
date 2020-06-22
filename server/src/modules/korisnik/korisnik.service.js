import db from '~/database/index';
import STATUS from '~/utils/status';
import ROLES from '~/utils/roles';
import ApiError from '~/handlers/ApiError';
import bcrypt from 'bcrypt';

export const korisnik = async (id) => {
  try {
    return await db.Korisnik.findOne({
      where: { id },
      include: [
        {
          model: db.Preduzece,
        },
        {
          model: db.Poljoprivrednik,
        },
        {
          model: db.Admin,
        },
      ],
    });
  } catch (error) {
    return ApiError.throw(error, 'Корисник није пронађен');
  }
};

export const odobri = async (id) => {
  try {
    await db.Korisnik.odobri(id);
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};

export const odbij = async (id) => {
  try {
    await db.Korisnik.odbij(id);
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};

export const azuriraj = async ({ id, username, password, phone, email }) => {
  if (await db.Korisnik.findOne({ where: { username, id: { $not: id } } })) {
    throw new Error('Корисничко име је већ заузето.');
  }

  try {
    const korisnik = await db.Korisnik.findOne({
      where: { id },
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await korisnik.update({ username, password: hash, phone, email });
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};

export const obrisi = async (id) => {
  try {
    const korisnik = await db.Korisnik.findOne({
      where: { id },
    });

    await korisnik.destroy();
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};

export const korisniciNaCekanju = async () => {
  try {
    const korisnici = await db.Korisnik.findAll({
      where: { status: STATUS.naCekanju },
      include: [
        {
          model: db.Preduzece,
        },
        {
          model: db.Poljoprivrednik,
        },
        {
          model: db.Admin,
        },
      ],
    });

    return korisnici.map((korisnik) => korisnik.toResponse());
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};

export const preduzeca = async (id) => {
  try {
    const korisnici = db.Korisnik.findAll({
      where: { role: ROLES.preduzece },
      include: [
        {
          model: db.Preduzece,
        },
      ],
    });

    return korisnici.map((korisnik) => korisnik.toResponse());
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};

export const poljoprivrednici = async (id) => {
  try {
    const korisnici = db.Korisnik.findAll({
      where: { role: ROLES.poljoprivrednik },
      include: [
        {
          model: db.Poljoprivrednik,
        },
      ],
    });

    return korisnici.map((korisnik) => korisnik.toResponse());
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};

export const narucioProizvod = async (id, proizvodId) => {
  try {
    const poljoprivrednik = await db.Poljoprivrednik.findOne({
      where: { KorisnikId: id },
    });

    if (!poljoprivrednik) {
      return false;
    }

    const rasadnici = await db.Rasadnik.findAll({
      where: { PoljoprivrednikId: poljoprivrednik.id },
    });

    if (!rasadnici.length) {
      return false;
    }

    const rasadniciId = rasadnici.map(({ id }) => id);

    const magacini = await db.Magacin.findAll({
      where: {
        RasadnikId: {
          [db.Sequelize.Op.in]: rasadniciId,
        },
      },
    });

    if (!magacini.length) {
      return false;
    }

    const magaciniId = magacini.map(({ id }) => id);

    const narudzbine = await db.Narudzbina.findAll({
      where: {
        MagacinId: {
          [db.Sequelize.Op.in]: magaciniId,
        },
      },
      include: [
        {
          model: db.NaruceniProizvod,
          as: 'NaruceniProizvodi',
        },
      ],
    });

    if (!narudzbine.length) {
      return false;
    }

    const naruceniProizvodi = narudzbine.reduce((prev, narudzbina) => {
      return [...prev, ...narudzbina.NaruceniProizvodi];
    }, []);

    return naruceniProizvodi.some(
      ({ ProizvodId }) => ProizvodId === proizvodId
    );
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};
