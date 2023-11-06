import {useEffect} from "react";
import styles from '../styles/home.module.css';
import { FriendsList, Loader,CreatePost,Post } from '../components';
import PropTypes from 'prop-types';
//import { toast } from "react-toastify";
import { usePosts} from "../hooks";
const Home = () => {
  const useposts=usePosts();
  const posts=useposts.posts;
    useEffect(()=>{

    },[])
  if(useposts.loading)
  {
    return(<Loader/>)
  }
  console.log(posts);
  return (
    <div className={styles.home}>
    <div className={styles.postsList}>
    <CreatePost/>
    {posts.map(post=>(
        <Post post={post} key={post._id}/>
     ))}
    </div>
    <FriendsList/>
    </div>
  );
};
export default Home;
Home.propType={
    posts:PropTypes.array
}
