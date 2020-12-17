import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
	render() {
		return (
			<div className='item'>
				<h3>{this.props.item.name}</h3>
				<Link to={'/item/' + this.props.item.id}>
					<img alt='item-pic' src={this.props.item.item_photo} />
				</Link>
			</div>
		);
	}
}

export default Item;
