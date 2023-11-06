import {createContext} from 'react';
import { useProviderAuth } from '../hooks';
const initialState={
    user:null,
    login:()=>{},
    signup:()=>{},
    logout:()=>{},
    loading:true,
    friends:[],
    posts:[],
    editProfile:()=>{},
    updateUserFriends:()=>{},
    updatePosts:()=>{}
}

export const AuthContext=createContext(initialState);

export const AuthProvider=({children}) =>{
    const auth= useProviderAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}