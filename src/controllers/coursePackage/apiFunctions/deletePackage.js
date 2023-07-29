import pool from "../../../utils/MySQL/db.js";
import { checkPackageExists } from "../helperFunctions/checkPackageExists.js";

async function deletePackage(req, res,next) {
	const { package_id } = req.params;

	try {
		await checkPackageExists(pool, package_id);
		const query = "DELETE FROM course_package WHERE package_id = ?";
		const params = [package_id];
		await pool.query(query, params);

		return res.status(200).json({ message: "Package is deleted successfully" });
	} catch (error) {
		next(error);
	}
}

// For recall module
export { deletePackage };
