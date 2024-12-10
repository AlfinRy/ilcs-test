import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { inputFields, selectFields } from '../config/forms/dataPungutanConfig';
import { FormInput, FormSelect } from '../shared/FormComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faEquals, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const TabDataPungutan = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const nomor_pengajuan = searchParams.get('nomor_pengajuan');
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [formData, setFormData] = useState(() => {
		const savedData = localStorage.getItem('dataPungutanForm');
		return savedData ? JSON.parse(savedData) : {};
	});

	const fetchDataAxios = async () => {
		try {
			setLoading(true);
			const utamaResponse = await axios.get('http://localhost:3000/api/utama/search?nomor_pengajuan=' + nomor_pengajuan);

			if (utamaResponse.data.data) {
				const pungutanResponse = await axios.get('http://localhost:3000/api/pungutan/search?id_aju=' + utamaResponse.data.data.id_aju);
				if (pungutanResponse.data.data) {
					setData(pungutanResponse.data.data);
					setFormData(pungutanResponse.data.data);
					localStorage.setItem('dataPungutanForm', JSON.stringify(pungutanResponse.data.data));
				}
				console.log('Fetched data Pungutan:', pungutanResponse.data);
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
			setFormData({});
			localStorage.removeItem('dataPungutanForm');
		}
	}, [nomor_pengajuan]);

	useEffect(() => {
		if (!document.referrer.includes('/utama') && !document.referrer.includes('/entitas')) {
			localStorage.removeItem('dataPungutanForm');
			setFormData({});
		}
	}, []);

	const fetchKurs = async () => {
		try {
			const response = await axios.get('http://localhost:3000/api/kurs/latest');
			const kursValue = response.data.nilai_kurs;

			const formattedKurs = parseFloat(kursValue).toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});

			setFormData((prevData) => ({
				...prevData,
				nilai_kurs: formattedKurs,
			}));
		} catch (error) {
			console.error('Error fetching Kurs:', error);
		}
	};

	useEffect(() => {
		fetchKurs();
	}, []);

	// Input Form Simpan Sementara
	const handleInputChange = (fieldName, value) => {
		let newFormData = {
			...formData,
			[fieldName]: value,
		};

		if (['nilai_incoterm', 'biaya_tambahan', 'biaya_pengurang', 'tarif_vd', 'nilai_asuransi', 'freight', 'nilai_kurs'].includes(fieldName)) {
			const nilai = parseFloat(newFormData.nilai_incoterm?.replace(/,/g, '')) || 0;
			const biayaTambahan = parseFloat(newFormData.biaya_tambahan?.replace(/,/g, '')) || 0;
			const biayaPengurang = parseFloat(newFormData.biaya_pengurang?.replace(/,/g, '')) || 0;
			const vd = parseFloat(newFormData.tarif_vd?.replace(/,/g, '')) || 0;
			const kurs = parseFloat(newFormData.nilai_kurs?.replace(/,/g, '')) || 0;

			// Menghitung Nilai FOB
			const nilaiFOB = nilai + biayaTambahan - biayaPengurang + vd;
			newFormData.nilai_fob = nilaiFOB.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});

			// Menghitung Nilai CIF
			const asuransi = parseFloat(newFormData.nilai_asuransi?.replace(/,/g, '')) || 0;
			const freight = parseFloat(newFormData.freight?.replace(/,/g, '')) || 0;
			const nilai_pabean = nilaiFOB + asuransi + freight;
			newFormData.nilai_pabean = nilai_pabean.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});

			// Menghitung CIF dalam Rupiah
			const nilai_pabean_idr = nilai_pabean * kurs;
			newFormData.nilai_pabean_idr = nilai_pabean_idr.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});
		}

		setFormData(newFormData);
		localStorage.setItem('dataPungutanForm', JSON.stringify(newFormData));
	};

	// Function format input number
	const handleBlur = (fieldName, value) => {
		const numericFields = ['nilai_incoterm', 'biaya_tambahan', 'biaya_pengurang', 'tarif_vd', 'nilai_asuransi', 'freight'];

		if (numericFields.includes(fieldName)) {
			const numValue = parseFloat(value.replace(/,/g, '')) || 0;

			// If the value is 0, set it to empty string
			if (numValue === 0) {
				handleInputChange(fieldName, '');
				return;
			}

			const formattedValue = numValue.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});

			handleInputChange(fieldName, formattedValue);
		}
	};

	// Button Tab Navigasi
	const handleButtonClick = (direction) => {
		const currentSearch = location.search;
		if (direction === 'next') {
			// navigate(`/pungutan${currentSearch}`);
		} else if (direction === 'prev') {
			navigate(`/entitas${currentSearch}`);
		}
	};

	const handleSubmitAll = async () => {
		try {
			setLoading(true);

			const dataUtama = JSON.parse(localStorage.getItem('dataUtamaForm') || '{}');
			const dataEntitas = JSON.parse(localStorage.getItem('dataEntitasForm') || '{}');
			const dataPungutan = formData;

			const utamaResponse = await axios.post('http://localhost:3000/api/utama', dataUtama);

			// if (!utamaResponse.data || !utamaResponse.data.success) {
			// 	throw new Error('Failed to submit Data Utama');
			// }

			const id_aju = utamaResponse.data.data.id_aju;

			const entitasResponse = await axios.post('http://localhost:3000/api/entitas', {
				...dataEntitas,
				id_aju,
			});

			// if (!entitasResponse.data || !entitasResponse.data.success) {
			// 	throw new Error('Failed to submit Data Entitas');
			// }

			const pungutanResponse = await axios.post('http://localhost:3000/api/pungutan', {
				...dataPungutan,
				id_aju,
			});

			// if (!pungutanResponse.data || !pungutanResponse.data.success) {
			// 	throw new Error('Failed to submit Data Pungutan');
			// }

			localStorage.removeItem('dataUtamaForm');
			localStorage.removeItem('dataEntitasForm');
			localStorage.removeItem('dataPungutanForm');

			alert('Semua data berhasil disimpan!');
			navigate('/utama');
		} catch (error) {
			console.error('Error submitting forms:', error);
			alert(`Gagal menyimpan data: ${error.message}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-6 bg-white rounded-lg shadow-md">
			{loading && <p>Loading...</p>}
			{error && <p className="text-red-500">Error: {error}</p>}
			<form className="space-y-6">
				<div className="grid grid-cols-3 gap-4">
					<FormSelect field={selectFields[0]} data={nomor_pengajuan ? data : formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
					<FormSelect field={selectFields[1]} data={nomor_pengajuan ? data : formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
					<div className="flex gap-2">
						<div className="flex-1">
							<FormInput field={inputFields[0]} data={nomor_pengajuan ? data : formData} disabled={inputFields[0].disabled} onChange={handleInputChange} />
						</div>
						<button type="button" onClick={() => fetchKurs()} className="self-end text-sm font-medium h-[42px] text-white bg-gray-500 px-3 rounded-md hover:bg-gray-600">
							<FontAwesomeIcon icon={faArrowsRotate} className="h-4 w-4" />
						</button>
					</div>
				</div>

				<div className="grid grid-cols-5 gap-4">
					<div className="flex items-center gap-2">
						<FormInput field={inputFields[1]} data={nomor_pengajuan ? data : formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} onBlur={handleBlur} />
						<div className="flex justify-center items-center pl-5 pt-5">
							<FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
						</div>
					</div>
					<div className="flex items-center gap-2">
						<FormInput field={inputFields[2]} data={nomor_pengajuan ? data : formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} onBlur={handleBlur} />
						<div className="flex justify-center items-center pl-5 pt-5">
							<FontAwesomeIcon icon={faMinus} className="h-3 w-3" />
						</div>
					</div>
					<div className="flex items-center gap-2">
						<FormInput field={inputFields[3]} data={nomor_pengajuan ? data : formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} onBlur={handleBlur} />
						<div className="flex justify-center items-center pl-5 pt-5">
							<FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
						</div>
					</div>
					<div className="flex items-center gap-2">
						<FormInput field={inputFields[4]} data={nomor_pengajuan ? data : formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} onBlur={handleBlur} />
						<div className="flex justify-center items-center pl-5 pt-5">
							<FontAwesomeIcon icon={faEquals} className="h-3 w-3" />
						</div>
					</div>
					<FormInput field={inputFields[5]} data={nomor_pengajuan ? data : formData} disabled onChange={handleInputChange} onBlur={handleBlur} />
				</div>

				<div className="grid grid-cols-3 gap-4">
					<FormSelect field={selectFields[2]} data={nomor_pengajuan ? data : formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
					<FormInput field={inputFields[6]} data={nomor_pengajuan ? data : formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} onBlur={handleBlur} />
					<FormInput field={inputFields[7]} data={nomor_pengajuan ? data : formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} onBlur={handleBlur} />
				</div>

				<div className="grid grid-cols-5 gap-4">
					<FormInput field={inputFields[8]} data={nomor_pengajuan ? data : formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} onBlur={handleBlur} />
					<FormInput field={inputFields[9]} data={nomor_pengajuan ? data : formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} onBlur={handleBlur} />
					<FormInput field={inputFields[10]} data={nomor_pengajuan ? data : formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} onBlur={handleBlur} />
					<FormInput field={inputFields[11]} data={nomor_pengajuan ? data : formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} onBlur={handleBlur} />
					<FormSelect field={selectFields[3]} data={nomor_pengajuan ? data : formData} disabled={!!nomor_pengajuan} onChange={handleInputChange} />
				</div>

				<div className="mt-4 flex flex-col items-center space-y-4">
					<div className="flex justify-between gap-2">
						<button type="button" className="bg-yellow-400 font-medium text-gray-700 py-2 px-4 rounded-md hover:bg-yellow-500">
							Kelengkapan Data
						</button>
						<button type="button" className="bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900" onClick={handleSubmitAll} disabled={loading}>
							{loading ? 'Menyimpan...' : 'Simpan'}
						</button>
					</div>
					<div className="flex justify-center gap-2">
						<button type="button" onClick={() => handleButtonClick('prev')} className="px-4 py-2 font-medium outline outline-gray-500 rounded-md hover:text-white hover:bg-gray-500 ease-in-out">
							Sebelumnya
						</button>
						<button type="button" onClick={() => handleButtonClick('next')} className="px-4 py-2 font-medium outline outline-blue-500 rounded-md hover:text-white hover:bg-blue-600">
							Selanjutnya
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default TabDataPungutan;
