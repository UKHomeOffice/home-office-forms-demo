const emailExtensions = require('../../../rra-lists/email_extensions.json');
const emailDomainList = require('../../../rra-lists/email_domain_list.json');

module.exports = {
  isOnDomainList: userEmailDomain => emailDomainList.includes(userEmailDomain),

  isOnExtensionsList: userExtension => emailExtensions.some( ext => userExtension.endsWith(ext))
};
