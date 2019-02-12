const mongoose = require('mongoose');
const Platform = require('./../models/Platform');
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/LFGamers";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

Platform.remove({});

xbox = Platform.create({name: 'Xbox One'});

playstation = Platform.create({name: 'Playstation 4'});

steam = Platform.create({name: 'Steam'});

origin = Platform.create({name: 'Origin'});