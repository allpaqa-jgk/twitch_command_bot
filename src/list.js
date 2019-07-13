const { logger } = require("./logger");

const fs = require("fs");
const path = require("path");

const csvSync = require("csv-parse/lib/sync");
const omikujiList = path.join(__dirname, "../data/omikujiList.csv");

// データファイル初期化
function checkDataFileExists(key) {
  if (!fs.existsSync(configFileName(key))) {
    try {
      fs.writeFileSync(configFileName(key), "");
    } catch (error) {
      logger.info(error);
      throw error;
    }
    logger.info(configFileName(key) + " created");
  } else {
    // logger.info(configFileName(key) + " exist")
  }
}
function checkDataFiles() {
  logger.info("checkDataFiles");
  checkDataFileExists("omikujiList");

  const keys = ["omikujiList"];
  keys.forEach((key) => {
    logger.info(key);
    logger.info(readList(key));
  });
}
module.exports.checkDataFiles = checkDataFiles;

function configFileName(key) {
  switch (key) {
    case "omikujiList":
      return omikujiList;
    default:
      break;
  }
}

function readList(key) {
  let data = fs.readFileSync(configFileName(key), "utf8");
  let res = csvSync(data);

  return res;
}
module.exports.readList = readList;
