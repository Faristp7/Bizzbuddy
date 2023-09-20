/* eslint-disable @typescript-eslint/no-explicit-any */
import './user.css';
import OTPInput from 'react-otp-input';
import { useState, useEffect } from 'react';
import { auth } from '../../fireBase/FireBaseConfig'
import { RecaptchaVerifier, signInWithPhoneNumber } from '@firebase/auth';
import { useParams } from 'react-router-dom';

export default function OtpModal() {
    const [otp, setOtp] = useState<string>('');
    const [countdown, setCountdown] = useState<number>(30)
    const [resend, setResend] = useState<boolean>(true)
    const [triggerOtp, setTriggerOtp] = useState<boolean>(false)

    const { phone } = useParams()

    const handleChange = (otp: string) => {
        setOtp(otp);
    };

    useEffect(() => {
        onSignup()
        console.log('working');

    }, [triggerOtp])

    useEffect(() => {
        let intervalId: any

        if (countdown > 0 && resend) {
            intervalId = setInterval(() => {
                setCountdown((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            clearInterval(intervalId);
            setResend(false)
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [countdown, resend]);


    function resetUP() {
        setCountdown(30)
        setResend(true)
        setTriggerOtp(true)
    }

    function onCaptchVerify(): void {
        if (!(window as any).recaptchaVerifier) {
            (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response: any) => {
                    console.log(response);
                    onSignup()
                },
                'expired-callback': () => {

                }
            });
        }
    }

    function onSignup() {
        onCaptchVerify()
        const appVerifier = (window as any).recaptchaVerifier
        const phoneNumber = `+91${phone}`
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                (window as any).confirmationResult = confirmationResult;
                console.log("otp sended");

            }).catch((error) => {
                console.log(error);
            });
    }

    function verifyOtp() {
        (window as any ).confirmationResult.confirm(otp).then(async(res:any) => {
            console.log(res);
        }).className((err : any)=>{
            console.log(err);
            
        })
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div id='recaptcha-container'></div>
            <div className=" border-0 shadow-none sm:border-2 sm:shadow-lg bg-white rounded-lg p-5 w-96" style={{ width: '26rem' }}>
                <div className="">
                    <h1 className="font-bold text-3xl ">OTP verification</h1>
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
                <div className='flex flex-col sm:flex-row justify-between py-3'>
                    <h6 className='text-gray-500 text-sm'>Remaining time <span className='text-blue-500'>00 : {countdown}</span></h6>
                    <h6 className='text-gray-500 text-sm'>
                        {!resend ? (
                            <button
                                className='text-blue-500'
                                onClick={resetUP}
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
                    <button className='flex-1 py-2 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800' onClick={verifyOtp}>Verify</button>
                    <button className='flex-1 py-2 border border-blue-600 font-semibold rounded-full text-blue-600 hover:bg-slate-100'>Cancel</button>
                </div>
            </div>
        </div>
    );
}
