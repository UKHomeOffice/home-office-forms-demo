const axios = require('axios');

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    super.saveValues(req, res, err => {
      if (err) {
        next(err);
      }

      if (req.sessionModel.attributes.saveForm === 'yes') {
        const session = req.sessionModel.toJSON();
        delete session['csrf-secret'];
        delete session.errors;
        axios.post('http://localhost:3000/forms', {
          email: req.sessionModel.get('saveEmail'),
          id: req.sessionModel.get('id'),
          session: session
        })
          .catch(function name(error) {
            if (error) {
              next(error);
            }
          });
      }
    });
    next();
  }
};
