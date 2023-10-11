import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";



export async function PATCH(
  req: Request,
  {params} : {params:{courseId: string; chapterId: string}}
) {
  try {
    const {userId} = auth();

    if(!userId){
      return new NextResponse("unauthorize", {status:401});
    }
    const ownCourse = await db.course.findUnique({
      where:{
        id: params.courseId,
        userId,
      }
    });
    if(!ownCourse){
      return  new NextResponse('authorize',{ status: 401})
    }
    const chapter = await db.chapter.findUnique({
      where:{
        id: params.chapterId,
        courseId: params.courseId
      }
    });

    const muxData = await db.muxData.findUnique({
      where:{
        chapterId: params.chapterId,
      }
    });
    if(!chapter || !muxData || !chapter.title ||!chapter.description ||!chapter.videoUrl){
      return new NextResponse("Missing required fields", {status:400})
    }
    const publishedChapters = await db.chapter.update({
      where:{
        id: params.chapterId,
        courseId: params.courseId
      },
      data:{
        isPublished: true,
      }
    });
    return NextResponse.json(publishedChapters);

  } catch (error) {
    console.log("[CHAPTER_UNPUBLISHED]",error)
    return new NextResponse("Internal error",{status:500});
  }
}
