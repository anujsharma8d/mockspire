const Contact = require("../models/Contact")

const createContact = async(req,res)=>{
    try{
        const { name,email,message } = req.body

        if (!name || !email || !message) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const contact = await Contact.create({
            name,
            email,
            message,
        });

        res.status(201).json({
            message: "Message sent successfully",
            contact,
        });

    } catch (err) {
        console.error("Contact error:", err);

        res.status(500).json({
            message: "Failed to send message",
        });
    }
}

module.exports = {createContact};