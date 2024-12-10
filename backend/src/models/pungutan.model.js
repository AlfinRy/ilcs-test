const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, Sequelize) => {
	const Pungutan = sequelize.define('pungutan', {
		id_pungutan: {
			primaryKey: true,
			type: Sequelize.UUID,
			defaultValue: () => uuidv4(),
		},
		id_aju: {
			type: Sequelize.UUID,
			unique: true,
		},
		ur_incoterm: {
			type: Sequelize.STRING,
		},
		ur_valuta: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		nilai_kurs: {
			type: Sequelize.STRING,
		},
		nilai_incoterm: {
			type: Sequelize.STRING,
		},
		biaya_tambahan: {
			type: Sequelize.STRING,
		},
		biaya_pengurang: {
			type: Sequelize.STRING,
		},
		tarif_vd: {
			type: Sequelize.STRING,
		},
		flag_vd: {
			type: Sequelize.BOOLEAN,
		},
		ur_asuransi: {
			type: Sequelize.STRING,
		},
		nilai_asuransi: {
			type: Sequelize.STRING,
		},
		freight: {
			type: Sequelize.STRING,
		},
		nilai_pabean: {
			type: Sequelize.STRING,
		},
		nilai_pabean_idr: {
			type: Sequelize.STRING,
		},
		berat_kotor: {
			type: Sequelize.STRING,
		},
		berat_bersih: {
			type: Sequelize.STRING,
		},
		ur_flag_curah: {
			type: Sequelize.STRING,
		},
	});

	return Pungutan;
};
