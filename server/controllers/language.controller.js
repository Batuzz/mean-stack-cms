import Language from '../models/language.model';
import Translation from "../models/translation.model";
import mongoose from "mongoose";
import httpStatus from "http-status";


function load(req) {
    return Language.get(req.params.id);
}

function get(req, res) {
    load(req).then((language) =>
        res.status(httpStatus.OK).send(language),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function create(req, res) {
    Language.create({
        iso: req.body.language.iso,
        name: req.body.language.name
    }).then(() =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function update(req, res) {
    return load(req).then(language => {
        language.iso = req.body.language.iso;
        language.name = req.body.language.name;

        language
            .save()
            .then(() =>
                res.status(httpStatus.OK).send(),
            err => {
                console.log(err);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
            });
    });
}

function list(req, res) {
    Language
        .find()
        .then((languages) =>
            res.status(httpStatus.OK).send(languages),
        (err) => {
            console.log(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        });
}

function removeByName(req, res) {
    Language.remove({
        name : req.params.name
    }, () => {
        res.status(httpStatus.OK).send();
    }, (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function remove(req, res) {
    Language.remove({
        _id : req.params.id
    }, () => {
        Translation
            .remove({
                language: new mongoose.Types.ObjectId(req.params.id),
            })
            .exec()
            .then(() =>
                res.status(httpStatus.OK).send(),
            (err) => {
                console.log(err);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
            });
    }, (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

export default { load, get, create, update, list, removeByName, remove };