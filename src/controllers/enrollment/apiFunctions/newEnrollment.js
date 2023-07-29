import pool from "../../../utils/MySQL/db.js";
import { checkUserExists } from "../../users/helperFunctions/checkUserExists.js";
import { checkEnrollmentDuplicate } from "../helperFunctions/checkEnrollmentDuplicate.js";
import { checkCourseExists } from "../../course/helperFunctions/checkCourseExists.js";

async function newEnrollment(req, res,next) {

	try {
		const { course_id, student_id } = req.params;

		await checkUserExists(pool, student_id);
		await checkCourseExists(pool, course_id);
		await checkEnrollmentDuplicate(pool, course_id, student_id);

		const query = "INSERT INTO enrollment (course_id, student_id) VALUES (?, ?)";
		const params = [course_id, student_id];
		await pool.query(query, params);

		return res.status(201).json({ message: "Enrollments created successfully" });
	} catch (error) {
		next(error);
	}
}

// For recall module
export { newEnrollment };
