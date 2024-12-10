const httpOk = (data) => ({
	code: '01',
	message: 'success',
	status: true,
	data,
});

const httpFail = (error) => ({
	code: '02',
	message: error,
	status: false,
	data: {},
});

module.exports = {
	httpOk,
	httpFail,
};
