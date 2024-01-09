import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName,setUserName]=useState('')
  const[password,setPassword]=useState('')
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const loginResponse = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: userName,
          password: password,
          // expiresInMins: 60, // optional
        }),
      });
  
      if (!loginResponse.ok) {
       alert('Invalid username or password');
        return;
      }
  
      const loginData = await loginResponse.json();
      const authToken = loginData.token;
  
  
      const userResponse = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
  
      if (userResponse.ok) {
        const userData = await userResponse.json();
        navigate('/home');
      } else {
        console.error('Failed to fetch current user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className=" h-[80vh] flex items-center justify-center ">
          <div className="border border-solid border-black flex flex-col justify-center items-center gap-4 p-4 rounded-md">
            <div className="flex gap-4 ">
              <div>Username:</div>
              <div className="border border-solid border-black">
                <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
              </div>
            </div>
            <div className="flex gap-4">
              <div>Password:</div>
              <div className="border border-solid border-black">
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </div>
            </div>
            <button className="border border-solid border-black w-full rounded-md" type="submit">Login</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
