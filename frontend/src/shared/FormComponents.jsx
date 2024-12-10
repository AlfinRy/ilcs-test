import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export const FormInput = ({ field, data, disabled = false, onChange, onBlur, isChecked: externalIsChecked }) => {
	const [internalIsChecked, setInternalIsChecked] = useState(() => {
		// Initialize checkbox as checked if the field value is null and has checkbox
		if (field.hasCheckbox && data?.[field.value] === null) {
			return true;
		}
		return externalIsChecked || false;
	});

	// Use external isChecked if provided, otherwise use internal state
	const isChecked = externalIsChecked !== undefined ? externalIsChecked : internalIsChecked;

	const isDisabled = field.hasVdCheckbox ? !isChecked : disabled || (field.hasCheckbox && isChecked);

	const handleCheckboxChange = (e) => {
		if (externalIsChecked === undefined) {
			setInternalIsChecked(e.target.checked);
		}
		if (!e.target.checked && field.hasVdCheckbox) {
			onChange(field.value, '');
		}
	};

	const formatDate = (dateString) => {
		if (!dateString || dateString === null) return '';
		// Convert date string to YYYY-MM-DD format for input[type="date"]
		const date = new Date(dateString);
		return date.toISOString().split('T')[0];
	};

	const getValue = () => {
		const rawValue = data?.[field.value];
		if (rawValue === null || rawValue === undefined) return '';
		return field.type === 'date' ? formatDate(rawValue) : rawValue;
	};

	const handleChange = (e) => {
		if (onChange) {
			onChange(field.value, e.target.value);
		}
	};

	return (
		<div>
			<div className={`flex ${field.hasCheckbox && field.label ? 'justify-between' : 'justify-start'}`}>
				<label className="block text-sm font-medium text-gray-700">{field.label}</label>
				{field.hasCheckbox && (
					<div className="flex justify-end gap-2">
						<input type="checkbox" checked={isChecked} disabled={data?.[field.value] ? true : false} onChange={handleCheckboxChange} />
						<span className="block text-sm font-medium text-gray-700">{field.checkboxLabel}</span>
					</div>
				)}
				{field.hasVdCheckbox && (
					<div className="flex justify-start gap-2">
						<input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
						<label className="block text-sm font-medium text-gray-700">{field.checkboxLabel}</label>
					</div>
				)}
			</div>
			<div className="relative">
				<input type={field.type} value={getValue()} onChange={handleChange} onBlur={(e) => onBlur && onBlur(field.value, e.target.value)} disabled={isDisabled} className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${isDisabled ? 'text-gray-500 bg-gray-200' : 'bg-white'}`} />
				{field.hasSearchButton && (
					<button type="button" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-gray-500 rounded-e-md border">
						<FontAwesomeIcon icon={faMagnifyingGlass} className="h-4 w-4" />
					</button>
				)}
				{/* {field.hasRefreshButton && (
					<button type="button" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-gray-500 rounded-e-md border">
						<FontAwesomeIcon icon={faArrowsRotate} className="h-4 w-4" />
					</button>
				)} */}
			</div>
		</div>
	);
};

export const FormSelect = ({ field, data, disabled = false, onChange, selected }) => {
	const isDisabled = disabled;

	const handleChange = (e) => {
		if (onChange) {
			onChange(field.value, e.target.value);
		}
	};

	return (
		<div>
			<label className="block text-sm font-medium text-gray-700">{field.label}</label>
			<select value={selected || data?.[field.value] || ''} onChange={handleChange} disabled={isDisabled} className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${isDisabled ? 'text-gray-500 bg-gray-200' : 'bg-white'}`}>
				<option value=""></option>
				{field.options.map((option, index) => (
					<option key={index} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
};
