import { prismadb } from '@/lib/prismadb'
import { CreateCourseSchema } from '@/models/create-course'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
	try {
		const { userId } = auth()
		const { title } = CreateCourseSchema.parse(await req.json())

		if (!userId) return new NextResponse('Unauthorized', { status: 401 })

		const course = await prismadb.course.create({ data: { userId, title } })

		return NextResponse.json(course)
	} catch (error) {
		console.error('[COURSES_POST]', error)
		return new NextResponse('Internal Error', { status: 500 })
	}
}
