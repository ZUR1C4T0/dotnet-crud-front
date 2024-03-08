import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import UserList from "./components/UserList";
import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import { API_URL } from "./constants/api";
import type { User } from "./types/User";

export default function App() {
	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState({ show: false, message: "" });
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		fetch(API_URL.users, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => setUsers(data))
			.catch((e) => setError({ show: true, message: e.message }));
	}, []);

	return (
		<Container>
			<Row className="mb-3 text-bg-dark">
				<Col>
					<h1 className="text-center">Users CRUD</h1>
				</Col>
			</Row>

			<Row className="mb-3">
				<Col>
					<h2 className="d-flex">
						<span>User List</span>
						<Button
							variant="primary"
							className="ms-auto"
							onClick={() => setShowModal((s) => !s)}
						>
							Add User
						</Button>
					</h2>
				</Col>
			</Row>

			<Row>
				<Col>
					<UserList users={users} setShowModal={setShowModal} />
				</Col>
			</Row>

			<Modal centered show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Add User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<UserForm close={() => setShowModal(false)} />
				</Modal.Body>
			</Modal>

			<Modal
				centered
				show={error.show}
				onHide={() => setError({ show: false, message: "" })}
				contentClassName="text-bg-danger"
			>
				<Modal.Header closeButton>
					<Modal.Title>Error</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h5>{error.message}</h5>
				</Modal.Body>
			</Modal>
		</Container>
	);
}
