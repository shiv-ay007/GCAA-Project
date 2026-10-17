import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { FloatingSidePills } from '@/components/common/FloatingSidePills';
// import { DharoharInviteModal } from '@/components/common/DharoharInviteModal';
import { ElectionNominationModal } from '@/components/common/ElectionNominationModal';

export const MainLayout = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 selection:bg-red-600 selection:text-white relative print:bg-white print:text-neutral-900 print:min-h-0">
      <Navbar />
      <div className="print:hidden">
        <FloatingSidePills />
        {/* Old Dharohar Popup commented out as requested */}
        {/* <DharoharInviteModal /> */}
        {/* New Election Nomination Popup */}
        <ElectionNominationModal />
      </div>
      <main className="flex-1 print:p-0 print:m-0">
        <Outlet />
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};


