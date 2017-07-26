import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation updateWidgetMutation($input: UpdateWidgetInput!) {
    updateWidget(input: $input) {
      widget {
        id
        name
        description
        color
        size
        quantity
      }
      viewer {
        id
      }
    }
  }
`;
const getOptimisticResponse = (widget) => ({
  updateWidget: { widget }
});

export const updateWidget = (environment, widget) => {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {widget}
      },
      optimisticResponse: getOptimisticResponse(widget)
    }
  );
};
