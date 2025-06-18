// --- START OF FILE: app/teacher/planning/page.tsx ---

"use client";
import { useRequireTeacherAuth } from "@/context/TeacherContext";
import { TeacherPlanning } from "../../../pages/TeacherPlanning";

export default function Page() {
    // This hook will redirect to /login if the user is not an authenticated teacher.
    useRequireTeacherAuth(); 

    // Render the page component.
    return <TeacherPlanning />;
}
// --- END OF FILE: app/teacher/planning/page.tsx ---