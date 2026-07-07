const router = require("express").Router();
const User = require("./User")

router.post("/signup", async(req,res)=>{
    try{
        const { name, email, password } = req.body;

        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({
                message: "User already exist"
            });
        }

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        res.status(201).json({
            message:"Signup successful"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

router.post("/login", async(req,res)=>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message:"User not found"
            });
        }

        if(user.password !== password){
            return res.status(400).json({
                message:"Incorrect Password"
            });
        }

        res.status(200).json({
            message: "Login successful"
        })
    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
})

module.exports = router;