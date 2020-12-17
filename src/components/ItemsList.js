import React, { Component } from 'react';
import Item from './Item';
import axios from 'axios';

class ItemsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itemData: [],
			searchValue: '',
		};
	}

	eventHandler = (data) => {
		this.setState({ searchValue: data.searchValue });
	};

	componentDidMount() {
		axios('https://new-dolphin-backend.herokuapp.com/items/')
			.then((json) => {
				let categoryId = this.props.match.params.id;
				let results = json.data.filter((item) => {
					return parseInt(categoryId) === item.category;
				});
				this.setState({
					itemData: results,
				});
			})
			.catch(console.error);
	}
	render() {
		const renderItem = this.state.itemData
			.filter(
				(item) =>
					this.state.searchValue === '' ||
					item.name.toLowerCase().includes(this.state.searchValue.toLowerCase())
			)
			.map((item) => <Item key={item.id} item={item} />);
		return <div className='item-list'>{renderItem}</div>;
	}
}

export default ItemsList;
