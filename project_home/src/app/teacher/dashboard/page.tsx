"use client";
import { useRequireTeacherAuth } from "@/context/TeacherContext";
import { TeacherDashboard } from "../../../pages/TeacherDashboard";
export default function Page() { useRequireTeacherAuth(); return <TeacherDashboard />; }