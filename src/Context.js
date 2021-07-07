import React, { useState, useEffect } from 'react'


const MediContext = React.createContext()

const MediProvider = ({children})=>{
    const [symptoms, setSymptoms] = useState([])
    const [tags, setTags] = useState([])
    const [diagnoses, setDiagnoses] = useState([])
    const [lessLikelyDiagnoses, setLessLikelyDiagnoses] = useState([])



    useEffect(() => {
    const parsedDiagnoses =JSON.parse(localStorage.getItem("diagnoses"))
    setDiagnoses(parsedDiagnoses)
  }, [])

  useEffect(() => {
    localStorage.setItem("diagnoses", JSON.stringify(diagnoses))
  }, [diagnoses])

  // useEffect(() => {
  //   const parsedSymptoms =JSON.parse(localStorage.getItem("symptoms"))
  //   setSymptoms(parsedSymptoms)
  // }, [])

  // useEffect(() => {
  //   localStorage.setItem("symptoms", JSON.stringify(symptoms))
  // }, [symptoms])
    //faced the challenge of making an api
    //how to gather data and return it
    //parse uri 
    //losing dtat on refresh
   
    useEffect(()=>{
        getSymptomsInfo()

    }, [])








    const getSymptomsInfo= async ()=>{
        const data = await fetch(`https://medi-aid-server.herokuapp.com/symptoms`)
        const res =await data.json()
        console.log(res);
        setSymptoms(res)
    
    }

    const showDetails = (name)=>{
        const symptom = symptoms.find(symptom=>symptom.name===name)
        return symptom
    }
    const showDiagnosisDetails = (name)=>{
      const diagnosis = diagnoses.find(diagnosis=>diagnosis.name===name)
      return diagnosis
  }
  const showLessLikelyDiagnosisDetails = (name)=>{
    const diagnosis = lessLikelyDiagnoses.find(diagnosis=>diagnosis.name===name)
    return diagnosis
}



  const addTag=async (value)=>{    
  setTags([...tags, value])  
  }
  const removeTag=(itemIndex)=>{
   let tempValues = tags.filter((value)=>value !== itemIndex)
   setTags(tempValues)
  }

    const handleTags= (value)=>{          
        if (tags.includes(value)) {
          removeTag(value)
        }else{
            addTag(value)
        }
     
      };

  
    
        const retrieveDiagnoses=async ()=>{
          //array of tags to be encoded = ["cough", "abdominal-pain", "diarrhea"]

          
          //encoding process where the "tags" array is used to create a url query string
          let string = ''
          tags.map((arr,index)=>{return string+=`${index ? '&':''}array=${arr}`})

        
          //example of url query string = (array=cough&array=abdominal-pain&array=diarrhea)

      
        const data = await fetch(`https://medi-aid-server.herokuapp.com/tags?${string}`)
        const res =await data.json()
        console.log(string);
        console.log(res);
        setDiagnoses(res)

        processLessLikelyDiagnoses(res)
      
        } 
    
      const processLessLikelyDiagnoses = async (diag)=>{
        const slicedArray =tags.filter((i, index)=>index<Math.floor(tags.length*0.7))
        
        let string = ''
    
        slicedArray.map((arr,index)=>{return string+=`${index ? '&':''}array=${arr}`})
      
       const data = await fetch(`https://medi-aid-server.herokuapp.com/tags?${string}`)
    const res =await data.json()
console.log(string);
console.log(res);



let mappedId =await diag.map(item=>{return item.id})
let filteredArray =  res.filter(el=>!mappedId.includes(el.id))

   setLessLikelyDiagnoses(filteredArray)

      }



    return (
        <MediContext.Provider value={{
            symptoms,
            setSymptoms,

            showDetails,
            handleTags,

           

            tags,
            setTags,
            
            diagnoses,
            setDiagnoses,

            retrieveDiagnoses,

            showDiagnosisDetails,

          processLessLikelyDiagnoses,
          lessLikelyDiagnoses,

          showLessLikelyDiagnosisDetails       
        }}>
            {children}
        </MediContext.Provider>
    )
}

const MediConsumer = MediContext.Consumer

export {MediContext, MediProvider, MediConsumer}



/*
import React from "react";
import { render } from "react-dom";

class App extends React.Component {
  state = {
    shouldCreate: "",
    values:[],
    checked:false
  };

  handleSomething = (value, itemIndex) => {
    let shouldCreate = this.state.shouldCreate;

    if (shouldCreate === "Yes") {
      shouldCreate = "No";
      this.removeValue(itemIndex)
    } else if (shouldCreate === "No") {
      shouldCreate = "Yes";
     this.addValue(value)
    } else {
      shouldCreate = "Yes";
      this.addValue(value)
    }

    this.setState({
      shouldCreate
    });
  };

  addValue=(value)=>{
    const values = [...this.state.values]
    this.setState({
      values:[...values, value]
    })
  }
  removeValue=(itemIndex)=>{
    let values = [...this.state.values]
    values = values.filter((value, index)=>value !== itemIndex)
    this.setState({
      values
    })
  }


  render() {
    return (
      <div>
        <input type="checkbox" checked={this.state.shouldCreate === "Yes"} onClick={()=>this.handleSomething('covid', 'covid')} />

        <div>
          Should create? : {this.state.shouldCreate}
        </div>
        <p>{this.state.values}</p>


        <form onSubmit={this.formSubmit}>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="covid"
              checked={this.state.values.includes('covid')}
              onChange={(e)=>{this.addValue(e.target.value); this.setState({checked:false})}}
            />
            Covid
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="covid"
              checked={this.state.checked}
              onChange={(e)=>{this.removeValue(e.target.value); this.setState({checked:true})}}
            />
            No
          </label>
        </div>
       
      
        
      </form>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));

 */