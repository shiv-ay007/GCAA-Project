import { gbmGalleryItems } from '@/data/gbmPhotos';

import imgCourtyard from '@/assets/gallery/gallery_1_courtyard.png';
import imgDharoharStage from '@/assets/gallery/gallery_2_dharohar_stage.png';
import imgLampLighting from '@/assets/gallery/gallery_4_lamp_lighting.png';
import imgYellowCelebration from '@/assets/gallery/gallery_5_yellow_celebration.png';
import imgStampHeritage from '@/assets/gallery/gallery_6_stamp_heritage.png';
import imgLawnReunion from '@/assets/gallery/gallery_8_lawn_reunion.png';
import imgStageConclave from '@/assets/gallery/gallery_10_stage_conclave.png';
import imgHeritageSteps from '@/assets/gallery/gallery_13_heritage_steps.png';
import imgBatch2001Cohort from '@/assets/gallery/gallery_15_batch_2001_cohort.png';

// Enrich GBM photos with metadata and badges
export const gbmItems = gbmGalleryItems.map((item, idx) => ({
  ...item,
  title: item.title || `GBM 2025 Assembly Photo ${idx + 1}`,
  subtitle: 'Annual General Body Meeting of Government College of Architecture Alumni',
  badge: 'GBM 2025',
  category: 'gbm',
}));

// Authentic Reunion & Dharohar Photos
export const dharoharItems = [
  {
    id: 'dh-1',
    src: imgHeritageSteps,
    title: 'Heritage Steps Batch Reunion',
    subtitle: 'Classic gathering on the iconic red-brick steps of GCA Lucknow',
    category: 'dharohar',
    badge: 'Reunion Classic',
  },
  {
    id: 'dh-2',
    src: imgDharoharStage,
    title: 'Dharohar Celebration Stage',
    subtitle: 'Silver & Ruby Jubilee batches felicitation ceremony',
    category: 'dharohar',
    badge: 'Stage Ceremony',
  },
  {
    id: 'dh-3',
    src: imgBatch2001Cohort,
    title: 'Silver Jubilee 2001 Cohort Sheet',
    subtitle: 'Commemorative postal cohort — Leaders in Practice & Design',
    category: 'dharohar',
    badge: 'Batch 2001',
  },
  {
    id: 'dh-4',
    src: imgCourtyard,
    title: 'Courtyard Pergola Gathering',
    subtitle: 'Alumni sharing fond memories under the campus pergolas',
    category: 'dharohar',
    badge: 'Campus Life',
  },
  {
    id: 'dh-5',
    src: imgLampLighting,
    title: 'Deep Prajjwalan Ceremony',
    subtitle: 'Auspicious lamp lighting by patron architects and faculty',
    category: 'dharohar',
    badge: 'Inauguration',
  },
  {
    id: 'dh-6',
    src: imgYellowCelebration,
    title: 'Dharohar Traditional Festivity',
    subtitle: 'Batchmates dressed in festive yellow kurtas celebrating Dharohar',
    category: 'dharohar',
    badge: 'Celebrations',
  },
  {
    id: 'dh-7',
    src: imgStampHeritage,
    title: 'Heritage Corridors Postal Stamp',
    subtitle: 'Official GCAAA commemorative philatelic stamp edition',
    category: 'dharohar',
    badge: 'Heritage Stamp',
  },
  {
    id: 'dh-8',
    src: imgLawnReunion,
    title: 'Dharohar Lawn Fellowship',
    subtitle: 'Joyous gathering on the lush green campus lawns',
    category: 'dharohar',
    badge: 'Campus Greens',
  },
  {
    id: 'dh-9',
    src: imgStageConclave,
    title: 'Grand Alumni Conclave',
    subtitle: 'Architects and faculty assemble on the main conclave podium',
    category: 'dharohar',
    badge: 'Grand Assembly',
  },
];

// Unified 44 photos dataset
export const allGalleryItems = [
  ...gbmItems,
  ...dharoharItems,
];

// Category tab definitions
export const galleryCategories = [
  { key: 'all', label: 'All Photos' },
  { key: 'gbm', label: 'GBM 2025' },
  { key: 'dharohar', label: 'Dharohar & Reunions' },
];
