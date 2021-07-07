import React, {useContext, useState } from 'react';
import {MediContext } from '../Context';
import {useParams, Link} from 'react-router-dom'
import Navbar from '../components/Navbar';
import {FaMicrophone, FaFirstAid, FaHospital} from 'react-icons/fa'
export default function FullDiagnosisDetails(){
    let { slug } = useParams();
    const {showDiagnosisDetails, showLessLikelyDiagnosisDetails} = useContext(MediContext)
    const diagnosis = showDiagnosisDetails(slug) || showLessLikelyDiagnosisDetails(slug)
    const [isOpen, setIsOpen] = useState(false)

let interval;
      const executeSpeech =(arrayToBeRead)=>{
    //     let string = ''
    //   let func =setInterval(function(){
    //     for (const i in array) {
    //         string += array[i]
    //     }
    //   }, 6000)
    //     var utterance  = new SpeechSynthesisUtterance();
    //     utterance.text = string
    //     speechSynthesis.speak(utterance);

    //     let myArray = [0, 1, 2, 3, 4]

interval = setInterval(gen => {
  const { value, done } = gen.next()
  
  if (done) {
       clearInterval(interval)
  } 
  else {
       console.log(value)
        var utterance  = new SpeechSynthesisUtterance();
        utterance.text = value
        speechSynthesis.speak(utterance);
  }
}, 1000, arrayToBeRead[Symbol.iterator]())
 }

      const cancelSpeech =()=>{
          clearInterval(interval)
        var synth = window.speechSynthesis;

        
        synth.cancel()
      }
  

    if(!diagnosis){
        return <div>The resource you requested for couldn't be retreived</div>
       }
       const {name, overview, causes, symptoms, prevention, firstAid, firstAid:[aid], triage} = diagnosis
       const {list} = aid
       return <>
       <Navbar>
       <Link to="/">
          <button className='restart-btn'>
               Restart diagnostic process
               </button>
          </Link>
          
       </Navbar>

       <div className='body'>
         
           <div className="overlay" style={{height:isOpen?'100%': '0'}}>
  <button to='' className="closebtn" onClick={()=>{setIsOpen(!isOpen); cancelSpeech()}}>&times;</button>
  <div className="overlay-content">

  <div className='triage-div'>
 <div className='img-holder'>
<FaHospital/>
 </div>
 <div className='content'>
 <h2>Triage Advice</h2>
        {triage.map(item=>(
            <div>
            <h3>{item.message}</h3>
       <ul>
           {item.list.map(listItem=>(
               <li>{listItem}</li>
           ))}
       </ul>
       </div>
        ))}
 </div>
    </div>
  <div className='firstAid-div'>
   <div className='img-holder'>
<FaFirstAid/>
   </div>
   <div className='content'>
   <div className='headline'>
  <h2>First-Aid/Treatment options</h2>
  <div id="btn-holder">
  <button onClick={()=>executeSpeech(list)}><i><FaMicrophone/></i> Read aloud </button>
    <button onClick={cancelSpeech} id="cancel">End read aloud</button>
  </div>
      </div>
        {firstAid.map(item=>(
            <div>
            <h3>{item.headline}</h3>
       <ul>

           {item.list.map(listItem=>(
              <li>{listItem}</li>
           ))}
       </ul>
       </div>
        ))}
   </div>
    </div>

    

  </div>
</div>
       <div className='diagnosisDetailsPage'>
    
          <div className='header'>
              
              <h1 className='diagnosis-name'><b>{name}</b></h1>
              
        
            {/* <div className='nav-buttons'>
            <Link to="/">
          <button className='restart-btn'>
               Restart diagnostic process
               </button>
          </Link>
     
                

            </div> */}
          </div>

          <div className='overview'>
              <h1>Overview</h1>
          <p>{overview}</p>
          </div>
      

    <div className='causes'><h1>Causes</h1>
        {causes.map(item=>(
            <div>
            <h3>{item.headline}</h3>
       
           <ul>
           {item.list.map(listItem=>(
               <li>{listItem}</li>
           ))}
           </ul>
          
       
       </div>
        ))}
    </div>

    <div className='symptoms'><h1>Symptoms</h1>
        {symptoms.map(item=>(
            <div>
            <h2>{item.headline}</h2>
       <ul>
           {item.list.map(listItem=>(
               <li>{listItem}</li>
           ))}
       </ul>
       </div>
        ))}
    </div>


    <div className='prevention'><h1>Prevention</h1>
        {prevention.map(item=>(
            <div>
            <h2>{item.headline}</h2>
       <ul>
           {item.list.map(listItem=>(
               <li>{listItem}</li>
           ))}
       </ul>
       </div>
        ))}
    </div>



    
       </div>

       <button style={{visibility: isOpen?'hidden':'visible'}} className="triage-btn" onClick={()=>setIsOpen(!isOpen)}><i><FaFirstAid/></i>First-Aid</button>
       </div>
       </>
       

}
// class FullDiagnosisDetails extends Component {
//     constructor(props){
//         super(props)
//         this.state={
//             name:this.props.match.params.name
//         }
//     }
//     render() {
//         return (
//            <MediConsumer>
//                {value=>{
//                    const {showDiagnosisDetails} = value
//                    const diagnosis = showDiagnosisDetails(this.state.name)

//                    if(!diagnosis){
//                     return <div>The resource you requested for couldn't be retreived</div>
//                    }
//                    const {name} = diagnosis
//                    return <div>
//                        <p><b>{name}</b></p>
//                    </div>
//                }}
//            </MediConsumer>
//         );
//     }
// }


// export default FullDiagnosisDetails;
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     useParams
//   } from "react-router-dom";
  
//   function BlogPost() {
//     let { slug } = useParams();
//     return <div>Now showing post {slug}</div>;
//   }
  