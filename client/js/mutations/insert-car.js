import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation insertCarMutation($input: InsertCarInput!) {
    insertCar(input: $input) {
      viewer {
        id
      }
      carEdge {
        node {
          __typename
          id
          make
          model
          year
          price
          color
        }
        cursor
      }
    }
  }
`;

const sharedUpdater = (source, viewerId, carEdge) => {
  const viewerProxy = source.get(viewerId);
  const conn = ConnectionHandler.getConnection(viewerProxy, 'CarsTable_cars');
  ConnectionHandler.insertEdgeAfter(conn, carEdge);
};

let clientMutationId = 0;

export const insertCar = (environment, car, viewerId) => {

  console.log(environment, car, viewerId);
  return new Promise((resolve, reject) => {

    commitMutation(
      environment,
      {
        mutation,
        variables: {
          input: {
            car,
            clientMutationId: String(clientMutationId++),
          },
        },
        updater: source => {
          const payload = source.getRootField('insertCar');
          const carEdge = payload.getLinkedRecord('carEdge');
          sharedUpdater(source, viewerId, carEdge);
        },
        optimisticUpdater: source => {

          const nodeId = 'client:newCar:' + clientMutationId++;
          const node = source.create(nodeId, 'Car');
          node.setValue(nodeId, 'id');
          node.setValue(car.make, 'make');
          node.setValue(car.model, 'model');
          node.setValue(car.color, 'color');
          node.setValue(car.price, 'price');
          node.setValue(car.year, 'year');

          const carEdgeId = 'client:newEdge:' + clientMutationId++;
          const carEdge = source.create(carEdgeId, 'carEdge');
          carEdge.setLinkedRecord(node, 'node');

          sharedUpdater(source, viewerId, carEdge);
        },
        onCompleted: res => resolve(res),
        onError: err => reject(err),
      });

  });

};

