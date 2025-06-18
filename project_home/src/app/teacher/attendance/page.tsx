"use client";
import { useRequireTeacherAuth } from "@/context/TeacherContext";
import { TeacherAttendance } from "../../../pages/TeacherAttendance";
export default function Page() { useRequireTeacherAuth(); return <TeacherAttendance />; }