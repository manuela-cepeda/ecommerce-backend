import passport from 'passport'
import local from 'passport-local'
import { createHash, isValidPassword } from "../utils.js";
import { usersService } from '../services/index.js';


const LocalStrategy = local.Strategy;

const initializePassport = () => {
    //middleware
    passport.use('register', new LocalStrategy({passReqToCallback: true, usernameField: 'email'}, 
    async(req, email, password, done)=>{
        try {
            const {name, age, adress, tel } = req.body
        if(!name || !email || !password || !age || !adress || !tel) return done (null, false, {message:"incomplete values"})
        let user = await usersService.getByEmail(email)
        if(user) return  done (null, false, {message:"user alredy exists"})
        const newUser = { 
            name,      
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

    passport.use('login',new LocalStrategy({usernameField:'email'},async(email,password,done)=>{
        if(!email||!password) return done(null,false,{message:"Incomplete values"})
        let user = await usersService.getByEmail(email)
        if(!user) return done(null,false,{message:"Incorrect credentials"})
        if(!isValidPassword(user,password)) return done(null,false,{message:"Incorrect password"});
        return done(null,user);
    }))

    passport.serializeUser(async (user,done)=>{
        done(null, user._id)
    })
    passport.deserializeUser(async(id,done)=>{
        let result = await usersService.getByEmail(id)
      
        return done (null, result)
    })
}

export default initializePassport;