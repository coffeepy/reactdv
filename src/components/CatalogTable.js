import React, { Component } from 'react'
import ReactTable from 'react-table'
import PropTypes from 'prop-types'

const styleSheet = {
  table: {
    // flex: '1 500px'
    minWidth: 800,
  },
}

export default class CatalogTable extends Component {
  render() {
    const {
      clips,
      onTableRowClick,
      reactTableProps,
    } = this.props

    const columns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Catalog',
        accessor: 'catalog.name'
      }
    ]

    return (
      <div style={styleSheet.table}>
          <ReactTable
            data={clips}
            columns={columns}
            className={"-striped -highlight"}
            getTrProps={(state, rowInfo) => ({onClick: () => onTableRowClick(rowInfo)})}
            {...reactTableProps}
          />
      </div>
    )
  }

}

CatalogTable.propTypes = {
    clips: PropTypes.array.isRequired,
    onTableRowClick: PropTypes.func.isRequired,
    reactTableProps: PropTypes.object,
}
