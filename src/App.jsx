import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      console.log("chars", char);
      pass += str.charAt(char);
    }
    console.log(pass);
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToCLipboard = useCallback(() => {
    passwordRef.current?.select()
    console.log(passwordRef);
    window.navigator.clipboard.writeText(password);
  });
  useEffect(() => {
    copyPasswordToCLipboard();
  }, [length]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500 ">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            value={password}
            readOnly
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPasswordToCLipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              className="cursor-pointer"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                id="numberInput"
                defaultChecked={numAllowed}
                className="cursor-pointer"
                onChange={(e) => {
                  setNumAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberIput">Numbers</label>
            </div>
            <div className="flex text-sm gap-x-1">
              <input
                type="checkbox"
                id="characterInput"
                defaultChecked={charAllowed}
                className="cursor-pointer"
                onChange={(e) => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput"> Character Input</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
