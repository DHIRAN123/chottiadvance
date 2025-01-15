import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function KycPage() {
  const [kycData, setKycData] = useState({
    turnover: '',
    fullName: '',
    email: '',
    panCardNumber: '',
  });
  const [uuid, setUuid] = useState('');
  const router = useRouter();

  useEffect(() => {
    const { uuid } = router.query;
    if (uuid) {
      console.log('UUID from router:', uuid); // Debugging statement to check UUID
      setUuid(uuid);
    }
  }, [router.query]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    console.log(`Input changed: ${id} = ${value}`); // Debugging input change
    setKycData({ ...kycData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!kycData.turnover || !kycData.fullName || !kycData.email || !kycData.panCardNumber) {
      alert('Please complete all fields.');
      return;
    }

    console.log('Submitting KYC data:', { uuid, ...kycData });

    try {
      const response = await fetch(
        `http://localhost:8082/saveUserDetails?uuid=${uuid}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...kycData, uuid }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('KYC submission successful:', data);
        alert('KYC details submitted successfully!');

        router.push(`/business-verification?uuid=${uuid}`);
      } else {
        console.error('KYC submission failed:', response);
        alert('Failed to submit KYC details. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting KYC:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Head>
        <title>Complete Your KYC</title>
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Poppins", sans-serif;
          }

          body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #23252a;
          }

          .box {
            position: relative;
            width: 380px;
            height: 450px;
            background: #1c1c1c;
            border-radius: 8px;
            overflow: hidden;
            padding: 10px;
          }

          .box::before,
          .box::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 380px;
            height: 420px;
            background: linear-gradient(
              0deg,
              transparent,
              transparent,
              #45f3ff,
              #45f3ff,
              #45f3ff
            );
            z-index: 1;
            transform-origin: bottom right;
            animation: animate 6s linear infinite;
          }

          .box::after {
            animation-delay: -3s;
          }

          @keyframes animate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .box form {
            position: absolute;
            inset: 4px;
            background: #222;
            padding: 50px 40px;
            border-radius: 8px;
            z-index: 2;
            display: flex;
            flex-direction: column;
          }

          .box form h2 {
            color: #fff;
            font-weight: 500;
            text-align: center;
            letter-spacing: 0.1em;
          }

          .inputBox {
            position: relative;
            width: 300px;
            margin-top: 35px;
          }

          .inputBox input {
            width: 100%;
            padding: 20px 10px 10px;
            background: transparent;
            outline: none;
            border: none;
            color: #fff;
            font-size: 1em;
            letter-spacing: 0.05em;
            transition: 0.5s;
          }

          .inputBox span {
            position: absolute;
            left: 0;
            padding: 20px 0px 10px;
            color: #8f8f8f;
            font-size: 1em;
            transition: 0.5s;
          }

          .inputBox input:focus ~ span,
          .inputBox input:valid ~ span {
            color: #fff;
            font-size: 0.75em;
            transform: translateY(-34px);
          }

          #submit {
            border: none;
            outline: none;
            padding: 9px 25px;
            cursor: pointer;
            font-size: 0.9em;
            border-radius: 4px;
            font-weight: 600;
            width: 100px;
            color: white;
            background-color: #45f3ff;
            margin-top: 20px;
            align-self: center;
          }

          .poweredBy {
            position: fixed;
            bottom: 10px;
            right: 10px;
            color: #45f3ff;
            font-size: 0.85em;
            font-family: "Poppins", sans-serif;
            background-color: #1c1c1c;
            padding: 5px 10px;
            border-radius: 5px;
            box-shadow: 0 0 5px rgba(69, 243, 255, 0.5);
          }

          .poweredBy p {
            margin: 0;
          }
          `}
        </style>
      </Head>
      <div className="box">
        <form onSubmit={handleSubmit}>
          <h2>Complete Your KYC</h2>
          <div className="inputBox">
            <input
              type="text"
              id="turnover"
              value={kycData.turnover}
              onChange={handleInputChange}
              required
            />
            <span>Turnover</span>
          </div>
          <div className="inputBox">
            <input
              type="text"
              id="fullName"
              value={kycData.fullName}
              onChange={handleInputChange}
              required
            />
            <span>Full Name</span>
          </div>
          <div className="inputBox">
            <input
              type="email"
              id="email"
              value={kycData.email}
              onChange={handleInputChange}
              required
            />
            <span>Email</span>
          </div>
          <div className="inputBox">
            <input
              type="text"
              id="panCardNumber"
              value={kycData.panCardNumber}
              onChange={handleInputChange}
              required
            />
            <span>PAN Card Number</span>
          </div>
          <button id="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="poweredBy">
        <p>Powered by Vinnifinni</p>
      </div>
    </>
  );
}
