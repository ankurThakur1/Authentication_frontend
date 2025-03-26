import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { redirect, useNavigate } from 'react-router-dom';
import style from "./ui/profile.module.css";

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
      window.location.reload()
    }

    const newDate = new Date(userData?.createdAt);

    useEffect(() => {
      fetchUserDetails();
    }, []);

  return (
    <div className={style.container}>
      <h1 className={style.msg}>Welcome <span className={style.name}>{userData?.username}</span></h1>
      <div className={style.row}>
        <p>Name: <span className={style.name}>{userData?.username}</span></p>
        <p>Email: <span className={style.email}>{userData?.email}</span></p>
        <p className={style.date}>Created At: <span className={style.date}>{`${newDate.getDate()}-${newDate.toLocaleString("en-US", {month: "short"})}-${newDate.getFullYear()}`}</span></p>
        <button className={style.btn} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Profile;