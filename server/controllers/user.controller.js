import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from '../../config';
import httpStatus from 'http-status';
import bcrypt from "bcrypt";

function load(req) {
    return User.get(req.params.id);
}

function get(req, res) {
    return res.json(req.user);
}

function create(req, res) {

    User.create({
        email : req.body.user.email,
        username : 'User',
        password : req.body.user.password
    }).then(() =>
        res.status(httpStatus.OK).send(),
    (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

function update(req, res) {
    return load(req).then(user => {
        user.email = req.body.user.email;
        user.username = req.body.user.username;
        user.imageURL = req.body.user.imageURL;

        user
            .save()
            .then((user) =>
                res.status(httpStatus.OK)
                    .send({
                        email: user.email,
                        username: user.username,
                        imageURL: user.imageURL
                    }),
                err => {
                    console.log(err);
                    res.status(httpStatus.INTERNAL_SERVER_ERROR)
                       .send();
                }
            );
    });
}

function remove(req, res) {
    User.remove({
        _id : req.params.id
    }, () => {
        res.status(httpStatus.OK)
            .send();
    }, (err) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
           .send();
    });
}

function login(req, res) {

    User
        .findOne({email: req.body.user.email})
        .exec()
        .then(
            (user) => {
                if(!user) {
                    let err = new Error('User not found.');
                    err.status = httpStatus.UNAUTHORIZED;
                    console.log(err);
                    return;
                }
                bcrypt.compare(req.body.user.password, user.password, function(err, result) {
                    if(err)
                        res.sendStatus(httpStatus.UNAUTHORIZED);
                    if(result === true) {
                        const token = jwt.sign({
                            username: user.username
                        }, config.jwtSecret);
                        return res.status(200).send({
                            token,
                            _id: user._id,
                            username: user.username,
                            imageURL: user.imageURL,
                            email: user.email,
                        });
                    } else {
                        res.sendStatus(httpStatus.UNAUTHORIZED);
                    }
                });
            }, (err) => {
                console.log(err);
                res.status(httpStatus.INTERNAL_SERVER_ERROR)
                   .send();
            }
        );
}

export default { load, get, create, update, remove, login };