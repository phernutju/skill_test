'use client'

import { useState } from 'react'
import { updateStudentNote } from '@/app/actions'
import StatusBadge from './StatusBadge'
import type { SubmissionWithAssignment } from '@/lib/types'

export default function StudentNoteRow({ sub }: { sub: SubmissionWithAssignment }) {
  const [note, setNote] = useState(sub.student_note ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = async () => {
    setSaving(true)
    await updateStudentNote(sub.id, note)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <tr className="border-t border-gray-100">
      <td className="pl-6 py-3 pr-4 text-sm text-gray-900">{sub.assignments.name}</td>
      <td className="py-3 pr-4 text-xs text-gray-500">{sub.assignments.type === 'assignment' ? 'งาน' : 'สอบ'}</td>
      <td className="py-3 pr-4 text-sm text-gray-600">
        {new Date(sub.assignments.due_date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })}
      </td>
      <td className="py-3 pr-4">
        <StatusBadge status={sub.status} />
      </td>
      <td className="py-3 pr-4 text-sm text-gray-900 text-right">
        {sub.score !== null ? (
          <span>{sub.score}<span className="text-xs text-gray-400">/{sub.assignments.max_score}</span></span>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>
      <td className="py-3 pr-4 text-sm text-gray-600">{sub.instructor_note ?? '-'}</td>
      <td className="py-3">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm"
            placeholder="บันทึกส่วนตัว..."
          />
          <button
            onClick={save}
            disabled={saving}
            className="text-xs bg-gray-800 text-white px-3 py-1.5 rounded-md hover:bg-gray-900 disabled:opacity-50 transition-colors whitespace-nowrap"
          >
            {saved ? 'บันทึกแล้ว' : saving ? '...' : 'บันทึก'}
          </button>
        </div>
      </td>
    </tr>
  )
}
