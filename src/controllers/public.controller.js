// Controlador responsável por lidar com rotas públicas da aplicação
class PublicController {
  // Método que responde à rota pública inicial
  static home(req, res) {
    try {
      // Envia uma mensagem de boas-vindas sem exigir autenticação
      return res.status(200).send("Bem-vindo à API pública!");
    } catch (error) {
      // Em caso de erro inesperado, retorna status 500 com a mensagem do erro
      return res
        .status(500)
        .json({
          message: "Erro ao acessar a rota pública",
          error: error.message,
        });
    }
  }
}
// Exporta o controlador para ser utilizado nas rotas públicas
module.exports = PublicController;
