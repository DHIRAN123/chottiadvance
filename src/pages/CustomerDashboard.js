
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import axios from "axios";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
// import logo from "@/assets/logosaas.png";

// export default function CustomerDashboard() {
  
//   const [buyer, setBuyer] = useState("");
//   const [uuid, setUuid] = useState("");
//   const [copyOfAgreement, setCopyOfAgreement] = useState(null);
//   const [purchaseOrder, setPurchaseOrder] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [loanId, setLoanId] = useState("");
//   const [linkedPOs, setLinkedPOs] = useState([]);
//   const [waitMessage, setWaitMessage] = useState(false);
//   const [showThankYouMessage, setShowThankYouMessage] = useState(false);
//   const [isSellerVerified, setIsSellerVerified] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
//   const [isTimerYellow, setIsTimerYellow] = useState(false);
//   const [notifications, setNotifications] = useState([]);

//   const router = useRouter();

//   // ---------------- WebSocket Setup ----------------
//   useEffect(() => {
//     if (!uuid) return;

//     const socket = new SockJS("http://localhost:8082/ws-notifications");
//     const stompClient = new Client({
//       webSocketFactory: () => socket,
//       reconnectDelay: 5000,
//     });

//     stompClient.onConnect = () => {
//       stompClient.subscribe(`/topic/notifications/${uuid}`, (message) => {
//         setNotifications((prev) => [...prev, message.body]);
//         if (message.body.includes("verified")) {
//           setIsSellerVerified(true);
//           setShowThankYouMessage(true);
//           setWaitMessage(false);
//           fetchLinkedPOs(uuid);
//         }
//       });
//     };

//     stompClient.activate();

//     return () => stompClient.deactivate();
//   }, [uuid]);

//   // ---------------- Timer ----------------
//   useEffect(() => {
//     let timer;
//     if (timeLeft > 0 && isSellerVerified) {
//       timer = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//         if (timeLeft < 60) setIsTimerYellow(true);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [timeLeft, isSellerVerified]);

//   // ---------------- Fetch Linked POs ----------------
//   useEffect(() => {
//     const { uuid } = router.query;
//     if (uuid) {
//       setUuid(uuid);
//       fetchLinkedPOs(uuid);
//     }
//   }, [router.query]);

//   const fetchLinkedPOs = async (sellerUuid) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8082/get-po?sellerUuid=${sellerUuid}`
//       );
//       setLinkedPOs(response.data);
//     } catch (error) {
//       console.error("Error fetching linked POs:", error);
//     }
//   };

//   // ---------------- File Upload ----------------
//   const generateLoanIdFromUuid = (uuid) => {
//     const firstFourChars = uuid.substring(0, 4);
//     const randomPart = Math.floor(Math.random() * 10000)
//       .toString()
//       .padStart(4, "0");
//     return firstFourChars + randomPart;
//   };

//   const handleFileUpload = async () => {
//     if (!uuid || !copyOfAgreement || !purchaseOrder) {
//       alert("Please select buyer and upload both files.");
//       return;
//     }
//     setIsUploading(true);
//     try {
//       const formData = new FormData();
//       formData.append("uuid", uuid);
//       formData.append("copyOfAgreement", copyOfAgreement);
//       formData.append("purchaseOrder", purchaseOrder);

//       const response = await fetch(
//         "http://localhost:8082/upload/agreementAndPurchaseOrder",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const result = await response.json();
//       if (response.ok) {
//         const newLoanId = generateLoanIdFromUuid(uuid);
//         setLoanId(newLoanId);
//         setWaitMessage(true);
//         setShowThankYouMessage(false);
//         fetchLinkedPOs(uuid);
//       } else {
//         alert(result.error || "File upload failed.");
//       }
//     } catch (error) {
//       alert("An error occurred during upload.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleBuyerChange = (e) => setBuyer(e.target.value);

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
//       2,
//       "0"
//     )}`;
//   };

//   // ---------------- Dummy Government & Unique Data ----------------
//   const governmentSchemes = [
   
//   ];

// // ---------------- Dummy Scores ----------------
// const supplierReliability = 82; // dummy score
// const trustIndex = 76; // new buyer-seller relationship score

//   const pendingInvoices = [
//     { invoiceId: "INV-001", amount: "₹1,25,000", due: "3 days" },
//     { invoiceId: "INV-002", amount: "₹75,000", due: "7 days" },
//   ];

