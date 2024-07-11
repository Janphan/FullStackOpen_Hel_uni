import { useState } from "react";
import { Button, Typography } from "@mui/material";

//using Button Mui so rename this as ButtonR
const ButtonR = ({ handleClick, text }) => (
  <Button onClick={handleClick} variant="outlined">
    {text}
  </Button>
)

//component StatisticsLine to display value and text
const StatisticsLine = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}
// a proper place to define a component
const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <>
      <Typography variant="h5" component="h2">
        Statistics
      </Typography>
      <StatisticsLine text="good" value={good}/>
      <StatisticsLine text="neutral" value={neutral}/>
      <StatisticsLine text="bad" value={bad}/>
      <StatisticsLine text="all" value={all}/>
      <StatisticsLine text="average" value={average}/>
      <StatisticsLine text="positive" value={positive}/>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [all, setAll] = useState(0);
  const [positive, setPositive] = useState(0);
  //handle event click
  //display total clicked for each
  const newGood = good + 1;
  const newNeutral = neutral + 1;
  const newBad = bad + 1;
  const newAll = all + 1;

  const handleGoodClick = () => {
    const newPositive = (newGood / newAll) * 100;
    const newAverage = (newGood - bad) / newAll;
    setGood(newGood);
    setAll(newAll);
    setAverage(newAverage);
    console.log("avg", average);
    console.log("New avg", newAverage);
    setPositive(newPositive);
  };
  const handleNeutralClick = () => {
    const newPositive = (good / newAll) * 100;
    const newAverage = (good - bad) / newAll;
    setNeutral(newNeutral);
    setAll(newAll);
    setAverage(newAverage);
    console.log(average);
    setPositive(newPositive);
  };
  const handleBadClick = () => {
    const newPositive = (good / newAll) * 100;
    const newAverage = (good - newBad) / newAll;
    setBad(newBad);
    setAll(newAll);
    setAverage(newAverage);
    console.log(average);
    setPositive(newPositive);
  };

  return (
    <div>
      <Typography variant="h5" component="h2">
        Give feedback
      </Typography>
      <ButtonR handleClick={handleGoodClick} text="good"/>
      <ButtonR handleClick={handleNeutralClick} text="neutral"/>
      <ButtonR handleClick={handleBadClick} text="bad"/>
      {all > 0 ? (
        <Statistics
          good={good}
          bad={bad}
          neutral={neutral}
          all={all}
          average={average}
          positive={positive}
        />
      ) : (
        <Typography variant="h5" component="h2">
          No feedback given
        </Typography>
      )}
    </div>
  );
};

export default App;
