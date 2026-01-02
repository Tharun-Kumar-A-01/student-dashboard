export type Course = {
  id: string
  title: string
  duration: string
  image: string
}

export type StudentStatus = "Not Started" | "Pending" | "Completed"

export type Student = {
  id: string
  name: string
  courseId: string
  status: StudentStatus
}
