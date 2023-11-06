import styles from '../styles/home.module.css'
const Comment=(props)=>{
    let {comment}=props;
    return(
            <div className={styles.postCommentsItem} key={comment._id}>
              <div className={styles.postCommentHeader} key={comment._id}>
                <span className={styles.postCommentAuthor}>{comment.user.name}</span>
                <span className={styles.postCommentTime}>a minute ago</span>
                <span className={styles.postCommentLikes}>{comment.likes.length}</span>
              </div>

              <div className={styles.postCommentContent}>{comment.content}</div>
            </div>
    )
}

export default Comment;