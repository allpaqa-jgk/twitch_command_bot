const { logger } = require("./src/logger");
logger.info(`logger initialized level: ${logger.level}`);

require("./src/initAccordingToOs.js").changeCharSet();

const forever = require("forever-monitor");
const path = require("path");

// init process.env
process.env.NODE_CONFIG_DIR = path.join(__dirname, "./config");

logger.info("//////////////////////");
logger.info("//  Ctrl-C to exit  //");
logger.info("//////////////////////");

if (process.env.NODE_ENV === "development") {
  logger.debug("//////////////////////");
  logger.debug("//    DEV mode!     //");
  logger.debug("//////////////////////");
  // something.js の子プロセスの初期化
  var child = new forever.Monitor(path.join(__dirname, "./src/twitchBot.js"), {
    //
    // Options for restarting on watched files.
    //
    watch: true, // Value indicating if we should watch files.
    watchDirectory: "src", // Top-level directory to watch from.
  });
  // イベントを定義できます
  child.on("watch:restart", function(info) {
    logger.error("Restaring script because " + info.file + " changed");
  });
  child.on("restart", function() {
    logger.error("Forever restarting script for " + child.times + " time");
  });
  child.on("exit:code", function(code) {
    logger.error("Forever detected script exited with code " + code);
  });

  // プロセススタート
  child.start();
} else {
  require(path.join(__dirname, "./src/twitchBot.js"));
}
