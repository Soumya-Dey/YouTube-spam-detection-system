import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';

import logo from '../../assets/logo.svg';
import githubIcon from '../../assets/github-icon.svg';

const Navbar = () => {
  return (
    <div className='navbar'>
      <Bars3Icon className='h-8 w-8' />
      <img src={logo} alt='YouTube Spam Detector Logo' className='logo' />
      <img src={githubIcon} alt='GitHub Icon' className='h-6 w-6 github' />
    </div>
  );
};

export default Navbar;
