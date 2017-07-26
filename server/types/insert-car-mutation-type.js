import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId, offsetToCursor } from 'graphql-relay';

import { Viewer, Car } from '../models/graphql-models';
import { viewerType } from './viewer-type';
import { carEdgeType } from '../connection/cars';
import { insertCarType } from './car-input-types';

import { CarData } from '../models/car-data';

export const insertCarMutationType = mutationWithClientMutationId({

  name: 'InsertCar',

  // input {
  //   car
  //   clientMutationId  
  // }

  inputFields: () => ({
    car: { type: insertCarType },
    clientMutationId: { type: GraphQLString },
  }),

  mutateAndGetPayload: ({ car }, { baseUrl }) => {
    const carData = new CarData(baseUrl);
    return carData.insert(car).then(car => Object.assign(new Car(), car));
  },

  outputFields: () => {

    return {
      viewer: {
        type: viewerType,
        resolve: () => Object.assign(new Viewer(), { id: 1 }),
      },
      carEdge: {
        type: carEdgeType,
        resolve: (car, _1, { baseUrl}) => {
          const carData = new CarData(baseUrl);
          return carData.all().then(cars => {
            const carIndex = cars.findIndex(w => w.id === car.id);
            return {
              cursor: offsetToCursor(carIndex),
              node: car,
            };
          });
        },
      },
    };
  },
});