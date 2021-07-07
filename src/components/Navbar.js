import React from 'react';
import {FaPlusCircle} from 'react-icons/fa';
import logo from '../img/mediAid9.png'

function Navbar({children}) {
    return (
        <div className='navbar'>
            <img src={logo} style={{width:'12rem', height:'3.2rem' }}/>
            {/* <h2> mediAid  <i><FaPlusCircle/></i></h2> */}
        {children}
            
        </div>
    );
}

export default Navbar;