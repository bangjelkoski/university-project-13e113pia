import db from '~/database/index';
import STATUS from '~/utils/status';
import ROLES from '~/utils/roles';
import ApiError from '~/handlers/ApiError';

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

export const azuriraj = async () => {
  try {
    //
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};

export const obrisi = async () => {
  try {
    //
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};

export const kreiraj = async () => {
  try {
    //
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка');
  }
};

export const korisniciNaCekanju = async () => {
  try {
    const korisnici = db.Korisnik.findAll({
      where: { status: STATUS.naCekanju },
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
