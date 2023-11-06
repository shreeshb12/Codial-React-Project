import styles from '../styles/settings.module.css';
import { useAuth,useFormInput } from '../hooks';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Settings = () => {
  const auth = useAuth();
  const [editMode,setEditMode]=useState(false);
  const name=useFormInput(auth.user?.name);
  const password=useFormInput('');
  const confirmPassword=useFormInput('');
  const [isSaving,setIsSaving]=useState(false);
  const updateUser=async()=>{
    setIsSaving(true);
    console.log(auth.user._id);
    const resp= await auth.editProfile(auth.user._id,name.value,password.value,confirmPassword.value)

    if(resp.success)
    {
      toast.success(resp.message);
    }
    else
    {
      toast.success(resp.message);
    }
    name.reset(auth.user.name);
    password.reset('');
    confirmPassword.reset('');
    setIsSaving(false);
    setEditMode(false);
  }
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://img.icons8.com/3d-fluency/94/change-user-male.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode?<input type="text" {...name} />:<div className={styles.fieldValue}>{auth.user?.name}</div>}
      </div>

      {editMode && 
    <>
    <div className={styles.field}>
      <div className={styles.fieldLabel}>Password</div>
      <input type="password" {...password}/>
    </div>

    <div className={styles.field}>
      <div className={styles.fieldLabel}>Confirm Password</div>
      <input type="password" {...confirmPassword}/>
    </div>
    </>
    }

      <div className={styles.btnGrp}>
        {editMode?<><button className={`button ${styles.saveBtn}`} onClick={updateUser}>{isSaving?'Saving...':'Save'}</button>
        <button className={`button ${styles.goBack}`} onClick={()=>{setEditMode(false)}}>Back</button>
        </>:<button className={`button ${styles.editBtn}`} onClick={()=>{setEditMode(true)}}>Edit Profile</button>}
      </div>
    </div>
  );
};

export default Settings;
