import  express  from "express";
import { prisonerstabel ,register, read ,edit,deleted,triptabel,deletetrip,registertrip} from "../controllers/prisoners.js";

const router = express.Router()

router.get("/prisonerstabel", prisonerstabel)
router.post("/register",register)
router.get("/read/:ID", read)
router.put("/edit/:ID", edit)
router.delete("/delete/:ID", deleted)
router.get("/trip", triptabel)
router.delete("/deletetrip/:ID", deletetrip)
router.post("/registertrip",registertrip)



export default router