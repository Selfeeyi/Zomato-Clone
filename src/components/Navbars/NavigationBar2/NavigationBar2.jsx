import { useState } from 'react';
import { Link } from 'react-router-dom'

import mobileHand from '/icons/smartphone.png'
import menuBar from '/icons/menu.png'
import downArrow from '/icons/down-arrow.png'
import profilePic from '/images/profilepic.jpg'
import Login from '../../Auth/Login/Login'
import Signup from '../../Auth/Signup/Signup'
import SearchBar from '../../../utils/SearchBar/SearchBar'
import logo from '../../../asets/images/tedeeysmall.png'
import css from './NavigationBar2.module.css';

let NavigationBar = ({ toogleMenu, setToggleMenu }) => {
    let [menuDisplay, setMenuDisplay] = useState(false);
    let [loggedIn, setLoggedIn] = useState(localStorage.getItem('auth') || false);
    let [auth, setAuth] = useState({
        closed: true,
        login: false,
        signup: false
    });

    const logoutHandler = () => {
        setLoggedIn(false);
        localStorage.removeItem("auth");
    }

    return <div className={css.navbar}  >
        {/* style={{backgroundImage: 'linear-gradient(to right, #ffffff, #ffffff,#e90092, #e90092,#ffffff,#ffffff,#ffffff)'}} */}
        <img className={css.menuBar} src={menuBar} alt='menu bar' onClick={() => setToggleMenu(val => !val)} />
        <div className={css.navbarInner}>
            <div className={css.leftSide}>
                <Link to='/' className={css.appTxt} style={{fontFamily:'DexaBold',color:'var(--primary-color)'}}><img src={logo} style={{marginTop:8}} width={170} height={49} /></Link>
            </div>
            <div className={css.searchBar} >
                <SearchBar />
            </div>
            <div className={css.rightSide}>
                {loggedIn? (<div className={css.menuItem}>
                    <div className={css.profile} onClick={() => setMenuDisplay(val => !val)}>
                        <img src={profilePic} alt="profile pic" className={css.profilePic} />
                        <div className={css.profileName}  style={{fontFamily:'DexaSemi',color:'var(--primary-color)'}} >Profile</div>
                        <img src={downArrow} alt="arrow" className={css.arrow} />
                    </div>
                    <div className={css.menu} style={{display: menuDisplay ? "block" : ""}}>
                    <Link to='/user/ll/reviews' className={css.menuItemLinkTxt} style={{fontFamily:'DexaBold',color:'var(--primary-color)'}} >
                            <div className={css.menuItemLink} style={{fontFamily:'DexaLight',color:'var(--primary-color)'}} >
                                Profile
                            </div>
                        </Link>
                        {/* <Link to='/user/ll/notifications' className={css.menuItemLinkTxt}>
                            <div className={css.menuItemLink}>
                                Notifications
                            </div>
                        </Link> */}
                        <Link to='/user/ll/bookmarks' className={css.menuItemLinkTxt}>
                            <div className={css.menuItemLink } style={{fontFamily:'DexaLight',color:'var(--primary-color)'}}>
                                Bookmarks
                            </div>
                        </Link>
                        <Link to='/user/ll/reviews' className={css.menuItemLinkTxt}>
                            <div className={css.menuItemLink} style={{fontFamily:'DexaLight',color:'var(--primary-color)'}}>
                                Reviews
                            </div>
                        </Link>
                        {/* <Link to='/user/ll/network' className={css.menuItemLinkTxt}>
                            <div className={css.menuItemLink}>
                                Network
                            </div>
                        </Link> */}
                        {/* <Link to='/user/ll/find-friends' className={css.menuItemLinkTxt}>
                            <div className={css.menuItemLink}>
                                Find Friends
                            </div>
                        </Link> */}
                        <Link to='/user/ll/settings' className={css.menuItemLinkTxt}>
                            <div className={css.menuItemLink} style={{fontFamily:'DexaLight',color:'var(--primary-color)'}}>
                                Settings
                            </div>
                        </Link>
                        <div className={css.menuItemLinkTxt} onClick={logoutHandler}>
                            <div className={css.menuItemLink} style={{fontFamily:'DexaLight',color:'var(--primary-color)'}}>
                                Logout
                            </div>
                        </div>
                    </div>
                </div>): (<>
                    <div style={{fontFamily:'DexaLight',color:'var(--primary-color)'}} className={css.menuItem} onClick={() => setAuth({ closed: false, login: true, signup: false })}>Log in</div>
                    <div style={{fontFamily:'DexaLight',color:'var(--primary-color)'}} className={css.menuItem} onClick={() => setAuth({ closed: false, login: false, signup: true })}>Sign up</div>
                </>)}
            </div>
        </div>
        <div className={css.modals}>
            {auth?.login ? <Login setAuth={setAuth} setLoggedIn={setLoggedIn} /> : null}
            {auth?.signup ? <Signup setAuth={setAuth} setLoggedIn={setLoggedIn} /> : null}
        </div>
    </div>
}

export default NavigationBar;