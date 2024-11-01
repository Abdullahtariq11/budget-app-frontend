import React, { useContext, useEffect, useState } from 'react';
import "./UserSetting.css";
import { AuthContext } from '../../context/AuthContext';
import { editUser, UserDetailInfo } from '../../Service/DataService';

function UserSetting() {
    const { token } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phoneNumber: ""
    });
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const loadUserData = async () => {
            const userInfo = await UserDetailInfo(token);
            setUserData(userInfo);
        };
        loadUserData();
    }, [token]);

    



    const handleEditToggle = () => {
        setIsEdit((prev) => !prev);
        if(isEdit)
        {
            editUser(userData,token);
            alert("Success");
        }

    };

    const handleEditChange = (field, value) => {
        setUserData((prev) => ({
          ...prev,
          [field]: value, 
        }));
      };

    return (
        <div className='UserSetting-Container'>
            <h1>Account Settings</h1>
            <form className="user-form">
                <div className="form-group">
                    <label>Email</label>
                    <input onChange={(e)=>handleEditChange("email",e.target.value)} required disabled={!isEdit} value={userData.email || ""} type="email" placeholder='Email' />
                </div>
                <div className="form-group">
                    <label>First Name</label>
                    <input onChange={(e)=>handleEditChange("firstName",e.target.value)} required disabled={!isEdit} value={userData.firstName || ""} type="text" placeholder='First Name' />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input onChange={(e)=>handleEditChange("lastName",e.target.value)} required disabled={!isEdit} value={userData.lastName || ""} type="text" placeholder='Last Name' />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input onChange={(e)=>handleEditChange("phoneNumber",e.target.value)} required disabled={!isEdit} value={userData.phoneNumber || ""} type="tel" placeholder='Phone Number' />
                </div>
                <button type="button" onClick={handleEditToggle} className="userSetting-edit-button">
                    {isEdit ? "Save Changes" : "Edit"}
                </button>
            </form>
        </div>
    );
}

export default UserSetting;