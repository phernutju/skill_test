export type SubmissionStatus = 'submitted' | 'late' | 'missing'
export type AssignmentType = 'assignment' | 'exam'

export interface Student {
  id: string
  name: string
  student_id: string
  academic_year: string
  faculty: string
  overall_comment: string | null
}

export interface Assignment {
  id: string
  name: string
  type: AssignmentType
  due_date: string
  max_score: number
}

export interface Submission {
  id: string
  student_id: string
  assignment_id: string
  status: SubmissionStatus
  score: number | null
  instructor_note: string | null
  student_note: string | null
}

export interface SubmissionWithAssignment extends Submission {
  assignments: Assignment
}
