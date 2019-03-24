const express = require('express');
const twilio = require('twilio');
const Chance = require('chance');

const AccessToken = twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;
const chance = new Chance();

const router = express.Router();

router.get('/token/:platformId', (req, res) => {
    let platform = req.params.platformId;
    const token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET,
    );

    let accounts = req.user.user.accounts.filter(e => e.platform === platform);
    if(accounts.length === 1) {
        let platformAccount = accounts[0].account;
        
        token.identity = platformAccount;
        token.addGrant(new ChatGrant(
            {
                serviceSid: process.env.TWILIO_CHAT_SERVICE_SID
            }
        ));

        res.send({
            identity: token.identity,
            jwt: token.toJwt()
        });
    } else {
        res.send({
            error: true,
            message: 'No account for posting platform'
        });
    }
    
});


module.exports = router;