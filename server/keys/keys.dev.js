module.exports = {
  MONGO_URI: `mongodb://evgeniy:q123456@cluster0-shard-00-00-kmq61.mongodb.net:27017,cluster0-shard-00-01-kmq61.mongodb.net:27017,cluster0-shard-00-02-kmq61.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,
  // ключ для токена, любое рандомное слово
  JWT: 'dev-jwt-key'
}