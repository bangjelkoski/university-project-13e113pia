'use strict';
const Roles = require('./../../utils/roles');
const Status = require('./../../utils/status');
const db = require('./../index');
const Chance = require('chance');
const bcrypt = require('bcrypt');
const avatar = require('../../utils/avatar');
const chance = new Chance();

const korisnici = [
  {
    username: 'admin',
    password: 'Pia123!@#',
    email: 'admin@etf.rs',
    phone: '+381691231234',
    avatar: avatar(),
    status: Status.odobren,
    role: Roles.admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: 'poljoprivrednik',
    password: 'Pia123!@#',
    email: 'poljoprivrednik@example.com',
    phone: '+381691231234',
    avatar: avatar(),
    status: Status.odobren,
    role: Roles.poljoprivrednik,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: 'preduzece',
    password: 'Pia123!@#',
    email: 'preduzece@example.com',
    phone: '+381691231234',
    avatar: avatar(),
    status: Status.odobren,
    role: Roles.preduzece,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admin', null, {});
    await queryInterface.bulkDelete('Preduzece', null, {});
    await queryInterface.bulkDelete('Poljoprivrednik', null, {});
    await queryInterface.bulkDelete('Korisnik', null, {});

    const mappedKorisnici = await Promise.all(
      korisnici.map(async (korisnik) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(korisnik.password, salt);

        return {
          ...korisnik,
          password: hash,
        };
      })
    );

    await queryInterface.bulkInsert('Korisnik', mappedKorisnici, {});

    /**
     * Administratori
     */
    const admin = await db.Korisnik.findOne({
      where: {
        role: Roles.admin,
        username: 'admin',
      },
    });

    await queryInterface.bulkInsert('Admin', [
      {
        firstName: 'Admin PIA',
        lastName: 'Elektrotehnicki Fakultet',
        korisnikId: admin.id,
      },
    ]);

    /**
     * Poljoprivrednici
     */
    const poljoprivrednici = await db.Korisnik.findAll({
      where: {
        role: Roles.poljoprivrednik,
      },
    });

    const mappedPoljoprivrednici = poljoprivrednici.map((poljoprivrednik) => {
      return {
        korisnikId: poljoprivrednik.id,
        firstName: chance.first(),
        lastName: chance.last(),
        birthPlace: `${chance.city()}, ${chance.country()}`,
        birthDate: chance.birthday(),
      };
    });

    await queryInterface.bulkInsert('Poljoprivrednik', mappedPoljoprivrednici);

    /**
     * Preduzeca
     */
    const preduzeca = await db.Korisnik.findAll({
      where: {
        role: Roles.preduzece,
      },
    });

    const mappedPreduzeca = preduzeca.map((preduzece) => {
      return {
        korisnikId: preduzece.id,
        name: chance.first(),
        location: `${chance.city()}, ${chance.country()}`,
        dateOfCreation: chance.date({ year: 1999 }),
      };
    });

    await queryInterface.bulkInsert('Preduzece', mappedPreduzeca);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admin', null, {});
    await queryInterface.bulkDelete('Preduzece', null, {});
    await queryInterface.bulkDelete('Poljoprivrednik', null, {});
    await queryInterface.bulkDelete('Korisnik', null, {});
  },
};
