'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var http = _interopDefault(require('http'));
var express = require('express');
var express__default = _interopDefault(express);
var compression = _interopDefault(require('compression'));
var cors = _interopDefault(require('cors'));
var methodOverride = _interopDefault(require('method-override'));
var debug = _interopDefault(require('debug'));
var bodyParser = _interopDefault(require('body-parser'));
var helmet = _interopDefault(require('helmet'));
var expressValidation = require('express-validation');
var HTTPStatus = _interopDefault(require('http-status'));
var expressJoiValidation = require('express-joi-validation');
var Joi = _interopDefault(require('@hapi/joi'));
var Sequelize = require('sequelize');
var Sequelize__default = _interopDefault(Sequelize);
var bcrypt = _interopDefault(require('bcrypt'));
var hcaptcha = require('hcaptcha');
var listEndpoints = _interopDefault(require('express-list-endpoints'));

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var validator = expressJoiValidation.createValidator();

var login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});
var registerPoljoprivrednik = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthPlace: Joi.string().required(),
  birthDate: Joi.string().required()
});
var registerPreduzece = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  location: Joi.string().required(),
  dateOfCreation: Joi.string().required()
});
var reset = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  newPassword: Joi.string().required()
});
var captcha = Joi.object({
  token: Joi.string().required()
});

var config = {
  PORT: process.env.PORT || '3000',
  DB_DIALECT: process.env.DB_DIALECT || 'mysql',
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD
};

var ROLES = {
  admin: 'admin',
  poljoprivrednik: 'poljoprivrednik',
  preduzece: 'preduzece'
};

var STATUS = {
  naCekanju: 'naCekanju',
  odobren: 'odobren',
  odbijen: 'odbijen'
};

function init(sequelize) {
  var Korisnik = sequelize.define('Korisnik', {
    email: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING
    },
    phone: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.DataTypes.ENUM([ROLES.admin, ROLES.poljoprivrednik, ROLES.preduzece]),
      allowNull: false
    },
    status: {
      type: Sequelize.DataTypes.ENUM([STATUS.naCekanju, STATUS.odobren, STATUS.odbijen]),
      defaultValue: STATUS.naCekanju,
      allowNull: false
    },
    username: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    freezeTableName: true
  });
  Korisnik.beforeSave( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (user) {
      try {
        if (user.changed('password')) {
          var salt = yield bcrypt.genSalt(10);
          var hash = yield bcrypt.hash(user.password, salt); // eslint-disable-next-line no-param-reassign

          user.password = hash;
        }
      } catch (error) {
        return ApiError.throw(error, 'Настала ја грешка.');
      }
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  Korisnik.prototype.isValidPassword = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* (pw) {
      try {
        return yield bcrypt.compare(pw, this.password);
      } catch (error) {
        return ApiError.throw(error, 'Настала ја грешка.');
      }
    });

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * We remove the password from the model
   * when we send it as a response
   */


  Korisnik.prototype.toResponse = function (pw) {
    var korisnik = _objectSpread2({}, this.toJSON());

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

  Korisnik.odbrisi = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(function* (id) {
      try {
        var korisnik = yield Korisnik.findOne({
          where: {
            id
          }
        });

        if (!korisnik) {
          throw new Error('Корисник није пронађен');
        }

        return yield korisnik.destroy();
      } catch (error) {
        return ApiError.throw(error, 'Настала ја грешка.');
      }
    });

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  Korisnik.odobri = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(function* (id) {
      try {
        var korisnik = yield Korisnik.findOne({
          where: {
            id
          }
        });

        if (!korisnik) {
          throw new Error('Корисник није пронађен');
        }

        return yield korisnik.update({
          status: STATUS.odobren
        });
      } catch (error) {
        return ApiError.throw(error, 'Настала ја грешка.');
      }
    });

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  Korisnik.promeniLozinku = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(function* (_ref5) {
      var {
        username,
        password,
        newPassword
      } = _ref5;
      var korisnik = yield Korisnik.findOne({
        where: {
          username
        }
      });

      if (!korisnik) {
        return ApiError.throw({}, 'Корисник није пронађен');
      }

      try {
        if (!(yield korisnik.isValidPassword(password))) {
          return ApiError.throw({}, 'Корисник није пронађен');
        }

        var salt = yield bcrypt.genSalt(10);
        var hash = yield bcrypt.hash(newPassword, salt);
        return yield korisnik.update({
          password: hash
        });
      } catch (error) {
        return ApiError.throw(error, 'Лозинке нису усте');
      }
    });

    return function (_x5) {
      return _ref6.apply(this, arguments);
    };
  }();

  Korisnik.odbij = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(function* (id) {
      try {
        var korisnik = yield Korisnik.findOne({
          where: {
            id
          }
        });

        if (!korisnik) {
          return ApiError.throw({}, 'Корисник није пронађен');
        }

        return yield korisnik.update({
          status: STATUS.odbijen
        });
      } catch (error) {
        return ApiError.throw(error, 'Настала ја грешка.');
      }
    });

    return function (_x6) {
      return _ref7.apply(this, arguments);
    };
  }();

  return Korisnik;
}

