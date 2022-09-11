const emailDomainList = require('./email_domain_list.json');
const domainFunctions = require('../apps/rra-prototype/util/domain-functions');

module.exports = emailDomainList;

// eslint-disable-next-line max-len
module.exports.isValidDomain = domain => (domainFunctions.isOnDomainList(domain.toLowerCase()) || domainFunctions.isOnExtensionsList(domain.toLowerCase()));
