// Import the required Mongoose components
const { connect, connection: dbConnection } = require('mongoose');

// Set strict query mode to throw errors when querying for non-existent fields
dbConnection.set('strictQuery', true);

// Define the MongoDB connection string, from an environment variable or a local database
const dbURI =
  process.env.MONGO_DB_URI || 'mongodb://localhost:27017/socialMediaApp';

// Connect to the MongoDB database with the connection string and specified options
connect(dbURI, {
  useNewUrlParser: true, // Use the updated URL parser for the connection string
  useUnifiedTopology: true, // Enable the unified topology for the MongoDB driver
})
  .then(() => console.log('Connected to MongoDB using Mongoose!'))
  .catch((err) => console.error(`Error connecting to MongoDB: ${err.message}`));

// Export the Mongoose connection object for use in other modules
module.exports = dbConnection;
