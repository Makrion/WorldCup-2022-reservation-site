"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ResetCard = exports.loadInitialState = exports.SetIsLoggedIn = exports.SetUserInfo = exports.updateAPI = exports.logoutAPI = exports.signUpAPI = exports.loginAPI = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _axios = _interopRequireDefault(require("axios"));

var _api = require("../api");

var _extraReducers;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  userInfo: {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    country: '',
    birthDate: '',
    gender: '',
    role: '',
    accessToken: '',
    id: '',
    isVerified: false
  },
  isLoggedIn: false,
  isLoading: false,
  error: null,
  updateIsLoading: false,
  updateError: null,
  updateSuccess: false,
  logoutIsLoading: false,
  logoutError: null,
  logoutSuccess: false
};
var reducers = {
  SetUserInfo: function SetUserInfo(state, action) {
    state.userInfo = action.payload;
  },
  SetIsLoggedIn: function SetIsLoggedIn(state, action) {
    state.isLoggedIn = action.payload;
  },
  loadInitialState: function loadInitialState(state) {
    if (localStorage.getItem('userInfo')) {
      state.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      state.isLoggedIn = true;
    } else {
      state.userInfo = initialState.userInfo;
      state.isLoggedIn = false;
    }
  },
  ResetCard: function ResetCard(state) {
    state.updateError = null;
    state.updateSuccess = false;
  }
};
var loginAPI = (0, _toolkit.createAsyncThunk)('user/login', function _callee(credentials) {
  var response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_api.api, "/api/user/login"), credentials));

        case 2:
          response = _context.sent;
          console.log(response);
          return _context.abrupt("return", response.data);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.loginAPI = loginAPI;
var signUpAPI = (0, _toolkit.createAsyncThunk)('user/signup', function _callee2(credentials) {
  var response;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_api.api, "/api/user/register"), credentials));

        case 2:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.signUpAPI = signUpAPI;
var logoutAPI = (0, _toolkit.createAsyncThunk)('user/logout', function _callee3(token) {
  var response;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_api.api, "/api/user/logout"), {}, {
            headers: {
              Authorization: "Bearer ".concat(token)
            }
          }));

        case 2:
          response = _context3.sent;
          return _context3.abrupt("return", response.data);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.logoutAPI = logoutAPI;
