import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { checkCourseExists } from "../../course/helperFunctions/checkCourseExists.js";

async function getPackageByCourse(req, res,next) {
	const { course_id } = req.params;

	try {
		await checkCourseExists(pool, course_id);

		const query = "SELECT * FROM course_package WHERE course_id = ?";
		const params = [course_id];
		const [results] = await pool.query(query, params);

		//404 not found
		if (results.length === 0) {
			throw new Error(errorMessages.PACKAGE_DOESNOT_EXIST);
		}
		return res.status(200).json(results);
	} catch (error) {
		next(error);
	}
}

export { getPackageByCourse };