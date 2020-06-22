import Sequelize from 'sequelize';
import config from '~/config';
import korisnikInit from '~/modules/korisnik/korisnik.model';
import preduzeceInit from '~/modules/preduzece/preduzece.model';
import adminInit from '~/modules/admin/admin.model';
import poljoprivrednikInit from '~/modules/poljoprivrednik/poljoprivrednik.model';
import ocenaInit from '~/modules/ocena/ocena.model';
import proizvodInit from '~/modules/proizvod/proizvod.model';
import narudzbinaInit from '~/modules/narudzbina/narudzbina.model';
import komentarInit from '~/modules/komentar/komentar.model';
import magacinInit from '~/modules/magacin/magacin.model';
import sadnikInit from '~/modules/sadnik/sadnik.model';
import rasadnikInit from '~/modules/rasadnik/rasadnik.model';
import kurirInit from '~/modules/kurir/kurir.model';

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_PORT } = config;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
  logging: () => {},
  timezone: '+02:00',
});

/**
 * Define all models
 */
const Korisnik = korisnikInit(sequelize);
const Preduzece = preduzeceInit(sequelize);
const Admin = adminInit(sequelize);
const Poljoprivrednik = poljoprivrednikInit(sequelize);
const Komentar = komentarInit(sequelize);
const Ocena = ocenaInit(sequelize);
const Kurir = kurirInit(sequelize);
const Rasadnik = rasadnikInit(sequelize);
const Magacin = magacinInit(sequelize);
const Narudzbina = narudzbinaInit(sequelize);
const Sadnik = sadnikInit(sequelize);
const [Proizvod, NaruceniProizvod] = proizvodInit(sequelize);

/**
 * Relationships
 */
Korisnik.hasOne(Admin);
Korisnik.hasOne(Poljoprivrednik);
Korisnik.hasOne(Preduzece);
Korisnik.hasMany(Komentar, {
  as: 'Komentari',
});
Korisnik.hasMany(Ocena, {
  as: 'Ocene',
});

Proizvod.hasMany(Ocena, {
  as: 'Ocene',
});
Proizvod.hasMany(Komentar, {
  as: 'Komentari',
});

Preduzece.hasMany(Kurir, {
  as: 'Kuriri',
});

Rasadnik.hasOne(Magacin);
Rasadnik.belongsTo(Poljoprivrednik);
Rasadnik.hasMany(Sadnik, {
  as: 'Sadnici',
});

Admin.belongsTo(Korisnik);
Poljoprivrednik.belongsTo(Korisnik);
Preduzece.belongsTo(Korisnik);

Magacin.belongsTo(Rasadnik);
Magacin.hasMany(Narudzbina, {
  as: 'Narudzbine',
});

Komentar.belongsTo(Korisnik);
Komentar.belongsTo(Proizvod);

Ocena.belongsTo(Korisnik);
Ocena.belongsTo(Proizvod);

Kurir.belongsTo(Preduzece);
Kurir.hasOne(Narudzbina);

Narudzbina.belongsTo(Preduzece);
Narudzbina.belongsTo(Kurir);
Narudzbina.belongsTo(Magacin);
Narudzbina.hasMany(NaruceniProizvod, {
  as: 'NaruceniProizvodi',
});

Proizvod.belongsTo(Preduzece);
NaruceniProizvod.belongsTo(Narudzbina);

const db = {
  sequelize,
  Sequelize,
  Korisnik,
  Admin,
  Preduzece,
  Komentar,
  Poljoprivrednik,
  Ocena,
  Kurir,
  Rasadnik,
  Narudzbina,
  Proizvod,
  Sadnik,
  Magacin,
  NaruceniProizvod,
};

export default db;
