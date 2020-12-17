import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Credit due to Dakota Lillie @ https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a

function Nav(props) {
	const logged_out_nav = (
		<div>
			<button onClick={() => props.display_form('login')}>Login</button>
		</div>
	);

	const logged_in_nav = (
		<div>
			<button onClick={props.handle_logout}>Logout</button>
			<button>
				<Link to='/items/create'>Create New Item</Link>
			</button>
		</div>
	);
	return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
	logged_in: PropTypes.bool.isRequired,
	display_form: PropTypes.func.isRequired,
	handle_logout: PropTypes.func.isRequired,
};
