import pino from 'pino'

const streams = [
    {level:'info', stream:process.stdout},
	{level:'warn', stream:pino.destination('./warn.log')} ,
	{level:'error', stream:pino.destination('./error.log')} 
]
const logger = pino({}, pino.multistream(streams))

export default logger