import Poll from '../models/poll.model';
import httpStatus from 'http-status';


function load(req) {
    return Poll.get(req.params.id);
}

function get(req, res) {
    load(req).then((poll) =>
        res.status(httpStatus.OK).send(poll),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function create(req, res) {
    Poll.create({
        name: req.body.poll.name,
        translations: req.body.poll.translations,
        questions: req.body.poll.questions
    }).then(() =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function update(req, res) {
    return load(req).then(poll => {
        poll.name = req.body.poll.name;
        poll.translations = req.body.poll.translations;
        poll.questions = req.body.poll.questions;

        poll
            .save()
            .then(() =>
                res.status(httpStatus.OK).send(),
            (err) => {
                console.log(err);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
            });
    });
}

function getByName(req, res) {
    Poll
        .findOne({
            name: req.params.name
        })
        .populate({
            path: 'translations questions',
            populate: {
                path: 'language translations answerOptions',
                populate: {
                    path: 'language translations',
                    populate: {
                        path: 'language'
                    }
                }
            }
        })
        .exec()
        .then((poll) =>
                res.status(httpStatus.OK).send(poll),
            (err) => {
                console.log(err);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
            });
}

function list(req, res) {
    Poll
        .find()
        .populate({
            path: 'translations questions',
            populate: {
                path: 'language translations answerOptions',
                populate: {
                    path: 'language translations'
                }
            }
        })
        .exec()
        .then((polls) =>
            res.status(httpStatus.OK).send(polls),
        (err) => {
            console.log(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        });
}

function removeByName(req, res) {
    Poll.remove({
        name : req.params.name
    }, () =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function remove(req, res) {
    Poll.remove({
        _id : req.params.id
    }, () =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

export default { load, get, create, update, getByName, list, removeByName, remove };