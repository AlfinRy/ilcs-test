const { httpOk, httpFail } = require('../helpers/response/response');
const db = require('../models');
const Pungutan = db.pungutan;
const Joi = require('joi');

exports.create = async (req, res) => {
	try {
		// Validate required fields
		if (!req.body.id_aju) {
			return res.json(httpFail('id_aju is required'));
		}

		console.log('Creating pungutan with data:', req.body);
		const saved = await Pungutan.create(req.body);
		console.log('Pungutan saved:', saved);

		return res.json(httpOk(saved));
	} catch (err) {
		console.error('Error in pungutan create:', err);
		return res.json(httpFail(err.message));
	}
};

exports.findAll = async (req, res) => {
	const data = await Pungutan.findAll();
	return res.json(httpOk(data));
};

exports.findOne = async (req, res) => {
	try {
		const data = await Pungutan.findOne({
			where: {
				id_pungutan: req.params.id,
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
		const data = await Pungutan.findOne({
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
	try {
		const schema = Joi.object({
			ur_incoterm: Joi.string(),
			ur_valuta: Joi.string().allow(null),
			nilai_kurs: Joi.string(),
			nilai_incoterm: Joi.string(),
			biaya_tambahan: Joi.string(),
			biaya_pengurang: Joi.string(),
			tarif_vd: Joi.string(),
			flag_vd: Joi.boolean(),
			ur_asuransi: Joi.string(),
			nilai_asuransi: Joi.string(),
			freight: Joi.string(),
			nilai_pabean: Joi.string(),
			nilai_pabean_idr: Joi.string(),
			berat_kotor: Joi.string(),
			berat_bersih: Joi.string(),
			ur_flag_curah: Joi.string(),
		});

		const { error } = schema.validate(req.body);
		if (error) {
			return res.json(httpFail(error.details[0].message));
		}

		const data = await Pungutan.update(req.body, {
			where: {
				id_pungutan: req.params.id,
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
		const data = await Pungutan.destroy({
			where: {
				id_pungutan: req.params.id,
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
