import { useEffect, useState } from 'react';
import { csv } from 'https://cdn.skypack.dev/d3-fetch@3';

import * as api from '../api';
import ControlPanel from './ControlPanel';
import Viz from './Viz';

export default function App() {
  // Example of how you could fetch data
  // useEffect(() => {
  //   async function fetchData() {
  //     const metadata = await api.fetchMetadata();
  //     const citation = await api.fetchCitation();k=
  //     const data = await api.fetchData({
  //       location_name: ['Belize', 'Venezuela'],
  //       year_name: [1990, 2015],
  //       sex_name: ['Males', 'Females'],
  //     });
  //     console.log({ metadata, citation, data });
  //   }
  //   fetchData();
  // }, []);

  const [allData, setAllData] = useState([]);
  const [sex, setSex] = useState('Females');
  const [year, setYear] = useState(2017);

  useEffect(() => {
    async function fetchData() {
      const allData = await api.fetchCSVData();
      setAllData(allData);
    }
    fetchData();
  }, [])

  const filteredVizData = allData.filter(
    datapoint => {
      
      let sexDatapoint;
      switch (datapoint.sex) {
        case 'Female':
          sexDatapoint = 'Females'
          break;
        case 'Male':
          sexDatapoint = 'Males'
          break;
        case 'Both':
          sexDatapoint = 'Both sexes'
          break;
      } 
      const sexBool = sexDatapoint === sex
      const yearBool = datapoint.year === year
      return sexBool && yearBool
    });

  return (
    <div className="App">
      <ControlPanel setSex={setSex} setYear={setYear} sex={sex} year={year}/>
      {allData.length > 0 ? <Viz filteredVizData={filteredVizData} /> : null}
    </div>
  );
}