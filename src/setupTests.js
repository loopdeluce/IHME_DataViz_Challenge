// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Data completness check 
    // - used this code in Viz.jsx
    // - finds a name field match between the GBD - IHME data and the geoJSON map data


//   const name = [];
//   const name_en = [];
//   const formal_en = [];
//   const name_ciawf = [];

//   useEffect(() => {
//     for (let i = 0; i < filteredVizData.length; i++) {
//       const vizCountry = filteredVizData[i];
//       const name_enFind = countries.features.find(
//         (country) => vizCountry.location === country.properties.name_en
//       );
//       const formal_enFind = countries.features.find(
//         (country) => vizCountry.location === country.properties.formal_en
//       );
//       const nameFind = countries.features.find(
//         (country) => vizCountry.location === country.properties.name
//       );
//       const name_ciawfFind = countries.features.find(
//         (country) => vizCountry.location === country.properties.name_ciawf
//       );

//       if (name_enFind === undefined) {
//         name_en.push(vizCountry);
//       }
//       if (formal_enFind === undefined) {
//         formal_en.push(vizCountry);
//       }
//       if (nameFind === undefined) {
//         name.push(vizCountry);
//       }
//       if (name_ciawfFind === undefined) {
//         name_ciawf.push(vizCountry);
//       }

//       // }
//     }
//     console.log("name_en:", name_en);
//     console.log("formal_en:", formal_en);
//     console.log("name:", name);
//     console.log("name_ciawf:", name_ciawf);
//   }, [filteredVizData]);