import React, {Component} from 'react'

const styleSheet = {
  highlight: {
    background: 'yellow',
  },
  default: {
    margin: 4,
    cursor: 'pointer',
  }
}

const highlight = (props) => {
    const {currentTime, transcript} = props
    const {start_time, end_time} = transcript
    if (currentTime >= start_time && currentTime <= end_time ) {
      return true
    }
    return false
  }

export default function Transcript(props) {
    const {
      transcript,
      currentTime,
      jumpTo
    } = props

    return (
        <span
          onClick={()=> jumpTo(transcript.start_time)}
          style={highlight(props) ? styleSheet.highlight : styleSheet.default}
          >{transcript.alternatives[0].content} </span>
    )
}
