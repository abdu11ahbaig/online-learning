import { UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-3xl text-sky-600">
      <UserButton afterSignOutUrl="/"/>
      <>this is protected route</>
    </div>
  )
}
