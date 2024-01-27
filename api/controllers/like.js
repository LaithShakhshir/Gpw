import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req,res)=>{
  const q = "SELECT userID FROM `like` WHERE postId = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map(like=>like.userID));
  });
}








export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO `like` (`userID`, `postId`) VALUES (?, ?)";
    const values = [req.body.employeeid, req.body.postid];

    db.query(q, values, (err, data) => {
      if (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(500).json("Failed to add like.");
      }
      return res.status(200).json("Post has been liked.");
    });
  });
};



export const deleteLike = (req, res) => {
  const emplyeeid = req.params.emplyeeid;
  const postId = req.params.postid;

  db.query('DELETE FROM `like` WHERE `userID` = ? AND `postId` = ?', [emplyeeid, postId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while deleting the like.' });
    }

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Like not found.' });
    }

    // Like successfully deleted
    return res.status(200).json({ message: 'Like has been deleted.' });
  });
}










