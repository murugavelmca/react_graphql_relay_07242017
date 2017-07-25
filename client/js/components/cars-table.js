import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import { CarsViewRowContainer} from './cars-view-row';

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
            <CarsViewRowContainer key={edge.node.id} car={edge.node} />
          )}
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
        ...carsViewRow_car
      }
    }
  }
}
`);