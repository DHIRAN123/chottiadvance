// File: pages/login.js

import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import './login.css';

export default function LoginPage() {
  const [loginType, setLoginType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [orderId, setOrderId] = useState('');
  const [mobileFromApi, setMobileFromApi] = useState('');
  const [loading, setLoading] = useState(false);

  const [nbfcForm, setNbfcForm] = useState({
    fullName: '', email: '', designation: '', companyName: '', cin: '',
    panNumber: '', gstin: '', rbiReg: '', address: '', officialEmail: '',
    accountNumber: '', ifsc: '', bankName: '', mobileNumber: ''
  });

  const router = useRouter();

  const handleLoginClick = (type) => {
    setLoginType(type);
    setOtpSent(type !== 'NBFC'); // OTP skipped for NBFC
    setOtpVerified(type !== 'NBFC'); // OTP verification skipped for NBFC
    setPhoneNumber('');
    setOtp('');
    setNbfcForm({
      fullName: '', email: '', designation: '', companyName: '', cin: '',
      panNumber: '', gstin: '', rbiReg: '', address: '', officialEmail: '',
      accountNumber: '', ifsc: '', bankName: '', mobileNumber: ''
    });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!loginType || !phoneNumber) return alert('Select login type and enter phone number');
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8082/sendOtp?mobileNumber=${phoneNumber}&loginType=${loginType}`);
      const data = await res.json();
      if (res.ok) {
        setMobileFromApi(data.mobileNumber || phoneNumber);
        setOrderId(data.orderId);
        setOtpSent(true);
        alert('OTP Sent');
      } else alert(data.message);
    } catch (err) {
      console.error(err);
      alert('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8082/verifyOtp?mobileNumber=${mobileFromApi}&otp=${otp}`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.statusCode === 200) {
        alert('OTP verified');
        setOtpVerified(true);
      } else alert(data.message);
    } catch (err) {
      console.error(err);
      alert('Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleNbfcFinalSubmit = async (e) => {
    e.preventDefault();
    for (const key in nbfcForm) {
      if (!nbfcForm[key]) {
        alert(`Please fill out ${key}`);
        return;
      }
    }
    try {
      setLoading(true);

      const loginRes = await fetch('http://localhost:8080/api/nbfc-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: nbfcForm.fullName,
          mobileNumber: nbfcForm.mobileNumber,
          email: nbfcForm.email,
          designation: nbfcForm.designation,
          otpVerified: true
        })
      });

      const loginData = await loginRes.json();
      const uuid = loginData.nbfcUuid;
      if (!uuid) return alert('Something went wrong. UUID not received.');

      const detailRes = await fetch('http://localhost:8080/api/nbfc-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nbfcUuid: uuid,
          companyName: nbfcForm.companyName,
          cin: nbfcForm.cin,
          panNumber: nbfcForm.panNumber,
          gstin: nbfcForm.gstin,
          rbiRegistrationNumber: nbfcForm.rbiReg,
          registeredAddress: nbfcForm.address,
          officialEmail: nbfcForm.officialEmail
        })
      });

      const bankRes = await fetch('http://localhost:8080/api/bank-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nbfcUuid: uuid,
          accountNumber: nbfcForm.accountNumber,
          ifscCode: nbfcForm.ifsc,
          bankName: nbfcForm.bankName,
          isVerified: false
        })
      });

      if (detailRes.ok && bankRes.ok) {
        router.push(`/dashboard?uuid=${uuid}`);
      } else {
        alert('Error submitting NBFC details');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    setNbfcForm({ ...nbfcForm, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Head><title>Login</title></Head>
      <div className="box">
        <span className="borderLine"></span>
        <form onSubmit={
          loginType === 'NBFC'
            ? handleNbfcFinalSubmit
            : (otpSent ? handleVerifyOtp : handleSendOtp)
        }>
          <h2>Login</h2>
          <div className="button-group">
            <button type="button" onClick={() => handleLoginClick('NBFC')}>Login as NBFC</button>
            <button type="button" onClick={() => handleLoginClick('Vendor/Corporate')}>Login as Vendor/Corporate</button>
          </div>

          {loginType && loginType !== 'NBFC' && (
            <>
              <div className="inputBox">
                <input
                  type="text"
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
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    disabled={otpVerified}
                  />
                  <span>OTP</span>
                </div>
              )}
            </>
          )}

          {loginType === 'NBFC' && (
            <div className="nbfcForm">
              <input name="fullName" onChange={handleInput} placeholder="Full Name" required />
              <input name="mobileNumber" onChange={handleInput} placeholder="Mobile Number" required />
              <input name="email" onChange={handleInput} placeholder="Email" required />
              <input name="designation" onChange={handleInput} placeholder="Designation" required />
              <input name="companyName" onChange={handleInput} placeholder="Company Name" required />
              <input name="cin" onChange={handleInput} placeholder="CIN" required />
              <input name="panNumber" onChange={handleInput} placeholder="PAN Number" required />
              <input name="gstin" onChange={handleInput} placeholder="GSTIN" required />
              <input name="rbiReg" onChange={handleInput} placeholder="RBI Reg No" required />
              <input name="address" onChange={handleInput} placeholder="Registered Address" required />
              <input name="officialEmail" onChange={handleInput} placeholder="Official Email" required />
              <input name="accountNumber" onChange={handleInput} placeholder="Bank Account" required />
              <input name="ifsc" onChange={handleInput} placeholder="IFSC Code" required />
              <input name="bankName" onChange={handleInput} placeholder="Bank Name" required />
            </div>
          )}

          <input
            type="submit"
            disabled={loading}
            value={
              loading ? 'Submitting...' : (
                loginType === 'NBFC'
                  ? 'Submit NBFC Details'
                  : (!otpSent ? 'Send OTP' : (otpVerified ? 'Continue' : 'Verify OTP'))
              )
            }
          />
        </form>
      </div>
    </>
  );
}
