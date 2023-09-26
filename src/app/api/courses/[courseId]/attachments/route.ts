import { prismadb } from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export const POST = async (
	req: Request,
	{ params }: { params: { courseId: string } },
) => {
	try {
		const { userId } = auth()
		const { url } = await req.json()

		if (!userId) return new NextResponse('Unauthorized', { status: 401 })

		const courseOwner = await prismadb.course.findUnique({
			where: { id: params.courseId, userId },
		})

		if (!courseOwner) return new NextResponse('Unauthorized', { status: 401 })

		const attachment = await prismadb.attachment.create({
			data: { url, name: url.split('/').pop(), courseId: params.courseId },
		})

		return NextResponse.json(attachment)
	} catch (error) {
		console.error('[COURSE_ID_ATTATCHMENTS]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
