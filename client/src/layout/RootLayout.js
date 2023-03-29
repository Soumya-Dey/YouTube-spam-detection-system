import React from 'react';
import { Outlet, NavLink, ScrollRestoration } from 'react-router-dom';
import { Bars3Icon, InformationCircleIcon } from '@heroicons/react/24/outline';

import logo from '../assets/logo.svg';
import githubIcon from '../assets/github-icon.svg';

const RootLayout = () => {
  return (
    <div className='main-container'>
      <ScrollRestoration />
      <div className='navbar'>
        <Bars3Icon className='h-8 w-8' />
        <NavLink to='/' className='logo-link'>
          <img src={logo} alt='YouTube Spam Detector Logo' className='logo' />
        </NavLink>

        <NavLink to='about' className='about-link'>
          About Us
          <InformationCircleIcon className='h-5 w-5' />
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default RootLayout;
