import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";

async function getUser(req,res,next) {
	try {
		const [results] = await pool.query("SELECT * FROM students_user");
		return res.status(200).json(results);
	} catch (error) {
		next(error);
	}
}

async function getUserByStudentID(req, res,next) {
	const student_id = req.params.student_id;

	try {
		const [results] = await pool.query("SELECT student_id, email FROM students_user WHERE student_id = ?", [student_id]);

		if (results.length === 0) {
			throw new Error(errorMessages.USER_NOT_FOUND);
		}

		return res.status(200).json(results);
	} catch (error) {
		next(error);
	}
}

export { getUser, getUserByStudentID };
