-- ==========================================
-- Schema
-- ==========================================

CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  student_id TEXT NOT NULL UNIQUE,
  academic_year TEXT NOT NULL,
  faculty TEXT NOT NULL,
  overall_comment TEXT
);

CREATE TABLE IF NOT EXISTS assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('assignment', 'exam')),
  due_date DATE NOT NULL,
  max_score INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('submitted', 'late', 'missing')),
  score INTEGER,
  instructor_note TEXT,
  student_note TEXT,
  UNIQUE(student_id, assignment_id)
);

-- ==========================================
-- Seed: single student demo
-- ==========================================

-- Student
INSERT INTO students (id, name, student_id, academic_year, faculty)
VALUES (
  'a1b2c3d4-0000-0000-0000-000000000001',
  'ชฎิมา เอี่ยมชะนะ',
  '67130500807',
  '3',
  'วิทยาศาสตร์และเทคโนโลยีสารสนเทศ'
);

-- Assignments
INSERT INTO assignments (id, name, type, due_date, max_score) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Lab 1: HTML & CSS Basics',      'assignment', '2025-09-15', 10),
  ('a0000000-0000-0000-0000-000000000002', 'Lab 2: JavaScript Fundamentals', 'assignment', '2025-09-29', 10),
  ('a0000000-0000-0000-0000-000000000003', 'Midterm Exam',                   'exam',       '2025-10-15', 30),
  ('a0000000-0000-0000-0000-000000000004', 'Lab 3: React Basics',            'assignment', '2025-10-27', 10),
  ('a0000000-0000-0000-0000-000000000005', 'Lab 4: Next.js & API Routes',    'assignment', '2025-11-10', 10),
  ('a0000000-0000-0000-0000-000000000006', 'Final Exam',                     'exam',       '2025-12-01', 30);

-- Submissions
INSERT INTO submissions (student_id, assignment_id, status, score, instructor_note, student_note) VALUES
  (
    'a1b2c3d4-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'submitted', 9,
    'ทำได้ดีมาก โครงสร้าง HTML ถูกต้อง',
    'ทำเสร็จก่อนกำหนด 2 วัน'
  ),
  (
    'a1b2c3d4-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000002',
    'late', 7,
    'ส่งช้า 1 วัน ตัด 1 คะแนน logic ถูกต้อง',
    'ติดปัญหาเรื่อง async/await'
  ),
  (
    'a1b2c3d4-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000003',
    'submitted', 24,
    'ผ่านได้ดี ส่วน CSS grid ยังต้องฝึกเพิ่ม',
    NULL
  ),
  (
    'a1b2c3d4-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000004',
    'submitted', 10,
    'Full marks! Component design ดีมาก',
    'ชอบ React hooks มาก'
  ),
  (
    'a1b2c3d4-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000005',
    'missing', NULL,
    NULL,
    NULL
  ),
  (
    'a1b2c3d4-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000006',
    'submitted', NULL,
    NULL,
    NULL
  );
