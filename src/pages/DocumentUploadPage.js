import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function DocumentUploadPage() {
  const [uuid, setUuid] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [files, setFiles] = useState({
    auditedFinancials: null,
    bankStatement: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [kycComplete, setKycComplete] = useState(false);
  const router = useRouter();

  // Parse UUID from query string
  useEffect(() => {
    const { uuid } = router.query;
    if (uuid) {
      setUuid(uuid);
    }
  }, [router.query]);

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [id]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('uuid', uuid);
    formData.append('auditedFinancials', files.auditedFinancials);
    formData.append('bankStatement', files.bankStatement);

    try {
      const response = await fetch('http://localhost:8082/upload/balanceSheetAndBankStatement', {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok) {
        setSuccess('Documents uploaded successfully!');
        setError('');
        setKycComplete(true);

        // Redirect to CustomerDashboard with UUID
        setTimeout(() => {
          router.push(`/CustomerDashboard?uuid=${uuid}`);
        }, 2000); // Optional delay for user feedback
      } else {
        setSuccess('');
        setError(responseData.error || 'Failed to upload documents.');
      }
    } catch (error) {
      setError('An error occurred while uploading the documents.');
      setSuccess('');
    }
  };

  return (
    <>
      <Head>
        <title>Document Upload</title>
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
            background: #1c1c1c;
            border-radius: 8px;
            overflow: hidden;
            padding: 20px;
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
          <h2>Upload KYC Documents</h2>

          <div className="inputBox">
            <input
              type="text"
              id="buyerName"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
            />
            <span>Buyer's Name</span>
          </div>

          <div className="inputBox">
            <input
              type="file"
              id="auditedFinancials"
              onChange={handleFileChange}
              accept="application/pdf"
            />
            <span>Audited Financials</span>
          </div>

          <div className="inputBox">
            <input
              type="file"
              id="bankStatement"
              onChange={handleFileChange}
              accept="application/pdf"
            />
            <span>Bank Statement</span>
          </div>

          <button id="submit" type="submit">
            Upload Documents
          </button>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}

          {kycComplete && (
            <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '8px', textAlign: 'center' }}>
              <p>Congratulations! Your KYC has been completed successfully.</p>
            </div>
          )}
        </form>
      </div>

      <div className="poweredBy">
        <p>Powered by Vinnifinni</p>
      </div>
    </>
  );
}
