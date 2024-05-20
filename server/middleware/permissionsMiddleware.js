import User from "../models/users.js";
import jwt from "jsonwebtoken";

export default async function adminPermissionMiddleware(request, response, next) {
    try {
        const adminId = '664544a0cf6bbbd2622e9435'
        const managerId = '66455851cf6bbbd2622e945c'
        
        //decrypt jwt
        const decryptedToken = jwt.verify(request.headers.authorization, process.env.SECRET_KEY);
        
        //get user from ID that was in jwt
        const user = await User.findById(decryptedToken.id);
        
        request.user = user;
        
        //check if the user's role ID matches the ID of either the admin or the manager permissions level
        if (user.role.toString() != adminId && user.role.toString() != managerId) {
            throw new error("User is not authorized to make this change")
        }
        
        return next();
    } catch (error) {
        response.status(500).send({
            message: "User is not authorized to make this change"
        })
    }
}