import pool from "../../../utils/MySQL/db.js";
import { checkEnrollmentDuplicate } from "../helperFunctions/checkEnrollmentDuplicate.js";
import { checkCourseExists } from "../../course/helperFunctions/checkCourseExists.js";
import { checkUserExists } from "../../users/helperFunctions/checkUserExists.js";

async function newEnrollmentBatch(req, res, next) {

	try {
		const { course_id } = req.params;
		const { student_id } = req.body;
		await checkCourseExists(pool, course_id);

		// for (const id of student_id) {
		// 	await checkUserExists(pool, id);
		// 	await checkEnrollmentDuplicate(pool, course_id, id);

		// 	const query = "INSERT INTO enrollment (course_id, student_id) VALUES (?, ?)";
		// 	const params = [course_id, id];
		// 	await pool.query(query, params);
		// }

		await Promise.all(student_id.map(async (id) => {
			await addStudent(pool, course_id, id);
		}));

		return res.status(201).json({ message: "Bulk enrollments are created successfully" });
	} catch (error) {
		next(error);
	}
}

const addStudent = async (pool, course_id, student_id) => {
	await checkUserExists(pool, student_id);
	await checkEnrollmentDuplicate(pool, course_id, student_id);
	const query = "INSERT INTO enrollment (course_id, student_id) VALUES (?, ?)";
	const params = [course_id, student_id];

	await pool.query(query, params);
};
export { newEnrollmentBatch };
