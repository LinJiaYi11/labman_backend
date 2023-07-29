import pool from "../../../utils/MySQL/db.js";
import { checkUserExists } from "../../users/helperFunctions/checkUserExists.js";

async function getEnrollbyStudentId(req, res,next) {
	const { student_id } = req.params;
	try {
		await checkUserExists(pool, student_id);
		const getEnrollQuery = "SELECT enrollment.course_id, course.course_name, course.coordinator_name, course.due_date FROM enrollment JOIN course ON enrollment.course_id = course.course_id WHERE enrollment.student_id = ?";
		const [result] = await pool.query(getEnrollQuery, [student_id]);

		if (result.length === 0) {
			return res.status(404).json({ message: "Not enrolled" });
		} else {
			return res.status(200).json(result);
		}
	} catch (error) {
		next(error);
	}
}

export { getEnrollbyStudentId };