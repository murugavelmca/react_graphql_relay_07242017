import React from 'react';
import PropTypes from 'prop-types';
import { insertWidget } from '../mutations/insert-widget';
import { deleteWidget as relayDeleteWidget } from '../mutations/delete-widget';
import { updateWidget as relayUpdateWidget } from '../mutations/update-widget';
import { WidgetsTableContainer } from './widgets-table';
import { WidgetForm } from './widget-form';
import { createFragmentContainer, graphql } from 'react-relay';

export class WidgetHome extends React.Component {
  static propTypes = {
    viewer: PropTypes.object,
    relay: PropTypes.object
  }

  saveWidget = widget => {
    insertWidget(
      this.props.relay.environment,
      widget,
      this.props.viewer.id
    );
  }

  reactDeleteWidget = widgetId => {
    relayDeleteWidget(
      this.props.relay.environment,
      widgetId,
      this.props.viewer.id
    );
  }

  reactUpdateWidget = widget => {
    relayUpdateWidget(
      this.props.relay.environment,
      widget
    );
  }

  render() {
    return (
      <div>
        <WidgetsTableContainer viewer={this.props.viewer}  onDeleteWidget={this.reactDeleteWidget} onUpdateWidget={this.reactUpdateWidget} />
        <WidgetForm onSaveWidget={this.saveWidget} />
      </div>
    );
  }
}

export const WidgetHomeContainer = createFragmentContainer(
  WidgetHome,
  graphql`
    fragment widgetHome_viewer on Viewer {
        id
        ...widgetsTable_viewer
    }
  `
);
