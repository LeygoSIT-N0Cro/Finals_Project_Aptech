// useStudents.js
// Custom hook that handles all student data logic.

import { useEffect, useState } from 'react'
import { fetchStudents, createStudent, updateStudent, deleteStudent } from '../services/api'

function useStudents() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchStudents()
      .then(data => setStudents(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function addStudent(student) {
    try {
      const created = await createStudent(student)
      setStudents(prev => [...prev, created])
    } catch (err) {
      setError(err.message)
    }
  }

  async function updateStudentById(id, updates) {
    try {
      const updated = await updateStudent(id, { id, ...updates })
      setStudents(prev => prev.map(s => (s.id === id ? updated : s)))
    } catch (err) {
      setError(err.message)
    }
  }

  async function removeStudent(id) {
    try {
      await deleteStudent(id)
      setStudents(prev => prev.filter(s => s.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return { students, loading, error, addStudent, updateStudentById, removeStudent }
}

export default useStudents