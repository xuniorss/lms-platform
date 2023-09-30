import { IconBadge } from '@/components/IconBadge'
import { LucideIcon } from 'lucide-react'

interface InfoCardProps {
	numberOfItems: number
	variant?: 'default' | 'success'
	label: string
	icon: LucideIcon
}

export const InfoCard = ({
	variant,
	icon: Icon,
	numberOfItems,
	label,
}: InfoCardProps) => {
	return (
		<div className="flex items-center gap-x-2 rounded-md border p-3">
			<IconBadge variant={variant} icon={Icon} />
			<div>
				<p className="font-medium">{label}</p>
				<p className="text-sm text-gray-500">
					{numberOfItems} {numberOfItems === 1 ? 'Curso' : 'Cursos'}
				</p>
			</div>
		</div>
	)
}
