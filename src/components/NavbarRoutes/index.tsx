'use client'

import { UserButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SearchInput } from '../SearchInput'
import { Button } from '../ui/button'

export const NavbarRoutes = () => {
	const pathname = usePathname()

	const isTeacherPage = pathname?.startsWith('/teacher')
	const isPlayerPage = pathname?.includes('/chapter')
	const isSearchPage = pathname === '/search'

	return (
		<>
			{isSearchPage && (
				<div className="hidden md:block">
					<SearchInput />
				</div>
			)}
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
		</>
	)
}
