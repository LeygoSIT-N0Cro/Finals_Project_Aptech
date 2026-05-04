// GuardianForm.jsx
// Reusable form sub-component for guardian information.
// Controlled by parent via the `guardian` prop and `onChange` callback.

export default function GuardianForm({ guardian = {}, onChange = () => {} }) {
  function handle(e) {
    const { name, value } = e.target
    onChange({ [name]: value })
  }

  return (
    <div className="form-grid">
      <div className="form-group">
        <label className="form-label">Guardian name</label>
        <input className="form-input" name="name" value={guardian.name || ''} onChange={handle} placeholder="Full name" />
      </div>
      <div className="form-group">
        <label className="form-label">Relationship</label>
        <input className="form-input" name="relationship" value={guardian.relationship || ''} onChange={handle} placeholder="e.g. Mother" />
      </div>
      <div className="form-group">
        <label className="form-label">Phone</label>
        <input className="form-input" name="phone" value={guardian.phone || ''} onChange={handle} placeholder="09XX XXX XXXX" />
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input className="form-input" name="email" value={guardian.email || ''} onChange={handle} placeholder="guardian@email.com" />
      </div>
    </div>
  )
}