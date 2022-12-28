"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SetInferredRole = void 0;

var _toolkit = require("@reduxjs/toolkit");

var initialState = {
  inferredRole: ''
};
var reducers = {
  SetInferredRole: function SetInferredRole(state, action) {
    state.inferredRole = action.payload;
  }
};
var homeSlice = (0, _toolkit.createSlice)({
  name: "home",
  initialState: initialState,
  reducers: reducers
});
var SetInferredRole = homeSlice.actions.SetInferredRole;
exports.SetInferredRole = SetInferredRole;
var _default = homeSlice.reducer;
exports["default"] = _default;