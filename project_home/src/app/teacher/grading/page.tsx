"use client";
import { useRequireTeacherAuth } from "@/context/TeacherContext";
import { TeacherGrading } from "../../../pages/TeacherGrading";
export default function Page() { useRequireTeacherAuth(); return <TeacherGrading />; }