import User from "../models/users.js";
import { Router, request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import adminPermissionMiddleware from "../middleware/permissionsMiddleware.js";
import "dotenv/config";
import nodemailer from "nodemailer"

const router = Router();

//Manager/Admin signup endpoint (For store manager/Admin use, will require admin check middleware)
router.post("/signup", adminPermissionMiddleware, async (request, response) => {
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
router.post("/adduser", adminPermissionMiddleware, async (request, response) => {
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

router.post("/forgotEmail", async (request, response) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // use SSL
            auth: {
              user: process.env.EMAIL_USERNAME, //sender gmail address
              pass: process.env.APP_PASSWORD, // App password from Gmail account
            },
          });
        
          // Configure the mailoptions object
          
          const mailOptions = {
            from: "7brewnoreplytest@gmail.com",
            to: request.body.email,
            subject: "Sending Email using Node.js",
            text: "That was easy!",
          };
        
          const sendMail = async (transporter, mailOptions) => {
            try {
              await transporter.sendMail(mailOptions);
              console.log("Email has been sent");
            } catch (error) {
              console.error(error);
            }
          };
        
          sendMail(transporter, mailOptions);
        
          // verify connection configuration
          transporter.verify(function (error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log("Server is ready to take our messages");
            }
          });
        
    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    };
});


export default router;