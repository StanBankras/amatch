async function getMatches(user, users) {
  return users.filter(matchedUser => {
    let match = false;
    user.hobbies.forEach(hobby => {
      if (matchedUser.hobbies.includes(hobby) && matchedUser._id != user._id && match.gender != user.gender) { match = true; }
    });
    return match;
  });
}

module.exports = {
  getMatches
}