import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

import closeBtn from "/images/closeBtn.jpg";

import css from "./EnterOTP.module.css";

const EnterOTP = ({ setModal, setLoggedIn = () => {}, setAuth = () => {}, phoneNumber, name }) => {
  const sendOTPUrl = "https://userpanel.selfeey.com/api.selfeey.com/all_user_api/user_otp_api.php";

  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [count, setCount] = useState(60);
  const [enteredOTP, setEnteredOTP] = useState("");
  const inputRefs = useRef([]);

  console.log('enteresotp',enteredOTP)

  useEffect(() => {
    if (!count) return;

    const interval = setInterval(() => {
      if (count > 0) {
        setCount((val) => val - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  const handleInputChange = (index, value) => {
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;

    // Focus on the next input field if the value is not empty
    if (value !== "" && index < otpDigits.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    setOtpDigits(newOtpDigits);

    // Concatenate digits to form enteredOTP
    const newEnteredOTP = newOtpDigits.join("");
    setEnteredOTP(newEnteredOTP);
  };

  const handleVerifyOTP = async () => {
    setModal(false);
    setLoggedIn(true);
    setAuth(false);
    localStorage.setItem("auth", true);
    try {
      const isOTPVerified = await verifyOTP(enteredOTP);
      console.log("Is OTP Verified:", isOTPVerified);
      if (isOTPVerified) {
        // If OTP is verified, navigate to the registration page
      } else {
        console.error("Incorrect OTP entered.");
        setShowOTPErrorModal(true); // Display OTP error modal
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      // Handle error scenarios
    }
  };

  const verifyOTP = async (enteredOTP) => {
    try {
      const requestBody = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'verify_otp',
          otp: enteredOTP,
          mobile_number: phoneNumber,
          name: name,
        }),
      };
  
      const response = await fetch(sendOTPUrl, requestBody);
  
      if (!response.ok) {
        throw new Error(`Failed to verify OTP. Server returned status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.message === 'OTP verification successful') {
        return true;
      } else {
        console.error('Error verifying OTP:', data.message);
        return false;
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      return false;
    }
  };
  

  const navigate = (path) => {
    // Your navigation logic goes here
    console.log(`Navigating to: ${path}`);
  };

  const domObj = (
    <div className={css.outerDiv}>
      <div className={css.innerDiv}>
        <div className={css.header}>
          <div className={css.title}>Enter OTP</div>
          <span className={css.closeBtn} onClick={() => setModal(false)}>
            <img
              className={css.closeBtnImg}
              src={closeBtn}
              alt="close button"
            />
          </span>
        </div>
        <div className={css.body}>
          <div className={css.txt1}>OTP sent successfully</div>
          <div className={css.OTPBox}>
            {otpDigits.map((digit, index) => (
              <div key={index} className={css.otpNumBox}>
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  className={css.inpBox}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div
            onClick={handleVerifyOTP}
            className={css.okBtn}
            value={enteredOTP}
          >
            verify otp
          </div>
          <div className={css.footerBox}>
            <div className={css.time}>Time: {count}</div>
            <div className={css.footerTxt}>
              Didn't receive OTP?{" "}
              <span className={css.resendTxt} onClick={() => setCount(60)}>
                Resend Now
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(domObj, document.getElementById("modal"));
};

export default EnterOTP;
