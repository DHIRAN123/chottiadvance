import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import './login.css';

export default function LoginPage() {
  const [loginType, setLoginType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [orderId, setOrderId] = useState('');
  const [mobileFromApi, setMobileFromApi] = useState('');
  const router = useRouter();

  // Handle login type selection
  const handleLoginClick = (type) => {
    setLoginType(type);
    setOtpSent(false);
  };

  // Send OTP function
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!loginType) {
      alert('Please select a login type.');
      return;
    }
    if (!phoneNumber) {
      alert('Please enter your phone number.');
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8082/sendOtp?mobileNumber=${encodeURIComponent(phoneNumber)}&loginType=${encodeURIComponent(loginType)}`,
        { method: 'GET' }
      );
      console.log("Sending OTP with loginType:", loginType);
      if (response.ok) {
        const data = await response.json();
        setMobileFromApi(data.mobileNumber || phoneNumber);
        setOrderId(data.orderId);
        setOtpSent(true);
        alert(data.message || 'OTP sent successfully. Please check your phone.');
      } else {
        alert('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  // Verify OTP function
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      alert('Please enter the OTP.');
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8082/verifyOtp?mobileNumber=${encodeURIComponent(mobileFromApi)}&otp=${encodeURIComponent(otp)}`,
        { method: 'POST' }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.statusCode === 200) {
          alert('OTP verified successfully!');
          router.push(`/kyc?uuid=${data.uuid}`);
        } else {
          alert(data.message || 'Failed to verify OTP. Please try again.');
        }
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <div className="box">
        <span className="borderLine"></span>
        <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
          <h2>Login</h2>
          <div className="button-group">
            <button
              type="button"
              className={loginType === 'NBFC' ? 'selectedButton' : ''}
              onClick={() => handleLoginClick('NBFC')}
            >
              Login as NBFC
            </button>
            <button
              type="button"
              className={loginType === 'Vendor/Corporate' ? 'selectedButton' : ''}
              onClick={() => handleLoginClick('Vendor/Corporate')}
            >
              Login as Vendor/Corporate
            </button>
          </div>
          {loginType && (
            <>
              <div className="inputBox">
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  disabled={otpSent}
                />
                <span>Phone Number</span>
              </div>
              {otpSent && (
                <div className="inputBox">
                  <input
                    type="text"
                    id="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                  <span>OTP</span>
                </div>
              )}
              <input type="submit" id="submit" value={otpSent ? 'Verify OTP' : 'Send OTP'} />
            </>
          )}
        </form>
      </div>
    </>
  );
}
