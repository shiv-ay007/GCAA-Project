import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { EventsPage } from '@/pages/EventsPage';
import { CommitteePage } from '@/pages/CommitteePage';
import { GalleryPage } from '@/pages/GalleryPage';
import { ContactPage } from '@/pages/ContactPage';
import { AlumniRegistrationPage } from '@/pages/AlumniRegistrationPage';
import { AlumniDataListPage } from '@/pages/AlumniDataListPage';
import { RegisteredMembersPage } from '@/pages/RegisteredMembersPage';
import { PublicationsPage } from '@/pages/PublicationsPage';
import { BlogPage } from '@/pages/BlogPage';
import { ElectionNominationPage } from '@/pages/ElectionNominationPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="committee" element={<CommitteePage />} />
        <Route path="committee/:section" element={<CommitteePage />} />
        <Route path="registration" element={<AlumniRegistrationPage />} />
        <Route path="alumni-registration" element={<AlumniRegistrationPage />} />
        <Route path="election-nomination" element={<ElectionNominationPage />} />
        <Route path="nomination-form" element={<ElectionNominationPage />} />
        <Route path="election" element={<ElectionNominationPage />} />
        <Route path="alumni-data-list" element={<AlumniDataListPage />} />
        <Route path="registered-members" element={<RegisteredMembersPage />} />
        <Route path="members-list" element={<RegisteredMembersPage />} />
        <Route path="publications" element={<PublicationsPage />} />
        <Route path="resources" element={<PublicationsPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blogs" element={<BlogPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
