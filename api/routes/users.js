import  express  from "express";
//// import { getUser } from "../controllers/user.js";

const router = express.Router()

// const bcrypt=require("bcryptjs")
////// router.get("/find/:userId", getUser)
router.put("/:id",async(req,res)=>{
  /*  if(req.body.ID=== req.params.id){
        if(req.body.Password){
            try{
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(req.body.Password, salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{

            const user = await 

        }catch(err){

        }
    }else{
        return res.status(403).json("You can update only your account")
    }*/
})

export default router 