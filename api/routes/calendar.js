import  express  from "express";
import {first, secound, third  } from "../controllers/calendar.js";

const router = express.Router()

router.get("/", first)

router.post("/", secound)
router.delete("/:id", third)


export default router