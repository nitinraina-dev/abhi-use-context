import { useContext } from 'react'
import { CollegeContext } from './CollegeContext'
export default function CompA() {
    const {joke}=useContext(CollegeContext);
  return (
    <div>
        <h1>Joke of the day</h1>
        {joke.category && <h2>Category: {joke.category}</h2>}
    </div>
  )
}
