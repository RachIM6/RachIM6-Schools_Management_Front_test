// --- START OF FILE: app/teacher/schedule/page.tsx ---

"use client";
import { useRequireTeacherAuth } from "@/context/TeacherContext";
import { TeacherSchedule } from "../../../pages/TeacherSchedule";

export default function Page() {
    // This hook will redirect to /login if the user is not an authenticated teacher.
    useRequireTeacherAuth(); 
    
    // Render the page component.
    return <TeacherSchedule />;
}
// --- END OF FILE: app/teacher/schedule/page.tsx ---