import  express  from "express";
import {  getPosts,addPost,deletePost,employeeIDpost} from "../controllers/post.js";

const router = express.Router()


router.get("/", getPosts)
router.post("/", addPost)
router.delete("/:id", deletePost)
router.get('/:employeeID',employeeIDpost)


export default router