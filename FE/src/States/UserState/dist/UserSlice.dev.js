"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SetIsLoggedIn = exports.SetUserInfo = exports.signup = exports.login = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _axios = _interopRequireDefault(require("axios"));

var _extraReducers;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  userInfo: {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    birth_data: '',
    gender: '',
    role: '',
    accessToken: '',
    id: ''
  },
  isLoggedIn: false
};
var reducers = {
  SetUserInfo: function SetUserInfo(state, action) {
    state.userInfo = action.payload;
  },
  SetIsLoggedIn: function SetIsLoggedIn(state, action) {
    state.isLoggedIn = action.payload;
  }
};
var login = (0, _toolkit.createAsyncThunk)('user/login', function _callee(credentials) {
  var response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post('/api/login', credentials));

        case 2:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.login = login;
var signup = (0, _toolkit.createAsyncThunk)('user/signup', function _callee2(credentials) {
  var response;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post('/api/signup', credentials));

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
exports.signup = signup;
var extraReducers = (_extraReducers = {}, _defineProperty(_extraReducers, login.fulfilled, function (state, action) {
  state.userInfo = action.payload;
  state.isLoggedIn = true;
}), _defineProperty(_extraReducers, signup.fulfilled, function (state, action) {
  state.userInfo = action.payload;
  state.isLoggedIn = true;
}), _extraReducers);
var userSlice = (0, _toolkit.createSlice)({
  name: "user",
  initialState: initialState,
  reducers: reducers,
  extraReducers: extraReducers
});
var _userSlice$actions = userSlice.actions,
    SetUserInfo = _userSlice$actions.SetUserInfo,
    SetIsLoggedIn = _userSlice$actions.SetIsLoggedIn;
exports.SetIsLoggedIn = SetIsLoggedIn;
exports.SetUserInfo = SetUserInfo;
var _default = userSlice.reducer;
exports["default"] = _default;