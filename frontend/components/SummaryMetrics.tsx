import type { SubmissionWithAssignment } from '@/lib/types'

export default function SummaryMetrics({ submissions }: { submissions: SubmissionWithAssignment[] }) {
  const scored = submissions.filter((s) => s.score !== null)
  const avg = scored.length > 0
    ? scored.reduce((sum, s) => sum + (s.score ?? 0), 0) / scored.length
    : null

  const submitted = submissions.filter((s) => s.status === 'submitted').length
  const late = submissions.filter((s) => s.status === 'late').length
  const missing = submissions.filter((s) => s.status === 'missing').length

  const metrics = [
    { label: 'คะแนนเฉลี่ย', value: avg !== null ? avg.toFixed(1) : '-', color: 'text-blue-600' },
    { label: 'ส่งแล้ว', value: submitted, color: 'text-green-600' },
    { label: 'ส่งช้า', value: late, color: 'text-yellow-600' },
    { label: 'ไม่ส่ง', value: missing, color: 'text-red-600' },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.label} className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <p className={`text-3xl font-bold ${m.color}`}>{m.value}</p>
          <p className="mt-1 text-xs text-gray-500">{m.label}</p>
        </div>
      ))}
    </div>
  )
}
