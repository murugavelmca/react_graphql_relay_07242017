import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';

export class WidgetsTable extends React.Component {
  

    static propTypes = {
      viewer: PropTypes.object,
    };
    render(){
      console.log('widgets-table', this.props.viewer.widgets);
          return <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.viewer.widgets.edges.map(edge =>
                    <tr key={edge.node.id}>
                      <td>{edge.node.name}</td>
                      <td>{edge.node.description}</td>
                      <td>{edge.node.color}</td>
                      <td>{edge.node.size}</td>
                      <td>{edge.node.quantity}</td>
                    </tr>)}
                </tbody>
              </table>;
  }
}

export const WidgetsTableContainer = createFragmentContainer(WidgetsTable, graphql`
fragment widgetsTable_viewer on Viewer {
  widgets (first: 100) @connection (key: "WidgetsTable_widgets"){
    edges{
      node{
        id
        name
        description
        color
        size
        quantity
      }
    }
  }
}
`);