// // File: pages/login.js

// import { useState,useEffect } from 'react';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import './login.css';

// export default function LoginPage() {
//   const [loginType, setLoginType] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [orderId, setOrderId] = useState('');
//   const [mobileFromApi, setMobileFromApi] = useState('');
//   const [loading, setLoading] = useState(false);

//   const [nbfcForm, setNbfcForm] = useState({
//     fullName: '', email: '', designation: '', companyName: '', cin: '',
//     panNumber: '', gstin: '', rbiReg: '', address: '', officialEmail: '',
//     accountNumber: '', ifsc: '', bankName: '', mobileNumber: ''
//   });

//   const router = useRouter();

//   const handleLoginClick = (type) => {
//     setLoginType(type);
//     setOtpSent(false);       
//     setOtpVerified(false);   
//     setPhoneNumber('');
//     setOtp('');
//     setNbfcForm({
//       fullName: '', email: '', designation: '', companyName: '', cin: '',
//       panNumber: '', gstin: '', rbiReg: '', address: '', officialEmail: '',
//       accountNumber: '', ifsc: '', bankName: '', mobileNumber: ''
//     });
//   };
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const coords = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           };
//           console.log(" Location fetched:", coords);
//           setLocation(coords);
//           setLocationAccess(true);
//         },
//         (err) => {
//           if (err.code === err.PERMISSION_DENIED) {
//             console.error(" Location permission denied by user.");
//             setError("Please allow location access to continue.");
//             setLocationAccess(false);
//           } else {
//             console.error("Location error:", err.message);
//             setError(err.message);
//             setLocationAccess(false);
//           }
//         }
//       );
//     } else {
//       console.error("Geolocation not supported by this browser.");
//       setError("Geolocation not supported by this browser.");
//       setLocationAccess(false);
//     }
//   }, []);
  
  
  
//   const handleSaveLocation = async (uuid, loginData, location) => {
//     try {
//       const response = await fetch("http://localhost:8082/api/userlogin/saveLocation", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...loginData,
//           uuid,
//           latitude: location?.latitude || null,
//           longitude: location?.longitude || null,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Location submission successful:", data);
//         alert("Location details submitted successfully!");
//         router.push(`/business-verification?uuid=${uuid}`);
//       } else {
//         console.error("Location submission failed:", response);
//         alert("Location Failed to submit KYC details. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting KYC:", error);
//       alert("An error occurred. Please try again later.");
//     }
//   };

//   const payload = {
//     ...LoginPage,
//     latitude: location?.latitude || null,
//     longitude: location?.longitude || null,
//   };


//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     if (!loginType || !phoneNumber) return alert('Select login type and enter phone number');
//     try {
//       setLoading(true);
//       const res = await fetch(`http://localhost:8082/sendOtp?mobileNumber=${phoneNumber}&loginType=${loginType}`);
//       const data = await res.json();
//       if (res.ok) {
//         setMobileFromApi(data.mobileNumber || phoneNumber);
//         setOrderId(data.orderId);
//         setOtpSent(true);
//         alert('OTP Sent');
//       } else alert(data.message);
//     } catch (err) {
//       console.error(err);
//       alert('Error sending OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await fetch(`http://localhost:8082/verifyOtp?mobileNumber=${mobileFromApi}&otp=${otp}`, {
//         method: 'POST'
//       });
//       const data = await res.json();
//       if (data.statusCode === 200) {
//         alert('OTP verified');
//         setOtpVerified(true);
//       } else alert(data.message);
//     } catch (err) {
//       console.error(err);
//       alert('Error verifying OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNbfcFinalSubmit = async (e) => {
//   e.preventDefault();

//   // 1️⃣ Validate fields locally
//   const requiredFields = [
//     'fullName', 'mobileNumber', 'email', 'designation',
//     'companyName', 'cin', 'panNumber', 'gstin', 'rbiReg',
//     'address', 'officialEmail', 'accountNumber', 'ifsc', 'bankName'
//   ];

//   for (const key of requiredFields) {
//     if (!nbfcForm[key]) {
//       alert(`Please fill out ${key}`);
//       return;
//     }
//   }

//   try {
//     setLoading(true);

