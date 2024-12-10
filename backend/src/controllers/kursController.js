const axios = require('axios');

const getLatestKurs = async (req, res) => {
	try {
		const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
		if (!API_KEY) {
			throw new Error('Exchange rate API key is not configured');
		}
		const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);

		// Extract IDR rate from conversion_rates
		const idrRate = response.data.conversion_rates.IDR;

		// Format to match what TabDataPungutan expects
		res.json({
			nilai_kurs: idrRate.toFixed(2), // Ensures 2 decimal places
			last_update: response.data.time_last_update_utc,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error fetching kurs data',
			error: error.message,
		});
	}
};

module.exports = {
	getLatestKurs,
};
