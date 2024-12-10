const { httpOk, httpFail } = require('../helpers/response/response');
const db = require('../models');
const Utama = db.utama;
const Joi = require('joi');

exports.create = async (req, res) => {
	try {
		const saved = await Utama.create(req.body);
		return res.json(httpOk(saved));
	} catch (err) {
		return res.json(httpFail(err.message));
	}
};

exports.findAll = async (req, res) => {
	const data = await Utama.findAll();
	return res.json(httpOk(data));
};

exports.findOne = async (req, res) => {
	try {
		const data = await Utama.findOne({
			where: {
				id_aju: req.params.id,
			},
		});

		if (!data) {
			return res.json(httpFail('Data not found'));
		}

		return res.json(httpOk(data));
	} catch (err) {
		return res.json(httpFail(err.message));
	}
};

exports.findOneSearch = async (req, res) => {
	try {
		const data = await Utama.findOne({
			where: {
				nomor_pengajuan: req.query.nomor_pengajuan,
			},
		});

		if (!data) {
			return res.json(httpFail('Data not found'));
		}

		return res.json(httpOk(data));
	} catch (err) {
		return res.json(httpFail(err.message));
	}
};

exports.update = async (req, res) => {
	try {
		const Joi = require('joi');

		const schema = Joi.object({
			nomor_pengajuan: Joi.string().required(),
			tanggal_pengajuan: Joi.date().required(),
			nomor_pendaftaran: Joi.string().optional(),
			tanggal_pendaftaran: Joi.date().optional(),
			ur_pabean_asal: Joi.string().required(),
			kd_skep_fasilitas: Joi.string().optional(),
			jenis_pib: Joi.string().required(),
			kd_jenis_impor: Joi.string().required(),
			ur_cara_bayar: Joi.string().required(),
			ur_transaksi_impor: Joi.string().required(),
		});

		const { error } = schema.validate(req.body);
		if (error) {
			return res.json(httpFail(error.details[0].message));
		}

		const data = await Utama.update(req.body, {
			where: {
				id_aju: req.params.id,
			},
		});

		if (data[0] === 0) {
			return res.json(httpFail('Data not found'));
		}

		return res.json(httpOk({ message: 'Data updated successfully' }));
	} catch (err) {
		return res.json(httpFail(err.message));
	}
};

exports.delete = async (req, res) => {
	try {
		const data = await Utama.destroy({
			where: {
				id_aju: req.params.id,
			},
		});

		if (!data) {
			return res.json(httpFail('Data not found'));
		}

		return res.json(httpOk({ message: 'Data deleted successfully' }));
	} catch (err) {
		return res.json(httpFail(err.message));
	}
};
