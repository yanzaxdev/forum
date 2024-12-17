import { InferSelectModel } from "drizzle-orm";
import { Book, MessageCircle, MessageSquare, Users } from "lucide-react";
import { courses } from "~/server/db";

export type TabItem = {
  id: string;
  title: string;
  icon: any;
  content: string;
};

export interface TabbedContentProps {
  course: InferSelectModel<typeof courses>;
  className?: string;
}

export const DEFAULT_TABS: TabItem[] = [
  {
    id: "overview",
    title: "Overview",
    icon: Book,
    content: "Course overview content...",
  },
  {
    id: "reviews",
    title: "Reviews",
    icon: MessageCircle,
    content: "Student reviews content...",
  },
  {
    id: "lectures",
    title: "Lectures",
    icon: Users,
    content: "Lecture recommendations...",
  },
  {
    id: "forum",
    title: "Forum",
    icon: MessageSquare,
    content: "Forum discussions...",
  },
  {
    id: "tutors",
    title: "Tutors",
    icon: Users,
    content: "Tutor recommendations...",
  },
];
