import jwt from "jsonwebtoken";

function verifyToken(req,res, next){
    try {
        const token = req.headers.authorization
        const secrectKey = process.env.SECRECTKEY

        if(!token){
            return res.status(401).json({message : 'Unauthorized: Token not provided'})
        }
        jwt.verify(token.replace('Bearer ', ''),secrectKey , (err ,decoded) => {
            if(err){
                return res.status(401).json({message : 'Unauthorized: Invalid token'})
            }
        })
        req.user = decoded
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = verifyToken