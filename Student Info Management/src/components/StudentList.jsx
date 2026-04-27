

export default function StudentList({ students = [], onEdit = () => {}, onDelete = () => {} }) {
  if (!students.length) return <p>No students recorded yet.</p>

  return (
    <div className="student-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Program</th>
            <th>Year</th>
            <th>Guardian</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.firstName} {s.lastName}</td>
              <td>{s.program}</td>
              <td>{s.classGrade}</td>
              <td>{s.guardian?.name} ({s.guardian?.phone})</td>
              <td>
                <button onClick={() => onEdit(s)}>Edit</button>
                <button onClick={() => onDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
