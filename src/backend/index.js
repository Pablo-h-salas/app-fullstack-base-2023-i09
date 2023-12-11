//=======[ Settings, Imports & Data ]==========================================

var PORT = 3000;

var express = require('express');
var cors = require("cors");
var corsOptions = { origin: "*", optionSucessStatus: 200 };


var app = express();
app.use(cors(corsOptions));

var utils = require('./mysql-connector');

// to parse application/json
app.use(express.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================
app.get("/otraCosa/:id/:algo", (req, res, next) => {
    console.log("id", req.params.id)
    console.log("algo", req.params.algo)
    utils.query("select * from Devices where id=" + req.params.id, (err, rsp, fields) => {
        if (err == null) {

            console.log("rsp", rsp);
            res.status(200).send(JSON.stringify(rsp));
        } else {
            console.log("err", err);
            res.status(409).send(err);
        }

        //console.log(fields);
    });

});


app.post("/device", (req, res, next) => {
    console.log("Llego el post",
        "UPDATE Devices SET state = " + req.body.state + " WHERE id = " + req.body.id);
    console.log(req.body.state, req.body.initial_value);
    //si state es undefined -> debo guardar el initial_value
    // si initial_value es undifined -> debo guardar el state.
    if (req.body.state != undefined) {

        utils.query("UPDATE Devices SET state = " + req.body.state + " WHERE id =" + req.body.id, (err, rsp, fields) => {

            if (err == null) {
                res.status(200).send(JSON.stringify(rsp));
            } else {
                res.status(409).send(err);
            }

        });

    } else if (req.body.initial_value != undefined) {
        utils.query("UPDATE Devices SET initial_value = " + req.body.initial_value + " WHERE id =" + req.body.id, (err, rsp, fields) => {

            if (err == null) {

                console.log("rsp", rsp);
                res.status(200).send(JSON.stringify(rsp));
            } else {
                console.log("err", err);
                res.status(409).send(err);
            }

        });
    }

});

app.get('/devices/', function (req, res, next) {
    utils.query("select * from Devices", (err, rsp, fields) => {

        if (err == null) {

            console.log("rsp", rsp);
            res.status(200).send(JSON.stringify(rsp));
        } else {
            console.log("err", err);
            res.status(409).send(err);
        }

    });

});

app.get('/usuarios/', function (req, res, next) {
    utils.query("select * from Usuarios", (err, rsp, fields) => {

        if (err == null) {
            res.status(200).send(JSON.stringify(rsp));
        } else {
            res.status(409).send(err);
        }

    });
});

// Tabla de tipos de dispositivo

app.get('/tipos_dispositivos/', function (req, res, next) {
    utils.query("select * from Tipos_dispositivos", (err, rsp, fields) => {

        if (err == null) {
            res.status(200).send(JSON.stringify(rsp));
        } else {
            res.status(409).send(err);
        }

    });
});

app.listen(PORT, function (req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
