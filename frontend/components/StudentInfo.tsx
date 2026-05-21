import type { Student } from '@/lib/types'

export default function StudentInfo({ student }: { student: Student }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลนักศึกษา</h2>
      <dl className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
        <div>
          <dt className="text-xs text-gray-500">ชื่อ-นามสกุล</dt>
          <dd className="mt-0.5 text-sm font-medium text-gray-900">{student.name}</dd>
        </div>
        <div>
          <dt className="text-xs text-gray-500">รหัสนักศึกษา</dt>
          <dd className="mt-0.5 text-sm font-medium text-gray-900">{student.student_id}</dd>
        </div>
        <div>
          <dt className="text-xs text-gray-500">ชั้นปี</dt>
          <dd className="mt-0.5 text-sm font-medium text-gray-900">ปีที่ {student.academic_year}</dd>
        </div>
        <div>
          <dt className="text-xs text-gray-500">คณะ</dt>
          <dd className="mt-0.5 text-sm font-medium text-gray-900">{student.faculty}</dd>
        </div>
      </dl>
    </div>
  )
}
