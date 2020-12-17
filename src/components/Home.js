import React, { Component } from 'react';
import axios from 'axios';
import Category from './Category';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryData: [],
		};
	}

	componentDidMount() {
		axios('https://new-dolphin-backend.herokuapp.com/categories/')
			.then((json) => {
				this.setState({
					categoryData: json.data,
				});
			})
			.catch(console.error);
	}

	render() {
		const renderCategory = this.state.categoryData.map((category) => (
			<Category key={category.id} category={category} />
		));
		return <div className='category-list'>{renderCategory}</div>;
	}
}

export default Home;
