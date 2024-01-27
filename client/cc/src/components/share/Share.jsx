import "./share.css";
import { PermMedia, Room, EmojiEmotions } from "@mui/icons-material";
import axios from 'axios'

import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {

  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();

    mutation.mutate({ EmployeeID: currentUser.ID, Text: desc, Photos: imgUrl });
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <div className="shareTop">
            <img
              src={"/upload/" + currentUser.Photo}
              alt=""
              className="shareProfileImg"
            />
            <input
              type="text"
              className="shareInput"
              placeholder={"New POST... "}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              style={{ marginTop: "10px" }}
            />
          </div>
          <div className="right">
            {file && (
              <img
                className="file"
                alt=""
                src={URL.createObjectURL(file)}
              />
            )}
          </div>
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="shareOption">
                <PermMedia htmlColor="tomato" className="shareIcon" />
                <span>Add Image</span>
              </div>
            </label>
            {/* <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span>Add Place</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions
                htmlColor="goldenrod"
                className="shareIcon"/>
              <span>Tag Friends</span>
            </div> */}
          </div>
          <div className="right">
            <button className="shareButton" onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;

// import "./share.css";
// import { PermMedia, Room, EmojiEmotions } from "@mui/icons-material";
// import axios from 'axios'

// import { useContext, useState } from "react";
// import { AuthContext } from "../context/authContext";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";

// const Share = () => {

//   const [file, setFile] = useState(null);
//   const [desc, setDesc] = useState("");

//   const upload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       const res = await makeRequest.post("/upload", formData);
//       const photoUrl = `https://www.facebook.com/photo/${res.data.filename}`; // Replace "your-website.com/images" with the actual URL where the images are stored
//       setDesc("");
//       setFile(null);
//       return photoUrl;
//     } catch (err) {
//       console.log(err);
//     }
//   };
  
  

//   const { currentUser } = useContext(AuthContext);

//   const queryClient = useQueryClient();

//   const mutation = useMutation(
//     (newPost) => {
//       return makeRequest.post("/posts", newPost);
//     },
//     {
//       onSuccess: () => {
//         // Invalidate and refetch
//         queryClient.invalidateQueries(["posts"]);
//       },
//     }
//   );

//   const handleClick = async (e) => {
//     e.preventDefault();
//     let imgUrl = "";
//     if (file) imgUrl = await upload();

//     mutation.mutate({ EmployeeID: currentUser.ID, Text: desc, Photos: imgUrl });
//     setDesc("");
//     setFile(null);
//   };

//   return (
//     <div className="share">
//       <div className="shareWrapper">
//         <div className="shareTop">
//           <div className="shareTop">
//             <img
//               src={"/upload/" + currentUser.Photo}
//               alt=""
//               className="shareProfileImg"
//             />
//             <input
//               type="text"
//               className="shareInput"
//               placeholder={"New POST... "}
//               onChange={(e) => setDesc(e.target.value)}
//               value={desc}
//               style={{ marginTop: "10px" }}
//             />
//           </div>
//           <div className="right">
//             {file && (
//               <img
//                 className="file"
//                 alt=""
//                 src={URL.createObjectURL(file)}
//               />
//             )}
//           </div>
//         </div>
//         <hr className="shareHr" />
//         <div className="shareBottom">
//           <div className="shareOptions">
//             <input
//               type="file"
//               id="file"
//               style={{ display: "none" }}
//               onChange={(e) => setFile(e.target.files[0])}
//             />
//             <label htmlFor="file">
//               <div className="shareOption">
//                 <PermMedia htmlColor="tomato" className="shareIcon" />
//                 <span>Add Image</span>
//               </div>
//             </label>
//             {/* <div className="shareOption">
//               <Room htmlColor="green" className="shareIcon" />
//               <span>Add Place</span>
//             </div>
//             <div className="shareOption">
//               <EmojiEmotions
//                 htmlColor="goldenrod"
//                 className="shareIcon"/>
//               <span>Tag Friends</span>
//             </div> */}
//           </div>
//           <div className="right">
//             <button className="shareButton" onClick={handleClick}>Share</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Share;



