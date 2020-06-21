import * as kurirService from './kurir.service';

export const kuriri = async (req, res) => {
  const { preduzeceId } = req.params;

  try {
    const kuriri = await kurirService.kuriri(preduzeceId);

    res.json(kuriri);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const dodeli = async (req, res) => {
  const { id, zauzetDo, narudzbinaId } = req.body;

  try {
    const [kurir, narudzbina] = await kurirService.dodeli({
      id,
      zauzetDo,
      narudzbinaId,
    });

    res.json({ narudzbina, kurir });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
