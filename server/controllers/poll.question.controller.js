import PollQuestion from '../models/poll.question.model';
import httpStatus from 'http-status';

function load(req) {
    return PollQuestion.get(req.params.id);
}

function get(req, res) {
    load(req).then((pollQuestion) =>
        res.status(httpStatus.OK).send(pollQuestion),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function create(req, res) {
    PollQuestion.create({
        name: req.body.pollQuestion.name,
        translations: req.body.pollQuestion.translations,
        answerOptions: req.body.pollQuestion.answerOptions
    }).then(() =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function update(req, res) {
    return load(req).then(pollQuestion => {
        pollQuestion.name = req.body.pollQuestion.name;
        pollQuestion.translations = req.body.pollQuestion.translations;
        pollQuestion.answerOptions = req.body.pollQuestion.answerOptions;

        pollQuestion
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
    PollQuestion
        .find()
        .populate({
            path: 'translations answerOptions',
            populate: {
                path: 'language translations',
                populate: {
                    path: 'language'
                }
            }
        })
        .exec()
        .then((pollQuestions) =>
            res.status(httpStatus.OK).send(pollQuestions),
        (err) => {
            console.log(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        });
}

function removeByName(req, res) {
    PollQuestion.remove({
        name : req.params.name
    }, () =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function remove(req, res) {
    PollQuestion.remove({
        _id : req.params.id
    }, () =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

export default { load, get, create, update, list, removeByName, remove };