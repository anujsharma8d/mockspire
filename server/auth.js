const router = require("express").Router();
const User = require("./User")
const bcrypt = require("bcrypt")

router.post("/signup", async(req,res)=>{
    try{
        const { name, email, password } = req.body;

        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({
                message: "User already exist"
            });
        }

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password,saltRounds);

        const user = new User({
            name,
            email,
            password:hashedPassword
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

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
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