import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { inputFields, selectFields } from '../config/forms/dataUtamaConfig';
import { FormInput, FormSelect } from '../shared/FormComponents';

const TabDataUtama = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const nomor_pengajuan = searchParams.get('nomor_pengajuan');
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [formData, setFormData] = useState(() => {
		const savedData = localStorage.getItem('dataUtamaForm');
		return savedData ? JSON.parse(savedData) : {};
	});

	const generateNomorPengajuan = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');

		// Generate random hex string (6 characters)
		const randomHex = Math.floor(Math.random() * 16777215)
			.toString(16)
			.toUpperCase()
			.padStart(6, '0');

		// Generate sequence number (6 digits)
		const sequence = Math.floor(Math.random() * 999999)
			.toString()
			.padStart(6, '0');

		return `20120B${randomHex}${year}${month}${day}${sequence}`;
	};

	const fetchDataAxios = async () => {
		try {
			setLoading(true);
			const response = await axios.get('http://localhost:3000/api/utama/search?nomor_pengajuan=' + nomor_pengajuan);
			if (response.data.data) {
				setData(response.data.data);
				setFormData(response.data.data);
				localStorage.setItem('dataUtamaForm', JSON.stringify(response.data.data));
			}
			console.log('Fetched data:', response.data);
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
			// setFormData({});
			// localStorage.removeItem('dataUtamaForm');
		}
	}, [nomor_pengajuan]);

	useEffect(() => {
		if (!document.referrer.includes('/entitas') && !document.referrer.includes('/pungutan')) {
			localStorage.removeItem('dataUtamaForm');
		}
	}, []);

	// Input Form Simpan Sementara
	const handleInputChange = (fieldName, value) => {
		let finalValue = value;
		if (fieldName === 'nomor_pengajuan' && !value) {
			finalValue = generateNomorPengajuan();
		}

		const newFormData = {
			...formData,
			[fieldName]: finalValue,
		};
		setFormData(newFormData);
		localStorage.setItem('dataUtamaForm', JSON.stringify(newFormData));
	};

	// Button Tab Navigasi
	const handleButtonClick = (direction) => {
		const currentSearch = location.search;
		if (direction === 'next') {
			navigate(`/entitas${currentSearch}`);
		} else if (direction === 'prev') {
		}
	};

	return (
		<div className="p-6 bg-white rounded-lg shadow-md">
			{loading && <p>Loading...</p>}
			{error && <p className="text-red-500">Error: {error}</p>}
			<form className="space-y-6">
				<div className="grid grid-cols-4 gap-4">
					{inputFields.map((field, index) => (
						<FormInput key={index} field={field} data={data || formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
					))}
				</div>
				<div className="grid grid-cols-3 gap-4">
					{/* <FormSelect field={selectFields[0]} data={formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} selected={formData[selectFields[0].name]} />
					<FormSelect field={selectFields[1]} data={formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} selected={formData[selectFields[1].name]} />
					<FormSelect field={selectFields[2]} data={formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} selected={formData[selectFields[2].name]} /> */}
					{selectFields.map((field, index) => (
						<FormSelect key={index} field={field} data={formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} selected={formData[field.name]} />
					))}
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

export default TabDataUtama;
