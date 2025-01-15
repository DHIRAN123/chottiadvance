import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function BusinessVerificationPage() {
  const [businessData, setBusinessData] = useState({
    gstRegistered: false,
    yearlySales: '',
    businessAge: '',
    gstNumber: '',
    businessType: '',
    businessPincode: '',
  });
  const [uuid, setUuid] = useState('');
  const router = useRouter();

  // Capture the UUID from the query string
  useEffect(() => {
    const { uuid } = router.query;
    if (uuid) {
      setUuid(uuid);
    }
  }, [router.query]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBusinessData({ ...businessData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8082/createBusinessVerification?uuid=${uuid}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...businessData, uuid }),
        }
      );

      if (response.ok) {
        alert('Business verification details submitted successfully!');
        // Redirect to the document upload page after submission
        router.push(`/DocumentUploadPage?uuid=${uuid}`);
      } else {
        alert('Failed to submit business verification details.');
      }
    } catch (error) {
      console.error('Error submitting business verification details:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Head>
        <title>Business Verification</title>
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
            padding: 10px;
          }

          .box {
            position: relative;
            width: 380px;
            height: auto;
            background: #1c1c1c;
            border-radius: 8px;
            overflow: hidden;
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .box::before,
          .box::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 380px;
            height: 420px;
            background: linear-gradient(0deg, transparent, transparent, #45f3ff, #45f3ff, #45f3ff);
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
            position: relative;
            background: #222;
            padding: 40px 30px;
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
            width: 100%;
            margin-top: 20px;
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
          <h2>Business Verification</h2>

          <div className="inputBox">
            <input
              type="checkbox"
              id="gstRegistered"
              checked={businessData.gstRegistered}
              onChange={(e) =>
                setBusinessData({ ...businessData, gstRegistered: e.target.checked })
              }
            />
            <span>GST Registered</span>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="yearlySales"
              value={businessData.yearlySales}
              onChange={handleInputChange}
            />
            <span>Yearly Sales</span>
          </div>

          <div className="inputBox">
            <input
              type="number"
              id="businessAge"
              value={businessData.businessAge}
              onChange={handleInputChange}
            />
            <span>Business Age</span>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="gstNumber"
              value={businessData.gstNumber}
              onChange={handleInputChange}
            />
            <span>GST Number</span>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="businessType"
              value={businessData.businessType}
              onChange={handleInputChange}
            />
            <span>Business Type</span>
          </div>

          <div className="inputBox">
            <input
              type="text"
              id="businessPincode"
              value={businessData.businessPincode}
              onChange={handleInputChange}
            />
            <span>Business Pincode</span>
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
