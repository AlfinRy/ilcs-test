import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import TabDataUtama from './components/TabDataUtama';
// import TabDataEntitas from './components/TabDataEntitas';
// import TabDataPungutan from './components/TabDataPungutan';
import MainComponent from './components/MainComponent';

const App = () => {
	return (
		<BrowserRouter>
			<div className="min-h-screen bg-gray-100 p-6">
				<Routes>
					<Route path="/" element={<MainComponent defaultTab="utama" />} />
					<Route path="/utama" element={<MainComponent />} />
					<Route path="/entitas" element={<MainComponent />} />
					<Route path="/pungutan" element={<MainComponent />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
