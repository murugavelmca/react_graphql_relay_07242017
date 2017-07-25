import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';

export class CarsTable extends React.Component {
  

    static propTypes = {
      viewer: PropTypes.object,
    };
    render(){
      console.log('cars-table', this.props.viewer.cars);
      return <table>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Color</th>
            <th>Price</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {this.props.viewer.cars.edges.map(edge =>
            <tr key={edge.node.id}>
              <td>{edge.node.make}</td>
              <td>{edge.node.model}</td>
              <td>{edge.node.color}</td>
              <td>{edge.node.price}</td>
              <td>{edge.node.year}</td>
            </tr>)}
        </tbody>
      </table>;
    }
}

export const CarsTableContainer = createFragmentContainer(CarsTable, graphql`
fragment carsTable_viewer on Viewer {
  cars (first: 100) @connection (key: "CarsTable_cars"){
    edges{
      node{
        id
        make
        model
        color
        price
        year
      }
    }
  }
}
`);