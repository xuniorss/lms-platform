import { getDashboardCourses } from '@/actions/get-dashboard-courses'
import { CoursesList } from '@/components/CoursesList'
import { auth } from '@clerk/nextjs'
import { CheckCircle, Clock } from 'lucide-react'
import { redirect } from 'next/navigation'

import { InfoCard } from './_components/info-card'

export default async function DashboardPage() {
	const { userId } = auth()

	if (!userId) return redirect('/')

	const { completedCourses, coursesInProgress } =
		await getDashboardCourses(userId)

	return (
		<section className="space-y-4 p-6">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<InfoCard
					icon={Clock}
					label="Em andamento"
					numberOfItems={coursesInProgress.length}
				/>
				<InfoCard
					icon={CheckCircle}
					label="Concluído"
					numberOfItems={completedCourses.length}
					variant="success"
				/>
			</div>
			<CoursesList items={[...coursesInProgress, ...completedCourses]} />
		</section>
	)
}
