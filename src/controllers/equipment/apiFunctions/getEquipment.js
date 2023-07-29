import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";

async function getEquipmentTypes(req, res,next) {
	if (req.query.type_name) {
		return getEquipmentTypeByName(req, res);
	} else {
		try {
			const [results] = await pool.query("SELECT * FROM equipment_type ORDER BY last_edit_time DESC");
			return res.status(200).json(results);
		} catch (error) {
			next(error);
		}
	}
}

async function getEquipmentTypeByName(req, res,next) {
	const type_name = req.query.type_name;

	try {
		const query = "SELECT * FROM equipment_type WHERE type_name LIKE ? ORDER BY last_edit_time DESC";
		const params = [`%${type_name}%`];

		const [results] = await pool.query(query, params);

		if (results.length === 0) {
			throw new Error(errorMessages.EQUIPMENT_TYPE_DOESNOT_EXIST);
		}

		return res.status(200).json(results);
	} catch (error) {
		next(error);
	}
}

export { getEquipmentTypes };