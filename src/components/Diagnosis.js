import React from 'react';
import {Link} from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa';

function Diagnosis({diagnosis}) {
    const {name} = diagnosis
    return (
        <Link to={`/diagnosis/${name}`}>
          <button className='diagnosis'>
   
   {name}
   <i><FaAngleRight/></i>

</button>
        </Link>
    );
}

export default Diagnosis;