const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ProxyModule", (m) => {
  const logicV1 = m.contract("LogicV1");

  return { logicV1 };
});