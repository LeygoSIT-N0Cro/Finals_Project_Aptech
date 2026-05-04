// AcademicForm.jsx
// Handles both adding new students and editing existing ones.
// Switches between add/edit mode based on the `editing` prop.
// Embeds GuardianForm as a sub-form inside a fieldset.


import { useEffect, useState, useMemo } from 'react'
import GuardianForm from './GuardianForm'

export default function AcademicForm({ onAdd, onUpdate, editing }) {
  const initial = useMemo(() => ({
    firstName: '', lastName: '', dob: '', admissionNo: '',
    classGrade: '', program: '', track: '', studentType: 'regular',
    guardian: { name: '', phone: '', email: '', relationship: '' },
  }), [])

  const [form, setForm] = useState(initial)

  useEffect(() => {
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
    if (editing && editing.id) onUpdate(editing.id, { ...form })
    else onAdd({ ...form })
    setForm(initial)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">First name</label>
          <input className="form-input" name="firstName" value={form.firstName} onChange={handleChange} placeholder="e.g. Juan" required />
        </div>
        <div className="form-group">
          <label className="form-label">Last name</label>
          <input className="form-input" name="lastName" value={form.lastName} onChange={handleChange} placeholder="e.g. dela Cruz" required />
        </div>
        <div className="form-group">
          <label className="form-label">Date of birth</label>
          <input className="form-input" type="date" name="dob" value={form.dob} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Admission No.</label>
          <input className="form-input" name="admissionNo" value={form.admissionNo} onChange={handleChange} placeholder="e.g. 2024-0001" />
        </div>
        <div className="form-group">
          <label className="form-label">Program / Course</label>
          <input className="form-input" name="program" value={form.program} onChange={handleChange} placeholder="e.g. BSIT" />
        </div>
        <div className="form-group">
          <label className="form-label">Year / Grade</label>
          <input className="form-input" name="classGrade" value={form.classGrade} onChange={handleChange} placeholder="e.g. 2nd Year" />
        </div>
        <div className="form-group">
          <label className="form-label">Academic track</label>
          <input className="form-input" name="track" value={form.track} onChange={handleChange} placeholder="e.g. Programming" />
        </div>
        <div className="form-group">
          <label className="form-label">Student type</label>
          <select className="form-select" name="studentType" value={form.studentType} onChange={handleChange}>
            <option value="regular">Regular</option>
            <option value="irregular">Irregular</option>
          </select>
        </div>
        <div className="form-group full">
          <fieldset className="guardian-fieldset">
            <legend className="guardian-legend">Guardian Information</legend>
            <div style={{ marginTop: '12px' }}>
              <GuardianForm guardian={form.guardian} onChange={handleGuardianChange} />
            </div>
          </fieldset>
        </div>
      </div>
      <div className="btn-row">
        <button type="button" className="btn btn-ghost" onClick={() => setForm(initial)}>Clear</button>
        <button type="submit" className="btn btn-primary">
          {editing ? '✓ Update Student' : '+ Add Student'}
        </button>
      </div>
    </form>
  )
}