import React, {Component} from 'react'
import Transcript from './Transcript'
// local imports
import MediaPanel from './catdvComponents/MediaPanel'

export default class TranscriptHighlighter extends Component {
  state = {
    currentTime: 0,
    videoPlayer: {},
  }
  setCurrentTime = (currentTime) => {
    const {videoPlayer} = this.props
    const videoElem = videoPlayer[0]
    videoElem.currentTime = currentTime
  }
  componentDidMount () {
    const {videoPlayer} = this.props
    const videoElem = videoPlayer[0]
    // set state
    this.setState({
      currentTime: videoElem.currentTime
    })
    // set listener
    videoPlayer.on('timeupdate', ()=> this.setState({currentTime: videoElem.currentTime }))
  }
  componentWillUnmount() {
    const {videoPlayer} = this.props
    // remove listener to prevent mem leaks
    videoPlayer.off()
  }
  render () {
    const {
      currentTime,
    } = this.state
    const {
      transciptionObjects
    } = this.props
    return (
      transciptionObjects.map((tObj, key)=>
        <Transcript
          transcript={tObj}
          key={'transcObj' + key}
          currentTime={currentTime}
          jumpTo={this.setCurrentTime}
        />
      )
    )
  }
}
