const { httpOk, httpFail } = require('../helpers/response/response');
const db = require('../models');
const Entitas = db.entitas;
const Joi = require('joi');

exports.create = async (req, res) => {
	try {
		// Validate required fields
		if (!req.body.id_aju) {
			return res.json(httpFail('id_aju is required'));
		}

		console.log('Creating entitas with data:', req.body);
		const saved = await Entitas.create(req.body);
		console.log('Entitas saved:', saved);

		return res.json(httpOk(saved));
	} catch (err) {
		console.error('Error in entitas create:', err);
		return res.json(httpFail(err.message));
	}
};

exports.findAll = async (req, res) => {
	const data = await Entitas.findAll();
	return res.json(httpOk(data));
};

exports.findOne = async (req, res) => {
	try {
		const data = await Entitas.findOne({
			where: {
				id_entitas: req.params.id,
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
		const data = await Entitas.findOne({
			where: {
				id_aju: req.query.id_aju,
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
	const schema = Joi.object({
		ur_entitas_pemberitahu: Joi.string(),
		ur_jenis_identitas: Joi.string(),
		nib: Joi.number(),
		nomor_identitas: Joi.number(),
		no_identitas_16: Joi.string().allow(null),
		nama_identitas: Joi.string(),
		provinsi_identitas: Joi.string(),
		kota_identitas: Joi.string(),
		kecamatan: Joi.string(),
		kode_pos: Joi.number(),
		rt_rw: Joi.string(),
		tlp_identitas: Joi.number(),
		email_identitas: Joi.string().email(),
		status: Joi.string(),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		return res.json(httpFail(error.details[0].message));
	}

	try {
		const data = await Entitas.update(req.body, {
			where: {
				id_entitas: req.params.id,
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
		const data = await Entitas.destroy({
			where: {
				id_entitas: req.params.id,
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
