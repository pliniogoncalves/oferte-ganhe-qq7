// Middleware for loading messages
function messageMiddleware(req, res, next) {
      // Inicializa as mensagens, se não existirem
      res.locals.messages = req.session.messages || [];
      req.session.messages = []; // Limpa após transferir para `res.locals`
      req.addMessage = function (message) {
          req.session.messages.push(message);
      };
      next();
}

module.exports = { messageMiddleware };


