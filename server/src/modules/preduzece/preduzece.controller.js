import * as preduzeceService from './preduzece.service';

export const preduzeca = async (req, res) => {
  try {
    const preduzeca = await preduzeceService.preduzeca();

    res.json(preduzeca);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
