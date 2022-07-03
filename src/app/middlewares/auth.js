import jwt from "jsonwebtoken";
import authConfig from "../../config/config.json" assert {type: 'json'}

export default (req, res, next) => {

    const authToken = req.headers.authorization

    if(!authToken)
        return res.status(401).send({error: "Need token!"})

    jwt.verify(authToken.split(' ')[1], authConfig.secret, (err, decoded) => {
        
        if (err) return res.status(401).send({error: err})

        req.userId = decoded.id

        return next();

    })    

}