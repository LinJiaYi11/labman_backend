import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";

async function getTypePackageRelation(req, res,next) {
	const { package_id,type_id } = req.params;

	try {
		const query = "SELECT * FROM type_package WHERE package_id = ? AND type_id = ?";
		const params = [package_id,type_id];

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

export { getTypePackageRelation };