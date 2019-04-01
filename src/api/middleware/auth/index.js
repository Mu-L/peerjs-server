const config = require('../../../../config');
const realm = require('../../../services/realm');
const { Errors } = require('../../../enums');

module.exports = (req, res, next) => {
  const { id, token, key } = req.params;

  if (key !== config.get('key')) {
    return res.status(401).send(Errors.INVALID_KEY);
  }

  if (!id) {
    return next();
  }

  const client = realm.getClientById(id);

  if (!client) {
    return res.sendStatus(401);
  }

  if (client.getToken() && token !== client.getToken()) {
    return res.status(401).send(Errors.INVALID_TOKEN);
  }

  next();
};