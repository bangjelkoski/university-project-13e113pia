import * as authService from './auth.service';
import Roles from '~/utils/roles';

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const korisnik = await authService.login(username, password);
    res.json(korisnik.toResponse());
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const registerPoljoprivrednik = async (req, res) => {
  const {
    username,
    password,
    email,
    phone,
    firstName,
    lastName,
    birthPlace,
    birthDate,
  } = req.body;

  try {
    const korisnik = await authService.registerPoljoprivrednik({
      username,
      password,
      email,
      phone,
      firstName,
      lastName,
      birthPlace,
      birthDate,
    });

    res.json(korisnik.toJson());
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const registerPreduzece = async (req, res) => {
  const {
    username,
    password,
    email,
    phone,
    name,
    location,
    dateOfCreation,
  } = req.body;

  try {
    const korisnik = await authService.registerPreduzece({
      username,
      password,
      email,
      phone,
      name,
      location,
      dateOfCreation,
    });

    res.json(korisnik.toJson());
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
