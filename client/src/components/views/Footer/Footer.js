import React from 'react';
import { Link } from 'react-router-dom';
import {Icon} from 'antd';
import logo from '../../../assets/logo.svg';
import './Footer.css';

function Footer() {
    return (
        <div >
            <div className='footBarBG'>
                <div className='footBarContainer'>
                    <div>
                        <img src={logo} alt='logo' style={{ width: '40px', height: '40px' }} />
                    </div>
                    <div>
                        <ul className='footerLists'>
                            <li>COMPANY</li>
                            <li><Link to='*'>About Us</Link></li>
                            <li><Link to='*'>Policy &amp; Term</Link></li>
                        </ul>
                    </div>
                    <div>
                        <ul className='footerLists'>
                            <li>SUPPORT</li>
                            <li><Link to='*'>Contact Us</Link></li>
                            <li><Link to='*'>Help Center</Link></li>
                        </ul>
                    </div>
                    <div>
                        <ul className='footerLists'>
                            <li>CATEGORY</li>
                            <li><Link to='/buyKitList/summer'>Summer</Link></li>
                            <li><Link to='/buyKitList/winter'>Winter</Link></li>
                            <li><Link to='/buyKitList/fall'>Fall</Link></li>
                            <li><Link to='/buyKitList/spring'>Spring</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
