'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'
import type { SubmissionStatus } from '@/lib/types'

export async function updateSubmission(
  id: string,
  data: { status?: SubmissionStatus; score?: number | null; instructor_note?: string | null }
) {
  await supabase.from('submissions').update(data).eq('id', id)
  revalidatePath('/')
}

export async function updateStudentNote(id: string, student_note: string) {
  await supabase.from('submissions').update({ student_note }).eq('id', id)
  revalidatePath('/')
}

export async function updateOverallComment(studentId: string, overall_comment: string) {
  await supabase.from('students').update({ overall_comment }).eq('id', studentId)
  revalidatePath('/')
}
