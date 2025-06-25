// Controlador responsável por lidar com rotas protegidas por autenticação JWT
class ProtectedController {
  // Método que responde ao painel do usuário autenticado
  static dashboard(req, res) {
    try {
      // Responde com uma mensagem usando o e-mail do usuário autenticado
      return res.status(200).json({
        message: `Bem-vindo ao painel,
   ${req.user.email}`,
      });
    } catch (error) {
      // Em caso de erro inesperado, retorna erro interno do servidor
      return res
        .status(500)
        .json({ message: "Erro ao acessar o painel", error: error.message });
    }
  }
  // Método exclusivo para usuários com permissão de admin
  static adminOnly(req, res) {
    try {
      // Responde com uma mensagem personalizada usando o e-mail do administrador autenticado
      return res.status(200).json({
        message: `Bem-vindo à área admin,
   ${req.user.email}`,
      });
    } catch (error) {
      // Em caso de erro inesperado, retorna erro interno do servidor
      return res
        .status(500)
        .json({
          message: "Erro ao acessar a área admin",
          error: error.message,
        });
    }
  }
}
// Exporta o controlador para ser utilizado nas rotas protegidas
module.exports = ProtectedController;
