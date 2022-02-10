import React from "react";

function StudentListAll({
  studentList,
  setStudentList,
  setIsEditable,
  setStudentName,
  setEditableStudent,
}) {
  // Delete functionality
  const deleteStudentFromList = (id) => {
    fetch(`http://localhost:3000/studentList/${id}`,{
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => {
      fetch(`http://localhost:3000/studentList`)
      .then(response => response.json())
      .then(studentData =>{
        setStudentList(studentData.reverse())

      })
    })
  };
  // Editing functionalities
  const editBtnHandler = (id) => {
    setIsEditable(true);
    const student = studentList.find((item) => item.id === id);
    setEditableStudent(student);
    setStudentName(student.name);
  };


  const presentHandler = (studentId) => {
    const student = studentList.find((item)=>item.id===studentId);
    if(student.isPresent===undefined){
      fetch(`http://localhost:3000/studentList/${student.id}`,{
        method: 'PUT',
        body: JSON.stringify({
          name: student.name,
          isPresent: true
        }),
        headers:{
          'Content-type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(() => {
        fetch(`http://localhost:3000/studentList`)
        .then(response => response.json())
        .then(studentData =>{
          setStudentList(studentData.reverse())

        })
      })
    }else if(student.isPresent){
        alert("This student already in present list");
    }else{
        alert("This student already in abesent list");
    }
}

const absentHandler = (studentId) =>{
    const student = studentList.find((item)=>item.id===studentId);
    fetch(`http://localhost:3000/studentList/${student.id}`,{
      method: 'PUT',
      body: JSON.stringify({
        name: student.name,
        isPresent: false
      }),
      headers:{
        'Content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(() => {
      fetch(`http://localhost:3000/studentList`)
      .then(response => response.json())
      .then(studentData =>{
        setStudentList(studentData.reverse())

      })
    })
}

  return (
    <div>
      <h2>All Student</h2>
      <table>
        <thead>
          <tr>
            <td>Sr No.</td>
            <td>Student Name</td>
            <td>Action buttons</td>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student, index) => {
            return (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>
                  <button onClick={() => absentHandler(student.id)}>
                    Absent
                  </button>
                  <button onClick={() => presentHandler(student.id)}>
                    present
                  </button>
                  <button onClick={() => editBtnHandler(student.id)}>
                    Edit
                  </button>
                  <button onClick={() => deleteStudentFromList(student.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StudentListAll;
