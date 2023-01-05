import dotenv from 'dotenv';
import minimist from 'minimist';


dotenv.config();
const {PORT} = minimist(process.argv.slice(2), {default:{PORT:8080}})

const processConfig = {
    app: {
        PORT:PORT,
        CLIENT_URL: process.env.CLIENT_URL,
        API_URL:process.env.API_URL
    },
    mongo: {
        MONGO_URL: process.env.MONGO_URL,
    },
    github: {
        CLIENT_ID:  process.env.GITHUB_CLIENT_ID,
        CLIENT_SECRET:  process.env.GITHUB_CLIENT_SECRET,
    },
    jwt: {
        SECRET: process.env.JWT_SECRET,
        COOKIE: process.env.JWT_COOKIE
    },
    google:{
        CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
        CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET

    }
   
}


export default processConfig

