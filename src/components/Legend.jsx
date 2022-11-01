import './Legend.css'
import Control from "react-leaflet-custom-control"

export default function Legend({ dataRange, colors }) {
  const legendData = [];
  const createLegendFoundation = () => {
    for (let i = 0; i < colors.length; i++) {
      let dict;
      if (i === colors.length - 1) {
        dict = {
          range: 'No Data',
          color: colors[i]
        }
      } else if (i === colors.length - 2) {
        dict = {
          range: "18+",
          color: colors[i]
        }
      } else {
        dict = {
          range: dataRange[i].toString() + " - " + (dataRange[i + 1] - 0.01).toString(),
          color: colors[i]
        }
      }
      legendData.push(dict);
    }
  };
  createLegendFoundation();
    
  const legend = legendData.map((item) => {
    return (
      <tr className="legend_row" key={item.range}>
        <td><i style={{ backgroundColor: item.color }}></i></td>
        <td>{item.range}</td>
      </tr>
    )
  })

  return (
    <Control position="topright">
      <div className="legend">
        <h4>
        Average Opiod Use Disorder <br/> Deaths per 100K people
        </h4>
        <table>
          <tbody>
            {legend}    
          </tbody>
        </table>
      </div>
    </Control>
  );
}