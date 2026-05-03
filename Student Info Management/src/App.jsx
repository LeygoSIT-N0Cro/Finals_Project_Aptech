import { useEffect, useState } from 'react'
import AcademicForm from './components/AcademicForm'
import StudentList from './components/StudentList'
import Dashboard from './components/Dashboard'
import './App.css'

const STORAGE_KEY = 'students'

export default function App() {
  const [students, setStudents] = useState([])
  const [editing, setEditing] = useState(null)
  const [activeTab, setActiveTab] = useState('form')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setStudents(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load students', e)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
  }, [students])

  function addStudent(student) {
    const id = Date.now().toString()
    setStudents(prev => [...prev, { id, ...student }])
    setActiveTab('list')
  }

  function updateStudent(id, updates) {
    setStudents(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)))
    setEditing(null)
    setActiveTab('list')
  }

  function removeStudent(id) {
    setStudents(prev => prev.filter(s => s.id !== id))
    if (editing && editing.id === id) setEditing(null)
  }

  function handleEdit(student) {
    setEditing(student)
    setActiveTab('form')
  }

  const byType = students.reduce((acc, s) => {
    acc[s.studentType] = (acc[s.studentType] || 0) + 1
    return acc
  }, {})

  return (
    <div className="app-wrapper">
      <div className="topbar">
        <div className="brand">
          <div className="brand-icon">🎓</div>
          <div>
            <div className="brand-name">Student Info Management</div>
            <div className="brand-sub">Academic Records System</div>
          </div>
        </div>
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
      </div>

      <div className="tabs-bar">
        <button className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`} onClick={() => setActiveTab('form')}>
          <span className="tab-icon">📝</span>
          <span className="tab-label">{editing ? 'Edit Student' : 'Add Student'}</span>
        </button>
        <button className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>
          <span className="tab-icon">📋</span>
          <span className="tab-label">Student Records</span>
        </button>
        <button className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
          <span className="tab-icon">📊</span>
          <span className="tab-label">Dashboard</span>
        </button>
      </div>

      {activeTab === 'form' && (
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">{editing ? 'Edit Student Record' : 'New Student'}</div>
              <div className="panel-sub">{editing ? 'Update the student information below' : 'Fill in the form to register a new student'}</div>
            </div>
            {editing && (
              <button className="btn btn-ghost" onClick={() => setEditing(null)}>Cancel Edit</button>
            )}
          </div>
          <AcademicForm onAdd={addStudent} onUpdate={updateStudent} editing={editing} />
        </div>
      )}

      {activeTab === 'list' && (
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">Student Records</div>
              <div className="panel-sub">{students.length} student{students.length !== 1 ? 's' : ''} enrolled</div>
            </div>
            <button className="btn btn-primary" onClick={() => { setEditing(null); setActiveTab('form') }}>
              + Add Student
            </button>
          </div>
          <StudentList students={students} onEdit={handleEdit} onDelete={removeStudent} />
        </div>
      )}

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