# Smart Terra 

Smart Terra ( Definition ) 

## 🌟 Features

- **Real-time Environmental Monitoring**: Track weather data (temperature, humidity, wind, rainfall) and water levels
- **Interactive Dashboard**: Visual charts and status monitoring for AWS and AWL devices
- **Geospatial Mapping**: Interactive maps with GeoTIFF and Shapefile support
- **Device Management**: Monitor AWS (Automatic Weather Station) and AWL (Automatic Water Level) devices
- **Data Export**: Generate reports in PDF, CSV, and Excel formats
- **Multi-tenant Support**: Organize data by PT (Company) and Kebun (Plantation)
- **Authentication**: Secure user authentication with Supabase

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.2.4, React 19.1.0, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth
- **UI/UX**: Tailwind CSS, Custom Components
- **Charts**: Chart.js with react-chartjs-2
- **Maps**: Leaflet with React-Leaflet
- **Forms**: React Hook Form with Yup validation
- **Geospatial**: GeoTIFF support with georaster

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager
- PostgreSQL database
- Supabase account

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/KillerQueen59/smart-terra.git
cd smart-terra
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Configure your environment variables:

```env
DATABASE_URL="postgresql://postgres.aybdxfptafsnywznbvpc:oyjA7IsVC43APBWm@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.aybdxfptafsnywznbvpc:oyjA7IsVC43APBWm@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL=https://aybdxfptafsnywznbvpc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5YmR4ZnB0YWZzbnl3em5idnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NzYwMDYsImV4cCI6MjA3NDQ1MjAwNn0.jv312y5hm6zzNfqBrCoEbipHJ3ulzo4CJrNASiaHZ40
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database (optional)
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
smart-terra/
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma      # Database schema
│   ├── seed.ts           # Database seeding
│   └── migrations/       # Migration files
├── public/               # Static assets
│   ├── *.svg            # Icons and logos
│   ├── *.gif            # Animation assets
│   └── dummy/           # Sample data files
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── api/         # API routes
│   │   ├── login/       # Authentication pages
│   │   ├── map/         # Map visualization
│   │   └── (web)/       # Protected routes
│   │       ├── dashboard/  # Main dashboard
│   │       ├── device/     # Device management
│   │       └── sumber/     # Data source management
│   ├── components/      # Reusable UI components
│   │   ├── Chart/       # Chart components
│   │   ├── Map/         # Map components
│   │   ├── Sidebar/     # Navigation components
│   │   └── Table/       # Data table components
│   ├── contexts/        # React contexts
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # External library configs
│   ├── shared/         # Shared utilities
│   ├── types/          # TypeScript definitions
│   └── utils/          # Utility functions
└── config files        # ESLint, Tailwind, etc.
```

## 🎯 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint linting
- `npm run db:seed` - Seed database with sample data

## 🔧 Configuration

### Database Configuration

The application uses Prisma as the ORM. Key models include:

- **User**: Authentication and user management
- **PT**: Company/Organization management
- **Kebun**: Plantation/Location management
- **AlatAWS**: Weather station devices
- **AlatAWL**: Water level monitoring devices
- **WeatherData**: Environmental measurements
- **TMASData**: Water level measurements

### Authentication

Supabase handles user authentication with features:

- Email/password authentication
- Session management
- Role-based access control

## 📊 Usage

### Dashboard

- Monitor device status with interactive charts
- Filter data by PT (Company) and Kebun (Plantation)
- View real-time device statistics

### Device Management

- **AWS Devices**: Monitor weather stations (temperature, humidity, wind, rainfall)
- **AWL Devices**: Monitor water level sensors for flood detection

### Map Visualization

- Interactive maps with Leaflet
- Upload and visualize GeoTIFF files
- Support for Shapefile data overlays

### Data Export

- Generate daily and monthly reports
- Export data in multiple formats (PDF, CSV, Excel)
- Chart visualization exports

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Database Migration

```bash
npx prisma migrate deploy
```

