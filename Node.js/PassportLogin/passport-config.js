const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById){
    //The parameters match up to the fields. Since our usernameField is 'email' that is the first parameter
    //The done parameter is what function should be run when we are done authenticating our user
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)

        //Params for done(): (error, userVariable, message)
        if(user == null){
            return done(null, false, {message: 'No user with that email'})
        }

        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            } else{
                return done(null, false, { message: 'Password incorrect'})
            }
        } catch (e){
            return done(e)
        }
    }

    //LocalStrategy takes options that tells it what the username field will be called, in our case it's email
    //You can also give it the passwordField, however it defaults to 'password' and since our password field is named 'password'
    //it works just fine
    //It then takes a function that will be used to authenticate the user however we choose. That function is define above
    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))

    //Serialize user to store in the session
    passport.serializeUser((user, done) => done(null, user.id)) 
    //Deserialize user from id given by session
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize