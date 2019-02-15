const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const authRouter = require('./routes/auth');
const gamesRouter = require('./routes/games');
const platformRouter = require('./routes/platforms');
const threadRouter = require('./routes/threads');

const app = express();
const PORT = process.env.PORT || 8080;
require('./config/passport')(passport);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/LFGamers";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());



app.use('/auth', authRouter);
app.use('/games', gamesRouter);
app.use('/platforms', platformRouter);
app.use('/threads', threadRouter);

// app.get('*', function (request, response){
//     response.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
// });

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
});