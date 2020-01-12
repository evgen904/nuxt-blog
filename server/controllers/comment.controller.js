const Comment = require('../models/comment.model')

// получаем id поста
const Post = require('../models/post.model')

module.exports.create = async (req, res) => {
  try {
    const {name, text, postId} = req.body
    const comment = new Comment({name, text, postId})

    await comment.save()

    // появится поле id, которое нужно записать в объект поста
    const post = await Post.findById(postId)
    post.comments.push(comment._id)

    // ждем пока пост сохранится
    await post.save()

    res.status(201).json(comment)

  } catch(e) {
    res.status(500).json(e)
  }
}