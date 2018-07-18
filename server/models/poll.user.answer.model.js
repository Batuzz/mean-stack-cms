import mongoose from 'mongoose';

const PollUserAnswerSchema = new mongoose.Schema({
    pollQuestion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PollQuestion'
    },
    pollAnswerOption: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PollAnswerOption'
    }
});


PollUserAnswerSchema.statics = {
    get(id) {
        return this
            .findById(id)
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
            .then((pollUserAnswer) => {
                return pollUserAnswer;
            }, err => {
                return err;
            });
    }
};



/**
 * @typedef PollUserAnswer
 */
export default mongoose.model('PollUserAnswer', PollUserAnswerSchema, 'poll_user_answers');