import { InferSelectModel } from "drizzle-orm";
import { Book, MessageCircle, MessageSquare, Users } from "lucide-react";
import { courses } from "~/server/db";
import { xTrans } from "~/translations";

export type TabItem = {
  id: keyof typeof xTrans.en;
  title: string;
  icon: any;
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
  },
  {
    id: "reviews",
    title: "Reviews",
    icon: MessageCircle,
  },

  {
    id: "forum",
    title: "Forum",
    icon: MessageSquare,
  },
  {
    id: "tutors",
    title: "Tutors",
    icon: Users,
  },
];
