import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { courses } from "@/lib/courses"
import type { Student, StudentStatus } from "@/lib/types"
import { loadStudents, saveStudents } from "@/lib/storage"
import { Badge } from "@/components/ui/badge"

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [name, setName] = useState("")
  const [courseId, setCourseId] = useState("")
  const [status, setStatus] = useState<StudentStatus>("Not Started")

  useEffect(() => {
    setStudents(loadStudents())
  }, [])

  function addStudent() {
    const newStudent: Student = {
      id: crypto.randomUUID(),
      name,
      courseId,
      status,
    }

    const updated = [...students, newStudent]
    setStudents(updated)
    saveStudents(updated)

    setName("")
    setCourseId("")
    setStatus("Not Started")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Students</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Student</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Student</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                placeholder="Student name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Select value={courseId} onValueChange={setCourseId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={status} onValueChange={(v) => setStatus(v as StudentStatus)} required>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Button className="w-full" onClick={addStudent}>
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="p-3">{s.name}</td>
                <td className="p-3">
                  {courses.find((c) => c.id === s.courseId)?.title}
                </td>
                <td className="p-3">{
                    s.status === "Completed" ? <Badge variant="outline">{s.status}</Badge> :
                    s.status === "Pending" ? <Badge variant="secondary">{s.status}</Badge> :
                    <Badge variant="destructive">{s.status}</Badge>
                }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
