import './user.css';
import OTPInput from 'react-otp-input';
import { useState } from 'react';

export default function OtpModal() {
    const [otp, setOtp] = useState<string>('');
    const [remainingTime ,setRemainingTime] = useState<number>(600)
    const [isTimerActive , setTimerActive] = useState<boolean>(false)

    const handleChange = (otp: string) => {
        setOtp(otp);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="border-0 shadow-none sm:border-2 sm:shadow-lg bg-white rounded-lg p-5 w-96" style={{width: '26rem'}}>
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
                        inputStyle="border border-gray-300 rounded text-4xl text-gray-500 text-center m-4 focus:outline-none"
                    />
                </div>
                <div className='flex justify-between py-3'>
                    <h6 className='text-gray-500 text-sm'>Remaining time <span className='text-blue-500'>10:10</span></h6>
                    <h6 className='text-gray-500 text-sm'>Didn't get the code? <span className='text-blue-500 cursor-pointer'>Resend</span></h6>
                </div>
                <div className='flex flex-col gap-3'>
                    <button className='flex-1 py-2 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800'>Verify</button>
                    <button className='flex-1 py-2 border border-blue-600 font-semibold rounded-full text-blue-600 hover:bg-slate-100'>Cancel</button>
                </div>
            </div>
        </div>
    );
}
