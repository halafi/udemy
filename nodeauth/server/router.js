const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
    app.get('/', requireAuth, (req, res) => { // protected resource, verify token and give access
        res.send({ hi: 'there'});
    });
    app.post('/signin', requireSignin, Authentication.signin); // verify emal/password and give token
    app.post('/signup', Authentication.signup); // verify email is not in use and give token
}
