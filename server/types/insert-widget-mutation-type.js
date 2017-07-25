import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId, offsetToCursor } from 'graphql-relay';

import { Viewer, Widget } from '../models/graphql-models';
import { viewerType } from './viewer-type';
import { widgetEdgeType } from '../connection/widgets';
import { insertWidgetType } from './widget-input-types';

import { WidgetData } from '../models/widget-data';

export const insertWidgetMutationType = mutationWithClientMutationId({

  name: 'InsertWidget',

  // input {
  //   widget
  //   clientMutationId  
  // }

  inputFields: () => ({
    widget: { type: insertWidgetType },
    clientMutationId: { type: GraphQLString },
  }),

  mutateAndGetPayload: ({ widget }, { baseUrl }) => {
    const widgetData = new WidgetData(baseUrl);
    return widgetData.insert(widget).then(widget => Object.assign(new Widget(), widget));
  },

  outputFields: () => {

    return {
      viewer: {
        type: viewerType,
        resolve: () => Object.assign(new Viewer(), { id: 1 }),
      },
      widgetEdge: {
        type: widgetEdgeType,
        resolve: (widget, _1, { baseUrl}) => {
          const widgetData = new WidgetData(baseUrl);
          return widgetData.all().then(widgets => {
            const widgetIndex = widgets.findIndex(w => w.id === widget.id);
            return {
              cursor: offsetToCursor(widgetIndex),
              node: widget,
            };
          });
        },
      },
    };
  },
});