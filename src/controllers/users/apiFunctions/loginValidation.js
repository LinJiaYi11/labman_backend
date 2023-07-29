import pool from "../../../utils/MySQL/db.js";
import bcrypt from "bcrypt";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { checkUserExists } from "../helperFunctions/checkUserExists.js";
export async function loginValidation(req, res) {
	try {
		const student_id = req.params.student_id;
		const password = req.body.password;
        
		await checkUserExists(pool, student_id);

		const query = "SELECT password FROM students_user WHERE student_id = ?";
		const [result] = await pool.query(query, [student_id]);
		// console.log(result[0]);
		const passwordMatches = await bcrypt.compare(password, result[0].password);

        if (passwordMatches) {
            return res.status(200).json({ message: "User logged in successfully" });
        } 
            return res.status(401).json({ message: "Incorrect username or password" });
	} catch (error) {
		next(error);
	}
}