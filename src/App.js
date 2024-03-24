// App.js

import React, { useState, useRef, useCallback } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()-=_+";

    let chars = lowercaseChars + uppercaseChars;
    if (includeNumbers) chars += numbers;
    if (includeSpecialChars) chars += specialChars;

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }
    setPassword(newPassword);
  }, [length, includeNumbers, includeSpecialChars]);

  const handleCopyToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand("copy");
    }
  };

  return (
    <div className="App">
      <h1>Secure Password Generator</h1>
      <div className="options">
        <label>Password Length:</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
        />
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSpecialChars}
            onChange={(e) => setIncludeSpecialChars(e.target.checked)}
          />
          Include Special Characters
        </label>
      </div>
      <button onClick={generatePassword}>Generate Password</button>
      <div className="password">
        <input type="text" value={password} ref={passwordRef} readOnly />
        <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
      </div>
    </div>
  );
}

export default App;
