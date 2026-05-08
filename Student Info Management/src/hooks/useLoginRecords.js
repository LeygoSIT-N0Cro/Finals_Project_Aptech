// useLoginRecords.js
// Custom hook for saving and retrieving login history.

import { useEffect, useState } from 'react'
import { fetchLoginRecords, createLoginRecord } from '../services/api'

function useLoginRecords() {
  const [records, setRecords] = useState([])

  useEffect(() => {
    fetchLoginRecords()
      .then(data => setRecords(data))
      .catch(err => console.error('Failed to load login records:', err))
  }, [])

  async function addRecord(username, success) {
    const newRecord = {
      username,
      success,
      timestamp: new Date().toLocaleString(),
    }
    try {
      const saved = await createLoginRecord(newRecord)
      setRecords(prev => [saved, ...prev])
    } catch (err) {
      console.error('Failed to save login record:', err)
    }
  }

  return { records, addRecord }
}

export default useLoginRecords