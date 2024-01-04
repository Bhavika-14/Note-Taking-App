const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/noteRoutes');
const authenticate = require('./middleware/authenticateUser')

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/notetakingapp', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(authenticate)
app.use('/api', noteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app