import Submenu from '../models/submenu.model';
import httpStatus from "http-status";


function load(req) {
    return Submenu.get(req.params.id);
}

function get(req, res) {
    load(req).then((submenu) =>
        res.status(httpStatus.OK).send(submenu),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function create(req, res) {
    Submenu.create({
        name: req.body.submenu.name,
        sequence: req.body.submenu.sequence,
        url: req.body.submenu.url,
        translations: req.body.submenu.translations,
    }).then(() =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function update(req, res) {
    res.header('Access-Control-Allow-Origin' , "*" );
    load(req).then(submenu => {
        submenu.name = req.body.submenu.name;
        submenu.sequence = req.body.submenu.sequence;
        submenu.url = req.body.submenu.url;
        submenu.translations = req.body.submenu.translations;

        submenu
            .save()
            .then(() =>
                res.status(httpStatus.OK).send(),
            err => {
                console.log(err);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
            })
    });
}

function list(req, res) {
    Submenu
        .find()
        .populate({
            path: 'translations',
            populate: {
                path: 'language'
            }
        })
        .sort('sequence')
        .exec()
        .then((submenus) =>
            res.status(httpStatus.OK).send(submenus),
        (err) => {
            console.log(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        });
}

function removeByName(req, res) {
    Submenu.remove({
        name : req.params.name
    }, () =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function remove(req, res) {
    Submenu.remove({
        _id : req.params.id
    }, () =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

export default { load, get, create, update, list, removeByName, remove };