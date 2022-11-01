import { useCallback} from 'react';
import { SexControl, YearControl }  from './controls';

import './ControlPanel.css';

export default function ControlPanel({ setSex, setYear, sex, year}) {

  const handelSexChange = useCallback(
    (nextValue) => {
      console.log(nextValue)
      setSex(nextValue);
    },
    [setSex],
  );

  const handelYearChange = useCallback(
    (nextValue) => {
      console.log(nextValue);
      setYear(parseInt(nextValue));
    },
    [setYear],
  );

  return (
    <div className="control-panel">
      <SexControl value={sex} onChange={handelSexChange} />
      <YearControl max={2017} min={1990} value={year} onChange={handelYearChange} />
    </div>
  );
}
