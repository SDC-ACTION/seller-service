/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import $ from 'jquery';
import Sellers from './sellers';

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.productId,
      quotes: [],
      error: null,
    };
  }

  componentDidMount() {
    $.ajax({
      url: 'http://18.220.123.159/api/product/quotes',
      method: 'GET',
      data: {
        productId: this.state.productId,
        sellerLimit: 3,
      },
    })
      .done((priceQuotes) => {
        this.setState({
          quotes: priceQuotes,
        });
      })
      .fail(() => {
        this.setState({
          error: 'Product Not Found.',
        });
      });
  }

  render() {
    if (this.state.error) {
      return <h3>{this.state.error}</h3>;
    }
    if (this.state.quotes.length) {
      const sellerOptions = this.state.quotes[0].seller.map((option) => (
        <Sellers seller={option} key={option.id} />
      ));
      return (
        <div>
          {sellerOptions}
        </div>
      );
    }
    return false;
  }
}

export default Options;
