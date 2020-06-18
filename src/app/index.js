import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App/App';

export const startReactFrontend = (props) => {
	ReactDOM.render(
		<App {...props} />,
		document.getElementById('app-root'),
	);
};