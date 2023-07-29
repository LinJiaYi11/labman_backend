import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
// import { checkCourseExists } from "../../course/helperFunctions/checkCourseExists.js";

async function getTypeByPackageId(req, res,next) {
	const { package_id } = req.params;

	try {
		// await checkCourseExists(pool, course_id);

		const query = "SELECT * FROM type_package WHERE package_id = ?";
		const params = [package_id];

		const [results] = await pool.query(query, params);
		//404 error if no enrollment found
		if (results.length === 0) {
			throw new Error(errorMessages.TPYE_IN_PACKAGE_NOT_FOUND);
		}

		return res.status(200).json(results);
	} catch (error) {
		next(error);
	}
}

export { getTypeByPackageId };