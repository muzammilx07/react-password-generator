import React, { useState } from 'react';
import '../css/passwordgenerator.css';

const numbersList = '0123456789';
const symbolsList = '~`!@#$%^&*()_-+={[}]|';
const upperCaseLettersList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
const lowerCaseLettersList = 'abcdefghijklmnopqrstuvwxyz';

function PasswordGenerator() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [showPassword, setShowPassword] = useState('');

  const createPassword = () => {
    let characterList = '';
    
    if (includeNumbers) {
      characterList += numbersList;
    }
    if (includeSymbols) {
      characterList += symbolsList;
    }
    if (includeUppercase) {
      characterList += upperCaseLettersList;
    }
    if (includeLowercase) {
      characterList += lowerCaseLettersList;
    }

    let tempPass = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characterList.length);
      tempPass += characterList.charAt(randomIndex);
    }

    setShowPassword(tempPass);
  };

  const handleRangeChange = (event) => {
    setPasswordLength(event.target.value);
  };
  const copyPassword = async () => {
    const copiedText = await navigator.clipboard.readText();
    if(showPassword) {
    navigator.clipboard.writeText(showPassword);
    }
}

  return (
    <div className="main">
      <h1 className="title">Password Generator</h1>
      <div className="password-box">
        <div className="pass-box-copy">
          <input
            type="text"
            placeholder="Click Generate to get a password."
            value={showPassword}
            readOnly
          />
          <img src="../copyicon.png" className='copy-png' onClick={copyPassword}/>
        </div>
      </div>
      <div className="customization">
        <div className="range-box">
          <p className="raneno">{passwordLength}</p>
          <input
            type="range"
            name="passwordLength"
            id="passwordLength"
            min={8}
            max={60}
            value={passwordLength}
            onChange={handleRangeChange}
          />
        </div>
        <div className="check-boxes">
          <div>
            <input
              type="checkbox"
              name="uppercase"
              id="uppercase"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            <label htmlFor="uppercase">Upper Case Letters</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="lowercase"
              id="lowercase"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
            />
            <label htmlFor="lowercase">Lower Case Letters</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="symbols"
              id="symbols"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            <label htmlFor="symbols">Symbols</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="numbers"
              id="numbers"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            <label htmlFor="numbers">Numbers</label>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className="copypass" onClick={copyPassword}>Copy</button>
        <button className="generate" onClick={createPassword}>
          Generate
        </button>
      </div>
    </div>
  );
}

export default PasswordGenerator;
