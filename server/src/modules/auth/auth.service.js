import db from '~/database/index';
import { verify } from 'hcaptcha';
import STATUS from '~/utils/status';
import ROLES from '~/utils/roles';
import ApiError from '~/handlers/ApiError';
import avatar from '../../utils/avatar';
import Chance from 'chance';

const chance = new Chance();

export const login = async (username, password) => {
  let korisnik;
  try {
    korisnik = await db.Korisnik.findOne({
      where: { username },
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

  if (!korisnik) {
    throw new Error('Корисник није пронађен.');
  }

  try {
    if (await korisnik.isValidPassword(password)) {
      return korisnik;
    }
  } catch (error) {
    return ApiError.throw(error, 'Корисник није пронађен.');
  }
};

export const registerPoljoprivrednik = async ({
  username,
  password,
  email,
  phone,
  firstName,
  lastName,
  birthPlace,
  birthDate,
}) => {
  if (await db.Korisnik.findOne({ where: { username } })) {
    throw new Error('Корисничко име је већ заузето.');
  }

  try {
    const korisnik = await db.Korisnik.create({
      username,
      password,
      email,
      avatar: avatar(),
      role: ROLES.poljoprivrednik,
      status: STATUS.naCekanju,
      phone,
    });

    const poljoprivrednik = await db.Poljoprivrednik.create({
      firstName,
      lastName,
      birthPlace,
      birthDate,
      KorisnikId: korisnik.id,
    });

    return [korisnik, poljoprivrednik];
  } catch (error) {
    return ApiError.throw(error, 'Регистрација корисника није успела.');
  }
};

export const registerPreduzece = async ({
  username,
  password,
  email,
  phone,
  name,
  location,
  dateOfCreation,
}) => {
  if (await db.Korisnik.findOne({ where: { username } })) {
    throw new Error('Корисничко име је већ заузето.');
  }

  try {
    const korisnik = await db.Korisnik.create({
      username,
      password,
      email,
      avatar: avatar(),
      role: ROLES.preduzece,
      status: STATUS.naCekanju,
      phone: '',
    });

    const preduzece = await db.Preduzece.create({
      name,
      location,
      dateOfCreation,
      KorisnikId: korisnik.id,
    });

    /** Za svako preduzece kreiramo 5 kurira */
    await Promise.all(
      new Array(5).map(async (kurir) => {
        await db.Kurir.create({
          firstName: chance.first(),
          lastName: chance.last(),
          zauzetDo: Date.now(),
        });
      })
    );

    return [korisnik, preduzece];
  } catch (error) {
    return ApiError.throw(error, 'Регистрација корисника није успела.');
  }
};

export const reset = async ({ username, password, newPassword }) => {
  try {
    await db.Korisnik.promeniLozinku({ username, password, newPassword });
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка.');
  }
};

export const captcha = async (token) => {
  const secret = process.env.NO_CAPTCHA_SECRET;

  try {
    return await verify(secret, token);
  } catch (error) {
    return ApiError.throw(error, 'Настала ја грешка.');
  }
};