//   const quickActions = [
//     "Apply for CGTMSE-backed Loan",
//     "Upload Invoice to TReDS",
//     "Check Tax Subsidy",
//     "Send Reminder to Buyer",
//   ];

//   // ---------------- JSX ----------------
//   return (
//     <div style={styles.layout}>
//       {/* ---------------- Sidebar ---------------- */}
//       <aside style={styles.sidebar}>
//         <div style={styles.logoWrapper}>
//           <Image src={logo} alt="Logo" width={100} height={100} />
//         </div>

//         {/* <div style={styles.section}>
//           <label htmlFor="buyer">Buyer</label>
//           <select
//             id="buyer"
//             value={buyer}
//             onChange={handleBuyerChange}
//             style={styles.inputField}
//           >
//             <option value="">Select Buyer</option>
//             <option value="buyer1">Buyer 1</option>
//             <option value="buyer2">Buyer 2</option>
//           </select>
//         </div> */}

//         <div style={styles.section}>
//           <h3>Upload Documents</h3>
//           <input
//             type="file"
//             onChange={(e) => setCopyOfAgreement(e.target.files[0])}
//             style={styles.fileInput}
//           />
//           <input
//             type="file"
//             onChange={(e) => setPurchaseOrder(e.target.files[0])}
//             style={styles.fileInput}
//           />
//           <button
//             style={
//               isUploading
//                 ? { ...styles.uploadButton, ...styles.uploadButtonDisabled }
//                 : styles.uploadButton
//             }
//             onClick={handleFileUpload}
//             disabled={isUploading}
//           >
//             {isUploading ? "Uploading..." : "Upload Files"}
//           </button>
//         </div>

//         {waitMessage && (
//           <div style={styles.alertWarning}>
//             Waiting for seller to accept your documents...
//           </div>
//         )}

//         {showThankYouMessage && (
//           <div style={styles.alertSuccess}>
//             <p>
//               Thank you! Your loan application is being processed by NBFCs. Loan
//               sanction within 30 minutes.
//             </p>
//             <p style={{ color: isTimerYellow ? "orange" : "black" }}>
//               Time remaining: {formatTime(timeLeft)}
//             </p>
//           </div>
//         )}

//         {loanId && (
//           <div style={styles.loanId}>
//             <h3>Loan ID: {loanId}</h3>
//           </div>
//         )}

//         {linkedPOs.length > 0 && (
//           <div style={styles.section}>
//             <h3>Linked Purchase Orders</h3>
//             <table style={styles.poTable}>
//               <thead>
//                 <tr>
//                   <th style={styles.poTableThTd}>Buyer UUID</th>
//                   <th style={styles.poTableThTd}>Verified</th>
//                   <th style={styles.poTableThTd}>View</th>
//                   <th style={styles.poTableThTd}>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {linkedPOs.map((po) => (
//                   <tr key={po.buyerUuid}>
//                     <td style={styles.poTableThTd}>{po.buyerUuid}</td>
//                     <td style={styles.poTableThTd}>
//                       {po.verifiedBySeller ? "Yes" : "No"}
//                     </td>
//                     <td style={styles.poTableThTd}>
//                       <a
//                         href={`data:application/pdf;base64,${po.purchaseOrderPdf}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         style={styles.viewButton}
//                       >
//                         View
//                       </a>
//                     </td>
//                     <td style={styles.poTableThTd}>
//                       <button
//                         onClick={async () => {
//                           try {
//                             await axios.post(
//                               "http://localhost:8082/verify-po",
//                               null,
//                               {
//                                 params: {
//                                   sellerUuid: uuid,
//                                   buyerUuid: po.buyerUuid,
//                                 },
//                               }
//                             );
//                             alert("PO Verified!");
//                             fetchLinkedPOs(uuid);
//                           } catch {
//                             alert("Failed to verify PO");
//                           }
//                         }}
//                         style={{
//                           ...styles.verifyButton,
//                           backgroundColor: po.verifiedBySeller
//                             ? "#28a745"
//                             : "#6366f1",
//                         }}
//                       >
//                         {po.verifiedBySeller ? "Verified" : "Verify"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {notifications.length > 0 && (
//           <div style={{ marginTop: "16px" }}>
//             <h4>Notifications</h4>
//             <ul>
//               {notifications.map((note, i) => (
//                 <li key={i} style={{ color: "#fff" }}>
//                   {note}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </aside>

