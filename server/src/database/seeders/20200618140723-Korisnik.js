'use strict';
const Roles = require('./../../utils/roles');
const Status = require('./../../utils/status');
const db = require('./../index');
const Chance = require('chance');
const bcrypt = require('bcrypt');

const chance = new Chance();

const korisnici = [
  {
    username: 'bojan',
    password: '123456',
    email: 'bangjelkoskii@gmail.com',
    phone: '123456',
    status: Status.odobren,
    role: Roles.admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: 'pera',
    password: '123456',
    email: 'pera@example.com',
    phone: '123456',
    status: Status.odobren,
    role: Roles.poljoprivrednik,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: 'nikola',
    password: '123456',
    email: 'nikola@example.com',
    phone: '123456',
    status: Status.odobren,
    role: Roles.preduzece,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: 'mladen',
    password: '123456',
    email: 'mladen@example.com',
    phone: '123456',
    status: Status.naCekanju,
    role: Roles.poljoprivrednik,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: 'nemanja',
    password: '123456',
    email: 'nemanja@example.com',
    phone: '123456',
    status: Status.naCekanju,
    role: Roles.preduzece,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: 'dragan',
    password: '123456',
    email: 'dragan@example.com',
    phone: '123456',
    status: Status.naCekanju,
    role: Roles.poljoprivrednik,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: 'milan',
    password: '123456',
    email: 'milan@example.com',
    phone: '123456',
    status: Status.naCekanju,
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
        username: 'bojan',
      },
    });

    await queryInterface.bulkInsert('Admin', [
      {
        firstName: 'Bojan',
        lastName: 'Angjelkoski',
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
