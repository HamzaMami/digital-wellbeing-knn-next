# Digital Well-Being Assessment - Frontend

Next.js frontend for the Digital Well-Being ML application.

## Prerequisites

- Node.js 20.9.0+ (currently may work with 18+)
- npm
- Backend API running on port 8000

## Getting Started

### 1. Install Dependencies

```bash
cd frontend
npm install

# Install additional utilities
npm install clsx tailwind-merge
```

### 2. Environment Setup

The `.env.local` file is already configured:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

- **Home** (`/`) - Landing page with project overview
- **Assessment** (`/assessment`) - Interactive assessment form
- **Results** (`/results`) - Prediction results and recommendations
- **About** (`/about`) - Technical details and methodology

## Project Structure

```
frontend/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout with nav
│   ├── page.tsx          # Home page
│   ├── assessment/       # Assessment form
│   ├── results/          # Results display
│   └── about/            # About page
├── lib/
│   ├── types.ts          # TypeScript interfaces
│   ├── constants.ts      # Constants and configs
│   ├── utils.ts          # Utility functions
│   └── api.ts            # API client
└── components/           # Reusable components
```

## API Integration

Connects to FastAPI backend at `http://localhost:8000`:
- Health check
- Prediction endpoint
- Model info

## Building for Production

```bash
npm run build
npm start
```

## Important Note

**Make sure the backend API is running** before starting the frontend!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
