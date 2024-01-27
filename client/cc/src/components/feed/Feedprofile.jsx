import "./feed.css"
import Share from "../share/Share"
import Postuser from "../post/Postuser"
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from  "../../axios.js";
export default function Feedprofile({ userId }) {
    const { isLoading, error, data } = useQuery(["posts", userId], () =>
      makeRequest.get(`/posts/${userId}`).then((res) => res.data)
    );
  
    
    return(
                <div className="feed">
                    <div className="feedWrapper">
                        <Share />
                        {error
                            ? "No Post yet!"
                            : isLoading 
                            ? "Loading..."
                            : data && data.map((post) => (
                                
                                <Postuser post={post} key={post.id} />
                            ))
                        }
                    </div>
                </div>
            )
  }
  