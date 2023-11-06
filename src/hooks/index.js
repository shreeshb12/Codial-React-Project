import { useContext,useState,useEffect } from "react"
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import { AuthContext } from "../providers/AuthProvider"
import { login as userLogin,signup as register,editUser, fetch_user_friends,getPosts } from "../api";
import { setItemInLocalStorage, removeItemFromLocalStorage, getItemFromLocalStorage } from "../utils";
import { PostContext } from "../providers/PostProvider";
export const useAuth=()=>{
    return useContext(AuthContext);
}
export const useProviderAuth=()=>{
    const [user,setUser]=useState(null);
    const [friends,setFriends]=useState([]);
    const [loading,setLoading]=useState(true);
    const history=useNavigate();
    useEffect(()=>{
        (async()=>{const token=getItemFromLocalStorage('LOCALSTORAGE_TOKEN_KEY');
        if(token)
        {
           const user= jwtDecode(token);
           setUser(user);
            const resp= await fetch_user_friends()
            if(resp.success)
            {
                const friend=await resp.data.friends;
                setFriends(friend);
            }
            else
            {
                console.log(resp.message);
            }
        }
        setLoading(false);})();
    },[]);
    const login=async(email,password)=>{
        const resp= await userLogin(email,password);
        if(resp.success)
        {
            setUser(resp.data.user);
            setItemInLocalStorage('LOCALSTORAGE_TOKEN_KEY',resp.data.token?resp.data.token:null);
            return(
                {
                    success:true,
                    message:resp.message
                }
            )
        }
        else
        {
                return(
                    {
                        success:false,
                        message:resp.message
                    }
                )
        }
    }

    const signup=async(name,email,password,confirm_password)=>{
        const resp=await register(name,email,password,confirm_password);

        if(resp.success)
        {
            return{
                success:true,
                message:resp.message
            }
        }
        return{
            success:false,
            message:resp.message
        }
    }

    const logout=()=>{
        setUser(null);
        history('/Login');
        removeItemFromLocalStorage('LOCALSTORAGE_TOKEN_KEY');
    }

    const editProfile=async(userId,name,password,confirm_password)=>{
        const resp= await editUser(userId,name,password,confirm_password)
        setUser(resp.data.user);
        console.log(resp.data);
        setItemInLocalStorage('LOCALSTORAGE_TOKEN_KEY',resp.data.token?resp.data.token:null);
        if(resp.success)
        {

            return({
                success:true,
                message:resp.message
            })
        }
        else
        {
            return({
                success:false,
                message:resp.message
            })
        }
    }

    const updateUserFriends=(isAdd,data)=>{
        if(isAdd)
        {
            const updatedFriends=friends;
            updatedFriends.push(data)
            setFriends(updatedFriends);
        }
        else
        {
            console.log(data)
            const updatedFriends=friends.filter(friend=>friend.to_user._id !== data);
            setFriends(updatedFriends);
        }
    }

    return{
        user,
        login,
        signup,
        logout,
        loading,
        friends,
        editProfile,
        updateUserFriends,
    }
}

export const usePosts=()=>{
    return useContext(PostContext);
}
export const useProviderPost=()=>
{
    const [posts,setPosts]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        (async()=>{setLoading(true);
        const resp=await getPosts();
        if(resp.success)
        {
            setPosts(resp.data.posts);
        }
        else{
           toast.error(resp.message);
        }
        setLoading(false);})()
        },[]);
        const updatePosts=(data)=>{
            const updatePosts=[data,...posts]
            setPosts(updatePosts);
        }
        const updateComments=(postId,comment)=>{
            const newPosts=posts.map((Post)=>{
                if(Post._id===postId)
                {
                    return {...Post,comments:[...Post.comments,comment]}
                }
                return Post;
            })
            setPosts(newPosts);
        }
    return{
        posts,
        loading,
        updatePosts,
        updateComments
    }
}
export const useFormInput=(initialValue)=>{
    const [value,setValue]=useState(initialValue)

    const handleChange=(e)=>{
        setValue(e.target.value);
    }

    const reset=(val)=>{
        setValue(val);
    }

    return{
        value,
        onChange:handleChange,
        reset
    }
}