const BaseUrl = "http://localhost:5028/api";

export const API_URL = {
	users: `${BaseUrl}/Users`,
	user: (id: number) => `${BaseUrl}/Users/${id}`,
};
