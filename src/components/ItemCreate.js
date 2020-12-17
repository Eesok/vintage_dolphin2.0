import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class ItemCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itemData: {},
			error: false,
			createdId: null,
		};
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
		axios({
			url: 'https://new-dolphin-backend.herokuapp.com/items/',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `JWT ${localStorage.getItem('token')}`,
			},
			data: this.state.itemData,
		})
			.then((json) => {
				this.setState({
					createdId: json.data.id,
				});
			})
			.catch(() => {
				this.setState({ error: true });
			});
	};

	render() {
		const { createdId } = this.state;
		if (createdId) {
			return <Redirect to={`/item/${createdId}`} />;
		}
		return (
			<div className='form'>
				<h2>Create an Item</h2>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor='name'>Name: </label>
					<input
						placeholder='Item Name'
						name='name'
						onChange={this.handleChange}
						required
						id='name'
					/>
					<label htmlFor='price'>Price: </label>
					<input
						placeholder='Price'
						name='price'
						required
						onChange={this.handleChange}
						id='price'
					/>
					<label htmlFor='description'>Description: </label>
					<input
						placeholder='Description'
						name='description'
						required
						onChange={this.handleChange}
						id='description'
					/>
					<label htmlFor='item_photo'>Photo: </label>
					<input
						placeholder='Photo'
						name='item_photo'
						required
						onChange={this.handleChange}
						id='item_photo'
					/>
					<label htmlFor='category'>Category: </label>
					<select
						defaultValue='DEFAULT'
						name='category'
						id='category'
						onChange={this.handleChange}>
						<option value='DEFAULT' disabled hidden>
							Select an Option
						</option>
						<option value='1'>Chairs</option>
						<option value='2'>Tables</option>
						<option value='3'>Sofas</option>
					</select>
					<button type='submit'>Submit</button>
				</form>
			</div>
		);
	}
}

export default ItemCreate;
