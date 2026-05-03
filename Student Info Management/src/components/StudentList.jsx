export default function StudentList({ students = [], onEdit = () => {}, onDelete = () => {} }) {
  if (!students.length) {
    return (
      <div className="empty-state">
        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📭</div>
        <div>No students recorded yet.</div>
        <div style={{ fontSize: '12px', marginTop: '4px' }}>Add a student using the form above.</div>
      </div>
    )
  }

  return (
    <div className="table-wrapper">
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Program</th>
            <th>Year / Grade</th>
            <th>Type</th>
            <th>Guardian</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>
                <div className="student-name">{s.firstName} {s.lastName}</div>
                {s.admissionNo && <div className="student-sub">#{s.admissionNo}</div>}
              </td>
              <td>
                <div>{s.program || '—'}</div>
                {s.track && <div className="student-sub">{s.track}</div>}
              </td>
              <td>{s.classGrade || '—'}</td>
              <td>
                <span className={`badge ${s.studentType === 'irregular' ? 'badge-irregular' : 'badge-regular'}`}>
                  {s.studentType === 'irregular' ? 'Irregular' : 'Regular'}
                </span>
              </td>
              <td>
                <div>{s.guardian?.name || '—'}</div>
                {s.guardian?.phone && <div className="student-sub">{s.guardian.phone}</div>}
              </td>
              <td>
                <button className="action-btn" onClick={() => onEdit(s)}>Edit</button>
                <button className="action-btn danger" onClick={() => onDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}