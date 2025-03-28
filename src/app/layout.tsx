import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'StuImpact - Discover Opportunities for Students',
  description: 'Find internships, volunteer work, and job opportunities tailored for high school and college students. Explore the best opportunities to build your future with StuImpact.',
  keywords: 'student opportunities, internships, volunteer work, job opportunities, high school, college, career growth, student jobs, internships in Washington, StuImpact',
  authors: [{ name: 'StuImpact' }],
  openGraph: {
    title: 'StuImpact - Discover Opportunities for Students',
    description: 'Explore internships, jobs, and volunteer opportunities tailored for students. Find your next step with StuImpact.',
    url: 'https://www.stuimpact.works',
    type: 'website',
    siteName: 'StuImpact',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.stuimpact.works" />
      </head>
      <body className="bg-background text-white font-sans">{children}</body>
    </html>
  );
}
