import Translation from '../models/translation.model';
import httpStatus from 'http-status';


function load(req) {
    return Translation.get(req.params.id);
}

function get(req, res) {
    load(req).then((translation) =>
        res.status(httpStatus.OK).send(translation),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function create(req, res) {
    Translation.create({
        name: req.body.translation.name,
        language: req.body.translation.language,
        text: req.body.translation.text
    }).then(() =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function update(req, res) {
    return load(req).then((translation) => {
        translation.name = req.body.translation.name;
        translation.language = req.body.translation.language;
        translation.text = req.body.translation.text;

        translation
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
    Translation
        .find()
        .populate('language')
        .exec()
        .then((translations) =>
            res.status(httpStatus.OK).send(translations),
        (err) => {
            console.log(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        });
}

function listByName(req, res) {
    Translation
        .find({
            name: req.params.name
        })
        .populate('language')
        .exec()
        .then((translations) =>
            res.status(httpStatus.OK).send(translations),
        (err) => {
            console.log(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        });
}

function removeByName(req, res) {
    Translation.remove({
        name : req.params.name
    }, () =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function remove(req, res) {
    Translation.remove({
        _id : req.params.id
    }, () =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

export default { load, get, create, update, list, listByName, removeByName, remove };