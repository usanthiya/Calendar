import { useState } from 'react';
import './App.css'
import left from "./assets/left-arrow.png"
import right from "./assets/right-arrow.png"


const daysofweek=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const months=["January","February","March","April","May","June","July","August","September","October","November","December"];

function App() {
  const [selectedDate,setselectedDate]=useState(new Date());
  const daysInMonth=()=>{
    const daysArray=[];
    const firstday=new Date(selectedDate.getFullYear(),selectedDate.getMonth(),1);
    const lastday=new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,0);
    for(let i=0;i<firstday.getDay();i++){
       daysArray.push(null);
    }
    for(let i=1;i<=lastday.getDate();i++){
        daysArray.push(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),i));
    }
     return daysArray;
  }

  const issameday=(date1,date2)=>{
    return date1.getDate()===date2.getDate() && date1.getMonth()===date2.getMonth() && date1.getFullYear()===date2.getFullYear();
  }
  const handlemonth=(e)=>{
      const newmonth=parseInt(e.target.value,10);
      setselectedDate(new Date(selectedDate.getFullYear(),newmonth,1));
  }
  const handleyear=(e)=>{
     const newyear=parseInt(e.target.value,10);
     setselectedDate(new Date(newyear,selectedDate.getMonth(),1));
  }
  return (
    <>
     <div className='calendar'>
        <div className='header'>
          <button onClick={()=>{
            setselectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()-1,1))
          }}>
            <img src={left} style={{width:"10px", height:"10px"}}/>
          </button>
          <select value={selectedDate.getMonth()} onChange={handlemonth}>
            {months.map((month,index)=>(
               <option value={index} key={index}>{month}</option>
            ))}
          </select>
          <select value={selectedDate.getFullYear()} onChange={handleyear}> 
            {Array.from({length:10},(_,i)=>selectedDate.getFullYear()-5+i).map((year)=>(
              <option key={year} value={year}>{year}</option>))}
          </select>
          
          
          <button onClick={()=>{
            setselectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,1))
          }}>
          <img src={right} style={{width:"10px", height:"10px"}}/>
          </button>
        </div>
        <div className="daysofweek"> 
           {daysofweek.map((day)=>(
            <div key={day}>{day}</div>
           ))}
        </div>
        <div className='days'>
            {daysInMonth().map((date,index)=>(
              <div key={index} className={date?(issameday(date,new Date())?"day current":"day"):"empty"}>{date?date.getDate():""}</div>
            ))}
        </div>
      </div> 
    </>
  )
}

export default App
