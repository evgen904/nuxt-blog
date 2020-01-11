const {Schema, model} = require('mongoose')

// создаем можель поста
const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now // по дефолту текущее время
  },
  views: {
    type: Number,
    default: 0
  },
  imageUrl: String,
  comments: [{
    // id определенного поста, для таблицы с комментариями, связка через референцию (коллекция comments)
    type: Schema.Types.ObjectId,
    ref: 'comments'
  }]
})

module.exports = model('posts', postSchema)