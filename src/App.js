import React, {useState, useEffect} from "react";
import axios from "axios";
import "./App.css";


// 1st way - from json file inside src
import userjsonData from "./local-json/users.json";

// 2nd way - from js file inside src
import { usersjsExpArrayData } from "./local-json/users.js";  // makesure you have this variable "usersjsExpArrayData" in Users.js file

export default function App() {
   //1. const and methods
   //2. useEffect( call methods );
   //3. return( <div> </div> );

  const [usersjson, setUsers] = useState([]);
  const [usersjsExp, setUsersJS] = useState([]);
  const [usersaxios, setUsersAxios] = useState([]);
  const [usersaxiosEXT, setUsersAxiosEXT] = useState([]);

  useEffect(() => 
  {
    setUsers(userjsonData);
    setUsersJS(usersjsExpArrayData);

    // 3rd way - uisng axios to load the file
    axios
    .get("./data.json")
    .then((res) => setUsersAxios(res.data))
    .catch(err=>console.log(err))

      // 4rd way - uisng axios to load EXTERENAL file  
      //open a new terminal
      //> npm install -g json-server
      //> json-server --watch src/local-json/usersjsonsrv.json --port 3009
      axios
      .get("http://localhost:3009/users")
      .then((res) => setUsersAxiosEXT(res.data))
      .catch(
          err=>console.log(err)
          )
  

  },[]);

  return (
    <div className="App">
      <h1>Fetch data in different ways </h1>
      <hr />
      <div className="title-text"><strong>users</strong>(<i>JSON data from users.json file inside "src/local-json" folder</i>)</div>
      {usersjson &&
        usersjson?.map(({ name, id }) => (
          <div key={id} className="list-row">
            <strong>{name}</strong>
          </div>
        ))}

        <hr />

        <div className="title-text"><strong>users</strong> (<i>JSON Exported data from users.js file inside "src/local-json" folder</i>)</div>
        {usersjsExp &&
        usersjsExp?.map(({ name, id }) => (
          <div key={id} className="list-row">
            <strong>{name}</strong>
          </div>
        ))}

        <hr />

        <div className="title-text"><strong>users</strong> (<i>JSON data from data.json inside public folder using react API call(fetch / axios)</i>)</div>
        {usersaxios &&
        usersaxios?.map(({ name, id }) => (
          <div key={id} className="list-row">
            <strong>{name}</strong>
          </div>
        ))}

        <hr />

        <div className="title-text"><strong>users</strong> (<i>JSON data from users.json running in external host and consuming using react API call(fetch / axios)</i>)</div>
        {usersaxiosEXT &&
        usersaxiosEXT?.map(({ name, id }) => (
          <div key={id} className="list-row">
            <strong>{name}</strong>
          </div>
        ))}

       <hr />
    </div>
  );
}