import { useState } from "react";
import { createPortal } from "react-dom";

import gLogo from "/images/google.png";
import mailLogo from "/images/emailIcon.jpg";
import closeBtn from "/images/closeBtn.jpg";

import loginCss from "./Login.module.css";

import EnterOTP from "../../Auth/EnterOTP/EnterOTP";

let Login = ({ setAuth, setLoggedIn }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let [otpModal, setOTPModal] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const sendOTPUrl = "https://userpanel.selfeey.com/api.selfeey.com/all_user_api/user_otp_api.php";

  const handleSendOTP = async () => {
    // Validate phone number before sending OTP
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumber.match(phoneNumberRegex)) {
      console.error("Invalid phone number. Please enter a 10-digit number.");
      // Display phone number error modal or handle it as needed
      return;
    }

    try {
      setIsLoading(true);
      await sendOTP(phoneNumber);
      setOTPModal(true);  // Set OTP modal to true after a successful OTP send
    } catch (error) {
      console.error("Error sending OTP:", error);
    } finally {
      // Handle error scenarios
      setIsLoading(false);
    }
  };

  const sendOTP = async (phoneNumber) => {
    try {
      const requestBody = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: phoneNumber,
          action: "register",
        }),
      };
      const response = await fetch(sendOTPUrl, requestBody);

      if (!response.ok) {
        throw new Error(
          `Error sending OTP. Server returned status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("OTP Sent:", data);
      setOTPModal(true);

      if (!data.success) {
        throw new Error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      // Propagate the error for the calling function to handle
      throw error;
    }
  };

  let loginDiv = (
    <div className={loginCss.outerDiv}>
      <div className={loginCss.modal}>
        <div className={loginCss.header}>
          <span className={loginCss.ttl}>Login</span>
          <span
            className={loginCss.closeBtn}
            onClick={() =>
              setAuth({ closed: true, login: false, signup: false })
            }
          >
            <img
              className={loginCss.closeBtnImg}
              src={closeBtn}
              alt="close button"
            />
          </span>
        </div>

        {otpModal ? (
          <EnterOTP
            setModal={setOTPModal}
            setLoggedIn={setLoggedIn}
            setAuth={setAuth}
            phoneNumber={phoneNumber}
          />
        ) : (
          <div>
            <div className={loginCss.lgBox}>
              <input
                className={loginCss.phoneInp}
                type="tel"
                placeholder="Phone number ..."
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button
                className={
                  phoneNumber?.length === 10
                    ? [loginCss.btn, loginCss.Sbtn].join(" ")
                    : loginCss.btn
                }
                onClick={handleSendOTP}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  'Send OTP'
                )}
              </button>
            </div>

            {/* <div className={loginCss.orBreak}>
              <span className={loginCss.orBreakText}>or</span>
            </div> */}
{/* 
            <div className={loginCss.socialSignupBox}>
              <img className={loginCss.icon} src={mailLogo} alt="email signup" />
              Continue with Email
            </div>
            <div className={loginCss.socialSignupBox}>
              <img className={loginCss.icon} src={gLogo} alt="google signup" />
              Continue with Google
            </div> */}

            <hr className={loginCss.break} />
            <div className={loginCss.newToZomato}>
              New to Zomato?{" "}
              <div
                className={loginCss.createAcc}
                onClick={() =>
                  setAuth({ closed: false, login: false, signup: true })
                }
              >
                Create Account
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(loginDiv, document.getElementById("modal"));
};

export default Login;
