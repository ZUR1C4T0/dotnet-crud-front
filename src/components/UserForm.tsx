import { useEffect, useState } from "react";
import { Button, Card, CardBody, Form, FormGroup } from "react-bootstrap";
import type { User } from "../types/User";
import { API_URL } from "../constants/api";
import { useUserStore } from "../context/userStrore";

type UserFormProps = Omit<User, "id">;

export default function UserForm({ close }: { close: () => void }) {
	const { userId, resetUserId } = useUserStore();
	const [user, setUser] = useState<UserFormProps>({
		name: "",
		lastName: "",
		dni: "",
		address: "",
		phone: "",
	});

	useEffect(() => {
		if (userId) {
			fetch(API_URL.user(userId), {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then(({ id, ...data }) => {
					setUser(data);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
	}, [userId]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser((u) => ({ ...u, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const method = userId ? "PUT" : "POST";
		const url = userId ? API_URL.user(userId) : API_URL.users;
		fetch(url, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...user, id: userId, dni: +user.dni }),
		})
			.then(() => window.location.reload())
			.catch((error) => console.error("Error:", error))
			.finally(() => {
				resetUserId();
				close();
			});
	};

	return (
		<Card as={Form} onSubmit={handleSubmit}>
			<CardBody className="d-grid gap-2">
				<FormGroup>
					<Form.Label htmlFor="name">Name</Form.Label>
					<Form.Control
						type="text"
						id="name"
						name="name"
						value={user.name}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Form.Label htmlFor="lastName">Lastname</Form.Label>
					<Form.Control
						type="text"
						id="lastName"
						name="lastName"
						value={user.lastName}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Form.Label htmlFor="dni">DNI</Form.Label>
					<Form.Control
						type="text"
						id="dni"
						name="dni"
						value={user.dni}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Form.Label htmlFor="address">Address</Form.Label>
					<Form.Control
						type="text"
						id="address"
						name="address"
						value={user.address}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Form.Label htmlFor="phone">Phone</Form.Label>
					<Form.Control
						type=""
						id="phone"
						name="phone"
						value={user.phone}
						onChange={handleChange}
					/>
				</FormGroup>

				<div className="d-grid">
					<Button variant="primary" type="submit">
						Add User
					</Button>
				</div>
			</CardBody>
		</Card>
	);
}
