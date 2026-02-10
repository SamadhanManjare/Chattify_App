import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../lib/Utils.js";
import { sendWelcomeEmail } from "../email/emailHandler.js";
import { ENV } from "../lib/env.js";


export const signup = async (req, res) => {
    
    const { fullname, email, password } = req.body;

    try {
        // Here you would typically add code to save the user to the database
        // For now, we'll just return a success message

        if(!fullname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if(password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
         const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
        });
        if(newUser){
            // generateToken(newUser._id, res);
            // await newUser.save();

            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

             try{
                await sendWelcomeEmail(savedUser.fullname, ENV.CLIENT_URL, savedUser.email); 
             }catch(error){
                console.error("Error sending welcome email:", error);
             }


             return res.status(201).json({ 
               
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic,
             })

           


        }else{
            return res.status(400).json({ message: 'Error creating user' });
        }

    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}