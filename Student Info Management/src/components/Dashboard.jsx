// Dashboard.jsx
// Shows an overview of student enrollment statistics.
// Displays total count, breakdown by type, and a bar chart by program.

export default function Dashboard({ students = [] }) {
  const total = students.length
  const regular = students.filter(s => s.studentType === 'regular').length
  const irregular = students.filter(s => s.studentType === 'irregular').length

  const byProgram = students.reduce((acc, s) => {
    const k = s.program?.trim() || 'Unassigned'
    acc[k] = (acc[k] || 0) + 1
    return acc
  }, {})

  const programEntries = Object.entries(byProgram).sort((a, b) => b[1] - a[1])
  const maxCount = programEntries[0]?.[1] || 1
  const barColors = ['#534AB7', '#1D9E75', '#D85A30', '#BA7517', '#3C3489']

  return (
    <div>
      <div className="dash-stats">
        <div className="dash-card">
          <div className="dash-card-num purple-num">{total}</div>
          <div className="dash-card-label">Total students</div>
        </div>
        <div className="dash-card">
          <div className="dash-card-num teal-num">{regular}</div>
          <div className="dash-card-label">Regular</div>
        </div>
        <div className="dash-card">
          <div className="dash-card-num coral-num">{irregular}</div>
          <div className="dash-card-label">Irregular</div>
        </div>
      </div>

      {programEntries.length > 0 ? (
        <>
          <div className="dash-section-title">Students by program</div>
          {programEntries.map(([prog, count], i) => (
            <div className="prog-row" key={prog}>
              <div className="prog-name" title={prog}>{prog}</div>
              <div className="prog-bar-bg">
                <div className="prog-bar-fill" style={{
                  width: `${(count / maxCount) * 100}%`,
                  background: barColors[i % barColors.length],
                }} />
              </div>
              <div className="prog-count">{count}</div>
            </div>
          ))}
        </>
      ) : (
        <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
          No program data yet — add students to see the breakdown.
        </div>
      )}

      <div className="dash-note">
        This is a local app — data is saved in your browser. No login or server required.
      </div>
    </div>
  )
}