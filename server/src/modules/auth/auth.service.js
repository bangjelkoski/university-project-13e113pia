import db from '~/database/index';

export const login = async (username, password) => {
  try {
    return await db.Korisnik.authenticate(username, password);
  } catch (error) {
    throw new Error('Корисник са подацима није пронађен.');
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
  try {
    const korisnik = await db.Korisnik.create({
      username,
      password,
      email,
      phone,
    });

    const poljoprivrednik = await korisnik.createPoljoprivrednik({
      firstName,
      lastName,
      birthPlace,
      birthDate,
    });

    return [korisnik, poljoprivrednik];
  } catch (error) {
    throw new Error('Регистрација корисника није успела.');
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
  try {
    const korisnik = await db.Korisnik.create({
      username,
      password,
      email,
      phone,
    });

    const preduzetnik = await korisnik.createPreduzetnik({
      name,
      location,
      dateOfCreation,
    });

    return [korisnik, preduzetnik];
  } catch (error) {
    throw new Error('Регистрација корисника није успела.');
  }
};
