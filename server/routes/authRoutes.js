const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

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

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )

        res.status(200).json({
            success:true,
            token,
            message: "Login successful"
        })
    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
})

router.get("/verify",auth,async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success:true,
            user
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.get("/dashboard", auth, async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");

        res.status(200).json({
            success: true,
            user
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
})
router.get("/interview", auth, async(req,res)=>{
    try{
        res.status(200).json({
            success: true,
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
})

module.exports = router;