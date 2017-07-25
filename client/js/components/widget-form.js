import React from 'react';
import PropTypes from 'prop-types';

export class WidgetForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      color: '',
      size: '',
      quantity: 0,
    };
  }

  onChange = e => {
    this.setState({
      [ e.currentTarget.name ]: e.currentTarget.type === 'number'
        ? Number(e.currentTarget.value)
        : e.currentTarget.value,
    });
  };

  saveWidget = () => {

  };

  render() {

    return <form>
      <div>
        <label htmlFor="name-input">Name:</label>
        <input type="text" name="name" id="name-input"
          value={this.state.name} onChange={this.onChange} />
      </div>
      <div>
        <label htmlFor="description-input">Description:</label>
        <input type="text" description="description" id="description-input"
          value={this.state.description} onChange={this.onChange} />
      </div>
      <div>
        <label htmlFor="color-input">Color:</label>
        <input type="text" color="color" id="color-input"
          value={this.state.color} onChange={this.onChange} />
      </div>
      <div>
        <label htmlFor="size-input">Size:</label>
        <input type="text" size="size" id="size-input"
          value={this.state.size} onChange={this.onChange} />
      </div>
      <div>
        <label htmlFor="quantity-input">Quantity:</label>
        <input type="number" quantity="quantity" id="quantity-input"
          value={this.state.quantity} onChange={this.onChange} />
      </div>
      <button type="button" onClick={this.saveWidget}>Add Widget</button>
    </form>;

  }

}