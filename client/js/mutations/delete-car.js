import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation deleteCarMutation($input: DeleteCarInput!) {
    deleteCar(input: $input) {
      viewer {
        id
      }
      car {
        id
        model
        make
        color
        price
        year
      }
    }
  }
`;


const sharedUpdater = (source, viewerId, deleteCarId) => {

  const viewerProxy = source.get(viewerId);
  const conn = ConnectionHandler.getConnection(viewerProxy, 'CarsTable_cars');
  ConnectionHandler.deleteNode(conn, deleteCarId);
};


let clientMutationId = 0;

export const deleteCar = (environment, carId, viewerId) => {

  return new Promise((resolve, reject) => {

    commitMutation(
      environment,
      {
        mutation,
        variables: {
          input: {
            carId,
            clientMutationId: String(clientMutationId++),
          }
        },
        updater: source => {
          const payload = source.getRootField('deleteCar');
          const car = payload.getLinkedRecord('car');
          sharedUpdater(source, viewerId, car.getValue('id'));
        },
        optimisticUpdater: source => {
          sharedUpdater(source, viewerId, carId);
        },
        onCompleted: res => resolve(res),
        onError: err => reject(err),
      });

  });

};

