"use client";
import { useRequireTeacherAuth } from "@/context/TeacherContext";
import { TeacherModules } from "../../../pages/TeacherModules";
export default function Page() { useRequireTeacherAuth(); return <TeacherModules />; }