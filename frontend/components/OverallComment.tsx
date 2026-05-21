'use client'

import { useState } from 'react'
import { updateOverallComment } from '@/app/actions'

export default function OverallComment({
  studentId,
  initialComment,
}: {
  studentId: string
  initialComment: string | null
}) {
  const [comment, setComment] = useState(initialComment ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = async () => {
    setSaving(true)
    await updateOverallComment(studentId, comment)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">ความคิดเห็นโดยรวม (อาจารย์)</h3>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="เพิ่มความคิดเห็นโดยรวมสำหรับนักศึกษา..."
      />
      <div className="mt-2 flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {saved ? 'บันทึกแล้ว ✓' : saving ? 'กำลังบันทึก...' : 'บันทึกความคิดเห็น'}
        </button>
      </div>
    </div>
  )
}
