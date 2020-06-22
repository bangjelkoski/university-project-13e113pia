'use strict';
const Chance = require('chance');
const db = require('./../index');
import { PRODUCT_TYPE } from '~/utils/types';

const chance = new Chance();

const kuriri = (preduzeceId) =>
  Array.from(Array(5), () => ({
    firstName: chance.first(),
    lastName: chance.last(),
    zauzetDo: new Date(),
    PreduzeceId: preduzeceId,
  }));

const proizvodFactory = (preduzeceId) => ({
  name: chance.sentence({ words: 2 }),
  description: chance.sentence(),
  type: Math.random() >= 0.5 ? PRODUCT_TYPE.preparat : PRODUCT_TYPE.sadnica,
  manufacturer: chance.company(),
  image: 'https://picsum.photos/800/600',
  quantity: chance.integer({ min: 0, max: 10 }),
  price: chance.floating({ min: 0, max: 100 }),
  value: chance.hour() * 60 * 1000,
  PreduzeceId: preduzeceId,
});

const proizvodiFactory = (preduzeceId) => {
  return Array.from(Array(20), () => proizvodFactory(preduzeceId));
};

const naruceniProizvod = (preduzeceId, narduzbinaId, proizvodId) => {
  return {
    ...proizvodFactory(preduzeceId),
    ProizvodId: proizvodId,
    NarudzbinaId: narduzbinaId,
  };
};

const komentari = (proizvodId) => {
  return Array.from(Array(5), () => ({
    komentar: chance.sentence(),
    ProizvodId: proizvodId,
  }));
};

const ocene = (proizvodId) => {
  return Array.from(Array(5), () => ({
    ocena: chance.integer({ min: 0, max: 5 }),
    ProizvodId: proizvodId,
  }));
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Proizvod', null, {});
    await queryInterface.bulkDelete('NaruceniProizvod', null, {});
    await queryInterface.bulkDelete('Narudzbina', null, {});
    await queryInterface.bulkDelete('Kurir', null, {});
    await queryInterface.bulkDelete('Komentar', null, {});
    await queryInterface.bulkDelete('Ocena', null, {});

    const preduzece = await db.Korisnik.findOne({
      where: { username: 'preduzece' },
      include: [
        {
          model: db.Preduzece,
        },
      ],
    });

    const preduzeceId = preduzece.Preduzece.id;

    /** Kuriri */
    await Promise.all(
      kuriri(preduzeceId).map(async (kurir) => {
        await db.Kurir.create(kurir);
      })
    );

    /** Proizvodi */
    await Promise.all(
      proizvodiFactory(preduzeceId).map(async (proizvod) => {
        await db.Proizvod.create(proizvod);
      })
    );

    /** Komentari */
    let proizvodi = await db.Proizvod.findAll({
      where: { PreduzeceId: preduzeceId },
      order: [db.Sequelize.fn('RAND')],
      limit: 10,
    });

    await Promise.all(
      proizvodi.map(async (proizvod) => {
        await Promise.all(
          komentari(proizvod.id).map(async (komentar) => {
            const korisnik = await db.Korisnik.findOne({
              order: [db.Sequelize.fn('RAND')],
            });

            await db.Komentar.create({ ...komentar, KorisnikId: korisnik.id });
          })
        );
      })
    );

    /** Ocene */
    proizvodi = await db.Proizvod.findAll({
      where: { PreduzeceId: preduzeceId },
      order: [db.Sequelize.fn('RAND')],
      limit: 10,
    });

    await Promise.all(
      proizvodi.map(async (proizvod) => {
        await Promise.all(
          ocene(proizvod.id).map(async (ocena) => {
            const korisnik = await db.Korisnik.findOne({
              order: [db.Sequelize.fn('RAND')],
            });

            await db.Ocena.create({ ...ocena, KorisnikId: korisnik.id });
          })
        );
      })
    );

    /** Narudzbine */
    await Promise.all(
      Array.from(Array(5), async () => {
        // Kreiraj narudzbinu
        const narudzbina = await db.Narudzbina.create({
          total: 0,
          PreduzeceId: preduzeceId,
        });

        // Uzmi 5 random proizvoda
        const proizvodi = await db.Proizvod.findAll({
          where: { PreduzeceId: preduzeceId },
          order: [db.Sequelize.fn('RAND')],
          limit: 5,
        });

        // Dodaj proizvode u narduzbinu
        await Promise.all(
          proizvodi.map(
            async (proizvod) =>
              await db.NaruceniProizvod.create(
                naruceniProizvod(preduzeceId, narudzbina.id, proizvod.id)
              )
          )
        );

        // Updejtuj narudzbinu total
        const total = proizvodi.reduce((suma, proizvod) => {
          return suma + proizvod.price * proizvod.quantity;
        }, 0);

        await narudzbina.update({
          total,
        });
      })
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Proizvod', null, {});
    await queryInterface.bulkDelete('NaruceniProizvod', null, {});
    await queryInterface.bulkDelete('Narudzbina', null, {});
    await queryInterface.bulkDelete('Kurir', null, {});
    await queryInterface.bulkDelete('Komentar', null, {});
    await queryInterface.bulkDelete('Ocena', null, {});
  },
};
