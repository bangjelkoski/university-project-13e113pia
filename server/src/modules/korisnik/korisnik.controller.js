import * as korisnikService from './korisnik.service';

export const korisnik = async (req, res) => {
  const { id } = req.params;

  try {
    const korisnik = await korisnikService.korisnik(id);

    res.json(korisnik.toResponse());
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const azuriraj = async (req, res) => {
  const { id } = req.params;

  try {
    await korisnikService.azuriraj(id);

    res.json({
      message: 'Успешно ажуриран корисник.',
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const kreiraj = async (req, res) => {
  try {
    const korisnik = await korisnikService.kreiraj(id);

    res.json(korisnik.toResponse());
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const korisniciNaCekanju = async (req, res) => {
  try {
    const korisnici = await korisnikService.korisniciNaCekanju();

    res.json(korisnici);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const poljoprivrednici = async (req, res) => {
  try {
    const korisnici = await korisnikService.poljoprivrednici();

    res.json(korisnici);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const preduzeca = async (req, res) => {
  try {
    const korisnici = await korisnikService.preduzeca();

    res.json(korisnici);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const odbij = async (req, res, next) => {
  const { id } = req.body;

  try {
    await korisnikService.odbij(id);

    res.json({
      message: 'Успешно одбијен корисник.',
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const odobri = async (req, res, next) => {
  const { id } = req.body;

  try {
    await korisnikService.odobri(id);

    res.json({
      message: 'Успешно одобрен корисник.',
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const obrisi = async (req, res, next) => {
  const { id } = req.body;

  try {
    await korisnikService.obrisi(id);

    res.json({
      message: 'Успешно обрисан корисник.',
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
