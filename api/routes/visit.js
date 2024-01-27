import  express  from "express";
import { visittabel ,register, read ,edit,deleted} from "../controllers/visit.js";

const router = express.Router()

router.get("/visittabel", visittabel)
router.post("/register",register)
router.get("/read/:ID", read)
router.put("/edit/:ID", edit)
router.delete("/delete/:ID", deleted)





export default router