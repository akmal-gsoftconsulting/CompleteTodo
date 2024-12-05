import Collaborator from "../models/collaborator.model.js";
import List from "../models/list.model.js";
// import User from "../models/user.model.js";


export const createCollaborator = async (req, res) => {
    try {
        const { email, listName } = req.body;
        const userId = req.user.userId;

        const collaborator = await User.findOne({ email });
        if (!collaborator) {
            return res.status(404).json({ message: 'Collaborator not found' });
        }




        const list = await List.find({ userId, name: { $in: listName } });


        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }


        const newCollaborator = new Collaborator({
            userId,
            email,
            list: list
        });


        // console.log(newCollaborator);


        await newCollaborator.save();

        res.status(201).json({ message: 'Collaborator added successfully' });


    } catch (error) {
        res.status(500).json({ message: 'Error adding collaborator', error: error.message });
    }
};




export const deleteCollaborator = async (req, res) => {
    try {
        const { id } = req.params;
        const collaborator = await Collaborator.findById(id);
        if (!collaborator) {
            return res.status(404).json({ message: 'Collaborator not found' });
        }
        await Collaborator.findByIdAndDelete(id);
        res.status(200).json({ message: 'Collaborator deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting collaborator', error: error.message });
    }
}



export const getCollaborators = async (req, res) => {
    try {
        const { listid } = req.params;


        const list = await List.findById(listid);
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }


        var collaborators = await Collaborator.find();

        if (!collaborators) {
            return res.status(404).json({ message: 'Collaborators not found' });
        }

        collaborators.forEach(collaborator => {
            collaborator.list = collaborator.list.filter(item => item._id.toString() === listid);
        });

        collaborators = collaborators.map(collaborator =>collaborator.email );



        // console.log(collaborators);


        res.status(200).json(collaborators);
    } catch (error) {
        res.status(500).json({ message: 'Error getting collaborators', error: error.message });
    }
}