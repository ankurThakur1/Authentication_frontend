import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import style from "./ui/register.module.css";
import { Eye, EyeOff } from "lucide-react"

const Login = () => {
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: ""
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    console.log(formData);
    const handleFormData = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }

    const handleLoginSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        const result = await response.json();
        // console.log(result);
        if(result.success){
          localStorage.setItem("token", result.accessToken);
          navigate("/profile");
          setLoading(false);
          setFormData({
            username: "",
            email: "",
            password: ""
          });
          toast.success(result.message);
        }
        else{
          toast.error(result.message);
          setLoading(()=> {
            return false;
          });
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        // setLoading(false);
        setLoading(()=> {
          return false;
        });
      }
    }

    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    }

  return (
    <div className={style.container}>
      <div className={style.left_col}>
        <div className={style.signup_svg}>
          <img src="/login.png" alt="login-svg" />
        </div>
      </div>
      <div className={style.register}>
        <form onSubmit={handleLoginSubmit} className={style.form}>
          <div className={style.top}>
            <h2 className={style.heading}>Login</h2>
          </div>
          <div className={style.form_group}>
            <label className={style.label} htmlFor="email">Email</label>
            <input className={style.input} type="email" placeholder="Email" name="email" id="email" value={formData.email} onChange={handleFormData} />
          </div>
          <div className={style.form_group}>
            <label className={style.label} htmlFor="password">Password</label>
            <input className={style.input} type={showPassword ? "text" : "password"} placeholder="password" name="password" id="password" value={formData.password} onChange={handleFormData} />
            {
              showPassword ? (
                <span className={style.show} onClick={handleShowPassword}><Eye width={20} height={20} color="rgb(194, 194, 194)" /></span>
              ) : (
                <span className={style.show} onClick={handleShowPassword}><EyeOff width={20} height={20} color="rgb(194, 194, 194)" /></span>
              )
            }
          </div>
          <button type="submit" disabled={loading} className={style.btn}>{loading ? "Signing in..." : "Login"}</button>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </form>
      </div>
    </div>
  )
}


export default Login;