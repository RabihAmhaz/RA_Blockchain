const PatientRecords = artifacts.require("PatientRecords");
const Ownable = artifacts.require("Ownable");

module.exports = function(deployer) {
  deployer.deploy(PatientRecords);
  deployer.deploy(Ownable);
};
