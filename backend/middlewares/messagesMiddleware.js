function messageMiddleware(req, res, next) {
    if (!req.session.messages) req.session.messages = [];

    res.locals.messages = req.session.messages;
    req.session.messages = [];

    req.addMessage = function (message) {
        req.session.messages.push(message);
    };

    next();
}

module.exports = { messageMiddleware };
