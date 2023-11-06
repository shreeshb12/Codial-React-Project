import { createContext } from "react";
import { useProviderPost } from "../hooks";

const initialState={
    posts:[],
    loading:true,
    updatePosts:()=>{},
    updateComments:()=>{}
}

export const PostContext=createContext(initialState);

export const PostProvider=({children})=>{
    const posts=useProviderPost();

    return <PostContext.Provider value={posts}>{children}</PostContext.Provider>
}