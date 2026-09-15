import AuthService from "../services/authService.js";

export default class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async registerAdmin(req, res) {
    try {
      const admin = await this.authService.registerAdmin(req.body);
      res.status(201).json({ message: "Registrasi admin berhasil", admin });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async registerTenant(req, res) {
    try {
      const tenant = await this.authService.registerTenant(req.body);
      res.status(201).json({ message: "Registrasi tenant berhasil", admin });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
