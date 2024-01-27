import express from "express";
import { getLikes, addLike, deleteLike } from "../controllers/like.js";

const router = express.Router()

// router.get("/:id", getLikes)
router.get("/:id", getLikes)

router.post("/", addLike)
router.delete("/:emplyeeid/:postid", deleteLike);


export default router