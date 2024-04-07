import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices} from '@/app/lib/data'; // remove fetchRevenue
import { Suspense } from 'react';
import { RevenueChartSkeleton, InvoiceSkeleton, CardsSkeleton } from '@/app/ui/skeletons'; 

export default async function Page() {

  // query the database first before returning the jsx.
  const latestInvoices = await fetchLatestInvoices();
  // destruct the called data.
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">        
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        <Suspense fallback={<InvoiceSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}