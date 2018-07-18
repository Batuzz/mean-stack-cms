import Image from '../models/image.model';
import httpStatus from 'http-status';
import fs from "fs";


function load(req) {
    return Image.get(req.params.id);
}

function get(req, res) {
    load(req).then((image) =>
        res.status(httpStatus.OK).send(image),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function create(req, res) {
    Image.create({
        url: req.body.image.url,
        descriptions: req.body.image.descriptions,
        titles: req.body.image.titles,
    }).then(() =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function update(req, res) {
    load(req).then(image => {
        image.url = req.body.image.url;
        image.descriptions = req.body.image.descriptions;
        image.titles = req.body.image.titles;

        image
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
    Image
        .find()
        .populate({
            path: 'descriptions titles',
            populate: {
                path: 'language'
            }
        })
        .exec()
        .then((images) =>
            res.status(httpStatus.OK).send(images),
        (err) => {
            console.log(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        });
}

function removeByURL(req, res) {
    Image.remove({
        url : req.params.url
    }, () => {
        res.status(httpStatus.OK).send();
    }, (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function remove(req, res) { // TODO: remove image file!!
    Image.remove({
        _id : req.params.id
    }, (image) => {
        fs.unlink(image.url);    // test it
        res.status(httpStatus.OK).send();
    }, (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

export default { load, get, create, update, list, removeByURL, remove };