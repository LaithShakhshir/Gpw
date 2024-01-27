import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
// import Navbar from "../../components/navbar/Navbar";

import "./home.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home(){
    const queryClient = new QueryClient();

    return(
      <QueryClientProvider client={queryClient}>
       
            <Topbar/>
            <div className="homeContainer">
            <Sidebar />
            {/* <Navbar/> */}
            <Feed/>
            <Rightbar/>
            </div>

        </QueryClientProvider>
    )
}