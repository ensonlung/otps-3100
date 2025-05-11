const express = require('express');
const router = express.Router();
const registerController = require('./registerController.cjs');
const loginController = require('./loginController.cjs');
const postController = require('./postController.cjs');
const filterController = require('./filterController.cjs');
const searchController = require('./searchController.cjs');
const commentController = require('./commentController.cjs');
const reportController = require('./reportController.cjs');

router.post('/register', registerController.registerAccount);
router.post('/verify-username', registerController.verifyUsername);
router.post('/verify-login', loginController.verifyLogin);
router.post('/create-post', postController.createPost);
router.post('/filter-post', filterController.filterPost);
router.post('/comment', commentController.createComment);
router.post('/get-comment', commentController.getComment);
router.post('/search', searchController.searchRelevantName);
router.post('/report', reportController.report);
router.post('/get-report-post', reportController.fetchPostReport);

module.exports = router;