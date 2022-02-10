import React from "react";

function PresentStudents({studentList, presentAbsentToggle}) {

  return (
    <div>
      <h2>Present Student</h2>
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
            .filter((student) => student.isPresent === true)
            .map((presentStudent, index) => {
              return (
                <tr key={presentStudent.id}>
                  <td>{index + 1}</td>
                  <td>{presentStudent.name}</td>
                  <td>
                    <button
                      onClick={() => presentAbsentToggle(presentStudent.id)}
                    >
                      Make Absent
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
export default PresentStudents;
