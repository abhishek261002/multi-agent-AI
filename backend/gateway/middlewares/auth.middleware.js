const protect = async(req, res, next) => {
    try{
        const sessionId = req.cookies.sessionId
        if(!sessionId){
            return res.status(401).json({message: "unauthorized :: auth middleware.js"})
        }
        const session = await redis.get(`session-${sessionId}`)
        if(!session){
            return res.status(401).json({message: "Session expired :: auth middleware.js"})
        }
        req.user = JSON.parse(session)
        next()
    }
    catch(err){
        res.status(500).json({message: `Unauthorized ${err}`})
    }
} 

export default protect