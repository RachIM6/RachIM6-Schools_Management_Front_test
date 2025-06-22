import { AcademicYear, Semester, Major, Module, ModuleInstance, StudentProfile, TeacherProfile } from '../types';

// Academic Years
export const academicYears: AcademicYear[] = [
  {
    id: "ay-2023-2024",
    name: "2023-2024",
    startDate: "2023-09-01",
    endDate: "2024-08-31",
    isActive: false
  },
  {
    id: "ay-2024-2025",
    name: "2024-2025",
    startDate: "2024-09-01",
    endDate: "2025-08-31",
    isActive: true
  }
];

// Semesters
export const semesters: Semester[] = [
  // 2023-2024
  {
    id: "sem-2023-2024-s1",
    name: "S1",
    academicYearId: "ay-2023-2024",
    startDate: "2023-09-01",
    endDate: "2024-01-31",
    isActive: false
  },
  {
    id: "sem-2023-2024-s2",
    name: "S2",
    academicYearId: "ay-2023-2024",
    startDate: "2024-02-01",
    endDate: "2024-06-30",
    isActive: false
  },
  // 2024-2025
  {
    id: "sem-2024-2025-s1",
    name: "S1",
    academicYearId: "ay-2024-2025",
    startDate: "2024-09-01",
    endDate: "2025-01-31",
    isActive: false
  },
  {
    id: "sem-2024-2025-s2",
    name: "S2",
    academicYearId: "ay-2024-2025",
    startDate: "2025-02-01",
    endDate: "2025-06-30",
    isActive: true
  }
];

// Majors (Filières)
export const majors: Major[] = [
  {
    id: "major-cs",
    name: "Computer Science Engineering",
    code: "CS",
    description: "Computer Science and Software Engineering program",
    departmentId: "dept-cs"
  },
  {
    id: "major-physics",
    name: "Applied Physics",
    code: "PH",
    description: "Applied Physics and Engineering program",
    departmentId: "dept-physics"
  },
  {
    id: "major-math",
    name: "Mathematics",
    code: "MA",
    description: "Pure and Applied Mathematics program",
    departmentId: "dept-math"
  }
];

// Modules
export const modules: Module[] = [
  // Computer Science Modules
  {
    id: "mod-cs301",
    name: "Advanced Algorithms",
    code: "CS301",
    description: "Deep dive into algorithm design, complexity analysis, and optimization techniques.",
    credits: 6,
    majorId: "major-cs",
    prerequisites: ["CS201"]
  },
  {
    id: "mod-cs305",
    name: "Operating Systems",
    code: "CS305",
    description: "Explore the core concepts of modern operating systems, from kernels to file systems.",
    credits: 6,
    majorId: "major-cs",
    prerequisites: ["CS201", "CS202"]
  },
  {
    id: "mod-cs201",
    name: "Data Structures",
    code: "CS201",
    description: "Learn about fundamental data structures used in modern software.",
    credits: 6,
    majorId: "major-cs"
  },
  {
    id: "mod-cs202",
    name: "Programming Fundamentals",
    code: "CS202",
    description: "Core programming concepts and software development practices.",
    credits: 6,
    majorId: "major-cs"
  },
  
  // Physics Modules
  {
    id: "mod-ph210",
    name: "Quantum Physics",
    code: "PH210",
    description: "An introduction to the strange and fascinating world of quantum mechanics.",
    credits: 6,
    majorId: "major-physics",
    prerequisites: ["PH101", "MA201"]
  },
  {
    id: "mod-ph101",
    name: "Intro to Physics",
    code: "PH101",
    description: "Classical mechanics and the laws of motion.",
    credits: 6,
    majorId: "major-physics"
  },
  
  // Mathematics Modules
  {
    id: "mod-ma201",
    name: "Linear Algebra",
    code: "MA201",
    description: "Fundamental principles of vector spaces, matrices, and linear mappings.",
    credits: 6,
    majorId: "major-math"
  },
  {
    id: "mod-ma202",
    name: "Calculus II",
    code: "MA202",
    description: "Advanced topics in differential and integral calculus.",
    credits: 6,
    majorId: "major-math",
    prerequisites: ["MA101"]
  },
  {
    id: "mod-ma101",
    name: "Calculus I",
    code: "MA101",
    description: "Introduction to differential and integral calculus.",
    credits: 6,
    majorId: "major-math"
  },
  
  // Ethics Module (available to all majors)
  {
    id: "mod-eth101",
    name: "Ethics in Technology",
    code: "ETH101",
    description: "Examine the moral and ethical dilemmas presented by emerging technologies.",
    credits: 3,
    majorId: "major-cs" // Can be taught to CS students
  },
  
  // Software Engineering Modules for Mr. TABAA
  {
    id: "mod-cs401",
    name: "Software Engineering",
    code: "CS401",
    description: "Principles and practices of software development, including requirements analysis, design patterns, and project management.",
    credits: 6,
    majorId: "major-cs",
    prerequisites: ["CS201", "CS202"]
  },
  {
    id: "mod-cs402",
    name: "Web Development",
    code: "CS402",
    description: "Modern web development technologies including frontend frameworks, backend development, and full-stack applications.",
    credits: 6,
    majorId: "major-cs",
    prerequisites: ["CS202"]
  },
  {
    id: "mod-cs403",
    name: "Database Systems",
    code: "CS403",
    description: "Database design, SQL programming, and database management systems including relational and NoSQL databases.",
    credits: 6,
    majorId: "major-cs",
    prerequisites: ["CS201"]
  },
  
  // New modules for different majors (for Mr. TABAA to teach)
  {
    id: "mod-ph301",
    name: "Computational Physics",
    code: "PH301",
    description: "Application of computational methods to solve complex physics problems using numerical simulations and algorithms.",
    credits: 6,
    majorId: "major-physics",
    prerequisites: ["PH101", "MA201"]
  },
  {
    id: "mod-ma301",
    name: "Numerical Analysis",
    code: "MA301",
    description: "Study of algorithms for numerical computation, including error analysis and computational complexity.",
    credits: 6,
    majorId: "major-math",
    prerequisites: ["MA201", "MA202"]
  }
];

