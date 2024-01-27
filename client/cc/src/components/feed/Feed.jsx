import "./feed.css"
import Share from "../share/Share"
import Post from "../post/Post"
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from  "../../axios.js";

// export default function Feed({userId}){
//     const { isLoading, error, data } = useQuery(['posts'], () =>
//         makeRequest.get("/posts?userId="+userId).then((res) => res.data)
//     );
    
//     return(
//         <div className="feed">
//             <div className="feedWrapper">
//                 <Share />
//                 {error
//                     ? "Something went wrong!"
//                     : isLoading 
//                     ? "Loading..."
//                     : data && data.map((post) => (
                        
//                         <Post post={post} key={post.id} />
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }


export default function Feed({ userId }) {
    const { isLoading, error, data } = useQuery(["posts", userId], () =>
      makeRequest.get(`/posts?userId=${userId}`).then((res) => res.data)
    );
  
    
    return (
      <div className="feed">
        <div className="feedWrapper">
          <Share />
          {error ? (
            <p>Something went wrong!</p>
          ) : isLoading ? (
            <p>Loading...</p>
          ) : (
            data &&
            data.map((post) => <Post post={{ ...post, userId }} key={post.id} />)
          )}
        </div>
      </div>
    );
  }
  
  
  
  
  
  
  