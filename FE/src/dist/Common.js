"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.minDate = exports.areInputsValid = exports.validate = exports.matchTime = exports.matchDate = exports.dropDown = exports.fetchRefs = exports.fetchStadiums = exports.fetchTeams = exports.loading = exports.Stadium = void 0;
var axios_1 = require("axios");
var react_1 = require("react");
var material_1 = require("@mui/material");
var x_date_pickers_1 = require("@mui/x-date-pickers");
var auth_1 = require("./auth");
var Stadium = /** @class */ (function () {
    function Stadium(id, name) {
        this.id = id;
        this.name = name;
    }
    Stadium["default"] = function () {
        return {
            id: -1,
            name: ''
        };
    };
    return Stadium;
}());
exports.Stadium = Stadium;
;
function loading() {
    return (react_1["default"].createElement("div", { style: { padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' } },
        react_1["default"].createElement("h1", null, "Loading ...")));
}
exports.loading = loading;
function fetchTeams(setTeams) {
    var teams = Array.from(Array(32).keys()).map(function (teamNumber) { return "Team " + teamNumber; });
    setTeams(teams);
}
exports.fetchTeams = fetchTeams;
function fetchStadiums(setData, authToken) {
    axios_1["default"].get('api/stadiums', {
        params: {
            page_size: 32,
            current_page: 1
        },
        headers: auth_1.authHeader(authToken)
    }).then(function (response) {
        if (response.status === 200) {
            var data = response.data;
            var stadiumData = new Array(data['stadiums']);
            console.log(stadiumData);
            if (stadiumData.length > 0) {
                var stadiums = data['stadiums'].map(function (stadium) { return { id: stadium.id, name: stadium.name }; });
                setData(stadiums);
            }
            else {
                setData([]);
            }
            console.log("Stadium Source:" + authToken);
        }
    })["catch"](function (erroro) {
        alert("Error connecting to the server :(");
    });
}
exports.fetchStadiums = fetchStadiums;
function fetchRefs(setData) {
    var refs = [
        "Ivan Barton",
        "Chris Beath",
        "Raphael Claus",
        "Matthew Conger",
        "Ismail Elfath",
        "Mario Escobar",
        "Alireza Faghani",
        "Stephanie Frappart",
        "Lyric Hegmann",
        "Dr. Jeremie Huel",
        "Vidal Gottlieb"
    ];
    setData(refs);
}
exports.fetchRefs = fetchRefs;
function dropDown(currentChoice, options, placeHolder, width, changeSelected, error) {
    return (react_1["default"].createElement(material_1.Box, { width: width },
        react_1["default"].createElement(material_1.TextField, { select: true, label: placeHolder, value: currentChoice, fullWidth: true, onChange: function (e) { changeSelected(e.target.value); }, error: Boolean(error), helperText: error }, options === null || options === void 0 ? void 0 : options.map(function (option, index) { return (react_1["default"].createElement(material_1.MenuItem, { value: option, key: index },
            " ",
            option,
            " ")); }))));
}
exports.dropDown = dropDown;
function matchDate(date, setDate) {
    return (react_1["default"].createElement(material_1.Box, { width: '200px' },
        react_1["default"].createElement(x_date_pickers_1.DatePicker, { label: 'Edit match date', renderInput: function (params) { return react_1["default"].createElement(material_1.TextField, __assign({}, params)); }, value: date, onChange: function (newValue) {
                setDate(new Date(newValue.toString()));
            }, minDate: minDate() })));
}
exports.matchDate = matchDate;
function matchTime(date, setTime) {
    return (react_1["default"].createElement(material_1.Box, { width: '200px' },
        react_1["default"].createElement(x_date_pickers_1.TimePicker, { label: 'Edit match time', renderInput: function (params) { return react_1["default"].createElement(material_1.TextField, __assign({}, params)); }, value: date, onChange: function (newValue) {
                setTime(new Date(newValue.toString()));
            } })));
}
exports.matchTime = matchTime;
function validate(val, fieldName, criteria) {
    if (!criteria(val)) {
        return fieldName + " is required.";
    }
    else {
        return '';
    }
}
exports.validate = validate;
function areInputsValid(errors, team1, team2, firstLineRef, secondLineRef, mainRef, stadium, setErrors, date, setValidInputs) {
    var newErrors = __assign({}, errors);
    newErrors.team1 = validate(team1, 'Team 1', function (t) { return t.length > 0; });
    newErrors.team2 = validate(team2, 'Team 2', function (t) { return t.length > 0; });
    newErrors.firstLineRef = validate(firstLineRef, 'First line referee', function (t) { return t.length > 0; });
    newErrors.secondLineRef = validate(secondLineRef, 'Second Line referee', function (t) { return t.length > 0; });
    newErrors.mainRef = validate(mainRef, 'Main referee', function (t) { return t.length > 0; });
    newErrors.stadium = validate(stadium, 'Stadium', function (t) { return t.id > -1; });
    if (newErrors.team1.length === 0
        && newErrors.team2.length === 0
        && team1 === team2) {
        newErrors.team1 = newErrors.team2 = 'Team 1 and team 2 must be different.';
    }
    if (newErrors.mainRef.length === 0
        && newErrors.firstLineRef.length === 0
        && newErrors.secondLineRef.length === 0
        && (mainRef === firstLineRef
            || firstLineRef === secondLineRef
            || secondLineRef === mainRef)) {
        newErrors.mainRef = newErrors.firstLineRef = newErrors.secondLineRef = "All referees must be different";
    }
    setErrors(newErrors);
    // Loop over the values in the errors map
    // Check if all errors are empty
    // AND their results all together with `true`.
    // Returns true only if all errors are empty.
    var noErrors = Object
        .values(newErrors)
        .map(function (value) { return value.length === 0; })
        .reduce(function (prev, current) { return prev && current; }, true);
    var enable = noErrors && date.getTime() > Date.now();
    setValidInputs(enable);
    return enable;
}
exports.areInputsValid = areInputsValid;
function minDate() {
    var minDate = new Date(Date.now());
    minDate.setDate(minDate.getDate() + 2);
    return minDate;
}
exports.minDate = minDate;
