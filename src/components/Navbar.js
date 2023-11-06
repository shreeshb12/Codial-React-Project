import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { searchUsers } from '../api';
const Navbar = () => {
  const auth=useAuth();
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showResults,setShowResults] = useState(true);
  useEffect(()=>{
    const fetchUsers=async(searchText)=>{
      const resp=await searchUsers(searchText);
      setShowResults(true);
      if(resp.success)
      {
        setResults(resp.data.users);
      }
      else
      {
        console.log(resp.message);
      }
    }
    if(searchText.length>2)
    {
      fetchUsers(searchText)
    }
    
  },[searchText])
  const closeResults=()=>{
    setShowResults(false);
  }
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>
      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/external-search-logistic-delivery-kiranshastry-solid-kiranshastry.png"
          alt=""
        />

        <input
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} 
        />

        {results.length > 0 && showResults && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/Userinfo/${user._id}`} onClick={closeResults}>
                    <img
                      src="https://img.icons8.com/arcade/64/test-account.png"
                      alt=""
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

       <div className={styles.rightNav}>
       {auth.user &&<div className={styles.user}>
          <Link to="/Settings">
            <img
              src={`${require('../images/profile.png')}`}
              alt=""
              className={styles.userDp}
            />
          </Link>
          <span>{auth.user.name}</span>
        </div>}

        <div className={styles.navLinks}>
          <ul>
          {auth.user?
            <li onClick={auth.logout}>
               Log out
            </li>:
            <>
            <li>
            <Link to="/Login">Log in</Link>
            </li>
            <li>
                <Link to="/Register">Register</Link>
            </li>
            </>
          }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;