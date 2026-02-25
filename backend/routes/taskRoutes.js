const router = require('express').Router();

const { verifyjwttoken } = require('../middleware/checkAuth');
const { addTasks, getAllTasks, deleteTasks, updateTasks, getTasks } = require('../controller/taskController');


router.use(verifyjwttoken('token'))

router.post('/tasks', addTasks)
router.get('/tasks', getAllTasks);
router.delete('/tasks/:id', deleteTasks)
router.put('/tasks/:id', updateTasks)
router.get('/tasks/:id', getTasks)

//update partial task

module.exports = router;