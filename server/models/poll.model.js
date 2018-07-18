import mongoose from 'mongoose';

const PollSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    translations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Translation'
    }],
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PollQuestion'
    }]
});


PollSchema.statics = {
    get(id) {
        return this
            .findById(id)
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
            .then((poll) => {
                return poll;
            }, (err) => {
                return err;
            });
    }
};



/**
 * @typedef Poll
 */
export default mongoose.model('Poll', PollSchema, 'polls');