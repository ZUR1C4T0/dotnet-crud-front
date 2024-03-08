import { Button, Table } from "react-bootstrap";
import type { User } from "../types/User";
import { useUserStore } from "../context/userStrore";

export default function UserList({
	users,
	setShowModal,
}: { users: User[]; setShowModal: (s: boolean) => void }) {
	const { setUserId } = useUserStore();

	const handleEdit = (id: number) => {
		setUserId(id);
		setShowModal(true);
	};

	return (
		<>
			<Table striped bordered hover responsive>
				<thead className="table-dark text-center">
					<tr>
						<th>Name</th>
						<th>Lastname</th>
						<th>DNI</th>
						<th>Address</th>
						<th>Phone</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.length === 0 && (
						<tr>
							<td colSpan={6} className="text-center">
								No users found
							</td>
						</tr>
					)}
					{users.map((u) => (
						<tr key={u.id}>
							<td>{u.name}</td>
							<td>{u.lastName}</td>
							<td>{u.dni}</td>
							<td>{u.address}</td>
							<td>{u.phone}</td>
							<td>
								<Button
									variant="warning"
									className="me-3"
									onClick={() => {
										handleEdit(u.id);
									}}
								>
									Edit
								</Button>
								<Button variant="danger">Delete</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
}
