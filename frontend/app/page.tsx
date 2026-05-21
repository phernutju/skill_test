import { Suspense } from 'react'
import { getStudent, getSubmissions } from '@/lib/data'
import StudentInfo from '@/components/StudentInfo'
import SummaryMetrics from '@/components/SummaryMetrics'
import ViewToggle from '@/components/ViewToggle'
import InstructorRow from '@/components/InstructorRow'
import StudentNoteRow from '@/components/StudentNoteRow'
import OverallComment from '@/components/OverallComment'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>
}) {
  const { view } = await searchParams
  const isInstructor = view === 'instructor'

  const student = await getStudent()
  if (!student) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">ไม่พบข้อมูลนักศึกษา กรุณา seed ข้อมูลก่อน</p>
      </main>
    )
  }

  const submissions = await getSubmissions(student.id)

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">ระบบติดตามผลการเรียน</h1>
          <Suspense>
            <ViewToggle />
          </Suspense>
        </div>

        {/* Student Info */}
        <StudentInfo student={student} />

        {/* Summary Metrics */}
        <SummaryMetrics submissions={submissions} />

        {/* Overall Comment — instructor editable */}
        {isInstructor && (
          <OverallComment studentId={student.id} initialComment={student.overall_comment} />
        )}

        {/* Overall Comment — student read-only */}
        {!isInstructor && student.overall_comment && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <p className="text-xs font-semibold text-blue-600 mb-1">ความคิดเห็นจากอาจารย์</p>
            <p className="text-sm text-blue-900">{student.overall_comment}</p>
          </div>
        )}

        {/* Assignment Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">
              {isInstructor ? 'แก้ไขงาน / การสอบ' : 'งานและการสอบ'}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="pl-6 py-3 pr-4 text-xs font-medium text-gray-500 uppercase tracking-wide">ชื่องาน</th>
                  <th className="py-3 pr-4 text-xs font-medium text-gray-500 uppercase tracking-wide">ประเภท</th>
                  <th className="py-3 pr-4 text-xs font-medium text-gray-500 uppercase tracking-wide">กำหนดส่ง</th>
                  <th className="py-3 pr-4 text-xs font-medium text-gray-500 uppercase tracking-wide">สถานะ</th>
                  <th className="py-3 pr-4 text-xs font-medium text-gray-500 uppercase tracking-wide">คะแนน</th>
                  <th className="py-3 pr-4 text-xs font-medium text-gray-500 uppercase tracking-wide">หมายเหตุอาจารย์</th>
                  <th className="py-3 pr-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {isInstructor ? 'Action' : 'บันทึกส่วนตัว'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) =>
                  isInstructor ? (
                    <InstructorRow key={sub.id} sub={sub} />
                  ) : (
                    <StudentNoteRow key={sub.id} sub={sub} />
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
