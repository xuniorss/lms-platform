import { NavbarRoutes } from '@/components/NavbarRoutes'
import { MobileSidebar } from './mobile-sidebar'

export const Navbar = () => {
	return (
		<section className="flex h-full items-center border-b bg-white p-4 shadow-sm">
			<MobileSidebar />
			<NavbarRoutes />
		</section>
	)
}
