import { GraphQLInputObjectType, GraphQLString, GraphQLInt } from 'graphql';


export const insertCarType = new GraphQLInputObjectType({
  
  name: 'InsertCar',

  fields: () => ({
    make: { type: GraphQLString },
    model: { type: GraphQLString },
    color: { type: GraphQLString },
    price: { type: GraphQLString },
    year: { type: GraphQLInt },
  }),

});