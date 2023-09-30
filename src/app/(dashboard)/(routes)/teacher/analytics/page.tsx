import { getAnalytics } from '@/actions/get-analytics'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { Chart } from './_components/chart'
import { DataCard } from './_components/data-card'

export default async function AnalyticsPage() {
	const { userId } = auth()

	if (!userId) return redirect('/')

	const { data, totalRevenue, totalSales } = await getAnalytics(userId)

	return (
		<section className="p-6">
			<div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
				<DataCard
					label="Rendimento total"
					value={totalRevenue}
					shouldFormat
				/>
				<DataCard label="Vendas totais" value={totalSales} />
			</div>
			<Chart data={data} />
		</section>
	)
}
