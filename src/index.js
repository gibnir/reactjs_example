import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';

/*
FilterableProductTable (orange): contains the entirety of the example
SearchBar (blue): receives all user input
ProductTable (green): displays and filters the data collection based on user input
ProductCategoryRow (turquoise): displays a heading for each category
ProductRow (red): displays a row for each product
*/

class ProductRow extends React.Component {
  render() {
    let product = this.props.product;

    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductCategoryRow extends React.Component {
  render() {

    // console.log(this);

    let category = this.props.category;

    return (
      <tr>
        <th colSpan="2">{category}</th>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {

    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    // console.log(this.props.products);

    // const arr = ['a', 'b', 'c'];

    // arr.forEach(function(element) {
    //     console.log(element);
    // });

    this.props.products.forEach((product) => {
      // console.log(product.category);  
      // console.log(product.name);  
      // console.log(product.stocked);  
      // console.log('=======================');
      if (product.name.indexOf(filterText) === -1) {
        console.log(product.name.indexOf(filterText));
        return;
      }

      if (inStockOnly && !product.stocked) {
        return;
      }

      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow 
          category={product.category}
          key={product.category} />
        );
      }

      rows.push(
        <ProductRow
        product={product}
        key={product.name} />
      );

      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }
  
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  
  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  render() {

    let filterText = this.props.filterText;
    let inStockOnly = this.props.inStockOnly;

    // console.log(this);

    return (
      <form>
        <input 
        type="text"
        placeholder="search"
        defaultValue={filterText}
        onChange={this.handleFilterTextChange} ></input>
        <p>
          <input
          type="checkbox"
          checked={inStockOnly}
          onChange={this.handleInStockChange} />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {

    return (
      <div>
        <SearchBar
        filterText={this.state.filterText}
        inStockOnly={this.state.inStockOnly}
        onFilterTextChange={this.handleFilterTextChange}
        onInStockChange={this.handleInStockChange} />
        <ProductTable 
        products={this.props.products}
        filterText={this.state.filterText}
        inStockOnly={this.state.inStockOnly} />
      </div>
      );
  }
}

/*==========================================================*/

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
);

