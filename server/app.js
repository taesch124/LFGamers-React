const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const userRouter = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 8080;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/LFGamers";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));

// app.get('*', function (request, response){
//     response.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
// });

app.use('/auth', userRouter);

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
});