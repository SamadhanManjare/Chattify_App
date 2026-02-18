import User from "../models/User.js";


export const getAllContacts = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({_id: { $ne: loggedInUserId } }).select('-password');
        res.status(200).json(filteredUser);
    }
    catch(err){
        console.log("Error in get All contacts");
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }   
}

export const getMessagesByUserId = async (req, res) => {

    try {
        const loggedInUserId = req.user._id;
        const otherUserId = req.params.userId;
        const loggedInUser = await User.findById(loggedInUserId);
        const otherUser = await User.findById(otherUserId);

        if (!loggedInUser || !otherUser) {
            return res.status(404).json({ error: 'User not found' });
        }

    } catch (error) {
        
    }
}