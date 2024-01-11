import { useState } from "react";
import { createPortal } from "react-dom";
import './filter.css';

let Filter = () => {
 

  

  
    

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

            <div className={loginCss.orBreak}>
              <span className={loginCss.orBreakText}>or</span>
            </div>

            <div className={loginCss.socialSignupBox}>
              <img className={loginCss.icon} src={mailLogo} alt="email signup" />
              Continue with Email
            </div>
            <div className={loginCss.socialSignupBox}>
              <img className={loginCss.icon} src={gLogo} alt="google signup" />
              Continue with Google
            </div>

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

export default Filter;
