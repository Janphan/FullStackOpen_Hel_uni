import { useState } from "react";
import React from "react";
import { Button as MuiButton, Typography } from "@mui/material";

const getRandomAnecdote = (arr, setSelected) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  setSelected(randomIndex);
};

const Button = ({ handleClick, text }) => (
  <MuiButton onClick={handleClick}>{text}</MuiButton>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const initialVotes = new Array(anecdotes.length).fill(0);
  //Filling an Array with a Single Value

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(initialVotes);

  const handleVoteClick = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
  };

  const mostVotesIndex = votes.indexOf(Math.max(...votes));
  console.log("mostVotesIndex", mostVotesIndex);
  return (
    <>
      <div>
        <Typography variant="h5">Anecdotes of the day</Typography>
        <p>{anecdotes[selected]} </p>
        
        <Button handleClick={handleVoteClick} text="vote" />
        <Button
          handleClick={() => getRandomAnecdote(anecdotes, setSelected)}
          text="Next anecdote"
        />
        <Typography variant="h5">Anecdote with most votes</Typography>
        {anecdotes[mostVotesIndex]}
        <p>has {votes[mostVotesIndex]} votes</p>
      </div>
    </>
  );
};

export default App;
