import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class ItemEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itemData: {},
			updated: false,
			error: false,
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		axios(`https://new-dolphin-backend.herokuapp.com/items/${id}`)
			.then((json) => {
				this.setState({
					itemData: json.data,
				});
			})
			.catch(() => {
				this.setState({
					error: true,
				});
			});
	}
	handleChange = (event) => {
		event.persist();
		this.setState({
			itemData: {
				...this.state.itemData,
				[event.target.name]: event.target.value,
			},
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const id = this.props.match.params.id;
		axios
			.put(
				`https://new-dolphin-backend.herokuapp.com/items/${id}`,
				this.state.itemData,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `JWT ${localStorage.getItem('token')}`,
					},
				}
			)
			.then((json) => {
				this.setState({
					updated: true,
				});
			})
			.catch(() => {
				this.setState({
					error: true,
				});
			});
	};

	render() {
		if (this.state.error) {
			return <div>Sorry, there seems to be a problem.</div>;
		}

		if (this.state.updated) {
			return <Redirect to={`/item/${this.props.match.params.id}`} />;
		}
		return (
			<div className='form'>
				<h3>Update an item</h3>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						placeholder='Item Name'
						value={this.state.itemData.name}
						name='name'
						onChange={this.handleChange}
						required
						id='name'
					/>
					<label htmlFor='price'>Price</label>
					<input
						type='text'
						placeholder='Price'
						value={this.state.itemData.price}
						name='price'
						onChange={this.handleChange}
						id='price'
					/>
					<label htmlFor='description'>Description</label>
					<input
						type='text'
						placeholder='Description'
						value={this.state.itemData.description}
						name='description'
						onChange={this.handleChange}
						id='description'
					/>
					<label htmlFor='item_photo'>Photo</label>
					<input
						type='text'
						placeholder='Photo'
						value={this.state.itemData.item_photo}
						name='item_photo'
						onChange={this.handleChange}
						id='item_photo'
					/>
					<label htmlFor='category'>Category</label>
					<select
						name='category'
						id='category'
						placeholder='category'
						onChange={this.handleChange}>
						<option
							selected={this.state.itemData.category === 1 ? true : false}
							value='1'>
							Chairs
						</option>
						<option
							selected={this.state.itemData.category === 2 ? true : false}
							value='2'>
							Tables
						</option>
						<option
							selected={this.state.itemData.category === 3 ? true : false}
							value='3'>
							Sofas
						</option>
					</select>
					<button type='submit'>Submit</button>
				</form>
			</div>
		);
	}
}

export default ItemEdit;
