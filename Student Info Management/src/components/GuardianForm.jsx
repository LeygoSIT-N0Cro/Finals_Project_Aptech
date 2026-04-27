

export default function GuardianForm({ guardian = {}, onChange = () => {} }) {
  function handle(e) {
    const { name, value } = e.target
    onChange({ [name]: value })
  }

  return (
    <div className="guardian-form">
      <label>Guardian Name</label>
      <input name="name" value={guardian.name || ''} onChange={handle} />

      <label>Relationship</label>
      <input name="relationship" value={guardian.relationship || ''} onChange={handle} />

      <label>Phone</label>
      <input name="phone" value={guardian.phone || ''} onChange={handle} />

      <label>Email</label>
      <input name="email" value={guardian.email || ''} onChange={handle} />
    </div>
  )
}
