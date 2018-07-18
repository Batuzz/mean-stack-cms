import PollAnswerOption from '../models/poll.answer.option.model';
import httpStatus from 'http-status';


function load(req) {
    return PollAnswerOption.get(req.params.id);
}

function get(req, res) {
    load(req).then((pollAnswerOption) => {
        res.status(httpStatus.OK).send(pollAnswerOption);
    }, (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function create(req, res) {
    PollAnswerOption.create({
        name: req.body.pollAnswerOption.name,
        translations: req.body.pollAnswerOption.translations,
        color: req.body.pollAnswerOption.color,
        hoverColor: req.body.pollAnswerOption.hoverColor,
    }).then(() =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function update(req, res) {
    return load(req).then(pollAnswerOption => {
        pollAnswerOption.name = req.body.pollAnswerOption.name;
        pollAnswerOption.translations = req.body.pollAnswerOption.translations;
        pollAnswerOption.color = req.body.pollAnswerOption.color;
        pollAnswerOption.hoverColor = req.body.pollAnswerOption.hoverColor;

        pollAnswerOption
            .save()
            .then(() =>
                res.status(httpStatus.OK).send(),
            (err) => {
                console.log(err);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
            });
    });
}

function list(req, res) {
    PollAnswerOption
        .find()
        .populate({
            path: 'translations',
            populate: {
                path: 'language'
            }
        })
        .exec()
        .then((pollAnswerOptions) =>
            res.status(httpStatus.OK).send(pollAnswerOptions),
        (err) => {
            console.log(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        });
}

function removeByName(req, res) {
    PollAnswerOption.remove({
        name : req.params.name
    }, () =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function remove(req, res) {
    PollAnswerOption.remove({
        _id : req.params.id
    }, () =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

export default { load, get, create, update, list, removeByName, remove };