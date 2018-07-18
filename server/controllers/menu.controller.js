import Menu from '../models/menu.model';
import httpStatus from 'http-status';


function load(req) {
    return Menu.get(req.params.id);
}

function get(req, res) {
    load(req).then((menu) =>
        res.status(httpStatus.OK).send(menu),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function create(req, res) {
    Menu.create({
        name: req.body.menu.name,
        sequence: req.body.menu.sequence,
        url: req.body.menu.url,
        translations: req.body.menu.translations,
        submenus: req.body.menu.submenus
    }).then(() =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function update(req, res) {
    return load(req).then(menu => {
        menu.sequence = req.body.menu.sequence;
        menu.name = req.body.menu.name;
        menu.url = req.body.menu.url;
        menu.translations = req.body.menu.translations;
        menu.submenus = req.body.menu.submenus;

        menu
            .save()
            .then(() =>
                res.status(httpStatus.OK).send(),
            (err) => {
                console.log(err);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
            })
    });
}

function list(req, res) {
    Menu
        .find()
        .populate({
            path: 'translations submenus',
            populate: {
                path: 'language translations',
                populate: {
                    path: 'language'
                }
            }
        })
        .sort('sequence')
        .exec()
        .then((menus) =>
            res.status(httpStatus.OK).send(menus),
        (err) => {
            console.log(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        });
}

function removeByName(req, res) {
    Menu.remove({
        name : req.params.name
    }, () =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function remove(req, res) {
    Menu.remove({
        _id : req.params.id
    }, () =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

export default { load, get, create, update, list, removeByName, remove };