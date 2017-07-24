import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';

import { Car } from '../models/graphql-models';
import { CarData } from '../models/car-data';

export const carType = new GraphQLObjectType({

  name: 'Car',

  fields: () => ({
    id: globalIdField('Car'),
    
      make: { type: GraphQLString },
      model: { type: GraphQLString },
      color: { type: GraphQLString },
      price: { type: GraphQLFloat },
      year: { type: GraphQLInt }

  }),

  interfaces: () => [nodeInterface]

});

const carData = new CarData('http://localhost:3010/cars');

registerType(Car, carType, id => {
  return carData.one(id).then(car => Object.assign(new Car(),car));
});

  //Object.assign(new Widget(), { id, message: 'Hello World', }));
