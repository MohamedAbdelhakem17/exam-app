import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type CardProps = {
  subject: Subject;
  key: string;
};

export default function SubjectsCard({ subject, key }: CardProps) {
  return (
    <Link href={`/${subject._id}`} key={key}>
      <Card className="col-span-1 relative overflow-hidden">
        {/* Image */}
        <CardContent className="p-0">
          <Image
            src={subject.icon}
            alt={subject.name}
            width={336}
            height={448}
            className="h-96  w-full"
            priority
          />
        </CardContent>

        {/* Description */}
        <CardFooter className="absolute bg-blue-500/50 backdrop-blur-md bottom-3 start-3 end-3 py-5 px-4">
          <CardTitle className="text-xl text-white">{subject.name}</CardTitle>
        </CardFooter>
      </Card>
    </Link>
  );
}
