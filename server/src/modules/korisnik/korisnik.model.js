import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import ROLES from '~/utils/roles';
import STATUS from '~/utils/status';

export default function init(sequelize) {
  const Korisnik = sequelize.define(
    'Korisnik',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
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

  Korisnik.associate = function associate(models) {
    switch (this.role) {
      case ROLES.admin:
        this.admin = this.hasOne(models.Admin, {
          onDelete: 'CASCADE',
          foreignKey: 'korisnikId',
        });
        break;
      case ROLES.preduzece:
        this.preduzece = this.hasOne(models.Preduzece, {
          onDelete: 'CASCADE',
          foreignKey: 'korisnikId',
        });
        break;
      case ROLES.poljoprivrednik:
        this.poljoprivrednik = this.hasOne(models.Poljoprivrednik, {
          onDelete: 'CASCADE',
          foreignKey: 'korisnikId',
        });
        break;
      default:
        break;
    }
  };

  // eslint-disable-next-line no-shadow
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

  // eslint-disable-next-line func-names
  Korisnik.prototype.isValidPassword = async (pw) => {
    try {
      return await bcrypt.compare(pw, this.password);
    } catch (err) {
      throw new Error(err);
    }
  };

  Korisnik.prototype.toJson = async () => {
    const values = { ...this.get() };

    delete values.password;
    return values;
  };

  return Korisnik;
}
