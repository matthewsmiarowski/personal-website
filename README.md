# Personal Website

Matt Smiarowski's personal website showcasing work, projects, and interests.

Built with [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), and deployed on [Vercel](https://vercel.com/).

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager
- A Vercel account (free tier works great)

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see your website.

4. **Start editing:**
   - The home page is at `app/page.tsx`
   - Work page: `app/work/page.tsx`
   - Projects page: `app/projects/page.tsx`
   - Interests page: `app/interests/page.tsx`
   - Global styles: `app/globals.css`

### Build for Production

```bash
npm run build
npm start
```

## Deploying to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy your project:**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - It will detect Next.js automatically
   - Choose whether to link to an existing project or create a new one
   - Follow the setup instructions

4. **For production deployment:**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub Integration (Easiest)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import project on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and configure everything
   - Click "Deploy"

3. **Automatic deployments:**
   - Every push to `main` will automatically deploy to production
   - Pull requests will get preview deployments

### Option 3: Deploy via Vercel Dashboard

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com/new](https://vercel.com/new)

2. **Import your Git repository:**
   - Connect your GitHub/GitLab/Bitbucket account
   - Select your repository
   - Vercel will auto-detect Next.js settings

3. **Configure (optional):**
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

4. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live!

## Project Structure

```
personal-website/
├── app/                    # Next.js App Router directory
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── home.css           # Home page styles
│   ├── work/              # Work page
│   │   └── page.tsx
│   ├── projects/          # Projects page
│   │   └── page.tsx
│   └── interests/         # Interests page
│       └── page.tsx
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── next.config.js         # Next.js configuration
├── vercel.json            # Vercel deployment configuration
└── README.md              # This file
```

## Customization

### Update Metadata

Edit `app/layout.tsx` to change the site title and description:

```typescript
export const metadata: Metadata = {
  title: 'Your Name - Personal Website',
  description: 'Your custom description',
}
```

### Add Content

- Edit the respective page files to add your content
- Modify `app/globals.css` and component CSS files to customize styling
- Add images to a `public/` directory and reference them as `/image-name.jpg`

## Next Steps

- Add your work experience to `app/work/page.tsx`
- Showcase your projects in `app/projects/page.tsx`
- Share your interests in `app/interests/page.tsx`
- Customize the design and styling
- Add a contact form or links to social media
- Configure a custom domain in Vercel settings

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
