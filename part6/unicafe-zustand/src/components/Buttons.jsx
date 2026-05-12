import { useCounterStore } from "../store/useCounterStore"

const Buttons = () => {
  const increaseGood = useCounterStore(state => state.increaseGood)
  const increaseNeutral = useCounterStore(state => state.increaseNeutral)
  const increaseBad = useCounterStore(state => state.increaseBad)
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={increaseGood}>good</button>
      <button onClick={increaseNeutral}>neutral</button>
      <button onClick={increaseBad}>bad</button>
    </div>
  )
}

export default Buttons
