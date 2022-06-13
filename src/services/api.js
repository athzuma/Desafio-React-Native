export function getEndpoint(route) {
  return `${process.env.API_BASE_URL}${route}`
}

function processResponse(response) {
  const statusCode = response.status;
  const data = response.json();
  return Promise.all([statusCode, data]).then(res => ({
    statusCode: res[0],
    data: res[1]
  }));
}

export const callAPI = async (url, method, body, success, error) => {
	try {
		const json = (body == null) ? null : JSON.stringify(body);
		await fetch(url, {
			method: method,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: json
		})
		.then(processResponse)
		.then(res => {
			const { statusCode, data } = res;
			if (statusCode >= 200 && statusCode < 400) {
				success(data);
			} else {
				error(statusCode)
			}
		})
		.catch(err => {
			error(err);
		});
	} catch (err) {
		error(err);
	}
};
