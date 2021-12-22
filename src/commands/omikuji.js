const { logger } = require("../logger");
const { mergedUserName } = require("../utils/index")

const list = require("../list.js");
let omikujiListArray = list.readList("omikujiList");

const title = omikujiListArray.shift()[1];

let max = 0;
const omikujiListObjects = omikujiListArray.map((element) => {
  max += Number(element[0]);
  return {
    key: max,
    value: element[1],
  };
});

logger.debug("title", title);
logger.debug("omikujiList", omikujiListObjects);

// Function called when the "dice" command is issued
function pick(client, target, context, comment) {
  const rand = Math.floor(Math.random() * max);
  const pickedRecord = omikujiListObjects.find((element) => rand < element.key);
  logger.debug(rand, pickedRecord);
  const username = mergedUserName(context)

  const message = `${username} ${title} ${pickedRecord.value}`;

  logger.info("username", username, "message:", message);
  client.say(target, message).catch((error) => {
    logger.error('Error: omikuji.pick.client.say:', error)
  });
}
module.exports.pick = pick;
