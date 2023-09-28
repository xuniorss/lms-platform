import { prismadb } from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'

export default async function CoursesPage() {
	const { userId } = auth()

	if (!userId) return redirect('/')

	const courses = await prismadb.course.findMany({
		where: { userId },
		orderBy: { createdAt: 'desc' },
	})

	return (
		<section className="p-6">
			<DataTable columns={columns} data={courses} />
		</section>
	)
}
