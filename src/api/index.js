import {API_URLS} from "../utils";
import { getFormBody } from "../utils";
const customFetch = async(url,{body, ...customConfig}) =>{
    const token=localStorage.getItem('LOCALSTORAGE_TOKEN_KEY');
    const headers={
        "content-type":"application/x-www-form-urlencoded"
    }

    if(token){
        headers.Authorization=`Bearer ${token}`
    }
    const config={
        ...customConfig,
        headers:{
            ...headers,
            ...customConfig.headers
        }

    }
    
    // console.log(config);
    if(body){
        config.body=getFormBody(body);
    }
    
    try{
        const resp=await fetch(url,config);
        const data=await resp.json();

        if(data.success)
        {
            return {
                data:data.data,
                success:true
            }
        }
        throw new Error(data.message);
    }
    catch(error){
        return{
            message:error.message,
            success:false
        }
    }
}

export const getPosts = (pages=1,limit=10)=>{
    return customFetch(API_URLS.posts(pages,limit),{
        method:'GET',
    });

}

export const login=(email,password)=>{
    return customFetch(API_URLS.login(),{
        method:'POST',
        body:{email,password}
    })
}

export const signup=(name,email,password,confirm_password)=>{
    return customFetch(API_URLS.signup(),{
        method:'POST',
        body:{
            name,email,password,confirm_password
        }
    })
}

export const editUser=(id,name,password,confirm_password)=>{
    return customFetch(API_URLS.editUser(),{
        method:'POST',
        body:{
            id,name,password,confirm_password
        }
    })
}

export const userInfo=(id)=>{
    return customFetch(API_URLS.userInfo(id),{
        method:'GET',
    })
}

export const fetch_user_friends=()=>{
    return customFetch(API_URLS.friends(),{
        method:'GET'
    });
}

export const addFriend=(id)=>{
    return customFetch(API_URLS.createFriendship(id),{
        method:'POST'
    })
}

export const removeFriend=(id)=>{
    return customFetch(API_URLS.removeFriend(id),{
        method:'POST'
    })
}

export const addPost=(content)=>{
    console.log(content);
    return customFetch(API_URLS.createPost(),{
        method:'POST',body:{
            content
        }
    })
}

export const addComment=(post_id,content)=>{
    return customFetch(API_URLS.comment(),{
        method:'POST',
        body:{
            post_id,
            content
        }
    })
}