
import React, { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { RequestCard } from '@/components/dashboard/RequestCard';
import { mockRequests } from '@/lib/mock-data';
import { useRequestFilter } from '@/hooks/use-request-filter';
import { toast } from '@/components/ui/sonner';

const Index = () => {
  const [requests, setRequests] = useState(mockRequests);
  const { filter, setFilter, filteredRequests, counts } = useRequestFilter(requests);

  const handleUpdateStatus = (requestId: string, newStatus: 'accepted' | 'rejected') => {
    setRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId
          ? { ...request, status: newStatus }
          : request
      )
    );
    
    toast(
      newStatus === 'accepted' ? 'Request accepted' : 'Request rejected', 
      { 
        description: `Request ID: ${requestId.slice(0, 8)}`,
        position: 'bottom-right'
      }
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        filter={filter} 
        onFilterChange={setFilter} 
        requestsCount={counts.all}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid gap-4 md:gap-6">
          {filteredRequests.length === 0 ? (
            <div className="text-center p-12 bg-white rounded-lg shadow-sm border">
              <p className="text-lg text-muted-foreground">No requests found for this filter.</p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onUpdateStatus={handleUpdateStatus}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
