import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';

import { CarData } from '../models/car-data';
import { Viewer, Car } from '../models/graphql-models';
import { viewerType } from './viewer-type';
import { carType } from './car-type';

export const deleteCarMutationType = mutationWithClientMutationId({

  name: 'DeleteCar',

  inputFields: {
    carId: { type: GraphQLString },
  },

  outputFields: {
    viewer: {
      type: viewerType,
      resolve: () => Object.assign(new Viewer(), { id: 1 }),
    },
    car: {
      type: carType,
      resolve: (car) => car
    }
  },

  mutateAndGetPayload: ({ carId }, { baseUrl }) => {
    const localCarId = fromGlobalId(carId).id;
    const carData = new CarData(baseUrl);
    return carData.delete(localCarId).then(car => Object.assign(new Car(), car));
  },

});

