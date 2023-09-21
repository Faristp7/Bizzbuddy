/* eslint-disable @typescript-eslint/no-explicit-any */
import '../user.css';
import OTPInput from 'react-otp-input';
import { useState, useEffect } from 'react';
import { auth } from '../../../fireBase/FireBaseConfig'
import { RecaptchaVerifier, signInWithPhoneNumber } from '@firebase/auth';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/user/dataSlice';
import { saveUser } from '../../../Api/userApi';
import { AnimatePresence, motion } from 'framer-motion';
import InfoIcon from '../../../assets/icon/icons8-info-30.png'

export default function OtpModal() {
    const [otp, setOtp] = useState('');
    const [countdown, setCountdown] = useState(30);
    const [resend, setResend] = useState(true);
    const [incorrectOtp, setIncorrectOtp] = useState(false);
    const [status, setStatus] = useState('Waiting for OTP');
    // const [showNotification, setShowNotification] = useState(false);
    const [showInfoPopup, setShowInfoPopup] = useState(false)

    const { phone } = useParams();
    const formData = useSelector((state: RootState) => state.signUpData);

    const handleChange = (otp: string) => {
        setOtp(otp);
    };

    const showInfo = () => {
        setShowInfoPopup(true);

        setTimeout(() => {
            setShowInfoPopup(false);
        }, 5000);
    };

    const showStatus = (message: any, duration = 5000) => {
        setStatus(message);
        // setShowNotification(true);

        setTimeout(() => {
            // setShowNotification(false);
        }, duration);
    };

    const resetOTP = () => {
        setCountdown(30);
        setResend(true);
        setIncorrectOtp(false);
        setOtp('');
        sendOTP();
    };

    const initializeRecaptchaVerifier = () => {
        if (!(window as any).recaptchaVerifier) {
            (window as any).recaptchaVerifier = new RecaptchaVerifier(
                auth,
                'recaptcha-container',
                {
                    size: 'invisible',
                    callback: (response: any) => {
                        console.log(typeof response);
                        console.log('reCAPTCHA verified');
                    },
                    'expired-callback': () => {
                        console.log('reCAPTCHA expired');
                    },
                }
            );
        }
    };

    const sendOTP = () => {
        initializeRecaptchaVerifier();
        const appVerifier = (window as any).recaptchaVerifier;
        const phoneNumber = `+91${phone}`;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                (window as any).confirmationResult = confirmationResult;
                showStatus('OTP sended')
            })
            .catch((error) => {
                console.error('Error sending OTP:', error);
                showStatus('Failed to Send OTP')
            });
    };

    const verifyOTP = async () => {
        try {
            const confirmationResult = (window as any).confirmationResult;
            const res = await confirmationResult.confirm(otp);
            if (res) {
                showStatus("Success")
                const { data } = await saveUser(formData);
                console.log('User saved:', data);
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setIncorrectOtp(true);
            showStatus("verification Failed")
        }
    };

    useEffect(() => {
        let intervalId: any

        if (countdown > 0 && resend) {
            intervalId = setInterval(() => {
                setCountdown((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            clearInterval(intervalId);
            setResend(false);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [countdown, resend]);

    useEffect(() => {
        sendOTP();
    }, []);

    return (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="flex justify-center items-center min-h-screen">
                <div id='recaptcha-container'></div>
                <div className=" border-0 shadow-none sm:border-2 sm:shadow-lg bg-white rounded-lg p-5 w-96" style={{ width: '26rem' }}>
                    <div className="">
                        <div className='flex justify-between'>
                            <h1 className="font-bold text-3xl ">OTP verification</h1>
                            <motion.img
                                className='w-6 h-6 mt-2 cursor-pointer'
                                src={InfoIcon}
                                alt="Info"
                                onClick={showInfo}
                                whileHover={{ scale: 1.1 }}
                            />
                            <AnimatePresence>
                                {showInfoPopup && (
                                    <motion.div
                                        className="bg-gray-100 border-1 border-black text-center p-2 rounded-md absolute top-4 left-5 right-10 sm:right-0"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        {status}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                        <p className='text-gray-500 mt-3'>Please enter the OTP (One-Time-Password) sent to  your registered phone number to complete  for verification</p>
                    </div>
                    <div className='flex justify-center mt-5'>
                        <OTPInput
                            value={otp}
                            onChange={handleChange}
                            numInputs={6}
                            renderSeparator={<span>&nbsp;</span>}
                            renderInput={(props) => <input {...props} />}
                            inputStyle="border border-gray-400 rounded text-4xl text-gray-500 text-center m-2 focus:outline-none"
                        />
                    </div>
                    <p className='text-center'>{incorrectOtp ? "Otp incorrect" : null}</p>
                    <div className='flex flex-col sm:flex-row justify-between py-3'>
                        <h6 className='text-gray-500 text-sm'>Remaining time <span className='text-blue-500'>00 : {countdown}</span></h6>
                        <h6 className='text-gray-500 text-sm'>
                            {!resend ? (
                                <button
                                    className='text-blue-500'
                                    onClick={resetOTP}
                                    disabled={countdown > 0}
                                >
                                    Resend Otp
                                </button>
                            ) : (
                                <span className='text-gray-400'>Resend Otp</span>
                            )}
                        </h6>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <motion.button
                            className="flex-1 py-2 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800"
                            whileHover={{ scale: 1.00 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={verifyOTP}
                        >
                            Verify
                        </motion.button>
                        <button className='flex-1 py-2 border border-blue-600 font-semibold rounded-full text-blue-600 hover:bg-slate-100'>Cancel</button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
