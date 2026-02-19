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
        const myId = req.user._id;
        const {userId: otherUserId} = req.params;
        
        const messages = await Message.find({
            $or: [
                { sender: myId, receiver: otherUserId },
                { sender: otherUserId, receiver: myId }
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: 'Internal Server Error' });
        
    }
}

