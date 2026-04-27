

export default function Dashboard({ students = [] }) {
  const total = students.length
  const byProgram = students.reduce((acc, s) => {
    const k = s.program || 'Unassigned'
    acc[k] = (acc[k] || 0) + 1
    return acc
  }, {})

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <p>Total students: <strong>{total}</strong></p>

      <h3>By Program</h3>
      <ul>
        {Object.entries(byProgram).map(([prog, count]) => (
          <li key={prog}>{prog}: {count}</li>
        ))}
      </ul>

      <h3>Roles & Access</h3>
      <p>Simple local app — no users yet. Integrate auth for role management.</p>
    </div>
  )
}
