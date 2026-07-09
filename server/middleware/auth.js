const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const authHeader = req.header("Authorization");

    if(!authHeader){
        return res.status(401).json({
            message:"Access denied"
        });
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch{
        res.status(401).json({
            message:"Invalid Token"
        });
    }
}

module.exports = auth;