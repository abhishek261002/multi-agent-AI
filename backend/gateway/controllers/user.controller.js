 import protect from '../middlewares/auth.middleware.js'
 const getCurrentUser = async (req, res) => {
    try{
        return res.status(200).json(req.user)
    }
    catch(err){
        res.status(500).json({message: `Error fetching user ${err}`})
    }
}

export {getCurrentUser}