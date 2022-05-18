import React, { useState, useContext, useEffect } from 'react';
import { MediContext } from '../Context';
import Symptom from './Symptom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';


function SymptomsList() {
  const { symptoms, tags, setTags } = useContext(MediContext)
  const [searchString, setSearchString] = useState('')
  const [page] = useState('symptoms')

  let _symptoms = symptoms;
  let search = searchString.trim().toLowerCase()
  if (search.length > 0) {
    _symptoms = _symptoms.filter(symptom => {
      return symptom.name.toLowerCase().match(search)
    })
  }
  useEffect(() => {
    setTags([])
  }, [])
  const handleChange = (e) => {
    setSearchString(e.target.value)
  }
  return (
    <>
      <Navbar />

      <div className='body'>

        <Sidebar page={page} />

        <div className='symptoms-box'>
          <div className='search-box'>
            <h3>What is the main symptom you are experiencing?</h3>
            <input placeholder='Search list of symptoms'
              value={searchString}
              onChange={handleChange} />
          </div>
          <div className='symptoms-list'>
            {_symptoms.map(symptom => (
              <Symptom key={symptom._id} symptom={symptom} tags={tags} setTags={setTags} />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

export default SymptomsList;