import { createPortal } from "react-dom";
import { useState } from "react";
import gLogo from "/images/google.png";
import mailLogo from "/images/emailIcon.jpg";
import closeBtn from "/images/closeBtn.jpg";
import EnterOTP from "../EnterOTP/EnterOTP";
import signupCss from "./Signup.module.css";

let Signup = ({ setAuth, setLoggedIn }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  let [otpModal, setOTPModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendOTPUrl =
    "https://userpanel.selfeey.com/api.selfeey.com/all_user_api/user_otp_api.php";

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
      await sendOTP(phoneNumber, name);
      setOTPModal(true); // Set OTP modal to true after a successful OTP send
    } catch (error) {
      console.error("Error sending OTP:", error);
    } finally {
      // Handle error scenarios
      setIsLoading(false);
    }
  };
  const sendOTP = async (phoneNumber, name) => {
    try {
      const requestBody = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: phoneNumber,
          action: "register",
          name: name,
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
    <div className={signupCss.outerDiv}>
      <div className={signupCss.modal}>
        <div className={signupCss.header}>
          <span className={signupCss.ttl}>Signup</span>
          <span
            className={signupCss.closeBtn}
            onClick={() =>
              setAuth({ closed: true, login: false, signup: false })
            }
          >
            <img
              className={signupCss.closeBtnImg}
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
         name={name}
       />
      ) : (
        <div>
        <div className={signupCss.lgBox}>
          <input
            className={signupCss.inpBox}
            type="text"
            placeholder="Full Name ..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={signupCss.inpBox}
            type="tel"
            placeholder="PhoneNumber ..."
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <span className={signupCss.termsTxt}>
            <input
              type="checkbox"
              name="accpect"
              id="accpect"
              className={signupCss.checkBox}
            />
            <span>
              I agree to Zomato's{" "}
              <a href="" className={signupCss.termaAnchor}>
                Terms of Service, Privacy Policy
              </a>{" "}
              and{" "}
              <a href="" className={signupCss.termaAnchor}>
                Content Policies
              </a>
            </span>
          </span>
          <button className={signupCss.btn} onClick={handleSendOTP}>
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span>Sending OTP...</span>
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </div>
        
        {/* <div className={signupCss.orBreak}>
          <span className={signupCss.orBreakText}>or</span>
        </div>
        <div className={signupCss.socialSignupBox}>
          <img className={signupCss.icon} src={gLogo} alt="google login" />
          Continue with Google
        </div> */}

        <hr className={signupCss.break} />
        <div className={signupCss.newToZomato}>
          Already have an account?{" "}
          <div
            className={signupCss.createAcc}
            onClick={() =>
              setAuth({ closed: false, login: true, signup: false })
            }
          >
            Log in
          </div>
        </div>
        </div>
     )} 
      </div>
    </div>
  );
  return createPortal(loginDiv, document.getElementById("modal"));
};

export default Signup;