//     // 2️⃣ Create NBFC login entry
//     const loginRes = await fetch('http://localhost:8080/api/nbfc-login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         fullName: nbfcForm.fullName,
//         mobileNumber: nbfcForm.mobileNumber,
//         email: nbfcForm.email,
//         designation: nbfcForm.designation,
//         otpVerified: true
//       })
//     });

//     const loginData = await loginRes.json();
//     const uuid = loginData.nbfcUuid;
//     if (!uuid) {
//       alert('Something went wrong. UUID not received.');
//       return;
//     }

//     // 3️⃣ Save NBFC details
//     const detailRes = await fetch('http://localhost:8080/api/nbfc/details/save', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         nbfcUuid: uuid,
//         companyName: nbfcForm.companyName,
//         cin: nbfcForm.cin,
//         panNumber: nbfcForm.panNumber,
//         gstin: nbfcForm.gstin,
//         rbiRegistrationNumber: nbfcForm.rbiReg,
//         registeredAddress: nbfcForm.address,
//         officialEmail: nbfcForm.officialEmail
//       })
//     });

//     if (!detailRes.ok) throw new Error('Error saving NBFC details');

//     // 4️⃣ Save Bank Info
//     const bankRes = await fetch('http://localhost:8080/api/nbfc/bankInfo/save', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         nbfcUuid: uuid,
//         accountNumber: nbfcForm.accountNumber,
//         ifscCode: nbfcForm.ifsc,
//         bankName: nbfcForm.bankName,
//         isVerified: false
//       })
//     });

//     if (!bankRes.ok) throw new Error('Error saving bank info');

//     // 5️⃣ Redirect to dashboard
//     router.push(`/dashboard?uuid=${uuid}`);

