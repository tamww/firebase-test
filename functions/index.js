// const functions = require('firebase-functions');

// exports.helloWorld = functions.https.onRequest((request, response) => {
//      response.send("Hello from Firebase!");
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const app = require('express')();

const {
    // getAllTodos,
    // postOneTodo,
    // deleteTodo,
    // editTodo,
    CreateCourse,
    getAllCourse,
    getSpecificCourse
} = require('./APIs/todos')

// app.get('/todos', getAllTodos);
// app.post('/todo', postOneTodo);
// app.delete('/todo/:todoId', deleteTodo);
// app.put('/todo/:todoId', editTodo);
app.post('/course',CreateCourse);
app.get('/Course',  getAllCourse);
app.get('/Course/:CourseID', getSpecificCourse);
exports.api = functions.https.onRequest(app);

