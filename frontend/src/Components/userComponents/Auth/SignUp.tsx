import Logo from '../../../assets/img/BizBuddy-logos_black.png'
import { useState } from 'react'
import '../../../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { userSignup } from '../../../Api/userApi'
import Meter from './Meter'
import { useDispatch } from 'react-redux'
import { updateFormData } from '../../../Redux/user/dataSlice'

interface FormData {
    username: string
    email: string
    phone: string
    password: string,
    ReenterPassword: string
}

function check(password: string): string {
    if (password.length < 4 || !password.trim()) {
        return 'weak';
    }

    const digitCount = (password.match(/\d/g) || []).length; // Count the number of digits

    if (digitCount >= 3 && /[!@#$%^&*()_+{}\]:;<>,.?~\\-]/.test(password)) {
        return 'strong';
    }

    return 'medium';
}


export default function SignUp() {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        phone: '',
        password: '',
        ReenterPassword: ''
    });
    const [passwordError, setPasswordError] = useState<string | null>("");
    const [strength, setStrength] = useState<string>("");
    const [showPasswordMeter, setPasswordMeter] = useState<boolean>(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStrength(check(formData.password))
        const newValue = name === 'phone' ? parseInt(value, 10) : value
        setFormData({
            ...formData,
            [name]: newValue,
        });

        if (name === 'password')
            setPasswordMeter(true)
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedUsername = formData.username.trim()
        const whiteSpace = /\s/.test(trimmedUsername)
        if (formData.password !== formData.ReenterPassword) {
            setPasswordError("password does not match")
        }
        else if (formData.phone.toString().length !== 10) {
            setPasswordError('number must be 10 digits')
        }
        else if (trimmedUsername === '') {
            setPasswordError("Username cannot be empty")
        }
        else if (whiteSpace) {
            setPasswordError('Username cannot contain spaces')
        }
        else {
            setPasswordError("")
            if (strength === 'weak') {
                setPasswordError('password is weak')
            } else {
                const { data } = await userSignup(formData)
                setPasswordError(data)
                if (data.message === 'sendOtp') {
                    dispatch(updateFormData(formData))
                    navigate(`/otpModal/${formData.phone}`)
                }
            }
        }
    };

    return (
        <div className='flex flex-col justify-center gap-9 sm:gap-44 items-center mt-10 sm:mt-0 sm:min-h-screen sm:flex-row'>
            
            <div className='hidden lg:block '>
                <div>
                    <img src={Logo} alt="banner image" style={{ width: '32rem' }} />
                </div>
            </div>
            <div className='sm:hidden'>
                <h3 className='text-center'>
                    welcome to <br />
                    <span className='font-bold text-4xl text-blue-600'>BizzBuddy</span>
                </h3>
            </div>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className='border sm:border-2 border-blue-200 rounded-md shadow-lg'>
                    <div className='p-5'>
                        <div>
                            <h1 className='text-4xl font-bold text-center text-blue-600 mb-8 hidden sm:block'>
                                Signup
                            </h1>
                        </div>
                        <div className='mt-5'>
                            <form onSubmit={handleSubmit} className="">
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        pattern='^[a-zA-Z0-9_-]{3,16}$'
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-80 sm:w-80 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                        placeholder='Username'
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        id="Email"
                                        name="email"
                                        value={formData.email}
                                        pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-80 sm:w-80 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                        placeholder='Email Address'
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="number"
                                        id="Phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-80 sm:w-80 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                        placeholder='phone number'
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border border-gray-400 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                        placeholder='Password'
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="password"
                                        id="ReenterPassword"
                                        name="ReenterPassword"
                                        value={formData.ReenterPassword}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border border-gray-400 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                        placeholder='Re-enter Password'
                                        required
                                    />
                                </div>
                                <p className='text-center mt-4 mb-4 text-red-500'>{passwordError ? passwordError : "\u00a0"}</p>
                                {showPasswordMeter && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Meter strength={strength} />
                                    </motion.div>
                                )}
                                <div className='flex justify-center mt-4'>
                                    <button
                                        type="submit"
                                        className="px-10 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className='text-center mt-4'>
                            <h4 className='text-sm text-gray-600'>
                                Already have an Account ? <Link to={'/'}><span className='text-blue-600 cursor-pointer hover:underline'>Log in</span></Link>
                            </h4>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
