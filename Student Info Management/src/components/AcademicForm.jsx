import { useEffect, useState, useMemo } from 'react'
import GuardianForm from './GuardianForm'

export default function AcademicForm({ onAdd, onUpdate, editing }) {
  const initial = useMemo(() => ({
    firstName: '',
    lastName: '',
    dob: '',
    admissionNo: '',
    classGrade: '',
    program: '',
    track: '',
    studentType: 'regular',
    guardian: { name: '', phone: '', email: '', relationship: '' },
  }), [])

  const [form, setForm] = useState(initial)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (editing) setForm(editing)
    else setForm(initial)
  }, [editing, initial])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleGuardianChange(next) {
    setForm(prev => ({ ...prev, guardian: { ...prev.guardian, ...next } }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const payload = { ...form }
    if (editing && editing.id) onUpdate(editing.id, payload)
    else onAdd(payload)
    setForm(initial)
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>First name</label>
      <input name="firstName" value={form.firstName} onChange={handleChange} required />

      <label>Last name</label>
      <input name="lastName" value={form.lastName} onChange={handleChange} required />

      <label>Date of birth</label>
      <input type="date" name="dob" value={form.dob} onChange={handleChange} />

      <label>Admission No.</label>
      <input name="admissionNo" value={form.admissionNo} onChange={handleChange} />

      <label>Program/Course</label>
      <input name="program" value={form.program} onChange={handleChange} />

      <label>Year / Grade</label>
      <input name="classGrade" value={form.classGrade} onChange={handleChange} />

      <label>Academic Track</label>
      <input name="track" value={form.track} onChange={handleChange} />

      <label>Student type</label>
      <select name="studentType" value={form.studentType} onChange={handleChange}>
        <option value="regular">Regular</option>
        <option value="irregular">Irregular</option>
      </select>

      <fieldset>
        <legend>Guardian</legend>
        <GuardianForm guardian={form.guardian} onChange={handleGuardianChange} />
      </fieldset>

      <div style={{ marginTop: 8 }}>
        <button type="submit">{editing ? 'Update Student' : 'Add Student'}</button>
      </div>
    </form>
  )
}
