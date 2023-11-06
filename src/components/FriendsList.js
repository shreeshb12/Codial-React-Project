import { Link } from 'react-router-dom';

import styles from '../styles/home.module.css';
import { useAuth } from '../hooks';

const FriendsList = () => {
  const auth = useAuth();
  const friends = auth.friends;

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}><img src='https://img.icons8.com/arcade/64/group.png' alt=''/><span className={styles.verticalAlignMiddle}>Friends</span></div>

      {friends && friends.length === 0 && (
        <div className={styles.noFriends}>NO friends found!</div>
      )}

      {friends &&
        friends.map((friend) => (
          <div key={`friend-${friend.to_user._id}`}>
            <Link className={styles.friendsItem} to={`/Userinfo/${friend.to_user._id}`}>
              <div className={styles.friendsImg}>
                <img
                  src="https://img.icons8.com/arcade/64/test-account.png"
                  alt=""
                />
              </div>
              <div className={styles.friendsName}>{friend.to_user.name}</div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default FriendsList;