//   } catch (err) {
//     console.error(err);
//     alert(err.message || 'Something went wrong');
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleInput = (e) => {
//     setNbfcForm({ ...nbfcForm, [e.target.name]: e.target.value });
//   };

//   return (
//     <>
//       <Head><title>Login</title></Head>
//       <div className="box">
//         <span className="borderLine"></span>
//         <form onSubmit={
//           loginType === 'NBFC'
//             ? handleNbfcFinalSubmit
//             : (otpSent ? handleVerifyOtp : handleSendOtp)
//         }>
//           <h2>Login</h2>
//           <div className="button-group">
//             <button type="button" onClick={() => handleLoginClick('NBFC')}>Login as NBFC</button>
//             <button type="button" onClick={() => handleLoginClick('Vendor/Corporate')}>Login as Vendor/Corporate</button>
//           </div>

//           {loginType === 'Vendor/Corporate' && (
//             <>
//               {!otpSent && (
//            <div className="inputBox">
//   <input
//     type="text"
//     placeholder="Enter your phone number"
//     value={phoneNumber}
//     onChange={(e) => setPhoneNumber(e.target.value)}
//     required
//     style={{ color: 'white' }}
//   />
// </div>

//               )}

//               {otpSent && (
//                 <div className="inputBox">
//                   <input
//                     type="text"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     required
//                     disabled={otpVerified}
//                   />
//                   <span>OTP</span>
//                 </div>
//               )}
//             </>
//           )}

//           {loginType === 'NBFC' && (
//             <div className="nbfcForm">
//               <input name="fullName" onChange={handleInput} placeholder="Full Name" required />
//               <input name="mobileNumber" onChange={handleInput} placeholder="Mobile Number" required />
//               <input name="email" onChange={handleInput} placeholder="Email" required />
//               <input name="designation" onChange={handleInput} placeholder="Designation" required />
//               <input name="companyName" onChange={handleInput} placeholder="Company Name" required />
//               <input name="cin" onChange={handleInput} placeholder="CIN" required />
//               <input name="panNumber" onChange={handleInput} placeholder="PAN Number" required />
//               <input name="gstin" onChange={handleInput} placeholder="GSTIN" required />
//               <input name="rbiReg" onChange={handleInput} placeholder="RBI Reg No" required />
//               <input name="address" onChange={handleInput} placeholder="Registered Address" required />
//               <input name="officialEmail" onChange={handleInput} placeholder="Official Email" required />
//               <input name="accountNumber" onChange={handleInput} placeholder="Bank Account" required />
//               <input name="ifsc" onChange={handleInput} placeholder="IFSC Code" required />
//               <input name="bankName" onChange={handleInput} placeholder="Bank Name" required />
//             </div>
//           )}

//           {/* Only show submit button after login type is selected */}
//           {loginType && (
//             <input
//               type="submit"
//               disabled={loading}
//               value={
//                 loading
//                   ? 'Submitting...'
//                   : (
//                       loginType === 'NBFC'
//                         ? 'Submit NBFC Details'
//                         : (!otpSent ? 'Send OTP' : (otpVerified ? 'Continue' : 'Verify OTP'))
//                     )
//               }
//             />
//           )}
//         </form>
//       </div>
//     </>
//   );
// }
// File: pages/login.js

import { useState, useEffect } from 'react';
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

  // 🆕 Location states
  const [userLocation, setUserLocation] = useState(null);
  const [locationAccess, setLocationAccess] = useState(false);
  const [error, setError] = useState(null);

  const [nbfcForm, setNbfcForm] = useState({
    fullName: '', email: '', designation: '', companyName: '', cin: '',
    panNumber: '', gstin: '', rbiReg: '', address: '', officialEmail: '',
    accountNumber: '', ifsc: '', bankName: '', mobileNumber: ''
  });

  const router = useRouter();

  const handleLoginClick = (type) => {
    setLoginType(type);
    setOtpSent(false);
    setOtpVerified(false);
    setPhoneNumber('');
    setOtp('');
    setNbfcForm({
      fullName: '', email: '', designation: '', companyName: '', cin: '',
      panNumber: '', gstin: '', rbiReg: '', address: '', officialEmail: '',
      accountNumber: '', ifsc: '', bankName: '', mobileNumber: ''
    });
  };

  // 📍 Fetch user location on page load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          console.log("📍 Location fetched:", coords);
          setUserLocation(coords);
          setLocationAccess(true);

          // Save immediately to backend (anonymous entry, can be linked later)
          try {
            const res = await fetch("http://localhost:8082/api/userlogin/saveLocation", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                latitude: coords.latitude,
                longitude: coords.longitude,
                timestamp: new Date().toISOString()
              }),
            });

            if (res.ok) {
              console.log("✅ Location saved successfully");
            } else {
              console.error("❌ Failed to save location", await res.text());
            }
          } catch (err) {
            console.error("⚠️ Error saving location", err);
          }
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            console.error("🚫 Location permission denied by user.");
            setError("Please allow location access to continue.");
            setLocationAccess(false);
          } else {
            console.error("⚠️ Location error:", err.message);
            setError(err.message);
            setLocationAccess(false);
          }
        }
      );
    } else {
      console.error("❌ Geolocation not supported by this browser.");
      setError("Geolocation not supported by this browser.");
      setLocationAccess(false);
    }
  }, []);

  // ✅ Example use: payload including location
  const payload = {
    ...LoginPage,
    latitude: userLocation?.latitude || null,
    longitude: userLocation?.longitude || null,
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

        // 🆕 After OTP verification, you can update location with user_id
        if (userLocation) {
          await fetch("http://localhost:8082/api/userlogin/updateUserLocation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mobileNumber: mobileFromApi,
              latitude: userLocation.latitude,
              longitude: userLocation.longitude
            }),
          });
        }
      } else alert(data.message);
    } catch (err) {
      console.error(err);
      alert('Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  // NBFC submit unchanged
  const handleNbfcFinalSubmit = async (e) => { /* ... same as your code ... */ };

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

          {loginType === 'Vendor/Corporate' && (
            <>
              {!otpSent && (
                <div className="inputBox">
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    style={{ color: 'white' }}
                  />
                </div>
              )}

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
              {/* NBFC fields same as before */}
            </div>
          )}

          {loginType && (
            <input
              type="submit"
              disabled={loading}
              value={
                loading
                  ? 'Submitting...'
                  : (
                      loginType === 'NBFC'
                        ? 'Submit NBFC Details'
                        : (!otpSent ? 'Send OTP' : (otpVerified ? 'Continue' : 'Verify OTP'))
                    )
              }
            />
          )}
        </form>
      </div>
    </>
  );
}
