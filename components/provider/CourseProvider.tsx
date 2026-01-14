"use client";

import {
  useContext,
  useState,
  createContext,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { getEnrollment } from "@/actions/getEnrollment";
import { useParams } from "next/navigation";

type EnrollmentData = NonNullable<Awaited<ReturnType<typeof getEnrollment>>>;
export type CourseType = EnrollmentData["course"];
export type ModuleType = CourseType["modules"][number];
export type LessonType = ModuleType["lessons"][number];

interface CourseContextType {
  activeLesson: LessonType | null;
  course: CourseType | null;
  error: string | null;
  loading: boolean;
  setActiveLesson: Dispatch<SetStateAction<LessonType | null>>;
  setCourse: Dispatch<SetStateAction<CourseType | null>>;
  updateLessonProgressInState: (lessonId: string, timePlayed: number) => void;
}

const CourseContext = createContext<CourseContextType | null>(null);

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context)
    throw new Error("useCourse() must be used within a CourseProvider.");
  return context;
};

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [course, setCourse] = useState<CourseType | null>(null);
  const [activeLesson, setActiveLesson] = useState<LessonType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const courseSlug = params.courseSlug as string;

  useEffect(() => {
    const fetchEnrollment = async () => {
      if (courseSlug) {
        try {
          setLoading(true);
          const res = await fetch(`/api/enrollment?courseSlug=${courseSlug}`);
          if (!res.ok) throw new Error(res.statusText);
          const enrollment = (await res.json()) as Awaited<
            ReturnType<typeof getEnrollment>
          >;
          setCourse(enrollment?.course as CourseType);
          setActiveLesson(enrollment?.currentLesson as LessonType);
        } catch (error) {
          setError(
            error instanceof Error ? error.message : "Something went wrong."
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEnrollment();
  }, [courseSlug]);

  const updateLessonProgressInState = (lessonId: string, timePlayed: number) => {
    if (!course) return;

    // Update the course state with new progress
    setCourse({
      ...course,
      modules: course.modules.map((module) => ({
        ...module,
        lessons: module.lessons.map((lesson) => {
          if (lesson.id === lessonId) {
            return {
              ...lesson,
              userProgress: [
                {
                  ...(lesson.userProgress[0] || {}),
                  timePlayed,
                },
              ] as any,
            };
          }
          return lesson;
        }),
      })),
    });

    // Update active lesson if it matches
    if (activeLesson?.id === lessonId) {
      setActiveLesson({
        ...activeLesson,
        userProgress: [
          {
            ...(activeLesson.userProgress[0] || {}),
            timePlayed,
          },
        ] as any,
      });
    }
  };

  return (
    <CourseContext.Provider
      value={{
        course,
        activeLesson,
        error,
        loading,
        setActiveLesson,
        setCourse,
        updateLessonProgressInState,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
