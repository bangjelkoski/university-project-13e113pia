'use strict';
const db = require('./../index');
const Chance = require('chance');
const { magacin } = require('../../modules/magacin/magacin.service');

const chance = new Chance();

const rasadnici = (poljoprivrednikId) =>
  Array.from(Array(5), () => ({
    name: chance.company(),
    location: `${chance.address()}, ${chance.city()}`,
    width: chance.integer({ min: 10, max: 20 }),
    length: chance.integer({ min: 10, max: 20 }),
    PoljoprivrednikId: poljoprivrednikId,
  }));

const sadnici = (RasadnikId) =>
  Array.from(Array(5), () => ({
    name: chance.sentence({ words: 2 }),
    manufacturer: chance.company(),
    ms: chance.integer({ min: 86400, max: 5 * 86400 }),
    RasadnikId,
  }));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Rasadnik', null, {});
    await queryInterface.bulkDelete('Sadnik', null, {});
    await queryInterface.bulkDelete('Magacin', null, {});

    const poljoprivrednik = await db.Korisnik.findOne({
      where: { username: 'poljoprivrednik' },
      include: [
        {
          model: db.Poljoprivrednik,
        },
      ],
    });

    const poljoprivrednikId = poljoprivrednik.Poljoprivrednik.id;

    /** Rasadnici */
    await Promise.all(
      rasadnici(poljoprivrednikId).map(async (rasadnik) => {
        const newRasadnik = await db.Rasadnik.create(rasadnik);
        const magacin = await db.Magacin.create({ RasadnikId: newRasadnik.id });

        const narudzbina = await db.Narudzbina.findOne({
          where: {
            MagacinId: null,
          },
        });

        if (narudzbina) {
          await narudzbina.update({ MagacinId: magacin.id });
        }
      })
    );

    const rasadniciResult = await db.Rasadnik.findAll();

    await Promise.all(
      rasadniciResult.map(async (rasadnik) => {
        return await Promise.all(
          sadnici(rasadnik.id).map(async (sadnik) => {
            return await db.Sadnik.create(sadnik);
          })
        );
      })
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Rasadnik', null, {});
    await queryInterface.bulkDelete('Sadnik', null, {});
    await queryInterface.bulkDelete('Magacin', null, {});
  },
};
