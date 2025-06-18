"use client";
import { useRequireTeacherAuth } from "@/context/TeacherContext";
import { TeacherModules } from "../../../pages/TeacherModules";
import { TeacherProfile } from "@/pages/TeacherProfile";
export default function Page() { useRequireTeacherAuth(); return <TeacherProfile />; }