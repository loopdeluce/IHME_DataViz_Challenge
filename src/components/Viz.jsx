import './Viz.css';
import React, {useState} from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, GeoJSON, Polygon, Tooltip } from 'react-leaflet'
import countries from '../dataCopy/custom.geo.json';

export default function Viz({ filteredVizData }) {
  // TODO : Visualize the data!
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipContent, setTooltipContent] = useState(null);

  const countryNameMap = {
    "United States of America": "United States",
    "People's Republic of China": "China",
    "North Macedonia": "Macedonia",
    "Ivory Coast": "Cote d'Ivoire",
    "United States Virgin Islands": "Virgin Islands, U.S.",
    "São Tomé and Príncipe": "Sao Tome and Principe",
    "East Timor": "Timor-Leste",
    "Mauritania": "Mauritius",
    "Russia": "Russian Federation",
    "Eswatini": "Swaziland",
    "Republic of the Congo": "Congo"
  };
  const colors = [
    "#ffffcc",
    "#c7e9b4",
    "#7fcdbb",
    "#41b6c4",
    "#2c7fb8",
    "#253494",
  ];
  const dataRange = [0, 0.33, 1, 3, 9, 18, 100];

  const remapCountryName = (countryName) => {
    if (countryName in countryNameMap) {
      return countryNameMap[countryName];
    }
    return countryName;
  };

  const findCountryDetails = (countryName) => {
    const countryDetails = filteredVizData.find(
      (country) => country.location === countryName
    );
    return countryDetails;
  }

  const chooseColor = (countryName) => {
    countryName = remapCountryName(countryName);
    const countryDetails = findCountryDetails(countryName);

    if (countryDetails === undefined) {
      return "#d9d9d9";
    }

    for (let i = 0; i < dataRange.length; i++) {
      if (parseFloat(countryDetails.mean) < dataRange[i]) {
        return colors[i - 1];
      }
    }
  };

  const style = (feature) => {
    let countryColor = {
      fillColor: chooseColor(feature.properties.name_en),
      fillOpacity: 0.9,
      color: "#888",
      opacity: 1,
      weight: 1,
    };

    if (hoveredCountry && feature.properties.name_en === hoveredCountry.properties.name_en) {
      countryColor.fillOpacity = 1;
      countryColor.color = "#444";
      countryColor.weight = 2;
    }
      
    return countryColor;
  };

  const setHoveredLayer = (e) => {
    let layer = e.target;
    layer.bringToFront();
    setTooltipContent(findCountryDetails(remapCountryName(layer.feature.properties.name_en)));
    setHoveredCountry(layer.feature);
  };

  const resetHoveredLayer = (e) => {
    setHoveredCountry(null);
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: setHoveredLayer,
      mouseout: resetHoveredLayer,
    });
  };

  return (
    <>
      <div id="map">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={2}
          scrollWheelZoom={true}
          minZoom={2}
          zoomSnap={0.5}
          mouseBoundsViscosity={0}
          maxBounds={[
            [85, -210],
            [-85, 210],
          ]}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON data={countries} style={style} onEachFeature={onEachFeature}>
            <Tooltip sticky>
              {hoveredCountry ? (
                <>
                  <span>{tooltipContent.location}</span>
                  <br />
                  Average opiod use disorder
                  <br />
                  deaths per 100K people:{" "}
                  <span>
                    {Math.round(parseFloat(tooltipContent.mean) * 100) / 100}
                  </span>
                </>
              ) : null}
            </Tooltip>
          </GeoJSON>
        </MapContainer>
      </div>
    </>
  );
}
