import { useState } from 'react';
import './App.css';
import Papa from "papaparse"

function App() {
  const [data, setData] = useState([])

  const handleFileUpload = (e) => {
    // console.log(e);
    const file = e.target.files[0]
    // console.log(file);
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        // console.log(results.data);
        setData(results.data)
      },
    })
  }

  return (
    <div className="App">
      <input type="file" accept='.csv' onChange={handleFileUpload} />

      {data.length ? (
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              
              <tr key={index}>
                <td>{row.Name}</td>
                <td>{row.Age}</td>
                <td>{row.Salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      <br /><br />
    </div>
  );
}

export default App;
