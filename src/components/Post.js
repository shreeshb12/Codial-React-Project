import styles from '../styles/home.module.css';
import { Link } from "react-router-dom";
import {Comment} from './'
import { useEffect, useState } from 'react';
import { addComment, updateLike } from '../api';
import { usePosts,useAuth } from '../hooks';
import { toast } from 'react-toastify';
const Post=(props)=>{
    const useposts=usePosts();
    const auth=useAuth();
    const {post}=props
    const [comments,setComments]=useState('');
    console.log(post.likes.includes(auth.user._id));
    useEffect(()=>{
        
    },[])
    const handleAddComment=async()=>{
        const resp=await addComment(post._id,comments);

        if(resp.success)
        {
            console.log(resp);
            useposts.updateComments(post._id,resp.data.comment);
        }
        else
        {
            toast.error('can not add empty comment');
        }
        setComments('');
    }
    const handleLike=async(e)=>{
        const resp=await updateLike(post._id,'Post');
        if(resp.data.deleted)
        {
            toast.error('disliked!!')
            e.target.classList.remove('liked');
        }
        else{
            toast.success('liked!!')
            e.target.classList.add('liked');
        }
    }
    return(
        <div className={styles.postWrapper} key={post._id}>
            <div className={styles.postHeader}>
            <Link to={`/UserInfo/${post.user._id}`} state={{
                'user':post.user
            }} className={styles.postAvatar}>
                <img
                src={`${require('../images/profile.png')}`}
                alt="user-pic"
                />
                <div>
                <span className={styles.postAuthor}>{post.user.name}</span>
                <span className={styles.postTime}>a minute ago</span>
                </div>
            </Link>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
                <div className={styles.postLike} >
                <i className="fa-regular fa-heart" onClick={handleLike}></i>
                <span>{post.likes.length}</span>
                </div>

                <div className={styles.postCommentsIcon}>
                <img
                    src={`${require('../images/comment.png')}`}
                    alt="comments-icon"
                />
                <span>2</span>
                </div>
            </div>
            <div className={styles.postCommentBox}>
                <input type='text' value={comments} onChange={(e)=>{setComments(e.target.value)}} placeholder="Add your comment..." onKeyDown={(e)=>{
                    if(e.key==="Enter")
                    {
                        return handleAddComment();
                    }
                }}/>
            </div>

            <div className={styles.postCommentsList}>
                {post.comments.map(comment=>(
                <Comment comment={comment} key={comment._id}/>  ))}
            </div>
            </div>
         </div>
    )
}
export default Post