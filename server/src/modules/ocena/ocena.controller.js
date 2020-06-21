import * as ocenaService from './ocena.service';

export const ocene = async (req, res) => {
  const { proizvodId } = req.params;

  try {
    const ocene = await ocenaService.ocene(proizvodId);

    res.json(ocene);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
