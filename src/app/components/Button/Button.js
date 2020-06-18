import React from 'react';
import { NoopFunc } from '../../lib/utils';
import './Button.scss';

export const Button = ({
	title = 'Click me',
	onClick = NoopFunc,
}) => {
	return (
		<button
			type="button"
			className="button button--primary"
			onClick={onClick}
		>
			{title}
		</button>
	);
};