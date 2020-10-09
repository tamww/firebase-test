//todos.js


/**
 *{
"Name": "How to build a robot",
"Content": "Learn how to build",
"Instructor":"MR no one",
"CourseID":"999",
"StartD":"20200329" ,
"EndD":"20200429",
"sizeC":"10",
"TELElink":"www"
}
 * 
 *  
 */ 
const { db } = require('../util/admin');

exports.getSpecificCourse = (request, response) => {
    const document = db.doc(`/Course/${request.params.CourseID}`);
    document
        .get()
        .then((doc) => {
            if (doc.id != request.params.CourseID) {
                return response.status(404).json({ error: 'No such course' })
			}
			data = ({
				CourseID: doc.id,
				Name: doc.data().Name,
				Content: doc.data().Content,
				Instructor: doc.data().Instructor,
				CourseID: doc.data().CourseID,
				StartD: doc.data().StartD,
				EndD: doc.data().EndD,
				sizeC: doc.data().sizeC,
				TELElink: doc.data().TELElink,
				createdAt: doc.data().createdAt,
			});
            return response.json(data);
        })
        .then(() => {
            response.json({ message: 'Course Found' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};


exports.getAllCourse = (request, response) => {
	db
		.collection('Course')
		.orderBy('CourseID')
		.get()
		.then((data) => {
			let Course = [];
			data.forEach((doc) => {
				Course.push({
                    CourseID: doc.id,
					Name: doc.data().Name,
					Content: doc.data().Content,
					Instructor: doc.data().Instructor,
					CourseID: doc.data().CourseID,
					StartD: doc.data().StartD,
					EndD: doc.data().EndD,
					sizeC: doc.data().sizeC,
					TELElink: doc.data().TELElink,
					createdAt: doc.data().createdAt,
				});
			});
			return response.json(Course);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

exports.CreateCourse = (request, response) =>{
	if (request.body.Name.trim() === "") {
		return response.status(400).json({ Name: 'Must not be empty' });
    }
    
    if(request.body.Content.trim() === "") {
        return response.status(400).json({ Content: 'Must not be empty' });
	}
	if (request.body.Instructor.trim() === "") {
		return response.status(400).json({ Instructor: 'Must not be empty' });
    }
    
    if(request.body.CourseID.trim() === "") {
        return response.status(400).json({ CourseID: 'Must not be empty' });
	}
	if(request.body.StartD.trim() === "") {
        return response.status(400).json({ StartD: 'Must not be empty' });
	}
	if(request.body.EndD.trim() === "") {
        return response.status(400).json({ EndD: 'Must not be empty' });
	}
	if(request.body.sizeC.trim() === "") {
        return response.status(400).json({ sizeC: 'Must not be empty' });
	}
	if(request.body.TELElink.trim() === "") {
        return response.status(400).json({ TELElink: 'Must not be empty' });
	}

	const newCourseItem =  {
        Name: request.body.Name,
		Content: request.body.Content,
		Instructor: request.body.Instructor,
		StartD: request.body.StartD,
		EndD: request.body.EndD,
		sizeC: request.body.sizeC,
		TELElink: request.body.TELElink,
		createdAt: new Date().toISOString(),
		CourseID: request.body.CourseID
	}
	var k = db.collection('Course').doc(request.body.CourseID);
	k.set({
        Name: request.body.Name,
		Content: request.body.Content,
		Instructor: request.body.Instructor,
		StartD: request.body.StartD,
		EndD: request.body.EndD,
		sizeC: request.body.sizeC,
		TELElink: request.body.TELElink,
		createdAt: new Date().toISOString(),
		CourseID: request.body.CourseID
	}).then((doc)=>{
		doc.id = request.body.CourseID;
		const responseCItem = newCourseItem;
		responseCItem.id = request.body.CourseID;
		return response.json(responseCItem);
	})
	.catch((err) => {
		response.status(500).json({ error: 'Something went wrong' });
		console.error(err);
	});
	// return response.json(newCourseItem);
	// db
	// .collection('Course')
	// .add(newCourseItem)
	// .then((doc)=>{
	// 	doc.id = request.body.CourseID;
	// 	const responseCItem = newCourseItem;
	// 	responseCItem.id = request.body.CourseID;
	// 	return response.json(responseCItem);
	// })
	// .catch((err) => {
	// 	response.status(500).json({ error: 'Something went wrong' });
	// 	console.error(err);
	// });
};

///// ref
// exports.postOneTodo = (request, response) => {
// 	print(request);
// 	print();
// 	print(response);
// 	if (request.body.body.trim() === "") {
// 		return response.status(400).json({ body: 'Must not be empty' });
//     }
    
//     if(request.body.title.trim() === "") {
//         return response.status(400).json({ title: 'Must not be empty' });
//     }
    
//     const newTodoItem = {
//         title: request.body.title,
//         body: request.body.body,
//         createdAt: new Date().toISOString()
//     }
//     db
//         .collection('todos')
//         .add(newTodoItem)
//         .then((doc)=>{
//             const responseTodoItem = newTodoItem;
//             responseTodoItem.id = doc.id;
//             return response.json(responseTodoItem);
//         })
//         .catch((err) => {
// 			response.status(500).json({ error: 'Something went wrong' });
// 			console.error(err);
// 		});
// };


// exports.getAllTodos = (request, response) => {
// 	db
// 		.collection('todos')
// 		.orderBy('createdAt', 'desc')
// 		.get()
// 		.then((data) => {
// 			let todos = [];
// 			data.forEach((doc) => {
// 				todos.push({
//                     todoId: doc.id,
//                     title: doc.data().title,
// 					body: doc.data().body,
// 					createdAt: doc.data().createdAt,
// 				});
// 			});
// 			return response.json(todos);
// 		})
// 		.catch((err) => {
// 			console.error(err);
// 			return response.status(500).json({ error: err.code});
// 		});
// };

// exports.deleteTodo = (request, response) => {
//     const document = db.doc(`/todos/${request.params.todoId}`);
//     document
//         .get()
//         .then((doc) => {
//             if (!doc.exists) {
//                 return response.status(404).json({ error: 'Todo not found' })
//             }
//             return document.delete();
//         })
//         .then(() => {
//             response.json({ message: 'Delete successfull' });
//         })
//         .catch((err) => {
//             console.error(err);
//             return response.status(500).json({ error: err.code });
//         });
// };

// exports.editTodo = ( request, response ) => { 
//     if(request.body.todoId || request.body.createdAt){
//         response.status(403).json({message: 'Not allowed to edit'});
//     }
//     let document = db.collection('todos').doc(`${request.params.todoId}`);
//     document.update(request.body)
//     .then(()=> {
//         response.json({message: 'Updated successfully'});
//     })
//     .catch((err) => {
//         console.error(err);
//         return response.status(500).json({ 
//                 error: err.code 
//         });
//     });
// };