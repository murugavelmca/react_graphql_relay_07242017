import React from 'react';
import PropTypes from 'prop-types';

export class CarForm extends React.Component {

  static propTypes = {
    onSaveCar: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      model: '',
      make: '',
      color: '',
      price: '',
      year: '',
    };
  }

  onChange = e => {
    this.setState({
      [ e.currentTarget.name ]: e.currentTarget.type === 'number'
        ? Number(e.currentTarget.value)
        : e.currentTarget.value,
    });
  };

  saveCar = () => {
    this.props.onSaveCar({ ...this.state });

    this.setState({
      model: '',
      make: '',
      color: '',
      price: '',
      year: '',
    });
  };

  render() {

    return <form>
      <div>
        <label htmlFor="name-input">Model:</label>
        <input type="text" name="model" id="model-input"
          value={this.state.model} onChange={this.onChange} />
      </div>
      <div>
        <label htmlFor="description-input">Make:</label>
        <input type="text" name="make" id="make-input"
          value={this.state.make} onChange={this.onChange} />
      </div>
      <div>
        <label htmlFor="color-input">Color:</label>
        <input type="text" name="color" id="color-input"
          value={this.state.color} onChange={this.onChange} />
      </div>
      <div>
        <label htmlFor="size-input">Price:</label>
        <input type="text" name="price" id="price-input"
          value={this.state.price} onChange={this.onChange} />
      </div>
      <div>
        <label htmlFor="quantity-input">Year:</label>
        <input type="number" name="year" id="year-input"
          value={this.state.year} onChange={this.onChange} />
      </div>
      <button type="button" onClick={this.saveCar}>Add Car</button>
    </form>;

  }

}

