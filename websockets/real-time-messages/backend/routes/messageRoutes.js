const { sendMessage, allMessages } = require('../controllers/messageControllers')
const { protect } = require('../middleware/authMiddleware')
const express = require('express')
const router = express.Router()

// sending message
router.route('/').post(protect, sendMessage)

// // fetching messages
router.route('/:chatId').get(protect, allMessages)


module.exports = router;