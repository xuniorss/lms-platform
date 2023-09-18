import { ReactNode } from 'react'

import { Navbar } from './_components/navbar'
import { Sidebar } from './_components/sidebar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<section className="h-full">
			<header className="fixed inset-y-0 z-50 h-[5rem] w-full md:pl-56">
				<Navbar />
			</header>
			<aside className="fixed inset-y-0 z-50 hidden h-full w-56 flex-col md:flex">
				<Sidebar />
			</aside>
			<main className="md:pl-56">{children}</main>
		</section>
	)
}
