import { prismadb } from '@/lib/prismadb'

export const getProgress = async (
	userId: string,
	courseId: string,
): Promise<number> => {
	try {
		const publishedChapters = await prismadb.chapter.findMany({
			where: { courseId, isPublished: true },
			select: { id: true },
		})

		const publishedChaptersIds = publishedChapters.map(
			(chapter) => chapter.id,
		)

		const validCompletedChapters = await prismadb.userProgress.count({
			where: {
				userId,
				chapterId: { in: publishedChaptersIds },
				isCompleted: true,
			},
		})

		return (validCompletedChapters / publishedChaptersIds.length) * 100
	} catch (error) {
		console.error('[GET_PROGRESS]', error)
		return 0
	}
}
