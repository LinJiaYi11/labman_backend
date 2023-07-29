import pool from "../../../utils/MySQL/db.js";
import { checkUserExists } from "../helperFunctions/checkUserExists.js";

async function deleteUser(req, res,next) {
	try {
		const student_id = req.params.student_id;
		await checkUserExists(pool, student_id);

		const query = "DELETE FROM students_user WHERE student_id = ?";
		const params = [student_id];
		await pool.query(query, params);

		return res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		next(error);
	}
}

export { deleteUser };
