import React, { Component } from 'react'
import ReactTable from 'react-table'
import {Doughnut} from 'react-chartjs-2'



export default class App extends Component {
  state = {
    clips: [],
    model: null,
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
  // addClips = (data) => {
  //   this.setState({clips: data.items})
  // }
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
  componentDidMount () {
    const {page, defaultModel} = this.props
    console.log(defaultModel);
    const model = page.getClipsModel(defaultModel)
    console.log('model', model)
    window.appPage = page
    // set default model
    this.setState({model})
    // make query to clips
    model.getData('', this.onClipLoad)
  }
  render () {
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
      <div>
        <div>
          <ReactTable
            data={this.state.clips}
            columns={columns}
          />
        </div>
        <div>
          <Doughnut data={this.state.clipTypeData}/>
        </div>
      </div>
    )
  }
}
