'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function ViewToggle() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get('view') ?? 'student'

  const toggle = (view: string) => router.push(`/?view=${view}`)

  return (
    <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => toggle('student')}
        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
          current === 'student'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        มุมมองนักศึกษา
      </button>
      <button
        onClick={() => toggle('instructor')}
        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
          current === 'instructor'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        มุมมองอาจารย์
      </button>
    </div>
  )
}
