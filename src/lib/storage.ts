import type { Student } from "./types"

const KEY = "students"

export function loadStudents(): Student[] {
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : []
}

export function saveStudents(students: Student[]) {
  localStorage.setItem(KEY, JSON.stringify(students))
}
