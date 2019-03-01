const express = require('express');
const twilio = require('twilio');
const Chance = require('chance');

const AccessToken = twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;
const chance = new Chance();

const router = express.Router();

router.get('/token', (req, res) => {
    const token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET,
    );

    token.identity = req.user.user.username;
    token.addGrant(new ChatGrant(
        {
            serviceSid: process.env.TWILIO_CHAT_SERVICE_SID
        }
    ));

    res.send({
        identity: token.identity,
        jwt: token.toJwt()
    });
});


module.exports = router;