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
    } catch (err) {
      throw new Error(err);
    }
  });

  Korisnik.prototype.isValidPassword = async function (pw) {
    try {
      return await bcrypt.compare(pw, this.password);
    } catch (err) {
      throw new Error(err);
    }
  };

  /**
   * We remove the password from the model
   * when we send it as a response
   */
  Korisnik.prototype.toResponse = function (pw) {
    const obj = { ...this.toJSON() };

    delete obj.password;

    return obj;
  };

  Korisnik.authenticate = async function (username, password) {
    try {
      const user = await Korisnik.findOne({ where: { username } });
      if (await user.isValidPassword(password)) {
        return user;
      }
    } catch (error) {
      console.log;
      throw new Error('Лозинке нису исте.');
    }
  };

  return Korisnik;
}