//       {/* ---------------- Main Content ---------------- */}
//       <main style={styles.content}>
//         <h1>Customer Dashboard</h1>
//         <p>
//           Welcome! Use the left sidebar to manage your buyers, upload
//           agreements, and verify purchase orders.
//         </p>

//         {/* Loan & Cash Flow Cards */}
//         <div style={styles.cardsContainer}>
//           <div style={styles.card}>
//             <span>Total Loan Amount</span>
//             <span style={styles.cardValue}>₹45,00,000</span>
//           </div>
//           <div style={styles.card}>
//             <span>Supplier Reliability Score</span>
//             <span style={styles.cardValue}>{supplierReliability}%</span>
//           </div>
//           <div style={styles.card}>
//             <span>Pending Invoices</span>
//             <span style={styles.cardValue}>{pendingInvoices.length}</span>
//           </div>
//          <div style={styles.card}>
//     <span>Buyer-Seller Relationship Score</span>
//     <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//       <span style={styles.cardValue}>{trustIndex}/100</span>
//       <div
//         style={{
//           width: "100px",
//           height: "10px",
//           borderRadius: "5px",
//           background: "#e2e8f0",
//           overflow: "hidden",
//         }}
//       >
//         <div
//           style={{
//             width: `${trustIndex}%`,
//             height: "100%",
//             background:
//               trustIndex > 80
//                 ? "linear-gradient(90deg, #22c55e, #16a34a)" // green
//                 : trustIndex > 50
//                 ? "linear-gradient(90deg, #facc15, #eab308)" // yellow
//                 : "linear-gradient(90deg, #ef4444, #dc2626)", // red
//           }}
//         ></div>
//       </div>
//     </div>
//     <small style={{ color: "#64748b" }}>
//       {trustIndex > 80
//         ? "Excellent trust level"
//         : trustIndex > 50
//         ? "Moderate trust, improving"
//         : "Low trust, review needed"}
//     </small>
//   </div>
//         </div>

//         {/* Pending Invoices Table */}
//         <div style={{ marginTop: "24px" }}>
//           <h3>Pending Invoices</h3>
//           <table style={styles.transactionTable}>
//             <thead>
//               <tr>
//                 <th>Invoice ID</th>
//                 <th>Amount</th>
//                 <th>Due In</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pendingInvoices.map((inv) => (
//                 <tr key={inv.invoiceId}>
//                   <td>{inv.invoiceId}</td>
//                   <td>{inv.amount}</td>
//                   <td>{inv.due}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Cash Flow / Chart Placeholder */}
//         {/* <div style={{ marginTop: "24px" }}>
//           <h3>Cash Flow Forecast</h3>
//           <div style={styles.chartPlaceholder}>
//             [Interactive Chart Placeholder]
//           </div>
//         </div> */}

//         {/* Government Scheme Cards */}
//         <div style={{ marginTop: "24px" }}>

//           <div style={styles.cardsContainer}>
//             {governmentSchemes.map((scheme, idx) => (
//               <div style={styles.card} key={idx}>
//                 <span>{scheme.name}</span>
//                 <span style={styles.cardValue}>{scheme.amount}</span>
//                 <span>{scheme.benefit}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Quick Actions */}
        
        
//       </main>
//     </div>
//   );
// }

