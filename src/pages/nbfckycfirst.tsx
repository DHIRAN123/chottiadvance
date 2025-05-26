import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import './login.css';

export default function LoginPage() {
  const [loginType, setLoginType] = useState<string>('');
  const [nbfcFullName, setNbfcFullName] = useState<string>('');
  const [nbfcPanNumber, setNbfcPanNumber] = useState<string>('');
  const [directorPanNumber, setDirectorPanNumber] = useState<string>('');
  const router = useRouter();

  const handleLoginClick = (type: string) => {
    setLoginType(type);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginType) {
      alert('Please select a login type.');
      return;
    }
    try {
      const response = await fetch('http://localhost:8082/submitDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nbfcFullName, nbfcPanNumber, directorPanNumber }),
      });
      if (response.ok) {
        const data = await response.json();
        alert('Details submitted successfully!');
        router.push(`/kyc?uuid=${data.uuid}`);
      } else {
        alert('Failed to submit details. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting details:', error);
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
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
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
                  id="nbfcFullName"
                  placeholder="Enter NBFC Full Name"
                  value={nbfcFullName}
                  onChange={(e) => setNbfcFullName(e.target.value)}
                  required
                />
                <span>NBFC Full Name</span>
                <i></i>
              </div>
              <div className="inputBox">
                <input
                  type="text"
                  id="nbfcPanNumber"
                  placeholder="Enter PAN Number of NBFC"
                  value={nbfcPanNumber}
                  onChange={(e) => setNbfcPanNumber(e.target.value)}
                  required
                />
                <span>PAN Number of NBFC</span>
                <i></i>
              </div>
              <div className="inputBox">
                <input
                  type="text"
                  id="directorPanNumber"
                  placeholder="Enter Director PAN Number"
                  value={directorPanNumber}
                  onChange={(e) => setDirectorPanNumber(e.target.value)}
                  required
                />
                <span>Director PAN Number</span>
                <i></i>
              </div>
              <input type="submit" id="submit" value="Submit" />
            </>
          )}
        </form>
      </div>
      <style jsx>{`
        /* Insert the CSS styles provided earlier here */
      `}</style>
    </>
  );
}
