import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { redirect, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addFriend, removeFriend, userInfo } from '../api';
import { Loader } from '../components';
import { toast } from 'react-toastify';
export const UserInfo=()=>{
    const [userinfo,setUserInfo]=useState();
    const [requestInProcess,setRequestInProcess]=useState(false);
    const [loading,setLoading]=useState(true);
    const auth=useAuth();
    const userid=useParams().userid;
    console.log(auth.friends);
    useEffect(()=>{
        const fetchUser=(async()=>{
            const resp=await userInfo(userid);
            if(!resp.success)
            {
                redirect('/');
            }
            setUserInfo(resp.data.user);
            setLoading(false);
        })
        fetchUser();
    },[userid]);
    const isFriend=(()=>{
        const frnds=auth.friends;
        const friendIds=frnds.map(friend=>friend.to_user._id);
        const index=friendIds.indexOf(userid);
        if(index!==-1)
        {
            return true;
        }

        return false;
    })();
    const handleAddFriend=async()=>{
        setRequestInProcess(true);
        console.log(userid);
        const resp=await addFriend(userid);
        if(resp.success)
        {
            console.log(resp);
            toast.success('User Added Successfuly!!');
            auth.updateUserFriends(true,resp.data.friendship);
        }
        else{
            toast.error(resp.message);
        }
        setRequestInProcess(false);
    }

    const handleRemoveFriend=async()=>{
        setRequestInProcess(true);
        console.log(userid);
        const resp=await removeFriend(userid);
        if(resp.success)
        {
            console.log(resp);
            toast.success('User Removed Successfully!!');
            auth.updateUserFriends(false,userid);
        }
        else{
            toast.error(resp.message);
        }
        setRequestInProcess(false);
    }
    if(loading)
    {
        return(<Loader/>)
    }
    return(
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://img.icons8.com/3d-fluency/94/change-user-male.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{userinfo?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{userinfo?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {!isFriend?<button className={`button ${styles.saveBtn}`} onClick={handleAddFriend}>{requestInProcess?'Adding Friend...':'Add Friend'}</button>
        :<button className={`button ${styles.saveBtn}`} onClick={handleRemoveFriend}>{requestInProcess?'Removing Friend...':'Remove Friend'}</button>}
      </div>
    </div>
    )
}