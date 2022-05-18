import React, { useState, useEffect } from 'react';
import { FaAngleRight } from 'react-icons/fa';

function Sidebar({ page }) {
    const [progressWidth, setProgressWidth] = useState({ width: 0 })
    useEffect(() => {
        if (page === 'symptoms') {
            setProgressWidth({ width: '2rem' })
            return (<p>Initial symptom selection</p>)
        } else if (page === 'questions') {
            setProgressWidth({ width: '4rem' })
            return <p>Diagnostic questions</p>
        } else if (page === 'results') {
            setProgressWidth({ width: '6rem' })
            return <p>Diagnosis results</p>
        }
    }, [])
    const displayAltSidebar = () => {
        if (page === 'symptoms') {
            return <p>Initial symptom selection</p>
        } else if (page === 'questions') {
            return <p>Diagnostic questions</p>
        } else if (page === 'results') {
            return <p>Diagnosis results</p>
        }
    }


    return (
        <>
            <div className='sidebar'>
                <p style={{ color: page === 'symptoms' ? '#fff' : '#000' }}>Initial symptom selection</p>
                <i ><FaAngleRight /></i>
                <p style={{ color: page === 'questions' ? '#fff' : '#000' }}>Diagnostic questions</p>
                <i><FaAngleRight /></i>
                <p style={{ color: page === 'results' ? '#fff' : '#000' }}>Diagnosis results</p>
            </div>
            <div className='altSidebar'>
                {
                    displayAltSidebar()
                }
                <div className='progress-bar'>
                    <span style={progressWidth}></span>
                </div>
            </div>
        </>
    );
}

export default Sidebar;