import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';


import { WidgetsViewRowContainer} from './widgets-view-row';

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
         <WidgetsViewRowContainer key={edge.node.id} widget={edge.node} />
       )}
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
        ...widgetsViewRow_widget
      }
    }
  }
}
`);


