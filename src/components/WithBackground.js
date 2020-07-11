import React from 'react';
import gradientBackground from '../img/bg-gradient.png';

const withBackground = (WrappedComponent) => {
	return (props) => (
		<div style={{ backgroundImage: `url(${gradientBackground})`, height: '100vh', overflow: 'scroll' }}>
			<WrappedComponent {...props} />
		</div>
	);
};

export default withBackground;
