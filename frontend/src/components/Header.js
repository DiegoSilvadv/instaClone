import React from 'react';
import {Link} from 'react-router-dom';
import { FiCamera } from 'react-icons/fi';
import logo from '../assets/logo.svg';

import './Header.css';

export default function Header(){
    return(
        <header id="main-header">
            <div className="header-content">
                <Link to="/">
                    <img src={logo} alt="instaclone" />
                </Link>
                <Link to="/new">
                    <FiCamera size={25} />
                </Link>
            </div>
        </header>
    )
}