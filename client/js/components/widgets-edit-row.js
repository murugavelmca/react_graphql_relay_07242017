import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

export class WidgetsTableEditRow extends React.Component {
  static propTypes = {
    widget: PropTypes.object,
    onDeleteWidget: PropTypes.func,
    onEditWidget: PropTypes.func,
    onSaveWidget: PropTypes.func,
    onCancelWidget: PropTypes.func,
    onTextChange: PropTypes.func
  }

  render() {
    const { widget, onTextChange } = this.props;
    return (
      <tr>
        <td><input type="text" name="name" value={widget.name} onChange={onTextChange} /></td>
        <td><input type="text" name="description" value={widget.description} onChange={onTextChange} /></td>
        <td><input type="text" name="color" value={widget.color} onChange={onTextChange} /></td>
        <td><input type="text" name="size" value={widget.size} onChange={onTextChange} /></td>
        <td><input type="number" name="quantity" value={widget.quantity} onChange={onTextChange} /></td>
        <td>
          <button type="button" onClick={() => this.props.onSaveWidget(this.props.widget.id)}>Save</button>
          <button type="button" onClick={() => this.props.onCancelWidget(this.props.widget.id)}>Cancel</button>
        </td>
        <td><button type="button" onClick={() => this.props.onDeleteWidget(this.props.widget.id)}>Delete</button></td>
      </tr>
    );
  }
}

export const WidgetsTableEditRowContainer = createFragmentContainer(WidgetsTableEditRow, graphql`
  fragment widgetsTableRow_widget on Widget {
    id
    name
    description
    color
    size
    quantity
  }
  `);
