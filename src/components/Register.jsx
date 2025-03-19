import React, { useState } from 'react'
import style from "./ui/register.module.css";
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: ""
    });
    const [error, setError] = useState({
      username: "",
      email: "",
      password: ""
    });
  // https://app.svgator.com/assets/svgator.webapp/log-in-girl.svg
  
  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const validateFormData = () => {
    const validFormField = {};
    const isValid = false;

    if(formData.username.length === ""){
      validFormField.error = "Username field cannot be empty"
    }

  }
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }



  return (
    <div className={style.container}>
      <div className={style.left_col}>
        <div className={style.signup_svg}>
          <img src="/signup2.png" alt="signup-svg" />
        </div>
      </div>
      <div className={style.register}>
        <form onSubmit={handleFormSubmit} className={style.form}>
          <div className={style.top}>
            <h2 className={style.heading}>Register</h2>
          </div>
          <div className={style.form_group}>
            <label className={style.label} htmlFor="username">Username</label>
            <input className={style.input} type="text" placeholder="Enter username" name="username" id="username" value={formData.username} onChange={handleFormData} />
          </div>
          <div className={style.form_group}>
            <label className={style.label} htmlFor="email">Email</label>
            <input className={style.input} type="email" placeholder="Email" name="email" id="email" value={formData.email} onChange={handleFormData} />
          </div>
          <div className={style.form_group}>
            <label className={style.label} htmlFor="password">Password</label>
            <input className={style.input} type="password" placeholder="password" name="password" id="password" value={formData.password} onChange={handleFormData} />
          </div>
          <button type="submit" className={style.btn}>Register</button>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Register;