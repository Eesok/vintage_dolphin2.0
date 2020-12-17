import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

class ItemDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			infoData: {},
			detailData: {},
			deleted: false,
			error: false,
		};
	}
	componentDidMount() {
		const id = this.props.match.params.id;
		axios(`https://new-dolphin-backend.herokuapp.com/items/${id}`)
			.then((json) => {
				this.setState({
					infoData: json.data,
				});

				axios(
					`https://new-dolphin-backend.herokuapp.com/details/${this.state.infoData.details}`
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
	onDeleteItem = (event) => {
		const id = this.props.match.params.id;
		const url = `https://new-dolphin-backend.herokuapp.com/items/${id}`;
		axios
			.delete(url, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `JWT ${localStorage.getItem('token')}`,
				},
			})
			.then((res) => {
				this.setState({
					deleted: true,
				});
			})
			.catch(console.error);
	};

	render() {
		if (this.state.deleted) {
			return <Redirect to='/' />;
		}
		if (this.state.error) {
			return <div>Sorry, there was a problem getting the item</div>;
		}
		if (!this.state.infoData || !this.state.detailData) {
			return <div>Loading...</div>;
		}
		const logged_in_item_permissions = (
			<div>
				<button onClick={this.onDeleteItem}>Delete Item</button>
				<button>
					<Link to={`/item/${this.props.match.params.id}/edit`}>
						Update Item
					</Link>
				</button>
			</div>
		);

		const logged_in_details_permissions = (
			<div>
				<button>
					<Link to={`/item/${this.props.match.params.id}/detail-edit`}>
						Update Details
					</Link>
				</button>
			</div>
		);

		return (
			<div>
				<div>{this.props.logged_in ? logged_in_item_permissions : null}</div>
				<h3>{this.state.infoData.name}</h3>
				<h4>${this.state.infoData.price}</h4>
				<p>{this.state.infoData.description}</p>
				<img src={this.state.infoData.item_photo} />
				<div>
					<div>
						{this.props.logged_in ? logged_in_details_permissions : null}
					</div>
					<p>
						<strong>Measurements: </strong>
						{this.state.detailData.measurements}
					</p>
					<p>
						<strong>Brand: </strong>
						{this.state.detailData.brand}
					</p>
					<p>
						<strong>Styles: </strong>
						{this.state.detailData.styles}
					</p>
					<p>
						<strong>Materials: </strong>
						{this.state.detailData.materials}
					</p>
				</div>
			</div>
		);
	}
}
export default ItemDetails;

ItemDetails.propTypes = {
	logged_in: PropTypes.bool.isRequired,
};
