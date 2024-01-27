import  express  from "express";
import {login, logout, register,updateUser  } from "../controllers/auth.js";

const router = express.Router()

router.post("/register", register)

router.post("/login", login)
router.post("/logout", logout)
router.put("/:id", updateUser);


export default router