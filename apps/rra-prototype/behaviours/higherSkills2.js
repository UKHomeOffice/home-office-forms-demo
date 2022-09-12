'use strict';

const _ = require('lodash');
const staticSfiaSkills = require('../lib/staticSfiaSkills');

const SoftwareAndDevOpsSkills = staticSfiaSkills.getstaticSoftwareAndDevOpsSfiaSkills();
const InfrastructureEngineeringSkills = staticSfiaSkills.getstaticInfrastructureEngineeringSfiaSkills();
const NetworkingEngineeringSkills = staticSfiaSkills.getstaticNetworkingEngineeringSfiaSkills();
const SecurityEngineeringSkills = staticSfiaSkills.getstaticSecurityEngineeringSfiaSkills();
const EngineeringLeadershipSkills = staticSfiaSkills.getstaticEngineeringLeadershipSfiaSkills();
const HeadOfRoleForEngineeringSkills = staticSfiaSkills.getstaticHeadOfRoleForEngineeringSfiaSkills();
const BusinessArchitectureSkills = staticSfiaSkills.getBusinessArchitectureSkills();
const DataArchitectureSkills = staticSfiaSkills.getDataArchitectureSkills();
const SecurityArchitectureSkills = staticSfiaSkills.getSecurityArchitectureSkills();
const TechnicalArchitectureSkills = staticSfiaSkills.getTechnicalArchitectureSkills();
const DataAnalystSkills = staticSfiaSkills.getstaticDataAnalystSfiaSkills();
const DataEngineeringSkills = staticSfiaSkills.getstaticDataEngineeringSfiaSkills();
const DataScienceSkills = staticSfiaSkills.getstaticDataScienceSfiaSkills();
const HeadOfRoleForDataSkills = staticSfiaSkills.getstaticHeadOfRoleForDataSfiaSkills();
const DeliverySkills = staticSfiaSkills.getStaticDeliverySfiaSkills();
const PlanEngageAndImproveSkills = staticSfiaSkills.getstaticPlanEngageAndImproveSfiaSkills();
const DesignAndTransitionSkills = staticSfiaSkills.getstaticDesignAndTransitionSfiaSkills();
const DeliverAndSupportSkills = staticSfiaSkills.getstaticDeliverAndSupportSfiaSkills();
const ItOperationsLeadershipSkills = staticSfiaSkills.getstaticItOperationsLeadershipSfiaSkills();
const BusinessAnalystSkills = staticSfiaSkills.getstaticBusinessAnalystSfiaSkills();
const ProductManagerSkills = staticSfiaSkills.getstaticProductManagerSfiaSkills();
const PerformanceAnalysisSkills = staticSfiaSkills.getstaticPerformanceAnalysisSfiaSkills();
const QualityAssuranceAndTestingSkills = staticSfiaSkills.getstaticQualityAssuranceAndTestingSfiaSkills();
const ContentDesignerSkills = staticSfiaSkills.getstaticContentDesignerSfiaSkills();
const InteractionDesignerSkills = staticSfiaSkills.getstaticInteractionDesignerSfiaSkills();
const ServiceSkills = staticSfiaSkills.getstaticServiceSfiaSkills();
const UserResearcherSkills = staticSfiaSkills.getstaticUserResearcherSfiaSkills();
const AccessibilityandDigitalInclusionSkills = staticSfiaSkills.getstaticAccessibilityandDigitalInclusionSfiaSkills();

module.exports = superclass => class Skill extends superclass {
  configure(req, res, next) {
    if (req.sessionModel.get('rraGrouping') === 'Business Analyst') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(BusinessAnalystSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Engineering Leadership') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(EngineeringLeadershipSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Head of Role for Engineering') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(HeadOfRoleForEngineeringSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Infrastructure Engineering') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(InfrastructureEngineeringSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Network Engineering') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(NetworkingEngineeringSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Security Engineering') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(SecurityEngineeringSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Software and Dev Ops Engineering') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(SoftwareAndDevOpsSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Business Architecture') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(BusinessArchitectureSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Data Architecture') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(DataArchitectureSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Security Architecture') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(SecurityArchitectureSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Technical Architecture') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(TechnicalArchitectureSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Data Analysis') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(DataAnalystSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Data Engineering') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(DataEngineeringSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Data Science') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(DataScienceSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Head of Role for Data') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(HeadOfRoleForDataSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Content Designer') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(ContentDesignerSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Interaction Designer') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(InteractionDesignerSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Technology Delivery Manager') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(DeliverySkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Outcome Technology Delivery Manager') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(DeliverySkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Head of Role for Delivery') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(DeliverySkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Delivery Manager') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(DeliverySkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Technology Project Manager') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(DeliverySkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Plan, Engage, Improve') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(PlanEngageAndImproveSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Design & Transition') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(DesignAndTransitionSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Deliver and Support') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(DeliverAndSupportSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'IT Operations Leadership') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(ItOperationsLeadershipSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Product Manager') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(ProductManagerSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Accessibility and Digital Inclusion') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(AccessibilityandDigitalInclusionSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Performance Analyst') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(PerformanceAnalysisSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Performance Tester') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(PerformanceAnalysisSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'QAT Analyst') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(QualityAssuranceAndTestingSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'QAT Delivery') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(QualityAssuranceAndTestingSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Test Engineer') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(QualityAssuranceAndTestingSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Service Architect') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(ServiceSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'Service Designer') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(ServiceSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    } else if (req.sessionModel.get('rraGrouping') === 'User Researcher') {
      let options = req.form.options.fields.higherRraSkill2.options;
      options = options.filter(obj => _.includes(UserResearcherSkills, obj.value));
      req.form.options.fields.higherRraSkill2.options = [{
        value: '',
        label: 'fields.higherRraSkill2.options.null'
      }].concat(options);
    }
    next();
  }
};
