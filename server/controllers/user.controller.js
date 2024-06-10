import User from "../models/users.js";
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import adminPermissionMiddleware from "../middleware/permissionsMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const router = Router();

//Manager/Admin signup endpoint (For store manager/Admin use, will require admin check middleware)
router.post("/addAdmin", adminPermissionMiddleware, async (request, response) => {
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
                password: request.body.password
            });
            
            await user.save();
            
            response.send({
                message: "Success"
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
router.post("/addEmployee", adminPermissionMiddleware, async (request, response) => {
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
                password: request.body.password
            });
            
            await user.save();
            
            response.send({
                message: "Success"
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

//Returns all users that are found in the database, will be used to filter the users by store location on the front end
router.get("/allusers", adminPermissionMiddleware, async (request, response) => {
    try {
        const allUsers = await User.find({});
        response.send(allUsers);
    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    };
});

//Endpoint to allow user profiles to be updated by an admin / manager
router.put("/allusers/:_id", adminPermissionMiddleware, async (request, response) => {
    try {
        const doesUserExist = await User.exists({
            email: request.body.email
        });
        const filter = { _id: request.params._id };
        const update = request.body;
        if (doesUserExist === null) {
            const editUser = await User.findOneAndUpdate(filter, update, {new: true})
            response.send(editUser)
        } else if (doesUserExist._id.toString() === filter._id.toString()) {
            const update = request.body;
            const editUser = await User.findOneAndUpdate(filter, update, {new: true})
            response.send(editUser)
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

//Endpoint to allow user profiles to be deleted by an admin / manager
router.delete("/allusers/:_id", adminPermissionMiddleware, async (request, response) => {
    try {
        const userDelete = await User.deleteOne({ _id: request.params._id })
        response.send(userDelete);
    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    };
});

//Returns the user who's ID matches the _id found in the parameter
router.get("/edit/:_id", validationMiddleware, async (request, response) => {
    try {
        const currentUser = await User.find({ _id: request.user._id });
        response.send(currentUser);
    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    };
});

//route for editing currently logged in user, (required due to the difference in middleware between the above edit and this ediit)
router.put("/edit/:_id", validationMiddleware, async (request, response) => {
    console.log("Edit was requested")
    try {
        //checks to see if the user exists
        const doesUserExist = await User.exists({
            email: request.body.email
        });
        const filter = { _id: request.params._id };
        const update = request.body;
        if (doesUserExist === null) {
            console.log(request.body);
            const editUser = await User.findOneAndUpdate(filter, update, {new: true})
            response.send(editUser)
        } else if (doesUserExist._id.toString() === filter._id.toString()) {
            const update = request.body;
            const editUser = await User.findOneAndUpdate(filter, update, {new: true})
            response.send(editUser)
        } else {
            response.status(500).send({
                message: "Email is already in use"
            });
        }
    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    }
})

export default router;