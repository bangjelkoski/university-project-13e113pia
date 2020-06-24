import * as rasadnikService from './rasadnik.service';

export const rasadnik = async (req, res) => {
  const { id } = req.params;

  try {
    const rasadnik = await rasadnikService.rasadnik(id);

    res.json(rasadnik);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const rasadnici = async (req, res) => {
  const { poljoprivrednikId } = req.params;

  try {
    const rasadnici = await rasadnikService.rasadnici(poljoprivrednikId);

    res.json(rasadnici);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const setTemperature = async (req, res) => {
  const { id } = req.params;
  const { temperature } = req.body;

  try {
    await rasadnikService.setTemperature(id, temperature);

    res.json({
      message: 'Успешно ажуриран расадник.',
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const setWaterLevel = async (req, res) => {
  const { id } = req.params;
  const { waterLevel } = req.body;

  try {
    await rasadnikService.setWaterLevel(id, waterLevel);

    res.json({
      message: 'Успешно ажуриран расадник.',
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const kreiraj = async (req, res, next) => {
  const { poljoprivrednikId } = req.params;
  const { name, location, width, length } = req.body;

  try {
    await rasadnikService.kreiraj({
      PoljoprivrednikId: poljoprivrednikId,
      name,
      location,
      width,
      length,
    });

    res.json({
      message: 'Успешно креиран расадник.',
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
