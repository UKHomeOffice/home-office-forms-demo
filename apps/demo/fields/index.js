'use strict';

module.exports = {
    'application-submitted': {
        mixin: 'radio-group',
        options: ['Yes', 'No'],
        validate: 'required',
        legend: {
          className: 'visuallyhidden'
        }
      },
      whatIsYourQuestionAbout: {
        isPageHeading: true,
        mixin: 'radio-group',
        validate: ['required'],
        legend: {
          className: 'visuallyhidden'
        },
        options: [
          'I have not received a confirmation email',
          'I have not received a decision',
          'Question about the decision on my ETA',
          'Something else'
        ]
      },
      applicationMethod: {
        mixin: 'radio-group',
        validate: ['required'],
        legend: {
          className: 'visuallyhidden'
        },
        options: [
          'UK ETA app on Android',
          'UK ETA app on iPhone',
          'Online',
        ]
      },
      yourQuestion: {
        mixin: 'textarea',
        labelClassName: 'visuallyhidden',
        'ignore-defaults': true,
        formatter: ['trim', 'hyphens'],
        validate: ['required', { type: 'maxlength', arguments: 2000 }],
        attributes: [{
          attribute: 'rows',
          value: 4
        }],
        className: ['govuk-input', 'govuk-!-width-two-thirds']
      },
      name: {
        validate: ['required', 'notUrl', { type: 'maxlength', arguments: 255 }],
      },
      email: {
        isPageHeading: true,
        validate: ['required', 'email']
      },
};