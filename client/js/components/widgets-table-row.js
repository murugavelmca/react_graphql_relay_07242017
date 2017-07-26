import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

export class WidgetsTableRow extends React.Component {
  static propTypes = {
    widget: PropTypes.object,
    onDeleteWidget: PropTypes.func,
    onEditWidget: PropTypes.func,
    onSaveWidget: PropTypes.func,
    onCancelWidget: PropTypes.func,
    isEditMode: PropTypes.bool,
    onTextChange: PropTypes.func
  }

  render() {
    const { widget, isEditMode, onTextChange } = this.props;
    return (
      isEditMode ?
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
        :
        <tr>
          <td>{widget.name}</td>
          <td>{widget.description}</td>
          <td>{widget.color}</td>
          <td>{widget.size}</td>
          <td>{widget.quantity}</td>
          <td>
            <button type="button" onClick={() => this.props.onEditWidget(this.props.widget)}>Edit</button>
          </td>
          <td><button type="button" onClick={() => this.props.onDeleteWidget(this.props.widget.id)}>Delete</button></td>
        </tr>
    );
  }
}

export const WidgetsTableRowContainer = createFragmentContainer(WidgetsTableRow, graphql`
  fragment widgetsTableRow_widget on Widget {
    id
    name
    description
    color
    size
    quantity
  }
  `);
