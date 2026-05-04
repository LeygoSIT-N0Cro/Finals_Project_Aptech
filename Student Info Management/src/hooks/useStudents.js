import { useEffect, useState } from 'react'

const STORAGE_KEY = 'students'

function useStudents() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setStudents(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load students from storage:', e)
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
    setStudents(prev =>
      prev.map(s => (s.id === id ? { ...s, ...updates } : s))
    )
  }

  function removeStudent(id) {
    setStudents(prev => prev.filter(s => s.id !== id))
  }

  return { students, addStudent, updateStudent, removeStudent }
}

export default useStudents