function init$1(sequelize) {
  var Preduzece = sequelize.define('Preduzece', {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    dateOfCreation: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
  return Preduzece;
}

function init$2(sequelize) {
  var Admin = sequelize.define('Admin', {
    firstName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
  return Admin;
}

function init$3(sequelize) {
  var Poljoprivrednik = sequelize.define('Poljoprivrednik', {
    firstName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    birthPlace: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    birthDate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
  return Poljoprivrednik;
}

function init$4(sequelize) {
  var Magacin = sequelize.define('Magacin', {}, {
    freezeTableName: true
  });
  return Magacin;
}

function init$5(sequelize) {
  var Ocena = sequelize.define('Ocena', {
    ocena: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });
  return Ocena;
}

var PRODUCT_TYPE = {
  sadnica: 'sadnica',
  preparat: 'preparat'
};

function init$6(sequelize) {
  var _this = this;

  var schema = {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false
    },
    manufacturer: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.DataTypes.DECIMAL,
      allowNull: false
    },
    quantity: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: Sequelize.DataTypes.ENUM([PRODUCT_TYPE.sadnica, PRODUCT_TYPE.preparat]),
      allowNull: false
    },
    value: {
      // Ili vreme ubrzanja ili vreme razvoja zavisi za tip
      type: Sequelize.DataTypes.DATE,
      allowNull: false
    }
  };
  var tableParams = {
    freezeTableName: true
  };
  var Proizvod = sequelize.define('Proizvod', schema, tableParams);
  var KupljeniProizvod = sequelize.define('KupljeniProizvod', schema, tableParams);
  Proizvod.prototype.toJson = /*#__PURE__*/_asyncToGenerator(function* () {
    return _objectSpread2({}, _this.get());
  });
  Proizvod.prototype.toNarudzbinu = /*#__PURE__*/_asyncToGenerator(function* () {//
  });
  return [Proizvod, KupljeniProizvod];
}

function init$7(sequelize) {
  var Narudzbina = sequelize.define('Narudzbina', {
    total: {
      type: Sequelize.DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });
  return Narudzbina;
}

function init$8(sequelize) {
  var Komentar = sequelize.define('Komentar', {
    komentar: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });
  return Komentar;
}

function init$9(sequelize) {
  var Rasadnik = sequelize.define('Rasadnik', {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    width: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    length: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    temperature: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 18
    },
    waterLevel: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 200
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
  return Rasadnik;
}

function init$a(sequelize) {
  var Kurir = sequelize.define('Kurir', {
    firstName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    zauzetDo: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
  return Kurir;
}

var {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  DB_PORT
} = config;
var sequelize = new Sequelize__default(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
  logging: () => {},
  timezone: '+02:00'
});
/**
 * Define all models
 */

var Korisnik = init(sequelize);
var Preduzece = init$1(sequelize);
var Admin = init$2(sequelize);
var Poljoprivrednik = init$3(sequelize);
var Komentar = init$8(sequelize);
var Ocena = init$5(sequelize);
var Kurir = init$a(sequelize);
var Rasadnik = init$9(sequelize);
var Magacin = init$4(sequelize);
var Narudzbina = init$7(sequelize);
var [Proizvod, KupljeniProizvod] = init$6(sequelize);
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
var db = {
  sequelize,
  Sequelize: Sequelize__default,
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
  KupljeniProizvod
};

class ApiError$1 {
  static throw(error, message) {
    console.log(error);
    throw new Error(message);
  }

}

var login$1 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (username, password) {
    var korisnik;

    try {
      korisnik = yield db.Korisnik.findOne({
        where: {
          username
        },
        include: [{
          model: db.Preduzece
        }, {
          model: db.Poljoprivrednik
        }, {
          model: db.Admin
        }]
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Корисник није пронађен');
    }

    try {
      if (yield korisnik.isValidPassword(password)) {
        return korisnik;
      }
    } catch (error) {
      return ApiError$1.throw(error, 'Лозинке нису исте.');
    }
  });

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var registerPoljoprivrednik$1 = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (_ref2) {
    var {
      username,
      password,
      email,
      phone,
      firstName,
      lastName,
      birthPlace,
      birthDate
    } = _ref2;

    if (yield db.Korisnik.findOne({
      where: {
        username
      }
    })) {
      throw new Error('Корисничко име је већ заузето.');
    }

    try {
      var korisnik = yield db.Korisnik.create({
        username,
        password,
        email,
        role: ROLES.poljoprivrednik,
        status: STATUS.naCekanju,
        phone
      });
      var poljoprivrednik = yield db.Poljoprivrednik.create({
        firstName,
        lastName,
        birthPlace,
        birthDate,
        KorisnikId: korisnik.id
      });
      return [korisnik, poljoprivrednik];
    } catch (error) {
      return ApiError$1.throw(error, 'Регистрација корисника није успела.');
    }
  });

  return function registerPoljoprivrednik(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var registerPreduzece$1 = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (_ref4) {
    var {
      username,
      password,
      email,
      phone,
      name,
      location,
      dateOfCreation
    } = _ref4;

    if (yield db.Korisnik.findOne({
      where: {
        username
      }
    })) {
      throw new Error('Корисничко име је већ заузето.');
    }

    try {
      var korisnik = yield db.Korisnik.create({
        username,
        password,
        email,
        role: ROLES.preduzece,
        status: STATUS.naCekanju,
        phone: ''
      });
      var preduzece = yield db.Preduzece.create({
        name,
        location,
        dateOfCreation,
        KorisnikId: korisnik.id
      });
      return [korisnik, preduzece];
    } catch (error) {
      return ApiError$1.throw(error, 'Регистрација корисника није успела.');
    }
  });

  return function registerPreduzece(_x4) {
    return _ref5.apply(this, arguments);
  };
}();
var reset$1 = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (_ref6) {
    var {
      username,
      password,
      newPassword
    } = _ref6;

    try {
      yield db.Korisnik.promeniLozinku({
        username,
        password,
        newPassword
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка.');
    }
  });

  return function reset(_x5) {
    return _ref7.apply(this, arguments);
  };
}();
var captcha$1 = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (token) {
    var secret = process.env.NO_CAPTCHA_SECRET;

    try {
      return yield hcaptcha.verify(secret, token);
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка.');
    }
  });

  return function captcha(_x6) {
    return _ref8.apply(this, arguments);
  };
}();

var login$2 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var {
      username,
      password
    } = req.body;

    try {
      var korisnik = yield login$1(username, password);
      res.json(korisnik.toResponse());
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function login(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var captcha$2 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    var {
      token
    } = req.body;

    try {
      yield captcha$1(token);
      res.json({
        message: 'Успешна верификација'
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function captcha(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var reset$2 = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var {
      username,
      password,
      newPassword
    } = req.body;

    try {
      yield reset$1({
        username,
        password,
        newPassword
      });
      res.json({
        message: 'Успешна промена лозинке.'
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function reset(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
var registerPoljoprivrednik$2 = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var {
      username,
      password,
      email,
      phone,
      firstName,
      lastName,
      birthPlace,
      birthDate
    } = req.body;

    try {
      var [korisnik] = yield registerPoljoprivrednik$1({
        username,
        password,
        email,
        phone,
        firstName,
        lastName,
        birthPlace,
        birthDate
      });
      res.json(korisnik.toResponse());
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function registerPoljoprivrednik(_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();
var registerPreduzece$2 = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var {
      username,
      password,
      email,
      phone,
      name,
      location,
      dateOfCreation
    } = req.body;

    try {
      var [korisnik] = yield registerPreduzece$1({
        username,
        password,
        email,
        phone,
        name,
        location,
        dateOfCreation
      });
      res.json(korisnik.toResponse());
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function registerPreduzece(_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();

var router = express.Router();
router.post('/login', validator.body(login), login$2);
router.post('/register/poljoprivrednik', validator.body(registerPoljoprivrednik), registerPoljoprivrednik$2);
router.post('/register/preduzece', validator.body(registerPreduzece), registerPreduzece$2);
router.post('/reset', validator.body(reset), reset$2);
router.post('/captcha', validator.body(captcha), captcha$2);

var odbij = Joi.object({
  id: Joi.string().required()
});
var azuriraj = Joi.object({
  id: Joi.string().required()
});
var obrisi = Joi.object({
  id: Joi.string().required()
});
var korisnik = Joi.object({
  id: Joi.string().required()
});
var odobri = Joi.object({
  id: Joi.string().required()
});

var korisnik$1 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (id) {
    try {
      return yield db.Korisnik.findOne({
        where: {
          id
        },
        include: [{
          model: db.Preduzece
        }, {
          model: db.Poljoprivrednik
        }, {
          model: db.Admin
        }]
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Корисник није пронађен');
    }
  });

  return function korisnik(_x) {
    return _ref.apply(this, arguments);
  };
}();
var odobri$1 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (id) {
    try {
      yield db.Korisnik.odobri(id);
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка');
    }
  });

  return function odobri(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var odbij$1 = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (id) {
    try {
      yield db.Korisnik.odbij(id);
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка');
    }
  });

  return function odbij(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var azuriraj$1 = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* () {
  });

  return function azuriraj() {
    return _ref4.apply(this, arguments);
  };
}();
var obrisi$1 = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* () {
  });

  return function obrisi() {
    return _ref5.apply(this, arguments);
  };
}();
var korisniciNaCekanju = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* () {
    try {
      var korisnici = db.Korisnik.findAll({
        where: {
          status: STATUS.naCekanju
        }
      });
      return korisnici.map(korisnik => korisnik.toResponse());
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка');
    }
  });

  return function korisniciNaCekanju() {
    return _ref7.apply(this, arguments);
  };
}();
var preduzeca = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (id) {
    try {
      var korisnici = db.Korisnik.findAll({
        where: {
          role: ROLES.preduzece
        },
        include: [{
          model: db.Preduzece
        }]
      });
      return korisnici.map(korisnik => korisnik.toResponse());
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка');
    }
  });

  return function preduzeca(_x4) {
    return _ref8.apply(this, arguments);
  };
}();
var poljoprivrednici = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (id) {
    try {
      var korisnici = db.Korisnik.findAll({
        where: {
          role: ROLES.poljoprivrednik
        },
        include: [{
          model: db.Poljoprivrednik
        }]
      });
      return korisnici.map(korisnik => korisnik.toResponse());
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка');
    }
  });

  return function poljoprivrednici(_x5) {
    return _ref9.apply(this, arguments);
  };
}();

var korisnik$2 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      id
    } = req.params;

    try {
      var _korisnik = yield korisnik$1(id);

      res.json(_korisnik.toResponse());
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function korisnik(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var azuriraj$2 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var {
      id
    } = req.params;

    try {
      yield azuriraj$1(id);
      res.json({
        message: 'Успешно ажуриран корисник.'
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function azuriraj(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var korisniciNaCekanju$1 = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var korisnici = yield korisniciNaCekanju();
      res.json(korisnici);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function korisniciNaCekanju(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var poljoprivrednici$1 = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var korisnici = yield poljoprivrednici();
      res.json(korisnici);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function poljoprivrednici(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var preduzeca$1 = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var korisnici = yield preduzeca();
      res.json(korisnici);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function preduzeca(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var odbij$2 = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res, next) {
    var {
      id
    } = req.body;

    try {
      yield odbij$1(id);
      res.json({
        message: 'Успешно одбијен корисник.'
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function odbij(_x13, _x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();
var odobri$2 = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res, next) {
    var {
      id
    } = req.body;

    try {
      yield odobri$1(id);
      res.json({
        message: 'Успешно одобрен корисник.'
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function odobri(_x16, _x17, _x18) {
    return _ref8.apply(this, arguments);
  };
}();
var obrisi$2 = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res, next) {
    var {
      id
    } = req.body;

    try {
      yield obrisi$1(id);
      res.json({
        message: 'Успешно обрисан корисник.'
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function obrisi(_x19, _x20, _x21) {
    return _ref9.apply(this, arguments);
  };
}();

var router$1 = express.Router();
router$1.post('/odbij', validator.body(odbij), odbij$2);
router$1.post('/odobri', validator.body(odobri), odobri$2);
router$1.get('/korisnik/:id', validator.params(korisnik), korisnik$2);
router$1.post('/korisnik/:id', validator.params(azuriraj), azuriraj$2);
router$1.delete('/korisnik/:id', validator.params(obrisi), obrisi$2);
router$1.get('/korisnici-na-cekanju', korisniciNaCekanju$1);
router$1.get('/poljoprivrednici', poljoprivrednici$1);
router$1.get('/preduzeca', preduzeca$1);

var router$2 = express.Router();
router$2.get('/', (req, res) => {
  res.json({
    statusCode: HTTPStatus.OK,
    message: 'Welcome to 13e113pia project API'
  });
});
router$2.use('/auth/', router);
router$2.use('/korisnici/', router$1);
router$2.all('*', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    res.status(HTTPStatus.NOT_FOUND).json('Страница није пронађена');
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
console.log(listEndpoints(router$2));

var app = express__default();
var log = debug('app');
/**
 * App Middleware
 */

app.use(cors());
app.use(methodOverride());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
/**
 * Database Setup
 */

db.sequelize.authenticate().then(() => {
  log('Connected to the database');
}).catch(err => {
  log('Unable to connect to the database: ', err);
});
/**
 * Database migrations
 *
 database.sequelize.sync({ force: true });
 */

/**
 * API Routes
 */

app.use(router$2);
/**
 * Validation Errors
 */

app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    return res.status(err.status).json(err);
  }

  return next(err);
});
/**
 * API Errors
 */

app.use((err, req, res, next) => {
  if (err instanceof APIClientError) {
    return res.status(err.status).json(err.toJson());
  }

  return next(err);
});
/**
 * Unhandled Errors
 */

process.on('unhandledRejection', error => {
  // eslint-disable-next-line no-console
  console.error('Uncaught Error', error);
});

/* eslint-disable no-console */
var {
  PORT
} = config;

var onError = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error("Port ".concat(PORT, " requires elevated privileges"));
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error("Port ".concat(PORT, " is already in use"));
      process.exit(1);
      break;

    default:
      throw error;
  }
};

var server = http.createServer(app);
server.listen(PORT, () => {
  console.log('==========**********==========');
  console.log('======= SERVER RUNNING =======');
  console.log("========= PORT ".concat(PORT, " =========="));
  console.log('==========**********==========');
});
server.on('error', onError);
