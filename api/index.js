import  express from "express";
const app = express()
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import likeRoutes from "./routes/likes.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";
import visiterRoutes from "./routes/visiter.js"
import prisonersRoutes from "./routes/prisoners.js"
import visit from "./routes/visit.js"
import calendar from "./routes/calendar.js"
import emergency from "./routes/emergency.js"
import cors from "cors";
import multer from "multer";

import proofpapers from "./routes/proofpapers.js"



app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true)
    next()

})
app.use(cors({
  origin: "http://localhost:3000",
}));
app.use(express.json({ limit: '10mb' }));

app.use(cookieParser());

//uplodfile
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
  });






app.use("/api/events", calendar)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/visiter", visiterRoutes)
app.use("/api/prisoners", prisonersRoutes)
app.use("/api/visit", visit)
app.use('/api/proofpapers', proofpapers);
app.use('/api/emergency', emergency);







app.listen(8888, ()=>{
    console.log("API work")

})

