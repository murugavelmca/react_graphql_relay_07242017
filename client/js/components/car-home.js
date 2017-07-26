import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

import { insertCar } from '../mutations/insert-car';

import { CarsTableContainer } from './cars-table';
//import { CarHomeContainer } from './car-home';
import { CarForm } from './car-form';

export class CarHome extends React.Component {

  static propTypes = {
    viewer: PropTypes.object,
    relay: PropTypes.object,
  };

  saveCar = car => {

    console.log(this.props);

    insertCar(
      this.props.relay.environment,
      car,
      this.props.viewer.id,
    );

  };

  render() {

    return <div>
      <CarsTableContainer viewer={this.props.viewer} />
      <CarForm onSaveCar={this.saveCar} />
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


