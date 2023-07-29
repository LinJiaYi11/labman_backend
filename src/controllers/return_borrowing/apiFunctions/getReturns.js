import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";

async function getReturns(req, res,next) {

	let query = `SELECT * FROM borrowings WHERE borrow_status = '${req.query.borrow_status}'`;
	const conditions = [];

	if (req.query.type_name) {
		conditions.push(`type_name LIKE '%${req.query.type_name}%'`);
	}

	if (req.query.student_id) {
		conditions.push(`student_id LIKE '%${req.query.student_id}%'`);
	}

	if (conditions.length > 0) {
		query += " AND " + conditions.join(" AND ");
	}
	query += " ORDER BY borrow_date DESC";
	try {
		const [results] = await pool.query(query, conditions);

		return res.status(200).json(results);
	} catch (error) {
		next(error);
	}
}

export { getReturns };
