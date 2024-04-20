import React, { useState } from 'react';
import Draggable from 'react-draggable';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTime } from 'luxon';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './time.css'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import data from './timezones.json'


export default function Zone(props) {
    const timeZone = props.place;
    const currentTime = DateTime.now().setZone(timeZone);
    const offsetString = currentTime.toISOTime().substring(12)
    const timeOnly = currentTime.toFormat('hh:mm a');
    // const date=currentTime
    const [value, setValue] = useState(currentTime);
    const tempSlider = Math.floor(currentTime.hour * 4 + currentTime.minute / 15);
    const [sliderValue, setSliderValue] = useState(tempSlider);


    const marks = [
        {
            value: 0,
            label: '12AM',
        },
        {
            value: 12.5,
            label: '3AM',
        },
        {
            value: 25,
            label: '6AM',
        },
        {
            value: 37.5,
            label: '9AM',
        },
        {
            value: 50,
            label: '12PM',
        },
        {
            value: 62.5,
            label: '3PM',
        },
        {
            value: 75,
            label: '6PM',
        },
        {
            value: 87.5,
            label: '9PM',
        },
    ];
    const handleTimeChange = (newValue) => {


        let newSliderValue;

        newSliderValue = newValue.hour * 4.17;


        console.log("sliderValue " + sliderValue);
        console.log("newValue.hour " + newValue.hour * 4.17);
        console.log("newSliderValue " + newSliderValue);
        setValue(newValue);
        setSliderValue(newSliderValue);
    };

    const handleSliderChange = (event, newValue) => {
        const hour = Math.floor((newValue * 24) / 100);
        const minute = Math.floor(((newValue * 24) % 100) * 0.6);
        const newTime = currentTime.set({ hour, minute });
        console.log(newValue);
        setSliderValue(newValue);
        setValue(newTime);

    };
    const onStop = (e, data) => {
        // Restrict dragging only in up or down direction
        const deltaX = Math.abs(data.deltaX);
        const deltaY = Math.abs(data.deltaY);
        if (deltaY > deltaX) {
            // Up or down dragging detected
            // Handle your dragging logic here
        }
    };
    return (
        <> 
        <Draggable handle=".handle">


            <div className='container'>
                <div className='container compo'>
                    {/* Content goes here */}
                    <div className="handle drag">
                        <DragIndicatorIcon/>
                    </div>
                        <h3>{props.place}</h3>
                    {/* Time picker here */}
                    <p className='gmt'>GMT {offsetString}</p>
                    <p className='date'>Date: {currentTime.toLocaleString()}</p>
                    <p>{props.timeZone}</p>
                    <div className='picker'>
                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                            <TimePicker
                                label="Check the Time"
                                value={value}
                                onChange={handleTimeChange}
                            />
                        </LocalizationProvider>
                    </div>
                    <Box sx={{ width: 800 }}>
                        <Slider
                            aria-label="Custom marks"
                            //defaultValue={12.5}
                            value={sliderValue}
                            onChange={handleSliderChange}
                            step={4.17}
                            valueLabelDisplay="auto"
                            marks={marks}
                        />
                    </Box>
                </div>
            </div>
        </Draggable>

        </>
    )
}




