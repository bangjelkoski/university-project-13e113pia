import * as narudzbinaService from './narudzbina.service';

export const narudzbina = async (req, res) => {
  const { id, preduzeceId } = req.params;

  try {
    const narudzbina = await narudzbinaService.narudzbina(id, preduzeceId);

    res.json(narudzbina);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const narudzbine = async (req, res) => {
  const { preduzeceId } = req.params;

  try {
    const narudzbine = await narudzbinaService.narudzbine(preduzeceId);

    res.json(narudzbine);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const kreiraj = async (req, res, next) => {
  const { rasadnikId, proizvodi } = req.body;

  try {
    const updatedProizvodi = await narudzbinaService.kreiraj(
      rasadnikId,
      proizvodi
    );

    res.json(updatedProizvodi);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const odbij = async (req, res, next) => {
  const { id, preduzeceId } = req.params;

  try {
    await narudzbinaService.odbij(id, preduzeceId);

    res.json({
      message: 'Успешно одбијенa наруђбина.',
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const odobri = async (req, res, next) => {
  const { id, preduzeceId } = req.params;

  try {
    await narudzbinaService.odobri(id, preduzeceId);

    res.json({
      message: 'Успешно одобрена наруђбина.',
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
