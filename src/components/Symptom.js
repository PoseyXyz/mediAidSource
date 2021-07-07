import React from 'react';
import {Link} from 'react-router-dom'
import {FaAngleRight} from 'react-icons/fa'
function Symptom({symptom, setTags, tags}) {
    const {name, tag} = symptom

    return (
    <Link to={`/${name}`}>
   <button className='symptom' onClick={()=>{setTags([...tags, tag])}}>
   
              {name}
              <i><FaAngleRight/></i>
        
   </button>
    </Link>
        
    );
}

export default Symptom;