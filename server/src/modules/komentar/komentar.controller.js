import * as komentarService from './komentar.service';

export const komentari = async (req, res) => {
  const { proizvodId } = req.params;

  try {
    const komentari = await komentarService.komentari(proizvodId);

    res.json(komentari);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
