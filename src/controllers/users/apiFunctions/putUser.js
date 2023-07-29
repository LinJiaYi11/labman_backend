import pool from "../../../utils/MySQL/db.js";
import { checkUserExists } from "../helperFunctions/checkUserExists.js";

async function updateUser(req, res,next) {
	const { student_id } = req.params;
	const { email } = req.body;

	try {
		await checkUserExists(pool, student_id);

		const query = "UPDATE students_user SET email = ? WHERE student_id = ?";
		const params = [email, student_id];
		await pool.query(query, params);

		return res.status(200).json({ message: "User updated successfully" });
	} catch (error) {
		next(error);
	}
}

export { updateUser };