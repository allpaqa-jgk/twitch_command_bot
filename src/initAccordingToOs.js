const { logger } = require("./logger");

const os = require("os");
const execSync = require("child_process").execSync;

module.exports.changeCharSet = () => {
  const platform = os.platform();
  logger.info(`Operation System detected as: ${platform}`);

  switch (platform) {
    case "win32":
      execSync("chcp 65001");
      break;

    default:
      break;
  }
};
