import passport from 'passport'
import local from 'passport-local'
import { createHash, isValidPassword } from "../utils.js";
import { usersService } from "../services/services.js";
import GoogleStrategy from 'passport-google-oauth20'
import config from './process.config.js'


const LocalStrategy = local.Strategy;

const initializePassport = () => {
    //middleware
    passport.use('register', new LocalStrategy({passReqToCallback: true, usernameField: 'email', session:false}, 
    async(req, email, password, done)=>{
        try {
            const {name, lastName, age, adress, tel } = req.body
            if(!name || !lastName || !email || !password || !age || !adress || !tel) return done (null, false, {message:"incomplete values"})
             let user = await usersService.getByEmail(email) 
             if(user) return  done (null, false, {message:"user alredy exists"})
            const newUser = { 
                name,  
                lastName,    
                email,
                tel,
                adress,
                age,
                password: createHash(password)
            }
            let result = await usersService.save(newUser)
            return done(null, result)
        } catch (error) {
            done(error)
        }
    }))

    passport.use('login',new LocalStrategy({usernameField:'email', session:false},async(email,password,done)=>{
        try {
            if(!email||!password) return done(null,false,{message:"Incomplete values"})
        let user = await usersService.getByEmail(email)
        if(!user) return done(null,false,{message:"Incorrect credentials"})
        if(!isValidPassword(user,password)) return done(null,false,{message:"Incorrect password"});
        return done(null,user);
        } catch (error) {
           return  done(error)
        }
        
    }))

    passport.use('google', new GoogleStrategy({
        clientID: config.google.CLIENT_ID,
        clientSecret: config.google.CLIENT_SECRET,
        callbackURL: config.app.API_URL + '/api/sessions/googlecallback' 
    },async ( accessToken, refreshToken, profile, done) => {
        try {
            const {name, email} = profile._json;
            let user = await usersService.getByEmail(email)
            if(!user) {
                let newUser = {
                    name,
                    email,
                    password:''
                }
                let result = await usersService.save(newUser)
                return done(null,result)
            }else{
                return done(null, user)
            }  
        } catch (error) {
            done(error)
        }
    }))
 

    passport.serializeUser(async (user,done)=>{
        done(null, user._id)
    })
    passport.deserializeUser(async(id,done)=>{
        let result = await usersService.getById(id)      
        return done (null, result)
    })
}

export default initializePassport;