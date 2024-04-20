import React from 'react';
import { useState } from 'react';
import jsonData from './timezones.json';
import TextField from '@mui/material/TextField';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'; // Import DeleteForeverIcon
import './SearchBar.css';
import Zone from './Zone';

export default function List(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [list, setList] = useState([<Zone key={'UTC'} place={'Etc/GMT'} timeZone={'(UTC) Coordinated Universal Time'} />]);
  const timezones = jsonData;

  const lister = (searchTerm) => {
    for (const zone of timezones) {
      if (zone.value === searchTerm) {
        const placesss = zone.utc[0];
        setList((prevList) => [
          ...prevList,
          <Zone key={zone.value} place={placesss} timeZone={zone.value} />,
        ]);
      }
    }
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() !== '') {
      const results = jsonData.filter((item) =>
        item.value.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (value) => {
    setSearchTerm(value);
    setSearchResults([]);
  };

  const handleAdd = () => {
    alert(`Added: ${searchTerm}`);
    lister(searchTerm);
  };

  const handleRemove = (index) => {
    setList((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  };

  return (
    <>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className='search'
        />

        <button className='add btn btn-primary' onClick={handleAdd}><AddCircleOutlineRoundedIcon /></button>

        {searchResults.length > 0 && (
          <div className="dropdown">
            <div className="dropdown-content">
              {searchResults.map((item, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleResultClick(item.value)}
                >
                  <p>{item.value}</p>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        {list.map((zone, index) => (
          <div key={index} className="zone-container">
            {zone}
            <button className='btn btn-primary delete-button' onClick={() => handleRemove(index)}>
              <DeleteForeverIcon />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
