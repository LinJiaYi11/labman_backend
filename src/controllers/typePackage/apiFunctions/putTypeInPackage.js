import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import moment from "moment";
import { checkTypeExistsInPackage} from "../helperFunctions/checkTypeExistsInPackage.js";

async function updateTypeInPackage(req, res,next) {
	const { package_id, type_id} = req.params;
	const { type_name,upper_bound_amount } = req.body;

	const last_edit_time = moment().format("YYYY-MM-DD HH:mm:ss");

	try {
		await checkTypeExistsInPackage(pool, package_id, type_id);

		const query = "UPDATE type_package SET type_name=?,upper_bound_amount = ?, last_edit_time = ? WHERE package_id = ? AND type_id = ?";
		const params = [type_name,upper_bound_amount,last_edit_time, package_id, type_id];
		await pool.query(query, params);

		return res.status(200).json({ message: "type info in package updated successfully" });
	} catch (error) {
		next(error);
	}
}

export { updateTypeInPackage };