var updateAPI = (0, _toolkit.createAsyncThunk)('user/update', function _callee4(credentials) {
  var updatedCredentials, response;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          updatedCredentials = {};
          updatedCredentials.old_password = credentials.oldPassword;
          if (credentials.firstName) updatedCredentials.first_name = credentials.firstName;
          if (credentials.lastName) updatedCredentials.last_name = credentials.lastName;
          if (credentials.country) updatedCredentials.nationality = credentials.country;
          if (credentials.birthDate) updatedCredentials.birth_date = new Date(credentials.birthDate).getTime() / 1000;
          if (credentials.newPassword) updatedCredentials.password = credentials.newPassword;
          _context4.next = 9;
          return regeneratorRuntime.awrap(_axios["default"].put("".concat(_api.api, "/api/user/update"), updatedCredentials, {
            headers: {
              Authorization: "Bearer ".concat(credentials.accessToken)
            }
          }));

        case 9:
          response = _context4.sent;
          console.log(response);
          return _context4.abrupt("return", response.data);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.updateAPI = updateAPI;
var extraReducers = (_extraReducers = {}, _defineProperty(_extraReducers, loginAPI.fulfilled, function (state, action) {
  state.userInfo.firstName = action.payload.first_name;
  state.userInfo.lastName = action.payload.last_name;
  state.userInfo.username = action.payload.username;
  state.userInfo.accessToken = action.payload.access_token;
  state.userInfo.email = action.payload.email;
  state.userInfo.birthDate = action.payload.birth_date;
  state.userInfo.gender = action.payload === "m" ? "Male" : "Female";
  state.userInfo.country = action.payload.nationality;
  state.userInfo.id = action.payload.id;
  state.userInfo.role = action.payload.role;
  state.userInfo.isVerified = action.payload.is_verified;
  state.isLoggedIn = true; // save userInfo to local storage

  localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
  localStorage.setItem('isLoggedIn', JSON.stringify(state.isLoggedIn));
}), _defineProperty(_extraReducers, loginAPI.pending, function (state, action) {
  state.isLoading = true;
}), _defineProperty(_extraReducers, loginAPI.rejected, function (state, action) {
  state.error = "Could not log in. Please check your credentials and try again.";
  state.isLoading = false;
}), _defineProperty(_extraReducers, logoutAPI.pending, function (state, action) {
  state.logoutIsLoading = true;
}), _defineProperty(_extraReducers, logoutAPI.rejected, function (state, action) {
  state.logoutError = "Could not log out. Please try again.";
  state.logoutIsLoading = false;
}), _defineProperty(_extraReducers, logoutAPI.fulfilled, function (state, action) {
  state.userInfo = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    country: '',
    birth_date: '',
    gender: '',
    role: '',
    accessToken: '',
    id: '',
    isVerified: false
  };
  state.isLoggedIn = false;
  state.logoutIsLoading = false;
  state.logoutSuccess = true; // remove userInfo from local storage

  localStorage.removeItem('userInfo');
}), _defineProperty(_extraReducers, signUpAPI.fulfilled, function (state, action) {
  state.userInfo.firstName = action.payload.first_name;
  state.userInfo.lastName = action.payload.last_name;
  state.userInfo.username = action.payload.username;
  state.userInfo.accessToken = action.payload.access_token;
  state.userInfo.email = action.payload.email;
  state.userInfo.birthDate = action.payload.birth_date;
  state.userInfo.gender = action.payload === "m" ? "Male" : "Female";
  state.userInfo.country = action.payload.nationality;
  state.userInfo.id = action.payload.id;
  state.userInfo.role = action.payload.role;
  state.userInfo.isVerified = action.payload.is_verified;
  state.isLoggedIn = true; // save userInfo to local storage

  localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
}), _defineProperty(_extraReducers, signUpAPI.pending, function (state, action) {
  state.isLoading = true;
}), _defineProperty(_extraReducers, signUpAPI.rejected, function (state, action) {
  state.error = action.error.message;
  state.isLoading = false;
}), _defineProperty(_extraReducers, updateAPI.fulfilled, function (state, action) {
  state.userInfo.firstName = action.payload.first_name;
  state.userInfo.lastName = action.payload.last_name;
  state.userInfo.username = action.payload.username;
  state.userInfo.accessToken = action.payload.access_token;
  state.userInfo.email = action.payload.email;
  state.userInfo.birthDate = action.payload.birth_date;
  console.log(action.payload.birth_date);
  state.userInfo.gender = action.payload.gender === "m" ? "Male" : "Female";
  state.userInfo.country = action.payload.nationality;
  state.userInfo.id = action.payload.id;
  state.userInfo.role = action.payload.role;
  state.userInfo.isVerified = action.payload.is_verified;
  console.log(action.payload);
  console.log(state.userInfo.gender);
  localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
  state.updateSuccess = true;
  state.updateIsLoading = false;
}), _defineProperty(_extraReducers, updateAPI.pending, function (state, action) {
  state.updateIsLoading = true;
}), _defineProperty(_extraReducers, updateAPI.rejected, function (state, action) {
  state.updateError = action.error.message;
  state.updateIsLoading = false;
}), _extraReducers);
var userSlice = (0, _toolkit.createSlice)({
  name: "user",
  initialState: initialState,
  reducers: reducers,
  extraReducers: extraReducers
});
var _userSlice$actions = userSlice.actions,
    SetUserInfo = _userSlice$actions.SetUserInfo,
    SetIsLoggedIn = _userSlice$actions.SetIsLoggedIn,
    loadInitialState = _userSlice$actions.loadInitialState,
    ResetCard = _userSlice$actions.ResetCard;
exports.ResetCard = ResetCard;
exports.loadInitialState = loadInitialState;
exports.SetIsLoggedIn = SetIsLoggedIn;
exports.SetUserInfo = SetUserInfo;
var _default = userSlice.reducer;
exports["default"] = _default;