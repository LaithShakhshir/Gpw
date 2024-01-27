




import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    if (!req.body.EmployeeID) {
      return res.status(400).json("officeID is required");
    }

    const q = "INSERT INTO post(`officeID`, `Text`, `Photos`, `date`) VALUES (?)";
    const values = [
      req.body.EmployeeID,
      req.body.Text,
      req.body.Photos,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      const postId = result.insertId;
      const newPost = {
        id: postId,
        EmployeeID: req.body.EmployeeID,
        Text: req.body.Text,
        Photos: req.body.Photos,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      };
      return res.status(200).json(newPost);
    });
  });
};

export const uploadImage = (req, res) => {
  
  const fileUrl = `https://your-website.com/images/${req.file.filename}`;

  return res.status(200).json({ url: fileUrl });
};




export const getPosts = (req, res) => {
  const q = `
    SELECT p.*, u.ID, u.Name, u.Photo
    FROM post AS p
    JOIN office AS u ON (u.ID = p.officeID)
    ORDER BY p.date DESC
  `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    if (!data) {
      return res.status(404).json({
        message: "No posts found",
      });
    }

    if (!Array.isArray(data)) {
      return res.status(400).json({
        message: "Invalid data returned from database",
      });
    }

    data.forEach((post) => {
      if (
        !post.hasOwnProperty("id") ||
        !post.hasOwnProperty("Photos") ||
        !post.hasOwnProperty("Text") ||
        !post.hasOwnProperty("date") ||
        !post.hasOwnProperty("officeID") ||
        !post.hasOwnProperty("NumberLikes")
      ) {
        return res.status(400).json({
          message: "Invalid post object returned from database",
        });
      }
    });

    return res.status(200).json(data);
  });
};







export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    if (!req.params.id) {
      return res.status(400).json("Post ID is required");
    }

    const q = "DELETE FROM post WHERE `id` = ? AND `officeID` = ?";

    db.query(q, [req.params.id, userInfo.ID], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post");
    });
  });
};



// export const employeeIDpost = (req, res) => {
//   const employeeID = req.params.employeeID;

//   console.log(employeeID)
//   try {
//     // Execute the SQL query to fetch posts for the given employeeID
//     const q = 'SELECT * FROM post WHERE officeID = ?';

//     db.query(q, [employeeID], (err, data) => {
//       if (err) {
//         console.error('Error occurred:', err);
//         return res.status(500).json({ error: 'An error occurred' });
//       }

//       if (!data || data.length === 0) {
//         return res.status(404).json({
//           message: 'No posts found',
//         });
//       }

//       data.forEach((post) => {
//         if (
//           !post.hasOwnProperty('id') ||
//           !post.hasOwnProperty('Photos') ||
//           !post.hasOwnProperty('Text') ||
//           !post.hasOwnProperty('date') ||
//           !post.hasOwnProperty('EmployeeID') ||
//           !post.hasOwnProperty('NumberLikes')
//         ) {
//           return res.status(400).json({
//             message: 'Invalid post object returned from database',
//           });
//         }
//       });

//       return res.status(200).json(data);
//     });
//   } catch (error) {
//     console.error('Error occurred:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// };




export const employeeIDpost = (req, res) => {
  const employeeID = req.params.employeeID;

  console.log(employeeID);

  try {
    // Execute the SQL query to fetch posts for the given employeeID
    const q = 'SELECT * FROM post WHERE officeID = ?';

    db.query(q, [employeeID], (err, data) => {
      if (err) {
        console.error('Error occurred:', err);
        return res.status(500).json({ error: 'An error occurred' });
      }

      if (!data || data.length === 0) {
        return res.status(404).json({
          message: 'No posts found',
        });
      }

      // Check properties of each post
      for (const post of data) {
        if (
          !post.hasOwnProperty('id') ||
          !post.hasOwnProperty('Photos') ||
          !post.hasOwnProperty('Text') ||
          !post.hasOwnProperty('date') ||
          !post.hasOwnProperty('officeID') ||
          !post.hasOwnProperty('NumberLikes')
        ) {
          return res.status(400).json({
            message: 'Invalid post object returned from database',
          });
        }
      }

      // Send the response after the loop
      return res.status(200).json(data);
    });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
