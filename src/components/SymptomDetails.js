import React, {useContext, useEffect, useState} from 'react'
import { MediContext } from '../Context'
import { Link, useParams } from 'react-router-dom'
import Navbar from './Navbar';
import {FaAngleLeft} from 'react-icons/fa'
import Sidebar from './Sidebar';
export default function FullDiagnosisDetails(){
   
    let { slug } = useParams();
    const {showDetails, tags, handleTags, retrieveDiagnoses, setDiagnoses} = useContext(MediContext)
    const [page] = useState('questions')
    
    useEffect(()=>{
        return ()=>{   
            setDiagnoses([])
        }
    }, [])    

    const symptom = showDetails(slug)
       
    if(!symptom){
        return <div>Requesting resources</div>
    }
    const {questions, name} = symptom
  
             
    return <>
     
    <Navbar/>
     <div className='body'>
     <Sidebar page={page}/>
        <div className="questions-box">
<h1 className='headline'> {name}</h1>
<p className='sub-headline'>Find possible causes of {name} based on specific factors. Check at least one or more factors on this page that apply to your symptom(s).  The more the symptoms you provide, the more accurately mediAid can find out cause of your underlying symptoms </p>
  
       <div>
           {questions.map((item, index)=>{
           const {question, tag} = item
              
           return <div key={index} className='question'>
               <p className='question-txt'>{question}</p>    
               <label className='checkbox'>
                   
               <input type="checkbox" onChange={()=>{handleTags(tag)}}  checked={tags.includes(tag)} />
               <span></span>
               </label>
          
           </div>
           
           }
           )}
       </div>
       <div className='btn-holder'>
       <Link to='/symptoms'><button className='back-btn'><i><FaAngleLeft/></i>Back</button></Link>
       <Link to='/d'><button className='submit-btn' onClick={()=>{retrieveDiagnoses()}}>Submit</button></Link>
       

       </div>
 


        
        </div>
    </div>
    </>

}

// export default class SymptomDetails extends Component{
//   constructor(props){
//       super(props)
//       this.state={
//           name:this.props.match.params.name,
          
//       }
//   }
//     render(){
//         return(
//             <MediConsumer>
//                 {value=>{
//                     const {showDetails, addValue, removeValue, values, setValues, handleSomething, retrieveDiagnoses} = value
//                     const symptom = showDetails(this.state.name)
               
                    

                   


//                     if(!symptom){
//                         return <div>The resource you requested for couldn't be retreived</div>
//                     }
//                     const {name, questions} = symptom
//                     let string = ''     

//                     return <div>
//                         <div>
                       
//                        <div> {string}</div>
//                        {name}

//                        <div>
//                            {questions.map((item, index)=>{
//                            const {question, tag} = item
                       
                       
//                            return <div key={index}>
//                           {tag}
                         
//                              <label>
//                            <input type="checkbox" checked={values.includes(tag)} onChange={()=>handleSomething(tag)} />
//                            {question}
//                              </label>
//                            </div>
//                            }
//                            )}
//                        </div>
//                    </div>
//                    <Link to='/d'><button onClick={retrieveDiagnoses}>GO NOW</button></Link>
//                     </div>
//                 }}
//             </MediConsumer>
//         )
//     }
// }