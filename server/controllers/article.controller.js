import Article from '../models/article.model';
import httpStatus from 'http-status';

function load(req) {
    return Article.get(req.params.id);
}

function get(req, res) {
    load(req).then((article) =>
        res.status(httpStatus.OK).send(article),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function create(req, res) {
    Article.create({
        name: req.body.article.name,
        translations: req.body.article.translations,
        sections: req.body.article.sections,
    }).then(() =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function update(req, res) {
    load(req).then(article => {
        article.name = req.body.article.name;
        article.translations = req.body.article.translations;
        article.sections = req.body.article.sections;

        article
            .save()
            .then(() =>
                res.status(httpStatus.OK).send(),
            err => {
                console.log(err);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
            });
    });
}

function getByName(req, res) {
    Article
        .findOne({
            name: req.params.name
        })
        .populate({
            path: 'translations sections',
            populate: {
                path: 'language translations image',
                populate: {
                    path: 'language titles descriptions'
                }
            }
        })
        .exec()
        .then((article) =>
                res.status(httpStatus.OK).send(article),
            (err) => {
                console.log(err);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
            });
}

function list(req, res) {
    Article
        .find()
        .populate({
            path: 'translations sections',
            populate: {
                path: 'language translations image',
                populate: {
                    path: 'language titles descriptions'
                }
            }
        })
        .exec()
        .then((articles) =>
            res.status(httpStatus.OK).send(articles),
        (err) => {
            console.log(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        });
}

function removeByName(req, res) {
    Article.remove({
        name : req.params.name
    }, () =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function remove(req, res) {
    Article.remove({
        _id : req.params.id
    }, () =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

export default { load, get, create, update, getByName, list, removeByName, remove };