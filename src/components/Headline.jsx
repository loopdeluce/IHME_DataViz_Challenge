import './Headline.css'

export default function Headline() {
    return (
      <div className="headline">
        <h2 className="title">
          Populations Affected by Opiod Use Disorder over Time (years){" "}
        </h2>
        <p className='description'> This map highlights populations affected by opiod use disorder over the past three decades. This view shows by country, sex, and year the average number of deaths per 100,000 people.</p>
        <p className="citation">
          Data source: Global Burden of Disease Study 2017 Results and Institute for Health Metrics and Evaluation, 2018
        </p>
      </div>
    );
}