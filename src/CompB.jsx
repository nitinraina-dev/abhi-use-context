import React from 'react'
import { useContext } from 'react'
import { CountContext } from './Components/CountContext'
export function CompB() {
  const {count,setCount} = useContext(CountContext)
  return (
    <div>{count}</div>
  )
}

export default CompB