import jwt from "jsonwebtoken"
import User from "../models/user.models.js";
export default async function validationMiddleware(request, response, next) {
    //decrypt jwt
    const decryptedToken = jwt.verify(request.headers.authorization, process.env.SECRET_KEY);
    
    //get user from ID that was in jwt
    const user = await User.findById(decryptedToken.id);
    if (!user) {
        throw new error("ID from JWT doesn't response to User in database");
    }

    request.user = user;
    
    return next();
}