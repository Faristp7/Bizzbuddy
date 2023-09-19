/* eslint-disable @typescript-eslint/no-explicit-any */
import './user.css';
import OTPInput from 'react-otp-input';
import { useState, useEffect } from 'react';
import { auth } from '../../fireBase/FireBaseConfig'
import { RecaptchaVerifier ,signInWithPhoneNumber } from '@firebase/auth';

export default function OtpModal({phone} : {phone : any}) {
    console.log(phone);
    
    const [otp, setOtp] = useState<string>('');
    const [remainingTime, setRemainingTime] = useState<number>(60)
    const [isTimerActive, setTimerActive] = useState<boolean>(false)

    const handleChange = (otp: string) => {
        setOtp(otp);
    };

    const startTimer = () => {
        setTimerActive(true)
    }

    const resetTimer = () => {
        setTimerActive(false)
        setRemainingTime(60)
    }

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        if (isTimerActive && remainingTime > 0) {
            timer = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            resetTimer();
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isTimerActive, remainingTime]);

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
        const phoneNumber = "+919562146113"
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                (window as any).confirmationResult = confirmationResult;
                // ...
            }).catch((error) => {
               console.log(error);
            });
    }
    const handleSubmit = () => {
        onSignup()
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <button onClick={handleSubmit}>clcikme</button>
            <div id='recaptcha-container'></div>
            <div className="border-0 shadow-none sm:border-2 sm:shadow-lg bg-white rounded-lg p-5 w-96" style={{ width: '26rem' }}>
                <div className="">
                    <h1 className="font-bold text-3xl ">OTP verification</h1>
                    <p className='text-gray-500 mt-3'>Please enter the OTP (One-Time-Password) sent to  your registered phone number to complete  for verification</p>
                </div>
                <div className='flex justify-center'>
                    <OTPInput
                        value={otp}
                        onChange={handleChange}
                        numInputs={4}
                        renderSeparator={<span>&nbsp;</span>}
                        renderInput={(props) => <input {...props} />}
                        inputStyle="border border-gray-400 rounded text-4xl text-gray-500 text-center m-4 focus:outline-none"
                    />
                </div>
                <div className='flex flex-col sm:flex-row justify-between py-3'>
                    <h6 className='text-gray-500 text-sm'>Remaining time <span className='text-blue-500'>{Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '00')}</span></h6>
                    <h6 className='text-gray-500 text-sm'>
                        {!isTimerActive ? (
                            <button
                                className='text-blue-500'
                                onClick={startTimer}
                                disabled={remainingTime <= 0}
                            >
                                Resend
                            </button>
                        ) : (
                            <span className='text-gray-400'>Resend Otp</span>
                        )}
                    </h6>
                </div>
                <div className='flex flex-col gap-3'>
                    <button className='flex-1 py-2 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800'>Verify</button>
                    <button className='flex-1 py-2 border border-blue-600 font-semibold rounded-full text-blue-600 hover:bg-slate-100'>Cancel</button>
                </div>
            </div>
        </div>
    );
}
