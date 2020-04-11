const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/profile-pictures'))
  },
  filename: function (req, file, cb) {
    cb(null, req.userId)
  }
});

module.exports = {
  profilePicture: multer({ storage })
}