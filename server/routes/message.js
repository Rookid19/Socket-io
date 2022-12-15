const router = require("express").Router();

const { send_message } = require("../controllers/messageController");

router.get("/send/message", send_message);

module.exports = router;
