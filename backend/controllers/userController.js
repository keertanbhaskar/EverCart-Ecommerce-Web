import userModel from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET)
}

//Route for user login
const loginUser = async (req,res) =>{
try{
  const {email,password} = req.body;
  const user = await userModel.findOne({email});
  
  if(!user){
    return res.json({success:false,message:"User doesn't exists"})
  }

  const isMatch = await bcrypt.compare(password,user.password);

  if(isMatch){
    const token = createToken(user._id)
    res.json({success:true,token})
  }
  else{
    res.json({success:false,message:"Invalid credentials"})
  }

}catch(error){
   console.log(error);
    res.json({success:false,message:error.message})
  
}
}

// Route for user register
const registerUser = async (req,res) =>{
  try{
    const {name,email,password} = req.body;

    //checking user already exist or not
    const exists = await userModel.findOne({email})
    if(exists){
      return res.json({success:false,message:"User already exists"})
    }

    // validating email format & strong password
    if(!validator.isEmail(email)){
      return res.json({success:false,message:"Please enter a valid email"})
    }

     if (password.length < 8) {
       return res.json({
         success: false,
         message: "Please enter a valid strong password",
       });
     }

    //  hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    
    const newUser = new userModel({
      name,
      email,
      password:hashedPassword
    })

    const user = await newUser.save()

    const token = createToken(user._id)

    res.json({success:true,token})

  }catch(error){
    console.log(error);
    res.json({success:false,message:error.message})
  }
}

// Route for admin login
const adminLogin = async (req,res) =>{
try {
  const {email,password} = req.body
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(email+password,process.env.JWT_SECRET);
    res.json({success:true,token})
  }else{
    res.json({success:false,message:"Invalid credentials"})
  }
} catch (error) {
  console.log(error);
  res.json({ success: false, message: error.message });
}
}

export { loginUser, registerUser, adminLogin };

// Cart functions
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};
    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };