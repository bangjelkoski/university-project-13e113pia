import db from './../database/index';
import nodemailer from 'nodemailer';
import config from '~/config';

/** Smanjujemo temperaturu i vodu u rasadniku, i po potrebi saljemo email poljoprivredniku da proveri stanje */
export const rasadniciCron = async () => {
  console.log('START: Расадници cron ');

  const rasadnici = await db.Rasadnik.findAll();
  const updateRasadnik = async (rasadnik) => {
    const novaTemperatura = rasadnik.temperature - 0.5;
    const noviNivoVode = rasadnik.waterLevel - 1;
    await rasadnik.update({
      temperature: novaTemperatura,
      waterLevel: noviNivoVode,
    });

    const { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } = config;

    const shouldBeNotified =
      (novaTemperatura < 12 || noviNivoVode < 72) && SMTP_USER && SMTP_PASSWORD;

    if (shouldBeNotified) {
      const poljoprivrednik = await db.Poljoprivrednik.findOne({
        where: { id: rasadnik.PoljoprivrednikId },
      });
      const korisnik = await db.Korisnik.findOne({
        where: { id: poljoprivrednik.KorisnikId },
      });

      const transport = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASSWORD,
        },
      });

      const message = {
        from: 'pia@example.com',
        to: korisnik.email,
        subject: `Расадник ${rasadnik.name} захтева одржавање“`,
        text: 'Улогујте се на систем и додајте воду!',
      };

      await transport.sendMail(message);
    }
  };

  await Promise.all(
    rasadnici.map(async (rasadnik) => await updateRasadnik(rasadnik))
  );
  console.log('END: Расадници cron ');
};

/** Brisemo sadnike 24 sata nakon vadenja iz rasadnika */
export const sadniciCron = async () => {
  console.log('START: Садници cron ');

  const sadnici = await db.Sadnik.findAll();
  const now = new Date().getTime();

  await Promise.all(
    sadnici.map(async (sadnik) => {
      const izvadiNa = new Date(sadnik.izvadiNa).getTime();

      if (izvadiNa <= now) {
        await sadnik.destroy();
      }
    })
  );

  console.log('END: Садници cron ');
};
