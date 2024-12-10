import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { inputFields, selectFields } from '../config/forms/dataEntitasConfig';
import { FormInput, FormSelect } from '../shared/FormComponents';

const TabDataEntitas = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const nomor_pengajuan = searchParams.get('nomor_pengajuan');
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [formData, setFormData] = useState(() => {
		// if (document.referrer.includes('/utama') || document.referrer.includes('/pungutan')) {
		// 	const savedData = localStorage.getItem('dataEntitasForm');
		// 	return savedData ? JSON.parse(savedData) : {};
		// }
		// return {};
		const savedData = localStorage.getItem('dataEntitasForm');
		return savedData ? JSON.parse(savedData) : {};
	});

	const fetchDataAxios = async () => {
		try {
			setLoading(true);
			// First, get the utama data to get the id_aju
			const utamaResponse = await axios.get('http://localhost:3000/api/utama/search?nomor_pengajuan=' + nomor_pengajuan);

			if (utamaResponse.data.data) {
				// Then use the id_aju to get the entitas data
				const entitasResponse = await axios.get('http://localhost:3000/api/entitas/search?id_aju=' + utamaResponse.data.data.id_aju);
				if (entitasResponse.data.data) {
					setData(entitasResponse.data.data);
					setFormData(entitasResponse.data.data);
					localStorage.setItem('dataEntitasForm', JSON.stringify(entitasResponse.data.data));
				}
				console.log('Fetched data Entitas:', entitasResponse.data);
			}
		} catch (err) {
			setError(err.message);
			console.error('Error fetching data:', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (nomor_pengajuan) {
			fetchDataAxios();
		} else {
			setData(null);
			setError(null);
		}
	}, [nomor_pengajuan]);

	useEffect(() => {
		if (!document.referrer.includes('/utama') && !document.referrer.includes('/pungutan')) {
			localStorage.removeItem('dataEntitasForm');
		}
	}, []);

	// Input Form Simpan Sementara
	const handleInputChange = (fieldName, value) => {
		const newFormData = {
			...formData,
			[fieldName]: value,
		};
		setFormData(newFormData);
		localStorage.setItem('dataEntitasForm', JSON.stringify(newFormData));
	};

	// Button Tab Navigasi
	const handleButtonClick = (direction) => {
		const currentSearch = location.search;
		if (direction === 'next') {
			navigate(`/pungutan${currentSearch}`);
		} else if (direction === 'prev') {
			navigate(`/utama${currentSearch}`);
		}
	};

	return (
		<div>
			{loading && <p>Loading...</p>}
			{error && <p className="text-red-500">Error: {error}</p>}
			<form className="space-y-6">
				<div className="grid grid-cols-4 gap-4">
					<div className="relative">
						<FormSelect field={selectFields[0]} data={nomor_pengajuan ? data : formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
					</div>
				</div>
				<hr />

				<div>
					<h3 className="text-lg font-bold mb-2">Pengusaha</h3>
					<div className="h-1 bg-blue-500 w-6 rounded-full"></div>
				</div>

				<div className="grid grid-cols-3 gap-4">
					<FormSelect field={selectFields[1]} data={nomor_pengajuan ? data : formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
					<FormInput field={inputFields[0]} data={nomor_pengajuan ? data : formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
					<FormInput field={inputFields[1]} data={nomor_pengajuan ? data : formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
				</div>

				<div className="grid grid-cols-3 gap-4">
					<FormInput field={inputFields[2]} data={data || formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
					<div className="col-span-2">
						<FormInput field={inputFields[3]} data={data || formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
					</div>
				</div>

				<div className="grid grid-cols-5 gap-4">
					<FormSelect field={selectFields[2]} data={data || formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
					<FormInput field={inputFields[4]} data={data || formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
					<FormInput field={inputFields[5]} data={data || formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
					<FormInput field={inputFields[6]} data={data || formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
					<FormInput field={inputFields[7]} data={data || formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
				</div>

				<div className="grid grid-cols-3 gap-4">
					<FormInput field={inputFields[8]} data={data || formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
					<FormInput field={inputFields[9]} data={data || formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
					<FormSelect field={selectFields[3]} data={data || formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
				</div>

				<div className="flex justify-center space-x-4">
					<button type="button" className="px-4 py-2 font-medium outline outline-gray-500 rounded-md hover:text-white hover:bg-gray-500 ease-in-out" onClick={() => handleButtonClick('prev')}>
						Sebelumnya
					</button>
					<button type="button" onClick={() => handleButtonClick('next')} className="px-4 py-2 font-medium outline outline-blue-500 rounded-md hover:text-white hover:bg-blue-600">
						Selanjutnya
					</button>
				</div>
			</form>
		</div>
	);
};

export default TabDataEntitas;
