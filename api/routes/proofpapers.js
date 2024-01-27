import express from "express";
import {  proofpapers} from "../controllers/proofpapers.js";

const router = express.Router()


router.get("/:id", proofpapers)




export default router