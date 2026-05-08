// api.js
// Centralized API service for all data fetching.

const BASE_URL = 'http://localhost:3001'

export async function fetchStudents() {
  const res = await fetch(`${BASE_URL}/students`)
  if (!res.ok) throw new Error('Failed to fetch students')
  return res.json()
}

export async function createStudent(student) {
  const res = await fetch(`${BASE_URL}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  })
  if (!res.ok) throw new Error('Failed to create student')
  return res.json()
}

export async function updateStudent(id, updates) {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
  if (!res.ok) throw new Error('Failed to update student')
  return res.json()
}

export async function deleteStudent(id) {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete student')
}

export async function fetchLoginRecords() {
  const res = await fetch(`${BASE_URL}/loginRecords`)
  if (!res.ok) throw new Error('Failed to fetch login records')
  return res.json()
}

export async function createLoginRecord(record) {
  const res = await fetch(`${BASE_URL}/loginRecords`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  })
  if (!res.ok) throw new Error('Failed to save login record')
  return res.json()
}