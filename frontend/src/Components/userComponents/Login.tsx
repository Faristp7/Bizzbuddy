import Logo from '../../assets/img/BizBuddy-logos_black.png'
import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import jwtDecode from 'jwt-decode'
import { googleSignin } from '../../Api/userApi'

interface FormData {
    username: string,
    password: string
}

interface googleData {
    email : string
    given_name : string
    picture : string
}

export default function Login() {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const navigate = useNavigate()

    const handleSuccess = async(credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
            const {email , given_name ,picture} = credentialResponseDecoded as googleData
            const {data} = await googleSignin({email ,given_name ,picture})
            localStorage.setItem('JwtToken' , data.token)
            navigate('/userHomePage')
        }
        else {
            console.log("credinitial undefined");
        }
    };

    const handleError = () => {
        console.log('Login Failed');
    };
    return (
        <div className='flex flex-col justify-center gap-9 sm:gap-44 items-center mt-10 sm:mt-0 sm:min-h-screen sm:flex-row'>
            <div className='hidden lg:block '>
                <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 2, y: 0 }} transition={{ ease: 'easeOut', duration: 1 }}>
                    <div>
                        <img src={Logo} alt="banner image" style={{ width: '32rem' }} />
                    </div>
                </motion.div>
            </div>
            <div className='sm:hidden'>
                <h3 className='text-center'>
                    welcome to <br />
                    <span className='font-bold text-4xl text-blue-600'>BizzBuddy</span>
                </h3>
            </div>
            <div className='border sm:border-2 border-blue-200 rounded-md shadow-lg'>
                <div className='p-5'>
                    <div>
                        <h1 className='text-4xl font-bold text-center text-blue-600 mb-8 hidden sm:block'>
                            Login
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
                            <div className='flex justify-end mb-5'>
                                <h6 className='text-blue-400 cursor-pointer hover:underline'>
                                    Forgot Password ?
                                </h6>
                            </div>
                            <div className='flex justify-center'>
                                <button
                                    type="submit"
                                    className="px-10 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500"
                                >
                                    Login
                                </button>
                            </div>
                            <p className='text-center font-thin my-3'>
                                Or
                            </p>
                        </form>
                        <div className='flex justify-center'>
                            <div>
                                <GoogleLogin
                                    onSuccess={handleSuccess}
                                    onError={handleError}
                                    useOneTap={true}
                                    auto_select={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='text-center mt-4'>
                        <h4 className='text-sm text-gray-600'>
                            New to Bizzbuddy ? <Link to={'/signup'}><span className='text-blue-600 cursor-pointer hover:underline'>Join now</span></Link>
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
