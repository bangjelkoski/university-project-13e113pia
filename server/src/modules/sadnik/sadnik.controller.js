import * as sadnikService from './sadnik.service';

export const preparat = async (req, res) => {
  const { sadnikId, preparatId } = req.params;

  try {
    const updatedSadnik = await sadnikService.preparat(sadnikId, preparatId);

    res.json(updatedSadnik);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const izvadi = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedSadnik = await sadnikService.izvadi(id);

    res.json(updatedSadnik);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const dodaj = async (req, res) => {
  const { id, rasadnikId } = req.params;

  try {
    const newSadnik = await sadnikService.dodaj(id, rasadnikId);

    res.json(newSadnik);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
