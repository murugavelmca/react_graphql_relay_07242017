import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';

import { Viewer, Widget } from '../models/graphql-models';
import { viewerType } from './viewer-type';
import { widgetEdgeType } from '../connection/widgets';
import { widgetType } from '../types/widget-type';
import { insertWidgetType, updateWidgetType } from './widget-input-types';

import { WidgetData } from '../models/widget-data';

export const updateWidgetMutationType = mutationWithClientMutationId({

  name: 'UpdateWidget',

  // input {
  //   widget
  //   clientMutationId  
  // }

  inputFields: () => ({
    widget: { type: updateWidgetType },
    clientMutationId: { type: GraphQLString },
  }),

  mutateAndGetPayload: ({ widget }, { baseUrl }) => {
    const localWidgetId = fromGlobalId(widget.id).id;
    widget.id = localWidgetId ;
    console.log("localWidgetId", localWidgetId);
    const widgetData = new WidgetData(baseUrl);
    return widgetData.update(widget).then(widget => Object.assign(new Widget(), widget));
  },

  outputFields: () => {
    return {
      viewer: {
        type: viewerType,
        resolve: () => Object.assign(new Viewer(), { id: 1 }),
      },
      widget: {
        type: widgetType,
        resolve: (widget) => widget,
      },
    };
  },
});