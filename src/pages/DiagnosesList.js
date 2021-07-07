import React, { useState, useEffect, useContext } from 'react';
import { MediContext } from '../Context';
import Diagnosis from '../components/Diagnosis';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

function DiagnosesList(props) {
    const {diagnoses, setTags, lessLikelyDiagnoses} = useContext(MediContext)
    const [page] = useState('results')
    const [loader, setLoader] = useState(false)
    const [toggleDropdown, setToggleDropdown] = useState(false)
    useEffect(()=>{
    
        return ()=>{
            setTags([])
        }
    }, [loader])
    setTimeout(()=>{
        setLoader(true)
    }, 10000)
  
    return (<>
    <Navbar/>
    {
        diagnoses != null && diagnoses.length === 0 ? <div>{loader ? <div className='body'>
             <Sidebar page={page}/>
        <div className='diagnoses-list-box'>
           <h1>Please try again. Your selected symptoms either didn't match our current diagnoses list or you did not choose enough symptoms to arrive at a diagnosis. </h1>
          <Link to="/">
          <button className='restart-btn'>
               Restart diagnostic process
               </button>
          </Link>
          
            </div>
        </div>: 
        <div className='body'>
            <div className='diagnoses-list-box'>
           <h1>Processing diagnosis...</h1>
        
            </div>
        </div>
            }</div>
        :
            <div className='body' style={{display:diagnoses===[]?'none':'flex'}}>
        <Sidebar page={page}/>
        <div className='diagnoses-list-box'>
            <h1 className='headline'>Diagnosis Results</h1>
            <p className='sub-headline'>Please note that the list below may not be complete and is provided solely for informtational purposes and is not a qualified medical opinion</p>
             {diagnoses ? diagnoses.map(diagnosis=><Diagnosis key={diagnosis._id} diagnosis={diagnosis}/>): null}
                
             {
        lessLikelyDiagnoses.length===0 ? <></> : <div>
 <button onClick={()=>{setToggleDropdown(!toggleDropdown)}} className="less-likely-diagnosis"><i><FaPlus/></i>{toggleDropdown ? 'Hide less likely diagnoses' : 'Show less likely diagnosis'}  </button>
 <div style={{display: toggleDropdown?'block':'none'}}>{lessLikelyDiagnoses.map(diagnosis=><Diagnosis key={diagnosis._id} diagnosis={diagnosis}/>)}</div>
        </div>
    }
     <Link to="/">
          <button className='restart-btn'>
               Restart diagnostic process
               </button>
          </Link>
          

            </div>
        </div>
    }
  
        
        </>
    );
}

export default DiagnosesList;