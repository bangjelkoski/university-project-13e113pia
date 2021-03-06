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
var cron = _interopDefault(require('node-cron'));
var HTTPStatus = _interopDefault(require('http-status'));
var expressJoiValidation = require('express-joi-validation');
var Joi = _interopDefault(require('@hapi/joi'));
var Sequelize = require('sequelize');
var Sequelize__default = _interopDefault(Sequelize);
var bcrypt = _interopDefault(require('bcrypt'));
var hcaptcha = require('hcaptcha');
var Chance = _interopDefault(require('chance'));
var listEndpoints = _interopDefault(require('express-list-endpoints'));
var nodemailer = _interopDefault(require('nodemailer'));

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

class ApiError$1 {
  static throw(error, message) {
    console.log(error);
    throw new Error(message);
  }

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
  DB_PASSWORD: process.env.DB_PASSWORD,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD
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
    avatar: {
      allowNull: true,
      defaultValue: '',
      type: Sequelize.DataTypes.TEXT
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

  Korisnik.promeniLozinku = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(function* (_ref4) {
      var {
        username,
        password,
        newPassword
      } = _ref4;
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

    return function (_x4) {
      return _ref5.apply(this, arguments);
    };
  }();

  Korisnik.odobri = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(function* (id) {
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

function init$5(sequelize) {
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
      type: Sequelize.DataTypes.DECIMAL(10, 2),
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
      // Ili vreme ubrzanja ili vreme razvoja zavisi za tip u ms
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    }
  };
  var tableParams = {
    freezeTableName: true
  };
  var Proizvod = sequelize.define('Proizvod', schema, tableParams);
  var NaruceniProizvod = sequelize.define('NaruceniProizvod', schema, tableParams);
  Proizvod.prototype.toJson = /*#__PURE__*/_asyncToGenerator(function* () {
    return _objectSpread2({}, _this.get());
  });
  Proizvod.prototype.toNarudzbinu = /*#__PURE__*/_asyncToGenerator(function* () {//
  });
  return [Proizvod, NaruceniProizvod];
}

var ORDER_STATUS = {
  naCekanju: 'naCekanju',
  odobrena: 'odobrena',
  odbijena: 'odbijena'
};

function init$6(sequelize) {
  var Narudzbina = sequelize.define('Narudzbina', {
    total: {
      type: Sequelize.DataTypes.DECIMAL,
      defaultValue: 0,
      allowNull: false
    },
    status: {
      type: Sequelize.DataTypes.ENUM([ORDER_STATUS.naCekanju, ORDER_STATUS.odobrena, ORDER_STATUS.odbijena]),
      defaultValue: ORDER_STATUS.naCekanju,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });

  Narudzbina.odobri = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (id, PreduzeceId) {
      try {
        var narudzbina = yield Narudzbina.findOne({
          where: {
            id,
            PreduzeceId
          }
        });

        if (!narudzbina) {
          throw new Error('Нарудђбина није пронађен');
        }

        return yield narudzbina.update({
          status: ORDER_STATUS.odobrena
        });
      } catch (error) {
        return ApiError.throw(error, 'Настала ја грешка.');
      }
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  Narudzbina.odbij = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* (id, PreduzeceId) {
      try {
        var narudzbina = yield Narudzbina.findOne({
          where: {
            id,
            PreduzeceId
          }
        });

        if (!narudzbina) {
          return ApiError.throw({}, 'Нарудђбина није пронађен');
        }

        return yield narudzbina.update({
          status: ORDER_STATUS.odbijena
        });
      } catch (error) {
        return ApiError.throw(error, 'Настала ја грешка.');
      }
    });

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  return Narudzbina;
}

function init$7(sequelize) {
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

function init$8(sequelize) {
  var Magacin = sequelize.define('Magacin', {}, {
    freezeTableName: true
  });
  return Magacin;
}

function init$9(sequelize) {
  var Sadnik = sequelize.define('Sadnik', {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    manufacturer: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    // Milisekundi od datuma kreiranja potrebno da se sadnik razvije
    ms: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    // Datum kada treba izvaditi sadnicu sa rasadnika
    izvadiNa: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
      default: null
    }
  }, {
    freezeTableName: true
  });
  return Sadnik;
}

function init$a(sequelize) {
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
      type: Sequelize.DataTypes.DECIMAL(10, 2),
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

function init$b(sequelize) {
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
var Komentar = init$7(sequelize);
var Ocena = init$4(sequelize);
var Kurir = init$b(sequelize);
var Rasadnik = init$a(sequelize);
var Magacin = init$8(sequelize);
var Narudzbina = init$6(sequelize);
var Sadnik = init$9(sequelize);
var [Proizvod, NaruceniProizvod] = init$5(sequelize);
/**
 * Relationships
 */

Korisnik.hasOne(Admin);
Korisnik.hasOne(Poljoprivrednik);
Korisnik.hasOne(Preduzece);
Korisnik.hasMany(Komentar, {
  as: 'Komentari'
});
Korisnik.hasMany(Ocena, {
  as: 'Ocene'
});
Proizvod.hasMany(Ocena, {
  as: 'Ocene'
});
Proizvod.hasMany(Komentar, {
  as: 'Komentari'
});
Preduzece.hasMany(Kurir, {
  as: 'Kuriri'
});
Preduzece.hasMany(Proizvod, {
  as: 'Proizvodi'
});
Rasadnik.hasOne(Magacin);
Rasadnik.belongsTo(Poljoprivrednik);
Rasadnik.hasMany(Sadnik, {
  as: 'Sadnici'
});
Admin.belongsTo(Korisnik);
Poljoprivrednik.belongsTo(Korisnik);
Preduzece.belongsTo(Korisnik);
Magacin.belongsTo(Rasadnik);
Magacin.hasMany(Narudzbina, {
  as: 'Narudzbine'
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
  as: 'NaruceniProizvodi'
});
Proizvod.belongsTo(Preduzece);
NaruceniProizvod.belongsTo(Narudzbina);
NaruceniProizvod.belongsTo(Proizvod, {
  onDelete: 'SET NULL'
});
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
  Narudzbina,
  Proizvod,
  Sadnik,
  Magacin,
  NaruceniProizvod
};

var tops = ['NoHair', 'Eyepatch', 'Hat', 'Hijab', 'Turban', 'WinterHat1', 'WinterHat2', 'WinterHat3', 'WinterHat4', 'LongHairBigHair', 'LongHairBob', 'LongHairBun', 'LongHairCurly', 'LongHairCurvy', 'LongHairDreads', 'LongHairFrida', 'LongHairFro', 'LongHairFroBand', 'LongHairNotTooLong', 'LongHairShavedSides', 'LongHairMiaWallace', 'LongHairStraight', 'LongHairStraight2', 'LongHairStraightStrand', 'ShortHairDreads01', 'ShortHairDreads02', 'ShortHairFrizzle', 'ShortHairShaggyMullet', 'ShortHairShortCurly', 'ShortHairShortFlat', 'ShortHairShortRound', 'ShortHairShortWaved', 'ShortHairSides', 'ShortHairTheCaesar', 'ShortHairTheCaesarSidePart'];
var hairColors = ['Black', 'Blue01', 'Blue02', 'Blue03', 'Gray01', 'Gray02', 'Heather', 'PastelBlue', 'PastelGreen', 'PastelOrange', 'PastelRed', 'PastelYellow', 'Pink', 'Red', 'White'];
var accessories = ['Blank', 'Kurt', 'Prescription01', 'Prescription02', 'Round', 'Sunglasses', 'Wayfarers'];
var facials = ['Blank', 'BeardMedium', 'BeardLight', 'BeardMagestic', 'MoustacheFancy', 'MoustacheMagnum'];
var facialColors = ['Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark', 'Platinum', 'Red'];
var clothings = ['BlazerShirt', 'BlazerSweater', 'CollarSweater', 'GraphicShirt', 'Hoodie', 'Overall', 'ShirtCrewNeck', 'ShirtScoopNeck', 'ShirtVNeck'];
var clothingColors = ['Black', 'Blue01', 'Blue02', 'Blue03', 'Gray01', 'Gray02', 'Heather', 'PastelBlue', 'PastelGreen', 'PastelOrange', 'PastelRed', 'PastelYellow', 'Pink', 'Red', 'White'];
var eyes = ['Close', 'Cry', 'Default', 'Dizzy', 'EyeRoll', 'Happy', 'Hearts', 'Side', 'Squint', 'Surprised', 'Wink', 'WinkWacky'];
var eyebrows = ['Angry', 'AngryNatural', 'Default', 'DefaultNatural', 'FlatNatural', 'RaisedExcited', 'RaisedExcitedNatural', 'SadConcerned', 'SadConcernedNatural', 'UnibrowNatural', 'UpDown', 'UpDownNatural'];
var mouths = ['Concerned', 'Default', 'Disbelief', 'Eating', 'Grimace', 'Sad', 'ScreamOpen', 'Serious', 'Smile', 'Tongue', 'Twinkle', 'Vomit'];
var skins = ['Tanned', 'Yellow', 'Pale', 'Light', 'Brown', 'DarkBrown', 'Black'];

var randomize = array => {
  return array[Math.floor(Math.random() * array.length)];
};

function avatar () {
  var top = randomize(tops);
  var accessory = randomize(accessories);
  var hairColor = randomize(hairColors);
  var facial = randomize(facials);
  var facialColor = randomize(facialColors);
  var clothing = randomize(clothings);
  var clothingColor = randomize(clothingColors);
  var eye = randomize(eyes);
  var eyebrow = randomize(eyebrows);
  var mouth = randomize(mouths);
  var skin = randomize(skins);
  return "https://avataaars.io/?avatarStyle=Circle&topType=".concat(top, "&accessoriesType=").concat(accessory, "&hairColor=").concat(hairColor, "&facialHairType=").concat(facial, "&facialHairColor=").concat(facialColor, "&clotheType=").concat(clothing, "&clotheColor=").concat(clothingColor, "&eyeType=").concat(eye, "&eyebrowType=").concat(eyebrow, "&mouthType=").concat(mouth, "&skinColor=").concat(skin);
}

var chance = new Chance();
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

    if (!korisnik) {
      throw new Error('Корисник није пронађен.');
    }

    try {
      if (yield korisnik.isValidPassword(password)) {
        return korisnik;
      }
    } catch (error) {
      return ApiError$1.throw(error, 'Корисник није пронађен.');
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
        avatar: avatar(),
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
        avatar: avatar(),
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
      /** Za svako preduzece kreiramo 5 kurira */

      yield Promise.all(new Array(5).map( /*#__PURE__*/function () {
        var _ref6 = _asyncToGenerator(function* (kurir) {
          yield db.Kurir.create({
            firstName: chance.first(),
            lastName: chance.last(),
            zauzetDo: Date.now()
          });
        });

        return function (_x5) {
          return _ref6.apply(this, arguments);
        };
      }()));
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
  var _ref8 = _asyncToGenerator(function* (_ref7) {
    var {
      username,
      password,
      newPassword
    } = _ref7;

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

  return function reset(_x6) {
    return _ref8.apply(this, arguments);
  };
}();
var captcha$1 = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (token) {
    var secret = process.env.NO_CAPTCHA_SECRET;

    try {
      return yield hcaptcha.verify(secret, token);
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка.');
    }
  });

  return function captcha(_x7) {
    return _ref9.apply(this, arguments);
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
  id: Joi.number().required()
});
var azurirajParams = Joi.object({
  id: Joi.number().required()
});
var narucioProizvod = Joi.object({
  id: Joi.number().required(),
  proizvodId: Joi.number().required()
});
var azuriraj = Joi.object({
  username: Joi.string().required(),
  password: Joi.optional(),
  phone: Joi.string().required(),
  email: Joi.string().required()
});
var obrisi = Joi.object({
  id: Joi.number().required()
});
var korisnik = Joi.object({
  id: Joi.number().required()
});
var odobri = Joi.object({
  id: Joi.number().required()
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
  var _ref5 = _asyncToGenerator(function* (_ref4) {
    var {
      id,
      username,
      password,
      phone,
      email
    } = _ref4;

    if (yield db.Korisnik.findOne({
      where: {
        username,
        id: {
          $not: id
        }
      }
    })) {
      throw new Error('Корисничко име је већ заузето.');
    }

    try {
      var _korisnik = yield db.Korisnik.findOne({
        where: {
          id
        }
      });

      var salt = yield bcrypt.genSalt(10);
      var hash = yield bcrypt.hash(password, salt);
      yield _korisnik.update({
        username,
        password: hash,
        phone,
        email
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка');
    }
  });

  return function azuriraj(_x4) {
    return _ref5.apply(this, arguments);
  };
}();
var obrisi$1 = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (id) {
    try {
      var _korisnik2 = yield db.Korisnik.findOne({
        where: {
          id
        }
      });

      yield _korisnik2.destroy();
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка');
    }
  });

  return function obrisi(_x5) {
    return _ref6.apply(this, arguments);
  };
}();
var korisniciNaCekanju = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* () {
    try {
      var korisnici = yield db.Korisnik.findAll({
        where: {
          status: STATUS.naCekanju
        },
        include: [{
          model: db.Preduzece
        }, {
          model: db.Poljoprivrednik
        }, {
          model: db.Admin
        }]
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

  return function preduzeca(_x6) {
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

  return function poljoprivrednici(_x7) {
    return _ref9.apply(this, arguments);
  };
}();
var narucioProizvod$1 = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(function* (id, proizvodId) {
    try {
      var poljoprivrednik = yield db.Poljoprivrednik.findOne({
        where: {
          KorisnikId: id
        }
      });

      if (!poljoprivrednik) {
        return false;
      }

      var rasadnici = yield db.Rasadnik.findAll({
        where: {
          PoljoprivrednikId: poljoprivrednik.id
        }
      });

      if (!rasadnici.length) {
        return false;
      }

      var rasadniciId = rasadnici.map((_ref11) => {
        var {
          id
        } = _ref11;
        return id;
      });
      var magacini = yield db.Magacin.findAll({
        where: {
          RasadnikId: {
            [db.Sequelize.Op.in]: rasadniciId
          }
        }
      });

      if (!magacini.length) {
        return false;
      }

      var magaciniId = magacini.map((_ref12) => {
        var {
          id
        } = _ref12;
        return id;
      });
      var narudzbine = yield db.Narudzbina.findAll({
        where: {
          MagacinId: {
            [db.Sequelize.Op.in]: magaciniId
          }
        },
        include: [{
          model: db.NaruceniProizvod,
          as: 'NaruceniProizvodi'
        }]
      });

      if (!narudzbine.length) {
        return false;
      }

      var naruceniProizvodi = narudzbine.reduce((prev, narudzbina) => {
        return [...prev, ...narudzbina.NaruceniProizvodi];
      }, []);
      return naruceniProizvodi.some((_ref13) => {
        var {
          ProizvodId
        } = _ref13;
        return ProizvodId === proizvodId;
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка');
    }
  });

  return function narucioProizvod(_x8, _x9) {
    return _ref10.apply(this, arguments);
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
    var {
      username,
      password,
      phone,
      email
    } = req.body;

    try {
      yield azuriraj$1({
        id,
        username,
        password,
        phone,
        email
      });
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
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var korisnici = yield korisniciNaCekanju();
      res.json(korisnici);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function korisniciNaCekanju(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var poljoprivrednici$1 = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var korisnici = yield poljoprivrednici();
      res.json(korisnici);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function poljoprivrednici(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var preduzeca$1 = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var korisnici = yield preduzeca();
      res.json(korisnici);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function preduzeca(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var odbij$2 = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res, next) {
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

  return function odbij(_x11, _x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();
var odobri$2 = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res, next) {
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

  return function odobri(_x14, _x15, _x16) {
    return _ref7.apply(this, arguments);
  };
}();
var obrisi$2 = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res, next) {
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

  return function obrisi(_x17, _x18, _x19) {
    return _ref8.apply(this, arguments);
  };
}();
var narucioProizvod$2 = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res, next) {
    var {
      id,
      proizvodId
    } = req.params;

    try {
      var _narucioProizvod = yield narucioProizvod$1(id, proizvodId);

      res.json(_narucioProizvod);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function narucioProizvod(_x20, _x21, _x22) {
    return _ref9.apply(this, arguments);
  };
}();

var router$1 = express.Router();
router$1.get('/:id/narucio-proizvod/:proizvodId', validator.params(narucioProizvod), narucioProizvod$2);
router$1.get('/na-cekanju', korisniciNaCekanju$1);
router$1.get('/poljoprivrednici', poljoprivrednici$1);
router$1.get('/preduzeca', preduzeca$1);
router$1.post('/:id/odbij', validator.params(odbij), odbij$2);
router$1.post('/:id/odobri', validator.params(odobri), odobri$2);
router$1.get('/:id', validator.params(korisnik), korisnik$2);
router$1.post('/:id', validator.params(azurirajParams), validator.body(azuriraj), azuriraj$2);
router$1.delete('/:id', validator.params(obrisi), obrisi$2);

var odbij$3 = Joi.object({
  id: Joi.number().required(),
  preduzeceId: Joi.number().required()
});
var odobri$3 = Joi.object({
  id: Joi.number().required(),
  preduzeceId: Joi.number().required()
});
var kreiraj = Joi.object({
  rasadnikId: Joi.number().required(),
  proizvodi: Joi.required()
});
var narudzbina = Joi.object({
  id: Joi.number().required(),
  preduzeceId: Joi.number().required()
});
var narudzbine = Joi.object({
  preduzeceId: Joi.number().required()
});

var proizvod = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (id) {
    try {
      return yield db.Proizvod.findOne({
        where: {
          id
        },
        include: [{
          model: db.Ocena,
          as: 'Ocene'
        }, {
          model: db.Komentar,
          as: 'Komentari'
        }]
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Производ није пронађен');
    }
  });

  return function proizvod(_x) {
    return _ref.apply(this, arguments);
  };
}();
var proizvodi = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (PreduzeceId) {
    try {
      return yield db.Proizvod.findAll({
        where: {
          PreduzeceId
        }
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка');
    }
  });

  return function proizvodi(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var kreiraj$1 = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (_ref3) {
    var {
      PreduzeceId,
      name,
      manufacturer,
      description,
      image,
      price,
      type,
      quantity,
      value
    } = _ref3;

    try {
      yield db.Proizvod.create({
        PreduzeceId,
        name,
        manufacturer,
        description,
        image,
        price,
        type,
        quantity,
        value
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка');
    }
  });

  return function kreiraj(_x3) {
    return _ref4.apply(this, arguments);
  };
}();
var obrisi$3 = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (id) {
    try {
      var _proizvod = yield db.Proizvod.findOne({
        where: {
          id
        }
      });

      yield _proizvod.destroy();
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка');
    }
  });

  return function obrisi(_x4) {
    return _ref5.apply(this, arguments);
  };
}();
var obrisiNarucen = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (id) {
    try {
      var _proizvod2 = yield db.NaruceniProizvod.findOne({
        where: {
          id
        }
      });

      yield _proizvod2.destroy();
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка');
    }
  });

  return function obrisiNarucen(_x5) {
    return _ref6.apply(this, arguments);
  };
}();

var narudzbina$1 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (id, PreduzeceId) {
    try {
      return yield db.Narudzbina.findOne({
        where: {
          id,
          PreduzeceId
        },
        include: [{
          model: db.Kurir
        }, {
          model: db.NaruceniProizvod,
          as: 'NaruceniProizvod'
        }]
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Наруђбина није пронађена');
    }
  });

  return function narudzbina(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var narudzbine$1 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (PreduzeceId) {
    try {
      return yield db.Narudzbina.findAll({
        where: {
          PreduzeceId
        },
        include: [{
          model: db.Kurir
        }, {
          model: db.NaruceniProizvod,
          as: 'NaruceniProizvodi'
        }]
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Наруђбина није пронађена');
    }
  });

  return function narudzbine(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
var kreiraj$2 = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (RasadnikId, proizvodi) {
    try {
      var PreduzeceId = proizvodi[0].PreduzeceId;
      var magacin = yield db.Magacin.findOne({
        where: {
          RasadnikId
        }
      });
      var total = proizvodi.reduce((previous, _ref4) => {
        var {
          quantity,
          price
        } = _ref4;
        return previous + quantity * price;
      }, 0);

      var _narudzbina = yield db.Narudzbina.create({
        total,
        MagacinId: magacin.id,
        PreduzeceId
      });

      yield Promise.all(proizvodi.map( /*#__PURE__*/function () {
        var _ref6 = _asyncToGenerator(function* (_ref5) {
          var {
            id,
            name,
            quantity,
            description,
            manufacturer,
            image,
            value,
            price,
            type
          } = _ref5;
          return yield db.NaruceniProizvod.create({
            name,
            description,
            type,
            manufacturer,
            image,
            quantity,
            price,
            value,
            ProizvodId: id,
            NarudzbinaId: _narudzbina.id
          });
        });

        return function (_x6) {
          return _ref6.apply(this, arguments);
        };
      }())); // Za svaki proizvod updejtuj stanje u databazi

      yield Promise.all(proizvodi.map( /*#__PURE__*/function () {
        var _ref7 = _asyncToGenerator(function* (proizvod) {
          var proizvodResult = yield db.Proizvod.findOne({
            where: {
              id: proizvod.id
            }
          });
          yield proizvodResult.update({
            quantity: proizvodResult.quantity - proizvod.quantity
          });
        });

        return function (_x7) {
          return _ref7.apply(this, arguments);
        };
      }())); // Vrati proizvode

      return yield db.Proizvod.findAll({
        where: {
          PreduzeceId
        }
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка');
    }
  });

  return function kreiraj(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();
var odobri$4 = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (id, preduzeceId) {
    try {
      yield db.Narudzbina.odobri(id, preduzeceId);
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка');
    }
  });

  return function odobri(_x8, _x9) {
    return _ref8.apply(this, arguments);
  };
}();
var odbij$4 = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (id, preduzeceId) {
    try {
      yield db.Narudzbina.odbij(id, preduzeceId);
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка');
    }
  });

  return function odbij(_x10, _x11) {
    return _ref9.apply(this, arguments);
  };
}();

var narudzbina$2 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      id,
      preduzeceId
    } = req.params;

    try {
      var _narudzbina = yield narudzbina$1(id, preduzeceId);

      res.json(_narudzbina);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function narudzbina(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var narudzbine$2 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var {
      preduzeceId
    } = req.params;

    try {
      var _narudzbine = yield narudzbine$1(preduzeceId);

      res.json(_narudzbine);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function narudzbine(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var kreiraj$3 = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    var {
      rasadnikId,
      proizvodi
    } = req.body;

    try {
      var updatedProizvodi = yield kreiraj$2(rasadnikId, proizvodi);
      res.json(updatedProizvodi);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function kreiraj(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
var odbij$5 = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res, next) {
    var {
      id,
      preduzeceId
    } = req.params;

    try {
      yield odbij$4(id, preduzeceId);
      res.json({
        message: 'Успешно одбијенa наруђбина.'
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function odbij(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();
var odobri$5 = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res, next) {
    var {
      id,
      preduzeceId
    } = req.params;

    try {
      yield odobri$4(id, preduzeceId);
      res.json({
        message: 'Успешно одобрена наруђбина.'
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function odobri(_x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

var router$2 = express.Router();
router$2.post('', validator.body(kreiraj), kreiraj$3);
router$2.get('/:preduzeceId', validator.params(narudzbine), narudzbine$2);
router$2.post('/:preduzeceId/:id/odbij', validator.params(odbij$3), odbij$5);
router$2.post('/:preduzeceId/:id/odobri', validator.params(odobri$3), odobri$5);
router$2.get('/:preduzeceId/:id', validator.params(narudzbina), narudzbina$2);

var proizvod$1 = Joi.object({
  id: Joi.number().required(),
  preduzeceId: Joi.number().required()
});
var kreirajParams = Joi.object({
  preduzeceId: Joi.number().required()
});
var kreiraj$4 = Joi.object({
  name: Joi.string().required(),
  manufacturer: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  price: Joi.number().required(),
  type: Joi.string().required(),
  quantity: Joi.number().required(),
  value: Joi.number().required()
});
var proizvodi$1 = Joi.object({
  preduzeceId: Joi.number().required()
});
var obrisi$4 = Joi.object({
  id: Joi.number().required(),
  preduzeceId: Joi.number().required()
});
var obrisiNarucen$1 = Joi.object({
  id: Joi.number().required()
});

var proizvod$2 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      id
    } = req.params;

    try {
      var _proizvod = yield proizvod(id);

      res.json(_proizvod);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function proizvod(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var proizvodi$2 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var {
      preduzeceId
    } = req.params;

    try {
      var _proizvodi = yield proizvodi(preduzeceId);

      res.json(_proizvodi);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function proizvodi(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var obrisi$5 = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    var {
      id
    } = req.params;

    try {
      yield obrisi$3(id);
      res.json({
        message: 'Успешно обрисан производ.'
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function obrisi(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
var obrisiNarucen$2 = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res, next) {
    var {
      id
    } = req.params;

    try {
      yield obrisiNarucen(id);
      res.json({
        message: 'Успешно обрисан производ.'
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function obrisiNarucen(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();
var kreiraj$5 = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res, next) {
    var {
      preduzeceId
    } = req.params;
    var {
      name,
      manufacturer,
      description,
      image,
      price,
      type,
      quantity,
      value
    } = req.body;

    try {
      yield kreiraj$1({
        PreduzeceId: preduzeceId,
        name,
        manufacturer,
        description,
        image,
        price,
        type,
        quantity,
        value
      });
      res.json({
        message: 'Успешно креиран производ.'
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function kreiraj(_x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

var router$3 = express.Router();
router$3.delete('/narucen/:id', validator.params(obrisiNarucen$1), obrisiNarucen$2);
router$3.get('/:preduzeceId', validator.params(proizvodi$1), proizvodi$2);
router$3.post('/:preduzeceId', validator.params(kreirajParams), validator.body(kreiraj$4), kreiraj$5);
router$3.get('/:preduzeceId/:id', validator.params(proizvod$1), proizvod$2);
router$3.delete('/:preduzeceId/:id', validator.params(obrisi$4), obrisi$5);

var kuriri = Joi.object({
  preduzeceId: Joi.number().required()
});
var dodeli = Joi.object({
  id: Joi.number().required(),
  narudzbinaId: Joi.number().required(),
  zauzetDo: Joi.required()
});

var kuriri$1 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (PreduzeceId) {
    try {
      return yield db.Kurir.findAll({
        where: {
          PreduzeceId
        },
        include: [{
          model: db.Narudzbina
        }]
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Курири не постоје');
    }
  });

  return function kuriri(_x) {
    return _ref.apply(this, arguments);
  };
}();
var dodeli$1 = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (_ref2) {
    var {
      id,
      narudzbinaId,
      zauzetDo
    } = _ref2;

    try {
      var narudzbina = yield db.Narudzbina.findOne({
        where: {
          id: narudzbinaId
        }
      });
      yield narudzbina.update({
        KurirId: id
      });
      var kurir = yield db.Kurir.findOne({
        where: {
          id
        }
      });
      yield kurir.update({
        zauzetDo
      });
      var updatedNarudzbina = yield db.Narudzbina.findOne({
        where: {
          id: narudzbinaId
        },
        include: [{
          model: db.Kurir
        }]
      });
      var updatedKurir = yield db.Kurir.findOne({
        where: {
          id
        },
        include: [{
          model: db.Narudzbina
        }]
      });
      return [updatedKurir, updatedNarudzbina];
    } catch (error) {
      return ApiError$1.throw(error, 'Настала је грешка');
    }
  });

  return function dodeli(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var kuriri$2 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      preduzeceId
    } = req.params;

    try {
      var _kuriri = yield kuriri$1(preduzeceId);

      res.json(_kuriri);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function kuriri(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var dodeli$2 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var {
      id,
      zauzetDo,
      narudzbinaId
    } = req.body;

    try {
      var [kurir, narudzbina] = yield dodeli$1({
        id,
        zauzetDo,
        narudzbinaId
      });
      res.json({
        narudzbina,
        kurir
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function dodeli(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var router$4 = express.Router();
router$4.post('/dodeli', validator.body(dodeli), dodeli$2);
router$4.get('/:preduzeceId', validator.params(kuriri), kuriri$2);

var ocene = Joi.object({
  proizvodId: Joi.number().required()
});
var oceniParams = Joi.object({
  proizvodId: Joi.number().required()
});
var oceni = Joi.object({
  ocena: Joi.number().required(),
  korisnikId: Joi.number().required()
});

var ocene$1 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (ProizvodId) {
    try {
      return yield db.Ocena.findAll({
        where: {
          ProizvodId
        },
        include: [{
          model: db.Korisnik
        }]
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Оцене нису пронађене');
    }
  });

  return function ocene(_x) {
    return _ref.apply(this, arguments);
  };
}();
var oceni$1 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (ProizvodId, KorisnikId, ocena) {
    try {
      var novaOcena = yield db.Ocena.create({
        ProizvodId,
        KorisnikId,
        ocena
      });
      return yield db.Ocena.findOne({
        where: {
          id: novaOcena.id
        },
        include: [{
          model: db.Korisnik
        }]
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Настала је грешка');
    }
  });

  return function oceni(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var ocene$2 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      proizvodId
    } = req.params;

    try {
      var _ocene = yield ocene$1(proizvodId);

      res.json(_ocene);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function ocene(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var oceni$2 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var {
      proizvodId
    } = req.params;
    var {
      ocena,
      korisnikId
    } = req.body;

    try {
      var novaOcena = yield oceni$1(proizvodId, korisnikId, ocena);
      res.json(novaOcena);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function oceni(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var router$5 = express.Router();
router$5.get('/:proizvodId', validator.params(ocene), ocene$2);
router$5.post('/:proizvodId', validator.params(oceniParams), validator.body(oceni), oceni$2);

var komentari = Joi.object({
  proizvodId: Joi.number().required()
});
var komentirajParams = Joi.object({
  proizvodId: Joi.number().required()
});
var komentiraj = Joi.object({
  komentar: Joi.string().required(),
  korisnikId: Joi.number().required()
});

var komentari$1 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (ProizvodId) {
    try {
      return yield db.Komentar.findAll({
        where: {
          ProizvodId
        },
        include: [{
          model: db.Korisnik
        }]
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Коментари нису пронађени');
    }
  });

  return function komentari(_x) {
    return _ref.apply(this, arguments);
  };
}();
var komentiraj$1 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (ProizvodId, KorisnikId, komentar) {
    try {
      var noviKomentar = yield db.Komentar.create({
        ProizvodId,
        KorisnikId,
        komentar
      });
      return yield db.Komentar.findOne({
        where: {
          id: noviKomentar.id
        },
        include: [{
          model: db.Korisnik
        }]
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Настала је грешка');
    }
  });

  return function komentiraj(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var komentari$2 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      proizvodId
    } = req.params;

    try {
      var _komentari = yield komentari$1(proizvodId);

      res.json(_komentari);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function komentari(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var komentiraj$2 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var {
      proizvodId
    } = req.params;
    var {
      komentar,
      korisnikId
    } = req.body;

    try {
      var noviKomentar = yield komentiraj$1(proizvodId, korisnikId, komentar);
      res.json(noviKomentar);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function komentiraj(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var router$6 = express.Router();
router$6.get('/:proizvodId', validator.params(komentari), komentari$2);
router$6.post('/:proizvodId', validator.params(komentirajParams), validator.body(komentiraj), komentiraj$2);

var rasadnik = Joi.object({
  id: Joi.number().required(),
  poljoprivrednikId: Joi.number().required()
});
var kreirajParams$1 = Joi.object({
  poljoprivrednikId: Joi.number().required()
});
var kreiraj$6 = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  width: Joi.number().required(),
  length: Joi.number().required()
});
var setTemperatureParams = Joi.object({
  id: Joi.number().required()
});
var setTemperature = Joi.object({
  temperature: Joi.number().required()
});
var setWaterLevelParams = Joi.object({
  id: Joi.number().required()
});
var setWaterLevel = Joi.object({
  waterLevel: Joi.number().required()
});
var rasadnici = Joi.object({
  poljoprivrednikId: Joi.number().required()
});

var rasadnik$1 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (id) {
    try {
      return yield db.Rasadnik.findOne({
        where: {
          id
        },
        include: [{
          model: db.Sadnik,
          as: 'Sadnici'
        }]
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Расадник није пронађен');
    }
  });

  return function rasadnik(_x) {
    return _ref.apply(this, arguments);
  };
}();
var rasadnici$1 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (PoljoprivrednikId) {
    try {
      return yield db.Rasadnik.findAll({
        where: {
          PoljoprivrednikId
        },
        include: [{
          model: db.Sadnik,
          as: 'Sadnici'
        }]
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка');
    }
  });

  return function rasadnici(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var kreiraj$7 = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (_ref3) {
    var {
      PoljoprivrednikId,
      name,
      location,
      width,
      length
    } = _ref3;

    try {
      var _rasadnik = yield db.Rasadnik.create({
        PoljoprivrednikId,
        name,
        location,
        width,
        length
      });

      yield db.Magacin.create({
        RasadnikId: _rasadnik.id
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Настала ја грешка');
    }
  });

  return function kreiraj(_x3) {
    return _ref4.apply(this, arguments);
  };
}();
var setTemperature$1 = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (id, temperature) {
    try {
      var _rasadnik2 = yield db.Rasadnik.findOne({
        where: {
          id
        }
      });

      yield _rasadnik2.update({
        temperature
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function setTemperature(_x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}();
var setWaterLevel$1 = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (id, waterLevel) {
    try {
      var _rasadnik3 = yield db.Rasadnik.findOne({
        where: {
          id
        }
      });

      yield _rasadnik3.update({
        waterLevel
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function setWaterLevel(_x6, _x7) {
    return _ref6.apply(this, arguments);
  };
}();

var rasadnik$2 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      id
    } = req.params;

    try {
      var _rasadnik = yield rasadnik$1(id);

      res.json(_rasadnik);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function rasadnik(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var rasadnici$2 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var {
      poljoprivrednikId
    } = req.params;

    try {
      var _rasadnici = yield rasadnici$1(poljoprivrednikId);

      res.json(_rasadnici);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function rasadnici(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var setTemperature$2 = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var {
      id
    } = req.params;
    var {
      temperature
    } = req.body;

    try {
      yield setTemperature$1(id, temperature);
      res.json({
        message: 'Успешно ажуриран расадник.'
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function setTemperature(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var setWaterLevel$2 = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var {
      id
    } = req.params;
    var {
      waterLevel
    } = req.body;

    try {
      yield setWaterLevel$1(id, waterLevel);
      res.json({
        message: 'Успешно ажуриран расадник.'
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function setWaterLevel(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var kreiraj$8 = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res, next) {
    var {
      poljoprivrednikId
    } = req.params;
    var {
      name,
      location,
      width,
      length
    } = req.body;

    try {
      yield kreiraj$7({
        PoljoprivrednikId: poljoprivrednikId,
        name,
        location,
        width,
        length
      });
      res.json({
        message: 'Успешно креиран расадник.'
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function kreiraj(_x9, _x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

var router$7 = express.Router();
router$7.post('/:id/temperature', validator.params(setTemperatureParams), validator.body(setTemperature), setTemperature$2);
router$7.post('/:id/water-level', validator.params(setWaterLevelParams), validator.body(setWaterLevel), setWaterLevel$2);
router$7.get('/:poljoprivrednikId', validator.params(rasadnici), rasadnici$2);
router$7.post('/:poljoprivrednikId', validator.params(kreirajParams$1), validator.body(kreiraj$6), kreiraj$8);
router$7.get('/:poljoprivrednikId/:id', validator.params(rasadnik), rasadnik$2);

var preparat = Joi.object({
  sadnikId: Joi.number().required(),
  preparatId: Joi.number().required()
});
var izvadi = Joi.object({
  id: Joi.number().required()
});
var dodaj = Joi.object({
  id: Joi.number().required(),
  rasadnikId: Joi.number().required()
});

var preparat$1 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (sadnikId, preparatId) {
    try {
      var sadnik = yield db.Sadnik.findOne({
        where: {
          id: sadnikId
        }
      });

      var _preparat = yield db.NaruceniProizvod.findOne({
        where: {
          id: preparatId
        }
      });

      if (_preparat.quantity <= 0) {
        throw new Error('Препарат није доступан.');
      }

      yield sadnik.update({
        ms: sadnik.ms > _preparat.value ? sadnik.ms - _preparat.value : 0
      });
      yield _preparat.update({
        quantity: _preparat.quantity - 1
      });
      return yield db.Sadnik.findOne({
        where: {
          id: sadnikId
        }
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Садник није пронађен');
    }
  });

  return function preparat(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var izvadi$1 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (id) {
    try {
      var sadnik = yield db.Sadnik.findOne({
        where: {
          id
        }
      });
      yield sadnik.update({
        izvadiNa: new Date(new Date().getTime() + 60 * 60 * 24 * 1000)
      });
      return yield db.Sadnik.findOne({
        where: {
          id
        }
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Садник није пронађен');
    }
  });

  return function izvadi(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
var dodaj$1 = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (id, RasadnikId) {
    try {
      var {
        name,
        manufacturer,
        value
      } = yield db.NaruceniProizvod.findOne({
        where: {
          id
        }
      });
      return yield db.Sadnik.create({
        name,
        RasadnikId,
        manufacturer,
        ms: value
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Садник није пронађен');
    }
  });

  return function dodaj(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var preparat$2 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      sadnikId,
      preparatId
    } = req.params;

    try {
      var updatedSadnik = yield preparat$1(sadnikId, preparatId);
      res.json(updatedSadnik);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function preparat(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var izvadi$2 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var {
      id
    } = req.params;

    try {
      var updatedSadnik = yield izvadi$1(id);
      res.json(updatedSadnik);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function izvadi(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var dodaj$2 = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var {
      id,
      rasadnikId
    } = req.params;

    try {
      var newSadnik = yield dodaj$1(id, rasadnikId);
      res.json(newSadnik);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function dodaj(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var router$8 = express.Router();
router$8.post('/:id/izvadi', validator.params(izvadi), izvadi$2);
router$8.post('/:rasadnikId/dodaj/:id', validator.params(dodaj), dodaj$2);
router$8.post('/:sadnikId/preparat/:preparatId', validator.params(preparat), preparat$2);

var magacin = Joi.object({
  rasadnikId: Joi.number().required(),
  poljoprivrednikId: Joi.number().required()
});

var magacin$1 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (PoljoprivrednikId, RasadnikId) {
    try {
      return yield db.Magacin.findOne({
        where: {
          RasadnikId
        },
        include: [{
          model: db.Narudzbina,
          as: 'Narudzbine',
          include: [{
            model: db.NaruceniProizvod,
            as: 'NaruceniProizvodi'
          }]
        }, {
          model: db.Rasadnik
        }]
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Магацин није пронађен');
    }
  });

  return function magacin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var magacin$2 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      poljoprivrednikId,
      rasadnikId
    } = req.params;

    try {
      var _magacin = yield magacin$1(poljoprivrednikId, rasadnikId);

      res.json(_magacin);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function magacin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var router$9 = express.Router();
router$9.get('/:poljoprivrednikId/:rasadnikId', validator.params(magacin), magacin$2);

var preduzeca$2 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    try {
      return yield db.Preduzece.findAll({
        include: [{
          model: db.Proizvod,
          as: 'Proizvodi'
        }]
      });
    } catch (error) {
      return ApiError$1.throw(error, 'Настала је грешка');
    }
  });

  return function preduzeca() {
    return _ref.apply(this, arguments);
  };
}();

var preduzeca$3 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var _preduzeca = yield preduzeca$2();

      res.json(_preduzeca);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  return function preduzeca(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var router$a = express.Router();
router$a.get('', preduzeca$3);

var router$b = express.Router();
router$b.get('/', (req, res) => {
  res.json({
    statusCode: HTTPStatus.OK,
    message: 'Welcome to 13e113pia project API'
  });
});
router$b.use('/auth/', router);
router$b.use('/korisnici/', router$1);
router$b.use('/proizvodi/', router$3);
router$b.use('/narudzbine/', router$2);
router$b.use('/kuriri/', router$4);
router$b.use('/komentari/', router$6);
router$b.use('/ocene/', router$5);
router$b.use('/rasadnici/', router$7);
router$b.use('/magacini/', router$9);
router$b.use('/sadnici/', router$8);
router$b.use('/preduzeca/', router$a);
router$b.all('*', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    res.status(HTTPStatus.NOT_FOUND).json('Страница није пронађена');
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
console.log(listEndpoints(router$b));

/** Smanjujemo temperaturu i vodu u rasadniku, i po potrebi saljemo email poljoprivredniku da proveri stanje */

var rasadniciCron = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    console.log('START: Расадници cron ');
    var rasadnici = yield db.Rasadnik.findAll();

    var updateRasadnik = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (rasadnik) {
        var novaTemperatura = rasadnik.temperature - 0.5;
        var noviNivoVode = rasadnik.waterLevel - 1;
        yield rasadnik.update({
          temperature: novaTemperatura,
          waterLevel: noviNivoVode
        });
        var {
          SMTP_HOST,
          SMTP_PASSWORD,
          SMTP_PORT,
          SMTP_USER
        } = config;
        var shouldBeNotified = (novaTemperatura < 12 || noviNivoVode < 72) && SMTP_USER && SMTP_PASSWORD;

        if (shouldBeNotified) {
          var poljoprivrednik = yield db.Poljoprivrednik.findOne({
            where: {
              id: rasadnik.PoljoprivrednikId
            }
          });
          var korisnik = yield db.Korisnik.findOne({
            where: {
              id: poljoprivrednik.KorisnikId
            }
          });
          var transport = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            auth: {
              user: SMTP_USER,
              pass: SMTP_PASSWORD
            }
          });
          var message = {
            from: 'pia@example.com',
            to: korisnik.email,
            subject: "\u0420\u0430\u0441\u0430\u0434\u043D\u0438\u043A ".concat(rasadnik.name, " \u0437\u0430\u0445\u0442\u0435\u0432\u0430 \u043E\u0434\u0440\u0436\u0430\u0432\u0430\u045A\u0435\u201C"),
            text: 'Улогујте се на систем и додајте воду!'
          };
          yield transport.sendMail(message);
        }
      });

      return function updateRasadnik(_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    yield Promise.all(rasadnici.map( /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(function* (rasadnik) {
        return yield updateRasadnik(rasadnik);
      });

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }()));
    console.log('END: Расадници cron ');
  });

  return function rasadniciCron() {
    return _ref.apply(this, arguments);
  };
}();
/** Brisemo sadnike 24 sata nakon vadenja iz rasadnika */

var sadniciCron = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* () {
    console.log('START: Садници cron ');
    var sadnici = yield db.Sadnik.findAll();
    var now = new Date().getTime();
    yield Promise.all(sadnici.map( /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(function* (sadnik) {
        var izvadiNa = new Date(sadnik.izvadiNa).getTime();

        if (izvadiNa <= now) {
          yield sadnik.destroy();
        }
      });

      return function (_x3) {
        return _ref5.apply(this, arguments);
      };
    }()));
    console.log('END: Садници cron ');
  });

  return function sadniciCron() {
    return _ref4.apply(this, arguments);
  };
}();

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

db.sequelize.authenticate();
/**
   * Database migrations
   *
   await database.sequelize.sync({ force: true });
   */

cron.schedule('0 * * * *', /*#__PURE__*/_asyncToGenerator(function* () {
  return yield rasadniciCron();
}));
cron.schedule('0 0 * * *', /*#__PURE__*/_asyncToGenerator(function* () {
  return yield sadniciCron();
}));
/**
 * API Routes
 */

app.use(router$b);
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
  if (err instanceof ApiError$1) {
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
