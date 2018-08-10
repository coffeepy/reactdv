import React, { Component } from 'react'
import ReactTable from 'react-table'
import {Doughnut} from 'react-chartjs-2'
import TranscriptHighlighter from './TranscriptHighlighter'
import MediaPanel from './catdvComponents/MediaPanel'
import {PageContext} from '../index.js'


const styleSheet = {
  main: {
    display: 'flex',
    // flex: 1,
  },
  table: {
    // flex: '1 500px'
    minWidth: 800,
  },
  chart: {
    // flex: '1 100px'
  },
  transcript: {
    // flex: '1 900px'
    maxWidth: 500,
  },
  button: {
    height: 20,
    width: 20,
    background: "#4e4ed3",
    border: "#22229a",
    textAlign: "center",
    color: "white",
  }
}

export default class App extends Component {
  state = {
    clips: [],
    clipsModel: undefined,
    selectedClipModel: undefined,
    selectedClipData: undefined,
    videoPlayer: undefined,
    showTable: true,
    clipTypeData: {
      datasets: [],
      labels: [],
    },
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
    ],
  }
  onClipLoad = (data) => {
    const {backgroundColor} = this.state
    const clipTypesObj = this.clipsByTypeWithCount(data.items)
    const labels = Object.keys(clipTypesObj)
    const chartData = labels.map((label) => clipTypesObj[label])

    this.setState((prevState) =>({
      clips: data.items,
      clipTypeData: {
        ...prevState.clipTypeData,
        labels,
        datasets: [{data: chartData, backgroundColor}],
      }
    }))

  }
  clipsByTypeWithCount = (clips) => {
    // reduces clips to an object with the
    // type and count, returns object like
    //  {
    //    audio: 17,
    //    image: 20,
    //    ...
    //  }
    return clips.reduce( (clipTypes, clip) => {
      if (clip.type in clipTypes) {
        clipTypes[clip.type]++
      }
      else {
        clipTypes[clip.type] = 1
      }
      return clipTypes
    }
    , {})
  }
  getData = (clipsModel) => {
    return clipsModel.getData(clipsModel.currentClipQuery || '', this.onClipLoad)
  }
  onTableRowClick = (rowInfo) => {
    const {selectedClipModel, videoPlayer} = this.state
    // set the selected model, this is taken from data on the rowInfo props
    // passed in from the React Table
    rowInfo.original.transcript =
      rowInfo.original.userFields['nsa-dev.aws.transcript']
        ? JSON.parse(rowInfo.original.userFields['nsa-dev.aws.transcript'])
        : undefined

    this.setState({selectedClipData: rowInfo.original})
    // set selected clip and then add video player
    selectedClipModel.setSelectedClips([rowInfo.original.ID], () =>
      !videoPlayer && this.setState({videoPlayer: $('.player > .videoPlayer')})
    )
    // alert('clicked')
    // toggleTable viz
    this.toggleTableVisibility()
  }
  toggleTableVisibility = () => {
    this.setState((prevState)=> ({showTable: !prevState.showTable }))
  }
  componentDidMount () {
    let {page, defaultModel, selectedClipModel} = this.props
    const clipsModel = page.getClipsModel(defaultModel)
    selectedClipModel = page.getSelectedClipsModell(selectedClipModel)
    window.appPage = page
    window.clipsModel = clipsModel
    // set default clipsModel, selectedClipModel
    this.setState({clipsModel, selectedClipModel})
    // make query to clips
    this.getData(clipsModel)
    // setup listener
    clipsModel.onQueryChanged(() => this.getData(clipsModel))
  }
  render () {
    const {
      clips,
      clipTypeData,
      selectedClipData,
      videoPlayer,
      showTable,
    } = this.state
    const columns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Catalog',
        accessor: 'catalog.name'
      },
    ]
    return (
      <div style={styleSheet.main}>
        <button
          style={styleSheet.button}
          onClick={this.toggleTableVisibility}>
          {

              showTable ? "-" : "+"
          }

        </button>
          {
              showTable &&
                <div style={styleSheet.table}>
                    <ReactTable
                      data={clips}
                      columns={columns}
                      className={"-striped -highlight"}
                       getTrProps={(state, rowInfo, column) => ({onClick: () => this.onTableRowClick(rowInfo)})}
                    />
                </div>
          }
        {/* <div style={styleSheet.chart}>
          <Doughnut data={clipTypeData}/>
        </div> */}
        <div style={styleSheet.chart}>
          <MediaPanel
            page={this.props.page}
            selectedClipModel={this.props.selectedClipModel}
          />
        </div>
        <div style={styleSheet.transcript}>
          <h3>Follow Along with the Video</h3>
          <div>
            { videoPlayer && selectedClipData && selectedClipData.transcript &&
                <TranscriptHighlighter
                  videoPlayer={videoPlayer}
                  transciptionObjects={ selectedClipData.transcript.results.items}
                />
            }
          </div>
        </div>
      </div>
    )
  }
}
