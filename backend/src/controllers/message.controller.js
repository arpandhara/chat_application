import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import { User } from "../models/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUsedId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUsedId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getAllContacts: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const message = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(message);
  } catch (error) {
    console.error("Error in getMessagesByUserId: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if(!image || !image){
      return res.json(400).json({message : "Text or image is required"})
    }

    if(senderId.equals(receiverId)) return res.status(400).json({message : "Cannot send messages to yourself. "});

    const receiverExsists = await User.exists({_id:receiverId});

    if(!receiverExsists) return res.status(404).json({message : "Receiver not found"});

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // todo : send message in real-time if user is online

    res.status(201).json({ newMessage });
  } catch (error) {
    console.error("Error in sendMessage controller: ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUsedId = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: loggedInUsedId }, { receiverId: loggedInUsedId }],
    });

    const chatPartnerIds = [...new Set(messages.map((msg) =>
      msg.senderId.toString() === loggedInUsedId.toString()
        ? msg.receiverId.toString()
        : msg.senderId.toString())
    )];

    const chatPartners = await User.find({_id : {$in : chatPartnerIds}}).select("-password");


    res.status(200).json(chatPartners);
  } catch (error) {
    console.error("Error in getChatPartners controller: ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