// Module Instances (specific modules taught in specific semesters by specific teachers)
export const moduleInstances: ModuleInstance[] = [
  // 2023-2024 S1
  {
    id: "inst-2023-s1-ma201",
    moduleId: "mod-ma201",
    semesterId: "sem-2023-2024-s1",
    teacherId: "teacher-ada",
    maxStudents: 40,
    currentStudents: 35,
    isActive: false
  },
  {
    id: "inst-2023-s1-eth101",
    moduleId: "mod-eth101",
    semesterId: "sem-2023-2024-s1",
    teacherId: "teacher-socrates",
    maxStudents: 50,
    currentStudents: 45,
    isActive: false
  },
  {
    id: "inst-2023-s1-ph101",
    moduleId: "mod-ph101",
    semesterId: "sem-2023-2024-s1",
    teacherId: "teacher-galileo",
    maxStudents: 30,
    currentStudents: 28,
    isActive: false
  },
  
  // 2023-2024 S2
  {
    id: "inst-2023-s2-cs201",
    moduleId: "mod-cs201",
    semesterId: "sem-2023-2024-s2",
    teacherId: "teacher-grace",
    maxStudents: 35,
    currentStudents: 32,
    isActive: false
  },
  {
    id: "inst-2023-s2-ma202",
    moduleId: "mod-ma202",
    semesterId: "sem-2023-2024-s2",
    teacherId: "teacher-newton",
    maxStudents: 30,
    currentStudents: 25,
    isActive: false
  },
  
  // 2024-2025 S1
  {
    id: "inst-2024-s1-cs202",
    moduleId: "mod-cs202",
    semesterId: "sem-2024-2025-s1",
    teacherId: "teacher-grace",
    maxStudents: 40,
    currentStudents: 38,
    isActive: false
  },
  {
    id: "inst-2024-s1-ma101",
    moduleId: "mod-ma101",
    semesterId: "sem-2024-2025-s1",
    teacherId: "teacher-newton",
    maxStudents: 45,
    currentStudents: 42,
    isActive: false
  },
  
  // 2024-2025 S2 (Current active semester)
  {
    id: "inst-2024-s2-cs301",
    moduleId: "mod-cs301",
    semesterId: "sem-2024-2025-s2",
    teacherId: "teacher-turing",
    maxStudents: 30,
    currentStudents: 30,
    isActive: true
  },
  {
    id: "inst-2024-s2-cs305",
    moduleId: "mod-cs305",
    semesterId: "sem-2024-2025-s2",
    teacherId: "teacher-linus",
    maxStudents: 35,
    currentStudents: 35,
    isActive: true
  },
  {
    id: "inst-2024-s2-ph210",
    moduleId: "mod-ph210",
    semesterId: "sem-2024-2025-s2",
    teacherId: "teacher-curie",
    maxStudents: 20,
    currentStudents: 20,
    isActive: true
  },
  
  // Mr. Mohamed TABAA's modules
  {
    id: "inst-2024-s1-cs401",
    moduleId: "mod-cs401",
    semesterId: "sem-2024-2025-s1",
    teacherId: "teacher-tabaa",
    maxStudents: 40,
    currentStudents: 38,
    isActive: false
  },
  {
    id: "inst-2024-s2-ph301",
    moduleId: "mod-ph301",
    semesterId: "sem-2024-2025-s2",
    teacherId: "teacher-tabaa",
    maxStudents: 25,
    currentStudents: 22,
    isActive: true
  },
  {
    id: "inst-2024-s2-ma301",
    moduleId: "mod-ma301",
    semesterId: "sem-2024-2025-s2",
    teacherId: "teacher-tabaa",
    maxStudents: 30,
    currentStudents: 28,
    isActive: true
  }
];

