import pkg from 'mongoose';
const {Schema, model, Types} = pkg;

const postSchema = new Schema({
    text: {type: String, default: ''},
    img: {type: String, default: ''},
    from: {type: Types.ObjectId, ref: 'User'},
    to: {type: Types.ObjectId, ref: 'User'},
    liked: [{type: Types.ObjectId, ref: 'User'}],
    date: {type: Date, default: Date.now}
});

export default model('Post', postSchema);