const router = require('express').Router();
const checkApiKey = require('../../middleware/api/checkApiKey');
const checkToken = require('../../middleware/api/checkToken');
const employeeController = require('../../controllers/api/employee.controller');
const userController = require('../../controllers/api/user.controller');



router.get('/', checkApiKey, (req, res) => {
    res.status(401).json({message:"You donot have permission to access this page."});
})
router.get('/employees', checkApiKey, checkToken, employeeController.manage);
router.post('/employee', checkApiKey, checkToken, employeeController.insert);
router.put('/employee/:id', checkApiKey, checkToken, employeeController.update);
router.delete('/employee/:id', checkApiKey, checkToken, employeeController.delete);
router.get('/employee/:id', checkApiKey, checkToken, employeeController.view);

router.post('/register', checkApiKey, userController.register);
router.post('/login', checkApiKey, userController.login);

module.exports = router;