import { GraphQLObjectType } from 'graphql';
import { globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay';

import { nodeInterface } from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';
import { WidgetData } from '../models/widget-data'
import { CarData } from '../models/car-data'


import { Viewer, Widget, Car} from '../models/graphql-models';

import { widgetConnectionType } from '../connection/widgets';
import { carConnectionType } from '../connection/cars';



export const viewerType = new GraphQLObjectType({

  name: 'Viewer',

  fields: () => ({
    id: globalIdField('Viewer'),
    widgets: {
      type: widgetConnectionType,
      args: connectionArgs,
      resolve: (_1,args, { baseUrl }) => {
        const widgetData = new WidgetData(baseUrl);
        return widgetData.all().then(widgets => { 
          const widgetModels = widgets.map( w=>
          Object.assign(new Widget(), w ));
          return connectionFromArray(widgetModels, args);
        });

      },

    },
    cars: {
      type: carConnectionType,
      args: connectionArgs,
      resolve: (_1,args, { baseUrl }) => {
        const carData = new CarData(baseUrl);
        return carData.all().then(cars => { 
          const carModels = cars.map( w=>
          Object.assign(new Car(), w ));
          return connectionFromArray(carModels, args);
        });
      }
    }
  }),

  interfaces: () => [nodeInterface]

});

registerType(Viewer, viewerType, id => Object.assign(new Viewer(), { id, message: 'Hello World', }));
