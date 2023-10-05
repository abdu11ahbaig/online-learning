import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
  return (
  <Link href="/teacher/create">
    <div className="p-6">
      <Button>add new course</Button>
    </div>
  </Link>
  );
}

export default CoursesPage;
