const { logger } = require("./logger");

const tmi = require("tmi.js");
const config = require("config");

// commands
const omikuji = require("./commands/omikuji.js");

let client;

// Define configuration options
let opts;
if (config.BOT_USERNAME && config.TW_OAUTH_TOKEN && config.TW_CHANNEL_NAMES) {
  opts = {
    identity: {
      username: config.BOT_USERNAME,
      password: config.TW_OAUTH_TOKEN,
    },
    channels: config.TW_CHANNEL_NAMES,
  };
  logger.info("* tmi is starting...");
  logger.debug(opts);

  // Create a client with our options
  // eslint-disable-next-line new-cap
  client = new tmi.client(opts);

  // Register our event handlers (defined below)
  client.on("message", onMessageHandler);
  client.on("connected", onConnectedHandler);
  client.on("disconnected", onDisconnectedHandler);

  // Connect to Twitch:
  client.connect().catch((e) => {
    logger.error("Error Client.connect:", e);
  });
} else {
  logger.error("* invalid setting");
}

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // // DEBUG
  logger.debug("target:", target);
  logger.debug("context:", context);
  // logger.debug("msg:", msg);

  // Remove whitespace from chat message
  const comment = msg.trim();
  logger.debug("comment:", comment);

  // If the command is known, let's execute it
  if (comment.match(/^!omikuji/)) {
    logger.debug("command was triggered: omikuji");
    omikuji.pick(client, target, context, comment);
  } else {
    return;
  }

  const name = mergeUserDisplayName(context);
  logger.debug(`onMessage: [${name}] ${msg}`);
}

function mergeUserDisplayName(context) {
  const username = context.username;
  const displayname = context["display-name"];
  if (username === displayname) {
    return username;
  } else {
    return `${displayname}(${username})`;
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  logger.info(`* Connected to ${addr}:${port}`);
}

// onDisconnectedHandler(reason: string)
function onDisconnectedHandler(reason) {
  logger.info(`* Disconnected to ${reason}`);
  setTimeout(() => {
    if (typeof client.reconnect === "function")
      client.reconnect().catch((e) => {
        logger.error(e);
      });
  }, 5000);
}
