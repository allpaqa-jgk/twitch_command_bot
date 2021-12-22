module.exports.mergedUserName = (tmiContext) => {
  const username = tmiContext.username;
  const displayname = tmiContext["display-name"];
  if (username === displayname) {
    return username;
  } else {
    return `${displayname}(${username})`;
  }
}
