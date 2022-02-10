import React from "react";

function AbsentStudents({studentList, presentAbsentToggle}) {
  return (
    <div>
      <h2>Absent Student</h2>
      <table>
        <thead>
          <tr>
            <td>Sr No.</td>
            <td>Student Name</td>
            <td>Action buttons</td>
          </tr>
        </thead>
        <tbody>
          {studentList
            .filter((student) => student.isPresent === false)
            .map((absentStudent, index) => {
              return (
                <tr key={absentStudent.id}>
                  <td>{index + 1}</td>
                  <td>{absentStudent.name}</td>
                  <td>
                    <button
                      onClick={() => presentAbsentToggle(absentStudent.id)}
                    >
                      Make Present
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
export default AbsentStudents;
