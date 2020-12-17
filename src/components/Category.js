import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Category extends Component {
	render() {
		return (
			<div className='category'>
				<h3>{this.props.category.title}</h3>
				<Link to={'/category/' + this.props.category.id}>
					<img alt='category-pic' src={this.props.category.category_image} />
				</Link>
			</div>
		);
	}
}

export default Category;
