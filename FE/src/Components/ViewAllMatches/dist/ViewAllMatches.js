"use strict";
exports.__esModule = true;
exports.Match = void 0;
var react_1 = require("react");
var axios_1 = require("axios");
var material_1 = require("@mui/material");
var core_1 = require("@material-ui/core");
var react_router_dom_1 = require("react-router-dom");
var Common_1 = require("../../Common");
var Match = /** @class */ (function () {
    function Match(id, team1, team2, stadiumName, matchDate) {
        this.id = Number.parseInt(id);
        this.team1Id = team1;
        this.team2Id = team2;
        this.stadiumName = stadiumName;
        this.matchDate = new Date(0);
        this.matchDate.setUTCSeconds(matchDate);
    }
    Match.fromJson = function (json) {
        return new Match(json['id'], json['team_1'], json['team_2'], json['stadium_name'], json['match_date']);
    };
    return Match;
}());
exports.Match = Match;
;
function ViewAllMatches() {
    var _a = react_1.useState(new Array()), matches = _a[0], setMatches = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    react_1.useEffect(function () {
        axios_1["default"]
            .get('/api/matches', {
            params: {
                page_size: 32,
                current_page: 1
            }
        })
            .then(function (response) {
            if (response.status === 200) {
                var data = response.data;
                var mats = data['matches'].map(function (match) { return Match.fromJson(match); });
                setMatches(mats);
                console.log(mats);
                setIsLoading(false);
            }
        });
    }, []);
    return (react_1["default"].createElement("div", { style: {
            alignContent: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        } }, isLoading ?
        Common_1.loading()
        : react_1["default"].createElement("div", null,
            react_1["default"].createElement("h1", { style: { textAlign: 'center' } }, "Matches"),
            react_1["default"].createElement(material_1.List, null, matches.map(function (match, index) {
                return react_1["default"].createElement("div", { key: index },
                    react_1["default"].createElement(core_1.ListItem, { key: index, style: { width: '100%', padding: '10px', cursor: 'pointer', color: 'black' }, component: react_router_dom_1.Link, to: "/ViewMatch/" + match.id },
                        react_1["default"].createElement(core_1.ListItemText, null,
                            react_1["default"].createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } },
                                react_1["default"].createElement("h2", { style: { margin: '9px' } },
                                    "Team ",
                                    match.team1Id),
                                react_1["default"].createElement("div", { style: { display: 'flex', flexDirection: 'column', padding: '0px 40px', alignItems: 'center' } },
                                    react_1["default"].createElement("h1", { style: { fontStyle: 'italic', fontWeight: 200 } }, " VS ")),
                                react_1["default"].createElement("h2", { style: { margin: '9px' } },
                                    "Team ",
                                    match.team2Id)))),
                    react_1["default"].createElement(core_1.Divider, null));
            })))));
}
exports["default"] = ViewAllMatches;
