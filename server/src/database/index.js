import Sequelize from 'sequelize';
import config from '~/config';
import korisnikInit from '~/modules/korisnik/korisnik.model';
import preduzeceInit from '~/modules/preduzece/preduzece.model';
import adminInit from '~/modules/admin/admin.model';
import poljoprivrednikInit from '~/modules/poljoprivrednik/poljoprivrednik.model';
import magacinInit from '~/modules/magacin/magacin.model';
import ocenaInit from '~/modules/ocena/ocena.model';
import proizvodInit from '~/modules/proizvod/proizvod.model';
import narudzbinaInit from '~/modules/narudzbina/narudzbina.model';
import komentarInit from '~/modules/komentar/komentar.model';
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
const [Proizvod, KupljeniProizvod] = proizvodInit(sequelize);

/**
 * Relationships
 */
Korisnik.hasOne(Admin);
Korisnik.hasOne(Poljoprivrednik);
Korisnik.hasOne(Preduzece);
Korisnik.hasMany(Komentar);
Korisnik.hasMany(Ocena);

Proizvod.hasMany(Ocena);
Proizvod.hasMany(Komentar);

Preduzece.hasMany(Kurir);

Rasadnik.hasMany(Magacin);
Rasadnik.belongsTo(Poljoprivrednik);

Admin.belongsTo(Korisnik);
Poljoprivrednik.belongsTo(Korisnik);
Preduzece.belongsTo(Korisnik);

Komentar.belongsTo(Korisnik);
Komentar.belongsTo(Proizvod);

Ocena.belongsTo(Korisnik);
Ocena.belongsTo(Proizvod);

Kurir.belongsTo(Preduzece);
Kurir.belongsTo(Narudzbina);

Magacin.hasMany(Narudzbina);
Magacin.belongsTo(Rasadnik);

Narudzbina.belongsTo(Preduzece);
Narudzbina.belongsTo(Magacin);
Narudzbina.hasOne(Kurir);

Proizvod.belongsTo(Preduzece);
Proizvod.hasMany(Komentar);

KupljeniProizvod.hasMany(Narudzbina);
KupljeniProizvod.hasMany(Ocena);

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
  Magacin,
  Narudzbina,
  Proizvod,
  KupljeniProizvod,
};

export default db;
