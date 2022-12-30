"use strict";
exports.__esModule = true;
var react_1 = require("react");
var axios_1 = require("axios");
var react_router_dom_1 = require("react-router-dom");
var material_1 = require("@mui/material");
var Common_1 = require("../../Common");
var react_redux_1 = require("react-redux");
var api_1 = require("../../States/api");
var axios_2 = require("axios");
function ViewMatch() {
    var matchId = react_router_dom_1.useParams().matchId;
    var history = react_router_dom_1.useHistory();
    var role = react_redux_1.useSelector(function (state) { return state.user.userInfo.role; });
    var isLoggedIn = react_redux_1.useSelector(function (state) { return state.user.isLoggedIn; });
    var isVerified = react_redux_1.useSelector(function (state) { return state.user.userInfo.isVerified; });
    var accessToken = react_redux_1.useSelector(function (state) { return state.user.userInfo.accessToken; });
    if (!Number.parseInt(matchId)) {
        history.push('/NotFound');
    }
    var _a = react_1.useState(true), isLoading = _a[0], setIsLoading = _a[1];
    var _b = react_1.useState(''), team1Name = _b[0], setTeam1 = _b[1];
    var _c = react_1.useState(''), team2Name = _c[0], setTeam2 = _c[1];
    var _d = react_1.useState(''), stadium = _d[0], setStadium = _d[1];
    var _e = react_1.useState(''), mainRef = _e[0], setMainRef = _e[1];
    var _f = react_1.useState(''), firstLineRef = _f[0], setFirstLineRef = _f[1];
    var _g = react_1.useState(''), secondLineRef = _g[0], setSecondLineRef = _g[1];
    var _h = react_1.useState(new Date()), date = _h[0], setDate = _h[1];
    var reserveMatch = function (id, row, column, type) {
        var body;
        if (type === 1) {
            body = {
                match_id: id,
                seat: "vip",
                seat_row: row,
                seat_number: column
            };
        }
        else {
            body = {
                match_id: id,
                seat: "norm"
            };
        }
        axios_2["default"]({
            method: "POST",
            url: api_1.api + "/api/ticket/create",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken
            },
            data: body
        })
            .then(function (response) {
            alert("Reservation was Successful");
        })["catch"](function (error) {
            alert(error.response.data.message);
        });
    };
    react_1.useEffect(function () {
        axios_1["default"]
            .get("api/match/" + matchId, {})
            .then(function (response) {
            if (response.status === 200) {
                var data = response.data;
                console.log(data);
                var t1Id = data['team_1'];
                var t2Id = data['team_2'];
                var stadium_name = data['stadium_name'];
                var ref = data['main_ref'];
                var firstRef = data['lineman_1'];
                var secondRef = data['lineman_2'];
                var matchDate = new Date(0);
                matchDate.setUTCSeconds(data['match_date']);
                // for each set in data.reserved_vip_seats
                //add to the array of special cells
                var specialCells = [];
                for (var i = 0; i < data.reserved_vip_seats.length; i++) {
                    var seat = data.reserved_vip_seats[i];
                    var seat_row = seat.seat_row - 1;
                    for (var j = 0; j < seat.seat_number.length; j++) {
                        var seat_col = seat.seat_number[j] - 1;
                        specialCells.push(seat_row * data.no_seats_per_row + seat_col + 1);
                    }
                }
                console.log(data.reserved_vip_seats);
                console.log(specialCells);
                setStadiumInfo({
                    rows: data.no_rows_in_vip,
                    columns: data.no_seats_per_row,
                    special: specialCells
                });
                setTeam1("Team " + t1Id);
                setTeam2("Team " + t2Id);
                setStadium(stadium_name);
                setMainRef(ref);
                setFirstLineRef(firstRef);
                setSecondLineRef(secondRef);
                setDate(matchDate);
                setIsLoading(false);
            }
        })["catch"](function (error) {
            history.push('/NotFound');
        });
    }, [matchId]);
    var _j = react_1.useState({
        rows: 1,
        columns: 1,
        special: [1, 2, 3]
    }), stadiumInfo = _j[0], setStadiumInfo = _j[1];
    // rewrite the line above for typescript
    var ButtonGrid = function (_a) {
        var rows = _a.rows, columns = _a.columns, specialCellNumbers = _a.specialCellNumbers;
        var grid = [];
        var _loop_1 = function (i) {
            var row = [];
            var _loop_2 = function (j) {
                var cellNumber = i * columns + j + 1;
                var isSpecial = specialCellNumbers.includes(cellNumber);
                row.push(react_1["default"].createElement("button", { key: cellNumber, style: {
                        margin: '0.5em',
                        backgroundColor: isSpecial ? '#3f51b5' : 'white',
                        color: isSpecial ? 'white' : 'black',
                        borderRadius: '50%',
                        width: '3rem',
                        height: '3rem',
                        cursor: isSpecial ? '' : 'pointer',
                        border: '3px solid #3f51b5'
                    }, onClick: function () {
                        if (isSpecial)
                            return;
                        reserveMatch(matchId, i + 1, j + 1, 1);
                    } }, cellNumber));
            };
            for (var j = 0; j < columns; j++) {
                _loop_2(j);
            }
            grid.push(react_1["default"].createElement("div", { key: i, style: { display: 'block' } }, row));
        };
        for (var i = 0; i < rows; i++) {
            _loop_1(i);
        }
        return (react_1["default"].createElement("div", { style: { display: 'flex', marginTop: '2rem', marginBottom: '3rem', flexDirection: 'column', alignItems: 'center' } },
            react_1["default"].createElement("h1", { style: {
                    marginBottom: '1rem',
                    color: '#3f51b5'
                } },
                " ",
                stadium,
                " VIP Reservations "),
            grid,
            react_1["default"].createElement("button", { onClick: function () {
                    reserveMatch(matchId, 0, 0, 0);
                }, style: {
                    marginTop: '1rem',
                    border: '1px solid #3f51b5',
                    borderRadius: '2rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#3f51b5',
                    color: 'white',
                    cursor: 'pointer'
                } }, "Make a Normal Reservation Instead")));
    };
    return (react_1["default"].createElement("div", { style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        } },
        isLoading && Common_1.loading(),
        !isLoading &&
            react_1["default"].createElement("div", { style: {} },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("h1", { style: { textAlign: 'center', padding: '20px' } }, "Match Details"),
                    react_1["default"].createElement("div", { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' } },
                        react_1["default"].createElement("div", { style: { display: 'flex', flexDirection: 'column', padding: 10 } },
                            react_1["default"].createElement("h4", { style: { textAlign: 'center', fontWeight: 300 } }, "Team 1"),
                            react_1["default"].createElement("h2", null, team1Name)),
                        react_1["default"].createElement("div", { style: { display: 'flex', flexDirection: 'column', padding: 10 } },
                            react_1["default"].createElement("h4", { style: { textAlign: 'center', fontWeight: 300 } }, "Team 2"),
                            react_1["default"].createElement("h2", null, team2Name))),
                    react_1["default"].createElement("div", { style: { display: 'flex', flexDirection: 'column', padding: '10px', alignItems: 'center' } },
                        react_1["default"].createElement("h4", { style: { fontWeight: 300 } }, "Stadium"),
                        react_1["default"].createElement("h2", null, stadium)),
                    react_1["default"].createElement("div", { style: {
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '10px',
                            alignItems: 'center',
                            justifyContent: 'center'
                        } },
                        react_1["default"].createElement("h4", { style: { fontWeight: 300 } }, "Match Date"),
                        react_1["default"].createElement("h2", null, date.toUTCString())),
                    react_1["default"].createElement("div", { style: { display: 'flex', padding: '10px', alignItems: 'center', flexDirection: 'column' } },
                        react_1["default"].createElement("h4", { style: { fontWeight: 300 } }, "Main Referee"),
                        react_1["default"].createElement("h2", null, mainRef)),
                    react_1["default"].createElement("div", { style: { display: 'flex', flexDirection: 'row', padding: 10, alignContent: 'center' } },
                        react_1["default"].createElement("div", { style: { display: 'flex', flexDirection: 'column', padding: 10, alignItems: 'center' } },
                            react_1["default"].createElement("h4", { style: { fontWeight: 300 } }, "First Line Referee"),
                            react_1["default"].createElement("h2", null, firstLineRef)),
                        react_1["default"].createElement("div", { style: { display: 'flex', flexDirection: 'column', padding: 10, alignItems: 'center' } },
                            react_1["default"].createElement("h4", { style: { fontWeight: 300 } }, "Second Line Referee"),
                            react_1["default"].createElement("h2", null, secondLineRef))),
                    react_1["default"].createElement("div", { style: { display: 'flex', flexDirection: 'row' } },
                        react_1["default"].createElement(material_1.Button, { onClick: function () { history.goBack(); }, style: { borderRadius: 2, margin: '5px' }, variant: "contained", fullWidth: true }, "Back"),
                        (isLoggedIn && role === 1 && isVerified)
                            &&
                                react_1["default"].createElement(material_1.Button, { onClick: function () { history.push("/EditMatch/" + matchId); }, style: { borderRadius: 2, margin: '5px' }, variant: "outlined", fullWidth: true }, "Edit"))),
                (role === 2) && react_1["default"].createElement("div", null,
                    react_1["default"].createElement(ButtonGrid, { rows: stadiumInfo.rows, columns: stadiumInfo.columns, specialCellNumbers: stadiumInfo.special })))));
}
exports["default"] = ViewMatch;
