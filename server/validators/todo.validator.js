import Joi from 'joi';

export default {
    // POST /api/users
    createTodo: {
        body: {
            username: Joi.string().required(),
            mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
        }
    },
    // POST /api/menus
    createMenu: {
        body: {
            title: Joi.string().required(),
        }
    },
};