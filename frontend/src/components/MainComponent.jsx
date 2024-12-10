import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import TabDataUtama from './TabDataUtama';
import TabDataEntitas from './TabDataEntitas';
import TabDataPungutan from './TabDataPungutan';

const MainComponent = ({ defaultTab }) => {
	const [activeTab, setActiveTab] = useState(defaultTab || 'dataUtama');
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const nomor_pengajuan = searchParams.get('nomor_pengajuan');

	useEffect(() => {
		if (location.pathname === '/utama') setActiveTab('dataUtama');
		else if (location.pathname === '/entitas') setActiveTab('dataEntitas');
		else if (location.pathname === '/pungutan') setActiveTab('dataPungutan');
	}, [location]);

	const handleTabChange = (tab) => {
		setActiveTab(tab);
		const currentSearch = location.search;

		if (tab === 'dataUtama') navigate(`/utama${currentSearch}`);
		else if (tab === 'dataEntitas') navigate(`/entitas${currentSearch}`);
		else if (tab === 'dataPungutan') navigate(`/pungutan${currentSearch}`);
	};

	return (
		<div className="p-6 bg-white rounded-lg shadow-md">
			{/* Header Data Pemberitahuan */}
			<div className="flex justify-between items-center mb-2">
				<h2 className="text-xl font-bold">Data Pemberitahuan</h2>
				{nomor_pengajuan && (
					<div className="text-sm text-gray-500">
						<span className="font-medium">No Pengajuan :</span> {nomor_pengajuan}
						<span className="font-medium">| KSWP : VALID | Jenis API : 02</span>
					</div>
				)}
			</div>
			<div className="h-1 bg-blue-500 mb-6 w-6 rounded-full"></div>

			{/* Tab Navigasi */}
			<div className="border-b mb-4">
				<ul className="flex text-gray-500 font-medium">
					<li className={`px-4 py-2 border-b-2 cursor-pointer ${activeTab === 'dataUtama' ? 'border-blue-500 text-blue-500' : 'hover:text-blue-500'}`} onClick={() => handleTabChange('dataUtama')}>
						Data Utama
					</li>
					<li className={`px-4 py-2 border-b-2 cursor-pointer ${activeTab === 'dataEntitas' ? 'border-blue-500 text-blue-500' : 'hover:text-blue-500'}`} onClick={() => handleTabChange('dataEntitas')}>
						Data Entitas
					</li>
					<li className={`px-4 py-2 border-b-2 cursor-pointer ${activeTab === 'dataPungutan' ? 'border-blue-500 text-blue-500' : 'hover:text-blue-500'}`} onClick={() => handleTabChange('dataPungutan')}>
						Data Pungutan
					</li>
				</ul>
			</div>

			{/* Tab Content */}
			{activeTab === 'dataUtama' && <TabDataUtama />}
			{activeTab === 'dataEntitas' && <TabDataEntitas />}
			{activeTab === 'dataPungutan' && <TabDataPungutan />}
		</div>
	);
};

export default MainComponent;
