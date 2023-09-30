import { prismadb } from '@/lib/prismadb'
import { isTeacher } from '@/lib/teacher'
import { auth } from '@clerk/nextjs'
import Mux from '@mux/mux-node'
import { NextResponse } from 'next/server'

const { Video } = new Mux(
	process.env.MUX_TOKEN_ID!,
	process.env.MUX_TOKEN_SECRET!,
)

export async function DELETE(
	req: Request,
	{ params }: { params: { courseId: string } },
) {
	try {
		const { userId } = auth()

		if (!userId || !isTeacher(userId))
			return new NextResponse('Unauthorized', { status: 401 })

		const course = await prismadb.course.findUnique({
			where: { id: params.courseId, userId: userId },
			include: { chapters: { include: { muxData: true } } },
		})

		if (!course) return new NextResponse('Not found', { status: 404 })

		for (const chapter of course.chapters) {
			if (chapter.muxData?.assetId)
				await Video.Assets.del(chapter.muxData.assetId)
		}

		const deletedCourse = await prismadb.course.delete({
			where: { id: params.courseId },
		})

		return NextResponse.json(deletedCourse)
	} catch (error) {
		console.log('[COURSE_ID_DELETE]', error)
		return new NextResponse('Internal Error', { status: 500 })
	}
}

export const PATCH = async (
	req: Request,
	{ params }: { params: { courseId: string } },
) => {
	try {
		const { userId } = auth()
		const values = await req.json()

		if (!userId || !isTeacher(userId))
			return new NextResponse('Unauthorized', { status: 401 })

		const course = await prismadb.course.update({
			where: { id: params.courseId, userId },
			data: { ...values },
		})

		return NextResponse.json(course)
	} catch (error) {
		console.error('COURSE_ID_PATCH', error)
		return new NextResponse('Internal Error', { status: 500 })
	}
}
