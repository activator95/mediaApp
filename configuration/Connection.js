const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/mediaApp';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
