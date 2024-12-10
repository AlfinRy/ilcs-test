const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, Sequelize) => {
	const Entitas = sequelize.define('entitas', {
		id_entitas: {
			primaryKey: true,
			type: Sequelize.UUID,
			defaultValue: () => uuidv4(),
		},
		id_aju: {
			type: Sequelize.UUID,
			// unique: true,
			allowNull: false,
		},
		ur_entitas_pemberitahu: {
			type: Sequelize.STRING,
		},
		ur_jenis_identitas: {
			type: Sequelize.STRING,
		},
		nib: {
			type: Sequelize.INTEGER,
		},
		nomor_identitas: {
			type: Sequelize.INTEGER,
		},
		no_identitas_16: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		nama_identitas: {
			type: Sequelize.STRING,
		},
		provinsi_identitas: {
			type: Sequelize.STRING,
		},
		kota_identitas: {
			type: Sequelize.STRING,
		},
		kecamatan: {
			type: Sequelize.STRING,
		},
		kode_pos: {
			type: Sequelize.INTEGER,
		},
		rt_rw: {
			type: Sequelize.STRING,
		},
		tlp_identitas: {
			type: Sequelize.INTEGER,
		},
		email_identitas: {
			type: Sequelize.STRING,
		},
		status: {
			type: Sequelize.STRING,
		},
	});

	return Entitas;
};
