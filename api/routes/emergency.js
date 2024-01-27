import express from "express";
import {  send ,gitmasseg,seen,seendone} from "../controllers/emergency.js";

const router = express.Router()


router.post("/", send)

router.get("/", gitmasseg) 
router.get('/seen', seen)
router.post('/seendone', seendone)



export default router