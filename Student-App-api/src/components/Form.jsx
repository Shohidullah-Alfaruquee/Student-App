import React from "react";

 function Form({studentName, setStudentName, isEditable, 
    setIsEditable, studentList, setStudentList, editableStudent, setEditableStudent}) {

    const addStudentToList = (e, name) =>{
        e.preventDefault();
        if(name){
            const newStudent = {
                id: Date.now(),
                name
            }
            fetch(`http://localhost:3000/studentList`,{
              method: 'POST',
              body: JSON.stringify(newStudent),
              headers:{
                'Content-type': 'application/json'
              }
            })
            .then(res => res.json())
            .then(data => {
              fetch(`http://localhost:3000/studentList`)
              .then(response => response.json())
              .then(studentData => {
                setStudentList(studentData.reverse())
                setStudentName("")
              })
            })  
        }else{
            alert("Pleae provide a student name")
        }
    }

    // Update functionality after clicking on edit button 
    const updateHandler = (event, editableStudentName) => {
        event.preventDefault();
        if(editableStudentName){
          fetch(`http://localhost:3000/studentList/${editableStudent.id}`,{
            method: 'PUT',
            body: JSON.stringify({
              name: studentName,
              isPresent: editableStudent.isPresent
            }),
            headers:{
              'Content-type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(() => {
            fetch(`http://localhost:3000/studentList`)
            .then( response => response.json())
            .then(studentData => {
              setStudentList(studentData.reverse())
              setIsEditable(false);
              setStudentName("");
              setEditableStudent(null);
            })
          })
        }else{
            alert("Pleae provide a student name")
        }
    }
  return (
    <form>
      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) => {
          setStudentName(e.target.value);
        }}
      />
      <button
        type="sumbit"
        onClick={(e) => {
          isEditable
            ?updateHandler(e, studentName)
            :addStudentToList(e, studentName);
        }}
      >
        {isEditable ? "Update" : "Add Student"}
      </button>
    </form>
  );
}

export default Form
