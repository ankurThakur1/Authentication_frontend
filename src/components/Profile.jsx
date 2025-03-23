import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { redirect, useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/profile", {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log(data);
        if(data.success){
          setUserData(data.userData);
        }
      } catch (error) {
        console.log(error);
      }
    }

    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    }

    useEffect(() => {
      fetchUserDetails();
    }, []);

  return (
    <div>
      Profile{userData?.username}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile;