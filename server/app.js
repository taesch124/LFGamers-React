const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const gamesRouter = require('./routes/games');
const platformRouter = require('./routes/platforms');
const threadRouter = require('./routes/threads');
const lfgRouter = require('./routes/lfg');
const twilioRouter = require('./routes/twilio-chat');

const app = express();
const PORT = process.env.PORT || 8080;
require('./config/passport')(passport);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/LFGamers";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());



app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/games', gamesRouter);
app.use('/api/platforms', platformRouter);
app.use('/api/threads', threadRouter);
app.use('/api/lfg', lfgRouter);
app.use('/api/chat', twilioRouter);


//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
} else {
    app.use(express.static(path.resolve(__dirname, '..', 'public')));
    
    app.get('*', function (request, response){
        response.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
    });
}

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
});