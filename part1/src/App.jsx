import { useState } from "react";
// import Button from "@mui/material/Button";
import { Button, Typography } from "@mui/material";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  //handle event click
  //display total clicked for each

  const handleGoodClick = () => {
    setGood(good+1)
  };
  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  };
  const handleBadClick = () => {
    setBad(bad+1)
  };
  return (
    <div>
      <Typography variant="h5" component="h2">
        Give feedback
      </Typography>
      <Button onClick={handleGoodClick} variant="outlined">good</Button>
      <Button onClick={handleNeutralClick} variant="outlined">neutral</Button>
      <Button onClick={handleBadClick} variant="outlined">bad</Button>
      <Typography variant="h5" component="h2">
        Statistics
      </Typography>
      <p>good {good}</p> 
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};

export default App;
