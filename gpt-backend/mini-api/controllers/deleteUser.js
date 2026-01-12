export const deleteUser = async (req,res) => {
    try {
        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser) {
            return res.status(404).json({message : "user not found"});
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({message : "invalid ID"})
    }
}