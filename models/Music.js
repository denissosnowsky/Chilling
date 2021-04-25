import pkg from 'mongoose';
const {Schema, model, Types} = pkg;

const musicSchema = new Schema({
    name: {type: String, default: ''},
    author: {type: String, default: ''},
    songSrc: {type: String, default: ''},
    date: {type: Date, default: Date.now}
});

export default model('Music', musicSchema);