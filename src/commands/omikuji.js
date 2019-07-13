const { logger } = require("../logger");

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
function pick(target, context, comment) {
  const rand = Math.random() * max;
  const pickedRecord = omikujiListObjects.find((element) => rand < element.key);
  console.debug(rand, pickedRecord);

  const message = `${title}: ${pickedRecord.value}`;
  return message;
}
module.exports.pick = pick;
