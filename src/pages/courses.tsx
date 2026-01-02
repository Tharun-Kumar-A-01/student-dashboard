import { courses } from "@/lib/courses"
import { loadStudents } from "@/lib/storage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock10 } from "lucide-react"

export default function CoursesPage() {
  const students = loadStudents()

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-3">
      {courses.map((course) => {
        const count = students.filter((s) => s.courseId === course.id).length

        return (
          <Card key={course.id} className="p-4">
            <img
              src={course.image}
              className="h-40 w-full object-cover rounded-md"
            />
            <CardHeader className="p-0">
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-x-1 p-0">
              <Badge><Clock10/> {course.duration}</Badge>
              <Badge variant={"secondary"}> {24+count} Students</Badge>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
