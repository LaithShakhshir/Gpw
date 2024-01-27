import  express  from "express";
import { visitertabel ,register, read ,edit,deleted,addvisiter,addvisitertosystem,delet} from "../controllers/visiter.js";
const router = express.Router()
router.get("/visitertabel", visitertabel)
router.post("/register",register)
router.get("/read/:ID", read)
router.put("/edit/:ID", edit)
router.get("/addvisiter", addvisiter)
router.delete("/delete/:ID", deleted)
router.delete("/dele/:ID", delet)

router.put("/addvisitertosystem/:id", addvisitertosystem);


export default router