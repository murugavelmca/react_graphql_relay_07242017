import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

import { insertCar } from '../mutations/insert-car';

import { insertCar as relayInsertCar } from '../mutations/insert-car';
import { deleteCar as relayDeleteCar } from '../mutations/delete-car';

import { CarsTableContainer } from './cars-table';
//import { CarHomeContainer } from './car-home';
import { CarForm } from './car-form';

export class CarHome extends React.Component {

  static propTypes = {
    viewer: PropTypes.object,
    relay: PropTypes.object,
  };

  reactInsertCar = car => {
    relayInsertCar(
      this.props.relay.environment,
      car,
      this.props.viewer.id,
    );
  };

reactDeleteCar = carId => {
     relayDeleteCar(
       this.props.relay.environment,
       carId,
      this.props.viewer.id,
     );
   }

  render() {

    return <div>
      <CarsTableContainer viewer={this.props.viewer} onDeleteCar={this.reactDeleteCar} />
      <CarForm onSaveCar={this.reactInsertCar} />
    </div>;

  }
}

export const CarHomeContainer = createFragmentContainer(
  CarHome,
  graphql`
    fragment carHome_viewer on Viewer {
      id
      ...carsTable_viewer
    }
  `,
);


