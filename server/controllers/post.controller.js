// создаем функции
const Post = require('../models/post.model')

module.exports.create = async (req, res) => {
  // создаем объект в БД
  // сначала локально его создаем
  // используем экземпляр класса Post
  // req берем из /models/post.model.js

  // поля views и date, принимают по дефолту значения, по этому не передаем их
  const post = new Post({
    title: req.body.title,
    text: req.body.text,
    // картинку будем брать с папки static
    imageUrl: `${req.file.filename}`
  })

  // хорошим тоном считается, если проверяем через try catch, при работе с асинхронными операциями
  try {
    // если все хорошо, сохраняем
    await post.save()
    // 201 объект создан, возвращаем сгенерированные данные, id сгенерируется автоматом
    res.status(201).json(post)
  } catch(e) {
    // 500 серверная ошибка
    res.status(500).json(e)
  }
}

module.exports.getAll = async (req, res) => {
  // т.к. работа с БД обарачиваем в try catch
  // обращаемся к можели Post и ищем через find, найдет все посты, которые отсортируем по дате, date: -1 в обратном порядке
  try {
    const posts = await Post.find().sort({date: -1})
    // получив массив отправляем его
    res.json(posts)
  } catch(e) {
    res.status(500).json(e)
  }  
}

module.exports.getById = async (req, res) => {
  try {
    // сразу обращаемся к БД, и ищем по id
    // название должно совпадать с роутом, по названию которое указали '/admin/:id',
    // получаем список комментариев, через populate где указываем коллекцию (модель)
    // exec сначала принимает ошибку, затем объект поста, который отправим пользователю
    await (await Post.findById(req.params.id)).populate('comments').exec((error, post) => {
      res.json(post)
    })
  } catch(e) {
    res.status(500).json(e)
  } 
}

module.exports.update = async (req, res) => {
  const $set = {
    text: req.body.text
  }
  try {
    // для начала создадим объкт пост, который в последствии отправим обратно клиенту, измененный
    // чтобы не сенхр. клиента сервер на угад, а чтобы сервер постоянно отдовал данные клиенту, которые точно есть на сервере
    // если не сенхр. то могут быть ошибки
    // new: true вернет объект поста
    const post = await Post.findOneAndUpdate({
      _id: req.params.id
    }, {$set}, {new: true})

    res.json(post)
  } catch(e) {
    res.status(500).json(e)
  } 
}

module.exports.remove = async (req, res) => {
  try {
    // метод с мангуза которому передаем id
    await Post.deleteOne({_id: req.params.id})
    res.json({message: 'Пост удален'})
  } catch(e) {
    res.status(500).json(e)
  } 
}

module.exports.addView = async (req, res) => {
  // увеличиваем просмотр поста на сервере
  const $set = {
    views: ++req.body.views
  }
  try {
    await Post.findByIdAndUpdate({_id: req.params.id}, {$set})
    // 204 все успешно но контента нет
    res.status(204).json()
  } catch(e) {
    res.status(500).json(e)
  } 
}