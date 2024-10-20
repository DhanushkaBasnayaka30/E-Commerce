import ItemModule from "../modules/ItemModule.js";

export const AddItem = async (req, res) => {
	console.log(req.body);
	try {
		const newItem = new ItemModule(req.body);
		const { _id } = newItem;

		const userExist = await ItemModule.findOne({ _id });

		if (userExist) {
			return res.status(400).json({ Message: `${_id} Item already exists` });
		}
		const savedData = await newItem.save();
		res.status(200).json(savedData);
	} catch (error) {
		res.status(500).json({ Message: "error in adding user" });
	}
};
