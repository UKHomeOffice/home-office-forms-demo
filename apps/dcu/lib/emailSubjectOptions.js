'use strict';

module.exports = {
  getEmailSubjectOptions: function () {
    return [
      {
        value: 'O1',
        label: 'Problems with your visa application'
      },
      {
        value: '02',
        label: 'Making a complaint about a member of staff'
      },
      {
        value: '03',
        label: 'Reporting a crime in an overseas territory'
      },
      {
        value: '04',
        label: 'Reporting counterfeit money'
      },
      {
        value: '05',
        label: 'Other'
      }
    ];
  }
};
