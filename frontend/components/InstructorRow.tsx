'use client'

import { useState } from 'react'
import { updateSubmission } from '@/app/actions'
import StatusBadge from './StatusBadge'
import type { SubmissionStatus, SubmissionWithAssignment } from '@/lib/types'

const STATUS_OPTIONS: SubmissionStatus[] = ['submitted', 'late', 'missing']
const STATUS_LABELS: Record<SubmissionStatus, string> = {
  submitted: 'ส่งแล้ว',
  late: 'ส่งช้า',
  missing: 'ไม่ส่ง',
}

export default function InstructorRow({ sub }: { sub: SubmissionWithAssignment }) {
  const [status, setStatus] = useState<SubmissionStatus>(sub.status)
  const [score, setScore] = useState(sub.score?.toString() ?? '')
  const [note, setNote] = useState(sub.instructor_note ?? '')
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    await updateSubmission(sub.id, {
      status,
      score: score === '' ? null : Number(score),
      instructor_note: note || null,
    })
    setSaving(false)
  }

  return (
    <tr className="border-t border-gray-100">
      <td className="pl-6 py-3 pr-4 text-sm text-gray-900">{sub.assignments.name}</td>
      <td className="py-3 pr-4 text-xs text-gray-500">{sub.assignments.type === 'assignment' ? 'งาน' : 'สอบ'}</td>
      <td className="py-3 pr-4 text-sm text-gray-600">
        {new Date(sub.assignments.due_date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })}
      </td>
      <td className="py-3 pr-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as SubmissionStatus)}
          className="text-xs border border-gray-200 rounded px-2 py-1 bg-white"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
      </td>
      <td className="py-3 pr-4">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <input
            type="number"
            min={0}
            max={sub.assignments.max_score}
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-16 border border-gray-200 rounded px-2 py-1 text-sm text-right"
            placeholder="-"
          />
          <span className="text-xs text-gray-400">/{sub.assignments.max_score}</span>
        </div>
      </td>
      <td className="py-3 pr-4">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border border-gray-200 rounded px-2 py-1 text-sm"
          placeholder="เพิ่มหมายเหตุ..."
        />
      </td>
      <td className="py-3 text-right">
        <button
          onClick={save}
          disabled={saving}
          className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {saving ? 'กำลังบันทึก...' : 'บันทึก'}
        </button>
      </td>
    </tr>
  )
}
