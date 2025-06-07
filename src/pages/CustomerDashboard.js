import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
export default function CustomerDashboard() {
  const [buyer, setBuyer] = useState('');
  const [uuid, setUuid] = useState('');
  const [copyOfAgreement, setCopyOfAgreement] = useState(null);
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [loanId, setLoanId] = useState('');
  const [waitMessage, setWaitMessage] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isTimerYellow, setIsTimerYellow] = useState(false);

  const router = useRouter();

  // Retrieve UUID from query string
  useEffect(() => {
    const { uuid } = router.query;
    if (uuid) {
      setUuid(uuid);
    }
  }, [router.query]);

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (timeLeft > 0 && showThankYouMessage) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, showThankYouMessage]);

  const handleBuyerChange = (e) => {
    setBuyer(e.target.value);
  };

  const generateLoanIdFromUuid = (uuid) => {
    const firstFourChars = uuid.substring(0, 4);
    const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return firstFourChars + randomPart;
  };

  const handleFileUpload = async () => {
    if (!uuid || !copyOfAgreement || !purchaseOrder) {
      alert('Please select buyer and upload both files.');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('uuid', uuid);
      formData.append('copyOfAgreement', copyOfAgreement);
      formData.append('purchaseOrder', purchaseOrder);

      const response = await fetch('http://localhost:8082/upload/agreementAndPurchaseOrder', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        const newLoanId = generateLoanIdFromUuid(uuid);
        setLoanId(newLoanId);
        setWaitMessage(true);
        setShowThankYouMessage(true); // Show the thank you message
      } else {
        alert(result.error || 'File upload failed.');
      }
    } catch (error) {
      alert('An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  // Format time to MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.header}>
        <div style={styles.logoContainer}>
          {/* <Image src="/path-to-logo.png" alt="Company Logo" style={styles.logo} /> */}
          <Image src="/path-to-logo.png" alt="Logo" width={100} height={40} />
        </div>
        <div style={styles.profileContainer}>
          <Image src="/path-to-profile-icon.png" alt="Profile" style={styles.profileIcon} />
        </div>
      </div>

      <div style={styles.formContainer}>
        <div style={styles.field}>
          <label htmlFor="buyer">Buyer</label>
          <select
            id="buyer"
            value={buyer}
            onChange={handleBuyerChange}
            style={styles.inputField}
          >
            <option value="">Select Buyer</option>
            <option value="buyer1">Buyer 1</option>
            <option value="buyer2">Buyer 2</option>
          </select>
        </div>

        <div style={styles.fileUploadSection}>
          <h3>Upload Documents</h3>
          <input
            type="file"
            onChange={(e) => setCopyOfAgreement(e.target.files[0])}
            style={styles.fileInput}
          />
          <input
            type="file"
            onChange={(e) => setPurchaseOrder(e.target.files[0])}
            style={styles.fileInput}
          />
          <button
            style={isUploading ? { ...styles.uploadButton, ...styles.uploadButtonDisabled } : styles.uploadButton}
            onClick={handleFileUpload}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>

        {waitMessage && (
          <div style={styles.waitMessage}>
            <p>Please wait while we process your files...</p>
          </div>
        )}

        {showThankYouMessage && (
          <div style={styles.thankYouMessage}>
            <p>
              Thank you! Your loan application will be parsed to the respective NBFCs. Kindly hold on; your loan will be sanctioned within 30 minutes.
              <br />
              Thank you for your patience!
            </p>
            <p style={{ color: isTimerYellow ? 'yellow' : 'black' }}>
              Time remaining for loan sanction: {formatTime(timeLeft)}
            </p>
          </div>
        )}

        {loanId && (
          <div style={styles.loanId}>
            <h3>Loan ID: {loanId}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  dashboardContainer: {
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(135deg, #f1f1f1 0%, #e0e0e0 100%)',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    margin: '40px auto',
    backgroundColor: '#ffffff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    color: '#333',
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    height: '50px', // Adjust based on your logo size
    width: 'auto',
  },
  profileContainer: {
    flex: 1,
    textAlign: 'center',
  },
  profileIcon: {
    height: '40px', // Adjust based on your profile icon size
    width: 'auto',
    borderRadius: '50%',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  inputField: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    transition: '0.3s ease-in-out',
  },
  fileUploadSection: {
    backgroundColor: '#f8f9fc',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  },
  fileInput: {
    display: 'block',
    margin: '15px 0',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ddd',
  },
  uploadButton: {
    padding: '14px 25px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '18px',
    width: '100%',
    transition: '0.3s ease-in-out',
  },
  uploadButtonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  waitMessage: {
    marginTop: '20px',
    padding: '18px',
    backgroundColor: '#fff4e5',
    borderLeft: '4px solid #f39c12',
    fontSize: '16px',
    color: '#f39c12',
    fontWeight: 'bold',
  },
  thankYouMessage: {
    marginTop: '20px',
    padding: '18px',
    backgroundColor: '#e9f7ef',
    borderLeft: '4px solid #28a745',
    fontSize: '16px',
    color: '#28a745',
    fontWeight: 'bold',
  },
  loanId: {
    marginTop: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#007BFF',
  },
};
