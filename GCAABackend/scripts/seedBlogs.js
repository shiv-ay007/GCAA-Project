import 'dotenv/config';
import dns from 'dns';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import Blog from '../Models/Blog.js';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Root path of the frontend gallery images
const galleryDir = path.resolve(__dirname, '../../GCAAA-Frotend-/src/assets/gallery');

const seedBlogs = [
  {
    id: 'architectural-evolution-lucknow',
    title: 'The Architectural Evolution of Lucknow: From Nawabi Splendor to Modernist Heritage',
    slug: 'architectural-evolution-lucknow',
    excerpt:
      'A deep dive into how Lucknow’s architectural identity transformed from Awadhi courtly monuments like Chhatar Manzil to the post-independence modern institutional campuses like FOAP-AKTU.',
    content: `
      Lucknow is a living museum of architectural typologies. From the hybrid Indo-Islamic and European-influenced courtly monuments of Asaf-ud-Daula to the bold modernist brickwork of the Government College of Architecture campus on Tagore Marg, the city encapsulates centuries of spatial dialogue.

      ### The Awadhi Synthesis
      During the late 18th and early 19th centuries, Nawabi architecture moved beyond strict Mughal canons. The introduction of the lakhauri brick, lime plaster ornamentation (stucco-work), and sweeping cusped arches created an indigenous language that prioritized grandeur without the opulence of red sandstone or white marble.

      ### Modernism at FOAP-AKTU
      When the Government College of Architecture was established, its founders envisioned an institutional language rooted in climatic response: deep verandas, courtyards that foster microclimates, and brick jalis that modulate the harsh North Indian summer sun. Today, our alumni lead conservation and adaptive reuse projects across Lucknow, ensuring that the soul of Awadhi heritage coexists with rapid modern urbanization.
    `,
    category: 'Heritage & Architecture',
    categoryColor: 'bg-amber-100 text-amber-900 border-amber-200',
    date: '12 Oct 2026',
    readTime: '5 min read',
    author: {
      name: 'Ar. Rajiv Kacker',
      role: 'Professor & Heritage Architect, Batch of 1984',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    imageFileName: 'gallery_1_courtyard.png',
    tags: ['Lucknow Heritage', 'Awadhi Architecture', 'Conservation', 'FOAP Campus'],
    featured: true,
    status: 'Published',
  },
  {
    id: 'dharohar-2026-rekindling-memories',
    title: 'Dharohar 2026: Rekindling Memories Across Six Decades of Alumni Camaraderie',
    slug: 'dharohar-2026-rekindling-memories',
    excerpt:
      'As the grand biennial homecoming approaches on 28th November, we look back at how the Dharohar convention brings together senior masters and young practitioners under one roof.',
    content: `
      Every two years, the historic campus courtyard of Government College of Architecture transforms into a vibrant celebration of memory, camaraderie, and professional pride. Dharohar 2026 marks another milestone in the association's legacy.

      ### Six Decades, One Brotherhood
      From the pioneering batches of the 1960s to the enthusiastic young graduates of 2025, Dharohar is not just a dinner reunion — it is a conclave where senior fellows share war stories from drafting tables with T-squares, and young alumni showcase cutting-edge parametric and computational design practices.

      ### What to Expect at Dharohar 2026
      - **Grand Conclave & Presidential Address:** Keynote lectures by eminent alumni who have spearheaded landmark national infrastructure projects.
      - **Felicitation of Senior Fellows:** Honoring alumni who have completed 50 and 25 years of architectural excellence.
      - **Release of the Dharohar '26 Souvenir:** The latest printed compilation recording alumni directories, firm profiles, and batch retrospectives.
    `,
    category: 'Alumni Reunion',
    categoryColor: 'bg-red-100 text-red-900 border-red-200',
    date: '05 Oct 2026',
    readTime: '4 min read',
    author: {
      name: 'GCAAA Editorial Board',
      role: 'Secretariat, Alumni Association Lucknow',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    imageFileName: 'gallery_2_dharohar_stage.png',
    tags: ['Dharohar 2026', 'Alumni Homecoming', 'Reunion', 'Networking'],
    featured: false,
    status: 'Published',
  },
  {
    id: 'sustainable-urban-planning-tier2-cities',
    title: 'Sustainable Urban Planning in Tier-2 Indian Cities: Perspectives from Alumni Planners',
    slug: 'sustainable-urban-planning-tier2-cities',
    excerpt:
      'How MURP and MIEND graduates from GCA are shaping sustainable transit corridors, riverfront developments, and climate-resilient master plans across Uttar Pradesh.',
    content: `
      Rapid urban expansion in cities like Lucknow, Kanpur, Varanasi, and Ayodhya presents unprecedented challenges. Alumni from the Faculty of Architecture & Planning (FOAP-AKTU) are at the forefront of crafting humane, pedestrian-centric, and climate-resilient urban solutions.

      ### Balancing Heritage with Mobility
      Urban design in historic cities cannot rely on one-size-fits-all Western models. By integrating multi-modal transit with traditional bazaar corridors, our urban planner alumni have demonstrated that pedestrianization breathes economic life back into historic cores while dramatically cutting localized emissions.

      ### Blue-Green Infrastructure
      Rivers and wetlands are the lifelines of Uttar Pradesh. The revitalization of riverfront belts with native riparian buffers, permeable pavements, and decentralized wastewater treatment stands as a testament to the forward-looking education instilled at our alma mater.
    `,
    category: 'Urban Planning',
    categoryColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    date: '28 Sep 2026',
    readTime: '6 min read',
    author: {
      name: 'Ar. Neha Srivastava',
      role: 'Urban Planner (MURP 2004), Consultant to UP-SDA',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    imageFileName: 'gallery_10_stage_conclave.png',
    tags: ['Urban Planning', 'Smart Cities', 'Gomti Riverfront', 'Transit'],
    featured: false,
    status: 'Published',
  },
  {
    id: 'bridging-studio-to-site-mentorship',
    title: 'Bridging The Studio and The Site: GCAAA Mentorship for Young Architecture Graduates',
    slug: 'bridging-studio-to-site-mentorship',
    excerpt:
      'Navigating the transition from academic juries to actual construction sites, client negotiations, and structural coordination through senior alumni mentorship programs.',
    content: `
      Architecture school teaches you how to dream, conceptualize, and detail. However, the first years on a real construction site often come with a steep learning curve: managing contractors, interpreting structural drawings, and navigating municipal bylaws.

      ### The GCAAA Mentorship Program
      Recognizing this gap, the Alumni Association has launched an initiative pairing final-year students and fresh graduates with practicing alumni architects across India.

      ### Key Focus Areas:
      1. **Site Visits & Practical Detailing:** Understanding real-world RCC shuttering, plumbing shafts, and fenestration waterproofing.
      2. **Business of Architecture:** Fee structures, project management contracts, client communication, and team leadership.
      3. **Portfolio & Interview Guidance:** Direct feedback from principals of leading design studios to help students secure meaningful internships.
    `,
    category: 'Career & Mentorship',
    categoryColor: 'bg-blue-100 text-blue-900 border-blue-200',
    date: '18 Sep 2026',
    readTime: '4 min read',
    author: {
      name: 'Ar. Sandeep Kumar',
      role: 'Principal Architect & Convenor (B.Arch 1998)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
    imageFileName: 'gallery_8_lawn_reunion.png',
    tags: ['Mentorship', 'Career Growth', 'Architecture Practice', 'Students'],
    featured: false,
    status: 'Published',
  },
  {
    id: 'preserving-architectural-archives-souvenirs',
    title: 'Preserving Architectural Archives: The Story Behind GCAAA Souvenirs & Compendiums',
    slug: 'preserving-architectural-archives-souvenirs',
    excerpt:
      'Documenting four decades of institutional memory: an insider perspective on curating, scanning, and digitalizing over 440 archival pages for public download.',
    content: `
      Before the era of cloud storage and digital portfolios, student work and alumni memoirs were preserved in physical souvenir editions published during milestone General Body Meetings.

      ### The Archival Treasure Trove
      Our recent digital initiative has restored three historic milestone publications:
      - **Souvenir 2013 (Foundation Edition):** 117 pages of hand-drafted plates, founding messages, and early batch rosters dating back to 1965.
      - **GBM 2019 Compendium:** Documenting major institutional expansions and alumni awards.
      - **Dharohar 2025 Souvenir:** A 224-page full-color master directory celebrating contemporary alumni achievements.

      ### Why Archiving Matters
      These publications serve not merely as nostalgia, but as research documentation reflecting the shifting trends of Indian architectural pedagogy over half a century.
    `,
    category: 'Archives & Publications',
    categoryColor: 'bg-purple-100 text-purple-900 border-purple-200',
    date: '10 Sep 2026',
    readTime: '5 min read',
    author: {
      name: 'Souvenir Editorial Cell',
      role: 'Archival & Publications Committee',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    },
    imageFileName: 'gallery_6_stamp_heritage.png',
    tags: ['Archives', 'Souvenir', 'College History', 'Publications'],
    featured: false,
    status: 'Published',
  },
  {
    id: 'biophilic-materials-passive-cooling',
    title: 'Innovative Materials and Biophilic Design in Contemporary Indian Architecture',
    slug: 'biophilic-materials-passive-cooling',
    excerpt:
      'Exploring how contemporary alumni are reinterpreting terracotta jalis, exposed brick bonds, and passive solar cooling techniques for high-performance buildings.',
    content: `
      In an era dominated by glass curtain walls and energy-intensive HVAC systems, a growing number of GCA alumni are returning to climate-responsive, tactile materials that honor regional craftsmanship.

      ### The Resurgence of Terracotta & Brick
      Terracotta jali blocks not only reduce heat gain by up to 4°C, but they also cast enchanting shadow patterns that evolve throughout the day. By collaborating with local potters and brick kilns around Uttar Pradesh, alumni architects are bringing local artisan economies into mainstream commercial and residential projects.

      ### Passive Solar Cooling Techniques
      Incorporating wind-catchers, courtyard evaporative cooling, and double-skinned insulated facades allows modern spaces to achieve carbon efficiency while connecting occupants deeply with natural elements.
    `,
    category: 'Sustainable Design',
    categoryColor: 'bg-teal-100 text-teal-900 border-teal-200',
    date: '02 Sep 2026',
    readTime: '7 min read',
    author: {
      name: 'Ar. Amitesh Gupta',
      role: 'Sustainable Architecture Consultant (M.Arch 2012)',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    },
    imageFileName: 'gallery_13_heritage_steps.png',
    tags: ['Sustainable Architecture', 'Passive Cooling', 'Terracotta Jali', 'Green Building'],
    featured: false,
    status: 'Published',
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected successfully!');

    console.log('\n--- UPLOADING BLOG IMAGES TO CLOUDINARY & SEEDING DATABASE ---');

    for (const blog of seedBlogs) {
      const localImagePath = path.join(galleryDir, blog.imageFileName);
      let cloudinaryUrl = '';
      let publicId = '';

      if (fs.existsSync(localImagePath)) {
        console.log(`\nUploading local image for "${blog.title.slice(0, 40)}..." (${blog.imageFileName}) to Cloudinary...`);
        try {
          const uploadRes = await cloudinary.uploader.upload(localImagePath, {
            folder: 'gcaaa/blogs',
            public_id: blog.slug,
            overwrite: true,
            resource_type: 'image',
            transformation: [{ quality: 'auto:good' }, { fetch_format: 'auto' }],
          });
          cloudinaryUrl = uploadRes.secure_url;
          publicId = uploadRes.public_id;
          console.log(`Uploaded to Cloudinary: ${cloudinaryUrl}`);
        } catch (uploadErr) {
          console.error(`Failed to upload ${blog.imageFileName} to Cloudinary:`, uploadErr.message);
        }
      } else {
        console.warn(`Local file not found: ${localImagePath}`);
      }

      if (!cloudinaryUrl) {
        cloudinaryUrl = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80';
      }

      // Prepare DB blog object
      const blogData = {
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        category: blog.category,
        categoryColor: blog.categoryColor,
        date: blog.date,
        readTime: blog.readTime,
        author: blog.author,
        image: cloudinaryUrl,
        cloudinaryPublicId: publicId,
        tags: blog.tags,
        featured: blog.featured,
        status: blog.status,
      };

      const result = await Blog.findOneAndUpdate(
        { slug: blog.slug },
        { $set: blogData },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`Saved in MongoDB: ID=${result._id}, Slug="${result.slug}"`);
    }

    const totalCount = await Blog.countDocuments();
    console.log(`\nSUCCESS: Seeding completed! Total blogs in database: ${totalCount}`);
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB Disconnected.');
    process.exit(0);
  }
}

seed();