// Mock Teachers
export const teachers: TeacherProfile[] = [
  {
    keycloakId: "teacher-turing",
    email: "alan.turing@emsi.ma",
    firstName: "Alan",
    lastName: "Turing",
    username: "turing",
    departmentName: "Computer Science & Engineering",
    specializations: ["Algorithms", "Theoretical CS", "Cryptography"],
    profileComplete: true
  },
  {
    keycloakId: "teacher-linus",
    email: "linus.torvalds@emsi.ma",
    firstName: "Linus",
    lastName: "Torvalds",
    username: "linus",
    departmentName: "Computer Science & Engineering",
    specializations: ["Operating Systems", "Software Engineering"],
    profileComplete: true
  },
  {
    keycloakId: "teacher-curie",
    email: "marie.curie@emsi.ma",
    firstName: "Marie",
    lastName: "Curie",
    username: "curie",
    departmentName: "Applied Physics",
    specializations: ["Quantum Physics", "Nuclear Physics"],
    profileComplete: true
  },
  {
    keycloakId: "teacher-ada",
    email: "ada.lovelace@emsi.ma",
    firstName: "Ada",
    lastName: "Lovelace",
    username: "ada",
    departmentName: "Mathematics",
    specializations: ["Linear Algebra", "Numerical Analysis"],
    profileComplete: true
  },
  {
    keycloakId: "teacher-socrates",
    email: "socrates@emsi.ma",
    firstName: "Socrates",
    lastName: "Philosopher",
    username: "socrates",
    departmentName: "Humanities",
    specializations: ["Ethics", "Philosophy"],
    profileComplete: true
  },
  {
    keycloakId: "teacher-grace",
    email: "grace.hopper@emsi.ma",
    firstName: "Grace",
    lastName: "Hopper",
    username: "grace",
    departmentName: "Computer Science & Engineering",
    specializations: ["Programming", "Data Structures"],
    profileComplete: true
  },
  {
    keycloakId: "teacher-newton",
    email: "isaac.newton@emsi.ma",
    firstName: "Isaac",
    lastName: "Newton",
    username: "newton",
    departmentName: "Mathematics",
    specializations: ["Calculus", "Physics"],
    profileComplete: true
  },
  {
    keycloakId: "teacher-galileo",
    email: "galileo.galilei@emsi.ma",
    firstName: "Galileo",
    lastName: "Galilei",
    username: "galileo",
    departmentName: "Applied Physics",
    specializations: ["Classical Mechanics", "Astronomy"],
    profileComplete: true
  },
  {
    keycloakId: "teacher-tabaa",
    email: "mohamed.tabaa@emsi.ma",
    firstName: "Mohamed",
    lastName: "TABAA",
    username: "tabaa",
    departmentName: "Computer Science & Engineering",
    specializations: ["Software Engineering", "Web Development", "Database Systems"],
    profileComplete: true
  }
];

// Helper functions
export const getAcademicYearById = (id: string): AcademicYear | undefined => {
  return academicYears.find(year => year.id === id);
};

export const getSemesterById = (id: string): Semester | undefined => {
  return semesters.find(semester => semester.id === id);
};

export const getMajorById = (id: string): Major | undefined => {
  return majors.find(major => major.id === id);
};

export const getModuleById = (id: string): Module | undefined => {
  return modules.find(module => module.id === id);
};

export const getTeacherById = (id: string): TeacherProfile | undefined => {
  return teachers.find(teacher => teacher.keycloakId === id);
};

export const getModuleInstancesBySemester = (semesterId: string): ModuleInstance[] => {
  return moduleInstances.filter(instance => instance.semesterId === semesterId);
};

export const getModuleInstancesByTeacher = (teacherId: string): ModuleInstance[] => {
  return moduleInstances.filter(instance => instance.teacherId === teacherId);
};

export const getModuleInstancesByStudentMajor = (majorId: string, semesterId: string): ModuleInstance[] => {
  const semesterInstances = getModuleInstancesBySemester(semesterId);
  return semesterInstances.filter(instance => {
    const module = getModuleById(instance.moduleId);
    return module && module.majorId === majorId;
  });
}; 