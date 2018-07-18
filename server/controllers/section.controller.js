import Section from '../models/section.model';
import httpStatus from 'http-status';


function load(req) {
    return Section.get(req.params.id);
}

function get(req, res) {
    load(req).then((section) =>
        res.status(httpStatus.OK).send(section),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function create(req, res) {
    Section.create({
        name: req.body.section.name,
        sequence: req.body.section.sequence,
        translations: req.body.section.translations,
        image: req.body.section.image,
    }).then(() =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function update(req, res) {
    load(req).then(section => {
        section.name = req.body.section.name;
        section.sequence = req.body.section.sequence;
        section.translations = req.body.section.translations;
        section.image = req.body.section.image;

        section
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
    Section
        .find()
        .populate({
            path: 'translations image',
            populate: {
                path: 'language descriptions titles'
            }
        })
        .exec()
        .then((sections) =>
            res.status(httpStatus.OK).send(sections),
        (err) => {
            console.log(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        });
}

function removeByName(req, res) {
    Section.remove({
        name : req.params.name
    }, () =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function remove(req, res) {
    Section.remove({
        _id : req.params.id
    }, () =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

export default { load, get, create, update, list, removeByName, remove };