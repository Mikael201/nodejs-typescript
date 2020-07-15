"use strict";
exports.__esModule = true;
var express_1 = require("express");
var Note = require('./schemas/note');
var app = express_1["default"]();
var cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.use(cors());
app.post('/save', jsonParser, function (req, res) {
    console.log("tulee POST");
    console.log(req.body);
    var body = req.body;
    if (typeof body.id === 'number' && typeof body.title === 'string' && typeof body.body === 'string' && typeof body.writer === 'string') {
        var note = new Note({
            id: body.id,
            title: body.title,
            body: body.body,
            writer: body.writer
        });
        note.save().then(function (data) {
            express_1.response.status(200).json({
                note: data
            });
        })["catch"](function (e) {
            res.status(401).json({
                data: 'Error saving note ' + e
            });
        });
    }
    else {
        console.log("input väärin");
        res.status(401).json({
            data: 'check your input types accordingly: string, string, string'
        });
    }
});
app.get('/all', function (req, res) {
    console.log("tulee GET");
    Note.find({}).then(function (notesArray) {
        if (notesArray.length > 0) {
            res.status(200).json({
                data: notesArray
            });
        }
        else {
            res.status(200).json({
                data: 'There is 0 notes'
            });
        }
    })["catch"](function (e) {
        res.status(401).json({
            error: 'Error fetching notes: ' + e
        });
    });
});
app.listen(3000, function () { return console.log("server running"); });
