import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class DetailEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itemData: {},
			detailData: {},
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
				axios(
					`https://new-dolphin-backend.herokuapp.com/details/${this.state.itemData.details}`
				).then((json) => {
					this.setState({
						detailData: json.data,
					});
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
		let newObj = this.state.detailData;
		newObj[event.target.name] = event.target.value;
		this.setState({
			detailData: {
				...newObj,
			},
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const detailId = this.state.itemData.details;
		axios({
			url: `https://new-dolphin-backend.herokuapp.com/details/${detailId}`,
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `JWT ${localStorage.getItem('token')}`,
			},
			data: this.state.detailData,
		})
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
				<h3>Update a detail</h3>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor='measurements'>Measurements:</label>
					<input
						type='text'
						placeholder='Item Measurements'
						value={this.state.detailData.measurements}
						name='measurements'
						onChange={this.handleChange}
						required
						id='measurements'
					/>
					<label htmlFor='materials'>Materials:</label>
					<input
						type='text'
						placeholder='Materials'
						value={this.state.detailData.materials}
						name='materials'
						onChange={this.handleChange}
						id='materials'
					/>
					<label htmlFor='styles'>Styles:</label>
					<input
						type='text'
						placeholder='Styles'
						value={this.state.detailData.styles}
						name='styles'
						onChange={this.handleChange}
						id='styles'
					/>
					<label htmlFor='brand'>Brand:</label>
					<input
						type='text'
						placeholder='Brand'
						value={this.state.detailData.brand}
						name='brand'
						onChange={this.handleChange}
						id='brand'
					/>

					<button type='submit'>Submit</button>
				</form>
			</div>
		);
	}
}

export default DetailEdit;
