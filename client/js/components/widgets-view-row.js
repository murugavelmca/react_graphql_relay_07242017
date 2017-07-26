import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';

export class WidgetsViewRow extends React.Component {

    static propTypes = {
      widget: PropTypes.object,
      onDeleteWidget: PropTypes.func,
    };

    render() {
      return <tr>
        <td>{this.props.widget.name}</td>
        <td>{this.props.widget.description}</td>
        <td>{this.props.widget.color}</td>
        <td>{this.props.widget.size}</td>
        <td>{this.props.widget.quantity}</td>
        <td><button type="button"
        onClick={() => this.props.onDeleteWidget(this.props.widget.id)}>
          Delete
       </button></td>
      </tr>;
    }

}

export const WidgetsViewRowContainer = createFragmentContainer(WidgetsViewRow, graphql`
fragment widgetsViewRow_widget on Widget {
        id
        name
        description
        color
        size
        quantity
  }
`);
