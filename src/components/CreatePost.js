import { useState } from 'react';
import { useFormInput, usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import { addPost } from '../api';
import { toast } from 'react-toastify';
const CreatePost=()=>{
    const usePost=usePosts();
    const post=useFormInput('');
    const [isAdding,setIsAdding]=useState(false);
    const handleAddPost=async()=>{
        setIsAdding(true);
        if(post.value==='')
        {
            setIsAdding(false);
            return toast.error('Cannot create an empty post!')
        }
        const resp=await addPost(post.value);
        if(resp.success)
        {
            toast.success(resp.message);
            usePost.updatePosts(resp.data.post)
        }
        post.reset('');
        setIsAdding(false);
    }
    return(
        <div className={styles.createPost}>
                <textarea className='styles.addPost' {...post} placeholder='Add Post ...'>
                </textarea>
                <div>
                    <button className='styles.addPostBtn' onClick={handleAddPost} disabled={isAdding}>
                     {isAdding?'Adding...':'Add Post'}
                    </button>
                </div>
        </div>
    )
}

export default CreatePost