import type { SubmissionStatus } from '@/lib/types'

const styles: Record<SubmissionStatus, string> = {
  submitted: 'bg-green-100 text-green-800',
  late: 'bg-yellow-100 text-yellow-800',
  missing: 'bg-red-100 text-red-800',
}

const labels: Record<SubmissionStatus, string> = {
  submitted: 'ส่งแล้ว',
  late: 'ส่งช้า',
  missing: 'ไม่ส่ง',
}

export default function StatusBadge({ status }: { status: SubmissionStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}
