import "./post.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { AuthContext } from "../../components/context/authContext";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import moment from "moment";

export default function Postuser({ post }) {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data = [] } = useQuery(
    ["likes", { postId: post.id }],
    () => makeRequest.get("/likes/" + post.id).then((res) => res.data)
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    () =>
      makeRequest.post("/likes", {
        employeeid: currentUser.ID,
        postid: post.id,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes", { postId: post.id }]);
      },
    }
  );

  const deleteMutation = useMutation(
    () => makeRequest.delete(`/likes/${currentUser.ID}/${post.id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes", { postId: post.id }]);
      },
    }
  );

  const deleteMutationpost = useMutation(
    () => makeRequest.delete(`/posts/${post.id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
  

  const handleDeletepost = () => {
    deleteMutationpost.mutate(post.id);
  };


  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = () => {
    if (currentUser && currentUser.ID && data) {
      if (data.includes(currentUser.ID)) {
        deleteMutation.mutate();
      } else {
        mutation.mutate();
      }
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <img src={"/upload/" + currentUser.Photo} alt="" className="postProfileImg" />
          <span className="postUsername">{currentUser.Name}</span>

            <span className="postDate">{moment(post.date).fromNow()}</span>
          </div>
          <div className="postTopRight">
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.officeID === currentUser.ID && (
            <button onClick={handleDeletepost}>delete</button>
          )}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.Text}</span>
          <img className="postImg" src={"/upload/" + post.Photos} alt="" />
        </div>
        <div className="postBottom">
        <div className="postBottomLeft">
        {isLoading ? (
          "loading"
        ) : data && data.includes(currentUser.ID) ? (
          <FavoriteOutlinedIcon
            style={{ color: "red" }}
            onClick={handleLike}
          />
        ) : (
          <FavoriteBorderOutlinedIcon onClick={handleLike} />
        )}
        {data && data.length} Likes
          </div>
        </div>
      </div>
    </div>
  );
}
