import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from '../environment';

export class HomePage extends React.Component {

  render() {
    return <section>
      <QueryRenderer
        environment={environment}
        query={graphql`
          query homePageQuery {
            viewer {
              id
              widgets{
                edges {
                  node {
                    id
                    name
                    description
                    color
                    size
                    quantity
                  }
                }
              }
            }
          }
        `}
        variables={{}}
        render={({ error, props, retry }) => {
          
          if (error) {
            return <div>
              <h1>Error Loading</h1>
              <button type="button" onClick={() => retry()}>Retry</button>
            </div>;

          } else if (props) {
            //console.log(props.viewer.widgets.edges.length);
             return <div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {props.viewer.widgets.edges.map(edge =>
                    <tr key={edge.node.id}>
                      <td>{edge.node.name}</td>
                      <td>{edge.node.description}</td>
                      <td>{edge.node.color}</td>
                      <td>{edge.node.size}</td>
                      <td>{edge.node.quantity}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>;

          } else {

            return <div>Loading Home Page...</div>;

          }
        }}
      />
    </section>;
  }

}