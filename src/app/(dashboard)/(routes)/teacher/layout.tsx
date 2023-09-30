import { isTeacher } from '@/lib/teacher'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function TeacherLayout({
	children,
}: {
	children: ReactNode
}) {
	const { userId } = auth()

	if (!isTeacher(userId)) return redirect('/')

	return <>{children}</>
}
