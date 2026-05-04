// StudentsPage.jsx
// Main page shown after login. Contains the tabbed interface
// for adding students, viewing records, and the dashboard.

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AcademicForm from '../components/AcademicForm'
import StudentList from '../components/StudentList'
import Dashboard from '../components/Dashboard'
import useStudents from '../hooks/useStudents'

export default function StudentsPage() {
  // Use our custom hook for all student data logic
  const { students, addStudent, updateStudent, removeStudent } = useStudents()

  // Track which student is being edited (null = add mode)
  const [editing, setEditing] = useState(null)

  // Track which tab is active
  const [activeTab, setActiveTab] = useState('form')

  const navigate = useNavigate()

  // Count students by type for the top bar stats
  const byType = students.reduce((acc, s) => {
    acc[s.studentType] = (acc[s.studentType] || 0) + 1
    return acc
  }, {})

  // Add student then switch to list view
  function handleAdd(student) {
    addStudent(student)
    setActiveTab('list')
  }

  // Update student then switch to list view
  function handleUpdate(id, updates) {
    updateStudent(id, updates)
    setEditing(null)
    setActiveTab('list')
  }

  // Set the student to edit and switch to form tab
  function handleEdit(student) {
    setEditing(student)
    setActiveTab('form')
  }

  // Remove student and clear editing state if needed
  function handleDelete(id) {
    removeStudent(id)
    if (editing && editing.id === id) setEditing(null)
  }

  // Log out by clearing auth and redirecting to login
  function handleLogout() {
    localStorage.removeItem('auth')
    navigate('/login')
  }

  return (
    <div className="app-wrapper">

      {/* ── Top bar with branding and stats ── */}
      <div className="topbar">
        <div className="brand">
          <div className="brand-icon">🎓</div>
          <div>
            <div className="brand-name">Student Info Management</div>
            <div className="brand-sub">Academic Records System</div>
          </div>
        </div>

        <div className="topbar-right">
          <div className="topbar-stats">
            <div className="stat-pill">
              <div className="stat-num">{students.length}</div>
              <div className="stat-label">Students</div>
            </div>
            <div className="stat-pill">
              <div className="stat-num">{byType.regular || 0}</div>
              <div className="stat-label">Regular</div>
            </div>
            <div className="stat-pill">
              <div className="stat-num">{byType.irregular || 0}</div>
              <div className="stat-label">Irregular</div>
            </div>
          </div>
          <button className="btn btn-ghost logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* ── Tab navigation ── */}
      <div className="tabs-bar">
        <button
          className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          <span className="tab-icon">📝</span>
          <span className="tab-label">{editing ? 'Edit Student' : 'Add Student'}</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          <span className="tab-icon">📋</span>
          <span className="tab-label">Student Records</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <span className="tab-icon">📊</span>
          <span className="tab-label">Dashboard</span>
        </button>
      </div>

      {/* ── Add / Edit Student panel ── */}
      {activeTab === 'form' && (
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">{editing ? 'Edit Student Record' : 'New Student'}</div>
              <div className="panel-sub">
                {editing ? 'Update the student information below' : 'Fill in the form to register a new student'}
              </div>
            </div>
            {editing && (
              <button className="btn btn-ghost" onClick={() => setEditing(null)}>
                Cancel Edit
              </button>
            )}
          </div>
          <AcademicForm
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            editing={editing}
          />
        </div>
      )}

      {/* ── Student Records panel ── */}
      {activeTab === 'list' && (
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">Student Records</div>
              <div className="panel-sub">
                {students.length} student{students.length !== 1 ? 's' : ''} enrolled
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => { setEditing(null); setActiveTab('form') }}
            >
              + Add Student
            </button>
          </div>
          <StudentList
            students={students}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* ── Dashboard panel ── */}
      {activeTab === 'dashboard' && (
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">Admin Dashboard</div>
              <div className="panel-sub">Overview of student enrollment</div>
            </div>
          </div>
          <Dashboard students={students} />
        </div>
      )}
    </div>
  )
}