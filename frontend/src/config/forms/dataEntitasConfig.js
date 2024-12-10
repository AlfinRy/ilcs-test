export const inputFields = [
	{ label: 'NIB *', value: 'nib', type: 'text', hasCheckbox: true, checkboxLabel: 'Tanpa NIB' },
	{ label: 'No Identitas *', value: 'nomor_identitas', type: 'text', hasSearchButton: true },
	{ label: 'No Identitas (16 Digit)', value: 'no_identitas_16', type: 'text' },
	{ label: 'Nama Perusahaan', value: 'nama_identitas', type: 'text' },
	{ label: 'Kota / Kabupaten *', value: 'kota_identitas', type: 'text' },
	{ label: 'Kecamatan *', value: 'kecamatan', type: 'text' },
	{ label: 'Kode Pos *', value: 'kode_pos', type: 'text' },
	{ label: 'RT / RW *', value: 'rt_rw', type: 'text' },
	{ label: 'Telephone *', value: 'tlp_identitas', type: 'text' },
	{ label: 'Email *', value: 'email_identitas', type: 'email' },
];

export const selectFields = [
	{
		label: 'Jenis Pemberitahuan *',
		name: 'ur_entitas_pemberitahu',
		value: 'ur_entitas_pemberitahu',
		options: ['IMPORTIR', 'EKSPORTIR', 'PENGUSAHA', 'PPJK', 'PEMASOK', 'PEMBELI', 'PEMILIK', 'PENERIMA', 'PENGIRIM', 'PENJUAL', 'PEMUSATAN'],
	},
	{
		label: 'Jenis Identitas *',
		name: 'ur_jenis_identitas',
		value: 'ur_jenis_identitas',
		options: ['PASPOR', 'KTP', 'LAINNYA', 'NPWP 15 DIGIT', 'NPWP 16 DIGIT'],
	},
	{
		label: 'Provinsi *',
		name: 'provinsi_identitas',
		value: 'provinsi_identitas',
		options: ['JAWA TIMUR', 'JAWA TENGAH', 'JAWA BARAT', 'BALI', 'BANTEN', 'DKI JAKARTA', 'DI YOGYAKARTA', 'GORONTALO', 'KALIMANTAN BARAT', 'KALIMANTAN TIMUR', 'KALIMANTAN TENGAH', 'KALIMANTAN UTARA', 'KEPULAUAN BANGKA BELITUNG', 'KEPULAUAN RIAU', 'LAMPUNG', 'MALUKU', 'MALUKU UTARA', 'NUSA TENGGARA BARAT', 'NUSA TENGGARA TIMUR', 'PAPUA', 'PAPUA BARAT', 'SULAWESI BARAT', 'SULAWESI SELATAN', 'SULAWESI TENGAH', 'SULAWESI TENGGARA', 'SULAWESI UTARA', 'SUMATERA BARAT', 'SUMATERA SELATAN', 'SUMATERA UTARA'],
	},
	{
		label: 'Status *',
		name: 'status',
		value: 'status',
		options: ['AEO', 'NON AEO', 'Validasi', 'Non Validasi'],
	},
];
