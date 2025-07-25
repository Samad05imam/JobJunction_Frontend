import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import axios from 'axios'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading , user } = useSelector(store => store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("password", input.password)
        formData.append("role", input.role)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            dispatch(setLoading(true))
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
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
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='mb-3'>
                        <Label className='mb-2'>Full Name</Label>
                        <Input
                            type='text'
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="eg; John Doe"
                        />
                    </div>
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
                        <Label className='mb-2'>Phone Number</Label>
                        <Input
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            type='tel'
                            placeholder="eg; 12345 67890"
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
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept='image/*'
                                type="file"
                                className='cursor-pointer'
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className='w-full bg-blue-950 text-white my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>
                            :
                            <Button type="submit" className='w-full bg-blue-950 text-white my-4'>Signup</Button>
                    }
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link> </span>
                </form>
            </div >
        </div >
    )
}

export default Signup