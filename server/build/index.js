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
var Sequelize = require('sequelize');
var Sequelize__default = _interopDefault(Sequelize);
var bcrypt = _interopDefault(require('bcrypt'));

class APIClientError {//
}

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

var router = express.Router();
router.get('/', (req, res) => {
  res.json({
    statusCode: HTTPStatus.OK,
    message: 'Welcome to 13e113pia project API'
  });
});
router.all('*', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    res.json({
      message: HTTPStatus[404],
      statusCode: HTTPStatus.NOT_FOUND
    });
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

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
  var _this = this;

  var Korisnik = sequelize.define('Korisnik', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4
    },
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

  Korisnik.associate = function associate(models) {
    switch (this.role) {
      case ROLES.admin:
        this.admin = this.hasOne(models.Admin, {
          onDelete: 'CASCADE',
          foreignKey: 'korisnikId'
        });
        break;

      case ROLES.preduzece:
        this.preduzece = this.hasOne(models.Preduzece, {
          onDelete: 'CASCADE',
          foreignKey: 'korisnikId'
        });
        break;

      case ROLES.poljoprivrednik:
        this.poljoprivrednik = this.hasOne(models.Poljoprivrednik, {
          onDelete: 'CASCADE',
          foreignKey: 'korisnikId'
        });
        break;
    }
  }; // eslint-disable-next-line no-shadow


  Korisnik.beforeSave( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (user) {
      try {
        if (user.changed('password')) {
          var salt = yield bcrypt.genSalt(10);
          var hash = yield bcrypt.hash(user.password, salt); // eslint-disable-next-line no-param-reassign

          user.password = hash;
        }
      } catch (err) {
        throw new Error(err);
      }
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()); // eslint-disable-next-line func-names

  Korisnik.prototype.isValidPassword = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* (pw) {
      try {
        return yield bcrypt.compare(pw, _this.password);
      } catch (err) {
        throw new Error(err);
      }
    });

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  Korisnik.prototype.toJson = /*#__PURE__*/_asyncToGenerator(function* () {
    var values = _objectSpread2({}, _this.get());

    delete values.password;
    return values;
  });
  return Korisnik;
}

function init$1(sequelize) {
  var _this = this;

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

  Preduzece.associate = function associate(models) {
    this.korisnik = this.belongsTo(models.Korisnik);
    this.kuriri = this.hasMany(models.Kurir);
  };

  Preduzece.prototype.toJson = /*#__PURE__*/_asyncToGenerator(function* () {
    return _objectSpread2({}, _this.get());
  });
  return Preduzece;
}

function init$2(sequelize) {
  var _this = this;

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

  Admin.associate = function associate(models) {
    this.korisnik = this.belongsTo(models.Korisnik);
  };

  Admin.prototype.toJson = /*#__PURE__*/_asyncToGenerator(function* () {
    return _objectSpread2({}, _this.get());
  });
  return Admin;
}

function init$3(sequelize) {
  var _this = this;

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

  Poljoprivrednik.associate = function associate(models) {
    this.korisnik = this.belongsTo(models.Korisnik);
  };

  Poljoprivrednik.prototype.toJson = /*#__PURE__*/_asyncToGenerator(function* () {
    return _objectSpread2({}, _this.get());
  });
  return Poljoprivrednik;
}

function init$4(sequelize) {
  var _this = this;

  var Magacin = sequelize.define('Magacin', {}, {
    freezeTableName: true
  });

  Magacin.associate = function associate(models) {
    this.rasadnik = this.belongsTo(models.Rasadnik);
    this.narudzbine = this.hasMany(models.Narudzbina);
  };

  Magacin.prototype.toJson = /*#__PURE__*/_asyncToGenerator(function* () {
    return _objectSpread2({}, _this.get());
  });
  return Magacin;
}

function init$5(sequelize) {
  var _this = this;

  var Ocena = sequelize.define('Ocena', {
    ocena: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });

  Ocena.associate = function associate(models) {
    this.korisnik = this.belongsTo(models.Korisnik);
    this.proizvod = this.belongsTo(models.Proizvod);
  };

  Ocena.prototype.toJson = /*#__PURE__*/_asyncToGenerator(function* () {
    return _objectSpread2({}, _this.get());
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

  Proizvod.associate = function associate(models) {
    this.preduzece = this.belongsTo(models.Preduzece);
  };

  KupljeniProizvod.associate = function associate(models) {
    this.narudzbina = this.belongsTo(models.Narudzbina);
  };

  Proizvod.prototype.toJson = /*#__PURE__*/_asyncToGenerator(function* () {
    return _objectSpread2({}, _this.get());
  });
  Proizvod.prototype.toNarudzbinu = /*#__PURE__*/_asyncToGenerator(function* () {//
  });
  KupljeniProizvod.prototype.toJson = /*#__PURE__*/_asyncToGenerator(function* () {
    return _objectSpread2({}, _this.get());
  });
  return [Proizvod, KupljeniProizvod];
}

function init$7(sequelize) {
  var _this = this;

  var Narudzbina = sequelize.define('Narudzbina', {
    total: {
      type: Sequelize.DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });

  Narudzbina.associate = function associate(models) {
    this.preduzece = this.hasOne(models.Preduzece);
    this.kurir = this.hasOne(models.Kurir);
    this.magacin = this.hasOne(models.Magacin);
  };

  Narudzbina.prototype.toJson = /*#__PURE__*/_asyncToGenerator(function* () {
    return _objectSpread2({}, _this.get());
  });
  return Narudzbina;
}

function init$8(sequelize) {
  var _this = this;

  var Komentar = sequelize.define('Komentar', {
    komentar: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });

  Komentar.associate = function associate(models) {
    this.korisnik = this.belongsTo(models.Korisnik);
    this.proizvod = this.belongsTo(models.Proizvod);
  };

  Komentar.prototype.toJson = /*#__PURE__*/_asyncToGenerator(function* () {
    return _objectSpread2({}, _this.get());
  });
  return Komentar;
}

function init$9(sequelize) {
  var _this = this;

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

  Rasadnik.associate = function associate(models) {
    this.poljoprivrednik = this.belongsTo(models.Poljoprivrednik);
    this.magacin = this.hasOne(models.Magacin);
  };

  Rasadnik.prototype.toJson = /*#__PURE__*/_asyncToGenerator(function* () {
    return _objectSpread2({}, _this.get());
  });
  return Rasadnik;
}

function init$a(sequelize) {
  var _this = this;

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

  Kurir.associate = function associate(models) {
    this.preduzece = this.belongsTo(models.Preduzece);
    this.narudzbina = this.belongsTo(models.Narudzbina);
  };

  Kurir.prototype.toJson = /*#__PURE__*/_asyncToGenerator(function* () {
    return _objectSpread2({}, _this.get());
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
  // eslint-disable-next-line no-console
  logging: console.log,
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
db.sequelize.sync({
  force: false
});
/**
 * API Routes
 */

app.use(router);
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
  console.error('Uncaught Error', error);
});

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
