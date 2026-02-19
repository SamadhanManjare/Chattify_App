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

export const sendMessages = async (req, res) => {
    try {
        const {text, image} = req.body;
        const {id : receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
             senderId,
             receiverId,
             text,
            image : imageUrl
        });
        await newMessage.save();

        //todo : send message in real time if receiver is online

        res.status(201).json(newMessage);

    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}