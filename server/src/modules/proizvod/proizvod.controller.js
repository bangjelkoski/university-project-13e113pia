import * as proizvodService from './proizvod.service';

export const proizvod = async (req, res) => {
  const { id } = req.params;

  try {
    const proizvod = await proizvodService.proizvod(id);

    res.json(proizvod);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const proizvodi = async (req, res) => {
  const { preduzeceId } = req.params;

  try {
    const proizvodi = await proizvodService.proizvodi(preduzeceId);

    res.json(proizvodi);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const azuriraj = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    await proizvodService.azuriraj({
      id,
      name,
    });

    res.json({
      message: 'Успешно ажуриран производ.',
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const obrisi = async (req, res, next) => {
  const { id } = req.body;

  try {
    await proizvodService.obrisi(id);

    res.json({
      message: 'Успешно обрисан производ.',
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
