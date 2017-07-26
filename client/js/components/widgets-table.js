import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import { WidgetsTableRowContainer } from './widgets-table-row';
import { WidgetsTableEditRowContainer } from './widgets-edit-row';

export class WidgetsTable extends React.Component {
  static propTypes = {
    viewer: PropTypes.object,
    onDeleteWidget: PropTypes.func,
    onUpdateWidget: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      editableWidgetId: null
    };
  }

  handleEditWidget(widget) {
    this.setState({
      id: widget.id,
      name: widget.name,
      description: widget.description,
      color: widget.color,
      size: widget.size,
      quantity: widget.quantity
    });
    this.setEditableWidget(widget.id);
  }

  setEditableWidget(widgetId) {
    this.setState({
      editableWidgetId: widgetId
    });
  }

  onChange = e => {
    this.setState({
      [ e.currentTarget.name ]: e.currentTarget.type === 'number'
        ? Number(e.currentTarget.value)
        : e.currentTarget.value,
    });
  };

  handleSaveWidget() {
    console.log(this.state);
    this.props.onUpdateWidget && this.props.onUpdateWidget({
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      color: this.state.color,
      size: this.state.size,
      quantity: this.state.quantity
    });
    this.setEditableWidget(null);
  }

  render() {
    let { editableWidgetId } = this.state;
    return (
      <div>
        <table>
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
            {this.props.viewer.widgets.edges.map(edge => {
              let stateObj = {
                id: this.state.id,
                name: this.state.name,
                description: this.state.description,
                color: this.state.color,
                size: this.state.size,
                quantity: this.state.quantity
              };

              let isEditable = (editableWidgetId === edge.node.id);

              return <WidgetsTableRowContainer key={edge.node.id}
                widget={isEditable ? stateObj : edge.node}
                onDeleteWidget={this.props.onDeleteWidget}
                isEditMode={isEditable}
                onEditWidget={(widget) => this.handleEditWidget(widget)}
                onSaveWidget={() => this.handleSaveWidget()}
                onCancelWidget={() => this.setEditableWidget(null)}
                onTextChange={(e) => this.onChange(e)} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export const WidgetsTableContainer = createFragmentContainer(WidgetsTable, graphql`
  fragment widgetsTable_viewer on Viewer {
    widgets(first: 100) @connection(key: "WidgetsTable_widgets") {
      edges {
        node {
          id
          ...widgetsTableRow_widget
        }
      }
    }
  }
  `);
