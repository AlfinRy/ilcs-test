export const selectFields = [
	{
		label: 'Incoterm *',
		name: 'ur_incoterm',
		value: 'ur_incoterm',
		options: ['Cost and Freight', 'Cost, Insurance and Freight', 'Carriage and Insurance Paid to', 'Carriage Paid To', 'Delivered At Frontier', 'Delivered At Place', 'Delivered At Terminal', 'Delivered Duty Paid', 'Delivered Duty Unpaid', 'Delivered Ex Quay', 'Delivered Ex Ship', 'Ex Works', 'Free Alongside Ship', 'Free Carrier', 'Free on Board', 'LAINNYA'],
	},
	{
		label: 'Valuta *',
		name: 'ur_valuta',
		value: 'ur_valuta',
		options: ['US Dollar', 'Euro', 'UAE Dirham', 'Rupiah', 'Saudi Riyal'],
	},
	{
		label: 'Asuransi Bayar di',
		name: 'ur_asuransi',
		value: 'ur_asuransi',
		options: ['Luar Negeri', 'Dalam Negeri'],
	},
	{
		label: 'Flag Kontainer *',
		name: 'ur_flag_curah',
		value: 'ur_flag_curah',
		options: ['Kontainer', 'Non Kontainer'],
	},
];

export const inputFields = [
	{
		label: 'Kurs',
		name: 'nilai_kurs',
		value: 'nilai_kurs',
		type: 'text',
		hasRefreshButton: true,
		disabled: true,
	},
	{
		label: 'Nilai *',
		name: 'nilai_incoterm',
		value: 'nilai_incoterm',
		type: 'text',
	},
	{
		label: 'Biaya Tambahan',
		name: 'biaya_tambahan',
		value: 'biaya_tambahan',
		type: 'text',
	},
	{
		label: 'Biaya Pengurang',
		name: 'biaya_pengurang',
		value: 'biaya_pengurang',
		type: 'text',
	},
	{
		// label: 'Voluntary Declaration',
		name: 'tarif_vd',
		value: 'tarif_vd',
		type: 'text',
		hasVdCheckbox: true,
		checkboxLabel: 'Voluntary Declaration',
		disabledByDefault: true,
	},
	{
		label: 'Nilai FOB',
		value: 'nilai_fob',
		type: 'text',
	},
	{
		label: 'Asuransi',
		value: 'nilai_asuransi',
		type: 'text',
	},
	{
		label: 'Freight',
		value: 'freight',
		type: 'text',
	},
	{
		label: 'CIF',
		value: 'nilai_pabean',
		type: 'text',
		disabled: true,
	},
	{
		label: 'CIF Rp',
		value: 'nilai_pabean_idr',
		type: 'text',
		disabled: true,
	},
	{
		label: 'Bruto',
		value: 'berat_kotor',
		type: 'text',
	},
	{
		label: 'Netto',
		value: 'berat_bersih',
		type: 'text',
	},
];
