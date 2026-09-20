import userService from "../services/userService.js";

export default class UserController {
  async getUserById(req, res) {
    try {
      const result = await userService.getUserById(req.params.id);
      res.status(200).json({ message: "User berhasi didapat", result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async changeUserRole(req, res) {
    try {
      const { role } = req.body;
      const id = req.params.id;
      const result = await userService.changeUserRole(id, role);
      res.status(200).json({ message: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async updateUserProfile(req, res) {
    try {
      const result = await userService.updateUserProfile(
        req.params.id,
        req.body,
      );
      res.status(200).json({ message: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
