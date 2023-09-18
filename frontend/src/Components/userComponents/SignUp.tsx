import Logo from '../../assets/img/BizBuddy-logos_black.png'
import { useState } from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { userSignup } from '../../Api/userApi'

interface FormData {
    username: string
    email: string
    password: string,
    ReenterPassword: string
}

export default function SignUp() {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        ReenterPassword: ''
    });
    // const [passwordError, setPasswordError] = useState<boolean | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {data} = await userSignup(formData)
        console.log(data);
        
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
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-80 sm:w-80 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                        placeholder='Email Address'
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
                                <p className='text-center mt-4'>&nbsp;</p>
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
