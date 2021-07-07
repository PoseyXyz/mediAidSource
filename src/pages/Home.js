import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import logo from '../img/2.png'

function Home() {

    return (
        <div className="App">
          
          <Navbar/>
          <div className='body'>
            <div className='home'>
       
         <div className='txt-holder'>
              <h1>Hello!</h1>
        <p>You're about to perform a short, safe and anonymous health checkup. Your answers will be carefully analysed and you'll learn about the possible causes of your symptoms. You will also gain a little information about your symptoms and what you could do to feel better</p>
          <h4>Before you continue, it is important to note the following:</h4>
          <ul>
            <li>Do  not use mediAid in the case of a health emergency. Instead, contact your local emergency service.</li>
            <li>Checkup is meant for informational purposes <b>only</b> and is not a qualified medical diagnosis.</li>
            <li>The information you provide is anonymous and not shared with anyone</li>.
          </ul>
           <Link to='/symptoms'>
           <button>Start checkup</button>
           </Link>
              </div>
<div className='img-holder'>
<img src={logo} alt='homeImg'/>
</div>
</div>    
      </div>
      </div>
    );
}

export default Home