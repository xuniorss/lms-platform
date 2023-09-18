'use client'

import { UserButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

export const NavbarRoutes = () => {
	const pathname = usePathname()

	const isTeacherPage = pathname?.startsWith('/teacher')
	const isPlayerPage = pathname?.includes('/chapter')

	return (
		<div className="ml-auto flex gap-x-2">
			{isTeacherPage || isPlayerPage ? (
				<Link href="/">
					<Button
						aria-label="button logout from teacher mode"
						size="sm"
						variant="ghost"
					>
						<LogOut className="mr-2 h-4 w-4" />
						Sair
					</Button>
				</Link>
			) : (
				<Link href="/teacher/courses">
					<Button
						aria-label="button change to teacher mode"
						size="sm"
						variant="ghost"
					>
						Modo professor
					</Button>
				</Link>
			)}
			<UserButton afterSignOutUrl="/" />
		</div>
	)
}
