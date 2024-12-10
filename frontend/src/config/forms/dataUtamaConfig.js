export const inputFields = [
	{ label: 'Nomor Pengajuan', value: 'nomor_pengajuan', type: 'text' },
	{ label: 'Tanggal Pengajuan', value: 'tanggal_pengajuan', type: 'date' },
	{ label: 'Nomor Pendaftaran', value: 'nomor_pendaftaran', type: 'text' },
	{ label: 'Tanggal Pendaftaran', value: 'tanggal_pendaftaran', type: 'date' },
];

export const selectFields = [
	{
		label: 'Kantor Pabean *',
		name: 'ur_pabean_asal',
		value: 'ur_pabean_asal',
		options: ['KPU TANJUNG PRIOK', 'KPU BATAM', 'KPU TIPE B BATAM', 'KPU TANJUNG EMAS', 'KPU SOEKARNO HATTA'],
	},
	{
		label: 'SKEP Fasilitas',
		name: 'kd_skep_fasilitas',
		value: 'kd_skep_fasilitas',
		options: ['Kawasan Berikat', 'Gudang Berikat', 'Kemudahan Impor Tujuan Ekspor'],
	},
	{
		label: 'Jenis PIB *',
		name: 'jenis_pib',
		value: 'jenis_pib',
		options: ['Biasa', 'Berkala', 'Penyelesaian'],
	},
	{
		label: 'Jenis Impor *',
		name: 'kd_jenis_impor',
		value: 'kd_jenis_impor',
		options: ['UNTUK DIPAKAI', 'SEMENTARA', 'LANJUTAN', 'DITIMBUN', 'RE-EKSPOR'],
	},
	{
		label: 'Cara Pembayaran *',
		name: 'ur_cara_bayar',
		value: 'ur_cara_bayar',
		options: ['BIASA/TUNAI', 'BERKALA', 'DENGAN JAMINAN', 'PERHITUNGAN KEMUDIAN', 'KONSINYASI (CONSIGNMENT)', 'USANCE LETTER OF CREDIT', 'RED CLAUSE LETTER OF CREDIT', 'INTER-COMPANY ACCOUNT', 'GABUNGAN/LAINNYA', 'PEMBAYARAN KEMUDIAN (OPEN ACCOUNT) SECARA BERTAHAP', 'PEMBAYARAN KEMUDIAN (OPEN ACCOUNT) SECARA TUNAI', 'DILAKUKAN DI DN DENGAN PEMBAYARAN UANG TUNAI', 'DILAKUKAN DI DN DENGAN PEMBAYARAN MELALUI TELEGRAPH', 'DILAKUKAN TANPA PEMBAYARAN', 'PEMBAYARAN DIMUKA (ADVANCE PAYMENT)', 'SIGHT LETTER OF CREDIT', 'INKASO (COLLECTION DRAFT)'],
	},
	{
		label: 'Transaksi *',
		name: 'ur_transaksi_impor',
		value: 'ur_transaksi_impor',
		options: ['Transaksi Perdagangan Dengan Imbal Dagang', 'Pembayaran Dilakukan Dengan Interoffice Account', 'Pembayaran Kemudian', 'Pembayaran Dilakukan Dengan Konsinyasi', 'Transaksi Perdagangan Atau Cara Pembayaran Lainnya', 'Pembayaran Dilakukan Dimuka', 'Pembayaran Dengan Red Clause Letter Of Credit', 'Pembayaran Dengan Sight Letter Of Credit', 'Pembayaran Dengan Usance Letter Of Credit', 'Pembayaran Dilakukan Dengan Wesel Inkaso'],
	},
];
