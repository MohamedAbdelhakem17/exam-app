import Link from "next/link";
import { Timer } from "lucide-react";

type ComponentProps = {
  link: string;
  key: string;
  exam: Exam;
};
export default function ExamCard({ exam, link, key }: ComponentProps) {
  return (
    <li key={key}>
      {/* Exam Questions Link */}
      <Link
        href={link}
        className="flex items-center justify-between p-4 bg-blue-50"
      >
        {/* Exam title */}
        <h3>
          {/* Label */}
          <span className="text-xl font-semibold text-blue-60 block mb-1">
            {exam?.title}
          </span>

          {/* Number of questions */}
          <span className="text-sm text-gray-500 block">
            {exam?.numberOfQuestions} Questions
          </span>
        </h3>

        {/* Exam duration */}
        <p className="flex  items-center gap-x-2">
          {/* Icon */}
          <Timer className="w-6 h-6 text-gray-400" />

          {/* Label */}
          <span className="text-sm font-medium m-0 p-0">
            Duration : {exam?.duration} minutes
          </span>
        </p>
      </Link>
    </li>
  );
}
