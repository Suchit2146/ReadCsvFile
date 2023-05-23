import { useState, useEffect } from 'react';
import Data from "./data.csv"
import './App.css';
import Papa from "papaparse"

function Csv() {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(Data);
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder("utf-8");
            const csvData = decoder.decode(result.value);

            const parseData = Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true
            }).data;
            setData(parseData)

        }
        fetchData()
    }, [])

    return (
        <div className="App">
            {/* <input type="file" accept='.csv' onChange={handleFileUpload} /> */}

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

export default Csv;
