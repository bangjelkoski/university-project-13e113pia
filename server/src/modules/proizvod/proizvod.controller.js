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

export const obrisi = async (req, res, next) => {
  const { id } = req.params;

  try {
    await proizvodService.obrisi(id);

    res.json({
      message: 'Успешно обрисан производ.',
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const kreiraj = async (req, res, next) => {
  const { preduzeceId } = req.params;
  const {
    name,
    manufacturer,
    description,
    image,
    price,
    type,
    quantity,
    value,
  } = req.body;

  try {
    await proizvodService.kreiraj({
      PreduzeceId: preduzeceId,
      name,
      manufacturer,
      description,
      image,
      price,
      type,
      quantity,
      value,
    });

    res.json({
      message: 'Успешно креиран производ.',
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
