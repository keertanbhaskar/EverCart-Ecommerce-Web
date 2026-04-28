import express from 'express';
import { loginUser, registerUser, adminLogin, addToCart, updateCart, getUserCart } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/cart/add", authUser, addToCart);
userRouter.post("/cart/update", authUser, updateCart);
userRouter.post("/cart/get", authUser, getUserCart);

export default userRouter;
