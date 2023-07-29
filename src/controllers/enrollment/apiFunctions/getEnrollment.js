import pool from "../../../utils/MySQL/db.js";
// import { checkUserExists } from "../../users/helperFunctions/checkUserExists.js";

async function getEnrollment(req, res,next) {
	const { course_id,student_id } = req.params;
	try {
		// await checkUserExists(pool, student_id);
		const getEnrollQuery = "SELECT * FROM enrollment WHERE course_id = ? AND student_id = ?";
		const [result] = await pool.query(getEnrollQuery, [course_id,student_id]);
		// console.log(result);
		if (result.length === 0) {
			return res.status(404).json({ message: "Not enrolled" });
		} else {
			return res.status(200).json(result);
		}
	} catch (error) {
		next(error);
	}
}

export { getEnrollment };