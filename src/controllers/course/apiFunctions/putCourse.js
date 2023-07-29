import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import moment from "moment";
import { checkCourseExists } from "../helperFunctions/checkCourseExists.js";

async function updateCourse(req, res,next) {
	const { course_id } = req.params;
	const { course_name, coordinator_name, due_date } = req.body;

	const last_edit_time = moment().format("YYYY-MM-DD HH:mm:ss");

	try {
		await checkCourseExists(pool, course_id);

		const query = "UPDATE course SET course_name = ?, coordinator_name = ?, due_date = ?, last_edit_time = ? WHERE course_id = ?";
		const params = [course_name, coordinator_name, due_date, last_edit_time, course_id];
		await pool.query(query, params);

		return res.status(200).json({ message: "Course updated successfully" });
	} catch (error) {
		next(error);
	}
}

export { updateCourse };
