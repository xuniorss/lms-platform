import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CoursesPage() {
	return (
		<section className="p-6">
			<Link href="/teacher/create">
				<Button>Novo curso</Button>
			</Link>
		</section>
	)
}
