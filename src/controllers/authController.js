import AuthService from "../services/authService.js";

export default class AuthController {
  async registerAdmin(req, res) {
    try {
      const admin = await AuthService.registerAdmin(req.body);
      res.status(201).json({ message: "Registrasi admin berhasil", admin });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async registerTenant(req, res) {
    try {
      const tenant = await AuthService.registerTenant(req.body);
      res.status(201).json({ message: "Registrasi tenant berhasil", tenant });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      res.status(200).json({ message: "Login berhasil", ...result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async changePassword(req, res) {
    try {
      const userId = req.params.id;
      const result = await AuthService.changePassword(userId, req.body);
      res.status(200).json({ message: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
