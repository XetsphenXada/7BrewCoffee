import User from "../models/users.js";
import Permission from "../models/permissions.js";
import jwt from "jsonwebtoken";

export default async function adminPermissionMiddleware(request, response, next) {
    try {
        //find the admin and manager id's by the role in which they are stored under
        //save them as a string to be compared with user.role.toString()
        const admin = await Permission.findOne({ role: "Admin" });
        const manager = await Permission.findOne({ role: "Manager" });
        const regionalManager = await Permission.findOne({ role: "Regional Manager" });
        
        //decrypt jwt
        const decryptedToken = jwt.verify(request.headers.authorization, process.env.SECRET_KEY);
        
        //get user from ID that was in jwt
        const user = await User.findById(decryptedToken.id);
        
        request.user = user;
        
        //check if the user's role ID matches the ID of either the admin or the manager permissions level
        if (user.role != admin.role && user.role != manager.role && user.role != regionalManager.role) {
            throw new error("Not Authorized")
        }
        
        return next();
    } catch (error) {
        response.status(401).send({
            message: "User is not authorized to make this change"
        })
    }
}