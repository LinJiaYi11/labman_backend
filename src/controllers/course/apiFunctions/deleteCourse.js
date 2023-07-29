import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { checkCourseExists } from "../helperFunctions/checkCourseExists.js";

async function deleteCourse(req, res, next) {
	const { course_id } = req.params;

	try {
		await checkCourseExists(pool, course_id);

		const query = "DELETE FROM course WHERE course_id = ?";
		const params = [course_id];
		await pool.query(query, params);

		return res.status(200).json({ message: "Course deleted successfully" });
	} catch (error) {
		next(error);
	}
}

export { deleteCourse };
