
import * as React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar';
import List from './components/List';
 import Utils from './components/Utils';


// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function App() {
  const [modes, setMode] = useState("light");

 
  const toggleSwitch = () => {
    if (modes === "light") {
      setMode("dark");
      document.body.style.backgroundColor = 'grey';
    }
    else {
      setMode("light");
      document.body.style.backgroundColor = 'white';
    }
  }
  return (
    <>
      <Navbar name="TimeZone Converter" mode={modes} />
    
      <List/>
      <Utils toggleSwitch={toggleSwitch} mode={modes}  />
      {/* <Zone place='America/New_York'/> */}
    </>
  );
}

export default App;
