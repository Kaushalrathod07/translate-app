import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState("hi");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const translate = () => {

    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    axios.post('https://libretranslate.de/translate',params, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res=>{
      console.log(res.data)
      setOutput(res.data.translatedText)
    })
  };
  useEffect(() => {
    axios
      .get("https://libretranslate.com/languages", {
        headers: { accept: "application/json" },
      })
      .then((res) => {
        console.log(res);
        setOptions(res.data);
      });
  });

  // curl -X 'GET' \
  // 'https://libretranslate.com/languages' \
  // -H 'accept: application/json'

  return (
    <div className="App">
      <b className="text-white mr-3">FROM :</b>
      <select className="bg-white text-black p-2 rounded-md font-bold mr-2 md:w-32 lg:w-48 mb-5 mt-3" onChange={(e) => setFrom(e.target.value)}>
        {options.map((opt) => (
          <option className="focus:bg-white" key={opt.code} value={opt.code}>
            {opt.name}
          </option>
        ))}
      </select>
      <b className="text-white mr-2">TO :</b>
      <select className="bg-white text-black p-2 rounded-md font-bold  md:w-32 lg:w-48" onChange={(e) => setTo(e.target.value)}>
        {options.map((opt) => (
          <option key={opt.code} value={opt.code}>
            {opt.name}
          </option>
        ))}
      </select>
      <div>
        <textarea className=" p-2.5 text-sm text-gray-900 xl:w-80  md:w-32 lg:w-48 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name=""
          id=""
          cols="50"
          rows="8"
          onInput={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div>
        <textarea className=" p-2.5  text-sm text-gray-900 xl:w-80 md:w-32 lg:w-48 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  cols="50" rows="8" value={output}></textarea>
      </div>
      <div>
        <button className="bg-blue-500 rounded-md p-5" onClick={e=>translate()}>Translate</button>
      </div>
    </div>
  );
}

export default App;
