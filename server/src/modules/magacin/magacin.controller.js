// magacin
import * as magacinService from './magacin.service';

export const magacin = async (req, res) => {
  const { poljoprivrednikId, rasadnikId } = req.params;

  try {
    const magacin = await magacinService.magacin(poljoprivrednikId, rasadnikId);

    res.json(magacin);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
