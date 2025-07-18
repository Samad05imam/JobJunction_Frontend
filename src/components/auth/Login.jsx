import React, { useEffect, useState } from 'react'
import axios from "axios";
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector(store => store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [])

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>
          <div className='mb-3'>
            <Label className='mb-2'>Email</Label>
            <Input
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              type='email'
              placeholder="eg; abc@gmail.com"
            />
          </div>
          <div className='mb-3'>
            <Label className='mb-2'>Password</Label>
            <Input
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              type='password'
              placeholder="eg; abc@123ABC"
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  value="student"
                  type="radio"
                  name='role'
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className='cursor-pointer'
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  value="recruiter"
                  type="radio"
                  name='role'
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className='cursor-pointer'
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {
            loading ? <Button className='w-full bg-blue-950 text-white my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>
              :
              <Button type="submit" className='w-full bg-blue-950 text-white my-4'>Login</Button>
          }

          <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link> </span>
        </form>
      </div >
    </div >
  )
}

export default Login