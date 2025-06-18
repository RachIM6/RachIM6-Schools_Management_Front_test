"use client";
import { useRequireTeacherAuth } from "@/context/TeacherContext";
import { TeacherGrading } from "../../../pages/TeacherGrading";
import { TeacherJustifications } from "@/pages/TeacherJustifications";
export default function Page() { useRequireTeacherAuth(); return <TeacherJustifications />; }