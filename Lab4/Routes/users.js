"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const databasemongo_1 = require("../databasemongo");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    res.send({ msg: "users" });
});
router.post('/', (req, res, next) => {
    const newUser = new databasemongo_1.User(Object.assign({}, req.body));
    newUser.save()
        .then((user) => {
        if (user) {
            console.log("All good");
            res.send({ msg: "ok" });
        }
        else {
            console.log("something went wrong");
            res.send({ msg: "error" });
        }
    })
        .catch((e) => {
        console.log("There was an error", e);
        res.send({ msg: "error" });
    });
});
router.post('/login', (req, res, next) => {
    databasemongo_1.User.findOne({ username: req.body.username, password: req.body.password })
        .then((user) => {
        if (user) {
            console.log("All good");
            res.send(Object.assign({}, user));
        }
        else {
            console.log("something went wrong");
            res.send({ msg: "error" });
        }
    })
        .catch((e) => {
        console.log("There was an error", e);
        res.send({ msg: "error" });
    });
});
router.get('/reading', (req, res, next) => {
    databasemongo_1.User.find()
        .then((user) => {
        if (user) {
            console.log("All good");
            res.send(Object.assign({}, user));
        }
        else {
            console.log("something went wrong");
            res.send({ msg: "error" });
        }
    })
        .catch((e) => {
        console.log("There was an error", e);
        res.send({ msg: "error" });
    });
});
router.post('/update', (req, res, next) => {
    databasemongo_1.User.findOneAndUpdate({ username: req.body.username }, Object.assign({}, req.body), { new: true })
        .then((user) => {
        if (user) {
            console.log("All good");
            res.send(Object.assign({}, user));
        }
        else {
            console.log("something went wrong");
            res.send({ msg: "error" });
        }
    })
        .catch((e) => {
        console.log("There was an error", e);
        res.send({ msg: "error" });
    });
});
router.post('/edit', (req, res, next) => {
    databasemongo_1.User.findOne({ username: req.body.username })
        .then((user) => {
        if (user) {
            console.log("All good");
            res.send(Object.assign({}, user));
        }
        else {
            console.log("something went wrong");
            res.send({ msg: "error" });
        }
    })
        .catch((e) => {
        console.log("There was an error", e);
        res.send({ msg: "error" });
    });
});
router.post('/delete', (req, res, next) => {
    databasemongo_1.User.findOneAndDelete({ username: req.body.username })
        .then((user) => {
        if (user) {
            console.log("All good");
            res.send(Object.assign({}, user));
        }
        else {
            console.log("something went wrong");
            res.send({ msg: "error" });
        }
    })
        .catch((e) => {
        console.log("There was an error", e);
        res.send({ msg: "error" });
    });
});
exports.default = router;
//# sourceMappingURL=users.js.map