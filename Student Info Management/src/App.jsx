import { useEffect, useState } from 'react'
import AcademicForm from './components/AcademicForm'
import GuardianForm from './components/GuardianForm'
import StudentList from './components/StudentList'
import Dashboard from './components/Dashboard'
import './App.css'

const STORAGE_KEY = 'students'

export default function App() {
  const [students, setStudents] = useState([])
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
  }

  function updateStudent(id, updates) {
    setStudents(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)))
    setEditing(null)
  }

  function removeStudent(id) {
    setStudents(prev => prev.filter(s => s.id !== id))
    if (editing && editing.id === id) setEditing(null)
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Student Information Management</h1>
      </header>
      <div className="main-content">
        <section className="section">
          <h2>Academic & Guardian Info</h2>
          <AcademicForm
            onAdd={addStudent}
            onUpdate={updateStudent}
            editing={editing}
          />
        </section>
        <section className="section">
          <h2>Student Records</h2>
          <StudentList
            students={students}
            onEdit={setEditing}
            onDelete={removeStudent}
          />
        </section>
        <section className="section">
          <Dashboard students={students} />
        </section>
      </div>
    </div>
  )
}
