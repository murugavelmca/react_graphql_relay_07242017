import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from '../environment';
import { WidgetHomeContainer } from './widget-home';
import { CarHomeContainer } from './car-home';

//import { CarsTableContainer } from './cars-table';

export class HomePage extends React.Component {

  render() {
    return <section>
      <QueryRenderer
        environment={environment}
        query={graphql`
          query homePageQuery {
            viewer {
              id
              ...widgetHome_viewer
              ...carHome_viewer
            }
          }
        `}
        variables={{}}
        render={({ error, props, retry }) => {
          
          if (error) {
            //console.log(error);
            return <div>
              <h1>Error Loading</h1>
              <button type="button" onClick={() => retry()}>Retry</button>
            </div>;

          } else if (props) {
            //console.log("widgets="+props.viewer.widgets.edges.length);
            //console.log("cars="+props.viewer.cars.edges.length);
            return <div>             
              <WidgetHomeContainer viewer={props.viewer} />
              <CarHomeContainer viewer={props.viewer} />
            </div>;

          } else {
            return <div>Loading Home Page...</div>;

          }
        }}
      />
    </section>;
  }

}