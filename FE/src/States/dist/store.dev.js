"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _UserSlice = _interopRequireDefault(require("./UserState/UserSlice"));

var _HomeSlice = _interopRequireDefault(require("./HomeState/HomeSlice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var store = (0, _toolkit.configureStore)({
  reducer: {
    user: _UserSlice["default"],
    home: _HomeSlice["default"]
  }
});
var _default = store;
exports["default"] = _default;