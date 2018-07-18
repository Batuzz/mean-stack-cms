import PollUserAnswer from '../models/poll.user.answer.model';
import Poll from '../models/poll.model';
import httpStatus from 'http-status';


function load(req) {
    return PollUserAnswer.get(req.params.id);
}

function get(req, res) {
    load(req).then((pollUserAnswer) =>
        res.status(httpStatus.OK).send(pollUserAnswer),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function create(req, res) {

    for(let answer of req.body.poll) {
        PollUserAnswer.create({
            pollQuestion: answer.question,
            pollAnswerOption: answer.answer,
        });
    }

    res.status(httpStatus.OK).send();
}

function update(req, res) {
    return load(req).then(pollUserAnswer => {
        pollUserAnswer.pollQuestion = req.body.pollUserAnswer.pollQuestion;
        pollUserAnswer.pollAnswerOption = req.body.pollUserAnswer.pollAnswerOption;

        pollUserAnswer
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
    PollUserAnswer
        .find()
        .populate({
            path: 'pollQuestion pollAnswerOption',
            populate: {
                path: 'translations',
                populate: {
                    path: 'language'
                }
            }
        })
        .exec()
        .then((pollUserAnswers) =>
            res.status(httpStatus.OK).send(pollUserAnswers),
        (err) => {
            console.log(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        });
}

function remove(req, res) {
    PollUserAnswer.remove({
        _id : req.params.id
    }, () =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function getChartData(req, res) {

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
        .then((poll) => {
                let answers = [];

                let questions = poll.questions;
                let tasksDone = 0;
                let toFinishAsync = 0;

                for(let question of questions) {
                    let currentQuestionID = question._id;
                    toFinishAsync += question.answerOptions.length;
                    for(let answer of question.answerOptions) {
                        PollUserAnswer.count({
                            pollQuestion: currentQuestionID,
                            pollAnswerOption: answer
                        }).then((count) => {
                            answers.push({
                                question: question,
                                answer: answer,
                                count: count,
                                color: answer.color,
                                hoverColor: answer.hoverColor
                            });
                            tasksDone++;
                            if(tasksDone === toFinishAsync) {
                                res.status(200).send(answers); // I KNOW IT SHOULDN'T WORK LIKE THIS
                                // IT SHOULD NEVER WORK LIKE THIS BUT GUYS SORRY IM NOT A PRO (not yet ;) )
                                // I wish one day I'll look at this piece of code and say: what an idiot did this
                            }
                        }, (err) => console.log(err));
                    }

                }
        },
        (err) => {
            console.log(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        });
}

export default { load, get, create, update, list, remove, getChartData };