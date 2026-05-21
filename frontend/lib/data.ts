import { supabase } from './supabase'
import type { Student, SubmissionWithAssignment } from './types'

export async function getStudent(): Promise<Student | null> {
  const { data } = await supabase
    .from('students')
    .select('*')
    .limit(1)
    .single()
  return data
}

export async function getSubmissions(studentId: string): Promise<SubmissionWithAssignment[]> {
  const { data } = await supabase
    .from('submissions')
    .select('*, assignments(*)')
    .eq('student_id', studentId)
  return (data ?? []) as SubmissionWithAssignment[]
}