// const styles = {
//   layout: {
//     display: "flex",
//     minHeight: "100vh",
//     fontFamily: "Inter, Arial, sans-serif",
//     backgroundColor: "#f1f5f9",
//     color: "#1e293b",
//   },
//   sidebar: {
//     width: "300px",
//     background:
//       "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
//     color: "#fff",
//     padding: "28px 24px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "22px",
//     boxShadow: "6px 0px 20px rgba(0,0,0,0.25)",
//     borderTopRightRadius: "18px",
//     borderBottomRightRadius: "18px",
//   },
//   logoWrapper: {
//     marginBottom: "28px",
//     textAlign: "center",
//     fontSize: "22px",
//     fontWeight: "700",
//     letterSpacing: "1px",
//     color: "#f8fafc",
//   },
//   content: {
//     flex: 1,
//     padding: "40px",
//     background: "linear-gradient(180deg, #f9fafb 0%, #f1f5f9 100%)",
//   },
//   section: {
//     background: "rgba(255,255,255,0.8)",
//     backdropFilter: "blur(16px)",
//     padding: "20px",
//     borderRadius: "14px",
//     marginBottom: "18px",
//     boxShadow: "0px 6px 18px rgba(0,0,0,0.12)",
//   },
//   inputField: {
//     width: "100%",
//     padding: "14px",
//     borderRadius: "10px",
//     border: "1px solid #cbd5e1",
//     marginTop: "10px",
//     fontSize: "14px",
//     backgroundColor: "#1e293b",
//     color: "#f8fafc",
//     outline: "none",
//   },
//   fileInput: {
//     display: "block",
//     margin: "14px 0",
//     width: "100%",
//     color: "#e2e8f0",
//     fontSize: "14px",
//     cursor: "pointer",
//   },
//   uploadButton: {
//     padding: "12px 20px",
//     background: "linear-gradient(90deg, #3b82f6, #2563eb)",
//     color: "#fff",
//     border: "none",
//     borderRadius: "10px",
//     cursor: "pointer",
//     width: "100%",
//     marginTop: "12px",
//     fontWeight: "600",
//     fontSize: "15px",
//     boxShadow: "0px 4px 14px rgba(59,130,246,0.4)",
//   },
//   uploadButtonDisabled: {
//     background: "#94a3b8",
//     cursor: "not-allowed",
//     boxShadow: "none",
//   },
//   alertWarning: {
//     padding: "14px",
//     background: "linear-gradient(90deg, #fde047, #facc15)",
//     borderRadius: "10px",
//     color: "#1f2937",
//     fontWeight: "500",
//   },
//   alertSuccess: {
//     padding: "14px",
//     background: "linear-gradient(90deg, #22c55e, #16a34a)",
//     borderRadius: "10px",
//     color: "#fff",
//     fontWeight: "600",
//   },
//   loanId: {
//     background: "linear-gradient(90deg, #3b82f6, #1d4ed8)",
//     padding: "14px",
//     borderRadius: "10px",
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "700",
//     marginTop: "14px",
//     fontSize: "15px",
//     letterSpacing: "0.5px",
//   },
//   poTable: {
//     width: "100%",
//     borderCollapse: "collapse",
//     fontSize: "14px",
//     marginTop: "12px",
//     borderRadius: "10px",
//     overflow: "hidden",
//   },
//   poTableThTd: {
//     border: "1px solid #475569",
//     padding: "12px",
//     textAlign: "center",
//     color: "#f8fafc",
//     backgroundColor: "rgba(30,41,59,0.95)",
//   },
//   transactionTable: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginTop: "12px",
//     fontSize: "14px",
//   },
//   cardsContainer: {
//     display: "flex",
//     gap: "16px",
//     flexWrap: "wrap",
//   },
//   card: {
//     background: "#fff",
//     padding: "16px",
//     borderRadius: "12px",
//     flex: "1 1 200px",
//     boxShadow: "0px 6px 18px rgba(0,0,0,0.12)",
//     display: "flex",
//     flexDirection: "column",
//     gap: "6px",
//   },
//   cardValue: {
//     fontSize: "18px",
//     fontWeight: "700",
//     color: "#1e293b",
//   },
//   chartPlaceholder: {
//     height: "200px",
//     background: "#e2e8f0",
//     borderRadius: "12px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#64748b",
//     fontWeight: "600",
//   },
//   quickActions: {
//     display: "flex",
//     gap: "12px",
//     flexWrap: "wrap",
//   },
//   actionButton: {
//     background: "#3b82f6",
//     color: "#fff",
//     border: "none",
//     borderRadius: "10px",
//     padding: "10px 14px",
//     cursor: "pointer",
//     fontWeight: "600",
//   },
//   viewButton: {
//     background: "linear-gradient(90deg, #10b981, #059669)",
//     color: "#fff",
//     padding: "8px 14px",
//     borderRadius: "8px",
//     textDecoration: "none",
//     fontSize: "13px",
//     fontWeight: "500",
//   },
//   verifyButton: {
//     padding: "8px 16px",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     color: "#fff",
//     fontSize: "14px",
//     fontWeight: "600",
//     background: "linear-gradient(90deg, #6366f1, #4f46e5)",
//   },
// };
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import logo from "@/assets/logosaas.png";

