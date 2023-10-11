import Logo from '../../../assets/img/BizBuddy-logos_black.png'
import { FormEvent, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import '../../../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import jwtDecode from 'jwt-decode'
import { adminLogin, googleSignin } from '../../../Api/userApi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, userLoggedIn } from '../../../Redux/user/authSlice'
import { Wobble } from "@uiball/loaders"
import { adminLoggedIn, rootState } from '../../../Redux/admin/adminAuth'
import { loginFormData, googleData } from '../../../interface/interface'
import { getUserInfo } from '../../../Redux/user/userInfo'

export default function Login() {
    const [formData, setFormData] = useState<loginFormData>({
        email: '',
        password: '',
    });

    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const adminIsLoggedin = useSelector((state: rootState) => state.admin.isAdminLoggedIn)
    const [error, setError] = useState<string>('')
    const [showError, setShowError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (showError) {
            const timeout = setTimeout(() => {
                setShowError(false);
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [showError]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        const { data } = await adminLogin(formData)
        dispatch(getUserInfo(data.userId))
        setError(data.message)
        setLoading(false)
        setShowError(true)
        if (data.token) {
            if (data.role === 'user') {
                localStorage.setItem('JwtToken', data.token)
                dispatch(userLoggedIn(true))
                navigate('/userHomePage')
            } else {
                localStorage.setItem('JwtToken', data.token)
                dispatch(adminLoggedIn(true))
                navigate('/admin/UserMangment')
            }
        }
    };

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
            const { email, given_name, picture } = credentialResponseDecoded as googleData
            const { data } = await googleSignin({ email, given_name, picture })
            console.log(data);

            if (data.err) {
                setError(data.message)
                setShowError(true)
            } else {
                localStorage.setItem('JwtToken', data.token)
                dispatch(userLoggedIn(true))
                navigate('/userHomePage')
            }
        }
        else {
            console.log("credinitial undefined");
        }
    };

    const handleError = () => {
        console.log('Login Failed');
    };

    useEffect(() => {
        const token = localStorage.getItem("JwtToken")
        if (token) {
            if (isLoggedIn) navigate('/userHomePage')
            if (adminIsLoggedin) navigate('/admin/UserMangment')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    <AnimatePresence>
                        {showError && (
                            <motion.div
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -100 }}
                                className="fixed top-5 right-5 p-2 rounded-lg border-2 border-black text-red-700"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className='mt-5'>
                        <form onSubmit={handleSubmit} className="">
                            <div className="mb-4">
                                <input
                                    type="email"
                                    id="email"
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
                            <div className='flex justify-end mb-5'>
                                <h6 className='text-blue-400 cursor-pointer hover:underline'>
                                    Forgot Password ?
                                </h6>
                            </div>
                            <div className='flex justify-center'>
                                {loading ? <Wobble size={45} speed={0.9} color="black" /> :
                                    <button
                                        type="submit"
                                        className="px-10 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500"
                                    >
                                        Login
                                    </button>
                                }
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
