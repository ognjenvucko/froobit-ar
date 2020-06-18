import React, { useState } from 'react';
import './App.scss';
import { Button } from '../Button/Button';

export const App = ({ arApp }) => {
	const [ showReact, setShowReact ] = useState(true);
	const [ isARLoading, setARLoading ] = useState(false);
	const onStartArExperience = () => {
		setARLoading(true);
		arApp.init().then(() => {
			setARLoading(false);
		});
		setShowReact(false);
	};
	if (isARLoading) {
		return <div className="init-preview"></div>;
	}
	if (!showReact) {
		return null;
	}
	return (
		<div className="app">
			<div className="app-header">
				<h1>
					AR Frontend
				</h1>
			</div>
			<main className="main-container">
				<Button
					title="Start AR EXPERIENCE"
					onClick={onStartArExperience}
				/>
				<div className="cover" />
			</main>
			<footer></footer>
		</div>
	);
};