export default function CustomerDashboard() {
  const [buyer, setBuyer] = useState("");
  const [uuid, setUuid] = useState("");
  const [copyOfAgreement, setCopyOfAgreement] = useState(null);
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [loanId, setLoanId] = useState("");
  const [linkedPOs, setLinkedPOs] = useState([]);
  const [waitMessage, setWaitMessage] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const [isSellerVerified, setIsSellerVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isTimerYellow, setIsTimerYellow] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true); // ✅ collapsible sidebar

  const router = useRouter();

  // ---------------- WebSocket Setup ----------------
  useEffect(() => {
    if (!uuid) return;

    const socket = new SockJS("http://localhost:8082/ws-notifications");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      stompClient.subscribe(`/topic/notifications/${uuid}`, (message) => {
        setNotifications((prev) => [...prev, message.body]);
        if (message.body.includes("verified")) {
          setIsSellerVerified(true);
          setShowThankYouMessage(true);
          setWaitMessage(false);
          fetchLinkedPOs(uuid);
        }
      });
    };

    stompClient.activate();
    return () => stompClient.deactivate();
  }, [uuid]);

  // ---------------- Timer ----------------
  useEffect(() => {
    let timer;
    if (timeLeft > 0 && isSellerVerified) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        if (timeLeft < 60) setIsTimerYellow(true);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isSellerVerified]);

  // ---------------- Fetch Linked POs ----------------
  useEffect(() => {
    const { uuid } = router.query;
    if (uuid) {
      setUuid(uuid);
      fetchLinkedPOs(uuid);
    }
  }, [router.query]);

  const fetchLinkedPOs = async (sellerUuid) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/get-po?sellerUuid=${sellerUuid}`
      );
      setLinkedPOs(response.data);
    } catch (error) {
      console.error("Error fetching linked POs:", error);
    }
  };

  // ---------------- File Upload ----------------
  const generateLoanIdFromUuid = (uuid) => {
    const firstFourChars = uuid.substring(0, 4);
    const randomPart = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return firstFourChars + randomPart;
  };

  const handleFileUpload = async () => {
    if (!uuid || !copyOfAgreement || !purchaseOrder) {
      alert("Please select buyer and upload both files.");
      return;
    }
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("uuid", uuid);
      formData.append("copyOfAgreement", copyOfAgreement);
      formData.append("purchaseOrder", purchaseOrder);

      const response = await fetch(
        "http://localhost:8082/upload/agreementAndPurchaseOrder",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        const newLoanId = generateLoanIdFromUuid(uuid);
        setLoanId(newLoanId);
        setWaitMessage(true);
        setShowThankYouMessage(false);
        fetchLinkedPOs(uuid);
      } else {
        alert(result.error || "File upload failed.");
      }
    } catch (error) {
      alert("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // ---------------- Dummy Data ----------------
  const supplierReliability = 82;
  const trustIndex = 76;
  const pendingInvoices = [
    { invoiceId: "INV-001", amount: "₹1,25,000", due: "3 days" },
    { invoiceId: "INV-002", amount: "₹75,000", due: "7 days" },
  ];

  return (
    <div style={styles.layout}>
      {/* ---------------- Collapsible Sidebar ---------------- */}
      <aside
        style={{
          ...styles.sidebar,
          width: sidebarOpen ? "300px" : "80px",
        }}
      >
        <button
          style={styles.collapseButton}
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          {sidebarOpen ? "«" : "»"}
        </button>

        {sidebarOpen && (
          <>
            <div style={styles.logoWrapper}>
              <Image src={logo} alt="Logo" width={80} height={80} />
            </div>

            <div style={styles.section}>
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
                style={
                  isUploading
                    ? { ...styles.uploadButton, ...styles.uploadButtonDisabled }
                    : styles.uploadButton
                }
                onClick={handleFileUpload}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload Files"}
              </button>
            </div>

            {waitMessage && (
              <div style={styles.alertWarning}>
                Waiting for seller to accept your documents...
              </div>
            )}

            {showThankYouMessage && (
              <div style={styles.alertSuccess}>
                <p>
                  Thank you! Your loan application is being processed by NBFCs.
                </p>
                <p style={{ color: isTimerYellow ? "orange" : "black" }}>
                  Time remaining: {formatTime(timeLeft)}
                </p>
              </div>
            )}

            {loanId && (
              <div style={styles.loanId}>
                <h3>Loan ID: {loanId}</h3>
              </div>
            )}

            {linkedPOs.length > 0 && (
              <div style={styles.section}>
                <h3>Linked Purchase Orders</h3>
                <table style={styles.poTable}>
                  <thead>
                    <tr>
                      <th style={styles.poTableThTd}>Buyer UUID</th>
                      <th style={styles.poTableThTd}>Verified</th>
                      <th style={styles.poTableThTd}>View</th>
                      <th style={styles.poTableThTd}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {linkedPOs.map((po) => (
                      <tr key={po.buyerUuid}>
                        <td style={styles.poTableThTd}>{po.buyerUuid}</td>
                        <td style={styles.poTableThTd}>
                          {po.verifiedBySeller ? "Yes" : "No"}
                        </td>
                        <td style={styles.poTableThTd}>
                          <a
                            href={`data:application/pdf;base64,${po.purchaseOrderPdf}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.viewButton}
                          >
                            View
                          </a>
                        </td>
                        <td style={styles.poTableThTd}>
                          <button
                            onClick={async () => {
                              try {
                                await axios.post(
                                  "http://localhost:8082/verify-po",
                                  null,
                                  {
                                    params: {
                                      sellerUuid: uuid,
                                      buyerUuid: po.buyerUuid,
                                    },
                                  }
                                );
                                alert("PO Verified!");
                                fetchLinkedPOs(uuid);
                              } catch {
                                alert("Failed to verify PO");
                              }
                            }}
                            style={{
                              ...styles.verifyButton,
                              backgroundColor: po.verifiedBySeller
                                ? "#28a745"
                                : "#6366f1",
                            }}
                          >
                            {po.verifiedBySeller ? "Verified" : "Verify"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {notifications.length > 0 && (
              <div style={{ marginTop: "16px" }}>
                <h4>Notifications</h4>
                <ul>
                  {notifications.map((note, i) => (
                    <li key={i} style={{ color: "#fff" }}>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </aside>

      {/* ---------------- Main Content ---------------- */}
      <main style={styles.content}>
        <h1>Customer Dashboard</h1>
        <p>Welcome! Manage your buyers, agreements, and purchase orders.</p>

        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <span>Total Loan Amount</span>
            <span style={styles.cardValue}>₹45,00,000</span>
          </div>
          <div style={styles.card}>
            <span>Supplier Reliability Score</span>
            <span style={styles.cardValue}>{supplierReliability}%</span>
          </div>
          {/* <div style={styles.card}> */}
            {/* <span>Pending Invoices</span> */}
            {/* <span style={styles.cardValue}>{pendingInvoices.length}</span> */}
          {/* </div> */}
          <div style={styles.card}>
            <span>Buyer-Seller Relationship Score</span>
            <span style={styles.cardValue}>{trustIndex}/100</span>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Inter, Arial, sans-serif",
    backgroundColor: "#f1f5f9",
    color: "#1e293b",
  },
  sidebar: {
    background: "rgba(64, 64, 64, 0.9)",
    backdropFilter: "blur(16px)",
    color: "#e0e0e0",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    transition: "width 0.3s ease-in-out",
    boxShadow: "6px 0px 20px rgba(0,0,0,0.25)",
  },
  collapseButton: {
    alignSelf: "flex-end",
    background: "rgba(255,255,255,0.1)",
    border: "none",
    color: "#fff",
    padding: "4px 8px",
    cursor: "pointer",
    borderRadius: "6px",
    fontSize: "14px",
  },
  logoWrapper: { textAlign: "center" },
  content: { flex: 1, padding: "40px" },
  section: {
    background: "rgba(255,255,255,0.1)",
    padding: "16px",
    borderRadius: "12px",
  },
  fileInput: { display: "block", margin: "8px 0", color: "#e2e8f0" },
  uploadButton: {
    padding: "10px 14px",
    background: "linear-gradient(90deg, #3b82f6, #2563eb)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
  },
  uploadButtonDisabled: { background: "#94a3b8", cursor: "not-allowed" },
  alertWarning: { background: "#fde047", padding: "10px", borderRadius: "8px" },
  alertSuccess: { background: "#22c55e", padding: "10px", borderRadius: "8px" },
  loanId: {
    background: "linear-gradient(90deg, #3b82f6, #1d4ed8)",
    padding: "12px",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: "700",
  },
  poTable: { width: "100%", marginTop: "12px" },
  poTableThTd: { border: "1px solid #475569", padding: "8px", textAlign: "center" },
  cardsContainer: { display: "flex", gap: "16px", flexWrap: "wrap" },
  card: {
    background: "#fff",
    padding: "16px",
    borderRadius: "12px",
    flex: "1 1 200px",
    boxShadow: "0px 6px 18px rgba(0,0,0,0.12)",
  },
  cardValue: { fontSize: "18px", fontWeight: "700" },
  viewButton: {
    background: "#10b981",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "13px",
  },
  verifyButton: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#fff",
    fontSize: "13px",
  },
};
