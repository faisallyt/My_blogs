import { useEffect, useState } from "react"
import { useLocation,useNavigate} from "react-router-dom";
import { AppContext } from "../context/AppContext";
import BlogDetails from "../components/BlogDetails";
import Header from "../components/Header";
import { useContext } from "react";


const BlogPage = () => {
    const newBaseUrl="https://codehelp-apis.vercel.app/api/"
    const [blog,setBlog]=useState(null);
    const [relatedBlogs,setRelatedBlogs]=useState([]);
    const location =useLocation();
    const navigation= useNavigate();
    const {setLoading,loading}=useContext(AppContext);
    const blogId=location.pathname.split("/").at(-1);

    async function fetchRelatedBlogs(){
        setLoading(true);
        let url=`${newBaseUrl}get-blog?blogId=${blogId}`;

        try{
            const res=await fetch(url);
            const data=await res.json();
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);
        }
        catch(error){
            console.log("Error Aa gya")
            setBlog(null);
            setRelatedBlogs([]);
        }
        setLoading(false);
    }

    useEffect(()=>{
        if(blogId){
            fetchRelatedBlogs();
        }
    },[location.pathname])

  return (
    <div>
       <Header></Header>
       <div className="mt-16">
           <button onClick={()=>navigation(-1)} >
             Back
           </button>
       </div>
       {
        loading ? 
        ( <div>
            <p>Loading</p>
        </div>):
        blog ?
        (<div>
            <BlogDetails post={blog}/>
            <h2>Related Blogs</h2>
            {
                relatedBlogs.map((post)=>(
                    <div key={post.id}>
                        <BlogDetails post={post}/>
                    </div>
                ))
            }
        </div>):
        (
            <div>
                No Blogs Found
            </div>
        )


       }
    </div>
  )
}

export default BlogPage