import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import ROLES from '~/utils/roles';
import STATUS from '~/utils/status';

export default function init(sequelize) {
  const Korisnik = sequelize.define(
    'Korisnik',
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM([
          ROLES.admin,
          ROLES.poljoprivrednik,
          ROLES.preduzece,
        ]),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM([
          STATUS.naCekanju,
          STATUS.odobren,
          STATUS.odbijen,
        ]),
        defaultValue: STATUS.naCekanju,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Korisnik.beforeSave(async (user) => {
    try {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        // eslint-disable-next-line no-param-reassign
        user.password = hash;
      }
    } catch (error) {
      return ApiError.throw(error, 'Настала ја грешка.');
    }
  });

  Korisnik.prototype.isValidPassword = async function (pw) {
    try {
      return await bcrypt.compare(pw, this.password);
    } catch (error) {
      return ApiError.throw(error, 'Настала ја грешка.');
    }
  };

  /**
   * We remove the password from the model
   * when we send it as a response
   */
  Korisnik.prototype.toResponse = function (pw) {
    const korisnik = { ...this.toJSON() };

    delete korisnik.password;

    if (korisnik.role === ROLES.admin) {
      delete korisnik.Poljoprivrednik;
      delete korisnik.Preduzece;
    } else if (korisnik.role === ROLES.preduzece) {
      delete korisnik.Admin;
      delete korisnik.Poljoprivrednik;
    } else {
      delete korisnik.Admin;
      delete korisnik.Preduzece;
    }

    return korisnik;
  };

  Korisnik.odbrisi = async function (id) {
    try {
      const korisnik = await Korisnik.findOne({ where: { id } });

      if (!korisnik) {
        throw new Error('Корисник није пронађен');
      }

      return await korisnik.destroy();
    } catch (error) {
      return ApiError.throw(error, 'Настала ја грешка.');
    }
  };

  Korisnik.odobri = async function (id) {
    try {
      const korisnik = await Korisnik.findOne({ where: { id } });

      if (!korisnik) {
        throw new Error('Корисник није пронађен');
      }

      return await korisnik.update({
        status: STATUS.odobren,
      });
    } catch (error) {
      return ApiError.throw(error, 'Настала ја грешка.');
    }
  };

  Korisnik.promeniLozinku = async function ({
    username,
    password,
    newPassword,
  }) {
    const korisnik = await Korisnik.findOne({ where: { username } });

    if (!korisnik) {
      return ApiError.throw({}, 'Корисник није пронађен');
    }

    try {
      if (!(await korisnik.isValidPassword(password))) {
        return ApiError.throw({}, 'Корисник није пронађен');
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);

      return await korisnik.update({
        password: hash,
      });
    } catch (error) {
      return ApiError.throw(error, 'Лозинке нису усте');
    }
  };

  Korisnik.odbij = async function (id) {
    try {
      const korisnik = await Korisnik.findOne({ where: { id } });

      if (!korisnik) {
        return ApiError.throw({}, 'Корисник није пронађен');
      }

      return await korisnik.update({
        status: STATUS.odbijen,
      });
    } catch (error) {
      return ApiError.throw(error, 'Настала ја грешка.');
    }
  };

  return Korisnik;
}
