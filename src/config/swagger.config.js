import swaggerJSDoc from "swagger-jsdoc";
import __dirname from "../utils.js";

__dirname
const swaggerOptions = {
	definition:{
		openapi: '3.0.1',
		info:{
			title:'API eccomerce',
			description: 'API para curso de coder'
		}
	},
    apis: [`${__dirname}/docs/**/*.yaml`]
}

export const specs = swaggerJSDoc(swaggerOptions)
