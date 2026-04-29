import React from 'react'
import styles from './Test.module.css'
import { useEffect } from 'react'

function Test() {
      function printRest (text, ...rest) {
    console.log(text, rest)
  }

  useEffect(() => {
    printRest('안녕하세요', 1, 2, 3, 4)
  })
  return (
    <div>test</div>
  )
}

export default Test