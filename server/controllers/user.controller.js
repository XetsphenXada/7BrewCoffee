import User from "../models/users.js";
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validationMiddleware from "../middleware/validationMiddleware.js";
import adminPermissionMiddleware from "../middleware/permissionsMiddleware.js";

const router = Router();

//Manager/Admin signup endpoint (For store manager/Admin use, will require admin check middleware)
router.post("/signup", validationMiddleware, adminPermissionMiddleware, async (request, response) => {
    try {
        //checks to see if the user exists
        const doesUserExist = await User.exists({
            email: request.body.email
        });
        if (doesUserExist === null) {
            const user = new User({
                employeeID: request.body.employeeID,
                createdBy: request.user.email,
                firstName: request.body.firstName,
                middleName: request.body.middleName,
                lastName: request.body.lastName,
                role: request.body.role,
                storeLocation: request.body.storeLocation,
                brewistas: request.body.brewistas,
                email: request.body.email,
                passwordHash: request.body.passwordHash
            });
            
            await user.save();
            
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
            
            response.send({
                message: "Success",
                token: token
            });
        } else {
            response.status(500).send({
                message: "Email is already in use"
            });
        }
    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    };
});

//User login endpoint
router.post("/login", async (request, response) => {
    
    const user = await User.findOne({ email: request.body.email })
    
    if(!user) {
        response.status(401).json({message: "The username or password is incorrect"});
    }
    if(user) {
        bcrypt.compare(request.body.password, user.password, (err, res) => {
            if(res) {
                const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
                response.status(200).json({
                    message: "Success",
                    token
                })
            } else {
                response.status(401).json({
                    message:"The username or password is incorrect"
                })
            }
        })
    }
});

//Employee account creation (For store manager use, will require admin check middleware)
router.post("/adduser", validationMiddleware, adminPermissionMiddleware, async (request, response) => {
    try {
        //checks to see if the user exists
        const doesUserExist = await User.exists({
            email: request.body.email
        });
        if (doesUserExist === null) {
            const user = new User({
                employeeID: request.body.employeeID,
                createdBy: request.user.email,
                firstName: request.body.firstName,
                middleName: request.body.middleName,
                lastName: request.body.lastName,
                role: request.body.role,
                storeLocation: request.body.storeLocation,
                email: request.body.email,
                passwordHash: request.body.passwordHash
            });
            
            await user.save();
            
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
            
            response.send({
                message: "Success",
                token: token
            });
        } else {
            response.status(500).send({
                message: "Email is already in use"
            });
        }
    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    };
});

export default router;