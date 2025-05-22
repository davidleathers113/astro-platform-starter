This file is a merged representation of a subset of the codebase, containing specifically included files and files not matching ignore patterns, combined into a single document by Repomix.
The content has been processed where line numbers have been added.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
4. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
- Pay special attention to the Repository Description. These contain important context and guidelines specific to this project.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: src/**/*.astro, src/**/*.tsx, src/**/*.ts, src/**/*.css, astro.config.mjs, tailwind.config.js, tsconfig.json, package.json, netlify/**/*
- Files matching these patterns are excluded: node_modules/**, **/.git/**, **/*.log, **/*.bak, **/*.zip, **/*.gz, **/*.min.js, **/*.min.css, **/*.tsbuildinfo, package-lock.json, LICENSE*, dist/**, .netlify/**, .vscode/**, public/assets/**, **/*.md, !README.md, !CLAUDE.md, !docs/*.md
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Line numbers have been added to the beginning of each line
- Files are sorted by Git change count (files with more changes are at the bottom)

## Additional Info
### User Provided Header
# Astro Platform Starter

This is an analysis of the Astro Platform Starter codebase. The project is built with Astro.js and leverages Netlify Core Primitives (Edge Functions, Image CDN, Blob Store).

This starter includes features like:
- Theme system with light/dark mode
- Tailwind CSS for styling
- React components for interactive elements
- TypeScript for type safety
- Netlify integration for deployment

Key directories:
- `/src/components/` - UI components
- `/src/layouts/` - Page layouts
- `/src/pages/` - Routes and API endpoints
- `/netlify/` - Netlify-specific configurations

# Directory Structure
```
netlify/
  edge-functions/
    rewrite.js
src/
  components/
    debt-relief/
      BenefitItem.astro
      Benefits.astro
      ChevronIcon.astro
      ComparisonTable.astro
      DebtCalculator.astro
      DebtFreedomLogo.astro
      Disclosures.astro
      FAQItem.astro
      FAQSection.astro
      FinalCTA.astro
      Hero.astro
      LandingHeader.astro
      ProcessStep.astro
      ProcessSteps.astro
      QualificationForm.astro
      TestimonialItem.astro
      Testimonials.astro
    icons/
      BlobShape1.astro
      BlobShape2.astro
      CheckCircleIcon.astro
      CheckIcon.astro
      CheckmarkIcon.astro
      ChevronDownIcon.astro
      ChevronRightIcon.astro
      ClockIcon.astro
      CreditCardAltIcon.astro
      CreditCardIcon.astro
      DollarIcon.astro
      DotsPattern.astro
      EmailIcon.astro
      FacebookIcon.astro
      HamburgerIcon.astro
      InfoIcon.astro
      InstagramIcon.astro
      LinkedInIcon.astro
      LocationIcon.astro
      LockIcon.astro
      ModernPhoneIcon.astro
      ModernQuoteIcon.astro
      MoonIcon.astro
      PhoneIcon.astro
      PlayIcon.astro
      QuoteIcon.astro
      ShieldIcon.astro
      StarIcon.astro
      SunIcon.astro
      SystemIcon.astro
      TrustLogo1.astro
      TrustLogo2.astro
      TrustLogo3.astro
      TrustLogo4.astro
      TwitterIcon.astro
      UsersIcon.astro
      XIcon.astro
    theme/
      index.ts
      MediaQueryListenerDemo.tsx
      systemTheme.ts
      SystemThemeDemo.tsx
      ThemeProvider.tsx
      ThemeTest.tsx
      ThemeUtilsDemo.tsx
      useTheme.ts
    Alert.astro
    BackgroundPattern.astro
    BenefitsSection.astro
    ContextAlert.astro
    CTASection.astro
    DarkModeTest.astro
    DataRightsForm.astro
    DebtReliefForm.astro
    DebtReliefHero.astro
    Diff.astro
    EdgeFunctionExplainer.astro
    EnhancedHero.astro
    Footer.astro
    Header.astro
    Logo.astro
    Markdown.astro
    TestimonialsSection.astro
    ThemeToggle.astro
    TrustIndicators.astro
  config/
    resend.ts
  emails/
    components/
      BaseEmailLayout.tsx
    templates/
      ErrorNotificationEmail.tsx
      index.ts
      InternalLeadNotificationEmail.tsx
      LeadConfirmationEmail.tsx
      WelcomeEmail.tsx
    preview.ts
    service.ts
    types.ts
  layouts/
    LandingLayout.astro
    Layout.astro
  pages/
    api/
      gdpr/
        delete.ts
        export.ts
      webhooks/
        resend.ts
      blob.ts
      blobs.ts
      csrf-token.ts
      email-analytics.ts
      email-usage.ts
      health.ts
      leads.ts
      revalidate.ts
    blobs/
      _components/
        NewShape.tsx
        ShapeEditor.tsx
        ShapePreview.tsx
        StoredShapes.tsx
      index.astro
    contact/
      index.astro
    data-rights/
      index.astro
    edge/
      australia/
        index.astro
      not-australia/
        index.astro
      index.astro
    privacy-policy/
      index.astro
    terms-of-service/
      index.astro
    accessibility-testing.astro
    background-text-colors-demo.astro
    color-palette-demo.astro
    dark-mode-transitions-demo.astro
    debt-relief.astro
    email-preview.astro
    faq.astro
    image-cdn.astro
    index.astro
    revalidation.astro
    secondary-accent-palette-demo.astro
    theme-demo.astro
  styles/
    globals.css
    print.css
  utils/
    csrf.ts
    email.ts
    highlighter.ts
    rate-limiting.ts
    security.ts
    supabase.ts
    validation-middleware.ts
    validation.ts
  types.ts
  utils.ts
astro.config.mjs
package.json
tailwind.config.js
tsconfig.json
```

# Files

## File: src/components/ContextAlert.astro
```
 1: ---
 2: import Alert from './Alert.astro';
 3: import Markdown from './Markdown.astro';
 4: import { getNetlifyContext } from '../utils';
 5: 
 6: const noNetlifyContextAlert = `
 7: For full functionality, either run this site locally via \`netlify dev\`
 8: ([see docs](https://docs.netlify.com/cli/local-development/)) or deploy it to Netlify.
 9: `;
10: 
11: const { addedChecksFunction, class: className } = Astro.props;
12: const ctx = getNetlifyContext();
13: 
14: let markdownText = null;
15: if (!ctx) {
16:     markdownText = noNetlifyContextAlert;
17: } else if (addedChecksFunction) {
18:     markdownText = addedChecksFunction(ctx);
19: }
20: ---
21: 
22: {
23:     markdownText && (
24:         <Alert class={className}>
25:             <Markdown content={markdownText} />
26:         </Alert>
27:     )
28: }
```

## File: src/pages/api/blob.ts
```typescript
 1: import type { APIRoute } from 'astro';
 2: import { getStore } from '@netlify/blobs';
 3: 
 4: export const prerender = false;
 5: 
 6: export const GET: APIRoute = async (context) => {
 7:     const urlParams = new URL(context.url);
 8:     const key = urlParams.searchParams.get('key');
 9:     if (!key) {
10:         return new Response('Bad Request', { status: 400 });
11:     }
12: 
13:     const blobStore = getStore('shapes');
14:     const blob = await blobStore.get(key, { type: 'json' });
15:     return new Response(
16:         JSON.stringify({
17:             blob
18:         })
19:     );
20: };
```

## File: src/pages/api/blobs.ts
```typescript
 1: import type { APIRoute } from 'astro';
 2: import { getStore } from '@netlify/blobs';
 3: import { uploadDisabled } from '../../utils';
 4: 
 5: export const prerender = false;
 6: 
 7: export const POST: APIRoute = async ({ request }) => {
 8:     if (uploadDisabled) throw new Error('Sorry, uploads are disabled');
 9: 
10:     const parameters = await request.json();
11:     const blobStore = getStore('shapes');
12:     const key = parameters.name;
13:     await blobStore.setJSON(key, parameters);
14:     return new Response(
15:         JSON.stringify({
16:             message: `Stored shape "${key}"`
17:         })
18:     );
19: };
20: 
21: export const GET: APIRoute = async ({ request }) => {
22:     try {
23:         const blobStore = getStore({ name: 'shapes', consistency: 'strong' });
24:         const data = await blobStore.list();
25:         const keys = data.blobs.map(({ key }) => key);
26:         return new Response(
27:             JSON.stringify({
28:                 keys
29:             })
30:         );
31:     } catch (e) {
32:         console.error(e);
33:         return new Response(
34:             JSON.stringify({
35:                 keys: [],
36:                 error: 'Failed listing blobs'
37:             })
38:         );
39:     }
40: };
```

## File: src/pages/api/revalidate.ts
```typescript
 1: import type { APIRoute } from 'astro';
 2: import { purgeCache } from '@netlify/functions';
 3: 
 4: export const prerender = false;
 5: 
 6: export const POST: APIRoute = async ({ request }) => {
 7:     const { tags } = await request.json();
 8: 
 9:     if (!Array.isArray(tags)) {
10:         return new Response(`Bad Request: expected tags attribute with array of strings in the body, got ${typeof tags}`, { status: 400 });
11:     }
12: 
13:     await purgeCache({ tags });
14:     return new Response(
15:         JSON.stringify({
16:             invalidated: tags
17:         })
18:     );
19: };
```

## File: src/pages/blobs/_components/ShapeEditor.tsx
```typescript
 1: import { useState } from 'react';
 2: import NewShape from './NewShape.tsx';
 3: import StoredShapes from './StoredShapes.tsx';
 4: 
 5: export default function ShapeEditor() {
 6:     const [lastMutationTime, setLastMutationTime] = useState<number>(null);
 7: 
 8:     return (
 9:         <div className="flex flex-col gap-8 md:flex-row">
10:             <div className="flex-1">
11:                 <NewShape setLastMutationTime={setLastMutationTime} />
12:             </div>
13:             <div className="flex-1">
14:                 <StoredShapes lastMutationTime={lastMutationTime} />
15:             </div>
16:         </div>
17:     );
18: }
```

## File: src/pages/blobs/_components/ShapePreview.tsx
```typescript
 1: import { randomInt } from '../../../utils.ts';
 2: import type { BlobProps } from '../../../types.ts';
 3: 
 4: export default function ShapePreview(props: BlobProps) {
 5:     const { svgPath, parameters } = props;
 6:     const gradientId = `gradient-${randomInt(10_000_000, 100_000_000)}`;
 7: 
 8:     return (
 9:         <svg viewBox={`0 0 ${parameters.size} ${parameters.size}`} xmlns="http://www.w3.org/2000/svg" width="100%">
10:             <defs>
11:                 <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
12:                     <stop offset="0%" style={{ stopColor: parameters.colors[0] }} />
13:                     <stop offset="100%" style={{ stopColor: parameters.colors[1] }} />
14:                 </linearGradient>
15:             </defs>
16:             <path d={svgPath} fill={`url(#${gradientId})`}></path>
17:         </svg>
18:     );
19: }
```

## File: src/pages/edge/index.astro
```
 1: ---
 2: import Layout from '../../layouts/Layout.astro';
 3: import Markdown from '../../components/Markdown.astro';
 4: 
 5: const explainer = `
 6: # You've reached the fallback page.
 7: 
 8: This page is using a [Netlify Edge Function](https://docs.netlify.com/edge-functions/overview/) to rewrite the URL based on visitor geography.
 9: 
10: For it to be invoked, please either run this site locally with \`netlify dev\` or deploy it to Netlify.
11: 
12: Edge Functions are framework-agnostic, but are also used behind the scenes to run Astro Middleware on Netlify.
13: There are advatanges to using Edge Functions directly, such as the ability to access & transform the response body.
14: 
15: [See more examples](https://edge-functions-examples.netlify.app)
16: `;
17: ---
18: 
19: <Layout title="Fallback">
20:     <Markdown content={explainer} />
21: </Layout>
```

## File: src/pages/faq.astro
```
  1: ---
  2: import Layout from '../layouts/Layout.astro';
  3: import FAQSection from '../components/debt-relief/FAQSection.astro';
  4: 
  5: // Page metadata
  6: const pageTitle = 'Frequently Asked Questions - Debt Settlement Program';
  7: const pageDescription = 'Get answers to common questions about our debt settlement program, costs, timeline, and how debt settlement works.';
  8: ---
  9: 
 10: <Layout title={pageTitle} description={pageDescription}>
 11:     <!-- FAQ Hero Section -->
 12:     <section class="py-16 sm:py-20 md:py-24">
 13:         <div class="max-w-4xl mx-auto text-center">
 14:             <h1 class="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-[#2d7984] dark:text-[#58cbe0]">
 15:                 Frequently Asked Questions
 16:             </h1>
 17:             <p class="mb-8 text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
 18:                 Get answers to the most common questions about our debt settlement program and how we can help you become debt-free.
 19:             </p>
 20:             <div class="flex flex-col sm:flex-row gap-4 justify-center">
 21:                 <a 
 22:                     href="/debt-relief#qualification-form" 
 23:                     class="btn btn-lg bg-[#2d7984] hover:bg-[#1d5058] text-white font-semibold"
 24:                 >
 25:                     See If You Qualify
 26:                 </a>
 27:                 <a 
 28:                     href="tel:8005551234" 
 29:                     class="btn btn-lg bg-white hover:bg-gray-50 text-[#2d7984] border-2 border-[#2d7984] font-semibold"
 30:                 >
 31:                     Call (800) 555-1234
 32:                 </a>
 33:             </div>
 34:         </div>
 35:     </section>
 36: 
 37:     <!-- FAQ Content Section -->
 38:     <section class="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-700">
 39:         <div class="max-w-3xl mx-auto">
 40:             <FAQSection />
 41:         </div>
 42:     </section>
 43: 
 44:     <!-- Additional Resources Section -->
 45:     <section class="py-16 sm:py-20">
 46:         <div class="max-w-4xl mx-auto text-center">
 47:             <h2 class="mb-6 text-3xl sm:text-4xl font-bold text-[#2d7984] dark:text-[#58cbe0]">
 48:                 Still Have Questions?
 49:             </h2>
 50:             <p class="mb-8 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
 51:                 Our debt settlement specialists are available to provide personalized answers and help you understand how our program can work for your specific situation.
 52:             </p>
 53:             
 54:             <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
 55:                 <!-- Phone Support -->
 56:                 <div class="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
 57:                     <div class="w-12 h-12 bg-[#2d7984] text-white rounded-full flex items-center justify-center mx-auto mb-4">
 58:                         <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 59:                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
 60:                         </svg>
 61:                     </div>
 62:                     <h3 class="text-xl font-semibold mb-2 text-[#2d7984] dark:text-[#58cbe0]">Phone Support</h3>
 63:                     <p class="text-gray-600 dark:text-gray-400 mb-4">Speak with a specialist</p>
 64:                     <a href="tel:8005551234" class="text-[#2d7984] dark:text-[#58cbe0] font-semibold hover:underline">
 65:                         (800) 555-1234
 66:                     </a>
 67:                     <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
 68:                         9:00am - 8:00pm EST<br>7 days a week
 69:                     </p>
 70:                 </div>
 71: 
 72:                 <!-- Online Qualification -->
 73:                 <div class="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
 74:                     <div class="w-12 h-12 bg-[#2d7984] text-white rounded-full flex items-center justify-center mx-auto mb-4">
 75:                         <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 76:                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
 77:                         </svg>
 78:                     </div>
 79:                     <h3 class="text-xl font-semibold mb-2 text-[#2d7984] dark:text-[#58cbe0]">Quick Qualification</h3>
 80:                     <p class="text-gray-600 dark:text-gray-400 mb-4">Check eligibility in 30 seconds</p>
 81:                     <a href="/debt-relief#qualification-form" class="text-[#2d7984] dark:text-[#58cbe0] font-semibold hover:underline">
 82:                         Start Assessment
 83:                     </a>
 84:                 </div>
 85: 
 86:                 <!-- Learn More -->
 87:                 <div class="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
 88:                     <div class="w-12 h-12 bg-[#2d7984] text-white rounded-full flex items-center justify-center mx-auto mb-4">
 89:                         <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 90:                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
 91:                         </svg>
 92:                     </div>
 93:                     <h3 class="text-xl font-semibold mb-2 text-[#2d7984] dark:text-[#58cbe0]">How It Works</h3>
 94:                     <p class="text-gray-600 dark:text-gray-400 mb-4">Learn about our process</p>
 95:                     <a href="/debt-relief#benefits" class="text-[#2d7984] dark:text-[#58cbe0] font-semibold hover:underline">
 96:                         View Process
 97:                     </a>
 98:                 </div>
 99:             </div>
100: 
101:             <!-- Final CTA -->
102:             <div class="bg-[#2d7984] text-white rounded-lg p-8">
103:                 <h3 class="text-2xl font-bold mb-4">Ready to Get Started?</h3>
104:                 <p class="mb-6 text-lg opacity-90">
105:                     Take the first step towards financial freedom with our free consultation.
106:                 </p>
107:                 <a 
108:                     href="/debt-relief#qualification-form" 
109:                     class="btn btn-lg bg-white text-[#2d7984] hover:bg-gray-100 font-semibold"
110:                 >
111:                     Get Your Free Consultation Now
112:                 </a>
113:             </div>
114:         </div>
115:     </section>
116: </Layout>
117: 
118: <style>
119:     /* Add section styling for better visual hierarchy */
120:     h2 {
121:         position: relative;
122:     }
123:     
124:     h2::after {
125:         content: "";
126:         position: absolute;
127:         bottom: -0.75rem;
128:         left: 50%;
129:         transform: translateX(-50%);
130:         width: 100px;
131:         height: 3px;
132:         background-color: var(--color-primary, #2d7984);
133:         border-radius: 3px;
134:     }
135:     
136:     /* Ensure smooth scrolling for any anchor links */
137:     @media (min-width: 768px) {
138:         section {
139:             scroll-margin-top: 80px;
140:         }
141:     }
142: </style>
```

## File: src/utils/rate-limiting.ts
```typescript
 1: // Rate limiting utilities - Re-export from security.ts
 2: // This module provides rate limiting functionality for the debt relief system
 3: 
 4: export {
 5:     RateLimiter,
 6:     createRateLimitKey,
 7:     getClientIP,
 8:     type RateLimitOptions
 9: } from './security.js';
10: 
11: // Pre-configured rate limits for different endpoints
12: export const RATE_LIMITS = {
13:     LEADS_SUBMISSION: {
14:         maxRequests: 5,
15:         windowMinutes: 15
16:     },
17:     GDPR_REQUESTS: {
18:         maxRequests: 2,
19:         windowMinutes: 15
20:     },
21:     WEBHOOK_PROCESSING: {
22:         maxRequests: 100,
23:         windowMinutes: 15
24:     },
25:     EMAIL_ANALYTICS: {
26:         maxRequests: 10,
27:         windowMinutes: 5
28:     },
29:     HEALTH_CHECK: {
30:         maxRequests: 60,
31:         windowMinutes: 1
32:     }
33: } as const;
34: 
35: // Rate limiting middleware for different endpoint types
36: export function withRateLimit(
37:     options: RateLimitOptions,
38:     endpoint: string
39: ) {
40:     return async (request: Request): Promise<{ allowed: boolean; headers: Record<string, string> }> => {
41:         const { RateLimiter, createRateLimitKey } = await import('./security.js');
42:         
43:         const key = createRateLimitKey(request, endpoint);
44:         const result = RateLimiter.check(key, options);
45:         
46:         const headers: Record<string, string> = {
47:             'X-RateLimit-Limit': options.maxRequests.toString(),
48:             'X-RateLimit-Remaining': result.remaining.toString(),
49:             'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
50:         };
51:         
52:         if (!result.allowed) {
53:             headers['Retry-After'] = Math.ceil((result.resetTime - Date.now()) / 1000).toString();
54:         }
55:         
56:         return {
57:             allowed: result.allowed,
58:             headers
59:         };
60:     };
61: }
62: 
63: // Convenience functions for common rate limiting scenarios
64: export const rateLimiters = {
65:     // For lead submission forms
66:     leads: withRateLimit(RATE_LIMITS.LEADS_SUBMISSION, 'leads'),
67:     
68:     // For GDPR data requests
69:     gdpr: withRateLimit(RATE_LIMITS.GDPR_REQUESTS, 'gdpr'),
70:     
71:     // For webhook processing
72:     webhooks: withRateLimit(RATE_LIMITS.WEBHOOK_PROCESSING, 'webhooks'),
73:     
74:     // For email analytics
75:     analytics: withRateLimit(RATE_LIMITS.EMAIL_ANALYTICS, 'analytics'),
76:     
77:     // For health checks
78:     health: withRateLimit(RATE_LIMITS.HEALTH_CHECK, 'health')
79: };
```

## File: src/types.ts
```typescript
 1: export type BlobParameterProps = {
 2:     seed: number;
 3:     size: number;
 4:     edges: number;
 5:     growth: number;
 6:     name: string;
 7:     colors: string[];
 8: };
 9: 
10: export type BlobProps = {
11:     svgPath: string;
12:     parameters: BlobParameterProps;
13: };
```

## File: src/utils.ts
```typescript
 1: import blobshape from 'blobshape';
 2: import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';
 3: 
 4: // Note: this only works on the server side
 5: export function getNetlifyContext() {
 6:     return process.env.CONTEXT;
 7: }
 8: 
 9: export function randomInt(min: number, max: number) {
10:     return Math.floor(Math.random() * (max - min + 1) + min);
11: }
12: 
13: export function uniqueName() {
14:     const config = {
15:         dictionaries: [adjectives, animals],
16:         separator: '-',
17:         length: 2
18:     };
19:     return uniqueNamesGenerator(config) + '-' + randomInt(100, 999);
20: }
21: 
22: export function generateBlob(parameters?: any) {
23:     const gradientColors = [
24:         ['#2E3192', '#1BFFFF'],
25:         ['#93A5CF', '#E4EfE9'],
26:         ['#BFF098', '#6FD6FF'],
27:         ['#A1C4FD', '#C2E9FB'],
28:         ['#11998E', '#38EF7D'],
29:         ['#D8B5FF', '#1EAE98']
30:     ];
31: 
32:     parameters = {
33:         seed: null,
34:         size: 512,
35:         edges: randomInt(3, 20),
36:         growth: randomInt(2, 9),
37:         name: uniqueName(),
38:         colors: gradientColors[randomInt(0, gradientColors.length - 1)],
39:         ...parameters
40:     };
41:     const { path: svgPath, seedValue: seed } = blobshape(parameters);
42:     return { parameters: { ...parameters, seed }, svgPath };
43: }
44: 
45: export function cacheHeaders(maxAgeDays = 365, cacheTags?: string[]): Record<string, string> {
46:     // As far as the browser is concerned, it must revalidate on every request.
47:     // However, Netlify CDN is told to keep the content cached for up to maxAgeDays (note: new deployment bust the cache by default).
48:     // We're also setting cache tags to be able to later purge via API (see: https://www.netlify.com/blog/cache-tags-and-purge-api-on-netlify/)
49:     const headers = {
50:         'Cache-Control': 'public, max-age=0, must-revalidate', // Tell browsers to always revalidate
51:         'Netlify-CDN-Cache-Control': `public, max-age=${maxAgeDays * 86_400}, must-revalidate` // Tells Netlify CDN the max allwed cache duration
52:     };
53:     if (cacheTags?.length > 0) headers['Cache-Tag'] = cacheTags.join(',');
54:     return headers;
55: }
56: 
57: export const uploadDisabled = import.meta.env.PUBLIC_DISABLE_UPLOADS?.toLowerCase() === 'true';
```

## File: netlify/edge-functions/rewrite.js
```javascript
1: export default async (request, context) => {
2:     const path = context.geo?.country?.code === 'AU' ? '/edge/australia' : '/edge/not-australia';
3:     return Response.redirect(new URL(path, request.url));
4: };
5: 
6: export const config = {
7:     path: '/edge'
8: };
```

## File: src/components/debt-relief/Benefits.astro
```
 1: ---
 2: // src/components/debt-relief/Benefits.astro
 3: import BenefitItem from './BenefitItem.astro';
 4: 
 5: const benefits = [
 6:     {
 7:         title: "Reduce What You Owe",
 8:         description: "Clients typically save 30-50% on enrolled debt before fees through our professional negotiation service."
 9:     },
10:     {
11:         title: "One Affordable Monthly Payment",
12:         description: "Replace multiple high-interest minimum payments with one lower monthly program payment."
13:     },
14:     {
15:         title: "Become Debt-Free Faster",
16:         description: "Most clients complete the program in 24-36 months, compared to 20+ years making minimum payments."
17:     },
18:     {
19:         title: "Professional Negotiation",
20:         description: "Our experienced team handles all creditor communication and negotiation on your behalf."
21:     },
22:     {
23:         title: "No Upfront Fees",
24:         description: "You only pay when we successfully settle your debt - performance-based fees mean we're on your side."
25:     },
26:     {
27:         title: "Custom Solution",
28:         description: "Get a personalized plan based on your specific debt situation and financial goals."
29:     }
30: ];
31: ---
32: 
33: <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
34:     {benefits.map(benefit => (
35:         <BenefitItem 
36:             title={benefit.title}
37:             description={benefit.description}
38:         />
39:     ))}
40: </div>
41: 
42: <div class="mt-10 text-center">
43:     <a href="#qualification-form" class="btn btn-lg">Take The First Step Today</a>
44: </div>
```

## File: src/components/debt-relief/ComparisonTable.astro
```
  1: ---
  2: import CheckIcon from '../icons/CheckIcon.astro';
  3: import XIcon from '../icons/XIcon.astro';
  4: 
  5: // Data for the comparison table
  6: const comparisonData = [
  7:     {
  8:         feature: 'Reduces Total Debt Amount',
  9:         debtSettlement: true,
 10:         consolidation: false,
 11:         bankruptcy: true,
 12:         minimumPayments: false
 13:     },
 14:     {
 15:         feature: 'No New Loan Required',
 16:         debtSettlement: true,
 17:         consolidation: false,
 18:         bankruptcy: true,
 19:         minimumPayments: true
 20:     },
 21:     {
 22:         feature: 'Become Debt-Free in 24-48 Months',
 23:         debtSettlement: true,
 24:         consolidation: false,
 25:         bankruptcy: true,
 26:         minimumPayments: false
 27:     },
 28:     {
 29:         feature: 'Avoid Bankruptcy Court',
 30:         debtSettlement: true,
 31:         consolidation: true,
 32:         bankruptcy: false,
 33:         minimumPayments: true
 34:     },
 35:     {
 36:         feature: 'Single Monthly Program Payment',
 37:         debtSettlement: true,
 38:         consolidation: true,
 39:         bankruptcy: false,
 40:         minimumPayments: false
 41:     },
 42:     {
 43:         feature: 'No Minimum Credit Score Required',
 44:         debtSettlement: true,
 45:         consolidation: false,
 46:         bankruptcy: true,
 47:         minimumPayments: true
 48:     },
 49:     {
 50:         feature: 'Professional Debt Negotiation',
 51:         debtSettlement: true,
 52:         consolidation: false,
 53:         bankruptcy: false,
 54:         minimumPayments: false
 55:     }
 56: ];
 57: ---
 58: 
 59: <div class="overflow-x-auto shadow-md rounded-lg border border-border mb-4">
 60:     <table class="w-full text-sm">
 61:         <thead>
 62:             <tr class="bg-[#2d7984] text-white">
 63:                 <th class="p-4 text-left font-medium min-w-[200px]">Debt Relief Option</th>
 64:                 <th class="p-4 text-center font-medium">Debt Settlement<br /><span class="text-xs font-normal">(Our Program)</span></th>
 65:                 <th class="p-4 text-center font-medium">Debt Consolidation</th>
 66:                 <th class="p-4 text-center font-medium">Bankruptcy</th>
 67:                 <th class="p-4 text-center font-medium">Minimum Payments</th>
 68:             </tr>
 69:         </thead>
 70:         <tbody>
 71:             {comparisonData.map((item, index) => (
 72:                 <tr class={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} dark:bg-gray-800 dark:border-gray-700`}>
 73:                     <td class="p-4 font-medium">{item.feature}</td>
 74:                     <td class="p-4 text-center">
 75:                         {item.debtSettlement ? 
 76:                             <div class="flex justify-center">
 77:                                 <CheckIcon class="w-6 h-6 text-green-500" />
 78:                             </div> : 
 79:                             <div class="flex justify-center">
 80:                                 <XIcon class="w-6 h-6 text-red-500" />
 81:                             </div>
 82:                         }
 83:                     </td>
 84:                     <td class="p-4 text-center">
 85:                         {item.consolidation ? 
 86:                             <div class="flex justify-center">
 87:                                 <CheckIcon class="w-6 h-6 text-green-500" />
 88:                             </div> : 
 89:                             <div class="flex justify-center">
 90:                                 <XIcon class="w-6 h-6 text-red-500" />
 91:                             </div>
 92:                         }
 93:                     </td>
 94:                     <td class="p-4 text-center">
 95:                         {item.bankruptcy ? 
 96:                             <div class="flex justify-center">
 97:                                 <CheckIcon class="w-6 h-6 text-green-500" />
 98:                             </div> : 
 99:                             <div class="flex justify-center">
100:                                 <XIcon class="w-6 h-6 text-red-500" />
101:                             </div>
102:                         }
103:                     </td>
104:                     <td class="p-4 text-center">
105:                         {item.minimumPayments ? 
106:                             <div class="flex justify-center">
107:                                 <CheckIcon class="w-6 h-6 text-green-500" />
108:                             </div> : 
109:                             <div class="flex justify-center">
110:                                 <XIcon class="w-6 h-6 text-red-500" />
111:                             </div>
112:                         }
113:                     </td>
114:                 </tr>
115:             ))}
116:         </tbody>
117:     </table>
118: </div>
119: 
120: <div class="bg-background-form/30 p-4 rounded-lg border border-border">
121:     <p class="text-sm text-center text-text-muted mb-0">
122:         <strong>Note:</strong> This comparison is for informational purposes only. Individual results may vary based on your specific financial situation, creditor policies, and applicable laws in your state.
123:     </p>
124: </div>
125: 
126: <style>
127:     /* Responsive table adjustments */
128:     @media (max-width: 768px) {
129:         table {
130:             display: block;
131:         }
132:         
133:         th:first-child {
134:             position: sticky;
135:             left: 0;
136:             background-color: #2d7984;
137:             z-index: 1;
138:         }
139:         
140:         td:first-child {
141:             position: sticky;
142:             left: 0;
143:             background-color: inherit;
144:             z-index: 1;
145:         }
146:     }
147: </style>
```

## File: src/components/debt-relief/ProcessSteps.astro
```
 1: ---
 2: // src/components/debt-relief/ProcessSteps.astro
 3: import ProcessStep from './ProcessStep.astro';
 4: 
 5: const steps = [
 6:     {
 7:         stepNumber: 1,
 8:         title: "Free Consultation",
 9:         description: "Speak with a Certified Debt Specialist who will evaluate your situation and explain your options."
10:     },
11:     {
12:         stepNumber: 2,
13:         title: "Custom Plan",
14:         description: "Get a personalized program with a single monthly payment that fits your budget."
15:     },
16:     {
17:         stepNumber: 3,
18:         title: "Debt Freedom",
19:         description: "We negotiate with creditors to reduce your balances while you make program payments."
20:     }
21: ];
22: ---
23: 
24: <div class="relative">
25:     <!-- Steps container -->
26:     <div class="grid gap-16 md:grid-cols-3 md:gap-8">
27:         <!-- Process step components -->
28:         {steps.map(step => (
29:             <ProcessStep 
30:                 stepNumber={step.stepNumber}
31:                 title={step.title}
32:                 description={step.description}
33:             />
34:         ))}
35:     </div>
36:     
37:     <!-- Connecting line (visible on desktop only) -->
38:     <div class="absolute top-8 left-0 w-full hidden md:block">
39:         <div class="border-t-2 border-primary border-dashed"></div>
40:     </div>
41: </div>
42: 
43: <div class="mt-10 text-center">
44:     <a href="#qualification-form" class="btn btn-lg">See If You Qualify Now</a>
45: </div>
```

## File: src/components/icons/BlobShape1.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "100", height = "100" } = Astro.props;
 9: ---
10: 
11: <svg class={className} width={width} height={height} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
12:     <path fill="currentColor" d="M37.9,-64.5C49.1,-57.6,58.5,-47.8,63.6,-36.2C68.7,-24.7,69.5,-11.3,68.1,1.4C66.7,14.1,63.1,26.2,56.2,36.1C49.3,46,39,53.9,27.4,61.7C15.8,69.5,2.9,77.3,-9.1,76.7C-21.1,76.1,-33.1,67.2,-43.5,57.2C-53.9,47.2,-62.7,36.1,-68.8,23.3C-74.9,10.4,-78.2,-4.2,-75.8,-17.5C-73.3,-30.9,-65,-43,-53.9,-49.9C-42.8,-56.9,-28.8,-58.7,-16.1,-63.7C-3.4,-68.6,8.1,-76.7,19.8,-76.2C31.6,-75.7,43.5,-67.5,37.9,-64.5Z" transform="translate(100 100)" />
13: </svg>
```

## File: src/components/icons/BlobShape2.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "100", height = "100" } = Astro.props;
 9: ---
10: 
11: <svg class={className} width={width} height={height} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
12:     <path fill="currentColor" d="M44.3,-73.1C57.9,-67.1,69.8,-56.3,76.4,-42.9C83,-29.4,84.4,-13.5,80.4,-0.1C76.4,13.3,67.1,24.2,58.7,35.8C50.3,47.5,42.8,59.9,31.7,69.3C20.7,78.7,6.2,85.2,-8.6,84.2C-23.4,83.3,-38.6,75,-51.5,64.3C-64.4,53.7,-75,40.8,-80.3,25.7C-85.5,10.6,-85.3,-6.7,-79.9,-21.6C-74.4,-36.5,-63.6,-49,-50.2,-54.5C-36.9,-60.1,-21,-58.6,-6.4,-59.8C8.3,-61,16.5,-64.9,28.5,-69.8C40.4,-74.6,56.1,-80.4,44.3,-73.1Z" transform="translate(100 100)" />
13: </svg>
```

## File: src/components/icons/CheckCircleIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "48", height = "48" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} class={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
12:     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
13:     <polyline points="22 4 12 14.01 9 11.01"></polyline>
14: </svg>
```

## File: src/components/icons/CheckIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "20", height = "20" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className}>
12:     <polyline points="20 6 9 17 4 12"></polyline>
13: </svg>
```

## File: src/components/icons/CheckmarkIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "20", height = "20" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className}>
12:     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
13:     <polyline points="22 4 12 14.01 9 11.01"></polyline>
14: </svg>
```

## File: src/components/icons/ChevronDownIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "chevron-icon text-primary", width = "16", height = "16" } = Astro.props;
 9: ---
10: 
11: <svg 
12:   xmlns="http://www.w3.org/2000/svg" 
13:   viewBox="0 0 24 24" 
14:   fill="none" 
15:   stroke="currentColor" 
16:   stroke-width="1.5" 
17:   stroke-linecap="round" 
18:   stroke-linejoin="round" 
19:   class={className}
20:   width={width}
21:   height={height}
22: >
23:   <path d="M6 9l6 6 6-6"></path>
24: </svg>
25: 
26: <style>
27:   .chevron-icon {
28:     transition: transform 0.3s ease;
29:     transform-origin: center;
30:   }
31: </style>
```

## File: src/components/icons/ChevronRightIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "24", height = "24" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" class={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
12:     <polyline points="9 18 15 12 9 6"></polyline>
13: </svg>
```

## File: src/components/icons/ClockIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "20", height = "20" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} class={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
12:     <circle cx="12" cy="12" r="10"></circle>
13:     <polyline points="12 6 12 12 16 14"></polyline>
14: </svg>
```

## File: src/components/icons/CreditCardAltIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "32", height = "32" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} class={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
12:     <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
13:     <line x1="1" y1="10" x2="23" y2="10"></line>
14: </svg>
```

## File: src/components/icons/CreditCardIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "24", height = "24" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className}>
12:     <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
13:     <line x1="12" y1="16" x2="12" y2="16"></line>
14:     <line x1="6" y1="12" x2="6" y2="12"></line>
15:     <line x1="18" y1="12" x2="18" y2="12"></line>
16:     <line x1="12" y1="8" x2="12" y2="8"></line>
17: </svg>
```

## File: src/components/icons/DollarIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "24", height = "24" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className}>
12:     <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
13:     <line x1="12" y1="16" x2="12" y2="16"></line>
14:     <line x1="6" y1="12" x2="6" y2="12"></line>
15:     <line x1="18" y1="12" x2="18" y2="12"></line>
16:     <line x1="12" y1="8" x2="12" y2="8"></line>
17: </svg>
```

## File: src/components/icons/DotsPattern.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6:     patternId?: string;
 7: }
 8: 
 9: const { class: className = "", width = "100%", height = "100%", patternId = "dots-pattern" } = Astro.props;
10: ---
11: 
12: <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" class={className}>
13:     <defs>
14:         <pattern id={patternId} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
15:             <circle cx="1" cy="1" r="1" fill="currentColor" class="text-primary/40" />
16:         </pattern>
17:     </defs>
18:     <rect width="100%" height="100%" fill={`url(#${patternId})`} />
19: </svg>
```

## File: src/components/icons/EmailIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "20", height = "20" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} class={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
12:     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
13:     <polyline points="22,6 12,13 2,6"></polyline>
14: </svg>
```

## File: src/components/icons/FacebookIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "20", height = "20" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" viewBox="0 0 24 24" class={className}>
12:     <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
13: </svg>
```

## File: src/components/icons/HamburgerIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "24", height = "24" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" class={className} width={width} height={height} fill="none" viewBox="0 0 24 24" stroke="currentColor">
12:     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
13: </svg>
```

## File: src/components/icons/InfoIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "24", height = "24" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" class={`fill-current ${className}`} width={width} height={height} viewBox="0 0 24 24">
12:     <path
13:         d="M12 20.016q3.281 0 5.648-2.367t2.367-5.648-2.367-5.648-5.648-2.367-5.648 2.367-2.367 5.648 2.367 5.648 5.648 2.367zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93zM11.016 6.984h1.969v6h-1.969v-6zM11.016 15h1.969v2.016h-1.969v-2.016z"
14:     ></path>
15: </svg>
```

## File: src/components/icons/InstagramIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "20", height = "20" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" viewBox="0 0 24 24" class={className}>
12:     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
13: </svg>
```

## File: src/components/icons/LinkedInIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "20", height = "20" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" viewBox="0 0 24 24" class={className}>
12:     <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
13: </svg>
```

## File: src/components/icons/LocationIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "20", height = "20" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} class={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
12:     <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
13:     <circle cx="12" cy="10" r="3"></circle>
14: </svg>
```

## File: src/components/icons/LockIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "16", height = "16" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
12:     <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
13:     <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
14: </svg>
```

## File: src/components/icons/ModernPhoneIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "24", height = "24" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={className} width={width} height={height}>
12:     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
13: </svg>
```

## File: src/components/icons/ModernQuoteIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "24", height = "24" } = Astro.props;
 9: ---
10: 
11: <svg 
12:     xmlns="http://www.w3.org/2000/svg" 
13:     viewBox="0 0 24 24" 
14:     fill="currentColor" 
15:     class={className}
16:     width={width}
17:     height={height}
18:     aria-hidden="true"
19: >
20:     <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 00-2.794-5.432l-1.736-.896c.161.405.28.83.357 1.27.114.63.094 1.281-.059 1.905l-.148.705.113.152a6.7 6.7 0 003.071 2.19zm.464-10.7c-.512-.006-.998.1-1.438.299l-.133.066.052.145a6.704 6.704 0 002.573 3.483l.4.332-.214.336a6.707 6.707 0 00-.259 5.182c.16.426.38.825.645 1.189.12.164.24.32.365.474.125.154.29.302.19.199l.712.712c.97-.243 1.927-.672 2.8-1.28.317-.218.63-.456.936-.711l.433-.346.144.429c.122.365.307.697.539.978.36.438.783.794 1.238 1.043l.744.41c.135-.214.257-.44.365-.675a6.706 6.706 0 00.408-4.122l-.187-.793-.159-.075a6.718 6.718 0 00-2.031-.607c.019.307.07.612.148.909.078.297.194.585.341.861l.252.66-.598.265a6.7 6.7 0 01-3.963.445l-1.151-.234.49-1.084c.108-.238.208-.488.3-.749.09-.26.17-.53.237-.812.146-.591.224-1.227.225-1.856a6.73 6.73 0 00-3.35-5.813 6.724 6.724 0 00-2.127-.695zm.2-2.29a6.709 6.709 0 00-3.194 1.814 6.71 6.71 0 00-1.16 7.565c.022-.012.055-.025.09-.043l.879-.472.069-.037a4.893 4.893 0 011.735-.335 4.903 4.903 0 014.898 4.55 4.88 4.88 0 01-.118 1.1 4.91 4.91 0 01-2.385 3.188c.12.007.24.012.36.017a4.886 4.886 0 002.96-.586 4.885 4.885 0 001.019-.813 4.886 4.886 0 002.106-.977 4.89 4.89 0 00.743-4.174 4.887 4.887 0 00-1.77-2.767 4.885 4.885 0 00-2.007-.862 4.899 4.899 0 00-3.812.756 4.883 4.883 0 00-1.68 2.206 4.87 4.87 0 00-.147.447 4.886 4.886 0 00-2.297.021 4.886 4.886 0 00-2.861 2.173 4.888 4.888 0 00-.189-2.567 4.89 4.89 0 001.537-1.308 4.895 4.895 0 00.946-1.929 4.895 4.895 0 00-.2-2.766z" clip-rule="evenodd" />
21: </svg>
```

## File: src/components/icons/MoonIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "20", height = "20" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className}>
12:   <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
13: </svg>
```

## File: src/components/icons/PhoneIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "20", height = "20" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} class={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
12:     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
13: </svg>
```

## File: src/components/icons/PlayIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "32", height = "32" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" class={className} viewBox="0 0 24 24" fill="currentColor" width={width} height={height}>
12:     <path d="M8 5v14l11-7z"></path>
13: </svg>
```

## File: src/components/icons/ShieldIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "24", height = "24" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className}>
12:     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
13: </svg>
```

## File: src/components/icons/StarIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "20", height = "20" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" class={className} viewBox="0 0 20 20" fill="currentColor" width={width} height={height}>
12:     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
13: </svg>
```

## File: src/components/icons/SunIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "20", height = "20" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className}>
12:   <circle cx="12" cy="12" r="5"></circle>
13:   <line x1="12" y1="1" x2="12" y2="3"></line>
14:   <line x1="12" y1="21" x2="12" y2="23"></line>
15:   <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
16:   <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
17:   <line x1="1" y1="12" x2="3" y2="12"></line>
18:   <line x1="21" y1="12" x2="23" y2="12"></line>
19:   <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
20:   <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
21: </svg>
```

## File: src/components/icons/SystemIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "20", height = "20" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className}>
12:   <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
13:   <line x1="8" y1="21" x2="16" y2="21"></line>
14:   <line x1="12" y1="17" x2="12" y2="21"></line>
15: </svg>
```

## File: src/components/icons/TrustLogo1.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "120", height = "40" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 120 40" class={className}>
12:   <path fill="currentColor" d="M12 6.286c-3.464 0-6.286 2.822-6.286 6.286s2.822 6.286 6.286 6.286 6.286-2.822 6.286-6.286S15.464 6.286 12 6.286zm0 10.286c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
13:   <path fill="currentColor" d="M34.457 20.571h-3.429v-8.571h3.429v8.571zm-1.714-9.714c-1.105 0-1.714-.61-1.714-1.429s.61-1.429 1.714-1.429 1.714.61 1.714 1.429-.609 1.429-1.714 1.429zM45.714 20.571h-3.429v-4.571c0-1.371-.61-2.286-1.714-2.286-.61 0-1.067.305-1.371.61a2.536 2.536 0 00-.457 1.676v4.571h-3.429v-8.571h3.429v1.067a3.538 3.538 0 012.896-1.371c1.981 0 4.076 1.219 4.076 4.267v4.608z"/>
14:   <text x="55" y="20" font-family="Arial" font-size="12" fill="currentColor">FINANCE</text>
15: </svg>
```

## File: src/components/icons/TrustLogo2.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "120", height = "40" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 120 40" class={className}>
12:   <circle fill="currentColor" cx="20" cy="20" r="8"/>
13:   <text x="35" y="24" font-family="Arial" font-size="12" font-weight="bold" fill="currentColor">BUSINESS</text>
14:   <text x="35" y="14" font-family="Arial" font-size="8" fill="currentColor">NATIONAL</text>
15: </svg>
```

## File: src/components/icons/TrustLogo3.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "120", height = "40" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 120 40" class={className}>
12:   <path fill="currentColor" d="M10 10h25v20H10z"/>
13:   <text x="42" y="25" font-family="Arial" font-size="14" fill="currentColor">MONEY</text>
14:   <text x="42" y="15" font-family="Arial" font-size="6" fill="currentColor">THE</text>
15: </svg>
```

## File: src/components/icons/TrustLogo4.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "120", height = "40" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 120 40" class={className}>
12:   <path fill="currentColor" d="M20 10l10 20H10z"/>
13:   <text x="40" y="24" font-family="Arial" font-size="14" fill="currentColor">CREDIT</text>
14:   <text x="40" y="15" font-family="Arial" font-size="8" fill="currentColor">SMART</text>
15: </svg>
```

## File: src/components/icons/TwitterIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "20", height = "20" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" viewBox="0 0 24 24" class={className}>
12:     <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
13: </svg>
```

## File: src/components/icons/UsersIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "24", height = "24" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className}>
12:     <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
13:     <circle cx="9" cy="7" r="4"></circle>
14:     <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
15:     <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
16: </svg>
```

## File: src/components/icons/XIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "24", height = "24" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" class={className} width={width} height={height} fill="none" viewBox="0 0 24 24" stroke="currentColor">
12:     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
13: </svg>
```

## File: src/components/theme/systemTheme.ts
```typescript
  1: // Define types
  2: export type ThemePreference = 'light' | 'dark';
  3: export type ThemeType = ThemePreference | 'system';
  4: 
  5: export interface SystemThemeManager {
  6:   getSystemPreference: () => ThemePreference;
  7:   isSystemDarkMode: () => boolean;
  8:   addPreferenceChangeListener: (callback: (preference: ThemePreference) => void) => void;
  9:   removePreferenceChangeListener: (callback: (preference: ThemePreference) => void) => void;
 10: }
 11: 
 12: /**
 13:  * Gets the current system color scheme preference
 14:  * @returns 'dark' if system prefers dark mode, 'light' otherwise
 15:  */
 16: export function getSystemPreference(): ThemePreference {
 17:   if (typeof window === 'undefined') {
 18:     return 'dark'; // Default for SSR
 19:   }
 20:   
 21:   try {
 22:     return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
 23:   } catch (error) {
 24:     console.warn('Error detecting system preference:', error);
 25:     return 'light'; // Fallback to light
 26:   }
 27: }
 28: 
 29: /**
 30:  * Checks if the system is currently in dark mode
 31:  * @returns true if system prefers dark mode, false otherwise
 32:  */
 33: export function isSystemDarkMode(): boolean {
 34:   return getSystemPreference() === 'dark';
 35: }
 36: 
 37: /**
 38:  * Creates a MediaQueryList for dark mode preference if supported
 39:  * @returns MediaQueryList or null if not supported
 40:  */
 41: function getDarkModeMediaQuery(): MediaQueryList | null {
 42:   if (typeof window === 'undefined') {
 43:     return null;
 44:   }
 45:   
 46:   try {
 47:     return window.matchMedia('(prefers-color-scheme: dark)');
 48:   } catch (error) {
 49:     console.warn('MediaQueryList not supported:', error);
 50:     return null;
 51:   }
 52: }
 53: 
 54: // Store references to callbacks for proper cleanup
 55: const callbackMap = new Map<
 56:   (preference: ThemePreference) => void, 
 57:   (e: MediaQueryListEvent) => void
 58: >();
 59: 
 60: /**
 61:  * Adds an event listener for system preference changes
 62:  * @param callback Function to call when preference changes
 63:  */
 64: export function addPreferenceChangeListener(
 65:   callback: (preference: ThemePreference) => void
 66: ): void {
 67:   const mediaQuery = getDarkModeMediaQuery();
 68:   if (!mediaQuery) return;
 69:   
 70:   // Create a wrapper function that converts MediaQueryListEvent to ThemePreference
 71:   const eventHandler = (e: MediaQueryListEvent) => {
 72:     callback(e.matches ? 'dark' : 'light');
 73:   };
 74:   
 75:   // Store the mapping between the original callback and the event handler
 76:   callbackMap.set(callback, eventHandler);
 77:   
 78:   // For modern browsers
 79:   try {
 80:     mediaQuery.addEventListener('change', eventHandler);
 81:   } catch (error) {
 82:     // For older browsers
 83:     try {
 84:       (mediaQuery as any).addListener(eventHandler);
 85:     } catch (fallbackError) {
 86:       console.warn('Unable to add preference change listener:', fallbackError);
 87:     }
 88:   }
 89: }
 90: 
 91: /**
 92:  * Removes an event listener for system preference changes
 93:  * @param callback Function to remove
 94:  */
 95: export function removePreferenceChangeListener(
 96:   callback: (preference: ThemePreference) => void
 97: ): void {
 98:   const mediaQuery = getDarkModeMediaQuery();
 99:   if (!mediaQuery) return;
100:   
101:   // Get the stored event handler for this callback
102:   const eventHandler = callbackMap.get(callback);
103:   if (!eventHandler) {
104:     console.warn('No event handler found for callback');
105:     return;
106:   }
107:   
108:   // For modern browsers
109:   try {
110:     mediaQuery.removeEventListener('change', eventHandler);
111:   } catch (error) {
112:     // For older browsers
113:     try {
114:       (mediaQuery as any).removeListener(eventHandler);
115:     } catch (fallbackError) {
116:       console.warn('Unable to remove preference change listener:', fallbackError);
117:     }
118:   }
119:   
120:   // Remove the mapping
121:   callbackMap.delete(callback);
122: }
123: 
124: /**
125:  * Creates a system theme manager with all necessary functions
126:  * @returns SystemThemeManager object
127:  */
128: export function createSystemThemeManager(): SystemThemeManager {
129:   return {
130:     getSystemPreference,
131:     isSystemDarkMode,
132:     addPreferenceChangeListener,
133:     removePreferenceChangeListener,
134:   };
135: }
```

## File: src/components/theme/ThemeProvider.tsx
```typescript
  1: import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
  2: import { getSystemPreference, addPreferenceChangeListener, removePreferenceChangeListener } from './systemTheme';
  3: 
  4: // Define the available theme types
  5: export type ThemeType = 'light' | 'dark' | 'system';
  6: 
  7: // Define the shape of our theme context
  8: interface ThemeContextType {
  9:   theme: ThemeType;
 10:   resolvedTheme: 'light' | 'dark'; // The actual theme being displayed (resolved from 'system' if needed)
 11:   setTheme: (theme: ThemeType) => void;
 12:   toggleTheme: () => void;
 13: }
 14: 
 15: // Create the context with a default value
 16: export const ThemeContext = createContext<ThemeContextType>({
 17:   theme: 'system',
 18:   resolvedTheme: 'dark',
 19:   setTheme: () => {},
 20:   toggleTheme: () => {},
 21: });
 22: 
 23: interface ThemeProviderProps {
 24:   children: ReactNode;
 25: }
 26: 
 27: export function ThemeProvider({ children }: ThemeProviderProps) {
 28:   // We'll use window.themeManager's value to initialize our state
 29:   const [theme, setThemeState] = useState<ThemeType>('system');
 30:   const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');
 31: 
 32:   // Set the theme using themeManager to keep everything in sync
 33:   const setTheme = useCallback((newTheme: ThemeType) => {
 34:     if (typeof window !== 'undefined' && window.themeManager) {
 35:       window.themeManager.setTheme(newTheme);
 36:       // Note: We don't need to update state here, as the event listener will catch the change
 37:     }
 38:   }, []);
 39: 
 40:   // Toggle between light and dark themes
 41:   const toggleTheme = useCallback(() => {
 42:     const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
 43:     setTheme(newTheme);
 44:   }, [resolvedTheme, setTheme]);
 45: 
 46:   // Handler for theme changes from window.themeManager or storage events
 47:   const handleThemeChange = useCallback((e: CustomEvent<{ theme: ThemeType }>) => {
 48:     setThemeState(e.detail.theme);
 49:     setResolvedTheme(e.detail.theme === 'system' ? getSystemPreference() : e.detail.theme);
 50:   }, []);
 51: 
 52:   // Handler for system preference changes
 53:   const handleSystemPreferenceChange = useCallback((preference: 'light' | 'dark') => {
 54:     if (theme === 'system') {
 55:       console.log('System preference changed to:', preference);
 56:       setResolvedTheme(preference);
 57:     }
 58:   }, [theme]);
 59: 
 60:   // Initialize theme from themeManager and set up theme-change event listener
 61:   useEffect(() => {
 62:     // Ensure we're running in browser context
 63:     if (typeof window === 'undefined' || !window.themeManager) return;
 64: 
 65:     try {
 66:       // Get initial theme from themeManager
 67:       const currentTheme = window.themeManager.getTheme() as ThemeType;
 68:       setThemeState(currentTheme);
 69: 
 70:       // Determine the resolved theme
 71:       setResolvedTheme(currentTheme === 'system' ? getSystemPreference() : currentTheme);
 72: 
 73:       // Set up listener for theme changes from other sources
 74:       window.addEventListener('theme-change', handleThemeChange as EventListener);
 75: 
 76:       // Clean up listener when component unmounts
 77:       return () => {
 78:         window.removeEventListener('theme-change', handleThemeChange as EventListener);
 79:       };
 80:     } catch (error) {
 81:       console.error('Error initializing theme:', error);
 82:     }
 83:   }, [handleThemeChange]);
 84: 
 85:   // Set up listener for system preference changes
 86:   useEffect(() => {
 87:     try {
 88:       // Add listener for system preference changes
 89:       addPreferenceChangeListener(handleSystemPreferenceChange);
 90:       
 91:       // Clean up listener when component unmounts or dependencies change
 92:       return () => {
 93:         removePreferenceChangeListener(handleSystemPreferenceChange);
 94:       };
 95:     } catch (error) {
 96:       console.error('Error setting up system preference listener:', error);
 97:     }
 98:   }, [handleSystemPreferenceChange]);
 99: 
100:   // Create our context value
101:   const contextValue: ThemeContextType = {
102:     theme,
103:     resolvedTheme,
104:     setTheme,
105:     toggleTheme,
106:   };
107: 
108:   return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
109: }
110: 
111: // Add type declaration for themeManager on the Window object
112: declare global {
113:   interface Window {
114:     themeManager: {
115:       getTheme: () => ThemeType;
116:       setTheme: (theme: ThemeType) => void;
117:     };
118:   }
119: }
```

## File: src/components/theme/ThemeTest.tsx
```typescript
 1: import { useTheme } from './useTheme';
 2: 
 3: export default function ThemeTest() {
 4:   const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
 5:   
 6:   return (
 7:     <div className="form-container p-6 my-6">
 8:       <h2 className="text-2xl font-bold mb-4">Theme Context Test</h2>
 9:       
10:       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
11:         <div>
12:           <p className="mb-2 text-text-muted">Current Theme Setting:</p>
13:           <p className="text-xl font-semibold">{theme}</p>
14:         </div>
15:         <div>
16:           <p className="mb-2 text-text-muted">Resolved Theme:</p>
17:           <p className="text-xl font-semibold">{resolvedTheme}</p>
18:         </div>
19:       </div>
20:       
21:       <div className="flex flex-wrap gap-4 mb-6">
22:         <button 
23:           onClick={() => setTheme('light')} 
24:           className={`btn ${theme === 'light' ? 'btn-accent' : ''}`}
25:         >
26:           Light Mode
27:         </button>
28:         <button 
29:           onClick={() => setTheme('dark')} 
30:           className={`btn ${theme === 'dark' ? 'btn-accent' : ''}`}
31:         >
32:           Dark Mode
33:         </button>
34:         <button 
35:           onClick={() => setTheme('system')} 
36:           className={`btn ${theme === 'system' ? 'btn-accent' : ''}`}
37:         >
38:           System Preference
39:         </button>
40:       </div>
41:       
42:       <button 
43:         onClick={toggleTheme} 
44:         className="btn btn-secondary"
45:       >
46:         Toggle Theme (Light/Dark)
47:       </button>
48:       
49:       <div className="mt-6 p-4 border border-border rounded-lg">
50:         <p className="text-text-muted mb-2">This component demonstrates:</p>
51:         <ul className="list-disc pl-5">
52:           <li>Reading current theme state from context</li>
53:           <li>Setting specific themes</li>
54:           <li>Toggling between light and dark</li>
55:           <li>Automatically syncing with themeManager</li>
56:         </ul>
57:       </div>
58:     </div>
59:   );
60: }
```

## File: src/components/theme/ThemeUtilsDemo.tsx
```typescript
  1: import { useState, useEffect } from 'react';
  2: import { 
  3:   useTheme, 
  4:   useThemeStyles, 
  5:   useThemeTransition, 
  6:   useContrastCheck,
  7:   getThemeColor,
  8:   getContrastRatio,
  9:   listenToThemeChanges
 10: } from './useTheme';
 11: 
 12: export default function ThemeUtilsDemo() {
 13:   const { 
 14:     theme, 
 15:     resolvedTheme, 
 16:     setTheme, 
 17:     toggleTheme, 
 18:     isDarkMode, 
 19:     isLightMode, 
 20:     isSystemTheme,
 21:     themeClass,
 22:     getThemeValue
 23:   } = useTheme();
 24:   
 25:   // Demo for useThemeStyles
 26:   const boxStyles = useThemeStyles({
 27:     backgroundColor: { light: '#f0f4f8', dark: '#2d3748' },
 28:     borderColor: { light: '#cbd5e0', dark: '#4a5568' },
 29:     boxShadow: { light: '0 2px 4px rgba(0,0,0,0.1)', dark: '0 2px 4px rgba(0,0,0,0.3)' }
 30:   });
 31:   
 32:   // Demo for useThemeTransition
 33:   const { isTransitioning, transitionClass } = useThemeTransition();
 34:   
 35:   // Demo for useContrastCheck
 36:   const [testColor, setTestColor] = useState('#42a5b2');
 37:   const contrastInfo = useContrastCheck(testColor);
 38:   
 39:   // Demo for listening to theme changes
 40:   const [lastThemeChange, setLastThemeChange] = useState<string>('None');
 41:   
 42:   // Set up listener on mount
 43:   useEffect(() => {
 44:     const cleanupListener = listenToThemeChanges((theme, resolvedTheme) => {
 45:       setLastThemeChange(`Theme changed to ${theme} (resolved: ${resolvedTheme})`);
 46:     });
 47:     
 48:     return cleanupListener;
 49:   }, []);
 50:   
 51:   return (
 52:     <div className="theme-utils-demo p-6 my-6">
 53:       <h2 className="text-2xl font-bold mb-4">Theme Utilities Demo</h2>
 54:       
 55:       {/* Basic Theme Information Section */}
 56:       <section className="mb-8">
 57:         <h3 className="text-xl font-semibold mb-3">Enhanced useTheme Hook</h3>
 58:         
 59:         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
 60:           <div className="form-container">
 61:             <p className="text-text-muted mb-1">Theme Setting</p>
 62:             <p className="text-lg font-medium">{theme}</p>
 63:           </div>
 64:           
 65:           <div className="form-container">
 66:             <p className="text-text-muted mb-1">Resolved Theme</p>
 67:             <p className="text-lg font-medium">{resolvedTheme}</p>
 68:           </div>
 69:           
 70:           <div className="form-container">
 71:             <p className="text-text-muted mb-1">Derived Values</p>
 72:             <ul>
 73:               <li><span className="text-text-muted">isDarkMode:</span> {isDarkMode.toString()}</li>
 74:               <li><span className="text-text-muted">isLightMode:</span> {isLightMode.toString()}</li>
 75:               <li><span className="text-text-muted">isSystemTheme:</span> {isSystemTheme.toString()}</li>
 76:             </ul>
 77:           </div>
 78:         </div>
 79:         
 80:         <div className="flex flex-wrap gap-4 mb-4">
 81:           <button 
 82:             onClick={() => setTheme('light')} 
 83:             className={`btn ${theme === 'light' ? 'btn-accent' : ''}`}
 84:           >
 85:             Light Mode
 86:           </button>
 87:           <button 
 88:             onClick={() => setTheme('dark')} 
 89:             className={`btn ${theme === 'dark' ? 'btn-accent' : ''}`}
 90:           >
 91:             Dark Mode
 92:           </button>
 93:           <button 
 94:             onClick={() => setTheme('system')} 
 95:             className={`btn ${theme === 'system' ? 'btn-accent' : ''}`}
 96:           >
 97:             System Preference
 98:           </button>
 99:           <button 
100:             onClick={toggleTheme} 
101:             className="btn btn-secondary"
102:           >
103:             Toggle Theme
104:           </button>
105:         </div>
106:       </section>
107:       
108:       {/* themeClass Demo */}
109:       <section className="mb-8 form-container">
110:         <h3 className="text-xl font-semibold mb-3">themeClass Utility</h3>
111:         
112:         <div className="mb-4">
113:           <p className="mb-2">This button uses <code>themeClass</code> to apply theme-specific classes:</p>
114:           <button 
115:             className={`px-4 py-2 rounded ${themeClass('bg-gray-800 text-white', 'bg-gray-200 text-black')}`}
116:           >
117:             Themed Button
118:           </button>
119:         </div>
120:         
121:         <div className="mb-4">
122:           <p className="mb-2">This element uses <code>getThemeValue</code> for dynamic content:</p>
123:           <div className="px-4 py-2 border rounded">
124:             {getThemeValue({ 
125:               light: 'This content is shown in light mode', 
126:               dark: 'This content is shown in dark mode' 
127:             })}
128:           </div>
129:         </div>
130:       </section>
131:       
132:       {/* useThemeStyles Demo */}
133:       <section className="mb-8">
134:         <h3 className="text-xl font-semibold mb-3">useThemeStyles Hook</h3>
135:         
136:         <div className="mb-4">
137:           <p className="mb-2">This box uses <code>useThemeStyles</code> for theme-specific styling:</p>
138:           <div 
139:             style={boxStyles} 
140:             className="p-4 border rounded"
141:           >
142:             <p>This box has theme-specific styles applied via React's style prop</p>
143:           </div>
144:         </div>
145:       </section>
146:       
147:       {/* useThemeTransition Demo */}
148:       <section className="mb-8 form-container">
149:         <h3 className="text-xl font-semibold mb-3">useThemeTransition Hook</h3>
150:         
151:         <p className="mb-4">
152:           {isTransitioning 
153:             ? 'Theme is currently transitioning!' 
154:             : 'Theme is stable. Try changing the theme.'}
155:         </p>
156:         
157:         <div 
158:           className={`p-4 border rounded bg-background ${transitionClass} ${
159:             isTransitioning ? 'animate-pulse' : ''
160:           }`}
161:         >
162:           <p>This element uses <code>useThemeTransition</code> to detect theme changes and apply animations</p>
163:         </div>
164:       </section>
165:       
166:       {/* useContrastCheck Demo */}
167:       <section className="mb-8 form-container">
168:         <h3 className="text-xl font-semibold mb-3">useContrastCheck Hook</h3>
169:         
170:         <div className="mb-4">
171:           <label className="block mb-2">
172:             Test a color against the current theme background:
173:             <input 
174:               type="color" 
175:               value={testColor} 
176:               onChange={(e) => setTestColor(e.target.value)}
177:               className="ml-2"
178:             />
179:           </label>
180:           
181:           <div 
182:             className="p-4 border rounded"
183:             style={{ color: testColor }}
184:           >
185:             <p className="text-xl font-bold">Sample Text</p>
186:             <p>This text is using the color: {testColor}</p>
187:           </div>
188:           
189:           <div className="mt-4">
190:             <p><strong>Contrast Ratio:</strong> {contrastInfo.contrastRatio.toFixed(2)}</p>
191:             <p><strong>Meets WCAG AA:</strong> {contrastInfo.meetsAA ? '✓' : '✗'}</p>
192:             <p><strong>Meets WCAG AA (Large Text):</strong> {contrastInfo.meetsAALarge ? '✓' : '✗'}</p>
193:           </div>
194:         </div>
195:       </section>
196:       
197:       {/* Non-React Utilities Demo */}
198:       <section className="mb-8 form-container">
199:         <h3 className="text-xl font-semibold mb-3">Non-React Utilities</h3>
200:         
201:         <div className="mb-4">
202:           <p className="mb-2">Current primary color from CSS variables: <code>{getThemeColor('primary')}</code></p>
203:           <div style={{ backgroundColor: getThemeColor('primary') }} className="h-8 w-full rounded"></div>
204:         </div>
205:         
206:         <div className="mb-4">
207:           <p className="mb-2">Theme change listener detected:</p>
208:           <div className="p-2 border rounded">{lastThemeChange}</div>
209:         </div>
210:       </section>
211:       
212:       {/* Documentation */}
213:       <section className="form-container">
214:         <h3 className="text-xl font-semibold mb-3">Using Theme Utilities</h3>
215:         <p className="mb-2">Import the utilities you need:</p>
216:         <pre className="mb-4 p-3 bg-background-form overflow-auto rounded">
217:           {`import { 
218:   useTheme, 
219:   useThemeStyles, 
220:   useThemeTransition, 
221:   useContrastCheck 
222: } from '../components/theme';`}
223:         </pre>
224:         
225:         <p className="mb-2">Basic usage example:</p>
226:         <pre className="mb-4 p-3 bg-background-form overflow-auto rounded">
227:           {`function MyComponent() {
228:   const { isDarkMode, themeClass } = useTheme();
229:   
230:   return (
231:     <div className={themeClass('bg-gray-800', 'bg-gray-100')}>
232:       {isDarkMode ? 'Dark Mode Active' : 'Light Mode Active'}
233:     </div>
234:   );
235: }`}
236:         </pre>
237:       </section>
238:     </div>
239:   );
240: }
```

## File: src/components/DarkModeTest.astro
```
 1: ---
 2: ---
 3: 
 4: <div class="dark-mode-test p-6 my-8 rounded-lg transition-theme duration-300 bg-background-form dark:bg-slate-800">
 5:     <h2 class="text-2xl font-bold mb-4">Dark Mode Test</h2>
 6:     
 7:     <p class="mb-4">This component demonstrates both CSS variable-based theme styles and Tailwind's dark mode classes.</p>
 8:     
 9:     <!-- CSS Variables Test -->
10:     <div class="p-4 mb-4 rounded bg-background dark:bg-slate-900 transition-theme duration-300">
11:         <h3 class="text-xl font-bold mb-2">CSS Variables</h3>
12:         <p class="text-text-muted mb-2">This text uses CSS custom properties from globals.css</p>
13:         <div class="flex gap-2 flex-wrap">
14:             <button class="btn">Primary Button</button>
15:             <button class="btn-secondary">Secondary Button</button>
16:             <button class="btn-accent">Accent Button</button>
17:         </div>
18:     </div>
19:     
20:     <!-- Tailwind Dark Mode Test -->
21:     <div class="p-4 rounded bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 transition-theme duration-300">
22:         <h3 class="text-xl font-bold mb-2">Tailwind Dark Mode</h3>
23:         <p class="mb-2">This section uses Tailwind's dark: variant classes</p>
24:         <div class="flex gap-2 flex-wrap">
25:             <button class="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:opacity-90 transition-theme duration-300">
26:                 Blue Button
27:             </button>
28:             <button class="px-4 py-2 bg-green-500 dark:bg-green-700 text-white rounded hover:opacity-90 transition-theme duration-300">
29:                 Green Button
30:             </button>
31:             <button class="px-4 py-2 bg-purple-500 dark:bg-purple-700 text-white rounded hover:opacity-90 transition-theme duration-300">
32:                 Purple Button
33:             </button>
34:         </div>
35:     </div>
36:     
37:     <!-- Mixed Approach -->
38:     <div class="p-4 mt-4 rounded border dark:border-slate-600 transition-theme duration-300">
39:         <h3 class="text-xl font-bold mb-2">Mixed Approach</h3>
40:         <p class="mb-2 text-primary dark:text-accent">This text combines CSS variables and Tailwind's dark: variant</p>
41:         <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
42:             <div class="p-3 bg-background-input dark:bg-slate-950 rounded transition-theme duration-300">
43:                 <p>Panel with CSS variables</p>
44:             </div>
45:             <div class="p-3 bg-gray-100 dark:bg-gray-900 rounded transition-theme duration-300">
46:                 <p>Panel with Tailwind colors</p>
47:             </div>
48:         </div>
49:     </div>
50: </div>
```

## File: src/components/DataRightsForm.astro
```
  1: ---
  2: // No server-side logic needed for this form component
  3: ---
  4: 
  5: <div class="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
  6:     <h2 class="text-2xl font-semibold text-[#2d7984] mb-6">Submit a Data Rights Request</h2>
  7:     
  8:     <form id="dataRightsForm" class="space-y-6">
  9:         <!-- Request Type Selection -->
 10:         <div>
 11:             <label class="block text-sm font-medium text-gray-700 mb-3">
 12:                 Type of Request <span class="text-red-500">*</span>
 13:             </label>
 14:             <div class="space-y-3">
 15:                 <label class="flex items-center">
 16:                     <input type="radio" name="requestType" value="export" class="text-[#2d7984] focus:ring-[#2d7984]" required>
 17:                     <span class="ml-3">
 18:                         <strong>Export My Data</strong> - Get a copy of all personal data we have about you
 19:                     </span>
 20:                 </label>
 21:                 <label class="flex items-center">
 22:                     <input type="radio" name="requestType" value="delete" class="text-[#2d7984] focus:ring-[#2d7984]" required>
 23:                     <span class="ml-3">
 24:                         <strong>Delete My Data</strong> - Permanently remove all personal data (cannot be undone)
 25:                     </span>
 26:                 </label>
 27:             </div>
 28:         </div>
 29:         
 30:         <!-- Contact Information -->
 31:         <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 32:             <div>
 33:                 <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
 34:                     Email Address
 35:                 </label>
 36:                 <input 
 37:                     type="email" 
 38:                     id="email" 
 39:                     name="email" 
 40:                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d7984] focus:border-transparent"
 41:                     placeholder="your@email.com"
 42:                 >
 43:                 <p class="text-xs text-gray-500 mt-1">Email address associated with your account</p>
 44:             </div>
 45:             
 46:             <div>
 47:                 <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
 48:                     Phone Number
 49:                 </label>
 50:                 <input 
 51:                     type="tel" 
 52:                     id="phone" 
 53:                     name="phone" 
 54:                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d7984] focus:border-transparent"
 55:                     placeholder="(555) 123-4567"
 56:                     maxlength="14"
 57:                 >
 58:                 <p class="text-xs text-gray-500 mt-1">Phone number used for your debt relief inquiry</p>
 59:             </div>
 60:         </div>
 61:         
 62:         <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
 63:             <p class="text-sm text-yellow-800">
 64:                 <strong>Note:</strong> You must provide at least one form of contact information (email or phone) 
 65:                 that matches our records to process your request.
 66:             </p>
 67:         </div>
 68:         
 69:         <!-- Additional Information -->
 70:         <div>
 71:             <label for="additionalInfo" class="block text-sm font-medium text-gray-700 mb-2">
 72:                 Additional Information (Optional)
 73:             </label>
 74:             <textarea 
 75:                 id="additionalInfo" 
 76:                 name="additionalInfo" 
 77:                 rows="4"
 78:                 class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d7984] focus:border-transparent"
 79:                 placeholder="Any additional details about your request..."
 80:             ></textarea>
 81:         </div>
 82:         
 83:         <!-- Deletion Confirmation (shown only for delete requests) -->
 84:         <div id="deletionConfirmation" class="bg-red-50 border border-red-200 rounded-md p-4" style="display: none;">
 85:             <label class="flex items-start">
 86:                 <input type="checkbox" id="confirmDeletion" name="confirmDeletion" class="mt-1 text-red-600 focus:ring-red-500">
 87:                 <span class="ml-3 text-sm text-red-800">
 88:                     <strong>I understand that this action is permanent and irreversible.</strong> 
 89:                     All my personal data will be permanently deleted and cannot be recovered. 
 90:                     I confirm that I want to proceed with this deletion request.
 91:                 </span>
 92:             </label>
 93:         </div>
 94:         
 95:         <!-- CSRF Token (hidden field) -->
 96:         <input type="hidden" id="csrfToken" name="csrfToken" value="">
 97:         
 98:         <!-- Form Status Messages -->
 99:         <div id="formStatus" class="hidden"></div>
100:         
101:         <!-- Submit Button -->
102:         <div class="flex justify-end space-x-4">
103:             <button 
104:                 type="button" 
105:                 onclick="window.location.href='/privacy-policy'"
106:                 class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
107:             >
108:                 Cancel
109:             </button>
110:             <button 
111:                 type="submit" 
112:                 id="submitBtn"
113:                 class="px-6 py-2 bg-[#2d7984] text-white rounded-md hover:bg-[#1d5058] focus:outline-none focus:ring-2 focus:ring-[#2d7984] disabled:opacity-50 disabled:cursor-not-allowed"
114:             >
115:                 <span id="submitText">Submit Request</span>
116:                 <span id="submitSpinner" class="hidden">
117:                     <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
118:                         <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
119:                         <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
120:                     </svg>
121:                     Processing...
122:                 </span>
123:             </button>
124:         </div>
125:     </form>
126: </div>
127: 
128: <script>
129:     // Initialize the form when the page loads
130:     document.addEventListener('DOMContentLoaded', function() {
131:         initializeDataRightsForm();
132:     });
133:     
134:     async function initializeDataRightsForm() {
135:         // Fetch CSRF token
136:         try {
137:             const response = await fetch('/api/csrf-token');
138:             const data = await response.json();
139:             if (data.token) {
140:                 document.getElementById('csrfToken').value = data.token;
141:             }
142:         } catch (error) {
143:             console.error('Failed to fetch CSRF token:', error);
144:         }
145:         
146:         // Add phone number formatting
147:         const phoneInput = document.getElementById('phone');
148:         phoneInput.addEventListener('input', function(e) {
149:             let value = e.target.value.replace(/\D/g, '');
150:             if (value.length >= 6) {
151:                 value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
152:             } else if (value.length >= 3) {
153:                 value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
154:             }
155:             e.target.value = value;
156:         });
157:         
158:         // Show/hide deletion confirmation based on request type
159:         const requestTypeInputs = document.querySelectorAll('input[name="requestType"]');
160:         const deletionConfirmation = document.getElementById('deletionConfirmation');
161:         const confirmDeletionCheckbox = document.getElementById('confirmDeletion');
162:         
163:         requestTypeInputs.forEach(input => {
164:             input.addEventListener('change', function() {
165:                 if (this.value === 'delete') {
166:                     deletionConfirmation.style.display = 'block';
167:                     confirmDeletionCheckbox.required = true;
168:                 } else {
169:                     deletionConfirmation.style.display = 'none';
170:                     confirmDeletionCheckbox.required = false;
171:                     confirmDeletionCheckbox.checked = false;
172:                 }
173:             });
174:         });
175:         
176:         // Handle form submission
177:         const form = document.getElementById('dataRightsForm');
178:         form.addEventListener('submit', handleFormSubmission);
179:     }
180:     
181:     async function handleFormSubmission(e) {
182:         e.preventDefault();
183:         
184:         const formData = new FormData(e.target);
185:         const data = Object.fromEntries(formData.entries());
186:         
187:         // Validation
188:         const requestType = data.requestType;
189:         const email = data.email?.trim();
190:         const phone = data.phone?.replace(/\D/g, '');
191:         
192:         if (!requestType) {
193:             showFormMessage('Please select a request type.', 'error');
194:             return;
195:         }
196:         
197:         if (!email && !phone) {
198:             showFormMessage('Please provide either an email address or phone number.', 'error');
199:             return;
200:         }
201:         
202:         if (phone && phone.length !== 10) {
203:             showFormMessage('Please provide a valid 10-digit phone number.', 'error');
204:             return;
205:         }
206:         
207:         if (requestType === 'delete' && !data.confirmDeletion) {
208:             showFormMessage('You must confirm the deletion request to proceed.', 'error');
209:             return;
210:         }
211:         
212:         // Show loading state
213:         setLoadingState(true);
214:         
215:         try {
216:             // Determine the API endpoint
217:             const endpoint = requestType === 'delete' ? '/api/gdpr/delete' : '/api/gdpr/export';
218:             const method = requestType === 'delete' ? 'DELETE' : 'POST';
219:             
220:             // Prepare request data
221:             const requestData = {
222:                 email: email || undefined,
223:                 phone: phone || undefined,
224:                 csrfToken: data.csrfToken
225:             };
226:             
227:             if (requestType === 'delete') {
228:                 requestData.confirmDeletion = true;
229:             }
230:             
231:             // Make API request
232:             const response = await fetch(endpoint, {
233:                 method: method,
234:                 headers: {
235:                     'Content-Type': 'application/json',
236:                     'X-CSRF-Token': data.csrfToken
237:                 },
238:                 body: JSON.stringify(requestData)
239:             });
240:             
241:             const result = await response.json();
242:             
243:             if (response.ok && result.success) {
244:                 if (requestType === 'delete') {
245:                     showFormMessage(
246:                         `✅ Successfully deleted ${result.deletedCount} record(s). ${
247:                             result.emailConfirmation?.sent 
248:                                 ? 'A confirmation email has been sent to you.' 
249:                                 : 'No confirmation email was sent (no email provided).'
250:                         }`, 
251:                         'success'
252:                     );
253:                 } else {
254:                     showFormMessage(
255:                         `✅ Found ${result.data?.length || 0} record(s). Your data export is ready. ${
256:                             result.emailConfirmation?.sent 
257:                                 ? 'A notification email has been sent to you.' 
258:                                 : 'No notification email was sent (no email provided).'
259:                         }`, 
260:                         'success'
261:                     );
262:                     
263:                     // For export requests, also offer to download the data
264:                     if (result.data && result.data.length > 0) {
265:                         downloadDataAsJson(result.data, `gdpr-export-${Date.now()}.json`);
266:                     }
267:                 }
268:                 
269:                 // Reset form
270:                 e.target.reset();
271:                 document.getElementById('deletionConfirmation').style.display = 'none';
272:                 
273:             } else {
274:                 // Handle API errors
275:                 let errorMessage = result.message || 'An error occurred while processing your request.';
276:                 
277:                 if (result.errors) {
278:                     const errorDetails = Object.values(result.errors).join(', ');
279:                     errorMessage += ` Details: ${errorDetails}`;
280:                 }
281:                 
282:                 showFormMessage(errorMessage, 'error');
283:             }
284:             
285:         } catch (error) {
286:             console.error('Form submission error:', error);
287:             showFormMessage('A network error occurred. Please try again later.', 'error');
288:         } finally {
289:             setLoadingState(false);
290:         }
291:     }
292:     
293:     function showFormMessage(message, type) {
294:         const statusDiv = document.getElementById('formStatus');
295:         statusDiv.className = `p-4 rounded-md mb-4 ${
296:             type === 'success' 
297:                 ? 'bg-green-50 border border-green-200 text-green-800' 
298:                 : 'bg-red-50 border border-red-200 text-red-800'
299:         }`;
300:         statusDiv.textContent = message;
301:         statusDiv.classList.remove('hidden');
302:         
303:         // Scroll to the message
304:         statusDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
305:     }
306:     
307:     function setLoadingState(loading) {
308:         const submitBtn = document.getElementById('submitBtn');
309:         const submitText = document.getElementById('submitText');
310:         const submitSpinner = document.getElementById('submitSpinner');
311:         
312:         submitBtn.disabled = loading;
313:         
314:         if (loading) {
315:             submitText.classList.add('hidden');
316:             submitSpinner.classList.remove('hidden');
317:         } else {
318:             submitText.classList.remove('hidden');
319:             submitSpinner.classList.add('hidden');
320:         }
321:     }
322:     
323:     function downloadDataAsJson(data, filename) {
324:         const jsonString = JSON.stringify(data, null, 2);
325:         const blob = new Blob([jsonString], { type: 'application/json' });
326:         const url = URL.createObjectURL(blob);
327:         
328:         const link = document.createElement('a');
329:         link.href = url;
330:         link.download = filename;
331:         document.body.appendChild(link);
332:         link.click();
333:         document.body.removeChild(link);
334:         
335:         URL.revokeObjectURL(url);
336:     }
337: </script>
```

## File: src/components/Diff.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4: }
 5: 
 6: const { class: className } = Astro.props;
 7: ---
 8: 
 9: <figure class:list={['diff relative grid w-full overflow-hidden select-none', className]} tabindex="0">
10:     <div class="relative col-start-1 row-start-1 overflow-hidden border-r-2 z-1 border-r-white diff-item-1">
11:         <slot name="item-1" />
12:     </div>
13:     <div class="relative col-start-1 row-start-1 diff-item-2" tabindex="0">
14:         <slot name="item-2" />
15:     </div>
16:     <div class="relative h-2 col-start-1 row-start-1 overflow-hidden opacity-0 resize-x diff-resizer z-1 min-w-4 cursor-ew-resize top-1/2"></div>
17: </figure>
18: 
19: <style>
20:     .diff {
21:         direction: ltr;
22:         container-type: inline-size;
23:         grid-template-columns: auto 1fr;
24: 
25:         &:focus-visible,
26:         &:has(.diff-item-1:focus),
27:         &:has(.diff-item-2:focus) {
28:             outline: 2px solid var(--color-gray-400);
29:             outline-offset: 1px;
30:         }
31:         &:focus-visible {
32:             .diff-resizer {
33:                 min-width: 80cqi;
34:                 max-width: 80cqi;
35:             }
36:         }
37:         &:has(.diff-item-2:focus) {
38:             .diff-resizer {
39:                 min-width: 20cqi;
40:                 max-width: 20cqi;
41:             }
42:         }
43:     }
44: 
45:     .diff-resizer {
46:         width: 50cqi;
47:         max-width: calc(100cqi - 1rem);
48:         transform: scaleY(3) translate(0.35rem, 0.08rem);
49:         transform-origin: 100% 100%;
50:         clip-path: inset(calc(100% - 0.75rem) 0 0 calc(100% - 0.75rem));
51:         transition:
52:             min-width 0.3s ease-out,
53:             max-width 0.3s ease-out;
54:     }
55: 
56:     .diff-item-2 {
57:         &:after {
58:             content: '';
59:             width: 1.25rem;
60:             height: 1.875rem;
61:             position: absolute;
62:             top: 50%;
63:             right: 1px;
64:             bottom: 0;
65:             translate: 50% -50%;
66:             background: color-mix(in oklab, var(--color-white) 50%, transparent);
67:             border-radius: 9999px;
68:             border: 2px solid var(--color-white);
69:             backdrop-filter: blur(8px);
70:             pointer-events: none;
71:             z-index: 2;
72:             box-shadow:
73:                 inset 0 0 0 1px color-mix(in oklab, var(--color-gray-900) 5%, transparent),
74:                 0 1px 3px 0 color-mix(in oklab, var(--color-gray-900) 20%, transparent);
75:         }
76:         @supports (-webkit-overflow-scrolling: touch) and (overflow: -webkit-paged-x) {
77:             &:after {
78:                 content: none;
79:             }
80:         }
81:     }
82: 
83:     .diff-item-1,
84:     .diff-item-2 {
85:         > * {
86:             height: 100%;
87:             width: 100cqi;
88:             position: absolute;
89:             top: 0;
90:             left: 0;
91:             pointer-events: none;
92:         }
93:     }
94: </style>
```

## File: src/components/EdgeFunctionExplainer.astro
```
 1: ---
 2: import Markdown from './Markdown.astro';
 3: 
 4: const explainer = `
 5: This page is using a Netlify Edge Function (\`netlify/edge-functions/rewrite.js\`) to rewrite the URL based on visitor geography.
 6: 
 7: ~~~js
 8: export default async (request, context) => {
 9:     const path = context.geo?.country?.code === 'AU' ? '/edge/australia' : '/edge/not-australia';
10:     return Response.redirect(new URL(path, request.url));
11: };
12: 
13: export const config = {
14:     path: '/edge'
15: };
16: ~~~
17: 
18: [See more examples](https://edge-functions-examples.netlify.app)
19: `;
20: ---
21: 
22: <Markdown content={explainer} />
```

## File: src/components/Markdown.astro
```
 1: ---
 2: import { Marked } from 'marked';
 3: import markedShiki from 'marked-shiki';
 4: import { highlighterPromise } from '../utils/highlighter';
 5: 
 6: interface Props {
 7:     content: string;
 8:     class?: string;
 9: }
10: 
11: const { content, class: className } = Astro.props;
12: 
13: const highlighter = await highlighterPromise;
14: const html = await new Marked()
15:     .use(
16:         markedShiki({
17:             highlight(code, lang, props) {
18:                 return highlighter.codeToHtml(code, {
19:                     lang,
20:                     theme: 'min-dark'
21:                 });
22:             }
23:         })
24:     )
25:     .parse(content);
26: ---
27: 
28: <div class:list={['markdown', className]} set:html={html} />
```

## File: src/config/resend.ts
```typescript
  1: /**
  2:  * Resend Email Configuration
  3:  * 
  4:  * Centralized configuration for Resend email service with validation
  5:  * and environment-specific settings.
  6:  */
  7: 
  8: import { Resend } from 'resend';
  9: 
 10: // Configuration interface
 11: export interface ResendConfig {
 12:     apiKey: string;
 13:     domain: string;
 14:     fromEmail: string;
 15:     fromName: string;
 16:     internalEmail: string;
 17:     adminEmail: string;
 18:     usageAlertThreshold: number;
 19:     usageCriticalThreshold: number;
 20: }
 21: 
 22: // Free tier limits
 23: export const RESEND_LIMITS = {
 24:     FREE_TIER_MONTHLY: 3000,    // 3,000 emails per month
 25:     FREE_TIER_DAILY: 100,       // 100 emails per day
 26:     RATE_LIMIT_PER_SECOND: 2,   // 2 emails per second
 27:     MAX_RECIPIENTS_PER_EMAIL: 50 // 50 recipients per email
 28: } as const;
 29: 
 30: // Email types for tracking
 31: export type EmailType = 
 32:     | 'user_confirmation' 
 33:     | 'internal_notification' 
 34:     | 'error_alert' 
 35:     | 'welcome' 
 36:     | 'usage_alert'
 37:     | 'system_notification';
 38: 
 39: /**
 40:  * Validates and loads Resend configuration from environment variables
 41:  */
 42: export function loadResendConfig(): ResendConfig {
 43:     // Validate required environment variables
 44:     const requiredVars = {
 45:         RESEND_API_KEY: import.meta.env.RESEND_API_KEY,
 46:         RESEND_DOMAIN: import.meta.env.RESEND_DOMAIN,
 47:         RESEND_FROM_EMAIL: import.meta.env.RESEND_FROM_EMAIL,
 48:         INTERNAL_NOTIFICATION_EMAIL: import.meta.env.INTERNAL_NOTIFICATION_EMAIL,
 49:         ADMIN_NOTIFICATION_EMAIL: import.meta.env.ADMIN_NOTIFICATION_EMAIL
 50:     };
 51:     
 52:     const missingVars = Object.entries(requiredVars)
 53:         .filter(([_, value]) => !value)
 54:         .map(([key, _]) => key);
 55:     
 56:     if (missingVars.length > 0) {
 57:         throw new Error(
 58:             `Missing required Resend environment variables: ${missingVars.join(', ')}\n` +
 59:             'Please check your .env file and refer to docs/resend-setup-guide.md'
 60:         );
 61:     }
 62:     
 63:     // Validate API key format
 64:     if (!requiredVars.RESEND_API_KEY!.startsWith('re_')) {
 65:         throw new Error('RESEND_API_KEY must start with "re_"');
 66:     }
 67:     
 68:     // Validate email addresses
 69:     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 70:     const emailFields = {
 71:         RESEND_FROM_EMAIL: requiredVars.RESEND_FROM_EMAIL!,
 72:         INTERNAL_NOTIFICATION_EMAIL: requiredVars.INTERNAL_NOTIFICATION_EMAIL!,
 73:         ADMIN_NOTIFICATION_EMAIL: requiredVars.ADMIN_NOTIFICATION_EMAIL!
 74:     };
 75:     
 76:     for (const [field, email] of Object.entries(emailFields)) {
 77:         if (!emailRegex.test(email)) {
 78:             throw new Error(`${field} is not a valid email address: ${email}`);
 79:         }
 80:     }
 81:     
 82:     // Validate domain in from email
 83:     const fromEmailDomain = requiredVars.RESEND_FROM_EMAIL!.split('@')[1];
 84:     if (fromEmailDomain !== requiredVars.RESEND_DOMAIN) {
 85:         throw new Error(
 86:             `RESEND_FROM_EMAIL domain (${fromEmailDomain}) must match RESEND_DOMAIN (${requiredVars.RESEND_DOMAIN})`
 87:         );
 88:     }
 89:     
 90:     return {
 91:         apiKey: requiredVars.RESEND_API_KEY!,
 92:         domain: requiredVars.RESEND_DOMAIN!,
 93:         fromEmail: requiredVars.RESEND_FROM_EMAIL!,
 94:         fromName: import.meta.env.RESEND_FROM_NAME || 'Debt Relief Team',
 95:         internalEmail: requiredVars.INTERNAL_NOTIFICATION_EMAIL!,
 96:         adminEmail: requiredVars.ADMIN_NOTIFICATION_EMAIL!,
 97:         usageAlertThreshold: parseInt(import.meta.env.EMAIL_USAGE_ALERT_THRESHOLD || '75'),
 98:         usageCriticalThreshold: parseInt(import.meta.env.EMAIL_USAGE_CRITICAL_THRESHOLD || '90')
 99:     };
100: }
101: 
102: /**
103:  * Creates and configures a Resend client instance
104:  */
105: export function createResendClient(): Resend {
106:     const config = loadResendConfig();
107:     return new Resend(config.apiKey);
108: }
109: 
110: /**
111:  * Gets the configured "from" address with display name
112:  */
113: export function getFromAddress(): string {
114:     const config = loadResendConfig();
115:     return `${config.fromName} <${config.fromEmail}>`;
116: }
117: 
118: /**
119:  * Validates the current configuration and tests API connectivity
120:  */
121: export async function validateConfiguration(): Promise<{
122:     isValid: boolean;
123:     errors: string[];
124:     warnings: string[];
125:     domains?: any[];
126: }> {
127:     const errors: string[] = [];
128:     const warnings: string[] = [];
129:     
130:     try {
131:         // Test configuration loading
132:         const config = loadResendConfig();
133:         
134:         // Test API connectivity
135:         const resend = createResendClient();
136:         const domains = await resend.domains.list();
137:         
138:         // Check if configured domain is verified
139:         const configuredDomain = config.domain;
140:         const verifiedDomains = domains.data || [];
141:         const domainVerified = verifiedDomains.some(
142:             (domain: any) => domain.name === configuredDomain && domain.status === 'verified'
143:         );
144:         
145:         if (!domainVerified) {
146:             warnings.push(
147:                 `Domain "${configuredDomain}" is not verified in Resend. ` +
148:                 'This may cause deliverability issues. Please complete domain verification.'
149:             );
150:         }
151:         
152:         // Check usage thresholds
153:         if (config.usageAlertThreshold >= config.usageCriticalThreshold) {
154:             warnings.push(
155:                 'EMAIL_USAGE_ALERT_THRESHOLD should be less than EMAIL_USAGE_CRITICAL_THRESHOLD'
156:             );
157:         }
158:         
159:         return {
160:             isValid: errors.length === 0,
161:             errors,
162:             warnings,
163:             domains: verifiedDomains
164:         };
165:         
166:     } catch (error: any) {
167:         errors.push(`Configuration validation failed: ${error.message}`);
168:         
169:         return {
170:             isValid: false,
171:             errors,
172:             warnings
173:         };
174:     }
175: }
176: 
177: /**
178:  * Environment-specific configuration defaults
179:  */
180: export const ENV_DEFAULTS = {
181:     development: {
182:         fromName: 'Debt Relief Team (Dev)',
183:         usageAlertThreshold: 50,  // Lower threshold for development
184:         usageCriticalThreshold: 75
185:     },
186:     production: {
187:         fromName: 'Debt Relief Team',
188:         usageAlertThreshold: 75,
189:         usageCriticalThreshold: 90
190:     }
191: } as const;
192: 
193: /**
194:  * Gets the current environment (development or production)
195:  */
196: export function getCurrentEnvironment(): 'development' | 'production' {
197:     return import.meta.env.PROD ? 'production' : 'development';
198: }
199: 
200: /**
201:  * Gets environment-specific configuration with fallbacks
202:  */
203: export function getEnvironmentConfig(): ResendConfig {
204:     const baseConfig = loadResendConfig();
205:     const env = getCurrentEnvironment();
206:     const envDefaults = ENV_DEFAULTS[env];
207:     
208:     return {
209:         ...baseConfig,
210:         fromName: baseConfig.fromName || envDefaults.fromName,
211:         usageAlertThreshold: baseConfig.usageAlertThreshold || envDefaults.usageAlertThreshold,
212:         usageCriticalThreshold: baseConfig.usageCriticalThreshold || envDefaults.usageCriticalThreshold
213:     };
214: }
215: 
216: // Export singleton instances for convenience
217: let _configCache: ResendConfig | null = null;
218: let _clientCache: Resend | null = null;
219: 
220: /**
221:  * Gets cached configuration (loads once per process)
222:  */
223: export function getConfig(): ResendConfig {
224:     if (!_configCache) {
225:         _configCache = getEnvironmentConfig();
226:     }
227:     return _configCache;
228: }
229: 
230: /**
231:  * Gets cached Resend client (creates once per process)
232:  */
233: export function getClient(): Resend {
234:     if (!_clientCache) {
235:         _clientCache = createResendClient();
236:     }
237:     return _clientCache;
238: }
239: 
240: /**
241:  * Clears configuration cache (useful for testing)
242:  */
243: export function clearCache(): void {
244:     _configCache = null;
245:     _clientCache = null;
246: }
```

## File: src/emails/components/BaseEmailLayout.tsx
```typescript
  1: /**
  2:  * Base Email Layout Component
  3:  * 
  4:  * Provides consistent layout, styling, and branding for all email templates
  5:  * in the debt relief system.
  6:  */
  7: 
  8: import React from 'react';
  9: import {
 10:     Html,
 11:     Head,
 12:     Body,
 13:     Container,
 14:     Section,
 15:     Text,
 16:     Hr,
 17:     Link,
 18:     Img,
 19:     Preview
 20: } from '@react-email/components';
 21: 
 22: interface BaseEmailLayoutProps {
 23:     children: React.ReactNode;
 24:     preview: string;
 25:     title?: string;
 26:     headerTitle?: string;
 27:     headerSubtitle?: string;
 28:     footerText?: string;
 29:     headerBgColor?: string;
 30: }
 31: 
 32: export const BaseEmailLayout: React.FC<BaseEmailLayoutProps> = ({
 33:     children,
 34:     preview,
 35:     title = 'Debt Relief Assistance',
 36:     headerTitle = 'Debt Relief Team',
 37:     headerSubtitle,
 38:     footerText,
 39:     headerBgColor = '#2d7984'
 40: }) => {
 41:     return (
 42:         <Html>
 43:             <Head>
 44:                 <title>{title}</title>
 45:                 <meta charSet="utf-8" />
 46:                 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 47:             </Head>
 48:             <Preview>{preview}</Preview>
 49:             <Body style={bodyStyle}>
 50:                 <Container style={containerStyle}>
 51:                     {/* Header Section */}
 52:                     <Section style={{
 53:                         ...headerStyle,
 54:                         backgroundColor: headerBgColor
 55:                     }}>
 56:                         <Text style={headerTitleStyle}>
 57:                             {headerTitle}
 58:                         </Text>
 59:                         {headerSubtitle && (
 60:                             <Text style={headerSubtitleStyle}>
 61:                                 {headerSubtitle}
 62:                             </Text>
 63:                         )}
 64:                     </Section>
 65: 
 66:                     {/* Content Section */}
 67:                     <Section style={contentStyle}>
 68:                         {children}
 69:                     </Section>
 70: 
 71:                     {/* Footer Section */}
 72:                     <Section style={footerStyle}>
 73:                         <Hr style={hrStyle} />
 74:                         <Text style={footerTextStyle}>
 75:                             {footerText || (
 76:                                 <>
 77:                                     You received this email because you submitted a debt relief inquiry on our website.
 78:                                     <br />
 79:                                     If you did not make this request, please ignore this email or{' '}
 80:                                     <Link href="mailto:support@yourdomain.com" style={linkStyle}>
 81:                                         contact us
 82:                                     </Link>.
 83:                                 </>
 84:                             )}
 85:                         </Text>
 86:                         
 87:                         <Text style={companyInfoStyle}>
 88:                             <strong>Debt Relief Team</strong>
 89:                             <br />
 90:                             Helping Americans achieve financial freedom
 91:                             <br />
 92:                             <Link href="https://yourdomain.com" style={linkStyle}>
 93:                                 yourdomain.com
 94:                             </Link>
 95:                             {' • '}
 96:                             <Link href="mailto:support@yourdomain.com" style={linkStyle}>
 97:                                 support@yourdomain.com
 98:                             </Link>
 99:                         </Text>
100: 
101:                         <Text style={unsubscribeStyle}>
102:                             <Link href="https://yourdomain.com/unsubscribe" style={linkStyle}>
103:                                 Unsubscribe
104:                             </Link>
105:                             {' • '}
106:                             <Link href="https://yourdomain.com/privacy" style={linkStyle}>
107:                                 Privacy Policy
108:                             </Link>
109:                             {' • '}
110:                             <Link href="https://yourdomain.com/terms" style={linkStyle}>
111:                                 Terms of Service
112:                             </Link>
113:                         </Text>
114:                     </Section>
115:                 </Container>
116:             </Body>
117:         </Html>
118:     );
119: };
120: 
121: // Styles
122: const bodyStyle = {
123:     fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
124:     backgroundColor: '#f6f9fc',
125:     margin: 0,
126:     padding: 0,
127:     lineHeight: '1.6',
128:     color: '#333333'
129: };
130: 
131: const containerStyle = {
132:     maxWidth: '600px',
133:     margin: '0 auto',
134:     backgroundColor: '#ffffff',
135:     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
136: };
137: 
138: const headerStyle = {
139:     padding: '30px 30px 20px 30px',
140:     textAlign: 'center' as const,
141:     color: '#ffffff'
142: };
143: 
144: const headerTitleStyle = {
145:     fontSize: '28px',
146:     fontWeight: 'bold',
147:     margin: '0 0 10px 0',
148:     color: '#ffffff'
149: };
150: 
151: const headerSubtitleStyle = {
152:     fontSize: '16px',
153:     margin: 0,
154:     opacity: 0.9,
155:     color: '#ffffff'
156: };
157: 
158: const contentStyle = {
159:     padding: '30px'
160: };
161: 
162: const footerStyle = {
163:     padding: '20px 30px',
164:     backgroundColor: '#f8f9fa'
165: };
166: 
167: const hrStyle = {
168:     border: 'none',
169:     borderTop: '1px solid #e6e6e6',
170:     margin: '20px 0'
171: };
172: 
173: const footerTextStyle = {
174:     fontSize: '12px',
175:     color: '#666666',
176:     margin: '0 0 15px 0',
177:     textAlign: 'center' as const
178: };
179: 
180: const companyInfoStyle = {
181:     fontSize: '12px',
182:     color: '#666666',
183:     margin: '0 0 15px 0',
184:     textAlign: 'center' as const,
185:     lineHeight: '1.5'
186: };
187: 
188: const unsubscribeStyle = {
189:     fontSize: '11px',
190:     color: '#999999',
191:     margin: 0,
192:     textAlign: 'center' as const
193: };
194: 
195: const linkStyle = {
196:     color: '#2d7984',
197:     textDecoration: 'none'
198: };
199: 
200: export default BaseEmailLayout;
```

## File: src/emails/templates/ErrorNotificationEmail.tsx
```typescript
  1: /**
  2:  * Error Notification Email Template
  3:  * 
  4:  * Sent to system administrators when errors occur in the debt relief system
  5:  * to provide detailed error information and troubleshooting guidance.
  6:  */
  7: 
  8: import React from 'react';
  9: import {
 10:     Section,
 11:     Text,
 12:     Button,
 13:     Hr,
 14:     Row,
 15:     Column
 16: } from '@react-email/components';
 17: import { BaseEmailLayout } from '../components/BaseEmailLayout';
 18: import { ErrorNotificationEmailData } from '../types';
 19: 
 20: interface ErrorNotificationEmailProps {
 21:     data: ErrorNotificationEmailData;
 22: }
 23: 
 24: export const ErrorNotificationEmail: React.FC<ErrorNotificationEmailProps> = ({ data }) => {
 25:     const { error, context, system, actions } = data;
 26:     
 27:     // Format timestamp
 28:     const errorTime = new Date(data.timestamp).toLocaleDateString('en-US', {
 29:         weekday: 'short',
 30:         year: 'numeric',
 31:         month: 'short',
 32:         day: 'numeric',
 33:         hour: 'numeric',
 34:         minute: '2-digit',
 35:         second: '2-digit',
 36:         timeZoneName: 'short'
 37:     });
 38: 
 39:     // Severity styling and icon
 40:     const getSeverityStyle = (severity: string) => {
 41:         switch (severity) {
 42:             case 'critical':
 43:                 return { backgroundColor: '#dc3545', color: '#ffffff', icon: '🚨', action: 'IMMEDIATE ACTION REQUIRED' };
 44:             case 'high':
 45:                 return { backgroundColor: '#fd7e14', color: '#ffffff', icon: '⚠️', action: 'HIGH PRIORITY' };
 46:             case 'medium':
 47:                 return { backgroundColor: '#ffc107', color: '#212529', icon: '⚡', action: 'MODERATE PRIORITY' };
 48:             case 'low':
 49:             default:
 50:                 return { backgroundColor: '#6c757d', color: '#ffffff', icon: '📝', action: 'LOW PRIORITY' };
 51:         }
 52:     };
 53: 
 54:     const severityData = getSeverityStyle(error.severity);
 55: 
 56:     // Error type icons
 57:     const getErrorTypeIcon = (type: string) => {
 58:         switch (type) {
 59:             case 'api_error': return '🔌';
 60:             case 'database_error': return '🗄️';
 61:             case 'email_error': return '📧';
 62:             case 'validation_error': return '✅';
 63:             case 'system_error': return '⚙️';
 64:             default: return '❌';
 65:         }
 66:     };
 67: 
 68:     const errorTypeIcon = getErrorTypeIcon(error.type);
 69: 
 70:     return (
 71:         <BaseEmailLayout
 72:             preview={`${error.severity.toUpperCase()} Error in ${system.service}: ${error.message.substring(0, 50)}...`}
 73:             title="System Error Alert"
 74:             headerTitle="🚨 System Error Alert"
 75:             headerSubtitle="Immediate Attention Required"
 76:             headerBgColor="#dc3545"
 77:         >
 78:             {/* Severity Alert */}
 79:             <Section style={{
 80:                 ...severityBannerStyle,
 81:                 backgroundColor: severityData.backgroundColor,
 82:                 color: severityData.color
 83:             }}>
 84:                 <Text style={severityTextStyle}>
 85:                     {severityData.icon} {severityData.action}
 86:                 </Text>
 87:                 <Text style={severitySubtextStyle}>
 88:                     {error.severity.toUpperCase()} SEVERITY ERROR DETECTED
 89:                 </Text>
 90:             </Section>
 91: 
 92:             {/* Error Summary */}
 93:             <Section style={summaryStyle}>
 94:                 <Text style={summaryHeaderStyle}>
 95:                     {errorTypeIcon} Error Summary
 96:                 </Text>
 97:                 
 98:                 <Row style={summaryRowStyle}>
 99:                     <Column style={{ width: '25%' }}>
100:                         <Text style={summaryLabelStyle}>Type</Text>
101:                         <Text style={summaryValueStyle}>{error.type.replace('_', ' ').toUpperCase()}</Text>
102:                     </Column>
103:                     <Column style={{ width: '25%' }}>
104:                         <Text style={summaryLabelStyle}>Severity</Text>
105:                         <Text style={summaryValueStyle}>{error.severity.toUpperCase()}</Text>
106:                     </Column>
107:                     <Column style={{ width: '25%' }}>
108:                         <Text style={summaryLabelStyle}>Service</Text>
109:                         <Text style={summaryValueStyle}>{system.service}</Text>
110:                     </Column>
111:                     <Column style={{ width: '25%' }}>
112:                         <Text style={summaryLabelStyle}>Environment</Text>
113:                         <Text style={summaryValueStyle}>{system.environment.toUpperCase()}</Text>
114:                     </Column>
115:                 </Row>
116:                 
117:                 <Text style={errorMessageStyle}>
118:                     <strong>Error Message:</strong><br />
119:                     {error.message}
120:                 </Text>
121:                 
122:                 {error.code && (
123:                     <Text style={errorCodeStyle}>
124:                         <strong>Error Code:</strong> {error.code}
125:                     </Text>
126:                 )}
127:             </Section>
128: 
129:             {/* Quick Actions */}
130:             <Section style={actionsStyle}>
131:                 <Text style={actionsHeaderStyle}>
132:                     🛠️ Quick Actions
133:                 </Text>
134:                 
135:                 <Row>
136:                     <Column style={{ width: '33.33%', paddingRight: '5px' }}>
137:                         <Button href={actions.dashboardUrl} style={dashboardButtonStyle}>
138:                             📊 Dashboard
139:                         </Button>
140:                     </Column>
141:                     <Column style={{ width: '33.33%', padding: '0 2.5px' }}>
142:                         <Button href={actions.logsUrl} style={logsButtonStyle}>
143:                             📋 View Logs
144:                         </Button>
145:                     </Column>
146:                     <Column style={{ width: '33.33%', paddingLeft: '5px' }}>
147:                         <Button href={actions.documentsUrl} style={docsButtonStyle}>
148:                             📖 Documentation
149:                         </Button>
150:                     </Column>
151:                 </Row>
152:             </Section>
153: 
154:             <Hr style={hrStyle} />
155: 
156:             {/* Context Details */}
157:             <Section style={contextStyle}>
158:                 <Text style={sectionHeaderStyle}>
159:                     🔍 Context Details
160:                 </Text>
161:                 
162:                 <Row style={detailRowStyle}>
163:                     <Column style={labelColumnStyle}>
164:                         <Text style={labelStyle}>Timestamp:</Text>
165:                     </Column>
166:                     <Column style={valueColumnStyle}>
167:                         <Text style={valueStyle}>{errorTime}</Text>
168:                     </Column>
169:                 </Row>
170:                 
171:                 {context.endpoint && (
172:                     <Row style={detailRowStyle}>
173:                         <Column style={labelColumnStyle}>
174:                             <Text style={labelStyle}>Endpoint:</Text>
175:                         </Column>
176:                         <Column style={valueColumnStyle}>
177:                             <Text style={codeStyle}>{context.method} {context.endpoint}</Text>
178:                         </Column>
179:                     </Row>
180:                 )}
181:                 
182:                 {context.requestId && (
183:                     <Row style={detailRowStyle}>
184:                         <Column style={labelColumnStyle}>
185:                             <Text style={labelStyle}>Request ID:</Text>
186:                         </Column>
187:                         <Column style={valueColumnStyle}>
188:                             <Text style={codeStyle}>{context.requestId}</Text>
189:                         </Column>
190:                     </Row>
191:                 )}
192:                 
193:                 {context.userId && (
194:                     <Row style={detailRowStyle}>
195:                         <Column style={labelColumnStyle}>
196:                             <Text style={labelStyle}>User ID:</Text>
197:                         </Column>
198:                         <Column style={valueColumnStyle}>
199:                             <Text style={valueStyle}>{context.userId}</Text>
200:                         </Column>
201:                     </Row>
202:                 )}
203:                 
204:                 {context.leadId && (
205:                     <Row style={detailRowStyle}>
206:                         <Column style={labelColumnStyle}>
207:                             <Text style={labelStyle}>Lead ID:</Text>
208:                         </Column>
209:                         <Column style={valueColumnStyle}>
210:                             <Text style={valueStyle}>{context.leadId}</Text>
211:                         </Column>
212:                     </Row>
213:                 )}
214:                 
215:                 {context.ipAddress && (
216:                     <Row style={detailRowStyle}>
217:                         <Column style={labelColumnStyle}>
218:                             <Text style={labelStyle}>IP Address:</Text>
219:                         </Column>
220:                         <Column style={valueColumnStyle}>
221:                             <Text style={valueStyle}>{context.ipAddress}</Text>
222:                         </Column>
223:                     </Row>
224:                 )}
225:             </Section>
226: 
227:             {/* System Information */}
228:             <Section style={systemInfoStyle}>
229:                 <Text style={sectionHeaderStyle}>
230:                     ⚙️ System Information
231:                 </Text>
232:                 
233:                 <Row style={detailRowStyle}>
234:                     <Column style={labelColumnStyle}>
235:                         <Text style={labelStyle}>Service:</Text>
236:                     </Column>
237:                     <Column style={valueColumnStyle}>
238:                         <Text style={valueStyle}>{system.service}</Text>
239:                     </Column>
240:                 </Row>
241:                 
242:                 <Row style={detailRowStyle}>
243:                     <Column style={labelColumnStyle}>
244:                         <Text style={labelStyle}>Version:</Text>
245:                     </Column>
246:                     <Column style={valueColumnStyle}>
247:                         <Text style={valueStyle}>{system.version}</Text>
248:                     </Column>
249:                 </Row>
250:                 
251:                 <Row style={detailRowStyle}>
252:                     <Column style={labelColumnStyle}>
253:                         <Text style={labelStyle}>Environment:</Text>
254:                     </Column>
255:                     <Column style={valueColumnStyle}>
256:                         <Text style={valueStyle}>{system.environment}</Text>
257:                     </Column>
258:                 </Row>
259:                 
260:                 {system.hostname && (
261:                     <Row style={detailRowStyle}>
262:                         <Column style={labelColumnStyle}>
263:                             <Text style={labelStyle}>Hostname:</Text>
264:                         </Column>
265:                         <Column style={valueColumnStyle}>
266:                             <Text style={codeStyle}>{system.hostname}</Text>
267:                         </Column>
268:                     </Row>
269:                 )}
270:             </Section>
271: 
272:             {/* Stack Trace (if available) */}
273:             {error.stack && (
274:                 <Section style={stackStyle}>
275:                     <Text style={sectionHeaderStyle}>
276:                         🔧 Stack Trace
277:                     </Text>
278:                     
279:                     <Text style={stackTextStyle}>
280:                         {error.stack}
281:                     </Text>
282:                 </Section>
283:             )}
284: 
285:             {/* User Agent (if available) */}
286:             {context.userAgent && (
287:                 <Section style={userAgentStyle}>
288:                     <Text style={sectionHeaderStyle}>
289:                         🌐 User Agent
290:                     </Text>
291:                     
292:                     <Text style={userAgentTextStyle}>
293:                         {context.userAgent}
294:                     </Text>
295:                 </Section>
296:             )}
297: 
298:             {/* Troubleshooting Guidelines */}
299:             <Section style={troubleshootingStyle}>
300:                 <Text style={sectionHeaderStyle}>
301:                     🔍 Troubleshooting Guidelines
302:                 </Text>
303:                 
304:                 {error.type === 'api_error' && (
305:                     <ul style={guidelineListStyle}>
306:                         <li style={guidelineItemStyle}>Check API endpoint availability and response times</li>
307:                         <li style={guidelineItemStyle}>Verify API key configurations and permissions</li>
308:                         <li style={guidelineItemStyle}>Review rate limiting and quota usage</li>
309:                         <li style={guidelineItemStyle}>Check network connectivity and firewall rules</li>
310:                     </ul>
311:                 )}
312:                 
313:                 {error.type === 'database_error' && (
314:                     <ul style={guidelineListStyle}>
315:                         <li style={guidelineItemStyle}>Check database connection and credentials</li>
316:                         <li style={guidelineItemStyle}>Verify table schema and column definitions</li>
317:                         <li style={guidelineItemStyle}>Review query performance and indexing</li>
318:                         <li style={guidelineItemStyle}>Check database server resources and capacity</li>
319:                     </ul>
320:                 )}
321:                 
322:                 {error.type === 'email_error' && (
323:                     <ul style={guidelineListStyle}>
324:                         <li style={guidelineItemStyle}>Verify Resend API key and domain configuration</li>
325:                         <li style={guidelineItemStyle}>Check email template rendering and validation</li>
326:                         <li style={guidelineItemStyle}>Review sending quotas and rate limits</li>
327:                         <li style={guidelineItemStyle}>Validate recipient email addresses</li>
328:                     </ul>
329:                 )}
330:                 
331:                 {error.type === 'validation_error' && (
332:                     <ul style={guidelineListStyle}>
333:                         <li style={guidelineItemStyle}>Review input validation rules and schemas</li>
334:                         <li style={guidelineItemStyle}>Check form field requirements and formats</li>
335:                         <li style={guidelineItemStyle}>Verify data sanitization and transformation</li>
336:                         <li style={guidelineItemStyle}>Update validation error messages for clarity</li>
337:                     </ul>
338:                 )}
339:                 
340:                 <Text style={emergencyContactStyle}>
341:                     <strong>Emergency Contact:</strong> For critical issues requiring immediate attention, 
342:                     contact the on-call engineer at +1-800-EMERGENCY or emergency@yourdomain.com
343:                 </Text>
344:             </Section>
345: 
346:             {/* Next Steps */}
347:             <Section style={nextStepsStyle}>
348:                 <Text style={sectionHeaderStyle}>
349:                     📋 Immediate Next Steps
350:                 </Text>
351:                 
352:                 <ol style={stepsListStyle}>
353:                     <li style={stepItemStyle}>
354:                         <strong>Acknowledge:</strong> Confirm receipt of this error notification
355:                     </li>
356:                     <li style={stepItemStyle}>
357:                         <strong>Investigate:</strong> Use the provided links to access logs and dashboard
358:                     </li>
359:                     <li style={stepItemStyle}>
360:                         <strong>Assess Impact:</strong> Determine if users are affected and scope of the issue
361:                     </li>
362:                     <li style={stepItemStyle}>
363:                         <strong>Implement Fix:</strong> Apply appropriate resolution based on error type
364:                     </li>
365:                     <li style={stepItemStyle}>
366:                         <strong>Monitor:</strong> Verify fix effectiveness and watch for recurring issues
367:                     </li>
368:                     <li style={stepItemStyle}>
369:                         <strong>Document:</strong> Update incident log and post-mortem documentation
370:                     </li>
371:                 </ol>
372:             </Section>
373: 
374:             <Text style={footerStyle}>
375:                 This error notification was generated automatically by the monitoring system.
376:                 <br />
377:                 Response time SLA: {error.severity === 'critical' ? '15 minutes' : error.severity === 'high' ? '1 hour' : '4 hours'}
378:                 <br />
379:                 For monitoring system issues, contact devops@yourdomain.com
380:             </Text>
381:         </BaseEmailLayout>
382:     );
383: };
384: 
385: // Styles
386: const severityBannerStyle = {
387:     padding: '20px',
388:     textAlign: 'center' as const,
389:     borderRadius: '8px',
390:     margin: '0 0 20px 0'
391: };
392: 
393: const severityTextStyle = {
394:     fontSize: '20px',
395:     fontWeight: 'bold',
396:     margin: '0 0 5px 0'
397: };
398: 
399: const severitySubtextStyle = {
400:     fontSize: '14px',
401:     margin: '0',
402:     opacity: 0.9
403: };
404: 
405: const summaryStyle = {
406:     backgroundColor: '#f8f9fa',
407:     border: '2px solid #dc3545',
408:     borderRadius: '8px',
409:     padding: '20px',
410:     margin: '20px 0'
411: };
412: 
413: const summaryHeaderStyle = {
414:     fontSize: '18px',
415:     fontWeight: 'bold',
416:     color: '#dc3545',
417:     margin: '0 0 15px 0'
418: };
419: 
420: const summaryRowStyle = {
421:     marginBottom: '20px'
422: };
423: 
424: const summaryLabelStyle = {
425:     fontSize: '12px',
426:     color: '#666666',
427:     fontWeight: 'bold',
428:     margin: '0 0 5px 0',
429:     textAlign: 'center' as const
430: };
431: 
432: const summaryValueStyle = {
433:     fontSize: '14px',
434:     color: '#333333',
435:     fontWeight: 'bold',
436:     margin: '0',
437:     textAlign: 'center' as const
438: };
439: 
440: const errorMessageStyle = {
441:     fontSize: '14px',
442:     color: '#721c24',
443:     backgroundColor: '#f8d7da',
444:     padding: '15px',
445:     borderRadius: '6px',
446:     margin: '15px 0',
447:     lineHeight: '1.6',
448:     wordBreak: 'break-word' as const
449: };
450: 
451: const errorCodeStyle = {
452:     fontSize: '14px',
453:     color: '#333333',
454:     fontFamily: 'Monaco, Consolas, "Courier New", monospace',
455:     backgroundColor: '#f1f3f4',
456:     padding: '8px',
457:     borderRadius: '4px',
458:     margin: '10px 0 0 0'
459: };
460: 
461: const actionsStyle = {
462:     backgroundColor: '#e8f4f8',
463:     border: '1px solid #b8d4da',
464:     borderRadius: '8px',
465:     padding: '20px',
466:     margin: '20px 0',
467:     textAlign: 'center' as const
468: };
469: 
470: const actionsHeaderStyle = {
471:     fontSize: '16px',
472:     fontWeight: 'bold',
473:     color: '#2d7984',
474:     margin: '0 0 15px 0'
475: };
476: 
477: const dashboardButtonStyle = {
478:     backgroundColor: '#007bff',
479:     color: '#ffffff',
480:     padding: '12px 8px',
481:     borderRadius: '6px',
482:     textDecoration: 'none',
483:     fontWeight: 'bold',
484:     fontSize: '12px',
485:     display: 'inline-block',
486:     width: '100%',
487:     textAlign: 'center' as const
488: };
489: 
490: const logsButtonStyle = {
491:     backgroundColor: '#28a745',
492:     color: '#ffffff',
493:     padding: '12px 8px',
494:     borderRadius: '6px',
495:     textDecoration: 'none',
496:     fontWeight: 'bold',
497:     fontSize: '12px',
498:     display: 'inline-block',
499:     width: '100%',
500:     textAlign: 'center' as const
501: };
502: 
503: const docsButtonStyle = {
504:     backgroundColor: '#6c757d',
505:     color: '#ffffff',
506:     padding: '12px 8px',
507:     borderRadius: '6px',
508:     textDecoration: 'none',
509:     fontWeight: 'bold',
510:     fontSize: '12px',
511:     display: 'inline-block',
512:     width: '100%',
513:     textAlign: 'center' as const
514: };
515: 
516: const hrStyle = {
517:     border: 'none',
518:     borderTop: '2px solid #e9ecef',
519:     margin: '30px 0'
520: };
521: 
522: const contextStyle = {
523:     backgroundColor: '#ffffff',
524:     border: '1px solid #dee2e6',
525:     borderRadius: '8px',
526:     padding: '20px',
527:     margin: '20px 0'
528: };
529: 
530: const systemInfoStyle = {
531:     backgroundColor: '#f8f9fa',
532:     border: '1px solid #dee2e6',
533:     borderRadius: '8px',
534:     padding: '20px',
535:     margin: '20px 0'
536: };
537: 
538: const sectionHeaderStyle = {
539:     fontSize: '16px',
540:     fontWeight: 'bold',
541:     color: '#2d7984',
542:     margin: '0 0 15px 0'
543: };
544: 
545: const detailRowStyle = {
546:     marginBottom: '12px'
547: };
548: 
549: const labelColumnStyle = {
550:     width: '30%',
551:     paddingRight: '10px'
552: };
553: 
554: const valueColumnStyle = {
555:     width: '70%'
556: };
557: 
558: const labelStyle = {
559:     fontSize: '13px',
560:     fontWeight: 'bold',
561:     color: '#666666',
562:     margin: '0'
563: };
564: 
565: const valueStyle = {
566:     fontSize: '14px',
567:     color: '#333333',
568:     margin: '0'
569: };
570: 
571: const codeStyle = {
572:     fontSize: '13px',
573:     color: '#333333',
574:     fontFamily: 'Monaco, Consolas, "Courier New", monospace',
575:     backgroundColor: '#f1f3f4',
576:     padding: '4px 6px',
577:     borderRadius: '3px',
578:     margin: '0'
579: };
580: 
581: const stackStyle = {
582:     backgroundColor: '#f1f3f4',
583:     border: '1px solid #d1d5db',
584:     borderRadius: '8px',
585:     padding: '20px',
586:     margin: '20px 0'
587: };
588: 
589: const stackTextStyle = {
590:     fontSize: '11px',
591:     color: '#333333',
592:     fontFamily: 'Monaco, Consolas, "Courier New", monospace',
593:     lineHeight: '1.4',
594:     margin: '0',
595:     whiteSpace: 'pre-wrap' as const,
596:     wordBreak: 'break-all' as const
597: };
598: 
599: const userAgentStyle = {
600:     backgroundColor: '#f8f9fa',
601:     border: '1px solid #dee2e6',
602:     borderRadius: '8px',
603:     padding: '20px',
604:     margin: '20px 0'
605: };
606: 
607: const userAgentTextStyle = {
608:     fontSize: '12px',
609:     color: '#666666',
610:     margin: '0',
611:     wordBreak: 'break-all' as const
612: };
613: 
614: const troubleshootingStyle = {
615:     backgroundColor: '#fff3cd',
616:     border: '1px solid #ffeaa7',
617:     borderRadius: '8px',
618:     padding: '20px',
619:     margin: '20px 0'
620: };
621: 
622: const guidelineListStyle = {
623:     paddingLeft: '20px',
624:     margin: '15px 0'
625: };
626: 
627: const guidelineItemStyle = {
628:     fontSize: '14px',
629:     lineHeight: '1.6',
630:     color: '#333333',
631:     marginBottom: '8px'
632: };
633: 
634: const emergencyContactStyle = {
635:     fontSize: '14px',
636:     color: '#721c24',
637:     backgroundColor: '#f8d7da',
638:     padding: '12px',
639:     borderRadius: '6px',
640:     margin: '20px 0 0 0'
641: };
642: 
643: const nextStepsStyle = {
644:     backgroundColor: '#d4edda',
645:     border: '1px solid #c3e6cb',
646:     borderRadius: '8px',
647:     padding: '20px',
648:     margin: '20px 0'
649: };
650: 
651: const stepsListStyle = {
652:     paddingLeft: '20px',
653:     margin: '15px 0 0 0'
654: };
655: 
656: const stepItemStyle = {
657:     fontSize: '14px',
658:     lineHeight: '1.6',
659:     color: '#155724',
660:     marginBottom: '10px'
661: };
662: 
663: const footerStyle = {
664:     fontSize: '12px',
665:     color: '#666666',
666:     textAlign: 'center' as const,
667:     margin: '30px 0 0 0',
668:     fontStyle: 'italic'
669: };
670: 
671: export default ErrorNotificationEmail;
```

## File: src/emails/templates/index.ts
```typescript
  1: /**
  2:  * Email Templates Index
  3:  * 
  4:  * Centralized exports for all email templates used in the debt relief system.
  5:  * This makes it easy to import templates throughout the application.
  6:  */
  7: 
  8: // Template Components
  9: export { default as LeadConfirmationEmail } from './LeadConfirmationEmail';
 10: export { default as InternalLeadNotificationEmail } from './InternalLeadNotificationEmail';
 11: export { default as ErrorNotificationEmail } from './ErrorNotificationEmail';
 12: export { default as WelcomeEmail } from './WelcomeEmail';
 13: 
 14: // Base Layout Component
 15: export { default as BaseEmailLayout } from '../components/BaseEmailLayout';
 16: 
 17: // Type Definitions
 18: export * from '../types';
 19: 
 20: // Template Registry for Dynamic Rendering
 21: export const EMAIL_TEMPLATES = {
 22:     lead_confirmation: LeadConfirmationEmail,
 23:     internal_notification: InternalLeadNotificationEmail,
 24:     error_notification: ErrorNotificationEmail,
 25:     welcome: WelcomeEmail
 26: } as const;
 27: 
 28: // Template Type Union
 29: export type EmailTemplateType = keyof typeof EMAIL_TEMPLATES;
 30: 
 31: // Template Metadata for Configuration
 32: export interface EmailTemplateMetadata {
 33:     name: string;
 34:     description: string;
 35:     category: 'user' | 'internal' | 'system';
 36:     priority: 'low' | 'medium' | 'high' | 'critical';
 37:     trackingEnabled: boolean;
 38:     previewText?: string;
 39: }
 40: 
 41: export const EMAIL_TEMPLATE_METADATA: Record<EmailTemplateType, EmailTemplateMetadata> = {
 42:     lead_confirmation: {
 43:         name: 'Lead Confirmation',
 44:         description: 'Sent to users who submit debt relief forms',
 45:         category: 'user',
 46:         priority: 'high',
 47:         trackingEnabled: true,
 48:         previewText: 'Thank you for your debt relief inquiry. Your submission has been received.'
 49:     },
 50:     internal_notification: {
 51:         name: 'Internal Lead Notification',
 52:         description: 'Sent to the debt relief team for new leads',
 53:         category: 'internal',
 54:         priority: 'high',
 55:         trackingEnabled: false
 56:     },
 57:     error_notification: {
 58:         name: 'Error Notification',
 59:         description: 'Sent to administrators when system errors occur',
 60:         category: 'system',
 61:         priority: 'critical',
 62:         trackingEnabled: false
 63:     },
 64:     welcome: {
 65:         name: 'Welcome Email',
 66:         description: 'Sent to new users after account registration',
 67:         category: 'user',
 68:         priority: 'medium',
 69:         trackingEnabled: true,
 70:         previewText: 'Welcome to Debt Relief! Your journey to financial freedom starts here.'
 71:     }
 72: };
 73: 
 74: // Helper function to get template component by type
 75: export function getEmailTemplate(templateType: EmailTemplateType) {
 76:     const template = EMAIL_TEMPLATES[templateType];
 77:     if (!template) {
 78:         throw new Error(`Email template "${templateType}" not found`);
 79:     }
 80:     return template;
 81: }
 82: 
 83: // Helper function to get template metadata
 84: export function getEmailTemplateMetadata(templateType: EmailTemplateType): EmailTemplateMetadata {
 85:     const metadata = EMAIL_TEMPLATE_METADATA[templateType];
 86:     if (!metadata) {
 87:         throw new Error(`Email template metadata for "${templateType}" not found`);
 88:     }
 89:     return metadata;
 90: }
 91: 
 92: // Template validation function
 93: export function validateTemplateData(templateType: EmailTemplateType, data: any): boolean {
 94:     // Basic validation - this could be expanded with more sophisticated validation
 95:     if (!data || typeof data !== 'object') {
 96:         return false;
 97:     }
 98: 
 99:     // Check for required base fields
100:     if (!data.timestamp || !data.environment) {
101:         return false;
102:     }
103: 
104:     // Type-specific validation
105:     switch (templateType) {
106:         case 'lead_confirmation':
107:             return !!(data.user && data.lead && data.nextSteps);
108:         
109:         case 'internal_notification':
110:             return !!(data.lead && data.priority && data.source && data.metadata && data.actions);
111:         
112:         case 'error_notification':
113:             return !!(data.error && data.context && data.system && data.actions);
114:         
115:         case 'welcome':
116:             return !!(data.user && data.account && data.onboarding && data.resources);
117:         
118:         default:
119:             return false;
120:     }
121: }
122: 
123: // Template usage tracking interface (for analytics)
124: export interface EmailTemplateUsage {
125:     templateType: EmailTemplateType;
126:     sentAt: string;
127:     recipientEmail: string;
128:     success: boolean;
129:     errorMessage?: string;
130:     metadata?: Record<string, any>;
131: }
132: 
133: // Default sender information (can be overridden per template)
134: export const DEFAULT_SENDER = {
135:     name: 'Debt Relief Team',
136:     email: 'noreply@yourdomain.com'
137: };
138: 
139: // Subject line templates
140: export const EMAIL_SUBJECTS: Record<EmailTemplateType, string> = {
141:     lead_confirmation: 'Your Debt Relief Inquiry - Confirmation & Next Steps',
142:     internal_notification: 'New Lead Alert: {{priority}} Priority - {{debtAmount}}',
143:     error_notification: '🚨 System Error Alert: {{severity}} - {{service}}',
144:     welcome: 'Welcome to Debt Relief - Let\'s Get Started! 🎉'
145: };
146: 
147: // Helper function to generate subject line with variable substitution
148: export function generateEmailSubject(
149:     templateType: EmailTemplateType, 
150:     variables: Record<string, string> = {}
151: ): string {
152:     let subject = EMAIL_SUBJECTS[templateType];
153:     
154:     // Simple variable substitution
155:     Object.entries(variables).forEach(([key, value]) => {
156:         subject = subject.replace(new RegExp(`{{${key}}}`, 'g'), value);
157:     });
158:     
159:     return subject;
160: }
161: 
162: // Export all template-related utilities
163: export {
164:     // Re-export types for convenience
165:     type LeadConfirmationEmailData,
166:     type InternalLeadNotificationEmailData,
167:     type ErrorNotificationEmailData,
168:     type WelcomeEmailData,
169:     type BaseEmailData,
170:     type LeadData,
171:     type UserData,
172:     type EmailTrackingData
173: } from '../types';
```

## File: src/emails/templates/InternalLeadNotificationEmail.tsx
```typescript
  1: /**
  2:  * Internal Lead Notification Email Template
  3:  * 
  4:  * Sent to the debt relief team when a new lead is submitted
  5:  * to provide comprehensive lead information and quick actions.
  6:  */
  7: 
  8: import React from 'react';
  9: import {
 10:     Section,
 11:     Text,
 12:     Button,
 13:     Hr,
 14:     Row,
 15:     Column
 16: } from '@react-email/components';
 17: import { BaseEmailLayout } from '../components/BaseEmailLayout';
 18: import { 
 19:     InternalLeadNotificationEmailData, 
 20:     debtAmountDisplayMap, 
 21:     debtTypeDisplayMap,
 22:     formatPhoneForDisplay,
 23:     DebtAmountRange,
 24:     DebtType
 25: } from '../types';
 26: 
 27: interface InternalLeadNotificationEmailProps {
 28:     data: InternalLeadNotificationEmailData;
 29: }
 30: 
 31: export const InternalLeadNotificationEmail: React.FC<InternalLeadNotificationEmailProps> = ({ data }) => {
 32:     const { lead, priority, source, metadata, actions } = data;
 33:     
 34:     const formattedPhone = formatPhoneForDisplay(lead.phone);
 35:     const debtAmountDisplay = debtAmountDisplayMap[lead.debtAmount as DebtAmountRange] || lead.debtAmount;
 36:     const debtTypeDisplay = debtTypeDisplayMap[lead.debtType as DebtType] || lead.debtType;
 37:     
 38:     // Format submission time
 39:     const submissionDate = new Date(lead.submittedAt).toLocaleDateString('en-US', {
 40:         weekday: 'short',
 41:         year: 'numeric',
 42:         month: 'short',
 43:         day: 'numeric',
 44:         hour: 'numeric',
 45:         minute: '2-digit',
 46:         timeZoneName: 'short'
 47:     });
 48: 
 49:     // Priority styling and icon
 50:     const getPriorityStyle = (priority: string) => {
 51:         switch (priority) {
 52:             case 'urgent':
 53:                 return { backgroundColor: '#dc3545', color: '#ffffff', icon: '🚨' };
 54:             case 'high':
 55:                 return { backgroundColor: '#fd7e14', color: '#ffffff', icon: '⚡' };
 56:             case 'medium':
 57:                 return { backgroundColor: '#ffc107', color: '#212529', icon: '⚠️' };
 58:             case 'low':
 59:             default:
 60:                 return { backgroundColor: '#28a745', color: '#ffffff', icon: '📝' };
 61:         }
 62:     };
 63: 
 64:     const priorityData = getPriorityStyle(priority);
 65: 
 66:     return (
 67:         <BaseEmailLayout
 68:             preview={`New ${priority} priority lead: ${debtAmountDisplay} in ${debtTypeDisplay} debt`}
 69:             title="New Lead Alert"
 70:             headerTitle="🔔 New Lead Alert"
 71:             headerSubtitle="Debt Relief Inquiry Received"
 72:             headerBgColor="#0062b3"
 73:         >
 74:             {/* Priority Alert */}
 75:             <Section style={{
 76:                 ...priorityBannerStyle,
 77:                 backgroundColor: priorityData.backgroundColor,
 78:                 color: priorityData.color
 79:             }}>
 80:                 <Text style={priorityTextStyle}>
 81:                     {priorityData.icon} {priority.toUpperCase()} PRIORITY LEAD
 82:                 </Text>
 83:             </Section>
 84: 
 85:             {/* Quick Stats */}
 86:             <Section style={statsStyle}>
 87:                 <Row>
 88:                     <Column style={{ width: '25%', textAlign: 'center' }}>
 89:                         <Text style={statLabelStyle}>Debt Amount</Text>
 90:                         <Text style={statValueStyle}>{debtAmountDisplay}</Text>
 91:                     </Column>
 92:                     <Column style={{ width: '25%', textAlign: 'center' }}>
 93:                         <Text style={statLabelStyle}>Debt Type</Text>
 94:                         <Text style={statValueStyle}>{debtTypeDisplay}</Text>
 95:                     </Column>
 96:                     <Column style={{ width: '25%', textAlign: 'center' }}>
 97:                         <Text style={statLabelStyle}>Marketing Consent</Text>
 98:                         <Text style={statValueStyle}>
 99:                             {lead.consentMarketing ? '✅ Yes' : '❌ No'}
100:                         </Text>
101:                     </Column>
102:                     <Column style={{ width: '25%', textAlign: 'center' }}>
103:                         <Text style={statLabelStyle}>Source</Text>
104:                         <Text style={statValueStyle}>{lead.source}</Text>
105:                     </Column>
106:                 </Row>
107:             </Section>
108: 
109:             {/* Quick Actions */}
110:             <Section style={actionsStyle}>
111:                 <Text style={actionsHeaderStyle}>
112:                     🎯 Quick Actions
113:                 </Text>
114:                 
115:                 <Row>
116:                     <Column style={{ width: '33.33%', paddingRight: '5px' }}>
117:                         <Button href={actions.callLeadUrl} style={callButtonStyle}>
118:                             📞 Call Lead
119:                         </Button>
120:                     </Column>
121:                     <Column style={{ width: '33.33%', padding: '0 2.5px' }}>
122:                         <Button href={actions.emailLeadUrl} style={emailButtonStyle}>
123:                             ✉️ Email Lead
124:                         </Button>
125:                     </Column>
126:                     <Column style={{ width: '33.33%', paddingLeft: '5px' }}>
127:                         <Button href={actions.viewLeadUrl} style={viewButtonStyle}>
128:                             👁️ View Details
129:                         </Button>
130:                     </Column>
131:                 </Row>
132:             </Section>
133: 
134:             <Hr style={hrStyle} />
135: 
136:             {/* Lead Details */}
137:             <Section style={detailsStyle}>
138:                 <Text style={sectionHeaderStyle}>
139:                     📋 Lead Information
140:                 </Text>
141:                 
142:                 <Row style={detailRowStyle}>
143:                     <Column style={labelColumnStyle}>
144:                         <Text style={labelStyle}>Lead ID:</Text>
145:                     </Column>
146:                     <Column style={valueColumnStyle}>
147:                         <Text style={valueStyle}>{lead.id}</Text>
148:                     </Column>
149:                 </Row>
150:                 
151:                 <Row style={detailRowStyle}>
152:                     <Column style={labelColumnStyle}>
153:                         <Text style={labelStyle}>Phone Number:</Text>
154:                     </Column>
155:                     <Column style={valueColumnStyle}>
156:                         <Text style={{...valueStyle, fontWeight: 'bold', color: '#2d7984'}}>
157:                             {formattedPhone}
158:                         </Text>
159:                     </Column>
160:                 </Row>
161:                 
162:                 <Row style={detailRowStyle}>
163:                     <Column style={labelColumnStyle}>
164:                         <Text style={labelStyle}>Submitted:</Text>
165:                     </Column>
166:                     <Column style={valueColumnStyle}>
167:                         <Text style={valueStyle}>{submissionDate}</Text>
168:                     </Column>
169:                 </Row>
170:                 
171:                 <Row style={detailRowStyle}>
172:                     <Column style={labelColumnStyle}>
173:                         <Text style={labelStyle}>Debt Amount:</Text>
174:                     </Column>
175:                     <Column style={valueColumnStyle}>
176:                         <Text style={valueStyle}>{debtAmountDisplay}</Text>
177:                     </Column>
178:                 </Row>
179:                 
180:                 <Row style={detailRowStyle}>
181:                     <Column style={labelColumnStyle}>
182:                         <Text style={labelStyle}>Debt Type:</Text>
183:                     </Column>
184:                     <Column style={valueColumnStyle}>
185:                         <Text style={valueStyle}>{debtTypeDisplay}</Text>
186:                     </Column>
187:                 </Row>
188:                 
189:                 <Row style={detailRowStyle}>
190:                     <Column style={labelColumnStyle}>
191:                         <Text style={labelStyle}>Processing Consent:</Text>
192:                     </Column>
193:                     <Column style={valueColumnStyle}>
194:                         <Text style={valueStyle}>
195:                             {lead.consentProcessing ? '✅ Granted' : '❌ Not Granted'}
196:                         </Text>
197:                     </Column>
198:                 </Row>
199:                 
200:                 <Row style={detailRowStyle}>
201:                     <Column style={labelColumnStyle}>
202:                         <Text style={labelStyle}>Marketing Consent:</Text>
203:                     </Column>
204:                     <Column style={valueColumnStyle}>
205:                         <Text style={valueStyle}>
206:                             {lead.consentMarketing ? '✅ Granted' : '❌ Not Granted'}
207:                         </Text>
208:                     </Column>
209:                 </Row>
210:             </Section>
211: 
212:             {/* Source & Technical Details */}
213:             <Section style={technicalStyle}>
214:                 <Text style={sectionHeaderStyle}>
215:                     🔍 Source & Technical Details
216:                 </Text>
217:                 
218:                 <Row style={detailRowStyle}>
219:                     <Column style={labelColumnStyle}>
220:                         <Text style={labelStyle}>Source Page:</Text>
221:                     </Column>
222:                     <Column style={valueColumnStyle}>
223:                         <Text style={valueStyle}>{source.page}</Text>
224:                     </Column>
225:                 </Row>
226:                 
227:                 {source.campaign && (
228:                     <Row style={detailRowStyle}>
229:                         <Column style={labelColumnStyle}>
230:                             <Text style={labelStyle}>Campaign:</Text>
231:                         </Column>
232:                         <Column style={valueColumnStyle}>
233:                             <Text style={valueStyle}>{source.campaign}</Text>
234:                         </Column>
235:                     </Row>
236:                 )}
237:                 
238:                 {source.referrer && (
239:                     <Row style={detailRowStyle}>
240:                         <Column style={labelColumnStyle}>
241:                             <Text style={labelStyle}>Referrer:</Text>
242:                         </Column>
243:                         <Column style={valueColumnStyle}>
244:                             <Text style={valueStyle}>{source.referrer}</Text>
245:                         </Column>
246:                     </Row>
247:                 )}
248:                 
249:                 {metadata.ipAddress && (
250:                     <Row style={detailRowStyle}>
251:                         <Column style={labelColumnStyle}>
252:                             <Text style={labelStyle}>IP Address:</Text>
253:                         </Column>
254:                         <Column style={valueColumnStyle}>
255:                             <Text style={valueStyle}>{metadata.ipAddress}</Text>
256:                         </Column>
257:                     </Row>
258:                 )}
259:                 
260:                 {metadata.location && (
261:                     <Row style={detailRowStyle}>
262:                         <Column style={labelColumnStyle}>
263:                             <Text style={labelStyle}>Location:</Text>
264:                         </Column>
265:                         <Column style={valueColumnStyle}>
266:                             <Text style={valueStyle}>
267:                                 {metadata.location.city && `${metadata.location.city}, `}
268:                                 {metadata.location.state && `${metadata.location.state}, `}
269:                                 {metadata.location.country}
270:                             </Text>
271:                         </Column>
272:                     </Row>
273:                 )}
274:                 
275:                 {metadata.userAgent && (
276:                     <Row style={detailRowStyle}>
277:                         <Column style={{ width: '100%' }}>
278:                             <Text style={labelStyle}>User Agent:</Text>
279:                             <Text style={{...valueStyle, fontSize: '12px', wordBreak: 'break-all'}}>
280:                                 {metadata.userAgent}
281:                             </Text>
282:                         </Column>
283:                     </Row>
284:                 )}
285:             </Section>
286: 
287:             {/* Follow-up Guidelines */}
288:             <Section style={guidelinesStyle}>
289:                 <Text style={sectionHeaderStyle}>
290:                     📞 Follow-up Guidelines
291:                 </Text>
292:                 
293:                 {priority === 'urgent' && (
294:                     <Text style={urgentGuidelineStyle}>
295:                         🚨 <strong>URGENT:</strong> Contact within 1 hour. High-value lead with marketing consent.
296:                     </Text>
297:                 )}
298:                 
299:                 {priority === 'high' && (
300:                     <Text style={highGuidelineStyle}>
301:                         ⚡ <strong>HIGH PRIORITY:</strong> Contact within 4 hours. Strong potential for conversion.
302:                     </Text>
303:                 )}
304:                 
305:                 <ul style={guidelineListStyle}>
306:                     <li style={guidelineItemStyle}>
307:                         Call from your assigned business line ({formattedPhone})
308:                     </li>
309:                     <li style={guidelineItemStyle}>
310:                         Reference their specific debt type: {debtTypeDisplay}
311:                     </li>
312:                     <li style={guidelineItemStyle}>
313:                         Mention their debt amount range: {debtAmountDisplay}
314:                     </li>
315:                     {lead.consentMarketing ? (
316:                         <li style={guidelineItemStyle}>
317:                             ✅ Marketing consent given - can discuss promotional offers
318:                         </li>
319:                     ) : (
320:                         <li style={guidelineItemStyle}>
321:                             ❌ No marketing consent - stick to debt relief information only
322:                         </li>
323:                     )}
324:                     <li style={guidelineItemStyle}>
325:                         Log all contact attempts in the CRM system
326:                     </li>
327:                 </ul>
328:             </Section>
329: 
330:             {/* Compliance Reminder */}
331:             <Section style={complianceStyle}>
332:                 <Text style={complianceHeaderStyle}>
333:                     ⚖️ Compliance Reminder
334:                 </Text>
335:                 <ul style={complianceListStyle}>
336:                     <li style={complianceItemStyle}>
337:                         Follow all TCPA regulations for phone contacts
338:                     </li>
339:                     <li style={complianceItemStyle}>
340:                         Respect consent preferences indicated above
341:                     </li>
342:                     <li style={complianceItemStyle}>
343:                         Document all interactions per company policy
344:                     </li>
345:                     <li style={complianceItemStyle}>
346:                         Provide opt-out options if requested
347:                     </li>
348:                 </ul>
349:             </Section>
350: 
351:             <Text style={footerStyle}>
352:                 This lead notification was generated automatically by the debt relief system.
353:                 <br />
354:                 For technical issues, contact the development team.
355:             </Text>
356:         </BaseEmailLayout>
357:     );
358: };
359: 
360: // Styles
361: const priorityBannerStyle = {
362:     padding: '15px',
363:     textAlign: 'center' as const,
364:     borderRadius: '8px',
365:     margin: '0 0 20px 0'
366: };
367: 
368: const priorityTextStyle = {
369:     fontSize: '18px',
370:     fontWeight: 'bold',
371:     margin: '0'
372: };
373: 
374: const statsStyle = {
375:     backgroundColor: '#f8f9fa',
376:     border: '1px solid #dee2e6',
377:     borderRadius: '8px',
378:     padding: '20px',
379:     margin: '20px 0'
380: };
381: 
382: const statLabelStyle = {
383:     fontSize: '12px',
384:     color: '#666666',
385:     fontWeight: 'bold',
386:     margin: '0 0 5px 0'
387: };
388: 
389: const statValueStyle = {
390:     fontSize: '14px',
391:     color: '#333333',
392:     fontWeight: 'bold',
393:     margin: '0'
394: };
395: 
396: const actionsStyle = {
397:     backgroundColor: '#e8f4f8',
398:     border: '1px solid #b8d4da',
399:     borderRadius: '8px',
400:     padding: '20px',
401:     margin: '20px 0',
402:     textAlign: 'center' as const
403: };
404: 
405: const actionsHeaderStyle = {
406:     fontSize: '16px',
407:     fontWeight: 'bold',
408:     color: '#2d7984',
409:     margin: '0 0 15px 0'
410: };
411: 
412: const callButtonStyle = {
413:     backgroundColor: '#28a745',
414:     color: '#ffffff',
415:     padding: '12px 8px',
416:     borderRadius: '6px',
417:     textDecoration: 'none',
418:     fontWeight: 'bold',
419:     fontSize: '12px',
420:     display: 'inline-block',
421:     width: '100%',
422:     textAlign: 'center' as const
423: };
424: 
425: const emailButtonStyle = {
426:     backgroundColor: '#007bff',
427:     color: '#ffffff',
428:     padding: '12px 8px',
429:     borderRadius: '6px',
430:     textDecoration: 'none',
431:     fontWeight: 'bold',
432:     fontSize: '12px',
433:     display: 'inline-block',
434:     width: '100%',
435:     textAlign: 'center' as const
436: };
437: 
438: const viewButtonStyle = {
439:     backgroundColor: '#6c757d',
440:     color: '#ffffff',
441:     padding: '12px 8px',
442:     borderRadius: '6px',
443:     textDecoration: 'none',
444:     fontWeight: 'bold',
445:     fontSize: '12px',
446:     display: 'inline-block',
447:     width: '100%',
448:     textAlign: 'center' as const
449: };
450: 
451: const hrStyle = {
452:     border: 'none',
453:     borderTop: '2px solid #e9ecef',
454:     margin: '30px 0'
455: };
456: 
457: const detailsStyle = {
458:     backgroundColor: '#ffffff',
459:     border: '1px solid #dee2e6',
460:     borderRadius: '8px',
461:     padding: '20px',
462:     margin: '20px 0'
463: };
464: 
465: const technicalStyle = {
466:     backgroundColor: '#f8f9fa',
467:     border: '1px solid #dee2e6',
468:     borderRadius: '8px',
469:     padding: '20px',
470:     margin: '20px 0'
471: };
472: 
473: const sectionHeaderStyle = {
474:     fontSize: '16px',
475:     fontWeight: 'bold',
476:     color: '#2d7984',
477:     margin: '0 0 15px 0'
478: };
479: 
480: const detailRowStyle = {
481:     marginBottom: '12px'
482: };
483: 
484: const labelColumnStyle = {
485:     width: '35%',
486:     paddingRight: '10px'
487: };
488: 
489: const valueColumnStyle = {
490:     width: '65%'
491: };
492: 
493: const labelStyle = {
494:     fontSize: '13px',
495:     fontWeight: 'bold',
496:     color: '#666666',
497:     margin: '0'
498: };
499: 
500: const valueStyle = {
501:     fontSize: '14px',
502:     color: '#333333',
503:     margin: '0'
504: };
505: 
506: const guidelinesStyle = {
507:     backgroundColor: '#fff3cd',
508:     border: '1px solid #ffeaa7',
509:     borderRadius: '8px',
510:     padding: '20px',
511:     margin: '20px 0'
512: };
513: 
514: const urgentGuidelineStyle = {
515:     fontSize: '14px',
516:     color: '#721c24',
517:     backgroundColor: '#f8d7da',
518:     padding: '10px',
519:     borderRadius: '4px',
520:     margin: '0 0 15px 0'
521: };
522: 
523: const highGuidelineStyle = {
524:     fontSize: '14px',
525:     color: '#856404',
526:     backgroundColor: '#fff3cd',
527:     padding: '10px',
528:     borderRadius: '4px',
529:     margin: '0 0 15px 0'
530: };
531: 
532: const guidelineListStyle = {
533:     paddingLeft: '20px',
534:     margin: '15px 0 0 0'
535: };
536: 
537: const guidelineItemStyle = {
538:     fontSize: '14px',
539:     lineHeight: '1.6',
540:     color: '#333333',
541:     marginBottom: '8px'
542: };
543: 
544: const complianceStyle = {
545:     backgroundColor: '#d4edda',
546:     border: '1px solid #c3e6cb',
547:     borderRadius: '8px',
548:     padding: '20px',
549:     margin: '20px 0'
550: };
551: 
552: const complianceHeaderStyle = {
553:     fontSize: '16px',
554:     fontWeight: 'bold',
555:     color: '#155724',
556:     margin: '0 0 15px 0'
557: };
558: 
559: const complianceListStyle = {
560:     paddingLeft: '20px',
561:     margin: '0'
562: };
563: 
564: const complianceItemStyle = {
565:     fontSize: '13px',
566:     lineHeight: '1.6',
567:     color: '#155724',
568:     marginBottom: '6px'
569: };
570: 
571: const footerStyle = {
572:     fontSize: '12px',
573:     color: '#666666',
574:     textAlign: 'center' as const,
575:     margin: '30px 0 0 0',
576:     fontStyle: 'italic'
577: };
578: 
579: export default InternalLeadNotificationEmail;
```

## File: src/emails/templates/LeadConfirmationEmail.tsx
```typescript
  1: /**
  2:  * Lead Confirmation Email Template
  3:  * 
  4:  * Sent to users who submit the debt relief qualification form
  5:  * to confirm their submission and provide next steps.
  6:  */
  7: 
  8: import React from 'react';
  9: import {
 10:     Section,
 11:     Text,
 12:     Button,
 13:     Hr,
 14:     Row,
 15:     Column
 16: } from '@react-email/components';
 17: import { BaseEmailLayout } from '../components/BaseEmailLayout';
 18: import { 
 19:     LeadConfirmationEmailData, 
 20:     debtAmountDisplayMap, 
 21:     debtTypeDisplayMap,
 22:     formatPhoneForDisplay,
 23:     DebtAmountRange,
 24:     DebtType
 25: } from '../types';
 26: 
 27: interface LeadConfirmationEmailProps {
 28:     data: LeadConfirmationEmailData;
 29: }
 30: 
 31: export const LeadConfirmationEmail: React.FC<LeadConfirmationEmailProps> = ({ data }) => {
 32:     const { user, lead, nextSteps } = data;
 33:     const formattedPhone = formatPhoneForDisplay(user.phone);
 34:     const debtAmountDisplay = debtAmountDisplayMap[lead.debtAmount as DebtAmountRange] || lead.debtAmount;
 35:     const debtTypeDisplay = debtTypeDisplayMap[lead.debtType as DebtType] || lead.debtType;
 36:     
 37:     // Format submission time
 38:     const submissionDate = new Date(lead.submittedAt).toLocaleDateString('en-US', {
 39:         weekday: 'long',
 40:         year: 'numeric',
 41:         month: 'long',
 42:         day: 'numeric',
 43:         hour: 'numeric',
 44:         minute: '2-digit',
 45:         timeZoneName: 'short'
 46:     });
 47: 
 48:     return (
 49:         <BaseEmailLayout
 50:             preview={`Thank you for your debt relief inquiry, ${user.firstName || 'valued customer'}. Your submission has been received.`}
 51:             title="Debt Relief Confirmation"
 52:             headerTitle="Debt Relief Confirmation"
 53:             headerSubtitle="Your inquiry has been received"
 54:         >
 55:             {/* Personal Greeting */}
 56:             <Text style={greetingStyle}>
 57:                 Hello {user.firstName || 'there'},
 58:             </Text>
 59:             
 60:             <Text style={paragraphStyle}>
 61:                 Thank you for taking the first step toward financial freedom. We have successfully 
 62:                 received your debt relief inquiry and our team is reviewing your information.
 63:             </Text>
 64: 
 65:             {/* Submission Details Section */}
 66:             <Section style={cardStyle}>
 67:                 <Text style={cardHeaderStyle}>
 68:                     📋 Your Submission Details
 69:                 </Text>
 70:                 
 71:                 <Row style={detailRowStyle}>
 72:                     <Column style={labelColumnStyle}>
 73:                         <Text style={labelStyle}>Reference Number:</Text>
 74:                     </Column>
 75:                     <Column style={valueColumnStyle}>
 76:                         <Text style={valueStyle}>{lead.referenceNumber}</Text>
 77:                     </Column>
 78:                 </Row>
 79:                 
 80:                 <Row style={detailRowStyle}>
 81:                     <Column style={labelColumnStyle}>
 82:                         <Text style={labelStyle}>Submitted:</Text>
 83:                     </Column>
 84:                     <Column style={valueColumnStyle}>
 85:                         <Text style={valueStyle}>{submissionDate}</Text>
 86:                     </Column>
 87:                 </Row>
 88:                 
 89:                 <Row style={detailRowStyle}>
 90:                     <Column style={labelColumnStyle}>
 91:                         <Text style={labelStyle}>Debt Amount:</Text>
 92:                     </Column>
 93:                     <Column style={valueColumnStyle}>
 94:                         <Text style={valueStyle}>{debtAmountDisplay}</Text>
 95:                     </Column>
 96:                 </Row>
 97:                 
 98:                 <Row style={detailRowStyle}>
 99:                     <Column style={labelColumnStyle}>
100:                         <Text style={labelStyle}>Debt Type:</Text>
101:                     </Column>
102:                     <Column style={valueColumnStyle}>
103:                         <Text style={valueStyle}>{debtTypeDisplay}</Text>
104:                     </Column>
105:                 </Row>
106:                 
107:                 <Row style={detailRowStyle}>
108:                     <Column style={labelColumnStyle}>
109:                         <Text style={labelStyle}>Contact Phone:</Text>
110:                     </Column>
111:                     <Column style={valueColumnStyle}>
112:                         <Text style={valueStyle}>{formattedPhone}</Text>
113:                     </Column>
114:                 </Row>
115:             </Section>
116: 
117:             {/* What Happens Next Section */}
118:             <Section style={nextStepsStyle}>
119:                 <Text style={sectionHeaderStyle}>
120:                     🚀 What Happens Next
121:                 </Text>
122:                 
123:                 <Text style={paragraphStyle}>
124:                     <strong>Expected Contact Time:</strong> {nextSteps.expectedContactTime}
125:                     <br />
126:                     <strong>Contact Method:</strong> {nextSteps.contactMethod}
127:                 </Text>
128:                 
129:                 <Text style={paragraphStyle}>
130:                     A certified debt relief specialist will contact you to:
131:                 </Text>
132:                 
133:                 <ul style={listStyle}>
134:                     <li style={listItemStyle}>Review your specific financial situation</li>
135:                     <li style={listItemStyle}>Explain available debt relief options</li>
136:                     <li style={listItemStyle}>Answer any questions you may have</li>
137:                     <li style={listItemStyle}>Help you create a personalized action plan</li>
138:                 </ul>
139:             </Section>
140: 
141:             {/* Preparation Tips */}
142:             <Section style={tipsStyle}>
143:                 <Text style={sectionHeaderStyle}>
144:                     💡 How to Prepare for Your Call
145:                 </Text>
146:                 
147:                 {nextSteps.preparationTips.map((tip, index) => (
148:                     <Text key={index} style={tipStyle}>
149:                         • {tip}
150:                     </Text>
151:                 ))}
152:             </Section>
153: 
154:             <Hr style={hrStyle} />
155: 
156:             {/* Immediate Help Section */}
157:             <Section style={helpSectionStyle}>
158:                 <Text style={sectionHeaderStyle}>
159:                     Need Immediate Assistance?
160:                 </Text>
161:                 
162:                 <Text style={paragraphStyle}>
163:                     If you have urgent questions or need to update your information, 
164:                     our support team is here to help.
165:                 </Text>
166:                 
167:                 <Row>
168:                     <Column style={{ width: '50%', paddingRight: '10px' }}>
169:                         <Button 
170:                             href="tel:+1-800-DEBT-HELP" 
171:                             style={primaryButtonStyle}
172:                         >
173:                             📞 Call Now
174:                         </Button>
175:                     </Column>
176:                     <Column style={{ width: '50%', paddingLeft: '10px' }}>
177:                         <Button 
178:                             href="mailto:support@yourdomain.com" 
179:                             style={secondaryButtonStyle}
180:                         >
181:                             ✉️ Email Support
182:                         </Button>
183:                     </Column>
184:                 </Row>
185:             </Section>
186: 
187:             {/* Important Notice */}
188:             <Section style={noticeStyle}>
189:                 <Text style={noticeTextStyle}>
190:                     <strong>Important:</strong> Keep this email for your records. Your reference number 
191:                     ({lead.referenceNumber}) will help us quickly access your information when you call.
192:                 </Text>
193:             </Section>
194: 
195:             {/* Trust Indicators */}
196:             <Section style={trustStyle}>
197:                 <Text style={trustHeaderStyle}>
198:                     Why Choose Our Debt Relief Service?
199:                 </Text>
200:                 
201:                 <Row>
202:                     <Column style={{ width: '33.33%', textAlign: 'center' }}>
203:                         <Text style={trustItemStyle}>
204:                             <strong>🛡️ Accredited</strong>
205:                             <br />
206:                             AFCC Certified
207:                         </Text>
208:                     </Column>
209:                     <Column style={{ width: '33.33%', textAlign: 'center' }}>
210:                         <Text style={trustItemStyle}>
211:                             <strong>⭐ Rated A+</strong>
212:                             <br />
213:                             Better Business Bureau
214:                         </Text>
215:                     </Column>
216:                     <Column style={{ width: '33.33%', textAlign: 'center' }}>
217:                         <Text style={trustItemStyle}>
218:                             <strong>🔒 Secure</strong>
219:                             <br />
220:                             Your information is protected
221:                         </Text>
222:                     </Column>
223:                 </Row>
224:             </Section>
225: 
226:             <Text style={closingStyle}>
227:                 Thank you for trusting us with your financial future. We look forward to 
228:                 helping you achieve the debt relief you deserve.
229:                 <br /><br />
230:                 Best regards,
231:                 <br />
232:                 <strong>The Debt Relief Team</strong>
233:             </Text>
234:         </BaseEmailLayout>
235:     );
236: };
237: 
238: // Styles
239: const greetingStyle = {
240:     fontSize: '18px',
241:     fontWeight: 'bold',
242:     color: '#2d7984',
243:     margin: '0 0 20px 0'
244: };
245: 
246: const paragraphStyle = {
247:     fontSize: '16px',
248:     lineHeight: '1.6',
249:     color: '#333333',
250:     margin: '0 0 20px 0'
251: };
252: 
253: const cardStyle = {
254:     backgroundColor: '#f8f9fa',
255:     border: '1px solid #e9ecef',
256:     borderRadius: '8px',
257:     padding: '20px',
258:     margin: '20px 0'
259: };
260: 
261: const cardHeaderStyle = {
262:     fontSize: '18px',
263:     fontWeight: 'bold',
264:     color: '#2d7984',
265:     margin: '0 0 15px 0'
266: };
267: 
268: const detailRowStyle = {
269:     marginBottom: '10px'
270: };
271: 
272: const labelColumnStyle = {
273:     width: '40%',
274:     paddingRight: '10px'
275: };
276: 
277: const valueColumnStyle = {
278:     width: '60%'
279: };
280: 
281: const labelStyle = {
282:     fontSize: '14px',
283:     fontWeight: 'bold',
284:     color: '#666666',
285:     margin: '0'
286: };
287: 
288: const valueStyle = {
289:     fontSize: '14px',
290:     color: '#333333',
291:     margin: '0'
292: };
293: 
294: const nextStepsStyle = {
295:     backgroundColor: '#e8f4f8',
296:     border: '1px solid #b8d4da',
297:     borderRadius: '8px',
298:     padding: '20px',
299:     margin: '20px 0'
300: };
301: 
302: const sectionHeaderStyle = {
303:     fontSize: '18px',
304:     fontWeight: 'bold',
305:     color: '#2d7984',
306:     margin: '0 0 15px 0'
307: };
308: 
309: const listStyle = {
310:     paddingLeft: '20px',
311:     margin: '15px 0'
312: };
313: 
314: const listItemStyle = {
315:     fontSize: '16px',
316:     lineHeight: '1.6',
317:     color: '#333333',
318:     marginBottom: '8px'
319: };
320: 
321: const tipsStyle = {
322:     backgroundColor: '#fff3cd',
323:     border: '1px solid #ffeaa7',
324:     borderRadius: '8px',
325:     padding: '20px',
326:     margin: '20px 0'
327: };
328: 
329: const tipStyle = {
330:     fontSize: '14px',
331:     lineHeight: '1.6',
332:     color: '#333333',
333:     margin: '0 0 8px 0'
334: };
335: 
336: const hrStyle = {
337:     border: 'none',
338:     borderTop: '2px solid #e9ecef',
339:     margin: '30px 0'
340: };
341: 
342: const helpSectionStyle = {
343:     textAlign: 'center' as const,
344:     margin: '30px 0'
345: };
346: 
347: const primaryButtonStyle = {
348:     backgroundColor: '#2d7984',
349:     color: '#ffffff',
350:     padding: '12px 24px',
351:     borderRadius: '6px',
352:     textDecoration: 'none',
353:     fontWeight: 'bold',
354:     fontSize: '14px',
355:     display: 'inline-block',
356:     width: '100%',
357:     textAlign: 'center' as const
358: };
359: 
360: const secondaryButtonStyle = {
361:     backgroundColor: '#ffffff',
362:     color: '#2d7984',
363:     border: '2px solid #2d7984',
364:     padding: '10px 24px',
365:     borderRadius: '6px',
366:     textDecoration: 'none',
367:     fontWeight: 'bold',
368:     fontSize: '14px',
369:     display: 'inline-block',
370:     width: '100%',
371:     textAlign: 'center' as const
372: };
373: 
374: const noticeStyle = {
375:     backgroundColor: '#d4edda',
376:     border: '1px solid #c3e6cb',
377:     borderRadius: '8px',
378:     padding: '15px',
379:     margin: '20px 0'
380: };
381: 
382: const noticeTextStyle = {
383:     fontSize: '14px',
384:     color: '#155724',
385:     margin: '0'
386: };
387: 
388: const trustStyle = {
389:     backgroundColor: '#f8f9fa',
390:     border: '1px solid #dee2e6',
391:     borderRadius: '8px',
392:     padding: '20px',
393:     margin: '30px 0'
394: };
395: 
396: const trustHeaderStyle = {
397:     fontSize: '16px',
398:     fontWeight: 'bold',
399:     color: '#2d7984',
400:     textAlign: 'center' as const,
401:     margin: '0 0 20px 0'
402: };
403: 
404: const trustItemStyle = {
405:     fontSize: '12px',
406:     color: '#666666',
407:     margin: '0',
408:     lineHeight: '1.4'
409: };
410: 
411: const closingStyle = {
412:     fontSize: '16px',
413:     lineHeight: '1.6',
414:     color: '#333333',
415:     margin: '30px 0 0 0'
416: };
417: 
418: export default LeadConfirmationEmail;
```

## File: src/emails/templates/WelcomeEmail.tsx
```typescript
  1: /**
  2:  * Welcome Email Template
  3:  * 
  4:  * Sent to new users who register for the debt relief service
  5:  * to welcome them and guide them through the onboarding process.
  6:  */
  7: 
  8: import React from 'react';
  9: import {
 10:     Section,
 11:     Text,
 12:     Button,
 13:     Hr,
 14:     Row,
 15:     Column
 16: } from '@react-email/components';
 17: import { BaseEmailLayout } from '../components/BaseEmailLayout';
 18: import { WelcomeEmailData } from '../types';
 19: 
 20: interface WelcomeEmailProps {
 21:     data: WelcomeEmailData;
 22: }
 23: 
 24: export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ data }) => {
 25:     const { user, account, onboarding, resources } = data;
 26:     
 27:     // Format account creation date
 28:     const creationDate = new Date(account.createdAt).toLocaleDateString('en-US', {
 29:         weekday: 'long',
 30:         year: 'numeric',
 31:         month: 'long',
 32:         day: 'numeric'
 33:     });
 34: 
 35:     // Calculate progress
 36:     const completedSteps = onboarding.steps.filter(step => step.completed).length;
 37:     const totalSteps = onboarding.steps.length;
 38:     const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
 39: 
 40:     return (
 41:         <BaseEmailLayout
 42:             preview={`Welcome to Debt Relief, ${user.firstName || 'valued member'}! Let's get you started on your path to financial freedom.`}
 43:             title="Welcome to Debt Relief"
 44:             headerTitle="🎉 Welcome to Debt Relief!"
 45:             headerSubtitle="Your journey to financial freedom starts here"
 46:             headerBgColor="#28a745"
 47:         >
 48:             {/* Personal Welcome */}
 49:             <Text style={welcomeStyle}>
 50:                 Hello {user.firstName || 'there'}, and welcome! 👋
 51:             </Text>
 52:             
 53:             <Text style={paragraphStyle}>
 54:                 Congratulations on taking the first step toward financial freedom! We're thrilled 
 55:                 to have you join our community of people who are actively working to overcome their 
 56:                 debt challenges and build a brighter financial future.
 57:             </Text>
 58: 
 59:             {/* Account Summary */}
 60:             <Section style={accountSummaryStyle}>
 61:                 <Text style={sectionHeaderStyle}>
 62:                     📊 Your Account Summary
 63:                 </Text>
 64:                 
 65:                 <Row style={summaryRowStyle}>
 66:                     <Column style={{ width: '50%' }}>
 67:                         <Text style={summaryLabelStyle}>Account Type:</Text>
 68:                         <Text style={summaryValueStyle}>
 69:                             {account.type === 'premium' ? '⭐ Premium' : '📝 Basic'}
 70:                         </Text>
 71:                     </Column>
 72:                     <Column style={{ width: '50%' }}>
 73:                         <Text style={summaryLabelStyle}>Created:</Text>
 74:                         <Text style={summaryValueStyle}>{creationDate}</Text>
 75:                     </Column>
 76:                 </Row>
 77:                 
 78:                 <Row style={summaryRowStyle}>
 79:                     <Column style={{ width: '50%' }}>
 80:                         <Text style={summaryLabelStyle}>Email:</Text>
 81:                         <Text style={summaryValueStyle}>{user.email}</Text>
 82:                     </Column>
 83:                     <Column style={{ width: '50%' }}>
 84:                         <Text style={summaryLabelStyle}>Status:</Text>
 85:                         <Text style={summaryValueStyle}>
 86:                             {account.activationRequired ? '⏳ Pending Activation' : '✅ Active'}
 87:                         </Text>
 88:                     </Column>
 89:                 </Row>
 90:             </Section>
 91: 
 92:             {/* Account Activation (if required) */}
 93:             {account.activationRequired && account.activationUrl && (
 94:                 <Section style={activationStyle}>
 95:                     <Text style={activationHeaderStyle}>
 96:                         🔐 Account Activation Required
 97:                     </Text>
 98:                     
 99:                     <Text style={paragraphStyle}>
100:                         To get started, please activate your account by clicking the button below. 
101:                         This will verify your email address and give you full access to our platform.
102:                     </Text>
103:                     
104:                     <div style={{ textAlign: 'center', margin: '20px 0' }}>
105:                         <Button href={account.activationUrl} style={activationButtonStyle}>
106:                             🔓 Activate My Account
107:                         </Button>
108:                     </div>
109:                     
110:                     <Text style={activationNoticeStyle}>
111:                         This activation link will expire in 24 hours. If you need a new link, 
112:                         please contact our support team.
113:                     </Text>
114:                 </Section>
115:             )}
116: 
117:             {/* Onboarding Progress */}
118:             <Section style={onboardingStyle}>
119:                 <Text style={sectionHeaderStyle}>
120:                     🚀 Your Onboarding Progress
121:                 </Text>
122:                 
123:                 <div style={progressBarContainerStyle}>
124:                     <div style={{
125:                         ...progressBarStyle,
126:                         width: `${progressPercentage}%`
127:                     }}></div>
128:                 </div>
129:                 
130:                 <Text style={progressTextStyle}>
131:                     {completedSteps} of {totalSteps} steps completed ({progressPercentage}%)
132:                     <br />
133:                     <em>Estimated time to complete: {onboarding.estimatedTime}</em>
134:                 </Text>
135:                 
136:                 <Text style={paragraphStyle}>
137:                     Follow these steps to get the most out of your debt relief journey:
138:                 </Text>
139:                 
140:                 {onboarding.steps.map((step, index) => (
141:                     <Row key={index} style={stepRowStyle}>
142:                         <Column style={{ width: '10%' }}>
143:                             <Text style={stepIconStyle}>
144:                                 {step.completed ? '✅' : '⭕'}
145:                             </Text>
146:                         </Column>
147:                         <Column style={{ width: '90%' }}>
148:                             <Text style={step.completed ? stepCompletedStyle : stepPendingStyle}>
149:                                 <strong>{step.title}</strong>
150:                                 <br />
151:                                 {step.description}
152:                             </Text>
153:                             {!step.completed && (
154:                                 <Button href={step.url} style={stepButtonStyle}>
155:                                     Start Step {index + 1}
156:                                 </Button>
157:                             )}
158:                         </Column>
159:                     </Row>
160:                 ))}
161:             </Section>
162: 
163:             <Hr style={hrStyle} />
164: 
165:             {/* What You Get */}
166:             <Section style={benefitsStyle}>
167:                 <Text style={sectionHeaderStyle}>
168:                     💎 What You Get with Debt Relief
169:                 </Text>
170:                 
171:                 <Row>
172:                     <Column style={{ width: '33.33%', textAlign: 'center', paddingRight: '10px' }}>
173:                         <Text style={benefitStyle}>
174:                             <strong>🎯 Personalized Plan</strong>
175:                             <br />
176:                             Custom debt relief strategy tailored to your specific financial situation
177:                         </Text>
178:                     </Column>
179:                     <Column style={{ width: '33.33%', textAlign: 'center', padding: '0 5px' }}>
180:                         <Text style={benefitStyle}>
181:                             <strong>👥 Expert Support</strong>
182:                             <br />
183:                             Certified debt relief specialists available to guide you every step
184:                         </Text>
185:                     </Column>
186:                     <Column style={{ width: '33.33%', textAlign: 'center', paddingLeft: '10px' }}>
187:                         <Text style={benefitStyle}>
188:                             <strong>📈 Progress Tracking</strong>
189:                             <br />
190:                             Monitor your debt reduction and celebrate your financial milestones
191:                         </Text>
192:                     </Column>
193:                 </Row>
194:                 
195:                 {account.type === 'premium' && (
196:                     <>
197:                         <Hr style={benefitDividerStyle} />
198:                         <Text style={premiumBenefitsHeaderStyle}>
199:                             ⭐ Premium Member Benefits
200:                         </Text>
201:                         
202:                         <ul style={premiumListStyle}>
203:                             <li style={premiumItemStyle}>Priority customer support (24/7 access)</li>
204:                             <li style={premiumItemStyle}>Advanced debt consolidation tools</li>
205:                             <li style={premiumItemStyle}>Credit score monitoring and improvement tips</li>
206:                             <li style={premiumItemStyle}>Exclusive financial education resources</li>
207:                             <li style={premiumItemStyle}>One-on-one consultations with senior specialists</li>
208:                         </ul>
209:                     </>
210:                 )}
211:             </Section>
212: 
213:             {/* Quick Start Actions */}
214:             <Section style={quickStartStyle}>
215:                 <Text style={sectionHeaderStyle}>
216:                     ⚡ Quick Start Actions
217:                 </Text>
218:                 
219:                 <Text style={paragraphStyle}>
220:                     Ready to dive in? Here are some immediate actions you can take:
221:                 </Text>
222:                 
223:                 <Row>
224:                     <Column style={{ width: '50%', paddingRight: '10px' }}>
225:                         <Button href="/dashboard" style={primaryActionButtonStyle}>
226:                             📊 View Dashboard
227:                         </Button>
228:                     </Column>
229:                     <Column style={{ width: '50%', paddingLeft: '10px' }}>
230:                         <Button href="/debt-calculator" style={secondaryActionButtonStyle}>
231:                             🧮 Debt Calculator
232:                         </Button>
233:                     </Column>
234:                 </Row>
235:                 
236:                 <div style={{ margin: '15px 0' }}>
237:                     <Button href="/consultation" style={consultationButtonStyle}>
238:                         📞 Schedule Free Consultation
239:                     </Button>
240:                 </div>
241:             </Section>
242: 
243:             {/* Resources */}
244:             <Section style={resourcesStyle}>
245:                 <Text style={sectionHeaderStyle}>
246:                     📚 Helpful Resources
247:                 </Text>
248:                 
249:                 <Text style={paragraphStyle}>
250:                     We've prepared some valuable resources to help you on your journey:
251:                 </Text>
252:                 
253:                 <Row>
254:                     <Column style={{ width: '33.33%', textAlign: 'center' }}>
255:                         <Button href={resources.supportUrl} style={resourceButtonStyle}>
256:                             🛟 Support Center
257:                         </Button>
258:                         <Text style={resourceDescStyle}>
259:                             Get answers to common questions
260:                         </Text>
261:                     </Column>
262:                     <Column style={{ width: '33.33%', textAlign: 'center' }}>
263:                         <Button href={resources.documentationUrl} style={resourceButtonStyle}>
264:                             📖 Learning Hub
265:                         </Button>
266:                         <Text style={resourceDescStyle}>
267:                             Educational articles and guides
268:                         </Text>
269:                     </Column>
270:                     <Column style={{ width: '33.33%', textAlign: 'center' }}>
271:                         <Button href={resources.communityUrl} style={resourceButtonStyle}>
272:                             👥 Community
273:                         </Button>
274:                         <Text style={resourceDescStyle}>
275:                             Connect with others on similar journeys
276:                         </Text>
277:                     </Column>
278:                 </Row>
279:             </Section>
280: 
281:             {/* Success Stories */}
282:             <Section style={successStoriesStyle}>
283:                 <Text style={sectionHeaderStyle}>
284:                     🌟 Success Stories
285:                 </Text>
286:                 
287:                 <Text style={testimonialStyle}>
288:                     "I reduced my debt by 60% in just 18 months with their help. The personalized 
289:                     plan made all the difference!" - Sarah M., California
290:                 </Text>
291:                 
292:                 <Text style={testimonialStyle}>
293:                     "The support team was incredible. They guided me through every step and 
294:                     never made me feel judged about my financial situation." - Michael R., Texas
295:                 </Text>
296:                 
297:                 <Text style={encouragementStyle}>
298:                     <strong>You're in good company!</strong> Join thousands of people who have 
299:                     successfully reduced their debt and regained financial control.
300:                 </Text>
301:             </Section>
302: 
303:             {/* Contact Information */}
304:             <Section style={contactStyle}>
305:                 <Text style={sectionHeaderStyle}>
306:                     📞 Need Help Getting Started?
307:                 </Text>
308:                 
309:                 <Text style={paragraphStyle}>
310:                     Our team is here to support you every step of the way. Don't hesitate to reach out:
311:                 </Text>
312:                 
313:                 <Row>
314:                     <Column style={{ width: '50%', textAlign: 'center' }}>
315:                         <Text style={contactMethodStyle}>
316:                             <strong>📞 Phone Support</strong>
317:                             <br />
318:                             1-800-DEBT-HELP
319:                             <br />
320:                             <em>Mon-Fri: 8AM-8PM EST</em>
321:                         </Text>
322:                     </Column>
323:                     <Column style={{ width: '50%', textAlign: 'center' }}>
324:                         <Text style={contactMethodStyle}>
325:                             <strong>✉️ Email Support</strong>
326:                             <br />
327:                             support@yourdomain.com
328:                             <br />
329:                             <em>Response within 24 hours</em>
330:                         </Text>
331:                     </Column>
332:                 </Row>
333:             </Section>
334: 
335:             <Text style={closingStyle}>
336:                 Welcome aboard! We're excited to be part of your journey to financial freedom. 
337:                 Remember, every small step counts, and we're here to help you make steady progress 
338:                 toward your goals.
339:                 <br /><br />
340:                 To your success,
341:                 <br />
342:                 <strong>The Debt Relief Team</strong>
343:             </Text>
344:         </BaseEmailLayout>
345:     );
346: };
347: 
348: // Styles
349: const welcomeStyle = {
350:     fontSize: '20px',
351:     fontWeight: 'bold',
352:     color: '#28a745',
353:     margin: '0 0 20px 0',
354:     textAlign: 'center' as const
355: };
356: 
357: const paragraphStyle = {
358:     fontSize: '16px',
359:     lineHeight: '1.6',
360:     color: '#333333',
361:     margin: '0 0 20px 0'
362: };
363: 
364: const accountSummaryStyle = {
365:     backgroundColor: '#f8f9fa',
366:     border: '1px solid #dee2e6',
367:     borderRadius: '8px',
368:     padding: '20px',
369:     margin: '20px 0'
370: };
371: 
372: const sectionHeaderStyle = {
373:     fontSize: '18px',
374:     fontWeight: 'bold',
375:     color: '#2d7984',
376:     margin: '0 0 15px 0'
377: };
378: 
379: const summaryRowStyle = {
380:     marginBottom: '15px'
381: };
382: 
383: const summaryLabelStyle = {
384:     fontSize: '14px',
385:     fontWeight: 'bold',
386:     color: '#666666',
387:     margin: '0 0 5px 0'
388: };
389: 
390: const summaryValueStyle = {
391:     fontSize: '16px',
392:     color: '#333333',
393:     margin: '0'
394: };
395: 
396: const activationStyle = {
397:     backgroundColor: '#fff3cd',
398:     border: '2px solid #ffc107',
399:     borderRadius: '8px',
400:     padding: '25px',
401:     margin: '20px 0',
402:     textAlign: 'center' as const
403: };
404: 
405: const activationHeaderStyle = {
406:     fontSize: '18px',
407:     fontWeight: 'bold',
408:     color: '#856404',
409:     margin: '0 0 15px 0'
410: };
411: 
412: const activationButtonStyle = {
413:     backgroundColor: '#ffc107',
414:     color: '#212529',
415:     padding: '15px 30px',
416:     borderRadius: '8px',
417:     textDecoration: 'none',
418:     fontWeight: 'bold',
419:     fontSize: '16px',
420:     display: 'inline-block'
421: };
422: 
423: const activationNoticeStyle = {
424:     fontSize: '14px',
425:     color: '#856404',
426:     fontStyle: 'italic',
427:     margin: '15px 0 0 0'
428: };
429: 
430: const onboardingStyle = {
431:     backgroundColor: '#e8f4f8',
432:     border: '1px solid #b8d4da',
433:     borderRadius: '8px',
434:     padding: '25px',
435:     margin: '20px 0'
436: };
437: 
438: const progressBarContainerStyle = {
439:     backgroundColor: '#dee2e6',
440:     borderRadius: '10px',
441:     height: '20px',
442:     margin: '15px 0',
443:     overflow: 'hidden'
444: };
445: 
446: const progressBarStyle = {
447:     backgroundColor: '#28a745',
448:     height: '100%',
449:     borderRadius: '10px',
450:     transition: 'width 0.3s ease'
451: };
452: 
453: const progressTextStyle = {
454:     fontSize: '14px',
455:     color: '#2d7984',
456:     textAlign: 'center' as const,
457:     margin: '10px 0 20px 0'
458: };
459: 
460: const stepRowStyle = {
461:     marginBottom: '20px',
462:     backgroundColor: '#ffffff',
463:     padding: '15px',
464:     borderRadius: '6px',
465:     border: '1px solid #dee2e6'
466: };
467: 
468: const stepIconStyle = {
469:     fontSize: '20px',
470:     margin: '0',
471:     textAlign: 'center' as const
472: };
473: 
474: const stepCompletedStyle = {
475:     fontSize: '14px',
476:     color: '#155724',
477:     margin: '0'
478: };
479: 
480: const stepPendingStyle = {
481:     fontSize: '14px',
482:     color: '#333333',
483:     margin: '0 0 10px 0'
484: };
485: 
486: const stepButtonStyle = {
487:     backgroundColor: '#2d7984',
488:     color: '#ffffff',
489:     padding: '8px 16px',
490:     borderRadius: '4px',
491:     textDecoration: 'none',
492:     fontSize: '12px',
493:     fontWeight: 'bold',
494:     display: 'inline-block'
495: };
496: 
497: const hrStyle = {
498:     border: 'none',
499:     borderTop: '2px solid #e9ecef',
500:     margin: '30px 0'
501: };
502: 
503: const benefitsStyle = {
504:     backgroundColor: '#f8f9fa',
505:     border: '1px solid #dee2e6',
506:     borderRadius: '8px',
507:     padding: '25px',
508:     margin: '20px 0'
509: };
510: 
511: const benefitStyle = {
512:     fontSize: '14px',
513:     color: '#333333',
514:     margin: '0',
515:     lineHeight: '1.6'
516: };
517: 
518: const benefitDividerStyle = {
519:     border: 'none',
520:     borderTop: '1px solid #dee2e6',
521:     margin: '20px 0'
522: };
523: 
524: const premiumBenefitsHeaderStyle = {
525:     fontSize: '16px',
526:     fontWeight: 'bold',
527:     color: '#ffc107',
528:     margin: '0 0 15px 0',
529:     textAlign: 'center' as const
530: };
531: 
532: const premiumListStyle = {
533:     paddingLeft: '20px',
534:     margin: '0'
535: };
536: 
537: const premiumItemStyle = {
538:     fontSize: '14px',
539:     color: '#333333',
540:     marginBottom: '8px',
541:     lineHeight: '1.5'
542: };
543: 
544: const quickStartStyle = {
545:     backgroundColor: '#d4edda',
546:     border: '1px solid #c3e6cb',
547:     borderRadius: '8px',
548:     padding: '25px',
549:     margin: '20px 0',
550:     textAlign: 'center' as const
551: };
552: 
553: const primaryActionButtonStyle = {
554:     backgroundColor: '#28a745',
555:     color: '#ffffff',
556:     padding: '12px 20px',
557:     borderRadius: '6px',
558:     textDecoration: 'none',
559:     fontWeight: 'bold',
560:     fontSize: '14px',
561:     display: 'inline-block',
562:     width: '100%',
563:     textAlign: 'center' as const
564: };
565: 
566: const secondaryActionButtonStyle = {
567:     backgroundColor: '#6c757d',
568:     color: '#ffffff',
569:     padding: '12px 20px',
570:     borderRadius: '6px',
571:     textDecoration: 'none',
572:     fontWeight: 'bold',
573:     fontSize: '14px',
574:     display: 'inline-block',
575:     width: '100%',
576:     textAlign: 'center' as const
577: };
578: 
579: const consultationButtonStyle = {
580:     backgroundColor: '#2d7984',
581:     color: '#ffffff',
582:     padding: '15px 30px',
583:     borderRadius: '8px',
584:     textDecoration: 'none',
585:     fontWeight: 'bold',
586:     fontSize: '16px',
587:     display: 'inline-block',
588:     width: '100%',
589:     textAlign: 'center' as const
590: };
591: 
592: const resourcesStyle = {
593:     backgroundColor: '#f8f9fa',
594:     border: '1px solid #dee2e6',
595:     borderRadius: '8px',
596:     padding: '25px',
597:     margin: '20px 0'
598: };
599: 
600: const resourceButtonStyle = {
601:     backgroundColor: '#007bff',
602:     color: '#ffffff',
603:     padding: '10px 15px',
604:     borderRadius: '6px',
605:     textDecoration: 'none',
606:     fontSize: '12px',
607:     fontWeight: 'bold',
608:     display: 'inline-block',
609:     width: '90%',
610:     textAlign: 'center' as const,
611:     margin: '0 0 10px 0'
612: };
613: 
614: const resourceDescStyle = {
615:     fontSize: '12px',
616:     color: '#666666',
617:     margin: '0',
618:     lineHeight: '1.4'
619: };
620: 
621: const successStoriesStyle = {
622:     backgroundColor: '#fff3cd',
623:     border: '1px solid #ffeaa7',
624:     borderRadius: '8px',
625:     padding: '25px',
626:     margin: '20px 0'
627: };
628: 
629: const testimonialStyle = {
630:     fontSize: '14px',
631:     color: '#856404',
632:     fontStyle: 'italic',
633:     margin: '0 0 15px 0',
634:     padding: '15px',
635:     backgroundColor: '#fcf8e3',
636:     borderRadius: '6px',
637:     borderLeft: '4px solid #ffc107'
638: };
639: 
640: const encouragementStyle = {
641:     fontSize: '15px',
642:     color: '#856404',
643:     textAlign: 'center' as const,
644:     margin: '20px 0 0 0'
645: };
646: 
647: const contactStyle = {
648:     backgroundColor: '#e8f4f8',
649:     border: '1px solid #b8d4da',
650:     borderRadius: '8px',
651:     padding: '25px',
652:     margin: '20px 0'
653: };
654: 
655: const contactMethodStyle = {
656:     fontSize: '14px',
657:     color: '#2d7984',
658:     margin: '0',
659:     lineHeight: '1.6'
660: };
661: 
662: const closingStyle = {
663:     fontSize: '16px',
664:     lineHeight: '1.6',
665:     color: '#333333',
666:     margin: '30px 0 0 0',
667:     textAlign: 'center' as const
668: };
669: 
670: export default WelcomeEmail;
```

## File: src/emails/preview.ts
```typescript
  1: /**
  2:  * Email Template Preview Utility
  3:  * 
  4:  * Provides sample data and preview functionality for testing email templates
  5:  * during development. This helps developers see how templates render with
  6:  * realistic data before sending actual emails.
  7:  */
  8: 
  9: import { render } from '@react-email/render';
 10: import {
 11:     LeadConfirmationEmailData,
 12:     InternalLeadNotificationEmailData,
 13:     ErrorNotificationEmailData,
 14:     WelcomeEmailData,
 15:     EmailTemplateType,
 16:     calculateLeadPriority,
 17:     calculateExpectedContactTime,
 18:     generateReferenceNumber
 19: } from '../types';
 20: import { 
 21:     LeadConfirmationEmail,
 22:     InternalLeadNotificationEmail,
 23:     ErrorNotificationEmail,
 24:     WelcomeEmail,
 25:     EMAIL_TEMPLATES
 26: } from '../templates';
 27: 
 28: // Sample data generators for testing
 29: export class EmailPreviewData {
 30:     
 31:     /**
 32:      * Generate sample data for Lead Confirmation Email
 33:      */
 34:     static getLeadConfirmationData(): LeadConfirmationEmailData {
 35:         const leadId = 'lead_' + Math.random().toString(36).substr(2, 9);
 36:         const priority = 'high';
 37:         
 38:         return {
 39:             timestamp: new Date().toISOString(),
 40:             environment: 'development',
 41:             user: {
 42:                 firstName: 'Sarah',
 43:                 email: 'sarah.johnson@example.com',
 44:                 phone: '(555) 123-4567'
 45:             },
 46:             lead: {
 47:                 debtAmount: '25000-50000',
 48:                 debtType: 'credit-cards',
 49:                 submittedAt: new Date().toISOString(),
 50:                 referenceNumber: generateReferenceNumber(leadId)
 51:             },
 52:             nextSteps: {
 53:                 expectedContactTime: calculateExpectedContactTime(priority),
 54:                 contactMethod: 'Phone call from our certified debt specialist',
 55:                 preparationTips: [
 56:                     'Have your recent credit card statements ready',
 57:                     'List your monthly income and essential expenses',
 58:                     'Note any hardships affecting your ability to pay',
 59:                     'Prepare questions about debt relief options',
 60:                     'Have a quiet space available for the 15-20 minute call'
 61:                 ]
 62:             }
 63:         };
 64:     }
 65: 
 66:     /**
 67:      * Generate sample data for Internal Lead Notification Email
 68:      */
 69:     static getInternalNotificationData(): InternalLeadNotificationEmailData {
 70:         const leadId = 'lead_' + Math.random().toString(36).substr(2, 9);
 71:         const lead = {
 72:             id: leadId,
 73:             debtAmount: '25000-50000',
 74:             debtType: 'credit-cards',
 75:             phone: '5551234567',
 76:             consentProcessing: true,
 77:             consentMarketing: true,
 78:             source: 'qualification-form',
 79:             ipAddress: '192.168.1.100',
 80:             userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
 81:             submittedAt: new Date().toISOString()
 82:         };
 83:         
 84:         const priority = calculateLeadPriority(lead);
 85:         
 86:         return {
 87:             timestamp: new Date().toISOString(),
 88:             environment: 'development',
 89:             lead,
 90:             priority,
 91:             source: {
 92:                 page: '/debt-relief',
 93:                 campaign: 'google_ads_credit_card_debt',
 94:                 referrer: 'https://www.google.com'
 95:             },
 96:             metadata: {
 97:                 ipAddress: '192.168.1.100',
 98:                 userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
 99:                 location: {
100:                     city: 'Austin',
101:                     state: 'Texas',
102:                     country: 'United States'
103:                 }
104:             },
105:             actions: {
106:                 viewLeadUrl: `https://dashboard.yourdomain.com/leads/${leadId}`,
107:                 callLeadUrl: `tel:+15551234567`,
108:                 emailLeadUrl: `mailto:sarah.johnson@example.com?subject=Regarding Your Debt Relief Inquiry`
109:             }
110:         };
111:     }
112: 
113:     /**
114:      * Generate sample data for Error Notification Email
115:      */
116:     static getErrorNotificationData(): ErrorNotificationEmailData {
117:         const requestId = 'req_' + Math.random().toString(36).substr(2, 9);
118:         
119:         return {
120:             timestamp: new Date().toISOString(),
121:             environment: 'production',
122:             error: {
123:                 message: 'Failed to insert lead data: Connection timeout after 30 seconds',
124:                 stack: `Error: Connection timeout after 30 seconds
125:     at Database.query (/app/src/lib/database.ts:45:23)
126:     at LeadService.createLead (/app/src/services/leadService.ts:78:31)
127:     at POST /api/leads (/app/src/pages/api/leads.ts:156:19)
128:     at async handler (/app/src/pages/api/leads.ts:89:12)`,
129:                 code: 'DB_CONNECTION_TIMEOUT',
130:                 type: 'database_error',
131:                 severity: 'high'
132:             },
133:             context: {
134:                 endpoint: '/api/leads',
135:                 method: 'POST',
136:                 userId: 'user_abc123',
137:                 leadId: 'lead_def456',
138:                 requestId,
139:                 userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
140:                 ipAddress: '203.0.113.45'
141:             },
142:             system: {
143:                 service: 'debt-relief-api',
144:                 version: '1.2.4',
145:                 environment: 'production',
146:                 hostname: 'api-server-01.yourdomain.com'
147:             },
148:             actions: {
149:                 dashboardUrl: 'https://monitoring.yourdomain.com/dashboard',
150:                 logsUrl: `https://logs.yourdomain.com/search?requestId=${requestId}`,
151:                 documentsUrl: 'https://docs.yourdomain.com/troubleshooting/database-errors'
152:             }
153:         };
154:     }
155: 
156:     /**
157:      * Generate sample data for Welcome Email
158:      */
159:     static getWelcomeData(): WelcomeEmailData {
160:         const userId = 'user_' + Math.random().toString(36).substr(2, 9);
161:         
162:         return {
163:             timestamp: new Date().toISOString(),
164:             environment: 'development',
165:             user: {
166:                 id: userId,
167:                 firstName: 'Michael',
168:                 lastName: 'Rodriguez',
169:                 email: 'michael.rodriguez@example.com',
170:                 phone: '(555) 987-6543',
171:                 createdAt: new Date().toISOString()
172:             },
173:             account: {
174:                 type: 'basic',
175:                 createdAt: new Date().toISOString(),
176:                 activationRequired: true,
177:                 activationUrl: `https://yourdomain.com/activate?token=abc123def456&userId=${userId}`
178:             },
179:             onboarding: {
180:                 steps: [
181:                     {
182:                         title: 'Complete Your Profile',
183:                         description: 'Add your financial information to get personalized recommendations',
184:                         url: '/profile/complete',
185:                         completed: false
186:                     },
187:                     {
188:                         title: 'Debt Assessment',
189:                         description: 'Take our comprehensive debt assessment to understand your situation',
190:                         url: '/assessment/debt',
191:                         completed: false
192:                     },
193:                     {
194:                         title: 'Review Your Plan',
195:                         description: 'Review your personalized debt relief plan and options',
196:                         url: '/plan/review',
197:                         completed: false
198:                     },
199:                     {
200:                         title: 'Schedule Consultation',
201:                         description: 'Book a free consultation with our certified debt specialists',
202:                         url: '/consultation/schedule',
203:                         completed: false
204:                     }
205:                 ],
206:                 estimatedTime: '15-20 minutes'
207:             },
208:             resources: {
209:                 supportUrl: 'https://yourdomain.com/support',
210:                 documentationUrl: 'https://yourdomain.com/learn',
211:                 communityUrl: 'https://community.yourdomain.com'
212:             }
213:         };
214:     }
215: }
216: 
217: /**
218:  * Preview function that renders email templates with sample data
219:  */
220: export async function previewEmailTemplate(
221:     templateType: EmailTemplateType,
222:     format: 'html' | 'text' = 'html'
223: ): Promise<string> {
224:     let data: any;
225:     let Component: React.ComponentType<any>;
226: 
227:     // Get sample data and component based on template type
228:     switch (templateType) {
229:         case 'lead_confirmation':
230:             data = EmailPreviewData.getLeadConfirmationData();
231:             Component = LeadConfirmationEmail;
232:             break;
233:         
234:         case 'internal_notification':
235:             data = EmailPreviewData.getInternalNotificationData();
236:             Component = InternalLeadNotificationEmail;
237:             break;
238:         
239:         case 'error_notification':
240:             data = EmailPreviewData.getErrorNotificationData();
241:             Component = ErrorNotificationEmail;
242:             break;
243:         
244:         case 'welcome':
245:             data = EmailPreviewData.getWelcomeData();
246:             Component = WelcomeEmail;
247:             break;
248:         
249:         default:
250:             throw new Error(`Unknown template type: ${templateType}`);
251:     }
252: 
253:     // Render the component
254:     try {
255:         const rendered = await render(Component({ data }), {
256:             pretty: true
257:         });
258:         
259:         if (format === 'text') {
260:             // Convert HTML to plain text (basic implementation)
261:             return rendered
262:                 .replace(/<[^>]*>/g, '')
263:                 .replace(/\s+/g, ' ')
264:                 .trim();
265:         }
266:         
267:         return rendered;
268:     } catch (error) {
269:         throw new Error(`Failed to render template: ${error}`);
270:     }
271: }
272: 
273: /**
274:  * Preview all templates at once (useful for testing)
275:  */
276: export async function previewAllTemplates(): Promise<Record<EmailTemplateType, string>> {
277:     const templates: EmailTemplateType[] = ['lead_confirmation', 'internal_notification', 'error_notification', 'welcome'];
278:     const results: Record<string, string> = {};
279:     
280:     for (const templateType of templates) {
281:         try {
282:             results[templateType] = await previewEmailTemplate(templateType, 'html');
283:         } catch (error) {
284:             results[templateType] = `Error rendering template: ${error}`;
285:         }
286:     }
287:     
288:     return results as Record<EmailTemplateType, string>;
289: }
290: 
291: /**
292:  * Validate template rendering with various data scenarios
293:  */
294: export async function validateTemplateRendering(templateType: EmailTemplateType): Promise<{
295:     success: boolean;
296:     errors: string[];
297:     warnings: string[];
298: }> {
299:     const errors: string[] = [];
300:     const warnings: string[] = [];
301:     
302:     try {
303:         // Test with normal data
304:         await previewEmailTemplate(templateType, 'html');
305:         
306:         // Test with minimal data (some fields missing)
307:         const baseData = {
308:             timestamp: new Date().toISOString(),
309:             environment: 'development' as const
310:         };
311:         
312:         let minimalData: any = { ...baseData };
313:         
314:         switch (templateType) {
315:             case 'lead_confirmation':
316:                 minimalData = {
317:                     ...baseData,
318:                     user: { email: 'test@example.com', phone: '5551234567' },
319:                     lead: { debtAmount: '10000-15000', debtType: 'credit-cards', submittedAt: new Date().toISOString(), referenceNumber: 'DR-123' },
320:                     nextSteps: { expectedContactTime: '1 day', contactMethod: 'phone', preparationTips: [] }
321:                 };
322:                 break;
323:             case 'internal_notification':
324:                 minimalData = {
325:                     ...baseData,
326:                     lead: { id: '123', debtAmount: '10000-15000', debtType: 'credit-cards', phone: '5551234567', consentProcessing: true, consentMarketing: false, source: 'form', submittedAt: new Date().toISOString() },
327:                     priority: 'medium' as const,
328:                     source: { page: '/test' },
329:                     metadata: {},
330:                     actions: { viewLeadUrl: '#', callLeadUrl: '#', emailLeadUrl: '#' }
331:                 };
332:                 break;
333:             case 'error_notification':
334:                 minimalData = {
335:                     ...baseData,
336:                     error: { message: 'Test error', type: 'system_error' as const, severity: 'low' as const },
337:                     context: {},
338:                     system: { service: 'test', version: '1.0.0', environment: 'development' as const },
339:                     actions: { dashboardUrl: '#', logsUrl: '#', documentsUrl: '#' }
340:                 };
341:                 break;
342:             case 'welcome':
343:                 minimalData = {
344:                     ...baseData,
345:                     user: { email: 'test@example.com' },
346:                     account: { type: 'basic' as const, createdAt: new Date().toISOString(), activationRequired: false },
347:                     onboarding: { steps: [], estimatedTime: '10 minutes' },
348:                     resources: { supportUrl: '#', documentationUrl: '#', communityUrl: '#' }
349:                 };
350:                 break;
351:         }
352:         
353:         // Try rendering with minimal data
354:         try {
355:             const Component = EMAIL_TEMPLATES[templateType];
356:             await render(Component({ data: minimalData }));
357:         } catch (error) {
358:             warnings.push(`Template may not handle minimal data gracefully: ${error}`);
359:         }
360:         
361:     } catch (error) {
362:         errors.push(`Failed to render template: ${error}`);
363:     }
364:     
365:     return {
366:         success: errors.length === 0,
367:         errors,
368:         warnings
369:     };
370: }
371: 
372: /**
373:  * Generate sample email data for manual testing
374:  */
375: export function generateSampleEmailData(): Record<EmailTemplateType, any> {
376:     return {
377:         lead_confirmation: EmailPreviewData.getLeadConfirmationData(),
378:         internal_notification: EmailPreviewData.getInternalNotificationData(),
379:         error_notification: EmailPreviewData.getErrorNotificationData(),
380:         welcome: EmailPreviewData.getWelcomeData()
381:     };
382: }
383: 
384: // Export sample data for external use
385: export const SAMPLE_EMAIL_DATA = generateSampleEmailData();
```

## File: src/emails/service.ts
```typescript
  1: /**
  2:  * Enhanced Email Service with Retry Logic, Logging, and Queue System
  3:  * 
  4:  * Comprehensive email service module that handles all interactions with the Resend API,
  5:  * including advanced error handling, retry logic, logging, and high-volume queue processing.
  6:  */
  7: 
  8: import { render } from '@react-email/render';
  9: import { getClient, getConfig } from '../config/resend';
 10: import {
 11:     EmailTemplateType,
 12:     LeadConfirmationEmailData,
 13:     InternalLeadNotificationEmailData,
 14:     ErrorNotificationEmailData,
 15:     WelcomeEmailData,
 16:     EmailTrackingData
 17: } from './types';
 18: import {
 19:     LeadConfirmationEmail,
 20:     InternalLeadNotificationEmail,
 21:     ErrorNotificationEmail,
 22:     WelcomeEmail,
 23:     generateEmailSubject,
 24:     EMAIL_TEMPLATE_METADATA
 25: } from './templates';
 26: 
 27: // Enhanced email sending result interface
 28: export interface EmailSendResult {
 29:     success: boolean;
 30:     emailId?: string;
 31:     error?: string;
 32:     retryCount?: number;
 33:     duration?: number;
 34:     metadata?: {
 35:         templateType: EmailTemplateType;
 36:         recipientEmail: string;
 37:         sentAt: string;
 38:         resendId?: string;
 39:         attempt: number;
 40:         queueId?: string;
 41:     };
 42: }
 43: 
 44: // Email sending options with retry configuration
 45: export interface EmailSendOptions {
 46:     templateType: EmailTemplateType;
 47:     to: string | string[];
 48:     data: any;
 49:     subject?: string;
 50:     from?: string;
 51:     replyTo?: string;
 52:     tags?: Record<string, string>;
 53:     trackOpens?: boolean;
 54:     trackClicks?: boolean;
 55:     // Retry configuration
 56:     retryCount?: number;
 57:     retryDelay?: number;
 58:     retryBackoff?: 'linear' | 'exponential';
 59:     // Queue configuration
 60:     priority?: 'low' | 'medium' | 'high' | 'urgent';
 61:     scheduleAt?: Date;
 62:     queueId?: string;
 63: }
 64: 
 65: // Email queue item interface
 66: interface EmailQueueItem {
 67:     id: string;
 68:     options: EmailSendOptions;
 69:     createdAt: Date;
 70:     scheduledAt: Date;
 71:     attempts: number;
 72:     status: 'pending' | 'processing' | 'completed' | 'failed' | 'retrying';
 73:     lastError?: string;
 74:     completedAt?: Date;
 75: }
 76: 
 77: // Logging interface
 78: interface EmailLog {
 79:     timestamp: string;
 80:     level: 'info' | 'warn' | 'error' | 'debug';
 81:     message: string;
 82:     context: {
 83:         templateType?: EmailTemplateType;
 84:         recipientEmail?: string;
 85:         emailId?: string;
 86:         queueId?: string;
 87:         attempt?: number;
 88:         error?: string;
 89:         duration?: number;
 90:         [key: string]: any;
 91:     };
 92: }
 93: 
 94: // Email statistics interface
 95: interface EmailStats {
 96:     totalSent: number;
 97:     totalFailed: number;
 98:     successRate: number;
 99:     averageDeliveryTime: number;
100:     byTemplate: Record<EmailTemplateType, {
101:         sent: number;
102:         failed: number;
103:         successRate: number;
104:     }>;
105:     errors: Array<{
106:         error: string;
107:         count: number;
108:         lastOccurred: string;
109:     }>;
110:     queueStats: {
111:         pending: number;
112:         processing: number;
113:         completed: number;
114:         failed: number;
115:     };
116: }
117: 
118: /**
119:  * Enhanced Email Service Class with Retry Logic, Logging, and Queue System
120:  */
121: export class EmailService {
122:     private resend;
123:     private config;
124:     private emailQueue: Map<string, EmailQueueItem> = new Map();
125:     private logs: EmailLog[] = [];
126:     private isProcessing = false;
127:     private retryDefaults = {
128:         retryCount: 3,
129:         retryDelay: 1000, // 1 second
130:         retryBackoff: 'exponential' as const
131:     };
132: 
133:     constructor() {
134:         this.resend = getClient();
135:         this.config = getConfig();
136:         
137:         // Start queue processor
138:         this.startQueueProcessor();
139:         
140:         this.log('info', 'EmailService initialized', {
141:             environment: this.config.fromName
142:         });
143:     }
144: 
145:     /**
146:      * Enhanced email sending with retry logic and queue support
147:      */
148:     async sendTemplateEmail(options: EmailSendOptions): Promise<EmailSendResult> {
149:         const startTime = Date.now();
150:         const queueId = options.queueId || this.generateId();
151: 
152:         this.log('info', 'Email send requested', {
153:             templateType: options.templateType,
154:             recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
155:             queueId,
156:             priority: options.priority || 'medium'
157:         });
158: 
159:         // If scheduled for future, add to queue
160:         if (options.scheduleAt && options.scheduleAt > new Date()) {
161:             return this.enqueueEmail({ ...options, queueId });
162:         }
163: 
164:         // Send immediately with retry logic
165:         return this.sendEmailWithRetry({
166:             ...this.retryDefaults,
167:             ...options,
168:             queueId
169:         }, startTime);
170:     }
171: 
172:     /**
173:      * Send email with comprehensive retry logic
174:      */
175:     private async sendEmailWithRetry(
176:         options: EmailSendOptions & typeof this.retryDefaults,
177:         startTime: number,
178:         attempt: number = 1
179:     ): Promise<EmailSendResult> {
180:         try {
181:             // Validate template type
182:             if (!EMAIL_TEMPLATE_METADATA[options.templateType]) {
183:                 throw new Error(`Invalid template type: ${options.templateType}`);
184:             }
185: 
186:             // Get template metadata
187:             const metadata = EMAIL_TEMPLATE_METADATA[options.templateType];
188: 
189:             // Render the email template
190:             const htmlContent = await this.renderTemplate(options.templateType, options.data);
191: 
192:             // Generate subject line
193:             const subject = options.subject || this.generateSubject(options.templateType, options.data);
194: 
195:             // Prepare email data
196:             const emailData = {
197:                 from: options.from || `${this.config.fromName} <${this.config.fromEmail}>`,
198:                 to: Array.isArray(options.to) ? options.to : [options.to],
199:                 subject,
200:                 html: htmlContent,
201:                 replyTo: options.replyTo,
202:                 tags: {
203:                     template: options.templateType,
204:                     category: metadata.category,
205:                     priority: metadata.priority,
206:                     attempt: attempt.toString(),
207:                     queue_id: options.queueId,
208:                     ...options.tags
209:                 }
210:             };
211: 
212:             // Add tracking if enabled
213:             if (options.trackOpens !== false && metadata.trackingEnabled) {
214:                 emailData.tags.track_opens = 'true';
215:             }
216:             
217:             if (options.trackClicks !== false && metadata.trackingEnabled) {
218:                 emailData.tags.track_clicks = 'true';
219:             }
220: 
221:             this.log('debug', 'Sending email via Resend API', {
222:                 templateType: options.templateType,
223:                 recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
224:                 attempt,
225:                 queueId: options.queueId
226:             });
227: 
228:             // Send email via Resend
229:             const result = await this.resend.emails.send(emailData);
230:             const duration = Date.now() - startTime;
231: 
232:             // Log successful send
233:             this.log('info', 'Email sent successfully', {
234:                 templateType: options.templateType,
235:                 recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
236:                 emailId: result.data?.id,
237:                 attempt,
238:                 duration,
239:                 queueId: options.queueId
240:             });
241: 
242:             // Return success result
243:             return {
244:                 success: true,
245:                 emailId: result.data?.id,
246:                 retryCount: attempt - 1,
247:                 duration,
248:                 metadata: {
249:                     templateType: options.templateType,
250:                     recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
251:                     sentAt: new Date().toISOString(),
252:                     resendId: result.data?.id,
253:                     attempt,
254:                     queueId: options.queueId
255:                 }
256:             };
257: 
258:         } catch (error: any) {
259:             const duration = Date.now() - startTime;
260:             
261:             this.log('error', 'Email send attempt failed', {
262:                 templateType: options.templateType,
263:                 recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
264:                 attempt,
265:                 error: error.message,
266:                 duration,
267:                 queueId: options.queueId
268:             });
269: 
270:             // Check if we should retry
271:             if (attempt < options.retryCount && this.isRetryableError(error)) {
272:                 const delay = this.calculateRetryDelay(attempt, options.retryDelay, options.retryBackoff);
273:                 
274:                 this.log('warn', `Retrying email send in ${delay}ms`, {
275:                     templateType: options.templateType,
276:                     recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
277:                     attempt: attempt + 1,
278:                     delay,
279:                     queueId: options.queueId
280:                 });
281: 
282:                 // Wait before retry
283:                 await new Promise(resolve => setTimeout(resolve, delay));
284:                 
285:                 // Retry
286:                 return this.sendEmailWithRetry(options, startTime, attempt + 1);
287:             }
288: 
289:             // Final failure
290:             this.log('error', 'Email send failed after all retry attempts', {
291:                 templateType: options.templateType,
292:                 recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
293:                 totalAttempts: attempt,
294:                 finalError: error.message,
295:                 duration,
296:                 queueId: options.queueId
297:             });
298:             
299:             return {
300:                 success: false,
301:                 error: error.message || 'Unknown email sending error',
302:                 retryCount: attempt - 1,
303:                 duration,
304:                 metadata: {
305:                     templateType: options.templateType,
306:                     recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
307:                     sentAt: new Date().toISOString(),
308:                     attempt,
309:                     queueId: options.queueId
310:                 }
311:             };
312:         }
313:     }
314: 
315:     /**
316:      * Add email to queue for later processing
317:      */
318:     private async enqueueEmail(options: EmailSendOptions): Promise<EmailSendResult> {
319:         const queueItem: EmailQueueItem = {
320:             id: options.queueId!,
321:             options,
322:             createdAt: new Date(),
323:             scheduledAt: options.scheduleAt || new Date(),
324:             attempts: 0,
325:             status: 'pending'
326:         };
327: 
328:         this.emailQueue.set(queueItem.id, queueItem);
329: 
330:         this.log('info', 'Email queued for later processing', {
331:             templateType: options.templateType,
332:             recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
333:             queueId: queueItem.id,
334:             scheduledAt: queueItem.scheduledAt.toISOString()
335:         });
336: 
337:         return {
338:             success: true,
339:             metadata: {
340:                 templateType: options.templateType,
341:                 recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
342:                 sentAt: new Date().toISOString(),
343:                 attempt: 1,
344:                 queueId: queueItem.id
345:             }
346:         };
347:     }
348: 
349:     /**
350:      * Queue processor for scheduled and failed emails
351:      */
352:     private startQueueProcessor(): void {
353:         setInterval(async () => {
354:             if (this.isProcessing) return;
355:             
356:             this.isProcessing = true;
357:             
358:             try {
359:                 const now = new Date();
360:                 const pendingItems = Array.from(this.emailQueue.values())
361:                     .filter(item => 
362:                         (item.status === 'pending' || item.status === 'retrying') &&
363:                         item.scheduledAt <= now
364:                     )
365:                     .sort((a, b) => {
366:                         // Sort by priority and then by scheduled time
367:                         const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
368:                         const aPriority = priorityOrder[a.options.priority || 'medium'];
369:                         const bPriority = priorityOrder[b.options.priority || 'medium'];
370:                         
371:                         if (aPriority !== bPriority) {
372:                             return bPriority - aPriority; // Higher priority first
373:                         }
374:                         
375:                         return a.scheduledAt.getTime() - b.scheduledAt.getTime();
376:                     });
377: 
378:                 // Process up to 5 items at a time to respect rate limits
379:                 const itemsToProcess = pendingItems.slice(0, 5);
380: 
381:                 for (const item of itemsToProcess) {
382:                     item.status = 'processing';
383:                     item.attempts++;
384: 
385:                     try {
386:                         const result = await this.sendEmailWithRetry({
387:                             ...this.retryDefaults,
388:                             ...item.options
389:                         }, Date.now());
390: 
391:                         if (result.success) {
392:                             item.status = 'completed';
393:                             item.completedAt = new Date();
394:                             
395:                             // Remove completed items after 24 hours
396:                             setTimeout(() => {
397:                                 this.emailQueue.delete(item.id);
398:                             }, 24 * 60 * 60 * 1000);
399:                         } else {
400:                             // Retry logic for queue items
401:                             if (item.attempts < 5) {
402:                                 item.status = 'retrying';
403:                                 item.scheduledAt = new Date(Date.now() + (item.attempts * 5 * 60 * 1000)); // 5 min * attempt
404:                                 item.lastError = result.error;
405:                             } else {
406:                                 item.status = 'failed';
407:                                 item.lastError = result.error;
408:                             }
409:                         }
410:                     } catch (error: any) {
411:                         item.status = 'failed';
412:                         item.lastError = error.message;
413:                         
414:                         this.log('error', 'Queue item processing failed', {
415:                             queueId: item.id,
416:                             error: error.message,
417:                             attempts: item.attempts
418:                         });
419:                     }
420: 
421:                     // Add small delay between queue items
422:                     await new Promise(resolve => setTimeout(resolve, 100));
423:                 }
424: 
425:             } catch (error: any) {
426:                 this.log('error', 'Queue processor error', {
427:                     error: error.message
428:                 });
429:             } finally {
430:                 this.isProcessing = false;
431:             }
432:         }, 30000); // Check every 30 seconds
433:     }
434: 
435:     /**
436:      * Send Lead Confirmation Email with enhanced options
437:      */
438:     async sendLeadConfirmation(
439:         recipientEmail: string, 
440:         data: LeadConfirmationEmailData,
441:         options: Partial<EmailSendOptions> = {}
442:     ): Promise<EmailSendResult> {
443:         return this.sendTemplateEmail({
444:             templateType: 'lead_confirmation',
445:             to: recipientEmail,
446:             data,
447:             priority: 'high',
448:             ...options
449:         });
450:     }
451: 
452:     /**
453:      * Send Internal Lead Notification Email with enhanced options
454:      */
455:     async sendInternalNotification(
456:         data: InternalLeadNotificationEmailData,
457:         options: Partial<EmailSendOptions> = {}
458:     ): Promise<EmailSendResult> {
459:         return this.sendTemplateEmail({
460:             templateType: 'internal_notification',
461:             to: this.config.internalEmail,
462:             data,
463:             priority: data.priority === 'urgent' ? 'urgent' : 'high',
464:             ...options
465:         });
466:     }
467: 
468:     /**
469:      * Send Error Notification Email with enhanced options
470:      */
471:     async sendErrorNotification(
472:         data: ErrorNotificationEmailData,
473:         options: Partial<EmailSendOptions> = {}
474:     ): Promise<EmailSendResult> {
475:         const priority = data.error.severity === 'critical' ? 'urgent' : 
476:                         data.error.severity === 'high' ? 'high' : 'medium';
477: 
478:         return this.sendTemplateEmail({
479:             templateType: 'error_notification',
480:             to: this.config.adminEmail,
481:             data,
482:             subject: `🚨 ${data.error.severity.toUpperCase()} Error in ${data.system.service}`,
483:             priority,
484:             // Error emails should be sent immediately, no delays
485:             retryCount: 5,
486:             retryDelay: 500,
487:             ...options
488:         });
489:     }
490: 
491:     /**
492:      * Send Welcome Email with enhanced options
493:      */
494:     async sendWelcomeEmail(
495:         recipientEmail: string,
496:         data: WelcomeEmailData,
497:         options: Partial<EmailSendOptions> = {}
498:     ): Promise<EmailSendResult> {
499:         return this.sendTemplateEmail({
500:             templateType: 'welcome',
501:             to: recipientEmail,
502:             data,
503:             priority: 'medium',
504:             ...options
505:         });
506:     }
507: 
508:     /**
509:      * Send multiple emails in batch with enhanced queue support
510:      */
511:     async sendBatchEmails(
512:         emails: EmailSendOptions[],
513:         options: {
514:             delayBetweenEmails?: number;
515:             maxConcurrent?: number;
516:             continueOnError?: boolean;
517:             useQueue?: boolean;
518:         } = {}
519:     ): Promise<EmailSendResult[]> {
520:         const {
521:             delayBetweenEmails = 500,
522:             maxConcurrent = 2,
523:             continueOnError = true,
524:             useQueue = false
525:         } = options;
526: 
527:         if (useQueue) {
528:             // Add all emails to queue
529:             const results: EmailSendResult[] = [];
530:             for (const emailOptions of emails) {
531:                 const result = await this.enqueueEmail({
532:                     ...emailOptions,
533:                     queueId: emailOptions.queueId || this.generateId()
534:                 });
535:                 results.push(result);
536:             }
537:             return results;
538:         }
539: 
540:         // Process immediately with rate limiting
541:         const results: EmailSendResult[] = [];
542:         
543:         for (let i = 0; i < emails.length; i += maxConcurrent) {
544:             const batch = emails.slice(i, i + maxConcurrent);
545:             
546:             const batchPromises = batch.map(async (emailOptions) => {
547:                 try {
548:                     return await this.sendTemplateEmail(emailOptions);
549:                 } catch (error: any) {
550:                     if (!continueOnError) {
551:                         throw error;
552:                     }
553:                     return {
554:                         success: false,
555:                         error: error.message,
556:                         metadata: {
557:                             templateType: emailOptions.templateType,
558:                             recipientEmail: Array.isArray(emailOptions.to) ? emailOptions.to[0] : emailOptions.to,
559:                             sentAt: new Date().toISOString(),
560:                             attempt: 1
561:                         }
562:                     };
563:                 }
564:             });
565: 
566:             const batchResults = await Promise.all(batchPromises);
567:             results.push(...batchResults);
568: 
569:             // Add delay between batches
570:             if (i + maxConcurrent < emails.length) {
571:                 await new Promise(resolve => setTimeout(resolve, delayBetweenEmails));
572:             }
573:         }
574: 
575:         return results;
576:     }
577: 
578:     /**
579:      * Get comprehensive email statistics
580:      */
581:     async getEmailStats(timeframe: 'hour' | 'day' | 'week' | 'month' = 'day'): Promise<EmailStats> {
582:         const now = new Date();
583:         let cutoffTime: Date;
584: 
585:         switch (timeframe) {
586:             case 'hour':
587:                 cutoffTime = new Date(now.getTime() - (60 * 60 * 1000));
588:                 break;
589:             case 'day':
590:                 cutoffTime = new Date(now.getTime() - (24 * 60 * 60 * 1000));
591:                 break;
592:             case 'week':
593:                 cutoffTime = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
594:                 break;
595:             case 'month':
596:                 cutoffTime = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
597:                 break;
598:         }
599: 
600:         // Filter logs within timeframe
601:         const relevantLogs = this.logs.filter(log => 
602:             new Date(log.timestamp) >= cutoffTime
603:         );
604: 
605:         const sentLogs = relevantLogs.filter(log => 
606:             log.message === 'Email sent successfully'
607:         );
608: 
609:         const failedLogs = relevantLogs.filter(log => 
610:             log.message === 'Email send failed after all retry attempts'
611:         );
612: 
613:         const totalSent = sentLogs.length;
614:         const totalFailed = failedLogs.length;
615:         const successRate = totalSent + totalFailed > 0 ? 
616:             (totalSent / (totalSent + totalFailed)) * 100 : 0;
617: 
618:         // Calculate average delivery time
619:         const deliveryTimes = sentLogs
620:             .map(log => log.context.duration)
621:             .filter(duration => duration !== undefined) as number[];
622:         
623:         const averageDeliveryTime = deliveryTimes.length > 0 ?
624:             deliveryTimes.reduce((sum, time) => sum + time, 0) / deliveryTimes.length : 0;
625: 
626:         // Stats by template
627:         const byTemplate: any = {};
628:         const templates: EmailTemplateType[] = ['lead_confirmation', 'internal_notification', 'error_notification', 'welcome'];
629:         
630:         for (const template of templates) {
631:             const templateSent = sentLogs.filter(log => log.context.templateType === template).length;
632:             const templateFailed = failedLogs.filter(log => log.context.templateType === template).length;
633:             
634:             byTemplate[template] = {
635:                 sent: templateSent,
636:                 failed: templateFailed,
637:                 successRate: templateSent + templateFailed > 0 ? 
638:                     (templateSent / (templateSent + templateFailed)) * 100 : 0
639:             };
640:         }
641: 
642:         // Error analysis
643:         const errorCounts: Record<string, { count: number; lastOccurred: string }> = {};
644:         failedLogs.forEach(log => {
645:             const error = log.context.error || 'Unknown error';
646:             if (!errorCounts[error]) {
647:                 errorCounts[error] = { count: 0, lastOccurred: log.timestamp };
648:             }
649:             errorCounts[error].count++;
650:             if (new Date(log.timestamp) > new Date(errorCounts[error].lastOccurred)) {
651:                 errorCounts[error].lastOccurred = log.timestamp;
652:             }
653:         });
654: 
655:         const errors = Object.entries(errorCounts)
656:             .map(([error, data]) => ({ error, ...data }))
657:             .sort((a, b) => b.count - a.count);
658: 
659:         // Queue stats
660:         const queueStats = {
661:             pending: Array.from(this.emailQueue.values()).filter(item => item.status === 'pending').length,
662:             processing: Array.from(this.emailQueue.values()).filter(item => item.status === 'processing').length,
663:             completed: Array.from(this.emailQueue.values()).filter(item => item.status === 'completed').length,
664:             failed: Array.from(this.emailQueue.values()).filter(item => item.status === 'failed').length
665:         };
666: 
667:         return {
668:             totalSent,
669:             totalFailed,
670:             successRate,
671:             averageDeliveryTime,
672:             byTemplate,
673:             errors,
674:             queueStats
675:         };
676:     }
677: 
678:     /**
679:      * Get recent email logs
680:      */
681:     getRecentLogs(limit: number = 100, level?: 'info' | 'warn' | 'error' | 'debug'): EmailLog[] {
682:         let logs = this.logs;
683:         
684:         if (level) {
685:             logs = logs.filter(log => log.level === level);
686:         }
687:         
688:         return logs
689:             .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
690:             .slice(0, limit);
691:     }
692: 
693:     /**
694:      * Get queue status
695:      */
696:     getQueueStatus(): {
697:         totalItems: number;
698:         byStatus: Record<string, number>;
699:         oldestPending?: Date;
700:         processingRate: number;
701:     } {
702:         const items = Array.from(this.emailQueue.values());
703:         const byStatus: Record<string, number> = {};
704:         
705:         items.forEach(item => {
706:             byStatus[item.status] = (byStatus[item.status] || 0) + 1;
707:         });
708: 
709:         const pendingItems = items.filter(item => item.status === 'pending');
710:         const oldestPending = pendingItems.length > 0 ? 
711:             pendingItems.reduce((oldest, item) => 
712:                 item.createdAt < oldest.createdAt ? item : oldest
713:             ).createdAt : undefined;
714: 
715:         // Calculate processing rate (items completed in last hour)
716:         const hourAgo = new Date(Date.now() - (60 * 60 * 1000));
717:         const recentlyCompleted = items.filter(item => 
718:             item.status === 'completed' && 
719:             item.completedAt && 
720:             item.completedAt >= hourAgo
721:         ).length;
722: 
723:         return {
724:             totalItems: items.length,
725:             byStatus,
726:             oldestPending,
727:             processingRate: recentlyCompleted
728:         };
729:     }
730: 
731:     /**
732:      * Clear completed queue items
733:      */
734:     clearCompletedQueueItems(): number {
735:         const completedItems = Array.from(this.emailQueue.entries())
736:             .filter(([_, item]) => item.status === 'completed');
737:         
738:         completedItems.forEach(([id, _]) => {
739:             this.emailQueue.delete(id);
740:         });
741: 
742:         this.log('info', 'Cleared completed queue items', {
743:             clearedCount: completedItems.length
744:         });
745: 
746:         return completedItems.length;
747:     }
748: 
749:     /**
750:      * Validate email configuration with enhanced checks
751:      */
752:     async validateConfiguration(): Promise<{
753:         isValid: boolean;
754:         errors: string[];
755:         warnings: string[];
756:         apiHealth: boolean;
757:         domainVerified: boolean;
758:     }> {
759:         const errors: string[] = [];
760:         const warnings: string[] = [];
761:         let apiHealth = false;
762:         let domainVerified = false;
763: 
764:         try {
765:             // Test Resend API connection
766:             const domains = await this.resend.domains.list();
767:             apiHealth = true;
768:             
769:             // Check domain verification
770:             const configuredDomain = this.config.domain;
771:             const verifiedDomains = domains.data || [];
772:             
773:             domainVerified = verifiedDomains.some(
774:                 (domain: any) => domain.name === configuredDomain && domain.status === 'verified'
775:             );
776:             
777:             if (!domainVerified) {
778:                 warnings.push(`Domain "${configuredDomain}" is not verified. This may cause deliverability issues.`);
779:             }
780: 
781:             // Check usage limits (if available)
782:             // This would require additional API calls that may not be available in free tier
783: 
784:         } catch (error: any) {
785:             errors.push(`Resend API connection failed: ${error.message}`);
786:         }
787: 
788:         // Check queue health
789:         const queueStatus = this.getQueueStatus();
790:         if (queueStatus.byStatus.failed > 10) {
791:             warnings.push(`High number of failed queue items: ${queueStatus.byStatus.failed}`);
792:         }
793: 
794:         return {
795:             isValid: errors.length === 0,
796:             errors,
797:             warnings,
798:             apiHealth,
799:             domainVerified
800:         };
801:     }
802: 
803:     // Private helper methods
804: 
805:     private renderTemplate(templateType: EmailTemplateType, data: any): Promise<string> {
806:         let Component;
807:         
808:         switch (templateType) {
809:             case 'lead_confirmation':
810:                 Component = LeadConfirmationEmail;
811:                 break;
812:             case 'internal_notification':
813:                 Component = InternalLeadNotificationEmail;
814:                 break;
815:             case 'error_notification':
816:                 Component = ErrorNotificationEmail;
817:                 break;
818:             case 'welcome':
819:                 Component = WelcomeEmail;
820:                 break;
821:             default:
822:                 throw new Error(`Unknown template type: ${templateType}`);
823:         }
824: 
825:         return render(Component({ data }), { pretty: true });
826:     }
827: 
828:     private generateSubject(templateType: EmailTemplateType, data: any): string {
829:         const variables: Record<string, string> = {};
830: 
831:         switch (templateType) {
832:             case 'internal_notification':
833:                 variables.priority = data.priority?.toUpperCase() || 'MEDIUM';
834:                 variables.debtAmount = data.lead?.debtAmount || 'Unknown';
835:                 break;
836:             case 'error_notification':
837:                 variables.severity = data.error?.severity?.toUpperCase() || 'UNKNOWN';
838:                 variables.service = data.system?.service || 'System';
839:                 break;
840:         }
841: 
842:         return generateEmailSubject(templateType, variables);
843:     }
844: 
845:     private log(level: EmailLog['level'], message: string, context: EmailLog['context'] = {}): void {
846:         const log: EmailLog = {
847:             timestamp: new Date().toISOString(),
848:             level,
849:             message,
850:             context
851:         };
852: 
853:         this.logs.push(log);
854: 
855:         // Keep only last 1000 logs to prevent memory issues
856:         if (this.logs.length > 1000) {
857:             this.logs = this.logs.slice(-1000);
858:         }
859: 
860:         // Console output in development
861:         if (this.config.fromName.includes('Dev')) {
862:             const logMethod = level === 'error' ? console.error : 
863:                             level === 'warn' ? console.warn : 
864:                             level === 'debug' ? console.debug : console.log;
865:             
866:             logMethod(`[EmailService] ${message}`, context);
867:         }
868:     }
869: 
870:     private isRetryableError(error: any): boolean {
871:         if (!error) return false;
872:         
873:         const retryableErrors = [
874:             'timeout',
875:             'network',
876:             'connection',
877:             'ECONNRESET',
878:             'ENOTFOUND',
879:             'rate limit',
880:             '429',
881:             '500',
882:             '502',
883:             '503',
884:             '504'
885:         ];
886: 
887:         const errorMessage = error.message?.toLowerCase() || '';
888:         const errorStatus = error.status?.toString() || '';
889:         
890:         return retryableErrors.some(pattern => 
891:             errorMessage.includes(pattern) || errorStatus.includes(pattern)
892:         );
893:     }
894: 
895:     private calculateRetryDelay(
896:         attempt: number, 
897:         baseDelay: number, 
898:         backoff: 'linear' | 'exponential'
899:     ): number {
900:         if (backoff === 'exponential') {
901:             return baseDelay * Math.pow(2, attempt - 1);
902:         } else {
903:             return baseDelay * attempt;
904:         }
905:     }
906: 
907:     private generateId(): string {
908:         return `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
909:     }
910: }
911: 
912: // Singleton instance
913: let emailServiceInstance: EmailService | null = null;
914: 
915: /**
916:  * Get singleton EmailService instance
917:  */
918: export function getEmailService(): EmailService {
919:     if (!emailServiceInstance) {
920:         emailServiceInstance = new EmailService();
921:     }
922:     return emailServiceInstance;
923: }
924: 
925: // Convenience functions for common operations
926: export const emailService = {
927:     sendLeadConfirmation: async (email: string, data: LeadConfirmationEmailData, options?: Partial<EmailSendOptions>) => {
928:         return getEmailService().sendLeadConfirmation(email, data, options);
929:     },
930: 
931:     sendInternalNotification: async (data: InternalLeadNotificationEmailData, options?: Partial<EmailSendOptions>) => {
932:         return getEmailService().sendInternalNotification(data, options);
933:     },
934: 
935:     sendErrorNotification: async (data: ErrorNotificationEmailData, options?: Partial<EmailSendOptions>) => {
936:         return getEmailService().sendErrorNotification(data, options);
937:     },
938: 
939:     sendWelcomeEmail: async (email: string, data: WelcomeEmailData, options?: Partial<EmailSendOptions>) => {
940:         return getEmailService().sendWelcomeEmail(email, data, options);
941:     },
942: 
943:     validateConfiguration: async () => {
944:         return getEmailService().validateConfiguration();
945:     },
946: 
947:     getStats: async (timeframe?: 'hour' | 'day' | 'week' | 'month') => {
948:         return getEmailService().getEmailStats(timeframe);
949:     },
950: 
951:     getQueueStatus: () => {
952:         return getEmailService().getQueueStatus();
953:     },
954: 
955:     getRecentLogs: (limit?: number, level?: 'info' | 'warn' | 'error' | 'debug') => {
956:         return getEmailService().getRecentLogs(limit, level);
957:     }
958: };
959: 
960: // Export types for external use
961: export type {
962:     EmailSendResult,
963:     EmailSendOptions,
964:     EmailTemplateType,
965:     EmailStats,
966:     EmailLog,
967:     LeadConfirmationEmailData,
968:     InternalLeadNotificationEmailData,
969:     ErrorNotificationEmailData,
970:     WelcomeEmailData
971: };
```

## File: src/emails/types.ts
```typescript
  1: /**
  2:  * Email Template Data Types
  3:  * 
  4:  * TypeScript interfaces for all email template data structures
  5:  * used in the debt relief system.
  6:  */
  7: 
  8: // Base interface for all email data
  9: export interface BaseEmailData {
 10:     timestamp: string;
 11:     environment: 'development' | 'production';
 12: }
 13: 
 14: // Lead submission data from forms
 15: export interface LeadData {
 16:     id: string;
 17:     debtAmount: string;
 18:     debtType: string;
 19:     phone: string;
 20:     consentProcessing: boolean;
 21:     consentMarketing: boolean;
 22:     source: string;
 23:     ipAddress?: string;
 24:     userAgent?: string;
 25:     submittedAt: string;
 26: }
 27: 
 28: // User information for personalization
 29: export interface UserData {
 30:     id?: string;
 31:     firstName?: string;
 32:     lastName?: string;
 33:     email: string;
 34:     phone?: string;
 35:     createdAt?: string;
 36: }
 37: 
 38: // Lead confirmation email data
 39: export interface LeadConfirmationEmailData extends BaseEmailData {
 40:     user: {
 41:         firstName?: string;
 42:         email: string;
 43:         phone: string;
 44:     };
 45:     lead: {
 46:         debtAmount: string;
 47:         debtType: string;
 48:         submittedAt: string;
 49:         referenceNumber: string;
 50:     };
 51:     nextSteps: {
 52:         expectedContactTime: string;
 53:         contactMethod: string;
 54:         preparationTips: string[];
 55:     };
 56: }
 57: 
 58: // Internal notification email data
 59: export interface InternalLeadNotificationEmailData extends BaseEmailData {
 60:     lead: LeadData;
 61:     priority: 'low' | 'medium' | 'high' | 'urgent';
 62:     source: {
 63:         page: string;
 64:         campaign?: string;
 65:         referrer?: string;
 66:     };
 67:     metadata: {
 68:         ipAddress?: string;
 69:         userAgent?: string;
 70:         location?: {
 71:             city?: string;
 72:             state?: string;
 73:             country?: string;
 74:         };
 75:     };
 76:     actions: {
 77:         viewLeadUrl: string;
 78:         callLeadUrl: string;
 79:         emailLeadUrl: string;
 80:     };
 81: }
 82: 
 83: // Error notification email data
 84: export interface ErrorNotificationEmailData extends BaseEmailData {
 85:     error: {
 86:         message: string;
 87:         stack?: string;
 88:         code?: string;
 89:         type: 'api_error' | 'database_error' | 'email_error' | 'validation_error' | 'system_error';
 90:         severity: 'low' | 'medium' | 'high' | 'critical';
 91:     };
 92:     context: {
 93:         endpoint?: string;
 94:         method?: string;
 95:         userId?: string;
 96:         leadId?: string;
 97:         requestId?: string;
 98:         userAgent?: string;
 99:         ipAddress?: string;
100:     };
101:     system: {
102:         service: string;
103:         version: string;
104:         environment: 'development' | 'production';
105:         hostname?: string;
106:     };
107:     actions: {
108:         dashboardUrl: string;
109:         logsUrl: string;
110:         documentsUrl: string;
111:     };
112: }
113: 
114: // Welcome email data
115: export interface WelcomeEmailData extends BaseEmailData {
116:     user: UserData;
117:     account: {
118:         type: 'basic' | 'premium';
119:         createdAt: string;
120:         activationRequired: boolean;
121:         activationUrl?: string;
122:     };
123:     onboarding: {
124:         steps: Array<{
125:             title: string;
126:             description: string;
127:             url: string;
128:             completed: boolean;
129:         }>;
130:         estimatedTime: string;
131:     };
132:     resources: {
133:         supportUrl: string;
134:         documentationUrl: string;
135:         communityUrl: string;
136:     };
137: }
138: 
139: // Email tracking data
140: export interface EmailTrackingData {
141:     emailId: string;
142:     templateType: 'lead_confirmation' | 'internal_notification' | 'error_notification' | 'welcome';
143:     recipientEmail: string;
144:     userId?: string;
145:     leadId?: string;
146:     sentAt: string;
147:     clickTrackingEnabled: boolean;
148:     openTrackingEnabled: boolean;
149: }
150: 
151: // Helper types for form processing
152: export type DebtAmountRange = '10000-15000' | '15000-25000' | '25000-50000' | '50000+';
153: export type DebtType = 'credit-cards' | 'personal-loans' | 'medical' | 'mixed';
154: export type FormSource = 'qualification-form' | 'full-form' | 'landing-page' | 'api';
155: 
156: // Utility functions for type processing
157: export const debtAmountDisplayMap: Record<DebtAmountRange, string> = {
158:     '10000-15000': '$10,000 - $15,000',
159:     '15000-25000': '$15,000 - $25,000',
160:     '25000-50000': '$25,000 - $50,000',
161:     '50000+': '$50,000+'
162: };
163: 
164: export const debtTypeDisplayMap: Record<DebtType, string> = {
165:     'credit-cards': 'Credit Cards',
166:     'personal-loans': 'Personal Loans',
167:     'medical': 'Medical Debt',
168:     'mixed': 'Mixed Unsecured Debt'
169: };
170: 
171: // Priority calculation helpers
172: export function calculateLeadPriority(lead: LeadData): 'low' | 'medium' | 'high' | 'urgent' {
173:     const debtAmount = lead.debtAmount as DebtAmountRange;
174:     const hasMarketing = lead.consentMarketing;
175:     
176:     // Higher debt amounts get higher priority
177:     if (debtAmount === '50000+') {
178:         return hasMarketing ? 'urgent' : 'high';
179:     } else if (debtAmount === '25000-50000') {
180:         return hasMarketing ? 'high' : 'medium';
181:     } else if (debtAmount === '15000-25000') {
182:         return hasMarketing ? 'medium' : 'low';
183:     } else {
184:         return 'low';
185:     }
186: }
187: 
188: // Expected contact time calculation
189: export function calculateExpectedContactTime(priority: string): string {
190:     switch (priority) {
191:         case 'urgent':
192:             return 'within 1 business hour';
193:         case 'high':
194:             return 'within 4 business hours';
195:         case 'medium':
196:             return 'within 1 business day';
197:         case 'low':
198:         default:
199:             return 'within 2 business days';
200:     }
201: }
202: 
203: // Format phone number for display
204: export function formatPhoneForDisplay(phone: string): string {
205:     const cleaned = phone.replace(/\D/g, '');
206:     if (cleaned.length === 10) {
207:         return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
208:     }
209:     return phone;
210: }
211: 
212: // Generate reference number for leads
213: export function generateReferenceNumber(leadId: string): string {
214:     const timestamp = Date.now().toString(36).toUpperCase();
215:     const leadPrefix = leadId.slice(-4).toUpperCase();
216:     return `DR-${timestamp}-${leadPrefix}`;
217: }
```

## File: src/pages/api/csrf-token.ts
```typescript
 1: // CSRF Token API endpoint
 2: // GET /api/csrf-token - Provides CSRF tokens for form submissions
 3: 
 4: import type { APIRoute } from 'astro';
 5: import { getCSRFTokenForForm } from '../../utils/csrf';
 6: 
 7: export const prerender = false;
 8: 
 9: export const GET: APIRoute = async ({ request }) => {
10:     try {
11:         const { token, sessionId } = await getCSRFTokenForForm(request);
12:         
13:         return new Response(
14:             JSON.stringify({
15:                 success: true,
16:                 token,
17:                 sessionId,
18:                 expiresIn: 3600000 // 1 hour in milliseconds
19:             }),
20:             {
21:                 status: 200,
22:                 headers: { 
23:                     'Content-Type': 'application/json',
24:                     'Cache-Control': 'no-store, no-cache, must-revalidate',
25:                     'Pragma': 'no-cache',
26:                     'Expires': '0'
27:                 }
28:             }
29:         );
30:     } catch (error) {
31:         console.error('CSRF token generation error:', error);
32:         return new Response(
33:             JSON.stringify({
34:                 success: false,
35:                 message: 'Failed to generate CSRF token'
36:             }),
37:             {
38:                 status: 500,
39:                 headers: { 'Content-Type': 'application/json' }
40:             }
41:         );
42:     }
43: };
44: 
45: // Prevent other HTTP methods
46: export const POST: APIRoute = async () => {
47:     return new Response(
48:         JSON.stringify({
49:             success: false,
50:             message: 'Method not allowed. Use GET to retrieve CSRF token.'
51:         }),
52:         {
53:             status: 405,
54:             headers: { 
55:                 'Content-Type': 'application/json',
56:                 'Allow': 'GET'
57:             }
58:         }
59:     );
60: };
61: 
62: export const PUT: APIRoute = POST;
63: export const DELETE: APIRoute = POST;
64: export const PATCH: APIRoute = POST;
```

## File: src/pages/api/email-analytics.ts
```typescript
  1: // Email Analytics and Monitoring API Endpoint
  2: // GET /api/email-analytics - Retrieve email delivery statistics and monitoring data
  3: 
  4: import type { APIRoute } from 'astro';
  5: import { supabaseAdmin } from '../../utils/supabase';
  6: import { emailService } from '../../emails/service';
  7: 
  8: export const prerender = false;
  9: 
 10: // Email analytics interfaces
 11: interface EmailAnalytics {
 12:     timeframe: string;
 13:     totalEmails: number;
 14:     deliveryStats: {
 15:         sent: number;
 16:         delivered: number;
 17:         bounced: number;
 18:         complained: number;
 19:         opened: number;
 20:         clicked: number;
 21:         deliveryRate: number;
 22:         bounceRate: number;
 23:         openRate: number;
 24:         clickRate: number;
 25:     };
 26:     templateStats: Record<string, {
 27:         sent: number;
 28:         delivered: number;
 29:         bounced: number;
 30:         openRate: number;
 31:         clickRate: number;
 32:     }>;
 33:     recentErrors: Array<{
 34:         timestamp: string;
 35:         emailType: string;
 36:         error: string;
 37:         recipientEmail: string;
 38:     }>;
 39:     queueStatus: {
 40:         pending: number;
 41:         processing: number;
 42:         completed: number;
 43:         failed: number;
 44:     };
 45:     usageStats: {
 46:         currentMonth: string;
 47:         emailsThisMonth: number;
 48:         remainingQuota: number;
 49:         percentageUsed: number;
 50:     };
 51: }
 52: 
 53: // Helper function to calculate rates
 54: function calculateRate(numerator: number, denominator: number): number {
 55:     if (denominator === 0) return 0;
 56:     return Math.round((numerator / denominator) * 100);
 57: }
 58: 
 59: // Get email analytics from database
 60: async function getEmailAnalyticsFromDB(timeframe: 'hour' | 'day' | 'week' | 'month'): Promise<Partial<EmailAnalytics>> {
 61:     try {
 62:         const now = new Date();
 63:         let cutoffTime: Date;
 64: 
 65:         switch (timeframe) {
 66:             case 'hour':
 67:                 cutoffTime = new Date(now.getTime() - (60 * 60 * 1000));
 68:                 break;
 69:             case 'day':
 70:                 cutoffTime = new Date(now.getTime() - (24 * 60 * 60 * 1000));
 71:                 break;
 72:             case 'week':
 73:                 cutoffTime = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
 74:                 break;
 75:             case 'month':
 76:                 cutoffTime = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
 77:                 break;
 78:         }
 79: 
 80:         // Get email tracking data within timeframe
 81:         const { data: trackingData, error: trackingError } = await supabaseAdmin
 82:             .from('email_tracking')
 83:             .select('*')
 84:             .gte('created_at', cutoffTime.toISOString())
 85:             .order('created_at', { ascending: false });
 86: 
 87:         if (trackingError) {
 88:             console.error('Error fetching email tracking data:', trackingError);
 89:             return {};
 90:         }
 91: 
 92:         const emails = trackingData || [];
 93:         const totalEmails = emails.length;
 94: 
 95:         // Calculate delivery statistics
 96:         const sent = emails.filter(e => e.status && !['failed', 'pending'].includes(e.status)).length;
 97:         const delivered = emails.filter(e => e.status === 'delivered').length;
 98:         const bounced = emails.filter(e => e.status === 'bounced').length;
 99:         const complained = emails.filter(e => e.status === 'complained').length;
100:         const opened = emails.filter(e => e.opened_at).length;
101:         const clicked = emails.filter(e => e.clicked_at).length;
102: 
103:         const deliveryStats = {
104:             sent,
105:             delivered,
106:             bounced,
107:             complained,
108:             opened,
109:             clicked,
110:             deliveryRate: calculateRate(delivered, sent),
111:             bounceRate: calculateRate(bounced, sent),
112:             openRate: calculateRate(opened, delivered || sent),
113:             clickRate: calculateRate(clicked, opened || delivered || sent)
114:         };
115: 
116:         // Calculate template-specific statistics
117:         const templateStats: Record<string, any> = {};
118:         const templateTypes = ['lead_confirmation', 'internal_notification', 'error_notification', 'welcome'];
119:         
120:         templateTypes.forEach(templateType => {
121:             const templateEmails = emails.filter(e => e.email_type === templateType);
122:             const templateSent = templateEmails.filter(e => e.status && !['failed', 'pending'].includes(e.status)).length;
123:             const templateDelivered = templateEmails.filter(e => e.status === 'delivered').length;
124:             const templateBounced = templateEmails.filter(e => e.status === 'bounced').length;
125:             const templateOpened = templateEmails.filter(e => e.opened_at).length;
126:             const templateClicked = templateEmails.filter(e => e.clicked_at).length;
127: 
128:             templateStats[templateType] = {
129:                 sent: templateSent,
130:                 delivered: templateDelivered,
131:                 bounced: templateBounced,
132:                 openRate: calculateRate(templateOpened, templateDelivered || templateSent),
133:                 clickRate: calculateRate(templateClicked, templateOpened || templateDelivered || templateSent)
134:             };
135:         });
136: 
137:         // Get recent errors
138:         const recentErrors = emails
139:             .filter(e => e.error_message)
140:             .slice(0, 10)
141:             .map(e => ({
142:                 timestamp: e.created_at,
143:                 emailType: e.email_type,
144:                 error: e.error_message,
145:                 recipientEmail: e.recipient_email === 'internal' ? 'Internal Team' : 
146:                               e.recipient_email ? e.recipient_email.replace(/(.{2}).*@/, '$1***@') : 'Unknown'
147:             }));
148: 
149:         // Calculate usage statistics for current month
150:         const currentMonth = now.toISOString().substring(0, 7); // YYYY-MM format
151:         const { data: monthlyEmails, error: monthlyError } = await supabaseAdmin
152:             .from('email_tracking')
153:             .select('id')
154:             .gte('created_at', `${currentMonth}-01`)
155:             .lt('created_at', `${currentMonth}-31`);
156: 
157:         const emailsThisMonth = monthlyEmails?.length || 0;
158:         const freeQuota = 3000; // Resend free tier
159:         const remainingQuota = Math.max(0, freeQuota - emailsThisMonth);
160:         const percentageUsed = Math.round((emailsThisMonth / freeQuota) * 100);
161: 
162:         return {
163:             timeframe,
164:             totalEmails,
165:             deliveryStats,
166:             templateStats,
167:             recentErrors,
168:             usageStats: {
169:                 currentMonth,
170:                 emailsThisMonth,
171:                 remainingQuota,
172:                 percentageUsed
173:             }
174:         };
175: 
176:     } catch (error) {
177:         console.error('Error calculating email analytics:', error);
178:         return {};
179:     }
180: }
181: 
182: export const GET: APIRoute = async ({ request, url }) => {
183:     const requestId = `analytics_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
184:     const startTime = Date.now();
185: 
186:     try {
187:         // Check authorization (basic API key check)
188:         const authHeader = request.headers.get('authorization');
189:         const apiKey = url.searchParams.get('api_key') || authHeader?.replace('Bearer ', '');
190:         
191:         // Simple API key validation (in production, use proper auth)
192:         const validApiKey = import.meta.env.EMAIL_ANALYTICS_API_KEY;
193:         if (validApiKey && apiKey !== validApiKey) {
194:             return new Response(
195:                 JSON.stringify({
196:                     success: false,
197:                     message: 'Invalid API key'
198:                 }),
199:                 {
200:                     status: 401,
201:                     headers: { 'Content-Type': 'application/json' }
202:                 }
203:             );
204:         }
205: 
206:         // Parse query parameters
207:         const timeframe = (url.searchParams.get('timeframe') || 'day') as 'hour' | 'day' | 'week' | 'month';
208:         const includeQueue = url.searchParams.get('include_queue') === 'true';
209:         const includeService = url.searchParams.get('include_service') === 'true';
210: 
211:         console.log(`[${requestId}] Fetching email analytics:`, {
212:             timeframe,
213:             includeQueue,
214:             includeService
215:         });
216: 
217:         // Validate timeframe parameter
218:         if (!['hour', 'day', 'week', 'month'].includes(timeframe)) {
219:             return new Response(
220:                 JSON.stringify({
221:                     success: false,
222:                     message: 'Invalid timeframe. Use: hour, day, week, or month'
223:                 }),
224:                 {
225:                     status: 400,
226:                     headers: { 'Content-Type': 'application/json' }
227:                 }
228:             );
229:         }
230: 
231:         // Get analytics from database
232:         const dbAnalytics = await getEmailAnalyticsFromDB(timeframe);
233: 
234:         // Get queue status from email service if requested
235:         let queueStatus = { pending: 0, processing: 0, completed: 0, failed: 0 };
236:         if (includeQueue) {
237:             try {
238:                 queueStatus = emailService.getQueueStatus();
239:             } catch (queueError) {
240:                 console.error(`[${requestId}] Failed to get queue status:`, queueError);
241:             }
242:         }
243: 
244:         // Get service statistics if requested
245:         let serviceStats = null;
246:         if (includeService) {
247:             try {
248:                 serviceStats = await emailService.getStats(timeframe);
249:             } catch (serviceError) {
250:                 console.error(`[${requestId}] Failed to get service stats:`, serviceError);
251:             }
252:         }
253: 
254:         // Combine analytics
255:         const analytics: EmailAnalytics = {
256:             timeframe,
257:             totalEmails: dbAnalytics.totalEmails || 0,
258:             deliveryStats: dbAnalytics.deliveryStats || {
259:                 sent: 0,
260:                 delivered: 0,
261:                 bounced: 0,
262:                 complained: 0,
263:                 opened: 0,
264:                 clicked: 0,
265:                 deliveryRate: 0,
266:                 bounceRate: 0,
267:                 openRate: 0,
268:                 clickRate: 0
269:             },
270:             templateStats: dbAnalytics.templateStats || {},
271:             recentErrors: dbAnalytics.recentErrors || [],
272:             queueStatus,
273:             usageStats: dbAnalytics.usageStats || {
274:                 currentMonth: new Date().toISOString().substring(0, 7),
275:                 emailsThisMonth: 0,
276:                 remainingQuota: 3000,
277:                 percentageUsed: 0
278:             }
279:         };
280: 
281:         // Add service statistics if available
282:         if (serviceStats) {
283:             analytics.serviceStats = serviceStats;
284:         }
285: 
286:         const processingTime = Date.now() - startTime;
287:         console.log(`[${requestId}] Analytics generated in ${processingTime}ms`);
288: 
289:         return new Response(
290:             JSON.stringify({
291:                 success: true,
292:                 data: analytics,
293:                 metadata: {
294:                     requestId,
295:                     generatedAt: new Date().toISOString(),
296:                     processingTime
297:                 }
298:             }),
299:             {
300:                 status: 200,
301:                 headers: {
302:                     'Content-Type': 'application/json',
303:                     'X-Processing-Time': processingTime.toString(),
304:                     'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
305:                 }
306:             }
307:         );
308: 
309:     } catch (error) {
310:         const processingTime = Date.now() - startTime;
311:         console.error(`[${requestId}] Analytics error (${processingTime}ms):`, error);
312: 
313:         return new Response(
314:             JSON.stringify({
315:                 success: false,
316:                 message: 'Failed to generate email analytics',
317:                 error: error instanceof Error ? error.message : 'Unknown error',
318:                 requestId
319:             }),
320:             {
321:                 status: 500,
322:                 headers: {
323:                     'Content-Type': 'application/json',
324:                     'X-Processing-Time': processingTime.toString()
325:                 }
326:             }
327:         );
328:     }
329: };
330: 
331: // Health check endpoint for analytics service
332: export const HEAD: APIRoute = async () => {
333:     try {
334:         // Quick health check - verify database connection
335:         await supabaseAdmin.from('email_tracking').select('count').limit(1);
336:         
337:         return new Response(null, {
338:             status: 200,
339:             headers: {
340:                 'X-Service-Status': 'healthy',
341:                 'X-Service-Name': 'email-analytics'
342:             }
343:         });
344:     } catch (error) {
345:         return new Response(null, {
346:             status: 503,
347:             headers: {
348:                 'X-Service-Status': 'unhealthy',
349:                 'X-Service-Name': 'email-analytics'
350:             }
351:         });
352:     }
353: };
354: 
355: // Handle unsupported methods
356: const methodNotAllowed: APIRoute = async () => {
357:     return new Response(
358:         JSON.stringify({
359:             success: false,
360:             message: 'Method not allowed. Use GET for analytics data.',
361:             allowedMethods: ['GET', 'HEAD']
362:         }),
363:         {
364:             status: 405,
365:             headers: {
366:                 'Content-Type': 'application/json',
367:                 'Allow': 'GET, HEAD'
368:             }
369:         }
370:     );
371: };
372: 
373: export const POST: APIRoute = methodNotAllowed;
374: export const PUT: APIRoute = methodNotAllowed;
375: export const DELETE: APIRoute = methodNotAllowed;
376: export const PATCH: APIRoute = methodNotAllowed;
```

## File: src/pages/api/email-usage.ts
```typescript
  1: // API endpoint for email usage monitoring and statistics
  2: // GET /api/email-usage - Get current email usage statistics for Resend free tier monitoring
  3: 
  4: import type { APIRoute } from 'astro';
  5: import { getEmailUsageStats, checkEmailLimits } from '../../utils/email';
  6: import { supabaseAdmin } from '../../utils/supabase';
  7: 
  8: export const prerender = false;
  9: 
 10: export const GET: APIRoute = async ({ request }) => {
 11:     try {
 12:         // Get current email usage statistics
 13:         const usageStats = await getEmailUsageStats();
 14:         const limitCheck = await checkEmailLimits();
 15:         
 16:         if (!usageStats) {
 17:             return new Response(
 18:                 JSON.stringify({
 19:                     success: false,
 20:                     message: 'Unable to fetch email usage statistics',
 21:                     error: 'Database query failed'
 22:                 }),
 23:                 {
 24:                     status: 500,
 25:                     headers: { 'Content-Type': 'application/json' }
 26:                 }
 27:             );
 28:         }
 29: 
 30:         // Get additional statistics from the database
 31:         let monthlyBreakdown = null;
 32:         try {
 33:             const { data: monthlyData, error: monthlyError } = await supabaseAdmin
 34:                 .from('email_usage_stats')
 35:                 .select('*')
 36:                 .order('month_year', { ascending: false })
 37:                 .limit(6); // Last 6 months
 38: 
 39:             if (monthlyError) {
 40:                 console.error('Failed to fetch monthly breakdown:', monthlyError);
 41:             } else {
 42:                 monthlyBreakdown = monthlyData;
 43:             }
 44:         } catch (error) {
 45:             console.error('Error fetching monthly breakdown:', error);
 46:         }
 47: 
 48:         // Prepare response data
 49:         const responseData = {
 50:             success: true,
 51:             currentMonth: {
 52:                 month: usageStats.currentMonth,
 53:                 emailsSent: usageStats.emailsSent,
 54:                 remainingEmails: usageStats.remainingEmails,
 55:                 percentageUsed: Math.round(usageStats.percentageUsed * 100) / 100,
 56:                 freeTierLimit: 3000,
 57:                 status: limitCheck.canSend ? (
 58:                     usageStats.isCritical ? 'CRITICAL' :
 59:                     usageStats.isNearLimit ? 'WARNING' : 'OK'
 60:                 ) : 'LIMIT_EXCEEDED'
 61:             },
 62:             limits: {
 63:                 canSendEmails: limitCheck.canSend,
 64:                 limitReason: limitCheck.reason || null,
 65:                 isNearLimit: usageStats.isNearLimit,
 66:                 isCritical: usageStats.isCritical
 67:             },
 68:             monthlyBreakdown,
 69:             timestamp: new Date().toISOString()
 70:         };
 71: 
 72:         return new Response(
 73:             JSON.stringify(responseData),
 74:             {
 75:                 status: 200,
 76:                 headers: { 
 77:                     'Content-Type': 'application/json',
 78:                     'Cache-Control': 'no-cache, no-store, must-revalidate'
 79:                 }
 80:             }
 81:         );
 82: 
 83:     } catch (error) {
 84:         console.error('Email usage API error:', error);
 85:         
 86:         return new Response(
 87:             JSON.stringify({
 88:                 success: false,
 89:                 message: 'Failed to fetch email usage statistics',
 90:                 error: error instanceof Error ? error.message : 'Unknown error'
 91:             }),
 92:             {
 93:                 status: 500,
 94:                 headers: { 'Content-Type': 'application/json' }
 95:             }
 96:         );
 97:     }
 98: };
 99: 
100: // Handle unsupported methods
101: export const POST: APIRoute = async () => {
102:     return new Response(
103:         JSON.stringify({
104:             success: false,
105:             message: 'Method not allowed. Use GET to fetch email usage statistics.'
106:         }),
107:         {
108:             status: 405,
109:             headers: { 
110:                 'Content-Type': 'application/json',
111:                 'Allow': 'GET'
112:             }
113:         }
114:     );
115: };
116: 
117: // Export other methods as not allowed
118: export const PUT: APIRoute = POST;
119: export const DELETE: APIRoute = POST;
120: export const PATCH: APIRoute = POST;
```

## File: src/pages/blobs/_components/NewShape.tsx
```typescript
 1: import { useState, useEffect } from 'react';
 2: import type { Dispatch, SetStateAction } from 'react';
 3: import ShapePreview from './ShapePreview.tsx';
 4: import { generateBlob, uploadDisabled } from '../../../utils';
 5: import type { BlobProps } from '../../../types.ts';
 6: 
 7: interface Props {
 8:     setLastMutationTime?: Dispatch<SetStateAction<number>>;
 9: }
10: 
11: export default function NewShape(props: Props) {
12:     const { setLastMutationTime } = props;
13:     const [blobData, setBlobData] = useState<BlobProps>();
14:     const [wasUploaded, setWasUploaded] = useState<boolean>(false);
15: 
16:     const randomizeBlob = () => {
17:         setBlobData(generateBlob());
18:         setWasUploaded(false);
19:     };
20: 
21:     const uploadBlob = async () => {
22:         const response = await fetch('/api/blobs', {
23:             method: 'POST',
24:             headers: { 'Content-Type': 'application/json' },
25:             body: JSON.stringify(blobData.parameters)
26:         });
27:         const data = await response.json();
28:         if (data.message) {
29:             console.log(data.message);
30:         }
31:         setWasUploaded(true);
32:         setLastMutationTime(Date.now());
33:     };
34: 
35:     useEffect(() => {
36:         if (!blobData) {
37:             randomizeBlob();
38:         }
39:     }, [blobData]);
40: 
41:     return (
42:         <>
43:             <h2 className="mb-4 text-xl text-center sm:text-xl">New Random Shape</h2>
44:             <div className="w-full mb-6 bg-white rounded-lg">
45:                 <div className="p-4 text-center text-gray-900 border-b border-gray-200 min-h-14">{blobData && <span>{blobData.parameters?.name}</span>}</div>
46:                 <div className="p-4 aspect-square text-primary">{blobData && <ShapePreview {...blobData} />}</div>
47:             </div>
48:             <div className="flex flex-wrap justify-center gap-4">
49:                 <button className="btn" onClick={randomizeBlob}>
50:                     Randomize
51:                 </button>
52:                 <button className="btn" onClick={uploadBlob} disabled={uploadDisabled || wasUploaded || !blobData}>
53:                     Upload
54:                 </button>
55:             </div>
56:         </>
57:     );
58: }
```

## File: src/pages/blobs/_components/StoredShapes.tsx
```typescript
 1: import { useState, useEffect } from 'react';
 2: import ShapePreview from './ShapePreview.tsx';
 3: import { generateBlob } from '../../../utils';
 4: import type { BlobProps } from '../../../types.ts';
 5: 
 6: interface Props {
 7:     lastMutationTime: number;
 8: }
 9: 
10: export default function StoredShapes(props: Props) {
11:     const { lastMutationTime } = props;
12:     const [keys, setKeys] = useState<string[]>([]);
13:     const [selectedKey, setSelectedKey] = useState<string>(null);
14:     const [previewData, setPreviewData] = useState<BlobProps>(null);
15: 
16:     const getBlobKeyList = async () => {
17:         console.log('Fetching keys...');
18:         const response = await fetch('/api/blobs', {
19:             method: 'GET',
20:             headers: { 'Content-Type': 'application/json' }
21:         });
22:         const data = await response.json();
23:         if (data.keys) {
24:             setKeys(data.keys);
25:         }
26:     };
27: 
28:     const getBlobByKey = async (key: string) => {
29:         setSelectedKey(key);
30:         const params = new URLSearchParams({ key });
31:         const response = await fetch(`/api/blob/?${params}`, {
32:             method: 'GET'
33:         });
34:         const data = await response.json();
35:         if (data.blob) {
36:             setPreviewData(generateBlob(data.blob));
37:         }
38:     };
39: 
40:     useEffect(() => {
41:         getBlobKeyList();
42:     }, [lastMutationTime]);
43: 
44:     return (
45:         <>
46:             <h2 className="mb-4 text-xl text-center sm:text-xl">Objects in Blob Store</h2>
47:             <div className="w-full bg-white rounded-lg">
48:                 <div className="p-4 text-center min-h-14">
49:                     {keys?.length ? (
50:                         <div className="space-y-1">
51:                             {keys.map((keyName) => (
52:                                 <button
53:                                     key={keyName}
54:                                     className={
55:                                         'inline-flex items-center justify-center w-full px-4 py-1.5 rounded-sm text-sm text-gray-900 cursor-pointer text-center transition hover:bg-complementary/20' +
56:                                         (selectedKey === keyName ? ' bg-complementary/20 pointer-events-none' : '')
57:                                     }
58:                                     onClick={() => {
59:                                         getBlobByKey(keyName);
60:                                     }}
61:                                 >
62:                                     {keyName}
63:                                 </button>
64:                             ))}
65:                         </div>
66:                     ) : (
67:                         <span className="text-gray-900">Please upload some shapes!</span>
68:                     )}
69:                 </div>
70:                 {previewData && (
71:                     <div className="p-4 border-t border-gray-200 aspect-square text-primary">
72:                         <ShapePreview {...previewData} />
73:                     </div>
74:                 )}
75:             </div>
76:         </>
77:     );
78: }
```

## File: src/pages/blobs/index.astro
```
 1: ---
 2: import Layout from '../../layouts/Layout.astro';
 3: import Markdown from '../../components/Markdown.astro';
 4: import ShapeEditor from './_components/ShapeEditor.tsx';
 5: import { uploadDisabled } from '../../utils';
 6: import ContextAlert from '../../components/ContextAlert.astro';
 7: 
 8: const explainer = `
 9: [Netlify Blobs](https://docs.netlify.com/blobs/overview/) provides an object store for any kind of data, be it JSON, binary, 
10: or [really](https://mk.gg/projects/chalkstream) anything else ([really!](https://mk.gg/projects/turbofan)). In this example, the blob store is used to **hold the data of user-generated random blobby shapes**.
11: 
12: Below is an Astro island with a React component for editing, uploading and viewing blobs to the blob store 🙂.
13: `;
14: 
15: const uploadDisabledText = `
16: User uploads are disabled in this site. To run your own and try it out: 
17: <a href="https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/astro-platform-starter">
18: <img src="https://www.netlify.com/img/deploy/button.svg" style="display: inline;" alt="Deploy to Netlify" />
19: </a>
20: `;
21: ---
22: 
23: <Layout title="Blobs">
24:     <ContextAlert
25:         addedChecksFunction={() => {
26:             return uploadDisabled ? uploadDisabledText : null;
27:         }}
28:         class="mb-8"
29:     />
30:     <h1 class="mb-10">Blobs x Blobs</h1>
31:     <Markdown content={explainer} class="mb-12" />
32:     <ShapeEditor client:load />
33: </Layout>
```

## File: src/pages/data-rights/index.astro
```
 1: ---
 2: import LandingLayout from '../../layouts/LandingLayout.astro';
 3: import DataRightsForm from '../../components/DataRightsForm.astro';
 4: ---
 5: 
 6: <LandingLayout title="Your Data Rights | Debt Freedom Toolkit">
 7:     <section class="py-12 sm:py-16">
 8:         <div class="max-w-4xl mx-auto">
 9:             <h1 class="mb-8 text-4xl font-bold text-[#2d7984]">Your Privacy Rights</h1>
10:             
11:             <div class="prose prose-lg max-w-none mb-12">
12:                 <p class="text-lg text-gray-700 mb-6">
13:                     Under GDPR and other privacy regulations, you have certain rights regarding your personal data. 
14:                     Use the form below to exercise these rights or contact us with any privacy concerns.
15:                 </p>
16:                 
17:                 <div class="bg-blue-50 border-l-4 border-[#2d7984] p-6 mb-8">
18:                     <h2 class="text-xl font-semibold text-[#2d7984] mb-4">Your Privacy Rights Include:</h2>
19:                     <ul class="space-y-2 text-gray-700">
20:                         <li><strong>Right of Access:</strong> Request a copy of all personal data we have about you</li>
21:                         <li><strong>Right to be Forgotten:</strong> Request permanent deletion of your personal data</li>
22:                         <li><strong>Right to Rectification:</strong> Request correction of inaccurate personal data</li>
23:                         <li><strong>Right to Restrict Processing:</strong> Request limitation of how we process your data</li>
24:                         <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
25:                         <li><strong>Right to Object:</strong> Object to processing of your data for marketing purposes</li>
26:                     </ul>
27:                 </div>
28:                 
29:                 <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
30:                     <h3 class="text-lg font-semibold text-yellow-800 mb-2">⚠️ Important Information</h3>
31:                     <ul class="space-y-2 text-yellow-700">
32:                         <li><strong>Data Deletion:</strong> Once deleted, your data cannot be recovered. This action is permanent.</li>
33:                         <li><strong>Verification:</strong> We may require additional verification for security purposes.</li>
34:                         <li><strong>Response Time:</strong> We will respond to your request within 30 days as required by law.</li>
35:                         <li><strong>Email Confirmation:</strong> You will receive an email confirmation when your request is processed.</li>
36:                     </ul>
37:                 </div>
38:             </div>
39:             
40:             <!-- Data Rights Request Form -->
41:             <DataRightsForm />
42:             
43:             <div class="mt-12 border-t pt-8">
44:                 <h2 class="text-2xl font-semibold text-[#2d7984] mb-4">Alternative Contact Methods</h2>
45:                 <div class="bg-gray-50 p-6 rounded-lg">
46:                     <p class="mb-4">If you prefer not to use the online form, you can contact us directly:</p>
47:                     <div class="space-y-2">
48:                         <p><strong>Email:</strong> privacy@your-domain.com</p>
49:                         <p><strong>Phone:</strong> (800) 555-1234</p>
50:                         <p><strong>Mail:</strong> Data Protection Officer<br>
51:                         123 Financial Way, Suite 500<br>
52:                         Clearwater, FL 33759</p>
53:                     </div>
54:                 </div>
55:             </div>
56:             
57:             <div class="mt-8 text-center">
58:                 <a href="/privacy-policy" class="text-[#2d7984] hover:text-[#1d5058] underline mr-6">
59:                     Read Our Privacy Policy
60:                 </a>
61:                 <a href="/debt-relief" class="btn bg-[#2d7984] text-white hover:bg-[#1d5058]">
62:                     Back to Debt Relief
63:                 </a>
64:             </div>
65:         </div>
66:     </section>
67: </LandingLayout>
```

## File: src/pages/edge/australia/index.astro
```
1: ---
2: import Layout from '../../../layouts/Layout.astro';
3: import EdgeFunctionExplainer from '../../../components/EdgeFunctionExplainer.astro';
4: ---
5: 
6: <Layout title="In Australia">
7:     <h1 class="mb-10">You are in Australia!</h1>
8:     <EdgeFunctionExplainer />
9: </Layout>
```

## File: src/pages/edge/not-australia/index.astro
```
1: ---
2: import Layout from '../../../layouts/Layout.astro';
3: import EdgeFunctionExplainer from '../../../components/EdgeFunctionExplainer.astro';
4: ---
5: 
6: <Layout title="Not Australia">
7:     <h1 class="mb-10">You&apos;re not in Australia!</h1>
8:     <EdgeFunctionExplainer />
9: </Layout>
```

## File: src/pages/terms-of-service/index.astro
```
 1: ---
 2: import LandingLayout from '../../layouts/LandingLayout.astro';
 3: ---
 4: 
 5: <LandingLayout title="Terms of Service | Debt Freedom Toolkit">
 6:     <section class="py-12 sm:py-16">
 7:         <h1 class="mb-8 text-4xl font-bold">Terms of Service</h1>
 8:         
 9:         <div class="prose prose-invert max-w-none">
10:             <p class="mb-6">Last Updated: May 20, 2025</p>
11:             
12:             <h2 class="mt-8 mb-4 text-2xl font-semibold">1. Acceptance of Terms</h2>
13:             <p>By accessing and using the services provided by Debt Freedom Toolkit ("we," "us," or "our") through our website at debtfreedomtoolkit.com (the "Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use our services.</p>
14:             
15:             <h2 class="mt-8 mb-4 text-2xl font-semibold">2. Description of Services</h2>
16:             <p>Debt Freedom Toolkit provides debt settlement services that aim to help individuals reduce their unsecured debt through negotiation with creditors. Our services include debt analysis, personalized debt reduction plans, creditor negotiation, and client support throughout the debt settlement process.</p>
17:             
18:             <h2 class="mt-8 mb-4 text-2xl font-semibold">3. Eligibility Requirements</h2>
19:             <p>To be eligible for our services, you must:</p>
20:             <ul class="list-disc pl-8 mb-6">
21:                 <li>Be at least 18 years of age</li>
22:                 <li>Have a minimum of $15,000 in qualifying unsecured debt</li>
23:                 <li>Be experiencing genuine financial hardship</li>
24:                 <li>Be a resident of a state where our services are available</li>
25:                 <li>Provide accurate and complete information about your financial situation</li>
26:             </ul>
27:             
28:             <h2 class="mt-8 mb-4 text-2xl font-semibold">4. Program Details and Disclosures</h2>
29:             <p>Our debt settlement program is designed to help clients reduce their unsecured debt through negotiation with creditors. Important disclosures about our program include:</p>
30:             <ul class="list-disc pl-8 mb-6">
31:                 <li>We are not a lender and do not provide loans or credit.</li>
32:                 <li>Our service is not bankruptcy.</li>
33:                 <li>We do not make monthly payments to your creditors on your behalf.</li>
34:                 <li>Participation in our program may negatively affect your credit score.</li>
35:                 <li>When you stop making payments to creditors, they may continue collection activities, including calls, late fees, and potential legal action.</li>
36:                 <li>Debt settlement may have tax consequences. Forgiven debt may be considered taxable income.</li>
37:                 <li>Success in the program depends on your ability to save sufficient funds to pay for settled debts and our fees.</li>
38:             </ul>
39:             
40:             <h2 class="mt-8 mb-4 text-2xl font-semibold">5. Fees</h2>
41:             <p>Our fees are performance-based, meaning we charge a fee only when we successfully settle a debt on your behalf. The specific fee structure will be provided to you before enrollment in our program and will be outlined in your client agreement.</p>
42:             
43:             <h2 class="mt-8 mb-4 text-2xl font-semibold">6. Client Responsibilities</h2>
44:             <p>As a client, you agree to:</p>
45:             <ul class="list-disc pl-8 mb-6">
46:                 <li>Provide accurate and complete information about your debts and financial situation</li>
47:                 <li>Make regular monthly deposits into a dedicated settlement account</li>
48:                 <li>Communicate promptly regarding any changes to your financial situation or contact information</li>
49:                 <li>Forward any creditor communications to us as soon as possible</li>
50:                 <li>Collaborate with us throughout the settlement process</li>
51:                 <li>Review and understand all program documents before enrollment</li>
52:             </ul>
53:             
54:             <h2 class="mt-8 mb-4 text-2xl font-semibold">7. Limitation of Liability</h2>
55:             <p>To the maximum extent permitted by law, Debt Freedom Toolkit shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:</p>
56:             <ul class="list-disc pl-8 mb-6">
57:                 <li>Your use or inability to use our services</li>
58:                 <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
59:                 <li>Any creditor actions, including collection activities or legal actions</li>
60:                 <li>Any third-party services or content linked from our services</li>
61:             </ul>
62:             
63:             <h2 class="mt-8 mb-4 text-2xl font-semibold">8. Termination</h2>
64:             <p>You may terminate your participation in our program at any time by providing written notice to us. We may terminate your participation in our program if you breach these Terms or your client agreement, or if we are unable to effectively provide our services to you due to circumstances beyond our control.</p>
65:             
66:             <h2 class="mt-8 mb-4 text-2xl font-semibold">9. Changes to Terms</h2>
67:             <p>We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of our services after any such changes constitutes your acceptance of the new Terms.</p>
68:             
69:             <h2 class="mt-8 mb-4 text-2xl font-semibold">10. Governing Law</h2>
70:             <p>These Terms shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions.</p>
71:             
72:             <h2 class="mt-8 mb-4 text-2xl font-semibold">11. Contact Information</h2>
73:             <p>If you have any questions about these Terms, please contact us at:</p>
74:             <p>Email: legal@debtfreedomtoolkit.com</p>
75:             <p>Phone: (800) 555-1234</p>
76:             <p>Address: 123 Financial Way, Suite 500, Clearwater, FL 33759</p>
77:         </div>
78:         
79:         <div class="mt-10">
80:             <a href="/debt-relief" class="btn bg-primary text-primary-content">Back to Debt Relief</a>
81:         </div>
82:     </section>
83: </LandingLayout>
```

## File: src/pages/background-text-colors-demo.astro
```
  1: ---
  2: import Layout from '../layouts/Layout.astro';
  3: ---
  4: 
  5: <Layout title="Background and Text Colors Demo">
  6:   <div class="container mx-auto px-4 py-8">
  7:     <div class="mb-8 text-center">
  8:       <h1 class="text-4xl font-bold mb-4 text-text-light dark:text-text-dark">
  9:         Background and Text Colors Demo
 10:       </h1>
 11:       <p class="text-lg text-text-muted-light dark:text-text-muted-dark mb-6">
 12:         Comprehensive demonstration of background and text color combinations with accessibility compliance.
 13:       </p>
 14:       <div class="flex justify-center gap-4">
 15:         <a href="/color-palette-demo" class="btn btn-secondary">
 16:           View Primary Colors Demo
 17:         </a>
 18:         <a href="/secondary-accent-palette-demo" class="btn btn-accent">
 19:           View Secondary & Accent Demo
 20:         </a>
 21:       </div>
 22:     </div>
 23: 
 24:     <!-- Color Contrast Information -->
 25:     <div class="mb-12 bg-background-form-light dark:bg-background-form-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
 26:       <h2 class="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">
 27:         Accessibility & Contrast Information
 28:       </h2>
 29:       <div class="grid md:grid-cols-2 gap-6">
 30:         <div>
 31:           <h3 class="text-lg font-semibold mb-2 text-text-light dark:text-text-dark">WCAG AA Compliance</h3>
 32:           <p class="text-text-muted-light dark:text-text-muted-dark mb-2">
 33:             All color combinations maintain a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.
 34:           </p>
 35:           <ul class="text-sm text-text-secondary-light dark:text-text-secondary-dark space-y-1">
 36:             <li>• Normal text: ≥4.5:1 contrast ratio</li>
 37:             <li>• Large text (18pt+): ≥3:1 contrast ratio</li>
 38:             <li>• Interactive elements have clear focus states</li>
 39:           </ul>
 40:         </div>
 41:         <div>
 42:           <h3 class="text-lg font-semibold mb-2 text-text-light dark:text-text-dark">Theme Support</h3>
 43:           <p class="text-text-muted-light dark:text-text-muted-dark mb-2">
 44:             Colors automatically adapt based on the user's theme preference.
 45:           </p>
 46:           <ul class="text-sm text-text-secondary-light dark:text-text-secondary-dark space-y-1">
 47:             <li>• Light mode: Dark text on light backgrounds</li>
 48:             <li>• Dark mode: Light text on dark backgrounds</li>
 49:             <li>• Smooth transitions between themes</li>
 50:           </ul>
 51:         </div>
 52:       </div>
 53:     </div>
 54: 
 55:     <!-- Background Colors Demo -->
 56:     <section class="mb-12">
 57:       <h2 class="text-3xl font-bold mb-6 text-text-light dark:text-text-dark">Background Colors</h2>
 58:       
 59:       <div class="grid lg:grid-cols-2 gap-8">
 60:         <!-- Light Mode Backgrounds -->
 61:         <div>
 62:           <h3 class="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">Light Mode Backgrounds</h3>
 63:           <div class="space-y-4">
 64:             <!-- Main Background -->
 65:             <div class="bg-background-light p-4 rounded-lg border border-border-light">
 66:               <div class="flex justify-between items-center mb-2">
 67:                 <span class="font-semibold text-text-light">Main Background</span>
 68:                 <code class="text-xs bg-background-form-light px-2 py-1 rounded text-text-light">#ffffff</code>
 69:               </div>
 70:               <p class="text-text-muted-light">Default page background in light mode</p>
 71:               <p class="text-text-secondary-light text-sm mt-2">Class: bg-background-light</p>
 72:             </div>
 73: 
 74:             <!-- Form Background -->
 75:             <div class="bg-background-form-light p-4 rounded-lg border border-border-light">
 76:               <div class="flex justify-between items-center mb-2">
 77:                 <span class="font-semibold text-text-light">Form Background</span>
 78:                 <code class="text-xs bg-background-light px-2 py-1 rounded text-text-light">#F7FAFC</code>
 79:               </div>
 80:               <p class="text-text-muted-light">Background for forms and containers</p>
 81:               <p class="text-text-secondary-light text-sm mt-2">Class: bg-background-form-light</p>
 82:             </div>
 83: 
 84:             <!-- Input Background -->
 85:             <div class="bg-background-input-light p-4 rounded-lg border border-border-light">
 86:               <div class="flex justify-between items-center mb-2">
 87:                 <span class="font-semibold text-text-light">Input Background</span>
 88:                 <code class="text-xs bg-background-form-light px-2 py-1 rounded text-text-light">#EDF2F7</code>
 89:               </div>
 90:               <p class="text-text-muted-light">Background for input fields</p>
 91:               <p class="text-text-secondary-light text-sm mt-2">Class: bg-background-input-light</p>
 92:             </div>
 93: 
 94:             <!-- Surface Background -->
 95:             <div class="bg-background-surface-light p-4 rounded-lg border border-border-light">
 96:               <div class="flex justify-between items-center mb-2">
 97:                 <span class="font-semibold text-text-light">Surface</span>
 98:                 <code class="text-xs bg-background-form-light px-2 py-1 rounded text-text-light">#ffffff</code>
 99:               </div>
100:               <p class="text-text-muted-light">Surface backgrounds for cards</p>
101:               <p class="text-text-secondary-light text-sm mt-2">Class: bg-background-surface-light</p>
102:             </div>
103:           </div>
104:         </div>
105: 
106:         <!-- Dark Mode Backgrounds -->
107:         <div>
108:           <h3 class="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">Dark Mode Backgrounds</h3>
109:           <div class="space-y-4">
110:             <!-- Main Background Dark -->
111:             <div class="bg-background-dark p-4 rounded-lg border border-border-dark">
112:               <div class="flex justify-between items-center mb-2">
113:                 <span class="font-semibold text-text-dark">Main Background</span>
114:                 <code class="text-xs bg-background-form-dark px-2 py-1 rounded text-text-dark">#1a2234</code>
115:               </div>
116:               <p class="text-text-muted-dark">Default page background in dark mode</p>
117:               <p class="text-text-secondary-dark text-sm mt-2">Class: bg-background-dark</p>
118:             </div>
119: 
120:             <!-- Form Background Dark -->
121:             <div class="bg-background-form-dark p-4 rounded-lg border border-border-dark">
122:               <div class="flex justify-between items-center mb-2">
123:                 <span class="font-semibold text-text-dark">Form Background</span>
124:                 <code class="text-xs bg-background-dark px-2 py-1 rounded text-text-dark">#202b3d</code>
125:               </div>
126:               <p class="text-text-muted-dark">Background for forms and containers</p>
127:               <p class="text-text-secondary-dark text-sm mt-2">Class: bg-background-form-dark</p>
128:             </div>
129: 
130:             <!-- Input Background Dark -->
131:             <div class="bg-background-input-dark p-4 rounded-lg border border-border-dark">
132:               <div class="flex justify-between items-center mb-2">
133:                 <span class="font-semibold text-text-dark">Input Background</span>
134:                 <code class="text-xs bg-background-form-dark px-2 py-1 rounded text-text-dark">#151d2c</code>
135:               </div>
136:               <p class="text-text-muted-dark">Background for input fields</p>
137:               <p class="text-text-secondary-dark text-sm mt-2">Class: bg-background-input-dark</p>
138:             </div>
139: 
140:             <!-- Surface Background Dark -->
141:             <div class="bg-background-surface-dark p-4 rounded-lg border border-border-dark">
142:               <div class="flex justify-between items-center mb-2">
143:                 <span class="font-semibold text-text-dark">Surface</span>
144:                 <code class="text-xs bg-background-form-dark px-2 py-1 rounded text-text-dark">#1a2234</code>
145:               </div>
146:               <p class="text-text-muted-dark">Surface backgrounds for cards</p>
147:               <p class="text-text-secondary-dark text-sm mt-2">Class: bg-background-surface-dark</p>
148:             </div>
149:           </div>
150:         </div>
151:       </div>
152:     </section>
153: 
154:     <!-- Text Colors Demo -->
155:     <section class="mb-12">
156:       <h2 class="text-3xl font-bold mb-6 text-text-light dark:text-text-dark">Text Colors</h2>
157:       
158:       <div class="grid lg:grid-cols-2 gap-8">
159:         <!-- Light Mode Text -->
160:         <div class="bg-background-form-light p-6 rounded-lg border border-border-light">
161:           <h3 class="text-xl font-semibold mb-4 text-text-light">Light Mode Text</h3>
162:           <div class="space-y-3">
163:             <div>
164:               <span class="font-semibold text-text-light">Primary Text</span>
165:               <code class="text-xs bg-background-light px-2 py-1 rounded text-text-light ml-2">#1a2234</code>
166:               <p class="text-text-light text-sm">Main content text - Class: text-text-light</p>
167:             </div>
168:             <div>
169:               <span class="font-semibold text-text-muted-light">Muted Text</span>
170:               <code class="text-xs bg-background-light px-2 py-1 rounded text-text-light ml-2">#4A5568</code>
171:               <p class="text-text-muted-light text-sm">Secondary content text - Class: text-text-muted-light</p>
172:             </div>
173:             <div>
174:               <span class="font-semibold text-text-secondary-light">Secondary Text</span>
175:               <code class="text-xs bg-background-light px-2 py-1 rounded text-text-light ml-2">#718096</code>
176:               <p class="text-text-secondary-light text-sm">Tertiary content text - Class: text-text-secondary-light</p>
177:             </div>
178:             <div>
179:               <span class="font-semibold text-text-placeholder-light">Placeholder Text</span>
180:               <code class="text-xs bg-background-light px-2 py-1 rounded text-text-light ml-2">#718096</code>
181:               <p class="text-text-placeholder-light text-sm">Form placeholder text - Class: text-text-placeholder-light</p>
182:             </div>
183:           </div>
184:         </div>
185: 
186:         <!-- Dark Mode Text -->
187:         <div class="bg-background-form-dark p-6 rounded-lg border border-border-dark">
188:           <h3 class="text-xl font-semibold mb-4 text-text-dark">Dark Mode Text</h3>
189:           <div class="space-y-3">
190:             <div>
191:               <span class="font-semibold text-text-dark">Primary Text</span>
192:               <code class="text-xs bg-background-dark px-2 py-1 rounded text-text-dark ml-2">#ffffff</code>
193:               <p class="text-text-dark text-sm">Main content text - Class: text-text-dark</p>
194:             </div>
195:             <div>
196:               <span class="font-semibold text-text-muted-dark">Muted Text</span>
197:               <code class="text-xs bg-background-dark px-2 py-1 rounded text-text-dark ml-2">#b0c0d0</code>
198:               <p class="text-text-muted-dark text-sm">Secondary content text - Class: text-text-muted-dark</p>
199:             </div>
200:             <div>
201:               <span class="font-semibold text-text-secondary-dark">Secondary Text</span>
202:               <code class="text-xs bg-background-dark px-2 py-1 rounded text-text-dark ml-2">#a0aec0</code>
203:               <p class="text-text-secondary-dark text-sm">Tertiary content text - Class: text-text-secondary-dark</p>
204:             </div>
205:             <div>
206:               <span class="font-semibold text-text-placeholder-dark">Placeholder Text</span>
207:               <code class="text-xs bg-background-dark px-2 py-1 rounded text-text-dark ml-2">#8896ac</code>
208:               <p class="text-text-placeholder-dark text-sm">Form placeholder text - Class: text-text-placeholder-dark</p>
209:             </div>
210:           </div>
211:         </div>
212:       </div>
213:     </section>
214: 
215:     <!-- Status Colors Demo -->
216:     <section class="mb-12">
217:       <h2 class="text-3xl font-bold mb-6 text-text-light dark:text-text-dark">Status Colors</h2>
218:       
219:       <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
220:         <!-- Error Colors -->
221:         <div class="space-y-3">
222:           <h3 class="text-lg font-semibold text-error-light dark:text-error-dark">Error Colors</h3>
223:           <div class="bg-error-bg-light dark:bg-error-bg-dark p-4 rounded-lg border border-error-light dark:border-error-dark">
224:             <p class="text-error-text-light dark:text-error-text-dark font-semibold">Error Message</p>
225:             <p class="text-error-text-light dark:text-error-text-dark text-sm">This is an error notification with proper contrast.</p>
226:           </div>
227:         </div>
228: 
229:         <!-- Success Colors -->
230:         <div class="space-y-3">
231:           <h3 class="text-lg font-semibold text-success-light dark:text-success-dark">Success Colors</h3>
232:           <div class="bg-success-bg-light dark:bg-success-bg-dark p-4 rounded-lg border border-success-light dark:border-success-dark">
233:             <p class="text-success-text-light dark:text-success-text-dark font-semibold">Success Message</p>
234:             <p class="text-success-text-light dark:text-success-text-dark text-sm">This is a success notification with proper contrast.</p>
235:           </div>
236:         </div>
237: 
238:         <!-- Warning Colors -->
239:         <div class="space-y-3">
240:           <h3 class="text-lg font-semibold text-warning-light dark:text-warning-dark">Warning Colors</h3>
241:           <div class="bg-warning-bg-light dark:bg-warning-bg-dark p-4 rounded-lg border border-warning-light dark:border-warning-dark">
242:             <p class="text-warning-text-light dark:text-warning-text-dark font-semibold">Warning Message</p>
243:             <p class="text-warning-text-light dark:text-warning-text-dark text-sm">This is a warning notification with proper contrast.</p>
244:           </div>
245:         </div>
246: 
247:         <!-- Info Colors -->
248:         <div class="space-y-3">
249:           <h3 class="text-lg font-semibold text-info-light dark:text-info-dark">Info Colors</h3>
250:           <div class="bg-info-bg-light dark:bg-info-bg-dark p-4 rounded-lg border border-info-light dark:border-info-dark">
251:             <p class="text-info-text-light dark:text-info-text-dark font-semibold">Info Message</p>
252:             <p class="text-info-text-light dark:text-info-text-dark text-sm">This is an info notification with proper contrast.</p>
253:           </div>
254:         </div>
255:       </div>
256:     </section>
257: 
258:     <!-- Interactive Elements Demo -->
259:     <section class="mb-12">
260:       <h2 class="text-3xl font-bold mb-6 text-text-light dark:text-text-dark">Interactive Elements</h2>
261:       
262:       <div class="bg-background-form-light dark:bg-background-form-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
263:         <h3 class="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">Form Examples</h3>
264:         
265:         <div class="grid md:grid-cols-2 gap-6">
266:           <div class="space-y-4">
267:             <div>
268:               <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
269:                 Text Input
270:               </label>
271:               <input 
272:                 type="text" 
273:                 placeholder="Enter some text..." 
274:                 class="w-full px-3 py-2 bg-background-input-light dark:bg-background-input-dark border border-border-light dark:border-border-dark rounded-md text-text-light dark:text-text-dark placeholder-text-placeholder-light dark:placeholder-text-placeholder-dark focus:border-border-focus-light dark:focus:border-border-focus-dark focus:outline-none"
275:               />
276:             </div>
277:             
278:             <div>
279:               <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
280:                 Select Dropdown
281:               </label>
282:               <select class="w-full px-3 py-2 bg-background-input-light dark:bg-background-input-dark border border-border-light dark:border-border-dark rounded-md text-text-light dark:text-text-dark focus:border-border-focus-light dark:focus:border-border-focus-dark focus:outline-none">
283:                 <option value="">Choose an option...</option>
284:                 <option value="1">Option 1</option>
285:                 <option value="2">Option 2</option>
286:                 <option value="3">Option 3</option>
287:               </select>
288:             </div>
289:           </div>
290:           
291:           <div class="space-y-4">
292:             <div>
293:               <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
294:                 Textarea
295:               </label>
296:               <textarea 
297:                 placeholder="Enter a longer message..." 
298:                 rows="4"
299:                 class="w-full px-3 py-2 bg-background-input-light dark:bg-background-input-dark border border-border-light dark:border-border-dark rounded-md text-text-light dark:text-text-dark placeholder-text-placeholder-light dark:placeholder-text-placeholder-dark focus:border-border-focus-light dark:focus:border-border-focus-dark focus:outline-none"
300:               ></textarea>
301:             </div>
302:           </div>
303:         </div>
304: 
305:         <div class="mt-6 flex gap-3 flex-wrap">
306:           <button class="px-4 py-2 bg-primary text-text-button-primary rounded-md hover:bg-primary-hover transition-colors">
307:             Primary Button
308:           </button>
309:           <button class="px-4 py-2 bg-transparent border border-border-light dark:border-border-dark text-text-outline-light dark:text-text-outline-dark rounded-md hover:bg-background-form-light dark:hover:bg-background-form-dark transition-colors">
310:             Outline Button
311:           </button>
312:           <button class="px-4 py-2 bg-accent text-text-button-accent rounded-md hover:bg-accent-hover transition-colors">
313:             Accent Button
314:           </button>
315:         </div>
316:       </div>
317:     </section>
318: 
319:     <!-- Usage Guidelines -->
320:     <section class="mb-12">
321:       <h2 class="text-3xl font-bold mb-6 text-text-light dark:text-text-dark">Usage Guidelines</h2>
322:       
323:       <div class="bg-background-form-light dark:bg-background-form-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
324:         <div class="grid md:grid-cols-2 gap-8">
325:           <div>
326:             <h3 class="text-lg font-semibold mb-3 text-text-light dark:text-text-dark">Responsive Dark Mode Classes</h3>
327:             <p class="text-text-muted-light dark:text-text-muted-dark mb-4">
328:               Use Tailwind's dark mode prefix to apply different colors based on theme:
329:             </p>
330:             <div class="bg-background-input-light dark:bg-background-input-dark p-3 rounded font-mono text-sm overflow-x-auto">
331:               <div class="text-text-light dark:text-text-dark">
332:                 <div class="text-blue-600">&lt;div</div>
333:                 <div class="ml-2 text-green-600">className=<span class="text-amber-600">"bg-background-light dark:bg-background-dark</span></div>
334:                 <div class="ml-2 text-green-600">text-text-light dark:text-text-dark"</div>
335:                 <div class="text-blue-600">&gt;</div>
336:               </div>
337:             </div>
338:           </div>
339:           
340:           <div>
341:             <h3 class="text-lg font-semibold mb-3 text-text-light dark:text-text-dark">Best Practices</h3>
342:             <ul class="space-y-2 text-text-muted-light dark:text-text-muted-dark">
343:               <li class="flex items-start gap-2">
344:                 <span class="text-success-light dark:text-success-dark">✓</span>
345:                 <span>Always specify both light and dark variants</span>
346:               </li>
347:               <li class="flex items-start gap-2">
348:                 <span class="text-success-light dark:text-success-dark">✓</span>
349:                 <span>Use semantic color names (text-muted vs specific hex)</span>
350:               </li>
351:               <li class="flex items-start gap-2">
352:                 <span class="text-success-light dark:text-success-dark">✓</span>
353:                 <span>Test contrast ratios for accessibility</span>
354:               </li>
355:               <li class="flex items-start gap-2">
356:                 <span class="text-success-light dark:text-success-dark">✓</span>
357:                 <span>Consider user preferences and system settings</span>
358:               </li>
359:             </ul>
360:           </div>
361:         </div>
362:       </div>
363:     </section>
364:   </div>
365: </Layout>
```

## File: src/pages/color-palette-demo.astro
```
  1: ---
  2: import Layout from '../layouts/Layout.astro';
  3: import ThemeToggle from '../components/ThemeToggle.astro';
  4: ---
  5: 
  6: <Layout title="Primary Color Palette Demo">
  7:   <div class="max-w-5xl mx-auto py-8">
  8:     <div class="flex justify-between items-center mb-8">
  9:       <h1 class="text-4xl font-bold">Primary Color Palette</h1>
 10:       <div class="md:hidden">
 11:         <ThemeToggle />
 12:       </div>
 13:     </div>
 14:     
 15:     <p class="mb-8 text-lg">
 16:       This page demonstrates the comprehensive primary color palette with all variants for both light and dark mode.
 17:       Use the theme toggle in the header to switch between modes and see how colors adapt.
 18:     </p>
 19:     
 20:     <div class="flex space-x-4 mb-8">
 21:       <a href="/color-palette-demo" class="bg-primary hover:bg-primary-hover text-primary-textOnPrimary px-4 py-2 rounded">Primary Palette</a>
 22:       <a href="/secondary-accent-palette-demo" class="bg-secondary hover:bg-secondary-hover text-secondary-textOnSecondary px-4 py-2 rounded">Secondary & Accent Palette</a>
 23:     </div>
 24:     
 25:     <!-- Base Colors Section -->
 26:     <section class="mb-12">
 27:       <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Base Colors</h2>
 28:       <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
 29:         <!-- Primary Default -->
 30:         <div class="rounded-lg overflow-hidden shadow-md">
 31:           <div class="h-32 bg-primary flex items-center justify-center">
 32:             <span class="text-primary-textOnPrimary font-semibold">#2d7984</span>
 33:           </div>
 34:           <div class="p-4 bg-white dark:bg-gray-800">
 35:             <h3 class="font-semibold">Primary</h3>
 36:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary</code>
 37:           </div>
 38:         </div>
 39:         
 40:         <!-- Light Variant -->
 41:         <div class="rounded-lg overflow-hidden shadow-md">
 42:           <div class="h-32 bg-primary-light flex items-center justify-center">
 43:             <span class="text-primary-textOnLight font-semibold">#58cbe0</span>
 44:           </div>
 45:           <div class="p-4 bg-white dark:bg-gray-800">
 46:             <h3 class="font-semibold">Primary Light</h3>
 47:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-light</code>
 48:           </div>
 49:         </div>
 50:         
 51:         <!-- Dark Variant -->
 52:         <div class="rounded-lg overflow-hidden shadow-md">
 53:           <div class="h-32 bg-primary-dark flex items-center justify-center">
 54:             <span class="text-primary-textOnDark font-semibold">#1d5058</span>
 55:           </div>
 56:           <div class="p-4 bg-white dark:bg-gray-800">
 57:             <h3 class="font-semibold">Primary Dark</h3>
 58:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-dark</code>
 59:           </div>
 60:         </div>
 61:       </div>
 62:     </section>
 63:     
 64:     <!-- Interactive Elements Section -->
 65:     <section class="mb-12">
 66:       <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Interactive States</h2>
 67:       <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 68:         <!-- Buttons -->
 69:         <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
 70:           <h3 class="font-semibold mb-4">Buttons</h3>
 71:           <div class="space-y-4">
 72:             <div>
 73:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Primary Button (hover & active states)</p>
 74:               <button class="bg-primary hover:bg-primary-hover active:bg-primary-active text-primary-textOnPrimary px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-focus focus:ring-opacity-50">
 75:                 Primary Button
 76:               </button>
 77:             </div>
 78:             
 79:             <div>
 80:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Light Variant (hover & active states)</p>
 81:               <button class="bg-primary-light hover:bg-primary-lightHover active:bg-primary-lightActive text-primary-textOnLight px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-lightFocus focus:ring-opacity-50">
 82:                 Light Button
 83:               </button>
 84:             </div>
 85:             
 86:             <div>
 87:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Dark Variant (hover & active states)</p>
 88:               <button class="bg-primary-dark hover:bg-primary-darkHover active:bg-primary-darkActive text-primary-textOnDark px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-darkFocus focus:ring-opacity-50">
 89:                 Dark Button
 90:               </button>
 91:             </div>
 92:             
 93:             <div>
 94:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Disabled State</p>
 95:               <button class="bg-primary-disabled text-white px-4 py-2 rounded cursor-not-allowed opacity-75">
 96:                 Disabled Button
 97:               </button>
 98:             </div>
 99:           </div>
100:         </div>
101:         
102:         <!-- Other Interactive Elements -->
103:         <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
104:           <h3 class="font-semibold mb-4">Form Elements</h3>
105:           <div class="space-y-4">
106:             <div>
107:               <label class="block mb-2">Input with focus state</label>
108:               <input type="text" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary-focus focus:border-primary" placeholder="Focus to see primary-focus ring">
109:             </div>
110:             
111:             <div>
112:               <label class="block mb-2">Input with light variant focus</label>
113:               <input type="text" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary-lightFocus focus:border-primary-light" placeholder="Focus to see primary-lightFocus ring">
114:             </div>
115:             
116:             <div>
117:               <p class="mb-2">Link with hover/focus styles</p>
118:               <a href="#" class="text-primary hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-primary-focus rounded">Primary link with hover state</a>
119:             </div>
120:           </div>
121:         </div>
122:       </div>
123:     </section>
124:     
125:     <!-- Hover States Section -->
126:     <section class="mb-12">
127:       <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Hover States</h2>
128:       <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
129:         <!-- Base Hover -->
130:         <div class="rounded-lg overflow-hidden shadow-md">
131:           <div class="h-32 bg-primary-hover flex items-center justify-center">
132:             <span class="text-white font-semibold">#266974</span>
133:           </div>
134:           <div class="p-4 bg-white dark:bg-gray-800">
135:             <h3 class="font-semibold">Primary Hover</h3>
136:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-hover</code>
137:           </div>
138:         </div>
139:         
140:         <!-- Light Hover -->
141:         <div class="rounded-lg overflow-hidden shadow-md">
142:           <div class="h-32 bg-primary-lightHover flex items-center justify-center">
143:             <span class="text-gray-900 font-semibold">#4bbbce</span>
144:           </div>
145:           <div class="p-4 bg-white dark:bg-gray-800">
146:             <h3 class="font-semibold">Primary Light Hover</h3>
147:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-lightHover</code>
148:           </div>
149:         </div>
150:         
151:         <!-- Dark Hover -->
152:         <div class="rounded-lg overflow-hidden shadow-md">
153:           <div class="h-32 bg-primary-darkHover flex items-center justify-center">
154:             <span class="text-white font-semibold">#15373e</span>
155:           </div>
156:           <div class="p-4 bg-white dark:bg-gray-800">
157:             <h3 class="font-semibold">Primary Dark Hover</h3>
158:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-darkHover</code>
159:           </div>
160:         </div>
161:       </div>
162:     </section>
163:     
164:     <!-- Active States Section -->
165:     <section class="mb-12">
166:       <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Active States</h2>
167:       <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
168:         <!-- Base Active -->
169:         <div class="rounded-lg overflow-hidden shadow-md">
170:           <div class="h-32 bg-primary-active flex items-center justify-center">
171:             <span class="text-white font-semibold">#1d5058</span>
172:           </div>
173:           <div class="p-4 bg-white dark:bg-gray-800">
174:             <h3 class="font-semibold">Primary Active</h3>
175:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-active</code>
176:           </div>
177:         </div>
178:         
179:         <!-- Light Active -->
180:         <div class="rounded-lg overflow-hidden shadow-md">
181:           <div class="h-32 bg-primary-lightActive flex items-center justify-center">
182:             <span class="text-gray-900 font-semibold">#3eafc2</span>
183:           </div>
184:           <div class="p-4 bg-white dark:bg-gray-800">
185:             <h3 class="font-semibold">Primary Light Active</h3>
186:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-lightActive</code>
187:           </div>
188:         </div>
189:         
190:         <!-- Dark Active -->
191:         <div class="rounded-lg overflow-hidden shadow-md">
192:           <div class="h-32 bg-primary-darkActive flex items-center justify-center">
193:             <span class="text-white font-semibold">#102b30</span>
194:           </div>
195:           <div class="p-4 bg-white dark:bg-gray-800">
196:             <h3 class="font-semibold">Primary Dark Active</h3>
197:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-darkActive</code>
198:           </div>
199:         </div>
200:       </div>
201:     </section>
202:     
203:     <!-- Focus States Section -->
204:     <section class="mb-12">
205:       <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Focus States</h2>
206:       <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
207:         <!-- Base Focus -->
208:         <div class="rounded-lg overflow-hidden shadow-md">
209:           <div class="h-32 flex items-center justify-center relative">
210:             <div class="absolute inset-4 bg-primary"></div>
211:             <div class="absolute inset-0 bg-primary-focus ring-4 ring-primary-focus ring-opacity-50"></div>
212:             <span class="relative z-10 text-white font-semibold">#2d7984 (with focus ring)</span>
213:           </div>
214:           <div class="p-4 bg-white dark:bg-gray-800">
215:             <h3 class="font-semibold">Primary Focus</h3>
216:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-focus</code>
217:           </div>
218:         </div>
219:         
220:         <!-- Light Focus -->
221:         <div class="rounded-lg overflow-hidden shadow-md">
222:           <div class="h-32 flex items-center justify-center relative">
223:             <div class="absolute inset-4 bg-primary-light"></div>
224:             <div class="absolute inset-0 bg-primary-lightFocus ring-4 ring-primary-lightFocus ring-opacity-50"></div>
225:             <span class="relative z-10 text-gray-900 font-semibold">#58cbe0 (with focus ring)</span>
226:           </div>
227:           <div class="p-4 bg-white dark:bg-gray-800">
228:             <h3 class="font-semibold">Primary Light Focus</h3>
229:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-lightFocus</code>
230:           </div>
231:         </div>
232:         
233:         <!-- Dark Focus -->
234:         <div class="rounded-lg overflow-hidden shadow-md">
235:           <div class="h-32 flex items-center justify-center relative">
236:             <div class="absolute inset-4 bg-primary-dark"></div>
237:             <div class="absolute inset-0 bg-primary-darkFocus ring-4 ring-primary-darkFocus ring-opacity-50"></div>
238:             <span class="relative z-10 text-white font-semibold">#1d5058 (with focus ring)</span>
239:           </div>
240:           <div class="p-4 bg-white dark:bg-gray-800">
241:             <h3 class="font-semibold">Primary Dark Focus</h3>
242:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-darkFocus</code>
243:           </div>
244:         </div>
245:       </div>
246:     </section>
247:     
248:     <!-- Disabled States Section -->
249:     <section class="mb-12">
250:       <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Disabled States</h2>
251:       <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
252:         <!-- Base Disabled -->
253:         <div class="rounded-lg overflow-hidden shadow-md">
254:           <div class="h-32 bg-primary-disabled flex items-center justify-center">
255:             <span class="text-white font-semibold">#a3c5cb</span>
256:           </div>
257:           <div class="p-4 bg-white dark:bg-gray-800">
258:             <h3 class="font-semibold">Primary Disabled</h3>
259:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-disabled</code>
260:           </div>
261:         </div>
262:         
263:         <!-- Light Disabled -->
264:         <div class="rounded-lg overflow-hidden shadow-md">
265:           <div class="h-32 bg-primary-lightDisabled flex items-center justify-center">
266:             <span class="text-gray-900 font-semibold">#b8e0ea</span>
267:           </div>
268:           <div class="p-4 bg-white dark:bg-gray-800">
269:             <h3 class="font-semibold">Primary Light Disabled</h3>
270:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-lightDisabled</code>
271:           </div>
272:         </div>
273:         
274:         <!-- Dark Disabled -->
275:         <div class="rounded-lg overflow-hidden shadow-md">
276:           <div class="h-32 bg-primary-darkDisabled flex items-center justify-center">
277:             <span class="text-white font-semibold">#6a8a8f</span>
278:           </div>
279:           <div class="p-4 bg-white dark:bg-gray-800">
280:             <h3 class="font-semibold">Primary Dark Disabled</h3>
281:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-darkDisabled</code>
282:           </div>
283:         </div>
284:       </div>
285:     </section>
286:     
287:     <!-- Text Colors Section -->
288:     <section class="mb-12">
289:       <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Text Colors</h2>
290:       <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
291:         <!-- Text on Primary -->
292:         <div class="rounded-lg overflow-hidden shadow-md">
293:           <div class="h-32 bg-primary flex flex-col items-center justify-center">
294:             <span class="text-primary-textOnPrimary font-semibold mb-2">Text on Primary</span>
295:             <code class="bg-black bg-opacity-20 text-white text-sm px-2 py-1 rounded">text-primary-textOnPrimary</code>
296:           </div>
297:           <div class="p-4 bg-white dark:bg-gray-800">
298:             <h3 class="font-semibold">Text on Primary</h3>
299:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">#ffffff</code>
300:           </div>
301:         </div>
302:         
303:         <!-- Text on Light -->
304:         <div class="rounded-lg overflow-hidden shadow-md">
305:           <div class="h-32 bg-primary-light flex flex-col items-center justify-center">
306:             <span class="text-primary-textOnLight font-semibold mb-2">Text on Light</span>
307:             <code class="bg-black bg-opacity-20 text-primary-textOnLight text-sm px-2 py-1 rounded">text-primary-textOnLight</code>
308:           </div>
309:           <div class="p-4 bg-white dark:bg-gray-800">
310:             <h3 class="font-semibold">Text on Light</h3>
311:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">#1a2234</code>
312:           </div>
313:         </div>
314:         
315:         <!-- Text on Dark -->
316:         <div class="rounded-lg overflow-hidden shadow-md">
317:           <div class="h-32 bg-primary-dark flex flex-col items-center justify-center">
318:             <span class="text-primary-textOnDark font-semibold mb-2">Text on Dark</span>
319:             <code class="bg-black bg-opacity-20 text-white text-sm px-2 py-1 rounded">text-primary-textOnDark</code>
320:           </div>
321:           <div class="p-4 bg-white dark:bg-gray-800">
322:             <h3 class="font-semibold">Text on Dark</h3>
323:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">#ffffff</code>
324:           </div>
325:         </div>
326:       </div>
327:     </section>
328:     
329:     <!-- Usage Guidelines -->
330:     <section class="mb-8">
331:       <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Usage Guidelines</h2>
332:       <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
333:         <h3 class="font-semibold mb-4">When to use each variant</h3>
334:         <ul class="space-y-3 list-disc pl-5">
335:           <li><strong>Primary (default):</strong> Use for primary action buttons, key UI elements, and main accent colors.</li>
336:           <li><strong>Light variant:</strong> Use for secondary elements, backgrounds, highlights, and when you need a lighter version of the primary color that maintains brand identity.</li>
337:           <li><strong>Dark variant:</strong> Use for more prominent elements that need stronger contrast, or for hover states of the primary color.</li>
338:           <li><strong>Hover states:</strong> Apply to interactive elements when hovered to provide visual feedback.</li>
339:           <li><strong>Active states:</strong> Apply to interactive elements when clicked/pressed to provide visual feedback.</li>
340:           <li><strong>Focus states:</strong> Apply to interactive elements when focused (e.g., via keyboard navigation) to improve accessibility.</li>
341:           <li><strong>Disabled states:</strong> Apply to elements that are currently not interactive or available.</li>
342:         </ul>
343:         
344:         <h3 class="font-semibold mt-6 mb-4">Accessibility Considerations</h3>
345:         <ul class="space-y-3 list-disc pl-5">
346:           <li>Always use the appropriate text color (<code>textOnPrimary</code>, <code>textOnLight</code>, <code>textOnDark</code>) to ensure sufficient contrast for readability.</li>
347:           <li>Focus states should be clearly visible for keyboard navigation - use the focus ring variants as shown in the examples.</li>
348:           <li>Ensure disabled elements maintain clear visual distinction but avoid using color alone to convey information.</li>
349:         </ul>
350:       </div>
351:     </section>
352:     
353:     <!-- Full Color Palette Reference -->
354:     <section>
355:       <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Complete Color Palette Reference</h2>
356:       <div class="overflow-x-auto">
357:         <table class="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
358:           <thead class="bg-gray-50 dark:bg-gray-700">
359:             <tr>
360:               <th class="px-4 py-3 text-left">Name</th>
361:               <th class="px-4 py-3 text-left">Hex Value</th>
362:               <th class="px-4 py-3 text-left">Tailwind Class</th>
363:               <th class="px-4 py-3 text-left">Preview</th>
364:             </tr>
365:           </thead>
366:           <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
367:             <!-- Base Colors -->
368:             <tr>
369:               <td class="px-4 py-3">Primary</td>
370:               <td class="px-4 py-3"><code>#2d7984</code></td>
371:               <td class="px-4 py-3"><code>bg-primary</code></td>
372:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary rounded"></div></td>
373:             </tr>
374:             <tr>
375:               <td class="px-4 py-3">Primary Light</td>
376:               <td class="px-4 py-3"><code>#58cbe0</code></td>
377:               <td class="px-4 py-3"><code>bg-primary-light</code></td>
378:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-light rounded"></div></td>
379:             </tr>
380:             <tr>
381:               <td class="px-4 py-3">Primary Dark</td>
382:               <td class="px-4 py-3"><code>#1d5058</code></td>
383:               <td class="px-4 py-3"><code>bg-primary-dark</code></td>
384:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-dark rounded"></div></td>
385:             </tr>
386:             
387:             <!-- Hover States -->
388:             <tr>
389:               <td class="px-4 py-3">Primary Hover</td>
390:               <td class="px-4 py-3"><code>#266974</code></td>
391:               <td class="px-4 py-3"><code>bg-primary-hover</code></td>
392:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-hover rounded"></div></td>
393:             </tr>
394:             <tr>
395:               <td class="px-4 py-3">Primary Light Hover</td>
396:               <td class="px-4 py-3"><code>#4bbbce</code></td>
397:               <td class="px-4 py-3"><code>bg-primary-lightHover</code></td>
398:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-lightHover rounded"></div></td>
399:             </tr>
400:             <tr>
401:               <td class="px-4 py-3">Primary Dark Hover</td>
402:               <td class="px-4 py-3"><code>#15373e</code></td>
403:               <td class="px-4 py-3"><code>bg-primary-darkHover</code></td>
404:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-darkHover rounded"></div></td>
405:             </tr>
406:             
407:             <!-- Active States -->
408:             <tr>
409:               <td class="px-4 py-3">Primary Active</td>
410:               <td class="px-4 py-3"><code>#1d5058</code></td>
411:               <td class="px-4 py-3"><code>bg-primary-active</code></td>
412:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-active rounded"></div></td>
413:             </tr>
414:             <tr>
415:               <td class="px-4 py-3">Primary Light Active</td>
416:               <td class="px-4 py-3"><code>#3eafc2</code></td>
417:               <td class="px-4 py-3"><code>bg-primary-lightActive</code></td>
418:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-lightActive rounded"></div></td>
419:             </tr>
420:             <tr>
421:               <td class="px-4 py-3">Primary Dark Active</td>
422:               <td class="px-4 py-3"><code>#102b30</code></td>
423:               <td class="px-4 py-3"><code>bg-primary-darkActive</code></td>
424:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-darkActive rounded"></div></td>
425:             </tr>
426:             
427:             <!-- Focus States -->
428:             <tr>
429:               <td class="px-4 py-3">Primary Focus</td>
430:               <td class="px-4 py-3"><code>#2d7984</code></td>
431:               <td class="px-4 py-3"><code>bg-primary-focus</code></td>
432:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-focus rounded"></div></td>
433:             </tr>
434:             <tr>
435:               <td class="px-4 py-3">Primary Light Focus</td>
436:               <td class="px-4 py-3"><code>#58cbe0</code></td>
437:               <td class="px-4 py-3"><code>bg-primary-lightFocus</code></td>
438:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-lightFocus rounded"></div></td>
439:             </tr>
440:             <tr>
441:               <td class="px-4 py-3">Primary Dark Focus</td>
442:               <td class="px-4 py-3"><code>#1d5058</code></td>
443:               <td class="px-4 py-3"><code>bg-primary-darkFocus</code></td>
444:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-darkFocus rounded"></div></td>
445:             </tr>
446:             
447:             <!-- Disabled States -->
448:             <tr>
449:               <td class="px-4 py-3">Primary Disabled</td>
450:               <td class="px-4 py-3"><code>#a3c5cb</code></td>
451:               <td class="px-4 py-3"><code>bg-primary-disabled</code></td>
452:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-disabled rounded"></div></td>
453:             </tr>
454:             <tr>
455:               <td class="px-4 py-3">Primary Light Disabled</td>
456:               <td class="px-4 py-3"><code>#b8e0ea</code></td>
457:               <td class="px-4 py-3"><code>bg-primary-lightDisabled</code></td>
458:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-lightDisabled rounded"></div></td>
459:             </tr>
460:             <tr>
461:               <td class="px-4 py-3">Primary Dark Disabled</td>
462:               <td class="px-4 py-3"><code>#6a8a8f</code></td>
463:               <td class="px-4 py-3"><code>bg-primary-darkDisabled</code></td>
464:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-darkDisabled rounded"></div></td>
465:             </tr>
466:             
467:             <!-- Text Colors -->
468:             <tr>
469:               <td class="px-4 py-3">Text on Primary</td>
470:               <td class="px-4 py-3"><code>#ffffff</code></td>
471:               <td class="px-4 py-3"><code>text-primary-textOnPrimary</code></td>
472:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary flex items-center justify-center"><span class="text-primary-textOnPrimary text-xs">Text</span></div></td>
473:             </tr>
474:             <tr>
475:               <td class="px-4 py-3">Text on Light</td>
476:               <td class="px-4 py-3"><code>#1a2234</code></td>
477:               <td class="px-4 py-3"><code>text-primary-textOnLight</code></td>
478:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-light flex items-center justify-center"><span class="text-primary-textOnLight text-xs">Text</span></div></td>
479:             </tr>
480:             <tr>
481:               <td class="px-4 py-3">Text on Dark</td>
482:               <td class="px-4 py-3"><code>#ffffff</code></td>
483:               <td class="px-4 py-3"><code>text-primary-textOnDark</code></td>
484:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-dark flex items-center justify-center"><span class="text-primary-textOnDark text-xs">Text</span></div></td>
485:             </tr>
486:           </tbody>
487:         </table>
488:       </div>
489:     </section>
490:   </div>
491: </Layout>
```

## File: src/pages/dark-mode-transitions-demo.astro
```
  1: ---
  2: import Layout from '../layouts/Layout.astro';
  3: ---
  4: 
  5: <Layout title="Dark Mode Transitions Demo">
  6:     <main class="container mx-auto px-6 py-12 max-w-4xl">
  7:         <!-- Header Section -->
  8:         <div class="text-center mb-12">
  9:             <h1 class="text-4xl font-bold mb-4 transition-theme">
 10:                 Dark Mode Transitions Demo
 11:             </h1>
 12:             <p class="text-lg text-text-muted-light dark:text-text-muted-dark transition-theme">
 13:                 Test the smooth transitions between light and dark modes using our custom utility classes.
 14:             </p>
 15:         </div>
 16: 
 17:         <!-- Theme Toggle Instructions -->
 18:         <div class="bg-background-form-light dark:bg-background-form-dark p-6 rounded-lg mb-8 transition-theme">
 19:             <h2 class="text-2xl font-semibold mb-4 transition-theme">How to Test</h2>
 20:             <p class="mb-4 transition-theme">
 21:                 Use the theme toggle button in the header to switch between light and dark modes. 
 22:                 Notice how all elements transition smoothly without jarring color changes.
 23:             </p>
 24:             <div class="bg-primary/10 border border-primary/20 rounded-lg p-4 transition-theme">
 25:                 <p class="text-sm transition-theme">
 26:                     <strong>Note:</strong> If you have "prefers-reduced-motion" enabled in your system settings, 
 27:                     transitions will be disabled for accessibility.
 28:                 </p>
 29:             </div>
 30:         </div>
 31: 
 32:         <!-- Transition Utility Classes Demo -->
 33:         <section class="mb-12">
 34:             <h2 class="text-3xl font-bold mb-6 transition-theme">Available Transition Classes</h2>
 35:             
 36:             <div class="grid gap-6 md:grid-cols-2">
 37:                 <!-- Base Theme Transition -->
 38:                 <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-light dark:border-border-dark transition-theme">
 39:                     <h3 class="text-xl font-semibold mb-3 transition-theme">.transition-theme</h3>
 40:                     <p class="text-text-muted-light dark:text-text-muted-dark mb-4 transition-theme">
 41:                         Standard theme transition for color, background-color, border-color, box-shadow, outline-color, fill, and stroke properties.
 42:                     </p>
 43:                     <code class="bg-background-input-light dark:bg-background-input-dark px-2 py-1 rounded text-sm transition-theme">
 44:                         transition-duration: 250ms
 45:                     </code>
 46:                 </div>
 47: 
 48:                 <!-- Fast Theme Transition -->
 49:                 <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-light dark:border-border-dark transition-theme-fast">
 50:                     <h3 class="text-xl font-semibold mb-3 transition-theme-fast">.transition-theme-fast</h3>
 51:                     <p class="text-text-muted-light dark:text-text-muted-dark mb-4 transition-theme-fast">
 52:                         Faster theme transition for interactive elements that need quick feedback.
 53:                     </p>
 54:                     <code class="bg-background-input-light dark:bg-background-input-dark px-2 py-1 rounded text-sm transition-theme-fast">
 55:                         transition-duration: 150ms
 56:                     </code>
 57:                 </div>
 58: 
 59:                 <!-- Slow Theme Transition -->
 60:                 <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-light dark:border-border-dark transition-theme-slow">
 61:                     <h3 class="text-xl font-semibold mb-3 transition-theme-slow">.transition-theme-slow</h3>
 62:                     <p class="text-text-muted-light dark:text-text-muted-dark mb-4 transition-theme-slow">
 63:                         Slower, smoother theme transition for larger layout changes.
 64:                     </p>
 65:                     <code class="bg-background-input-light dark:bg-background-input-dark px-2 py-1 rounded text-sm transition-theme-slow">
 66:                         transition-duration: 400ms
 67:                     </code>
 68:                 </div>
 69: 
 70:                 <!-- Colors Only Transition -->
 71:                 <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-light dark:border-border-dark transition-colors-smooth">
 72:                     <h3 class="text-xl font-semibold mb-3 transition-colors-smooth">.transition-colors-smooth</h3>
 73:                     <p class="text-text-muted-light dark:text-text-muted-dark mb-4 transition-colors-smooth">
 74:                         Smooth transition for color properties only (color, background-color, border-color).
 75:                     </p>
 76:                     <code class="bg-background-input-light dark:bg-background-input-dark px-2 py-1 rounded text-sm transition-colors-smooth">
 77:                         timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94)
 78:                     </code>
 79:                 </div>
 80:             </div>
 81:         </section>
 82: 
 83:         <!-- Interactive Elements Demo -->
 84:         <section class="mb-12">
 85:             <h2 class="text-3xl font-bold mb-6 transition-theme">Interactive Elements</h2>
 86:             
 87:             <div class="space-y-6">
 88:                 <!-- Buttons -->
 89:                 <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-light dark:border-border-dark transition-theme">
 90:                     <h3 class="text-xl font-semibold mb-4 transition-theme">Buttons with Transitions</h3>
 91:                     <div class="flex flex-wrap gap-4">
 92:                         <button class="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg transition-theme-fast">
 93:                             Primary Button
 94:                         </button>
 95:                         <button class="bg-secondary hover:bg-secondary-hover text-white px-6 py-3 rounded-lg transition-theme-fast">
 96:                             Secondary Button
 97:                         </button>
 98:                         <button class="bg-accent hover:bg-accent-hover text-accent-textOnAccent px-6 py-3 rounded-lg transition-theme-fast">
 99:                             Accent Button
100:                         </button>
101:                         <button class="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg transition-theme-fast">
102:                             Outline Button
103:                         </button>
104:                     </div>
105:                 </div>
106: 
107:                 <!-- Form Elements -->
108:                 <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-light dark:border-border-dark transition-theme">
109:                     <h3 class="text-xl font-semibold mb-4 transition-theme">Form Elements</h3>
110:                     <div class="space-y-4">
111:                         <div>
112:                             <label class="block text-sm font-medium mb-2 transition-theme">Text Input</label>
113:                             <input 
114:                                 type="text" 
115:                                 placeholder="Type something..." 
116:                                 class="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-input-light dark:bg-background-input-dark text-text-light dark:text-text-dark transition-theme focus:ring-2 focus:ring-primary focus:border-transparent"
117:                             />
118:                         </div>
119:                         <div>
120:                             <label class="block text-sm font-medium mb-2 transition-theme">Select Dropdown</label>
121:                             <select class="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-input-light dark:bg-background-input-dark text-text-light dark:text-text-dark transition-theme">
122:                                 <option>Option 1</option>
123:                                 <option>Option 2</option>
124:                                 <option>Option 3</option>
125:                             </select>
126:                         </div>
127:                         <div>
128:                             <label class="block text-sm font-medium mb-2 transition-theme">Textarea</label>
129:                             <textarea 
130:                                 rows="3" 
131:                                 placeholder="Enter your message..." 
132:                                 class="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-input-light dark:bg-background-input-dark text-text-light dark:text-text-dark transition-theme resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
133:                             ></textarea>
134:                         </div>
135:                     </div>
136:                 </div>
137: 
138:                 <!-- Cards with Hover Effects -->
139:                 <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-light dark:border-border-dark transition-theme">
140:                     <h3 class="text-xl font-semibold mb-4 transition-theme">Interactive Cards</h3>
141:                     <div class="grid gap-4 md:grid-cols-3">
142:                         <div class="bg-background-form-light dark:bg-background-form-dark p-4 rounded-lg border border-border-light dark:border-border-dark transition-theme hover:shadow-lg hover:border-primary cursor-pointer">
143:                             <h4 class="font-semibold mb-2 transition-theme">Card 1</h4>
144:                             <p class="text-text-muted-light dark:text-text-muted-dark text-sm transition-theme">
145:                                 Hover over this card to see the smooth transition effects.
146:                             </p>
147:                         </div>
148:                         <div class="bg-background-form-light dark:bg-background-form-dark p-4 rounded-lg border border-border-light dark:border-border-dark transition-theme hover:shadow-lg hover:border-secondary cursor-pointer">
149:                             <h4 class="font-semibold mb-2 transition-theme">Card 2</h4>
150:                             <p class="text-text-muted-light dark:text-text-muted-dark text-sm transition-theme">
151:                                 Notice how the border color changes smoothly on hover.
152:                             </p>
153:                         </div>
154:                         <div class="bg-background-form-light dark:bg-background-form-dark p-4 rounded-lg border border-border-light dark:border-border-dark transition-theme hover:shadow-lg hover:border-accent cursor-pointer">
155:                             <h4 class="font-semibold mb-2 transition-theme">Card 3</h4>
156:                             <p class="text-text-muted-light dark:text-text-muted-dark text-sm transition-theme">
157:                                 All theme transitions respect the user's motion preferences.
158:                             </p>
159:                         </div>
160:                     </div>
161:                 </div>
162:             </div>
163:         </section>
164: 
165:         <!-- Transition Properties Reference -->
166:         <section class="mb-12">
167:             <h2 class="text-3xl font-bold mb-6 transition-theme">Transition Properties Reference</h2>
168:             
169:             <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-light dark:border-border-dark transition-theme">
170:                 <div class="overflow-x-auto">
171:                     <table class="w-full text-left">
172:                         <thead>
173:                             <tr class="border-b border-border-light dark:border-border-dark">
174:                                 <th class="py-3 px-4 font-semibold transition-theme">Class</th>
175:                                 <th class="py-3 px-4 font-semibold transition-theme">Duration</th>
176:                                 <th class="py-3 px-4 font-semibold transition-theme">Properties</th>
177:                                 <th class="py-3 px-4 font-semibold transition-theme">Timing Function</th>
178:                             </tr>
179:                         </thead>
180:                         <tbody class="transition-theme">
181:                             <tr class="border-b border-border-light dark:border-border-dark transition-theme">
182:                                 <td class="py-3 px-4 font-mono text-sm transition-theme">.transition-theme</td>
183:                                 <td class="py-3 px-4 transition-theme">250ms</td>
184:                                 <td class="py-3 px-4 text-sm transition-theme">color, background-color, border-color, box-shadow, outline-color, fill, stroke</td>
185:                                 <td class="py-3 px-4 text-sm transition-theme">cubic-bezier(0.4, 0, 0.2, 1)</td>
186:                             </tr>
187:                             <tr class="border-b border-border-light dark:border-border-dark transition-theme">
188:                                 <td class="py-3 px-4 font-mono text-sm transition-theme">.transition-theme-fast</td>
189:                                 <td class="py-3 px-4 transition-theme">150ms</td>
190:                                 <td class="py-3 px-4 text-sm transition-theme">color, background-color, border-color, box-shadow, outline-color, fill, stroke</td>
191:                                 <td class="py-3 px-4 text-sm transition-theme">cubic-bezier(0.4, 0, 0.2, 1)</td>
192:                             </tr>
193:                             <tr class="border-b border-border-light dark:border-border-dark transition-theme">
194:                                 <td class="py-3 px-4 font-mono text-sm transition-theme">.transition-theme-slow</td>
195:                                 <td class="py-3 px-4 transition-theme">400ms</td>
196:                                 <td class="py-3 px-4 text-sm transition-theme">color, background-color, border-color, box-shadow, outline-color, fill, stroke</td>
197:                                 <td class="py-3 px-4 text-sm transition-theme">cubic-bezier(0.25, 0.46, 0.45, 0.94)</td>
198:                             </tr>
199:                             <tr class="transition-theme">
200:                                 <td class="py-3 px-4 font-mono text-sm transition-theme">.transition-theme-slow</td>
201:                                 <td class="py-3 px-4 transition-theme">250ms</td>
202:                                 <td class="py-3 px-4 text-sm transition-theme">color, background-color, border-color</td>
203:                                 <td class="py-3 px-4 text-sm transition-theme">cubic-bezier(0.25, 0.46, 0.45, 0.94)</td>
204:                             </tr>
205:                         </tbody>
206:                     </table>
207:                 </div>
208:             </div>
209:         </section>
210: 
211:         <!-- Accessibility Note -->
212:         <section class="mb-12">
213:             <h2 class="text-3xl font-bold mb-6 transition-theme">Accessibility Considerations</h2>
214:             
215:             <div class="bg-background-form-light dark:bg-background-form-dark p-6 rounded-lg border border-border-light dark:border-border-dark transition-theme">
216:                 <div class="flex items-start space-x-4">
217:                     <div class="flex-shrink-0">
218:                         <svg class="w-6 h-6 text-info transition-theme" fill="currentColor" viewBox="0 0 20 20">
219:                             <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
220:                         </svg>
221:                     </div>
222:                     <div>
223:                         <h3 class="text-lg font-semibold mb-2 transition-theme">Reduced Motion Support</h3>
224:                         <p class="text-text-muted-light dark:text-text-muted-dark mb-4 transition-theme">
225:                             Our transition system automatically respects the user's <code class="bg-background-input-light dark:bg-background-input-dark px-2 py-1 rounded text-sm transition-theme">prefers-reduced-motion</code> setting. 
226:                             When this preference is enabled, all transitions are disabled to prevent motion sickness or distraction.
227:                         </p>
228:                         <div class="bg-primary/10 border border-primary/20 rounded-lg p-4 transition-theme">
229:                             <p class="text-sm transition-theme">
230:                                 <strong>Technical Implementation:</strong> We use <code>@media (prefers-reduced-motion: reduce)</code> 
231:                                 to override all transition properties with <code>transition: none !important</code> when needed.
232:                             </p>
233:                         </div>
234:                     </div>
235:                 </div>
236:             </div>
237:         </section>
238: 
239:         <!-- Usage Guidelines -->
240:         <section>
241:             <h2 class="text-3xl font-bold mb-6 transition-theme">Usage Guidelines</h2>
242:             
243:             <div class="space-y-6">
244:                 <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-light dark:border-border-dark transition-theme">
245:                     <h3 class="text-xl font-semibold mb-4 transition-theme">When to Use Each Transition</h3>
246:                     <ul class="space-y-3">
247:                         <li class="transition-theme">
248:                             <strong class="text-primary transition-theme">.transition-theme:</strong> 
249:                             Use for general UI elements like cards, containers, and text content.
250:                         </li>
251:                         <li class="transition-theme">
252:                             <strong class="text-secondary transition-theme">.transition-theme-fast:</strong> 
253:                             Use for interactive elements like buttons, links, and form inputs that need quick feedback.
254:                         </li>
255:                         <li class="transition-theme">
256:                             <strong class="text-accent transition-theme">.transition-theme-slow:</strong> 
257:                             Use for larger layout changes or when you want to emphasize the transition.
258:                         </li>
259:                         <li class="transition-theme">
260:                             <strong class="text-success transition-theme">.transition-colors-smooth:</strong> 
261:                             Use when you only need color transitions without shadows or other properties.
262:                         </li>
263:                     </ul>
264:                 </div>
265: 
266:                 <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-light dark:border-border-dark transition-theme">
267:                     <h3 class="text-xl font-semibold mb-4 transition-theme">Performance Tips</h3>
268:                     <ul class="space-y-3">
269:                         <li class="transition-theme">
270:                             • Use the most specific transition class for your needs to avoid unnecessary property animations
271:                         </li>
272:                         <li class="transition-theme">
273:                             • Prefer <code class="bg-background-input-light dark:bg-background-input-dark px-1 py-0.5 rounded text-sm transition-theme">.transition-colors-smooth</code> when only colors need to transition
274:                         </li>
275:                         <li class="transition-theme">
276:                             • The global base styles automatically apply transitions to common elements
277:                         </li>
278:                         <li class="transition-theme">
279:                             • All transitions respect the <code class="bg-background-input-light dark:bg-background-input-dark px-1 py-0.5 rounded text-sm transition-theme">prefers-reduced-motion</code> setting
280:                         </li>
281:                     </ul>
282:                 </div>
283:             </div>
284:         </section>
285: 
286:         <!-- Navigation Links -->
287:         <div class="mt-12 pt-8 border-t border-border-light dark:border-border-dark transition-theme">
288:             <div class="flex flex-wrap gap-4 justify-center">
289:                 <a href="/color-palette-demo" class="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg transition-theme-fast">
290:                     View Primary Colors
291:                 </a>
292:                 <a href="/secondary-accent-palette-demo" class="bg-secondary hover:bg-secondary-hover text-white px-6 py-3 rounded-lg transition-theme-fast">
293:                     View Secondary Colors
294:                 </a>
295:                 <a href="/background-text-colors-demo" class="bg-accent hover:bg-accent-hover text-accent-textOnAccent px-6 py-3 rounded-lg transition-theme-fast">
296:                     View Background Colors
297:                 </a>
298:                 <a href="/" class="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg transition-theme-fast">
299:                     Back to Home
300:                 </a>
301:             </div>
302:         </div>
303:     </main>
304: </Layout>
```

## File: src/pages/email-preview.astro
```
  1: ---
  2: /**
  3:  * Email Template Preview Page
  4:  * 
  5:  * Development page for previewing and testing email templates
  6:  * Access via /email-preview in development mode
  7:  */
  8: 
  9: import Layout from '../layouts/Layout.astro';
 10: import { previewEmailTemplate, EmailPreviewData, validateTemplateRendering } from '../emails/preview';
 11: import type { EmailTemplateType } from '../emails/types';
 12: 
 13: // Only allow in development
 14: if (import.meta.env.PROD) {
 15:     return new Response('Not found', { status: 404 });
 16: }
 17: 
 18: // Get template type from URL params
 19: const url = new URL(Astro.request.url);
 20: const templateParam = url.searchParams.get('template') as EmailTemplateType | null;
 21: const formatParam = url.searchParams.get('format') || 'html';
 22: 
 23: // Validate template parameter
 24: const validTemplates: EmailTemplateType[] = ['lead_confirmation', 'internal_notification', 'error_notification', 'welcome'];
 25: const selectedTemplate = templateParam && validTemplates.includes(templateParam) ? templateParam : null;
 26: 
 27: // Render selected template if specified
 28: let renderedTemplate = '';
 29: let validationResults = null;
 30: 
 31: if (selectedTemplate) {
 32:     try {
 33:         renderedTemplate = await previewEmailTemplate(selectedTemplate, formatParam as 'html' | 'text');
 34:         
 35:         if (url.searchParams.get('validate') === 'true') {
 36:             validationResults = await validateTemplateRendering(selectedTemplate);
 37:         }
 38:     } catch (error) {
 39:         renderedTemplate = `<div style="color: red; padding: 20px; border: 1px solid red; border-radius: 8px;">
 40:             <h3>Error Rendering Template</h3>
 41:             <p>${error}</p>
 42:         </div>`;
 43:     }
 44: }
 45: 
 46: // Sample data for display
 47: const sampleData = {
 48:     lead_confirmation: EmailPreviewData.getLeadConfirmationData(),
 49:     internal_notification: EmailPreviewData.getInternalNotificationData(),
 50:     error_notification: EmailPreviewData.getErrorNotificationData(),
 51:     welcome: EmailPreviewData.getWelcomeData()
 52: };
 53: ---
 54: 
 55: <Layout title="Email Template Preview - Development">
 56:     <div class="min-h-screen bg-gray-50 py-8">
 57:         <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 58:             <div class="bg-white shadow rounded-lg">
 59:                 <div class="px-6 py-4 border-b border-gray-200">
 60:                     <h1 class="text-2xl font-bold text-gray-900">📧 Email Template Preview</h1>
 61:                     <p class="mt-1 text-sm text-gray-600">
 62:                         Development tool for previewing and testing email templates
 63:                     </p>
 64:                 </div>
 65: 
 66:                 <div class="p-6">
 67:                     <!-- Template Selection -->
 68:                     <div class="mb-8">
 69:                         <h2 class="text-lg font-semibold text-gray-900 mb-4">Select Template</h2>
 70:                         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
 71:                             {validTemplates.map(template => (
 72:                                 <a 
 73:                                     href={`/email-preview?template=${template}`}
 74:                                     class={`block p-4 rounded-lg border-2 transition-colors ${
 75:                                         selectedTemplate === template 
 76:                                             ? 'border-blue-500 bg-blue-50' 
 77:                                             : 'border-gray-300 hover:border-gray-400'
 78:                                     }`}
 79:                                 >
 80:                                     <h3 class="font-semibold text-gray-900">
 81:                                         {template.split('_').map(word => 
 82:                                             word.charAt(0).toUpperCase() + word.slice(1)
 83:                                         ).join(' ')}
 84:                                     </h3>
 85:                                     <p class="text-sm text-gray-600 mt-1">
 86:                                         {template === 'lead_confirmation' && 'Sent to users who submit forms'}
 87:                                         {template === 'internal_notification' && 'Sent to team for new leads'}
 88:                                         {template === 'error_notification' && 'Sent to admins for errors'}
 89:                                         {template === 'welcome' && 'Sent to new registered users'}
 90:                                     </p>
 91:                                 </a>
 92:                             ))}
 93:                         </div>
 94:                     </div>
 95: 
 96:                     {/* Template Controls */}
 97:                     {selectedTemplate && (
 98:                         <div class="mb-6 p-4 bg-gray-50 rounded-lg">
 99:                             <h3 class="font-semibold text-gray-900 mb-3">Template Controls</h3>
100:                             <div class="flex flex-wrap gap-4">
101:                                 <a 
102:                                     href={`/email-preview?template=${selectedTemplate}&format=html`}
103:                                     class={`px-3 py-1 rounded text-sm ${
104:                                         formatParam === 'html' 
105:                                             ? 'bg-blue-600 text-white' 
106:                                             : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
107:                                     }`}
108:                                 >
109:                                     HTML Preview
110:                                 </a>
111:                                 <a 
112:                                     href={`/email-preview?template=${selectedTemplate}&format=text`}
113:                                     class={`px-3 py-1 rounded text-sm ${
114:                                         formatParam === 'text' 
115:                                             ? 'bg-blue-600 text-white' 
116:                                             : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
117:                                     }`}
118:                                 >
119:                                     Text Preview
120:                                 </a>
121:                                 <a 
122:                                     href={`/email-preview?template=${selectedTemplate}&validate=true`}
123:                                     class="px-3 py-1 rounded text-sm bg-green-200 text-green-700 hover:bg-green-300"
124:                                 >
125:                                     Validate Template
126:                                 </a>
127:                             </div>
128:                         </div>
129:                     )}
130: 
131:                     {/* Validation Results */}
132:                     {validationResults && (
133:                         <div class="mb-6">
134:                             <h3 class="font-semibold text-gray-900 mb-3">Validation Results</h3>
135:                             <div class={`p-4 rounded-lg ${
136:                                 validationResults.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
137:                             }`}>
138:                                 <div class={`font-semibold ${validationResults.success ? 'text-green-800' : 'text-red-800'}`}>
139:                                     {validationResults.success ? '✅ Template validation passed' : '❌ Template validation failed'}
140:                                 </div>
141:                                 
142:                                 {validationResults.errors.length > 0 && (
143:                                     <div class="mt-3">
144:                                         <h4 class="font-medium text-red-800">Errors:</h4>
145:                                         <ul class="list-disc list-inside text-red-700 text-sm mt-1">
146:                                             {validationResults.errors.map(error => (
147:                                                 <li>{error}</li>
148:                                             ))}
149:                                         </ul>
150:                                     </div>
151:                                 )}
152:                                 
153:                                 {validationResults.warnings.length > 0 && (
154:                                     <div class="mt-3">
155:                                         <h4 class="font-medium text-yellow-800">Warnings:</h4>
156:                                         <ul class="list-disc list-inside text-yellow-700 text-sm mt-1">
157:                                             {validationResults.warnings.map(warning => (
158:                                                 <li>{warning}</li>
159:                                             ))}
160:                                         </ul>
161:                                     </div>
162:                                 )}
163:                             </div>
164:                         </div>
165:                     )}
166: 
167:                     {/* Template Preview */}
168:                     {selectedTemplate && renderedTemplate && (
169:                         <div class="mb-8">
170:                             <div class="flex justify-between items-center mb-4">
171:                                 <h2 class="text-lg font-semibold text-gray-900">
172:                                     Template Preview: {selectedTemplate.split('_').map(word => 
173:                                         word.charAt(0).toUpperCase() + word.slice(1)
174:                                     ).join(' ')}
175:                                 </h2>
176:                                 <span class="text-sm text-gray-500">
177:                                     Format: {formatParam.toUpperCase()}
178:                                 </span>
179:                             </div>
180:                             
181:                             {formatParam === 'html' ? (
182:                                 <div class="border border-gray-300 rounded-lg overflow-hidden">
183:                                     <iframe 
184:                                         srcdoc={renderedTemplate}
185:                                         class="w-full h-[600px]"
186:                                         style="zoom: 0.8;"
187:                                     ></iframe>
188:                                 </div>
189:                             ) : (
190:                                 <div class="bg-gray-100 p-6 rounded-lg">
191:                                     <pre class="whitespace-pre-wrap text-sm text-gray-800 font-mono">
192:                                         {renderedTemplate}
193:                                     </pre>
194:                                 </div>
195:                             )}
196:                         </div>
197:                     )}
198: 
199:                     {/* Sample Data Display */}
200:                     {selectedTemplate && (
201:                         <div class="mb-8">
202:                             <h2 class="text-lg font-semibold text-gray-900 mb-4">Sample Data</h2>
203:                             <details class="bg-gray-50 rounded-lg">
204:                                 <summary class="p-4 cursor-pointer hover:bg-gray-100 rounded-lg">
205:                                     <span class="font-medium">View sample data used for this template</span>
206:                                 </summary>
207:                                 <div class="p-4 pt-0">
208:                                     <pre class="bg-white p-4 rounded border text-sm overflow-x-auto">
209:                                         {JSON.stringify(sampleData[selectedTemplate], null, 2)}
210:                                     </pre>
211:                                 </div>
212:                             </details>
213:                         </div>
214:                     )}
215: 
216:                     {/* Usage Instructions */}
217:                     <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
218:                         <h2 class="text-lg font-semibold text-blue-900 mb-4">📖 Usage Instructions</h2>
219:                         <div class="text-blue-800 space-y-3 text-sm">
220:                             <p><strong>Preview Templates:</strong> Click on any template above to see how it renders with sample data.</p>
221:                             <p><strong>Format Options:</strong> Switch between HTML and text format to see both versions.</p>
222:                             <p><strong>Validation:</strong> Use the validate button to check for potential rendering issues.</p>
223:                             <p><strong>Sample Data:</strong> Expand the sample data section to see the data structure used.</p>
224:                             <p><strong>Development Only:</strong> This page is only available in development mode.</p>
225:                         </div>
226:                     </div>
227: 
228:                     {/* Quick Links */}
229:                     <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
230:                         <div class="bg-white border border-gray-200 rounded-lg p-4">
231:                             <h3 class="font-semibold text-gray-900 mb-2">📁 Template Files</h3>
232:                             <p class="text-sm text-gray-600 mb-3">Email templates are located at:</p>
233:                             <code class="text-xs bg-gray-100 px-2 py-1 rounded">src/emails/templates/</code>
234:                         </div>
235:                         
236:                         <div class="bg-white border border-gray-200 rounded-lg p-4">
237:                             <h3 class="font-semibold text-gray-900 mb-2">🔧 Configuration</h3>
238:                             <p class="text-sm text-gray-600 mb-3">Email config and types:</p>
239:                             <code class="text-xs bg-gray-100 px-2 py-1 rounded">src/emails/types.ts</code>
240:                         </div>
241:                         
242:                         <div class="bg-white border border-gray-200 rounded-lg p-4">
243:                             <h3 class="font-semibold text-gray-900 mb-2">⚙️ Resend Setup</h3>
244:                             <p class="text-sm text-gray-600 mb-3">Email service configuration:</p>
245:                             <code class="text-xs bg-gray-100 px-2 py-1 rounded">src/config/resend.ts</code>
246:                         </div>
247:                     </div>
248:                 </div>
249:             </div>
250:         </div>
251:     </div>
252: </Layout>
253: 
254: <style>
255:     /* Ensure iframes display properly */
256:     iframe {
257:         border: none;
258:         display: block;
259:     }
260:     
261:     /* Make code blocks more readable */
262:     pre {
263:         max-height: 400px;
264:         overflow-y: auto;
265:     }
266:     
267:     /* Improve details/summary styling */
268:     details[open] summary {
269:         border-bottom: 1px solid #e5e7eb;
270:         margin-bottom: 1rem;
271:     }
272: </style>
```

## File: src/pages/image-cdn.astro
```
  1: ---
  2: import { Image } from 'astro:assets';
  3: import corgi from '../assets/corgi.jpg';
  4: import ContextAlert from '../components/ContextAlert.astro';
  5: import Diff from '../components/Diff.astro';
  6: import Markdown from '../components/Markdown.astro';
  7: import Layout from '../layouts/Layout.astro';
  8: 
  9: import { getNetlifyContext } from '../utils';
 10: 
 11: const sampleImage = '/images/corgi.jpg';
 12: 
 13: const ctx = getNetlifyContext();
 14: const forceWebP = ctx === 'dev';
 15: const sampleImageSrcSet = [640, 1280, 2048]
 16:     .map((size) => {
 17:         return `/.netlify/images?url=${sampleImage}&w=${size}${forceWebP ? '&fm=webp' : ''} ${size}w`;
 18:     })
 19:     .join(', ');
 20: const sizes = '(max-width: 1024px) 100vw, 1024px';
 21: 
 22: const astroImageSnippet = `
 23: ## Using the built-in Astro &lt;Image /&gt; component
 24: 
 25: Astro's \`Image\` component will automatically use Netlify Image CDN to serve optimized images.
 26: 
 27: ~~~jsx
 28: ---
 29: import { Image } from 'astro:assets';
 30: import corgi from '../assets/corgi.jpg';
 31: ---
 32: // Later in your markup...
 33: <Image src={corgi} alt="Corgi" /* ... additional props */ />
 34: ~~~
 35: `;
 36: 
 37: const originalVsCdnSnippet = `
 38: ## Original vs. optimized image: can you tell the difference?
 39: 
 40: In the code below, a regular \`<img>\` tag is used in both cases for a framework-agnostic example. 
 41: Note that aside from Astro's \`Image\` or rolling your own \`<img>\` tags, you can also use the excellent [unpic-img](https://unpic.pics/) package.
 42: 
 43: ~~~jsx
 44: // <== On the left, the original image
 45: <img src="/images/corgi.jpg" alt="Corgi" />
 46: 
 47: // ==> On the right, explicitly using Netlify Image CDN endpoint for a responsive image
 48: <img 
 49:   srcSet="${sampleImageSrcSet}"
 50:   sizes="${sizes}" 
 51:   alt="Corgi" 
 52: />
 53: ~~~
 54: `;
 55: 
 56: const devModeWarning = `
 57: In local development, optimization is performed locally without automatic format
 58: detection, so format is set to WebP.
 59: `;
 60: ---
 61: 
 62: <Layout title="Image CDN">
 63:     <div class="flex flex-col gap-12 sm:gap-16">
 64:         <section>
 65:             <ContextAlert
 66:                 addedChecksFunction={(ctx) => {
 67:                     return ctx === 'dev' ? devModeWarning : null;
 68:                 }}
 69:                 class="mb-8"
 70:             />
 71:             <h1>Image CDN</h1>
 72:         </section>
 73:         <section>
 74:             <Markdown content={astroImageSnippet} class="mb-8" />
 75:             <figure>
 76:                 <Image src={corgi} alt="Corgi" class="border-2 border-white rounded-lg" />
 77:                 <figcaption class="mt-2 text-sm italic">
 78:                     Credit: photo by <a href="https://unsplash.com/@alvannee">Alvan Nee</a> on
 79:                     <a href="https://unsplash.com/photos/long-coated-white-and-brown-dog-lvFlpqEvuRM"> Unsplash </a>
 80:                 </figcaption>
 81:             </figure>
 82:         </section>
 83:         <section>
 84:             <Markdown content={originalVsCdnSnippet} class="mb-8" />
 85:             <Diff class="border-2 border-white rounded-lg image-diff aspect-3/2">
 86:                 <Fragment slot="item-1">
 87:                     <div>
 88:                         <div class="relative">
 89:                             <span class="hidden absolute py-1.5 px-2.5 text-sm rounded-md bg-gray-900/70 top-2.5 left-2.5"></span>
 90:                             <img src={sampleImage} alt="Corgi" />
 91:                         </div>
 92:                     </div>
 93:                 </Fragment>
 94:                 <Fragment slot="item-2">
 95:                     <div>
 96:                         <div class="relative">
 97:                             <span class="hidden absolute py-1.5 px-2.5 text-sm rounded-md bg-gray-900/70 top-2.5 right-2.5"></span>
 98: 
 99:                             <img srcset={sampleImageSrcSet} alt="Corgi" />
100:                         </div>
101:                     </div>
102:                 </Fragment>
103:             </Diff>
104:         </section>
105:     </div>
106: </Layout>
107: 
108: <script>
109:     const images = document.querySelectorAll<HTMLImageElement>('.image-diff img');
110: 
111:     images.forEach((image) => {
112:         if (image.complete) {
113:             showImageSize(image);
114:         } else {
115:             image.addEventListener('load', () => {
116:                 showImageSize(image);
117:             });
118:         }
119:     });
120: 
121:     function showImageSize(image: HTMLImageElement) {
122:         const imageEntry = window?.performance?.getEntriesByName(image.currentSrc)?.[0] as PerformanceResourceTiming;
123:         if (imageEntry && imageEntry.encodedBodySize) {
124:             const imageOverlay = image.previousElementSibling;
125:             imageOverlay.classList.remove('hidden');
126:             imageOverlay.textContent = `Size: ${Math.ceil(imageEntry.encodedBodySize / 1024)}KB`;
127:         }
128:     }
129: </script>
```

## File: src/pages/revalidation.astro
```
 1: ---
 2: import Layout from '../layouts/Layout.astro';
 3: import ContextAlert from '../components/ContextAlert.astro';
 4: import Markdown from '../components/Markdown.astro';
 5: import { cacheHeaders, randomInt } from '../utils';
 6: 
 7: export const prerender = false;
 8: 
 9: const tags = ['/revalidation', 'cats-related', 'all-pets-related'];
10: const headers = cacheHeaders(365, tags);
11: 
12: Object.entries(headers).map(([k, v]) => {
13:     Astro.response.headers.set(k, v);
14: });
15: 
16: const explainer = `
17: This is a server-rendered page, last created at \`${new Date().toUTCString()}\` with a few extra response headers:
18: 
19: ~~~js
20: ${JSON.stringify(headers, null, 2)}
21: ~~~
22: 
23: Meaning: **for browsers,** this is a non-cacheable page. At the **CDN level,** it *is* cacheable for up to a year (and Netlify also automatically busts the cache on new deployments, by default).
24: 
25: But there's something more: the \`Cache-Tag\` header, in tandem with the [purge API](https://docs.netlify.com/platform/caching/#on-demand-invalidation), allows a developer to invalidate at will any
26: pieces of content (pages, JSON responses, or whatnot) based on the tags associated with them. Tags are completely up to you to decide on, and allow for very powerful patterns.
27: 
28: In real-world applications, you may want to use [stale-while-revalidate](https://docs.netlify.com/platform/caching/#stale-while-revalidate-directive) as well, so that end-users don't experience 
29: a performance hit as pages are being rebuilt.
30: 
31: Use the button below to invlidate a random tag out of this page's tags, then refresh the page.
32: `;
33: 
34: const exampleTag = tags[randomInt(0, tags.length - 1)];
35: ---
36: 
37: <Layout title="Revalidation">
38:     <h1 class="mb-10">Revalidating Server Content</h1>
39:     <Markdown content={explainer} class="mb-10" />
40:     <div class="flex flex-wrap gap-4">
41:         <button class="revalidate-button btn" data-tag={exampleTag}>Invalidate tag: {exampleTag}</button>
42:         <button class="btn" onclick="location.reload()">Reload page</button>
43:     </div>
44: </Layout>
45: 
46: <script>
47:     function revalidate(tag: string) {
48:         fetch('/api/revalidate', {
49:             method: 'POST',
50:             body: JSON.stringify({ tags: [tag] }),
51:             headers: {
52:                 'Content-Type': 'application/json'
53:             }
54:         });
55:         alert(`Invalidated tag: ${tag}`);
56:     }
57: 
58:     const revalidateButton = document.querySelectorAll('button.revalidate-button')[0];
59:     revalidateButton.addEventListener('click', (e) => {
60:         const tag = (e.target as HTMLButtonElement).getAttribute('data-tag');
61:         revalidate(tag);
62:     });
63: </script>
```

## File: src/pages/secondary-accent-palette-demo.astro
```
  1: ---
  2: import Layout from '../layouts/Layout.astro';
  3: import ThemeToggle from '../components/ThemeToggle.astro';
  4: ---
  5: 
  6: <Layout title="Secondary & Accent Color Palette Demo">
  7:   <div class="max-w-5xl mx-auto py-8">
  8:     <div class="flex justify-between items-center mb-8">
  9:       <h1 class="text-4xl font-bold">Secondary & Accent Color Palettes</h1>
 10:       <div class="md:hidden">
 11:         <ThemeToggle />
 12:       </div>
 13:     </div>
 14:     
 15:     <p class="mb-8 text-lg">
 16:       This page demonstrates the comprehensive secondary and accent color palettes with all variants for both light and dark mode.
 17:       Use the theme toggle in the header to switch between modes and see how colors adapt.
 18:     </p>
 19:     
 20:     <div class="flex space-x-4 mb-8">
 21:       <a href="/color-palette-demo" class="bg-primary hover:bg-primary-hover text-primary-textOnPrimary px-4 py-2 rounded">Primary Palette</a>
 22:       <a href="/secondary-accent-palette-demo" class="bg-secondary hover:bg-secondary-hover text-secondary-textOnSecondary px-4 py-2 rounded">Secondary & Accent Palette</a>
 23:     </div>
 24: 
 25:     <!-- SECONDARY COLOR PALETTE -->
 26:     <h2 class="text-3xl font-bold mb-6 pb-2 border-b border-border dark:border-gray-700">Secondary Color Palette</h2>
 27:     
 28:     <!-- Secondary Base Colors Section -->
 29:     <section class="mb-12">
 30:       <h3 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Base Colors</h3>
 31:       <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
 32:         <!-- Secondary Default -->
 33:         <div class="rounded-lg overflow-hidden shadow-md">
 34:           <div class="h-32 bg-secondary flex items-center justify-center">
 35:             <span class="text-secondary-textOnSecondary font-semibold">#0062b3</span>
 36:           </div>
 37:           <div class="p-4 bg-white dark:bg-gray-800">
 38:             <h3 class="font-semibold">Secondary</h3>
 39:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-secondary</code>
 40:           </div>
 41:         </div>
 42:         
 43:         <!-- Light Variant -->
 44:         <div class="rounded-lg overflow-hidden shadow-md">
 45:           <div class="h-32 bg-secondary-light flex items-center justify-center">
 46:             <span class="text-secondary-textOnLight font-semibold">#4a94d8</span>
 47:           </div>
 48:           <div class="p-4 bg-white dark:bg-gray-800">
 49:             <h3 class="font-semibold">Secondary Light</h3>
 50:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-secondary-light</code>
 51:           </div>
 52:         </div>
 53:         
 54:         <!-- Dark Variant -->
 55:         <div class="rounded-lg overflow-hidden shadow-md">
 56:           <div class="h-32 bg-secondary-dark flex items-center justify-center">
 57:             <span class="text-secondary-textOnDark font-semibold">#004b8c</span>
 58:           </div>
 59:           <div class="p-4 bg-white dark:bg-gray-800">
 60:             <h3 class="font-semibold">Secondary Dark</h3>
 61:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-secondary-dark</code>
 62:           </div>
 63:         </div>
 64:       </div>
 65:     </section>
 66:     
 67:     <!-- Secondary Interactive Elements Section -->
 68:     <section class="mb-12">
 69:       <h3 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Interactive States</h3>
 70:       <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 71:         <!-- Buttons -->
 72:         <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
 73:           <h4 class="font-semibold mb-4">Buttons</h4>
 74:           <div class="space-y-4">
 75:             <div>
 76:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Secondary Button (hover & active states)</p>
 77:               <button class="bg-secondary hover:bg-secondary-hover active:bg-secondary-active text-secondary-textOnSecondary px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-secondary-focus focus:ring-opacity-50">
 78:                 Secondary Button
 79:               </button>
 80:             </div>
 81:             
 82:             <div>
 83:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Light Variant (hover & active states)</p>
 84:               <button class="bg-secondary-light hover:bg-secondary-lightHover active:bg-secondary-lightActive text-secondary-textOnLight px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-secondary-lightFocus focus:ring-opacity-50">
 85:                 Light Button
 86:               </button>
 87:             </div>
 88:             
 89:             <div>
 90:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Dark Variant (hover & active states)</p>
 91:               <button class="bg-secondary-dark hover:bg-secondary-darkHover active:bg-secondary-darkActive text-secondary-textOnDark px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-secondary-darkFocus focus:ring-opacity-50">
 92:                 Dark Button
 93:               </button>
 94:             </div>
 95:             
 96:             <div>
 97:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Disabled State</p>
 98:               <button class="bg-secondary-disabled text-white px-4 py-2 rounded cursor-not-allowed opacity-75">
 99:                 Disabled Button
100:               </button>
101:             </div>
102:           </div>
103:         </div>
104:         
105:         <!-- Other Interactive Elements -->
106:         <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
107:           <h4 class="font-semibold mb-4">Form Elements</h4>
108:           <div class="space-y-4">
109:             <div>
110:               <label class="block mb-2">Input with focus state</label>
111:               <input type="text" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-secondary-focus focus:border-secondary" placeholder="Focus to see secondary-focus ring">
112:             </div>
113:             
114:             <div>
115:               <label class="block mb-2">Input with light variant focus</label>
116:               <input type="text" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-secondary-lightFocus focus:border-secondary-light" placeholder="Focus to see secondary-lightFocus ring">
117:             </div>
118:             
119:             <div>
120:               <p class="mb-2">Link with hover/focus styles</p>
121:               <a href="#" class="text-secondary hover:text-secondary-hover focus:outline-none focus:ring-2 focus:ring-secondary-focus rounded">Secondary link with hover state</a>
122:             </div>
123:           </div>
124:         </div>
125:       </div>
126:     </section>
127:     
128:     <!-- Secondary Hover States Section -->
129:     <section class="mb-12">
130:       <h3 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Hover States</h3>
131:       <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
132:         <!-- Base Hover -->
133:         <div class="rounded-lg overflow-hidden shadow-md">
134:           <div class="h-32 bg-secondary-hover flex items-center justify-center">
135:             <span class="text-white font-semibold">#0055a0</span>
136:           </div>
137:           <div class="p-4 bg-white dark:bg-gray-800">
138:             <h4 class="font-semibold">Secondary Hover</h4>
139:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-secondary-hover</code>
140:           </div>
141:         </div>
142:         
143:         <!-- Light Hover -->
144:         <div class="rounded-lg overflow-hidden shadow-md">
145:           <div class="h-32 bg-secondary-lightHover flex items-center justify-center">
146:             <span class="text-gray-900 font-semibold">#3a85c9</span>
147:           </div>
148:           <div class="p-4 bg-white dark:bg-gray-800">
149:             <h4 class="font-semibold">Secondary Light Hover</h4>
150:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-secondary-lightHover</code>
151:           </div>
152:         </div>
153:         
154:         <!-- Dark Hover -->
155:         <div class="rounded-lg overflow-hidden shadow-md">
156:           <div class="h-32 bg-secondary-darkHover flex items-center justify-center">
157:             <span class="text-white font-semibold">#003e73</span>
158:           </div>
159:           <div class="p-4 bg-white dark:bg-gray-800">
160:             <h4 class="font-semibold">Secondary Dark Hover</h4>
161:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-secondary-darkHover</code>
162:           </div>
163:         </div>
164:       </div>
165:     </section>
166:     
167:     <!-- Secondary Active States Section -->
168:     <section class="mb-12">
169:       <h3 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Active States</h3>
170:       <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
171:         <!-- Base Active -->
172:         <div class="rounded-lg overflow-hidden shadow-md">
173:           <div class="h-32 bg-secondary-active flex items-center justify-center">
174:             <span class="text-white font-semibold">#00488c</span>
175:           </div>
176:           <div class="p-4 bg-white dark:bg-gray-800">
177:             <h4 class="font-semibold">Secondary Active</h4>
178:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-secondary-active</code>
179:           </div>
180:         </div>
181:         
182:         <!-- Light Active -->
183:         <div class="rounded-lg overflow-hidden shadow-md">
184:           <div class="h-32 bg-secondary-lightActive flex items-center justify-center">
185:             <span class="text-gray-900 font-semibold">#2a75b9</span>
186:           </div>
187:           <div class="p-4 bg-white dark:bg-gray-800">
188:             <h4 class="font-semibold">Secondary Light Active</h4>
189:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-secondary-lightActive</code>
190:           </div>
191:         </div>
192:         
193:         <!-- Dark Active -->
194:         <div class="rounded-lg overflow-hidden shadow-md">
195:           <div class="h-32 bg-secondary-darkActive flex items-center justify-center">
196:             <span class="text-white font-semibold">#00315c</span>
197:           </div>
198:           <div class="p-4 bg-white dark:bg-gray-800">
199:             <h4 class="font-semibold">Secondary Dark Active</h4>
200:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-secondary-darkActive</code>
201:           </div>
202:         </div>
203:       </div>
204:     </section>
205:     
206:     <!-- Secondary Disabled States Section -->
207:     <section class="mb-12">
208:       <h3 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Disabled States</h3>
209:       <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
210:         <!-- Base Disabled -->
211:         <div class="rounded-lg overflow-hidden shadow-md">
212:           <div class="h-32 bg-secondary-disabled flex items-center justify-center">
213:             <span class="text-white font-semibold">#7da7d1</span>
214:           </div>
215:           <div class="p-4 bg-white dark:bg-gray-800">
216:             <h4 class="font-semibold">Secondary Disabled</h4>
217:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-secondary-disabled</code>
218:           </div>
219:         </div>
220:         
221:         <!-- Light Disabled -->
222:         <div class="rounded-lg overflow-hidden shadow-md">
223:           <div class="h-32 bg-secondary-lightDisabled flex items-center justify-center">
224:             <span class="text-gray-900 font-semibold">#9cc0e8</span>
225:           </div>
226:           <div class="p-4 bg-white dark:bg-gray-800">
227:             <h4 class="font-semibold">Secondary Light Disabled</h4>
228:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-secondary-lightDisabled</code>
229:           </div>
230:         </div>
231:         
232:         <!-- Dark Disabled -->
233:         <div class="rounded-lg overflow-hidden shadow-md">
234:           <div class="h-32 bg-secondary-darkDisabled flex items-center justify-center">
235:             <span class="text-white font-semibold">#495d7a</span>
236:           </div>
237:           <div class="p-4 bg-white dark:bg-gray-800">
238:             <h4 class="font-semibold">Secondary Dark Disabled</h4>
239:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-secondary-darkDisabled</code>
240:           </div>
241:         </div>
242:       </div>
243:     </section>
244:     
245:     <!-- Secondary Text Colors Section -->
246:     <section class="mb-12">
247:       <h3 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Text Colors</h3>
248:       <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
249:         <!-- Text on Secondary -->
250:         <div class="rounded-lg overflow-hidden shadow-md">
251:           <div class="h-32 bg-secondary flex flex-col items-center justify-center">
252:             <span class="text-secondary-textOnSecondary font-semibold mb-2">Text on Secondary</span>
253:             <code class="bg-black bg-opacity-20 text-white text-sm px-2 py-1 rounded">text-secondary-textOnSecondary</code>
254:           </div>
255:           <div class="p-4 bg-white dark:bg-gray-800">
256:             <h4 class="font-semibold">Text on Secondary</h4>
257:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">#ffffff</code>
258:           </div>
259:         </div>
260:         
261:         <!-- Text on Light -->
262:         <div class="rounded-lg overflow-hidden shadow-md">
263:           <div class="h-32 bg-secondary-light flex flex-col items-center justify-center">
264:             <span class="text-secondary-textOnLight font-semibold mb-2">Text on Light</span>
265:             <code class="bg-black bg-opacity-20 text-secondary-textOnLight text-sm px-2 py-1 rounded">text-secondary-textOnLight</code>
266:           </div>
267:           <div class="p-4 bg-white dark:bg-gray-800">
268:             <h4 class="font-semibold">Text on Light</h4>
269:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">#1a2234</code>
270:           </div>
271:         </div>
272:         
273:         <!-- Text on Dark -->
274:         <div class="rounded-lg overflow-hidden shadow-md">
275:           <div class="h-32 bg-secondary-dark flex flex-col items-center justify-center">
276:             <span class="text-secondary-textOnDark font-semibold mb-2">Text on Dark</span>
277:             <code class="bg-black bg-opacity-20 text-white text-sm px-2 py-1 rounded">text-secondary-textOnDark</code>
278:           </div>
279:           <div class="p-4 bg-white dark:bg-gray-800">
280:             <h4 class="font-semibold">Text on Dark</h4>
281:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">#ffffff</code>
282:           </div>
283:         </div>
284:       </div>
285:     </section>
286: 
287:     <!-- ACCENT COLOR PALETTE -->
288:     <h2 class="text-3xl font-bold mb-6 pb-2 border-b border-border dark:border-gray-700 mt-16">Accent Color Palette</h2>
289: 
290:     <!-- Accent Base Colors Section -->
291:     <section class="mb-12">
292:       <h3 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Base Colors</h3>
293:       <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
294:         <!-- Accent Default -->
295:         <div class="rounded-lg overflow-hidden shadow-md">
296:           <div class="h-32 bg-accent flex items-center justify-center">
297:             <span class="text-accent-textOnAccent font-semibold">#58cbe0</span>
298:           </div>
299:           <div class="p-4 bg-white dark:bg-gray-800">
300:             <h4 class="font-semibold">Accent</h4>
301:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-accent</code>
302:           </div>
303:         </div>
304:         
305:         <!-- Light Variant -->
306:         <div class="rounded-lg overflow-hidden shadow-md">
307:           <div class="h-32 bg-accent-light flex items-center justify-center">
308:             <span class="text-accent-textOnLight font-semibold">#7fdff2</span>
309:           </div>
310:           <div class="p-4 bg-white dark:bg-gray-800">
311:             <h4 class="font-semibold">Accent Light</h4>
312:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-accent-light</code>
313:           </div>
314:         </div>
315:         
316:         <!-- Dark Variant -->
317:         <div class="rounded-lg overflow-hidden shadow-md">
318:           <div class="h-32 bg-accent-dark flex items-center justify-center">
319:             <span class="text-accent-textOnDark font-semibold">#3ba6b9</span>
320:           </div>
321:           <div class="p-4 bg-white dark:bg-gray-800">
322:             <h4 class="font-semibold">Accent Dark</h4>
323:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-accent-dark</code>
324:           </div>
325:         </div>
326:         
327:         <!-- Warm Variant -->
328:         <div class="rounded-lg overflow-hidden shadow-md">
329:           <div class="h-32 bg-accent-warm flex items-center justify-center">
330:             <span class="text-accent-textOnWarm font-semibold">#F8C88F</span>
331:           </div>
332:           <div class="p-4 bg-white dark:bg-gray-800">
333:             <h4 class="font-semibold">Accent Warm</h4>
334:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-accent-warm</code>
335:           </div>
336:         </div>
337:         
338:         <!-- Warm Light Variant -->
339:         <div class="rounded-lg overflow-hidden shadow-md">
340:           <div class="h-32 bg-accent-warmLight flex items-center justify-center">
341:             <span class="text-accent-textOnWarmLight font-semibold">#fbd7ab</span>
342:           </div>
343:           <div class="p-4 bg-white dark:bg-gray-800">
344:             <h4 class="font-semibold">Accent Warm Light</h4>
345:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-accent-warmLight</code>
346:           </div>
347:         </div>
348:         
349:         <!-- Warm Dark Variant -->
350:         <div class="rounded-lg overflow-hidden shadow-md">
351:           <div class="h-32 bg-accent-warmDark flex items-center justify-center">
352:             <span class="text-accent-textOnWarmDark font-semibold">#f6b973</span>
353:           </div>
354:           <div class="p-4 bg-white dark:bg-gray-800">
355:             <h4 class="font-semibold">Accent Warm Dark</h4>
356:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-accent-warmDark</code>
357:           </div>
358:         </div>
359:       </div>
360:     </section>
361:     
362:     <!-- Accent Interactive Elements Section -->
363:     <section class="mb-12">
364:       <h3 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Interactive States</h3>
365:       <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
366:         <!-- Buttons -->
367:         <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
368:           <h4 class="font-semibold mb-4">Accent Buttons</h4>
369:           <div class="space-y-4">
370:             <div>
371:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Accent Button (hover & active states)</p>
372:               <button class="bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-textOnAccent px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-accent-focus focus:ring-opacity-50">
373:                 Accent Button
374:               </button>
375:             </div>
376:             
377:             <div>
378:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Light Variant (hover & active states)</p>
379:               <button class="bg-accent-light hover:bg-accent-lightHover active:bg-accent-lightActive text-accent-textOnLight px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-accent-lightFocus focus:ring-opacity-50">
380:                 Light Button
381:               </button>
382:             </div>
383:             
384:             <div>
385:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Dark Variant (hover & active states)</p>
386:               <button class="bg-accent-dark hover:bg-accent-darkHover active:bg-accent-darkActive text-accent-textOnDark px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-accent-darkFocus focus:ring-opacity-50">
387:                 Dark Button
388:               </button>
389:             </div>
390:             
391:             <div>
392:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Disabled State</p>
393:               <button class="bg-accent-disabled text-accent-textOnAccent px-4 py-2 rounded cursor-not-allowed opacity-75">
394:                 Disabled Button
395:               </button>
396:             </div>
397:           </div>
398:         </div>
399:         
400:         <!-- Warm Buttons -->
401:         <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
402:           <h4 class="font-semibold mb-4">Warm Accent Buttons</h4>
403:           <div class="space-y-4">
404:             <div>
405:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Warm Button (hover & active states)</p>
406:               <button class="bg-accent-warm hover:bg-accent-warmHover active:bg-accent-warmActive text-accent-textOnWarm px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-accent-warmFocus focus:ring-opacity-50">
407:                 Warm Button
408:               </button>
409:             </div>
410:             
411:             <div>
412:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Light Warm Variant</p>
413:               <button class="bg-accent-warmLight hover:bg-accent-warmHover active:bg-accent-warmActive text-accent-textOnWarmLight px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-accent-warmFocus focus:ring-opacity-50">
414:                 Light Warm Button
415:               </button>
416:             </div>
417:             
418:             <div>
419:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Dark Warm Variant</p>
420:               <button class="bg-accent-warmDark hover:bg-accent-warmHover active:bg-accent-warmActive text-accent-textOnWarmDark px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-accent-warmFocus focus:ring-opacity-50">
421:                 Dark Warm Button
422:               </button>
423:             </div>
424:             
425:             <div>
426:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Form Element with Accent</p>
427:               <input type="text" class="w-full px-4 py-2 border border-accent rounded focus:outline-none focus:ring-2 focus:ring-accent-focus focus:border-accent" placeholder="Focus to see accent-focus ring">
428:             </div>
429:           </div>
430:         </div>
431:       </div>
432:     </section>
433:     
434:     <!-- Usage Examples Section -->
435:     <section class="mb-12">
436:       <h3 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Usage Examples</h3>
437:       <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
438:         <!-- Cards with Different Accent Colors -->
439:         <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
440:           <h4 class="font-semibold mb-4 text-secondary">Color Combination Examples</h4>
441:           
442:           <!-- Primary + Secondary Combination -->
443:           <div class="mb-6 p-4 border border-primary rounded-lg">
444:             <h5 class="text-primary font-semibold mb-2">Primary + Secondary Combination</h5>
445:             <p class="mb-4 text-gray-700 dark:text-gray-300">This example uses primary colors for structure and secondary for interactive elements.</p>
446:             <button class="bg-secondary hover:bg-secondary-hover text-secondary-textOnSecondary px-4 py-2 rounded">
447:               Secondary Button
448:             </button>
449:           </div>
450:           
451:           <!-- Secondary + Accent Combination -->
452:           <div class="mb-6 p-4 border border-secondary rounded-lg">
453:             <h5 class="text-secondary font-semibold mb-2">Secondary + Accent Combination</h5>
454:             <p class="mb-4 text-gray-700 dark:text-gray-300">This example uses secondary colors for structure and accent for interactive elements.</p>
455:             <button class="bg-accent hover:bg-accent-hover text-accent-textOnAccent px-4 py-2 rounded">
456:               Accent Button
457:             </button>
458:           </div>
459:           
460:           <!-- Primary + Warm Accent Combination -->
461:           <div class="p-4 border border-primary rounded-lg">
462:             <h5 class="text-primary font-semibold mb-2">Primary + Warm Accent Combination</h5>
463:             <p class="mb-4 text-gray-700 dark:text-gray-300">This example uses primary colors for structure and warm accent for highlights.</p>
464:             <button class="bg-accent-warm hover:bg-accent-warmHover text-accent-textOnWarm px-4 py-2 rounded">
465:               Warm Accent Button
466:             </button>
467:           </div>
468:         </div>
469:         
470:         <!-- Component Examples -->
471:         <div class="space-y-6">
472:           <!-- Alert with Secondary -->
473:           <div class="p-4 rounded-lg bg-secondary-light border-l-4 border-secondary">
474:             <div class="flex">
475:               <div class="flex-shrink-0">
476:                 <svg class="h-5 w-5 text-secondary" viewBox="0 0 20 20" fill="currentColor">
477:                   <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
478:                 </svg>
479:               </div>
480:               <div class="ml-3">
481:                 <h5 class="text-secondary-dark font-semibold">Information Alert</h5>
482:                 <p class="text-secondary-dark text-sm">This alert uses secondary colors to convey information.</p>
483:               </div>
484:             </div>
485:           </div>
486:           
487:           <!-- Card with Accent -->
488:           <div class="rounded-lg shadow-md overflow-hidden">
489:             <div class="p-4 bg-accent text-accent-textOnAccent">
490:               <h5 class="font-semibold">Feature Card</h5>
491:             </div>
492:             <div class="p-4 bg-white dark:bg-gray-800">
493:               <p class="mb-4 text-gray-700 dark:text-gray-300">This card uses accent colors for the header section.</p>
494:               <button class="bg-accent-dark hover:bg-accent-darkHover text-accent-textOnDark px-4 py-2 rounded text-sm">
495:                 Learn More
496:               </button>
497:             </div>
498:           </div>
499:           
500:           <!-- Banner with Warm Accent -->
501:           <div class="p-4 bg-accent-warm text-accent-textOnWarm rounded-lg shadow-md">
502:             <h5 class="font-semibold mb-2">Special Promotion</h5>
503:             <p class="mb-4">This banner uses warm accent colors for an attention-grabbing effect.</p>
504:             <button class="bg-accent-warmDark hover:bg-accent-warmHover text-accent-textOnWarmDark px-4 py-2 rounded text-sm">
505:               View Offer
506:             </button>
507:           </div>
508:         </div>
509:       </div>
510:     </section>
511:     
512:     <!-- Usage Guidelines -->
513:     <section class="mb-12">
514:       <h3 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Usage Guidelines</h3>
515:       <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
516:         <h4 class="font-semibold mb-4">When to use each palette</h4>
517:         <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
518:           <div>
519:             <h5 class="font-semibold mb-2 text-secondary">Secondary Color Palette</h5>
520:             <ul class="space-y-3 list-disc pl-5">
521:               <li><strong>Secondary (default):</strong> Use for secondary action buttons, supporting UI elements, and informational components.</li>
522:               <li><strong>Light variant:</strong> Use for less prominent elements, backgrounds of secondary sections, and subtle highlights.</li>
523:               <li><strong>Dark variant:</strong> Use for more prominent secondary elements that need stronger contrast.</li>
524:               <li><strong>Best paired with:</strong> Primary colors for UI hierarchy, or with accent colors for interactive elements.</li>
525:             </ul>
526:           </div>
527:           
528:           <div>
529:             <h5 class="font-semibold mb-2 text-accent">Accent Color Palette</h5>
530:             <ul class="space-y-3 list-disc pl-5">
531:               <li><strong>Accent (teal):</strong> Use for highlights, success indicators, and tertiary actions.</li>
532:               <li><strong>Accent warm:</strong> Use for attention-grabbing elements, promotional content, and calls to action that should stand out.</li>
533:               <li><strong>Light/Dark variants:</strong> Use when you need a more subtle or more prominent version of the accent color.</li>
534:               <li><strong>Best paired with:</strong> Primary or secondary colors as the main UI structure, with accent colors used sparingly for emphasis.</li>
535:             </ul>
536:           </div>
537:         </div>
538:         
539:         <h4 class="font-semibold mt-6 mb-4">Accessibility Considerations</h4>
540:         <ul class="space-y-3 list-disc pl-5">
541:           <li>Always use the appropriate text color (<code>textOnSecondary</code>, <code>textOnAccent</code>, etc.) to ensure sufficient contrast for readability.</li>
542:           <li>For interactive elements, ensure that hover and focus states are clearly distinguishable from the default state.</li>
543:           <li>When using accent colors, especially the warm accent, be mindful of their use for error states or critical actions to avoid confusion.</li>
544:           <li>Test color combinations in both light and dark modes to ensure proper contrast and visibility.</li>
545:         </ul>
546:         
547:         <h4 class="font-semibold mt-6 mb-4">Color Combination Recommendations</h4>
548:         <ul class="space-y-3 list-disc pl-5">
549:           <li><strong>Primary + Secondary:</strong> Use primary for main actions and branding, with secondary for supporting elements and actions.</li>
550:           <li><strong>Secondary + Accent:</strong> Use secondary for main structure and accent for highlights and interactive elements.</li>
551:           <li><strong>Primary + Accent Warm:</strong> Creates a strong contrast that can be effective for promotional content or important notifications.</li>
552:           <li><strong>Avoid:</strong> Using too many accent colors together, or using secondary and accent colors without clear hierarchy, which can create visual confusion.</li>
553:         </ul>
554:       </div>
555:     </section>
556:   </div>
557: </Layout>
```

## File: src/styles/print.css
```css
  1: /* Print styles for debt-relief landing page */
  2: @media print {
  3:     /* General print settings */
  4:     body {
  5:         font-size: 12pt !important;
  6:         line-height: 1.5 !important;
  7:         background: white !important;
  8:         color: black !important;
  9:     }
 10:     
 11:     /* Hide navigation and footer */
 12:     nav, footer, 
 13:     [href^="#"]:not([href="#qualification-form"]),
 14:     button:not([type="submit"]) {
 15:         display: none !important;
 16:     }
 17:     
 18:     /* Ensure proper layout and margins */
 19:     .min-h-screen {
 20:         min-height: auto !important;
 21:     }
 22:     
 23:     .px-6, .px-12, .px-4, .px-8 {
 24:         padding-left: 0 !important;
 25:         padding-right: 0 !important;
 26:     }
 27:     
 28:     .py-12, .py-20, .py-8, .py-6, .py-4 {
 29:         padding-top: 1rem !important;
 30:         padding-bottom: 1rem !important;
 31:     }
 32:     
 33:     /* Remove background effects */
 34:     .bg-noise {
 35:         background-image: none !important;
 36:     }
 37:     
 38:     /* Ensure all text is visible */
 39:     .text-text-muted {
 40:         color: #444 !important;
 41:     }
 42:     
 43:     /* Adjust form for printing */
 44:     .form-container {
 45:         page-break-inside: avoid;
 46:         border: 1px solid #ccc !important;
 47:         box-shadow: none !important;
 48:     }
 49:     
 50:     /* Ensure headings print properly */
 51:     h1, h2, h3, h4, h5, h6 {
 52:         page-break-after: avoid;
 53:         page-break-inside: avoid;
 54:     }
 55:     
 56:     h1 {
 57:         font-size: 18pt !important;
 58:         margin-top: 2rem !important;
 59:     }
 60:     
 61:     h2 {
 62:         font-size: 16pt !important;
 63:         margin-top: 1.5rem !important;
 64:     }
 65:     
 66:     h3 {
 67:         font-size: 14pt !important;
 68:     }
 69:     
 70:     /* Make links more readable */
 71:     a {
 72:         text-decoration: underline !important;
 73:         color: #000 !important;
 74:     }
 75:     
 76:     a[href^="http"]::after,
 77:     a[href^="https://"]::after {
 78:         content: " (" attr(href) ")";
 79:         font-size: 90%;
 80:     }
 81:     
 82:     /* Ensure form fields are visible */
 83:     input, select, textarea {
 84:         border: 1px solid #999 !important;
 85:         background: #fff !important;
 86:         color: #000 !important;
 87:     }
 88:     
 89:     /* Ensure important content doesn't break across pages */
 90:     .faq-item, 
 91:     blockquote, 
 92:     table {
 93:         page-break-inside: avoid;
 94:     }
 95:     
 96:     /* Add page breaks where appropriate */
 97:     section {
 98:         page-break-inside: avoid;
 99:     }
100:     
101:     /* Show all FAQ answers when printing */
102:     .faq-answer {
103:         display: block !important;
104:         opacity: 1 !important;
105:         height: auto !important;
106:         max-height: none !important;
107:         overflow: visible !important;
108:         visibility: visible !important;
109:     }
110:     
111:     .faq-content {
112:         opacity: 1 !important;
113:         transform: none !important;
114:     }
115:     
116:     /* Hide decorative elements */
117:     .animate-fade-in,
118:     .animate-fade-in-delay-1,
119:     .animate-fade-in-delay-2,
120:     .animate-fade-in-delay-3,
121:     .animate-slide-up,
122:     .animate-pulse-once,
123:     .animate-float {
124:         animation: none !important;
125:         opacity: 1 !important;
126:         transform: none !important;
127:     }
128: }
```

## File: src/utils/csrf.ts
```typescript
  1: // CSRF (Cross-Site Request Forgery) protection utilities
  2: // Provides token generation, validation, and middleware for form security
  3: 
  4: import type { APIRoute } from 'astro';
  5: 
  6: // CSRF token configuration
  7: const CSRF_TOKEN_HEADER = 'x-csrf-token';
  8: const CSRF_TOKEN_COOKIE = 'csrf-token';
  9: const CSRF_TOKEN_LENGTH = 32;
 10: const CSRF_TOKEN_EXPIRY = 3600000; // 1 hour in milliseconds
 11: 
 12: // In-memory token store for development/demo
 13: // In production, you'd want to use Redis, database, or encrypted cookies
 14: const tokenStore = new Map<string, { token: string; expires: number; used: boolean }>();
 15: 
 16: // Generate a cryptographically secure CSRF token
 17: export function generateCSRFToken(): string {
 18:     if (typeof crypto === 'undefined') {
 19:         // Fallback for environments without crypto API
 20:         return Array.from({ length: CSRF_TOKEN_LENGTH }, () => 
 21:             Math.random().toString(36).charAt(2)
 22:         ).join('');
 23:     }
 24:     
 25:     const array = new Uint8Array(CSRF_TOKEN_LENGTH);
 26:     crypto.getRandomValues(array);
 27:     return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
 28: }
 29: 
 30: // Store a CSRF token with expiration
 31: export function storeCSRFToken(sessionId: string, token: string): void {
 32:     const expires = Date.now() + CSRF_TOKEN_EXPIRY;
 33:     tokenStore.set(sessionId, { token, expires, used: false });
 34:     
 35:     // Clean up expired tokens every 100 operations
 36:     if (tokenStore.size % 100 === 0) {
 37:         cleanupExpiredTokens();
 38:     }
 39: }
 40: 
 41: // Validate a CSRF token
 42: export function validateCSRFToken(sessionId: string, providedToken: string): boolean {
 43:     const stored = tokenStore.get(sessionId);
 44:     
 45:     if (!stored) {
 46:         return false; // No token found
 47:     }
 48:     
 49:     if (stored.expires < Date.now()) {
 50:         tokenStore.delete(sessionId);
 51:         return false; // Token expired
 52:     }
 53:     
 54:     if (stored.used) {
 55:         return false; // Token already used (prevents replay attacks)
 56:     }
 57:     
 58:     if (stored.token !== providedToken) {
 59:         return false; // Token mismatch
 60:     }
 61:     
 62:     // Mark token as used (one-time use)
 63:     stored.used = true;
 64:     
 65:     return true;
 66: }
 67: 
 68: // Clean up expired tokens from memory
 69: function cleanupExpiredTokens(): void {
 70:     const now = Date.now();
 71:     for (const [sessionId, data] of tokenStore.entries()) {
 72:         if (data.expires < now) {
 73:             tokenStore.delete(sessionId);
 74:         }
 75:     }
 76: }
 77: 
 78: // Generate a session ID for CSRF token tracking
 79: export function generateSessionId(request: Request): string {
 80:     // Use a combination of IP, User-Agent, and timestamp for session ID
 81:     const ip = getClientIP(request);
 82:     const userAgent = request.headers.get('user-agent') || 'unknown';
 83:     const timestamp = Date.now();
 84:     
 85:     // Create a hash-like session ID
 86:     const sessionData = `${ip}-${userAgent}-${timestamp}`;
 87:     return btoa(sessionData).replace(/[^a-zA-Z0-9]/g, '').substring(0, 24);
 88: }
 89: 
 90: // Extract client IP from request (same as in supabase.ts)
 91: function getClientIP(request: Request): string {
 92:     const forwardedFor = request.headers.get('x-forwarded-for');
 93:     if (forwardedFor) {
 94:         return forwardedFor.split(',')[0].trim();
 95:     }
 96:     
 97:     const realIP = request.headers.get('x-real-ip');
 98:     if (realIP) {
 99:         return realIP;
100:     }
101:     
102:     const cfConnectingIP = request.headers.get('cf-connecting-ip');
103:     if (cfConnectingIP) {
104:         return cfConnectingIP;
105:     }
106:     
107:     return '127.0.0.1';
108: }
109: 
110: // CSRF middleware for API routes
111: export function withCSRFProtection(handler: APIRoute): APIRoute {
112:     return async (context) => {
113:         const { request } = context;
114:         
115:         // Skip CSRF validation for GET requests
116:         if (request.method === 'GET') {
117:             return handler(context);
118:         }
119:         
120:         // Extract CSRF token from header or form data
121:         let csrfToken = request.headers.get(CSRF_TOKEN_HEADER);
122:         
123:         if (!csrfToken && request.headers.get('content-type')?.includes('application/x-www-form-urlencoded')) {
124:             // Try to extract from form data for traditional form submissions
125:             try {
126:                 const formData = await request.clone().formData();
127:                 csrfToken = formData.get('csrf_token') as string;
128:             } catch (error) {
129:                 // Ignore parsing errors for non-form requests
130:             }
131:         }
132:         
133:         if (!csrfToken) {
134:             return new Response(
135:                 JSON.stringify({
136:                     success: false,
137:                     message: 'CSRF token required',
138:                     code: 'CSRF_TOKEN_MISSING'
139:                 }),
140:                 {
141:                     status: 403,
142:                     headers: { 'Content-Type': 'application/json' }
143:                 }
144:             );
145:         }
146:         
147:         // Generate session ID and validate token
148:         const sessionId = generateSessionId(request);
149:         const isValid = validateCSRFToken(sessionId, csrfToken);
150:         
151:         if (!isValid) {
152:             return new Response(
153:                 JSON.stringify({
154:                     success: false,
155:                     message: 'Invalid or expired CSRF token',
156:                     code: 'CSRF_TOKEN_INVALID'
157:                 }),
158:                 {
159:                     status: 403,
160:                     headers: { 'Content-Type': 'application/json' }
161:                 }
162:             );
163:         }
164:         
165:         // CSRF validation passed, proceed with the request
166:         return handler(context);
167:     };
168: }
169: 
170: // Generate CSRF token for form inclusion
171: export async function getCSRFTokenForForm(request: Request): Promise<{ token: string; sessionId: string }> {
172:     const sessionId = generateSessionId(request);
173:     const token = generateCSRFToken();
174:     
175:     storeCSRFToken(sessionId, token);
176:     
177:     return { token, sessionId };
178: }
179: 
180: // API endpoint to get CSRF token
181: export const GET: APIRoute = async ({ request }) => {
182:     try {
183:         const { token, sessionId } = await getCSRFTokenForForm(request);
184:         
185:         return new Response(
186:             JSON.stringify({
187:                 success: true,
188:                 token,
189:                 sessionId,
190:                 expiresIn: CSRF_TOKEN_EXPIRY
191:             }),
192:             {
193:                 status: 200,
194:                 headers: { 
195:                     'Content-Type': 'application/json',
196:                     'Cache-Control': 'no-store, no-cache, must-revalidate'
197:                 }
198:             }
199:         );
200:     } catch (error) {
201:         console.error('CSRF token generation error:', error);
202:         return new Response(
203:             JSON.stringify({
204:                 success: false,
205:                 message: 'Failed to generate CSRF token'
206:             }),
207:             {
208:                 status: 500,
209:                 headers: { 'Content-Type': 'application/json' }
210:             }
211:         );
212:     }
213: };
```

## File: src/utils/highlighter.ts
```typescript
1: import { createHighlighter } from 'shiki';
2: 
3: export const highlighterPromise = createHighlighter({
4:     langs: ['jsx', 'js'],
5:     themes: ['min-dark']
6: });
```

## File: src/utils/security.ts
```typescript
  1: // Security utilities and middleware for enhanced protection
  2: // Provides security headers, input sanitization, and security checks
  3: 
  4: import type { APIRoute } from 'astro';
  5: 
  6: // Security headers configuration
  7: export const SECURITY_HEADERS = {
  8:     // Prevent clickjacking attacks
  9:     'X-Frame-Options': 'DENY',
 10:     
 11:     // Prevent MIME type sniffing
 12:     'X-Content-Type-Options': 'nosniff',
 13:     
 14:     // Enable XSS protection (legacy but still useful)
 15:     'X-XSS-Protection': '1; mode=block',
 16:     
 17:     // Referrer policy for privacy
 18:     'Referrer-Policy': 'strict-origin-when-cross-origin',
 19:     
 20:     // Prevent Adobe Flash and PDF from loading
 21:     'X-Permitted-Cross-Domain-Policies': 'none',
 22:     
 23:     // HSTS for HTTPS enforcement (only in production)
 24:     ...(import.meta.env.PROD ? {
 25:         'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
 26:     } : {}),
 27:     
 28:     // Content Security Policy
 29:     'Content-Security-Policy': [
 30:         "default-src 'self'",
 31:         "script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com",
 32:         "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
 33:         "font-src 'self' fonts.gstatic.com",
 34:         "img-src 'self' data: https:",
 35:         "connect-src 'self'",
 36:         "frame-src 'none'",
 37:         "object-src 'none'",
 38:         "base-uri 'self'",
 39:         "form-action 'self'"
 40:     ].join('; ')
 41: };
 42: 
 43: // Security middleware wrapper for API routes
 44: export function withSecurityHeaders(handler: APIRoute): APIRoute {
 45:     return async (context) => {
 46:         const response = await handler(context);
 47:         
 48:         // Add security headers to response
 49:         Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
 50:             response.headers.set(key, value);
 51:         });
 52:         
 53:         return response;
 54:     };
 55: }
 56: 
 57: // Input sanitization utilities
 58: export class InputSanitizer {
 59:     // Remove potential XSS vectors from strings
 60:     static sanitizeString(input: string): string {
 61:         if (typeof input !== 'string') {
 62:             return '';
 63:         }
 64:         
 65:         return input
 66:             .trim()
 67:             // Remove HTML tags
 68:             .replace(/<[^>]*>/g, '')
 69:             // Remove javascript: URLs
 70:             .replace(/javascript:/gi, '')
 71:             // Remove vbscript: URLs
 72:             .replace(/vbscript:/gi, '')
 73:             // Remove data: URLs (except safe ones)
 74:             .replace(/data:(?!image\/(png|jpg|jpeg|gif|webp|svg\+xml))[^,]*,/gi, '')
 75:             // Remove event handlers
 76:             .replace(/on\w+\s*=/gi, '')
 77:             // Normalize whitespace
 78:             .replace(/\s+/g, ' ')
 79:             .trim();
 80:     }
 81:     
 82:     // Sanitize phone numbers (keep only digits)
 83:     static sanitizePhone(input: string): string {
 84:         if (typeof input !== 'string') {
 85:             return '';
 86:         }
 87:         
 88:         return input.replace(/\D/g, '');
 89:     }
 90:     
 91:     // Sanitize email addresses
 92:     static sanitizeEmail(input: string): string {
 93:         if (typeof input !== 'string') {
 94:             return '';
 95:         }
 96:         
 97:         return input
 98:             .toLowerCase()
 99:             .trim()
100:             .replace(/[<>]/g, ''); // Remove angle brackets
101:     }
102:     
103:     // Sanitize text content (more permissive for notes/comments)
104:     static sanitizeText(input: string): string {
105:         if (typeof input !== 'string') {
106:             return '';
107:         }
108:         
109:         return input
110:             .trim()
111:             // Remove script tags completely
112:             .replace(/<script[^>]*>.*?<\/script>/gis, '')
113:             // Remove dangerous HTML tags but allow basic formatting
114:             .replace(/<(?!\/?(p|br|strong|b|em|i|u)\b)[^>]*>/gi, '')
115:             // Remove javascript: and vbscript: URLs
116:             .replace(/(javascript|vbscript):/gi, '')
117:             // Remove event handlers
118:             .replace(/on\w+\s*=/gi, '')
119:             // Normalize whitespace but preserve line breaks
120:             .replace(/[ \t]+/g, ' ')
121:             .replace(/\n\s*\n/g, '\n\n');
122:     }
123:     
124:     // Sanitize object recursively
125:     static sanitizeObject<T extends Record<string, any>>(obj: T): T {
126:         const sanitized = {} as T;
127:         
128:         for (const [key, value] of Object.entries(obj)) {
129:             if (typeof value === 'string') {
130:                 sanitized[key as keyof T] = this.sanitizeString(value) as T[keyof T];
131:             } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
132:                 sanitized[key as keyof T] = this.sanitizeObject(value);
133:             } else {
134:                 sanitized[key as keyof T] = value;
135:             }
136:         }
137:         
138:         return sanitized;
139:     }
140: }
141: 
142: // Rate limiting utilities (enhanced from existing implementation)
143: export interface RateLimitOptions {
144:     maxRequests: number;
145:     windowMinutes: number;
146:     skipSuccessfulRequests?: boolean;
147:     keyGenerator?: (request: Request) => string;
148: }
149: 
150: export function createRateLimitKey(request: Request, endpoint: string): string {
151:     const ip = getClientIP(request);
152:     return `${ip}:${endpoint}`;
153: }
154: 
155: // Enhanced rate limiting with different strategies
156: export class RateLimiter {
157:     private static limits = new Map<string, { count: number; resetTime: number }>();
158:     
159:     static check(
160:         key: string, 
161:         options: RateLimitOptions
162:     ): { allowed: boolean; remaining: number; resetTime: number } {
163:         const now = Date.now();
164:         const windowMs = options.windowMinutes * 60 * 1000;
165:         
166:         // Clean up expired entries
167:         this.cleanup();
168:         
169:         const record = this.limits.get(key);
170:         
171:         if (!record || record.resetTime <= now) {
172:             // No record or expired, create new window
173:             const resetTime = now + windowMs;
174:             this.limits.set(key, { count: 1, resetTime });
175:             return {
176:                 allowed: true,
177:                 remaining: options.maxRequests - 1,
178:                 resetTime
179:             };
180:         }
181:         
182:         if (record.count >= options.maxRequests) {
183:             return {
184:                 allowed: false,
185:                 remaining: 0,
186:                 resetTime: record.resetTime
187:             };
188:         }
189:         
190:         // Increment count
191:         record.count++;
192:         return {
193:             allowed: true,
194:             remaining: options.maxRequests - record.count,
195:             resetTime: record.resetTime
196:         };
197:     }
198:     
199:     private static cleanup(): void {
200:         const now = Date.now();
201:         for (const [key, record] of this.limits.entries()) {
202:             if (record.resetTime <= now) {
203:                 this.limits.delete(key);
204:             }
205:         }
206:     }
207: }
208: 
209: // Get client IP address (duplicate from supabase.ts for independence)
210: export function getClientIP(request: Request): string {
211:     const forwardedFor = request.headers.get('x-forwarded-for');
212:     if (forwardedFor) {
213:         return forwardedFor.split(',')[0].trim();
214:     }
215:     
216:     const realIP = request.headers.get('x-real-ip');
217:     if (realIP) {
218:         return realIP;
219:     }
220:     
221:     const cfConnectingIP = request.headers.get('cf-connecting-ip');
222:     if (cfConnectingIP) {
223:         return cfConnectingIP;
224:     }
225:     
226:     return '127.0.0.1';
227: }
228: 
229: // Security validation helpers
230: export class SecurityValidator {
231:     // Check if request appears to be automated/bot
232:     static isLikelyBot(request: Request): boolean {
233:         const userAgent = request.headers.get('user-agent') || '';
234:         
235:         // Check for common bot patterns
236:         const botPatterns = [
237:             /bot/i,
238:             /crawler/i,
239:             /spider/i,
240:             /scraper/i,
241:             /curl/i,
242:             /wget/i,
243:             /python/i,
244:             /postman/i
245:         ];
246:         
247:         return botPatterns.some(pattern => pattern.test(userAgent));
248:     }
249:     
250:     // Check for suspicious request patterns
251:     static hasSuspiciousContent(data: any): boolean {
252:         const content = JSON.stringify(data).toLowerCase();
253:         
254:         const suspiciousPatterns = [
255:             /<script/,
256:             /javascript:/,
257:             /vbscript:/,
258:             /onload=/,
259:             /onerror=/,
260:             /eval\(/,
261:             /function\(/,
262:             /document\./,
263:             /window\./
264:         ];
265:         
266:         return suspiciousPatterns.some(pattern => pattern.test(content));
267:     }
268:     
269:     // Validate request origin (basic CSRF protection)
270:     static isValidOrigin(request: Request, allowedOrigins: string[]): boolean {
271:         const origin = request.headers.get('origin');
272:         const referer = request.headers.get('referer');
273:         
274:         if (!origin && !referer) {
275:             return false; // No origin information
276:         }
277:         
278:         const requestOrigin = origin || new URL(referer!).origin;
279:         return allowedOrigins.includes(requestOrigin);
280:     }
281: }
282: 
283: // Honeypot field validation (simple bot detection)
284: export function validateHoneypot(formData: FormData | any): boolean {
285:     // Check for common honeypot field names
286:     const honeypotFields = ['website', 'url', 'honeypot', 'address2', 'fax'];
287:     
288:     for (const field of honeypotFields) {
289:         const value = formData instanceof FormData 
290:             ? formData.get(field) 
291:             : formData[field];
292:             
293:         if (value && typeof value === 'string' && value.trim() !== '') {
294:             return false; // Honeypot field filled, likely a bot
295:         }
296:     }
297:     
298:     return true;
299: }
```

## File: src/utils/supabase.ts
```typescript
  1: // Supabase client configuration for debt relief lead storage
  2: // This utility provides both client-side and server-side Supabase instances
  3: 
  4: import { createClient } from '@supabase/supabase-js';
  5: 
  6: // Environment variables validation
  7: const supabaseUrl = import.meta.env.SUPABASE_URL;
  8: const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;
  9: const supabaseServiceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
 10: 
 11: if (!supabaseUrl) {
 12:     throw new Error('Missing SUPABASE_URL environment variable');
 13: }
 14: 
 15: if (!supabaseAnonKey) {
 16:     throw new Error('Missing SUPABASE_ANON_KEY environment variable');
 17: }
 18: 
 19: // Client-side Supabase instance (with RLS enforced)
 20: // Use this for any client-side operations that respect Row Level Security
 21: export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
 22:     auth: {
 23:         persistSession: false, // Disable session persistence for stateless operations
 24:         autoRefreshToken: false
 25:     }
 26: });
 27: 
 28: // Server-side Supabase instance (bypasses RLS)
 29: // Use this ONLY for server-side API routes that need service-level access
 30: export const supabaseAdmin = (() => {
 31:     if (!supabaseServiceRoleKey) {
 32:         throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable for admin operations');
 33:     }
 34:     
 35:     return createClient(supabaseUrl, supabaseServiceRoleKey, {
 36:         auth: {
 37:             persistSession: false,
 38:             autoRefreshToken: false
 39:         }
 40:     });
 41: })();
 42: 
 43: // Database types for TypeScript
 44: export interface Lead {
 45:     id?: string;
 46:     created_at?: string;
 47:     updated_at?: string;
 48:     debt_amount: '10000-15000' | '15000-25000' | '25000-50000' | '50000+';
 49:     debt_type: 'credit-cards' | 'personal-loans' | 'medical' | 'mixed';
 50:     phone: string;
 51:     first_name?: string;
 52:     last_name?: string;
 53:     email?: string;
 54:     consent_marketing: boolean;
 55:     consent_processing: boolean;
 56:     consent_timestamp?: string;
 57:     ip_address?: string;
 58:     user_agent?: string;
 59:     status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'archived';
 60:     source?: string;
 61:     notes?: string;
 62: }
 63: 
 64: export interface RateLimitRecord {
 65:     id?: string;
 66:     ip_address: string;
 67:     endpoint: string;
 68:     request_count: number;
 69:     window_start: string;
 70:     created_at?: string;
 71: }
 72: 
 73: export interface DatabaseStats {
 74:     database_size: string;
 75:     database_size_bytes: number;
 76:     free_tier_status: string;
 77:     percent_of_free_tier: number;
 78: }
 79: 
 80: // Utility function to check database size and free tier usage
 81: export async function getDatabaseStats(): Promise<DatabaseStats | null> {
 82:     try {
 83:         const { data, error } = await supabaseAdmin
 84:             .from('database_size_info')
 85:             .select('*')
 86:             .single();
 87:             
 88:         if (error) {
 89:             console.error('Error fetching database stats:', error);
 90:             return null;
 91:         }
 92:         
 93:         return data;
 94:     } catch (error) {
 95:         console.error('Failed to fetch database stats:', error);
 96:         return null;
 97:     }
 98: }
 99: 
100: // Utility function for rate limiting
101: export async function checkRateLimit(
102:     ipAddress: string, 
103:     endpoint: string, 
104:     maxRequests: number = 5,
105:     windowMinutes: number = 60
106: ): Promise<{ allowed: boolean; remainingRequests: number }> {
107:     try {
108:         const windowStart = new Date();
109:         windowStart.setMinutes(windowStart.getMinutes() - windowMinutes);
110:         
111:         // First, clean up old rate limit records
112:         await supabaseAdmin
113:             .rpc('cleanup_old_rate_limits');
114:         
115:         // Check current request count in the time window
116:         const { data: existing, error: fetchError } = await supabaseAdmin
117:             .from('api_rate_limits')
118:             .select('request_count')
119:             .eq('ip_address', ipAddress)
120:             .eq('endpoint', endpoint)
121:             .gte('window_start', windowStart.toISOString())
122:             .order('window_start', { ascending: false })
123:             .limit(1)
124:             .single();
125:             
126:         if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows returned
127:             console.error('Rate limit check error:', fetchError);
128:             return { allowed: true, remainingRequests: maxRequests }; // Fail open
129:         }
130:         
131:         const currentCount = existing?.request_count || 0;
132:         
133:         if (currentCount >= maxRequests) {
134:             return { allowed: false, remainingRequests: 0 };
135:         }
136:         
137:         // Update or insert rate limit record
138:         const { error: upsertError } = await supabaseAdmin
139:             .from('api_rate_limits')
140:             .upsert({
141:                 ip_address: ipAddress,
142:                 endpoint: endpoint,
143:                 request_count: currentCount + 1,
144:                 window_start: new Date().toISOString()
145:             }, {
146:                 onConflict: 'ip_address,endpoint,window_start'
147:             });
148:             
149:         if (upsertError) {
150:             console.error('Rate limit update error:', upsertError);
151:             return { allowed: true, remainingRequests: maxRequests }; // Fail open
152:         }
153:         
154:         return { 
155:             allowed: true, 
156:             remainingRequests: maxRequests - currentCount - 1 
157:         };
158:         
159:     } catch (error) {
160:         console.error('Rate limiting error:', error);
161:         return { allowed: true, remainingRequests: maxRequests }; // Fail open on errors
162:     }
163: }
164: 
165: // Helper function to get client IP address from Astro request
166: export function getClientIP(request: Request): string {
167:     // Check common headers for client IP
168:     const forwardedFor = request.headers.get('x-forwarded-for');
169:     if (forwardedFor) {
170:         return forwardedFor.split(',')[0].trim();
171:     }
172:     
173:     const realIP = request.headers.get('x-real-ip');
174:     if (realIP) {
175:         return realIP;
176:     }
177:     
178:     const cfConnectingIP = request.headers.get('cf-connecting-ip');
179:     if (cfConnectingIP) {
180:         return cfConnectingIP;
181:     }
182:     
183:     // Fallback for development
184:     return '127.0.0.1';
185: }
```

## File: src/utils/validation-middleware.ts
```typescript
  1: // Validation middleware for API endpoints
  2: // Provides comprehensive input validation and sanitization across all API routes
  3: 
  4: import type { APIRoute } from 'astro';
  5: import { z } from 'zod';
  6: import { InputSanitizer, SecurityValidator } from './security';
  7: 
  8: // Enhanced XSS prevention patterns (more comprehensive than existing)
  9: const ENHANCED_XSS_PATTERNS = [
 10:     // Script tags with various encodings
 11:     /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
 12:     /&lt;script[\s\S]*?&gt;[\s\S]*?&lt;\/script&gt;/gi,
 13:     /%3Cscript[\s\S]*?%3E[\s\S]*?%3C\/script%3E/gi,
 14:     
 15:     // Event handlers (more comprehensive)
 16:     /on\w+\s*=\s*["\'][^"\']*["\']*/gi,
 17:     /on\w+\s*=\s*[^>\s]*/gi,
 18:     
 19:     // Javascript and VBScript URLs
 20:     /javascript\s*:/gi,
 21:     /vbscript\s*:/gi,
 22:     /data\s*:\s*text\/html/gi,
 23:     
 24:     // Dangerous HTML tags
 25:     /<(?:iframe|object|embed|applet|form|meta|link|base)[\s\S]*?>/gi,
 26:     
 27:     // Style injection
 28:     /<style[\s\S]*?>[\s\S]*?<\/style>/gi,
 29:     /style\s*=\s*["\'][^"\']*expression\s*\([^"\']*["\']*/gi,
 30:     
 31:     // SVG-based XSS
 32:     /<svg[\s\S]*?>[\s\S]*?<\/svg>/gi,
 33:     
 34:     // Comments that might hide malicious code
 35:     /<!--[\s\S]*?-->/gi,
 36:     
 37:     // Data URI with dangerous MIME types
 38:     /data\s*:\s*(?:text\/html|application\/x-javascript|text\/javascript)/gi
 39: ];
 40: 
 41: // Enhanced SQL injection patterns
 42: const ENHANCED_SQL_PATTERNS = [
 43:     // Common SQL keywords
 44:     /(\b(?:union|select|insert|update|delete|drop|create|alter|exec|execute|declare|cast|convert)\b)/gi,
 45:     
 46:     // Boolean-based injections
 47:     /(\b(?:and|or)\s+(?:\d+\s*=\s*\d+|true|false|\d+\s*[<>=]\s*\d+))/gi,
 48:     
 49:     // Comment patterns
 50:     /(--\s*|\/\*[\s\S]*?\*\/)/g,
 51:     
 52:     // String concatenation
 53:     /('\s*\+\s*'|"\s*\+\s*")/gi,
 54:     
 55:     // Function calls
 56:     /(\b(?:char|ascii|substring|length|count|sum|avg|min|max)\s*\()/gi,
 57:     
 58:     // Hex/binary injections
 59:     /(0x[0-9a-f]+|binary\s*')/gi
 60: ];
 61: 
 62: // Command injection patterns
 63: const COMMAND_INJECTION_PATTERNS = [
 64:     // Command separators
 65:     /[;&|`$(){}[\]]/g,
 66:     
 67:     // Common shell commands
 68:     /\b(?:cat|ls|dir|ps|whoami|id|pwd|uname|ping|nslookup|wget|curl|nc|netcat|rm|del|format|fdisk)\b/gi,
 69:     
 70:     // Environment variables
 71:     /\$\w+|\$\{[^}]*\}/g,
 72:     
 73:     // Command substitution
 74:     /`[^`]*`|\$\([^)]*\)/g
 75: ];
 76: 
 77: // LDAP injection patterns
 78: const LDAP_INJECTION_PATTERNS = [
 79:     /[()&|!*]/g,
 80:     /\\[0-9a-fA-F]{2}/g
 81: ];
 82: 
 83: // Enhanced input validation with multiple security layers
 84: export class ValidationMiddleware {
 85:     
 86:     // Comprehensive sanitization function
 87:     static sanitizeInput(input: any, options: {
 88:         allowHtml?: boolean;
 89:         maxLength?: number;
 90:         trimWhitespace?: boolean;
 91:         preventXss?: boolean;
 92:         preventSqlInjection?: boolean;
 93:         preventCommandInjection?: boolean;
 94:         preventLdapInjection?: boolean;
 95:     } = {}): any {
 96:         const {
 97:             allowHtml = false,
 98:             maxLength = 10000,
 99:             trimWhitespace = true,
100:             preventXss = true,
101:             preventSqlInjection = true,
102:             preventCommandInjection = true,
103:             preventLdapInjection = true
104:         } = options;
105: 
106:         if (typeof input !== 'string') {
107:             return input;
108:         }
109: 
110:         let sanitized = input;
111: 
112:         // Trim whitespace
113:         if (trimWhitespace) {
114:             sanitized = sanitized.trim();
115:         }
116: 
117:         // Length check
118:         if (sanitized.length > maxLength) {
119:             throw new Error(`Input exceeds maximum length of ${maxLength} characters`);
120:         }
121: 
122:         // XSS prevention
123:         if (preventXss) {
124:             for (const pattern of ENHANCED_XSS_PATTERNS) {
125:                 if (pattern.test(sanitized)) {
126:                     throw new Error('Input contains potentially dangerous content (XSS)');
127:                 }
128:             }
129:             
130:             if (!allowHtml) {
131:                 // Remove all HTML tags if not allowed
132:                 sanitized = sanitized.replace(/<[^>]*>/g, '');
133:             }
134:         }
135: 
136:         // SQL injection prevention
137:         if (preventSqlInjection) {
138:             for (const pattern of ENHANCED_SQL_PATTERNS) {
139:                 if (pattern.test(sanitized)) {
140:                     throw new Error('Input contains potentially dangerous content (SQL)');
141:                 }
142:             }
143:         }
144: 
145:         // Command injection prevention
146:         if (preventCommandInjection) {
147:             for (const pattern of COMMAND_INJECTION_PATTERNS) {
148:                 if (pattern.test(sanitized)) {
149:                     throw new Error('Input contains potentially dangerous content (Command)');
150:                 }
151:             }
152:         }
153: 
154:         // LDAP injection prevention
155:         if (preventLdapInjection) {
156:             for (const pattern of LDAP_INJECTION_PATTERNS) {
157:                 if (pattern.test(sanitized)) {
158:                     throw new Error('Input contains potentially dangerous content (LDAP)');
159:                 }
160:             }
161:         }
162: 
163:         return sanitized;
164:     }
165: 
166:     // Deep sanitization for objects and arrays
167:     static sanitizeObject<T extends Record<string, any>>(
168:         obj: T, 
169:         sanitizationOptions: Parameters<typeof ValidationMiddleware.sanitizeInput>[1] = {}
170:     ): T {
171:         const sanitized = {} as T;
172: 
173:         for (const [key, value] of Object.entries(obj)) {
174:             try {
175:                 if (typeof value === 'string') {
176:                     sanitized[key as keyof T] = this.sanitizeInput(value, sanitizationOptions) as T[keyof T];
177:                 } else if (Array.isArray(value)) {
178:                     sanitized[key as keyof T] = value.map(item => 
179:                         typeof item === 'string' ? this.sanitizeInput(item, sanitizationOptions) : item
180:                     ) as T[keyof T];
181:                 } else if (typeof value === 'object' && value !== null) {
182:                     sanitized[key as keyof T] = this.sanitizeObject(value, sanitizationOptions);
183:                 } else {
184:                     sanitized[key as keyof T] = value;
185:                 }
186:             } catch (error) {
187:                 throw new Error(`Validation error in field '${key}': ${error instanceof Error ? error.message : 'Unknown error'}`);
188:             }
189:         }
190: 
191:         return sanitized;
192:     }
193: 
194:     // Rate limiting validation
195:     static validateRateLimit(remainingRequests: number): void {
196:         if (remainingRequests <= 0) {
197:             throw new Error('Rate limit exceeded');
198:         }
199:     }
200: }
201: 
202: // Validation middleware factory
203: export function withValidation<T extends z.ZodSchema>(
204:     schema: T,
205:     options: {
206:         sanitizationOptions?: Parameters<typeof ValidationMiddleware.sanitizeInput>[1];
207:         skipSanitization?: boolean;
208:         customValidation?: (data: z.infer<T>) => Promise<void> | void;
209:     } = {}
210: ) {
211:     return function(handler: APIRoute): APIRoute {
212:         return async (context) => {
213:             const { request } = context;
214:             const requestId = `val_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
215: 
216:             try {
217:                 // Skip validation for GET requests unless explicitly required
218:                 if (request.method === 'GET') {
219:                     return handler(context);
220:                 }
221: 
222:                 // Parse request body
223:                 let body: unknown;
224:                 try {
225:                     const contentType = request.headers.get('content-type') || '';
226:                     
227:                     if (contentType.includes('application/json')) {
228:                         body = await request.json();
229:                     } else if (contentType.includes('application/x-www-form-urlencoded')) {
230:                         const formData = await request.formData();
231:                         body = Object.fromEntries(formData.entries());
232:                     } else {
233:                         body = await request.text();
234:                     }
235:                 } catch (error) {
236:                     console.error(`[${requestId}] Request parsing error:`, error);
237:                     return new Response(
238:                         JSON.stringify({
239:                             success: false,
240:                             message: 'Invalid request format',
241:                             errors: { general: 'Unable to parse request body' },
242:                             requestId
243:                         }),
244:                         {
245:                             status: 400,
246:                             headers: { 'Content-Type': 'application/json' }
247:                         }
248:                     );
249:                 }
250: 
251:                 // Sanitize input if not skipped
252:                 if (!options.skipSanitization && typeof body === 'object' && body !== null) {
253:                     try {
254:                         body = ValidationMiddleware.sanitizeObject(
255:                             body as Record<string, any>, 
256:                             options.sanitizationOptions
257:                         );
258:                     } catch (sanitizationError) {
259:                         console.warn(`[${requestId}] Sanitization error:`, sanitizationError);
260:                         return new Response(
261:                             JSON.stringify({
262:                                 success: false,
263:                                 message: 'Input validation failed',
264:                                 errors: { 
265:                                     general: sanitizationError instanceof Error ? 
266:                                         sanitizationError.message : 
267:                                         'Input contains invalid content' 
268:                                 },
269:                                 requestId
270:                             }),
271:                             {
272:                                 status: 400,
273:                                 headers: { 'Content-Type': 'application/json' }
274:                             }
275:                         );
276:                     }
277:                 }
278: 
279:                 // Validate against schema
280:                 const validation = schema.safeParse(body);
281:                 if (!validation.success) {
282:                     const errors: Record<string, string> = {};
283:                     validation.error.errors.forEach(err => {
284:                         const path = err.path.join('.');
285:                         errors[path] = err.message;
286:                     });
287: 
288:                     console.warn(`[${requestId}] Schema validation failed:`, errors);
289:                     return new Response(
290:                         JSON.stringify({
291:                             success: false,
292:                             message: 'Validation failed',
293:                             errors,
294:                             requestId
295:                         }),
296:                         {
297:                             status: 400,
298:                             headers: { 'Content-Type': 'application/json' }
299:                         }
300:                     );
301:                 }
302: 
303:                 // Run custom validation if provided
304:                 if (options.customValidation) {
305:                     try {
306:                         await options.customValidation(validation.data);
307:                     } catch (customError) {
308:                         console.warn(`[${requestId}] Custom validation failed:`, customError);
309:                         return new Response(
310:                             JSON.stringify({
311:                                 success: false,
312:                                 message: 'Validation failed',
313:                                 errors: { 
314:                                     general: customError instanceof Error ? 
315:                                         customError.message : 
316:                                         'Custom validation failed' 
317:                                 },
318:                                 requestId
319:                             }),
320:                             {
321:                                 status: 400,
322:                                 headers: { 'Content-Type': 'application/json' }
323:                             }
324:                         );
325:                     }
326:                 }
327: 
328:                 // Add validated data to context for the handler
329:                 (context as any).validatedData = validation.data;
330:                 (context as any).requestId = requestId;
331: 
332:                 return handler(context);
333: 
334:             } catch (error) {
335:                 console.error(`[${requestId}] Validation middleware error:`, error);
336:                 return new Response(
337:                     JSON.stringify({
338:                         success: false,
339:                         message: 'Validation processing failed',
340:                         errors: { general: 'Internal validation error' },
341:                         requestId
342:                     }),
343:                     {
344:                         status: 500,
345:                         headers: { 'Content-Type': 'application/json' }
346:                     }
347:                 );
348:             }
349:         };
350:     };
351: }
352: 
353: // Specific validation schemas for different endpoint types
354: export const commonApiSchemas = {
355:     // Generic request with common security checks
356:     secureRequest: z.object({
357:         // Honeypot fields
358:         website: z.string().max(0).optional(),
359:         url: z.string().max(0).optional(),
360:         honeypot: z.string().max(0).optional(),
361:         
362:         // Timestamp validation (requests shouldn't be too old)
363:         timestamp: z.string()
364:             .optional()
365:             .refine(
366:                 (timestamp) => {
367:                     if (!timestamp) return true;
368:                     const requestTime = new Date(timestamp).getTime();
369:                     const now = Date.now();
370:                     const fiveMinutes = 5 * 60 * 1000;
371:                     return (now - requestTime) < fiveMinutes;
372:                 },
373:                 { message: 'Request timestamp is too old' }
374:             )
375:     }),
376: 
377:     // CSRF token validation
378:     csrfRequest: z.object({
379:         csrfToken: z.string()
380:             .min(16, 'CSRF token is required')
381:             .max(64, 'CSRF token is invalid'),
382:         sessionId: z.string()
383:             .min(16, 'Session ID is required')
384:             .max(64, 'Session ID is invalid')
385:     }),
386: 
387:     // Pagination validation
388:     paginationRequest: z.object({
389:         page: z.number().int().min(1).max(1000).default(1),
390:         limit: z.number().int().min(1).max(100).default(20),
391:         sortBy: z.string().max(50).optional(),
392:         sortOrder: z.enum(['asc', 'desc']).default('desc')
393:     }),
394: 
395:     // Search validation
396:     searchRequest: z.object({
397:         query: z.string()
398:             .min(1, 'Search query is required')
399:             .max(200, 'Search query is too long')
400:             .refine(
401:                 (query) => !ENHANCED_XSS_PATTERNS.some(pattern => pattern.test(query)),
402:                 { message: 'Search query contains invalid characters' }
403:             ),
404:         filters: z.record(z.string().max(100)).optional()
405:     })
406: };
407: 
408: // Export enhanced validation utilities
409: export { ENHANCED_XSS_PATTERNS, ENHANCED_SQL_PATTERNS, COMMAND_INJECTION_PATTERNS, LDAP_INJECTION_PATTERNS };
```

## File: tsconfig.json
```json
1: {
2:     "extends": "astro/tsconfigs/base",
3:     "include": [".astro/types.d.ts", "**/*"],
4:     "exclude": ["dist"],
5:     "compilerOptions": {
6:         "jsx": "react-jsx",
7:         "jsxImportSource": "react"
8:     }
9: }
```

## File: src/components/debt-relief/BenefitItem.astro
```
 1: ---
 2: // src/components/debt-relief/BenefitItem.astro
 3: interface Props {
 4:     title: string;
 5:     description: string;
 6: }
 7: 
 8: const { title, description } = Astro.props;
 9: ---
10: 
11: <div class="p-6 form-container rounded-lg bg-background-form text-text shadow-md border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
12:     <h3 class="mb-3 text-xl font-semibold flex items-center gap-2">
13:         <span class="text-primary font-bold text-2xl flex items-center justify-center w-8 h-8 rounded-full bg-primary bg-opacity-10">✓</span> 
14:         {title}
15:     </h3>
16:     <p class="text-text-muted leading-relaxed">{description}</p>
17: </div>
18: 
19: <style>
20:     /* Add a slight scale effect on hover for better interactivity */
21:     .form-container {
22:         will-change: transform, box-shadow;
23:     }
24:     
25:     @media (prefers-reduced-motion: no-preference) {
26:         .form-container:hover {
27:             transform: translateY(-4px) scale(1.01);
28:         }
29:     }
30:     
31:     /* Improve readability on mobile */
32:     @media (max-width: 640px) {
33:         .form-container {
34:             padding: 1.25rem;
35:         }
36:     }
37: </style>
```

## File: src/components/debt-relief/DebtCalculator.astro
```
  1: ---
  2: import { Image } from 'astro:assets';
  3: import DollarIcon from '../icons/DollarIcon.astro';
  4: import ClockIcon from '../icons/ClockIcon.astro';
  5: ---
  6: 
  7: <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-border overflow-hidden">
  8:     <div class="p-6 md:p-8">
  9:         <h3 class="text-2xl font-bold text-[#2d7984] mb-6 text-center">Debt Savings Calculator</h3>
 10:         
 11:         <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
 12:             <!-- Calculator Form -->
 13:             <div>
 14:                 <form id="debt-calculator-form" class="space-y-6">
 15:                     <div>
 16:                         <label for="debt-amount" class="form-label">Total Credit Card Debt</label>
 17:                         <div class="relative">
 18:                             <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">$</span>
 19:                             <input 
 20:                                 type="number" 
 21:                                 id="debt-amount" 
 22:                                 name="debtAmount" 
 23:                                 class="pl-8 w-full rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 
 24:                                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
 25:                                        placeholder-gray-500 dark:placeholder-gray-400
 26:                                        focus:outline-none focus:ring-2 focus:ring-[#2d7984] dark:focus:ring-[#58cbe0] focus:border-transparent
 27:                                        transition-colors duration-200" 
 28:                                 placeholder="15000"
 29:                                 min="1000"
 30:                                 required
 31:                             />
 32:                         </div>
 33:                     </div>
 34:                     
 35:                     <div>
 36:                         <label for="interest-rate" class="form-label">Average Interest Rate</label>
 37:                         <div class="relative">
 38:                             <input 
 39:                                 type="number" 
 40:                                 id="interest-rate" 
 41:                                 name="interestRate" 
 42:                                 class="w-full rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 
 43:                                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
 44:                                        placeholder-gray-500 dark:placeholder-gray-400
 45:                                        focus:outline-none focus:ring-2 focus:ring-[#2d7984] dark:focus:ring-[#58cbe0] focus:border-transparent
 46:                                        transition-colors duration-200" 
 47:                                 placeholder="18"
 48:                                 min="1"
 49:                                 max="30"
 50:                                 step="0.1"
 51:                                 required
 52:                             />
 53:                             <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400">%</span>
 54:                         </div>
 55:                     </div>
 56:                     
 57:                     <div>
 58:                         <label for="monthly-payment" class="form-label">Current Monthly Payment</label>
 59:                         <div class="relative">
 60:                             <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">$</span>
 61:                             <input 
 62:                                 type="number" 
 63:                                 id="monthly-payment" 
 64:                                 name="monthlyPayment" 
 65:                                 class="pl-8 w-full rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 
 66:                                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
 67:                                        placeholder-gray-500 dark:placeholder-gray-400
 68:                                        focus:outline-none focus:ring-2 focus:ring-[#2d7984] dark:focus:ring-[#58cbe0] focus:border-transparent
 69:                                        transition-colors duration-200" 
 70:                                 placeholder="300"
 71:                                 min="20"
 72:                                 required
 73:                             />
 74:                         </div>
 75:                     </div>
 76:                     
 77:                     <button 
 78:                         type="submit" 
 79:                         class="btn w-full py-3 px-6 font-semibold"
 80:                     >
 81:                         Calculate My Savings
 82:                     </button>
 83:                 </form>
 84:             </div>
 85:             
 86:             <!-- Results Section (initially hidden) -->
 87:             <div id="calculator-results" class="hidden">
 88:                 <h4 class="text-lg font-semibold mb-4">Your Potential Savings</h4>
 89:                 
 90:                 <div class="space-y-6 mb-6">
 91:                     <div class="bg-[#2d7984]/10 p-4 rounded-md border border-[#2d7984]/20">
 92:                         <div class="flex items-start space-x-4">
 93:                             <div class="mt-1">
 94:                                 <DollarIcon class="w-8 h-8 text-[#2d7984]" />
 95:                             </div>
 96:                             <div>
 97:                                 <p class="text-gray-700 dark:text-gray-300 mb-1">Total Savings with Our Program:</p>
 98:                                 <p class="text-2xl font-bold text-[#2d7984]">$<span id="total-savings">0</span></p>
 99:                             </div>
100:                         </div>
101:                     </div>
102:                     
103:                     <div class="bg-[#2d7984]/10 p-4 rounded-md border border-[#2d7984]/20">
104:                         <div class="flex items-start space-x-4">
105:                             <div class="mt-1">
106:                                 <ClockIcon class="w-8 h-8 text-[#2d7984]" />
107:                             </div>
108:                             <div>
109:                                 <p class="text-gray-700 dark:text-gray-300 mb-1">Time Saved on Repayment:</p>
110:                                 <p class="text-2xl font-bold text-[#2d7984]"><span id="months-saved">0</span> months</p>
111:                             </div>
112:                         </div>
113:                     </div>
114:                 </div>
115:                 
116:                 <div class="text-center">
117:                     <a 
118:                         href="#qualification-form" 
119:                         class="btn inline-block py-3 px-6 font-semibold"
120:                     >
121:                         See If You Qualify
122:                     </a>
123:                 </div>
124:             </div>
125:             
126:             <!-- Initial Info Message -->
127:             <div id="calculator-info" class="flex flex-col justify-center h-full">
128:                 <div class="bg-[#2d7984]/10 p-6 rounded-md border border-[#2d7984]/20 text-center">
129:                     <h4 class="text-lg font-semibold mb-3">See How Much You Could Save</h4>
130:                     <p class="text-gray-700 dark:text-gray-300 mb-4">
131:                         Our debt settlement program could help you reduce your total debt amount by up to 50% and become debt-free faster.
132:                     </p>
133:                     <p class="text-sm text-gray-600 dark:text-gray-400">
134:                         Fill out the calculator to see your potential savings.
135:                     </p>
136:                 </div>
137:             </div>
138:         </div>
139:     </div>
140: </div>
141: 
142: <script>
143:     // Wait for DOM to be fully loaded
144:     document.addEventListener('DOMContentLoaded', function() {
145:         const calculatorForm = document.getElementById('debt-calculator-form');
146:         const calculatorResults = document.getElementById('calculator-results');
147:         const calculatorInfo = document.getElementById('calculator-info');
148:         const totalSavingsElement = document.getElementById('total-savings');
149:         const monthsSavedElement = document.getElementById('months-saved');
150:         
151:         if (calculatorForm) {
152:             calculatorForm.addEventListener('submit', function(e) {
153:                 e.preventDefault();
154:                 
155:                 // Get form values
156:                 const debtAmount = parseFloat(document.getElementById('debt-amount').value);
157:                 const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100; // Convert to decimal
158:                 const monthlyPayment = parseFloat(document.getElementById('monthly-payment').value);
159:                 
160:                 // Calculate time to pay off with minimum payments
161:                 const monthlyInterestRate = interestRate / 12;
162:                 let balance = debtAmount;
163:                 let monthsToPayOff = 0;
164:                 
165:                 while (balance > 0 && monthsToPayOff < 600) { // 50 years max to prevent infinite loop
166:                     const interestForMonth = balance * monthlyInterestRate;
167:                     balance = balance + interestForMonth - monthlyPayment;
168:                     monthsToPayOff++;
169:                     
170:                     // Break if it would take too long (practical limit)
171:                     if (monthsToPayOff >= 600) {
172:                         monthsToPayOff = "600+";
173:                         break;
174:                     }
175:                 }
176:                 
177:                 // Calculate savings with debt settlement program
178:                 // Assuming 40% reduction in principal and 24 month program
179:                 const settlementSavings = debtAmount * 0.40; // 40% off principal
180:                 const programLength = 24; // 24 months
181:                 
182:                 // Calculate total interest saved
183:                 let interestPaid = 0;
184:                 if (typeof monthsToPayOff === 'number') {
185:                     // Estimate total repayment amount
186:                     const totalRepayment = monthlyPayment * monthsToPayOff;
187:                     interestPaid = totalRepayment - debtAmount;
188:                 } else {
189:                     // If it would take too long, estimate with 20 years of payments
190:                     interestPaid = (monthlyPayment * 240) - debtAmount;
191:                 }
192:                 
193:                 // Total savings (principal reduction + interest savings)
194:                 const totalSavings = settlementSavings + interestPaid;
195:                 
196:                 // Update the results
197:                 totalSavingsElement.textContent = Math.round(totalSavings).toLocaleString();
198:                 
199:                 if (typeof monthsToPayOff === 'number') {
200:                     monthsSavedElement.textContent = (monthsToPayOff - programLength).toLocaleString();
201:                 } else {
202:                     monthsSavedElement.textContent = "500+";
203:                 }
204:                 
205:                 // Show results, hide info
206:                 calculatorResults.classList.remove('hidden');
207:                 calculatorInfo.classList.add('hidden');
208:             });
209:         }
210:     });
211: </script>
```

## File: src/components/debt-relief/Disclosures.astro
```
 1: ---
 2: // src/components/debt-relief/Disclosures.astro
 3: ---
 4: 
 5: <div class="p-8 bg-background-form rounded-lg text-sm text-text-muted space-y-4 shadow-lg border border-border">
 6:     <h4 class="text-text font-semibold mb-4 text-base">Important Program Information:</h4>
 7:     
 8:     <p class="leading-relaxed">
 9:         DebtFreedom is not a lender and does not provide loans. We offer debt settlement services by negotiating with creditors on your behalf to reduce unsecured debt balances.
10:     </p>
11:     
12:     <p class="leading-relaxed">
13:         Our program is designed for individuals experiencing legitimate financial hardship who cannot meet their minimum payment obligations. Not all clients complete the program. Clients who do complete the program typically experience a 25-40% reduction in debt after fees over 24-36 months.
14:     </p>
15:     
16:     <p class="leading-relaxed">
17:         Debt settlement may negatively impact your credit score and ability to obtain credit. When you stop making payments to creditors, they may continue collection activities, including possible legal action. Settled debts may result in tax consequences; please consult a tax professional.
18:     </p>
19:     
20:     <p class="leading-relaxed">
21:         Our services are not available in all states. We do not assume consumer debt, make monthly payments to creditors, or provide tax, bankruptcy, accounting, or legal advice. Please consult appropriate professionals for such services.
22:     </p>
23:     
24:     <p class="leading-relaxed font-medium border-t border-border pt-4 mt-4">
25:         Read and understand all program documents before enrolling. Individual results may vary substantially.
26:     </p>
27: </div>
```

## File: src/components/debt-relief/LandingHeader.astro
```
 1: ---
 2: import DebtFreedomLogo from './DebtFreedomLogo.astro';
 3: import ThemeToggle from '../ThemeToggle.astro';
 4: ---
 5: 
 6: <nav class="flex justify-between items-center w-full pt-6 pb-16 sm:pt-12 sm:pb-24">
 7:     <div class="flex-1"></div>
 8:     <div class="flex justify-center flex-1">
 9:         <a href="/" aria-label="Debt Freedom Toolkit Home">
10:             <DebtFreedomLogo />
11:         </a>
12:     </div>
13:     <div class="flex justify-end flex-1">
14:         <ThemeToggle />
15:     </div>
16: </nav>
```

## File: src/components/debt-relief/Testimonials.astro
```
  1: ---
  2: // src/components/debt-relief/Testimonials.astro
  3: import TestimonialItem from './TestimonialItem.astro';
  4: 
  5: const testimonials = [
  6:     {
  7:         quote: "I had over $23,000 in credit card debt after my medical emergency. The minimum payments were crushing me. DebtFreedom helped me settle for just $12,400 - saving me over $10,000! I completed the program in 28 months and now I'm completely debt-free.",
  8:         name: "Sarah M.",
  9:         location: "Texas",
 10:         debtDetails: "Enrolled Debt: $23,000 | Settled Amount: $12,400 | Program Length: 28 months"
 11:     },
 12:     {
 13:         quote: "After losing my job, my credit card debt spiraled to $32,500. DebtFreedom negotiated my debt down to $16,800. Their team handled everything - all the calls from creditors stopped. The relief is incredible.",
 14:         name: "James T.",
 15:         location: "Florida",
 16:         debtDetails: "Enrolled Debt: $32,500 | Settled Amount: $16,800 | Program Length: 36 months"
 17:     }
 18: ];
 19: ---
 20: 
 21: <div class="testimonials-section">
 22:     <!-- Testimonial Cards Grid -->
 23:     <div class="grid gap-8 md:grid-cols-2 mb-8">
 24:         {testimonials.map(testimonial => (
 25:             <TestimonialItem 
 26:                 quote={testimonial.quote}
 27:                 name={testimonial.name}
 28:                 location={testimonial.location}
 29:                 debtDetails={testimonial.debtDetails}
 30:             />
 31:         ))}
 32:     </div>
 33:     
 34:     <!-- Disclaimer -->
 35:     <p class="mt-4 text-sm text-text-muted text-center italic mb-10">
 36:         *Testimonials represent actual client experiences. Individual results may vary based on your specific situation.
 37:     </p>
 38:     
 39:     <!-- Stats Section -->
 40:     <div class="mt-16">
 41:         <h3 class="mb-10 text-2xl font-bold text-center">Expert Debt Relief Since 2005</h3>
 42:         
 43:         <!-- Stats Cards Grid -->
 44:         <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
 45:             <div class="stats-card p-6 bg-background-form rounded-lg shadow-lg border border-border hover:shadow-xl transition-all duration-300">
 46:                 <h4 class="text-3xl font-bold text-primary mb-2">20,000+</h4>
 47:                 <p class="text-sm">Clients Helped</p>
 48:             </div>
 49:             
 50:             <div class="stats-card p-6 bg-background-form rounded-lg shadow-lg border border-border hover:shadow-xl transition-all duration-300">
 51:                 <h4 class="text-3xl font-bold text-primary mb-2">$800 Million+</h4>
 52:                 <p class="text-sm">Debt Resolved</p>
 53:             </div>
 54:             
 55:             <div class="stats-card p-6 bg-background-form rounded-lg shadow-lg border border-border hover:shadow-xl transition-all duration-300">
 56:                 <h4 class="text-3xl font-bold text-primary mb-2">40%</h4>
 57:                 <p class="text-sm">Average Savings*</p>
 58:             </div>
 59:             
 60:             <div class="stats-card p-6 bg-background-form rounded-lg shadow-lg border border-border hover:shadow-xl transition-all duration-300">
 61:                 <h4 class="text-3xl font-bold text-primary mb-2">4.8/5</h4>
 62:                 <p class="text-sm">Client Rating</p>
 63:             </div>
 64:         </div>
 65:         
 66:         <!-- Stats Disclaimer -->
 67:         <p class="mt-6 text-sm text-text-muted text-center italic">
 68:             *Average savings represents the total debt enrolled compared to the amount paid to creditors before fees. 
 69:             Individual results may vary based on creditor participation, program length, and other factors.
 70:         </p>
 71:     </div>
 72: </div>
 73: 
 74: <style>
 75:     .testimonials-section {
 76:         position: relative;
 77:     }
 78:     
 79:     .stats-card {
 80:         position: relative;
 81:         overflow: hidden;
 82:         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
 83:         transform: translateZ(0);
 84:         will-change: transform, box-shadow;
 85:     }
 86:     
 87:     .stats-card:hover {
 88:         transform: translateY(-2px);
 89:         box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
 90:     }
 91:     
 92:     /* Ensure consistent heading styling */
 93:     h3 {
 94:         position: relative;
 95:     }
 96:     
 97:     h3::after {
 98:         content: "";
 99:         position: absolute;
100:         bottom: -0.75rem;
101:         left: 50%;
102:         transform: translateX(-50%);
103:         width: 80px;
104:         height: 3px;
105:         background-color: var(--color-primary);
106:         border-radius: 3px;
107:     }
108: </style>
```

## File: src/components/icons/QuoteIcon.astro
```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     width?: string;
 5:     height?: string;
 6: }
 7: 
 8: const { class: className = "", width = "32", height = "32" } = Astro.props;
 9: ---
10: 
11: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="currentColor" class={className}>
12:     <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
13: </svg>
```

## File: src/components/theme/index.ts
```typescript
 1: export { ThemeProvider, ThemeContext } from './ThemeProvider';
 2: export type { ThemeType } from './ThemeProvider';
 3: export { 
 4:   // Original exports
 5:   useTheme, 
 6:   getDocumentTheme, 
 7:   isThemeActive,
 8:   
 9:   // New exports
10:   useThemeStyles,
11:   useThemeTransition,
12:   useContrastCheck,
13:   getResolvedTheme,
14:   getThemeColor,
15:   listenToThemeChanges,
16:   getContrastRatio
17: } from './useTheme';
18: export type { 
19:   EnhancedThemeContext,
20:   ThemeValues,
21:   ThemeAwareStyles
22: } from './useTheme';
23: export { 
24:   getSystemPreference, 
25:   isSystemDarkMode, 
26:   addPreferenceChangeListener, 
27:   removePreferenceChangeListener,
28:   createSystemThemeManager 
29: } from './systemTheme';
30: export type { ThemePreference, SystemThemeManager } from './systemTheme';
```

## File: src/components/theme/MediaQueryListenerDemo.tsx
```typescript
  1: import { useState, useEffect, useRef } from 'react';
  2: import { 
  3:   getSystemPreference, 
  4:   addPreferenceChangeListener, 
  5:   removePreferenceChangeListener
  6: } from './systemTheme';
  7: import type { ThemePreference } from './systemTheme';
  8: import { useTheme } from './useTheme';
  9: 
 10: export default function MediaQueryListenerDemo() {
 11:   const { theme, resolvedTheme } = useTheme();
 12:   const [systemPreference, setSystemPreference] = useState<ThemePreference>(getSystemPreference());
 13:   const [changeEvents, setChangeEvents] = useState<string[]>([]);
 14:   const [isListening, setIsListening] = useState(true);
 15:   const changeCount = useRef(0);
 16:   
 17:   // Start listening for system preference changes immediately
 18:   useEffect(() => {
 19:     if (!isListening) return;
 20:     
 21:     const handleChange = (preference: ThemePreference) => {
 22:       changeCount.current += 1;
 23:       const timestamp = new Date().toLocaleTimeString();
 24:       setSystemPreference(preference);
 25:       setChangeEvents(prev => [...prev, `${timestamp}: Changed to ${preference} (event #${changeCount.current})`]);
 26:     };
 27:     
 28:     // Add listener
 29:     addPreferenceChangeListener(handleChange);
 30:     
 31:     // Cleanup
 32:     return () => {
 33:       removePreferenceChangeListener(handleChange);
 34:     };
 35:   }, [isListening]);
 36:   
 37:   // Toggle listener
 38:   const toggleListener = () => {
 39:     setIsListening(prev => !prev);
 40:   };
 41:   
 42:   // Clear event log
 43:   const clearEvents = () => {
 44:     setChangeEvents([]);
 45:     changeCount.current = 0;
 46:   };
 47:   
 48:   // Generate a simulated change event (for testing)
 49:   const simulateChange = () => {
 50:     const newPreference = systemPreference === 'dark' ? 'light' : 'dark';
 51:     const timestamp = new Date().toLocaleTimeString();
 52:     setSystemPreference(newPreference);
 53:     setChangeEvents(prev => [...prev, `${timestamp}: Simulated change to ${newPreference}`]);
 54:   };
 55:   
 56:   return (
 57:     <div className="media-query-demo p-6 my-6 border border-border rounded-lg">
 58:       <h2 className="text-2xl font-bold mb-4">Media Query Listener Demo</h2>
 59:       
 60:       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
 61:         <div>
 62:           <h3 className="text-xl font-semibold mb-2">Theme Status</h3>
 63:           <div className="space-y-2">
 64:             <p><span className="text-text-muted">Current Theme Setting:</span> <span className="font-medium">{theme}</span></p>
 65:             <p><span className="text-text-muted">Resolved Theme:</span> <span className="font-medium">{resolvedTheme}</span></p>
 66:             <p><span className="text-text-muted">System Preference:</span> <span className="font-medium">{systemPreference}</span></p>
 67:             <p><span className="text-text-muted">Listener Status:</span> <span className="font-medium">{isListening ? 'Active' : 'Inactive'}</span></p>
 68:           </div>
 69:         </div>
 70:         
 71:         <div>
 72:           <h3 className="text-xl font-semibold mb-2">Event Log</h3>
 73:           <div className="h-[150px] overflow-y-auto p-3 bg-surface-2 rounded text-sm">
 74:             {changeEvents.length === 0 ? (
 75:               <p className="text-text-muted">No events recorded yet.</p>
 76:             ) : (
 77:               <ul className="space-y-1">
 78:                 {changeEvents.map((event, index) => (
 79:                   <li key={index}>{event}</li>
 80:                 ))}
 81:               </ul>
 82:             )}
 83:           </div>
 84:         </div>
 85:       </div>
 86:       
 87:       <div className="flex flex-wrap gap-3">
 88:         <button 
 89:           onClick={toggleListener}
 90:           className={`btn ${isListening ? 'btn-accent' : ''}`}
 91:         >
 92:           {isListening ? 'Disable' : 'Enable'} Listener
 93:         </button>
 94:         
 95:         <button 
 96:           onClick={clearEvents}
 97:           className="btn"
 98:         >
 99:           Clear Events
100:         </button>
101:         
102:         <button 
103:           onClick={simulateChange}
104:           className="btn btn-secondary"
105:         >
106:           Simulate Preference Change
107:         </button>
108:       </div>
109:       
110:       <div className="mt-6 p-4 bg-surface-2 rounded-lg">
111:         <h3 className="font-bold mb-2">How to Test</h3>
112:         <ol className="list-decimal pl-5 space-y-1">
113:           <li>Change your system's color scheme (light/dark mode) in your OS settings</li>
114:           <li>Observe the event log as listeners detect and respond to changes</li>
115:           <li>Try disabling the listener and change your system theme again</li>
116:           <li>Notice that when using "system" theme, the app theme follows system changes</li>
117:           <li>With "light" or "dark" theme selected, system changes are detected but not applied</li>
118:         </ol>
119:       </div>
120:     </div>
121:   );
122: }
```

## File: src/components/theme/SystemThemeDemo.tsx
```typescript
 1: import { useState, useEffect } from 'react';
 2: import { 
 3:   getSystemPreference, 
 4:   isSystemDarkMode, 
 5:   addPreferenceChangeListener, 
 6:   removePreferenceChangeListener
 7: } from './systemTheme';
 8: import type { ThemePreference } from './systemTheme';
 9: 
10: export default function SystemThemeDemo() {
11:   const [currentPreference, setCurrentPreference] = useState<ThemePreference>(getSystemPreference());
12:   const [isListening, setIsListening] = useState(false);
13:   
14:   // Effect to handle listeners
15:   useEffect(() => {
16:     if (!isListening) return;
17:     
18:     const handleChange = (preference: ThemePreference) => {
19:       setCurrentPreference(preference);
20:       console.log('System preference changed to:', preference);
21:     };
22:     
23:     // Add listener
24:     addPreferenceChangeListener(handleChange);
25:     
26:     // Cleanup
27:     return () => {
28:       removePreferenceChangeListener(handleChange);
29:     };
30:   }, [isListening]);
31:   
32:   // Toggle listener
33:   const toggleListener = () => {
34:     setIsListening(prev => !prev);
35:   };
36:   
37:   // Manually check the current preference
38:   const checkPreference = () => {
39:     setCurrentPreference(getSystemPreference());
40:   };
41:   
42:   return (
43:     <div className="system-theme-demo p-6 my-6 border border-border rounded-lg">
44:       <h2 className="text-2xl font-bold mb-4">System Theme Detection Demo</h2>
45:       
46:       <div className="mb-6">
47:         <p className="mb-2 text-text-muted">Current System Preference:</p>
48:         <p className="text-xl font-semibold">{currentPreference}</p>
49:         <p className="text-sm text-text-muted mt-1">
50:           is{!isSystemDarkMode() && ' not'} dark mode
51:         </p>
52:       </div>
53:       
54:       <div className="flex flex-wrap gap-4 mb-6">
55:         <button 
56:           onClick={checkPreference}
57:           className="btn"
58:         >
59:           Check Current Preference
60:         </button>
61:         
62:         <button 
63:           onClick={toggleListener}
64:           className={`btn ${isListening ? 'btn-accent' : ''}`}
65:         >
66:           {isListening ? 'Stop' : 'Start'} Listening for Changes
67:         </button>
68:       </div>
69:       
70:       <div className="mt-6 p-4 bg-surface-2 rounded-lg">
71:         <p className="text-text-muted mb-2">This component demonstrates:</p>
72:         <ul className="list-disc pl-5">
73:           <li>Getting the current system preference</li>
74:           <li>Checking if the system is in dark mode</li>
75:           <li>Adding/removing preference change listeners</li>
76:           <li>Handling system preference changes in real-time</li>
77:         </ul>
78:         {isListening && (
79:           <p className="mt-4 text-sm italic">
80:             Try changing your system appearance settings while this listener is active. The display will update automatically.
81:           </p>
82:         )}
83:       </div>
84:     </div>
85:   );
86: }
```

## File: src/components/theme/useTheme.ts
```typescript
  1: import { useContext, useMemo, useCallback, useState, useEffect, CSSProperties } from 'react';
  2: import { ThemeContext } from './ThemeProvider';
  3: import type { ThemeType } from './ThemeProvider';
  4: import { getSystemPreference } from './systemTheme';
  5: 
  6: /**
  7:  * Theme-specific values for a property
  8:  */
  9: export interface ThemeValues<T> {
 10:   light: T;
 11:   dark: T;
 12: }
 13: 
 14: /**
 15:  * Theme-aware style properties
 16:  */
 17: export interface ThemeAwareStyles {
 18:   [key: string]: ThemeValues<string | number>;
 19: }
 20: 
 21: /**
 22:  * Enhanced Theme Context return type
 23:  */
 24: export interface EnhancedThemeContext {
 25:   // Original properties from ThemeContext
 26:   theme: ThemeType;
 27:   resolvedTheme: 'light' | 'dark';
 28:   setTheme: (theme: ThemeType) => void;
 29:   toggleTheme: () => void;
 30:   
 31:   // Enhanced properties
 32:   isDarkMode: boolean;
 33:   isLightMode: boolean;
 34:   isSystemTheme: boolean;
 35:   themeClass: (darkClass: string, lightClass?: string) => string;
 36:   getThemeValue: <T>(values: ThemeValues<T>) => T;
 37: }
 38: 
 39: /**
 40:  * Custom hook to access the theme context with enhanced utilities
 41:  * @returns The enhanced theme context with additional utilities
 42:  */
 43: export function useTheme(): EnhancedThemeContext {
 44:   const context = useContext(ThemeContext);
 45:   
 46:   if (!context) {
 47:     throw new Error('useTheme must be used within a ThemeProvider');
 48:   }
 49:   
 50:   // Derive additional properties
 51:   const isDarkMode = context.resolvedTheme === 'dark';
 52:   const isLightMode = context.resolvedTheme === 'light';
 53:   const isSystemTheme = context.theme === 'system';
 54:   
 55:   /**
 56:    * Returns appropriate class based on current theme
 57:    * @param darkClass Class to use in dark mode
 58:    * @param lightClass Class to use in light mode (defaults to empty string)
 59:    * @returns The appropriate class for the current theme
 60:    */
 61:   const themeClass = useCallback(
 62:     (darkClass: string, lightClass: string = ''): string => {
 63:       return isDarkMode ? darkClass : lightClass;
 64:     },
 65:     [isDarkMode]
 66:   );
 67:   
 68:   /**
 69:    * Gets the appropriate value for the current theme
 70:    * @param values Object containing theme-specific values
 71:    * @returns The value for the current theme
 72:    */
 73:   const getThemeValue = useCallback(
 74:     <T,>(values: ThemeValues<T>): T => {
 75:       return isDarkMode ? values.dark : values.light;
 76:     },
 77:     [isDarkMode]
 78:   );
 79:   
 80:   // Return the enhanced context
 81:   return {
 82:     ...context,
 83:     isDarkMode,
 84:     isLightMode,
 85:     isSystemTheme,
 86:     themeClass,
 87:     getThemeValue,
 88:   };
 89: }
 90: 
 91: /**
 92:  * Hook for theme-specific styles in components
 93:  * @param themeStyles Object containing theme-specific styles
 94:  * @returns The styles for the current theme
 95:  */
 96: export function useThemeStyles(themeStyles: ThemeAwareStyles): CSSProperties {
 97:   const { resolvedTheme } = useTheme();
 98:   
 99:   return useMemo(() => {
100:     const result: CSSProperties = {};
101:     
102:     Object.entries(themeStyles).forEach(([key, values]) => {
103:       result[key as keyof CSSProperties] = 
104:         resolvedTheme === 'dark' ? values.dark : values.light;
105:     });
106:     
107:     return result;
108:   }, [themeStyles, resolvedTheme]);
109: }
110: 
111: /**
112:  * Hook for handling theme transition animations
113:  * @param duration Optional custom duration (in ms)
114:  * @returns Animation-related utilities
115:  */
116: export function useThemeTransition(duration: number = 300) {
117:   const { resolvedTheme } = useTheme();
118:   const [isTransitioning, setIsTransitioning] = useState(false);
119:   
120:   // Handle theme changes for animation purposes
121:   useEffect(() => {
122:     setIsTransitioning(true);
123:     const timer = setTimeout(() => {
124:       setIsTransitioning(false);
125:     }, duration);
126:     
127:     return () => clearTimeout(timer);
128:   }, [resolvedTheme, duration]);
129:   
130:   return {
131:     isTransitioning,
132:     transitionClass: `transition-theme duration-${duration}`,
133:   };
134: }
135: 
136: /**
137:  * Hook for checking color contrast with current theme
138:  * @param foreground CSS color value (hex, rgb, etc)
139:  * @param background CSS color value (defaults to theme background)
140:  * @returns Contrast information
141:  */
142: export function useContrastCheck(foreground: string, background?: string) {
143:   const { resolvedTheme } = useTheme();
144:   
145:   return useMemo(() => {
146:     // Get the background color
147:     const bgColor = background || 
148:       (resolvedTheme === 'dark' ? '#1a2234' : '#FFFFFF');
149:     
150:     // Calculate contrast ratio
151:     const contrastRatio = getContrastRatio(foreground, bgColor);
152:     
153:     // Check if it meets WCAG AA standards
154:     const meetsAA = contrastRatio >= 4.5;
155:     const meetsAALarge = contrastRatio >= 3;
156:     
157:     return {
158:       contrastRatio,
159:       meetsAA,
160:       meetsAALarge,
161:       isLegible: meetsAALarge,
162:     };
163:   }, [foreground, background, resolvedTheme]);
164: }
165: 
166: /**
167:  * Helper function to get the current theme outside of React components
168:  * @returns The current theme setting (light, dark, or system)
169:  */
170: export function getDocumentTheme(): ThemeType {
171:   if (typeof window === 'undefined' || !window.themeManager) {
172:     return 'system';
173:   }
174:   
175:   return window.themeManager.getTheme();
176: }
177: 
178: /**
179:  * Helper function to get the resolved theme outside of React components
180:  * @returns The resolved theme (light or dark)
181:  */
182: export function getResolvedTheme(): 'light' | 'dark' {
183:   const theme = getDocumentTheme();
184:   if (theme === 'system') {
185:     return getSystemPreference();
186:   }
187:   return theme;
188: }
189: 
190: /**
191:  * Helper function to determine if a given theme is currently active
192:  * @param theme The theme to check
193:  * @returns True if the specified theme is active
194:  */
195: export function isThemeActive(theme: 'light' | 'dark'): boolean {
196:   if (typeof document === 'undefined') {
197:     // Fallback for server-side rendering
198:     return theme === 'light'; // Default to light theme
199:   }
200:   
201:   const isDark = document.documentElement.classList.contains('dark-theme') || 
202:                  document.documentElement.classList.contains('dark');
203:                  
204:   return theme === 'dark' ? isDark : !isDark;
205: }
206: 
207: /**
208:  * Get a CSS variable value for the current theme
209:  * @param variableName CSS variable name (without --) 
210:  * @returns The value of the CSS variable
211:  */
212: export function getThemeColor(variableName: string): string {
213:   if (typeof document === 'undefined' || typeof window === 'undefined') {
214:     // Fallback for server-side rendering
215:     // Return default colors based on variable name
216:     switch (variableName) {
217:       case 'primary':
218:         return '#2d7984';
219:       case 'secondary':
220:         return '#0062b3';
221:       case 'accent':
222:         return '#58cbe0';
223:       default:
224:         return '#2d7984';
225:     }
226:   }
227:   
228:   try {
229:     return getComputedStyle(document.documentElement)
230:       .getPropertyValue(`--color-${variableName}`).trim();
231:   } catch (e) {
232:     console.error('Error getting theme color:', e);
233:     return '#2d7984'; // Fallback to primary color
234:   }
235: }
236: 
237: /**
238:  * Subscribe to theme changes outside of React
239:  * @param callback Function to call when theme changes
240:  * @returns Cleanup function to remove the listener
241:  */
242: export function listenToThemeChanges(
243:   callback: (theme: ThemeType, resolvedTheme: 'light' | 'dark') => void
244: ): () => void {
245:   if (typeof window === 'undefined') {
246:     return () => {};
247:   }
248:   
249:   const handleThemeChange = () => {
250:     const theme = getDocumentTheme();
251:     const resolvedTheme = theme === 'system' ? getSystemPreference() : theme;
252:     callback(theme, resolvedTheme);
253:   };
254:   
255:   window.addEventListener('theme-change', handleThemeChange as EventListener);
256:   
257:   return () => {
258:     window.removeEventListener('theme-change', handleThemeChange as EventListener);
259:   };
260: }
261: 
262: /**
263:  * Calculate contrast ratio between two colors
264:  * @param color1 First color (CSS color value)
265:  * @param color2 Second color (CSS color value)
266:  * @returns Contrast ratio (1-21)
267:  */
268: export function getContrastRatio(color1: string, color2: string): number {
269:   // Convert colors to luminance values
270:   const luminance1 = getLuminance(color1);
271:   const luminance2 = getLuminance(color2);
272:   
273:   // Calculate contrast ratio
274:   const lighterLum = Math.max(luminance1, luminance2);
275:   const darkerLum = Math.min(luminance1, luminance2);
276:   
277:   return (lighterLum + 0.05) / (darkerLum + 0.05);
278: }
279: 
280: /**
281:  * Calculate relative luminance of a color
282:  * @param color CSS color value
283:  * @returns Relative luminance (0-1)
284:  */
285: function getLuminance(color: string): number {
286:   // Check if we're in a browser environment
287:   if (typeof document === 'undefined' || typeof window === 'undefined') {
288:     // Server-side rendering fallback - return a reasonable default
289:     return 0.5;
290:   }
291: 
292:   try {
293:     // Create a temporary element to use the browser's color parsing
294:     const tempElement = document.createElement('div');
295:     tempElement.style.color = color;
296:     document.body.appendChild(tempElement);
297:     
298:     // Get the computed color
299:     const computedColor = window.getComputedStyle(tempElement).color;
300:     document.body.removeChild(tempElement);
301:     
302:     // Parse the RGB values
303:     const rgbMatch = computedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
304:     if (!rgbMatch) return 0;
305:     
306:     const r = parseInt(rgbMatch[1], 10) / 255;
307:     const g = parseInt(rgbMatch[2], 10) / 255;
308:     const b = parseInt(rgbMatch[3], 10) / 255;
309:     
310:     // Adjust for gamma
311:     const adjustedR = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
312:     const adjustedG = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
313:     const adjustedB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
314:     
315:     // Calculate luminance
316:     return 0.2126 * adjustedR + 0.7152 * adjustedG + 0.0722 * adjustedB;
317:   } catch (error) {
318:     // Fallback in case of any errors
319:     console.error('Error calculating luminance:', error);
320:     return 0.5;
321:   }
322: }
```

## File: src/components/DebtReliefHero.astro
```
 1: ---
 2: ---
 3: 
 4: <div class="py-12 text-center bg-white dark:bg-gray-900 transition-colors duration-300">
 5:     <h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">
 6:         Break Free From Credit Card Debt - 
 7:         <span class="text-[#2d7984] dark:text-[#58cbe0] transition-colors duration-300">Save Up To 50%</span>
 8:     </h1>
 9:     <p class="text-xl text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
10:         Reduce Your Debt By Thousands | Become Debt-Free In 
11:         <span class="text-[#2d7984] dark:text-[#58cbe0] font-semibold transition-colors duration-300">12-36 Months</span>
12:     </p>
13:     
14:     <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto transition-colors duration-300">
15:         Are you struggling with <span class="font-bold text-gray-900 dark:text-white transition-colors duration-300">$15,000+ in credit card debt</span>? Our professional debt settlement program can help you reduce what you owe and become debt-free faster than making minimum payments.
16:     </p>
17:     
18:     <div class="flex flex-col sm:flex-row justify-center gap-4 mb-4">
19:         <a href="#consultation" class="btn btn-lg bg-[#2d7984] hover:bg-[#1d5058] active:bg-[#0f3940] text-white transition-all duration-200">
20:             Get Your Free Consultation Now
21:         </a>
22:         <span class="flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors duration-300">
23:             or Call (800) 555-1234
24:         </span>
25:     </div>
26:     
27:     <p class="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
28:         Available 9:00am - 8:00pm EST, 7 days a week
29:     </p>
30: </div>
```

## File: src/pages/api/gdpr/delete.ts
```typescript
  1: // GDPR Data Deletion API endpoint  
  2: // DELETE /api/gdpr/delete - Delete user data for Right to be Forgotten requests
  3: // Requires proper verification and confirmation
  4: 
  5: import type { APIRoute } from 'astro';
  6: import { supabaseAdmin, getClientIP, checkRateLimit } from '../../../utils/supabase';
  7: import { dataDeletionRequestSchema, validateSecurityContext } from '../../../utils/validation';
  8: import { withCSRFProtection } from '../../../utils/csrf';
  9: import { withSecurityHeaders } from '../../../utils/security';
 10: import { withValidation, ValidationMiddleware } from '../../../utils/validation-middleware';
 11: import { sendGDPRDeletionConfirmationEmail } from '../../../utils/email';
 12: 
 13: export const prerender = false;
 14: 
 15: const deleteHandler: APIRoute = async ({ request }) => {
 16:     const requestId = `gdpr_delete_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
 17:     const startTime = Date.now();
 18:     try {
 19:         // Get client information for rate limiting
 20:         const clientIP = getClientIP(request);
 21:         
 22:         // Enhanced security validation for GDPR endpoint
 23:         const securityValidation = validateSecurityContext(request);
 24:         if (securityValidation.riskLevel === 'high') {
 25:             console.warn(`[${requestId}] High-risk GDPR deletion request from IP: ${clientIP}`, {
 26:                 issues: securityValidation.issues
 27:             });
 28:             return new Response(
 29:                 JSON.stringify({
 30:                     success: false,
 31:                     message: 'Request blocked by security policy',
 32:                     requestId
 33:                 }),
 34:                 {
 35:                     status: 403,
 36:                     headers: { 'Content-Type': 'application/json' }
 37:                 }
 38:             );
 39:         }
 40:         
 41:         console.log(`[${requestId}] GDPR deletion request started`, {
 42:             ip: clientIP,
 43:             timestamp: new Date().toISOString(),
 44:             securityRisk: securityValidation.riskLevel
 45:         });
 46: 
 47:         // Check rate limiting (2 requests per 15 minutes per IP for GDPR endpoints)
 48:         const rateLimitCheck = await checkRateLimit(clientIP, '/api/gdpr/delete', 2, 15);
 49:         if (!rateLimitCheck.allowed) {
 50:             console.warn(`[${requestId}] Rate limit exceeded for IP: ${clientIP}`);
 51:             return new Response(
 52:                 JSON.stringify({
 53:                     success: false,
 54:                     message: 'Rate limit exceeded. Please try again later.',
 55:                     retryAfter: 900, // 15 minutes in seconds
 56:                     requestId
 57:                 }),
 58:                 {
 59:                     status: 429,
 60:                     headers: {
 61:                         'Content-Type': 'application/json',
 62:                         'Retry-After': '900'
 63:                     }
 64:                 }
 65:             );
 66:         }
 67: 
 68:         // Parse request body
 69:         let body: unknown;
 70:         try {
 71:             body = await request.json();
 72:         } catch (error) {
 73:             return new Response(
 74:                 JSON.stringify({
 75:                     success: false,
 76:                     message: 'Invalid JSON in request body',
 77:                     requestId
 78:                 }),
 79:                 {
 80:                     status: 400,
 81:                     headers: { 'Content-Type': 'application/json' }
 82:                 }
 83:             );
 84:         }
 85: 
 86:         // Validate input
 87:         const validation = dataDeletionRequestSchema.safeParse(body);
 88:         if (!validation.success) {
 89:             const errors: Record<string, string> = {};
 90:             validation.error.errors.forEach(err => {
 91:                 const path = err.path.join('.');
 92:                 errors[path] = err.message;
 93:             });
 94:             
 95:             return new Response(
 96:                 JSON.stringify({
 97:                     success: false,
 98:                     message: 'Validation failed',
 99:                     errors
100:                 }),
101:                 {
102:                     status: 400,
103:                     headers: { 'Content-Type': 'application/json' }
104:                 }
105:             );
106:         }
107: 
108:         const { email, phone, confirmDeletion } = validation.data;
109: 
110:         // Double-check confirmation
111:         if (!confirmDeletion) {
112:             return new Response(
113:                 JSON.stringify({
114:                     success: false,
115:                     message: 'Deletion must be explicitly confirmed',
116:                     errors: { confirmDeletion: 'You must confirm the deletion request' }
117:                 }),
118:                 {
119:                     status: 400,
120:                     headers: { 'Content-Type': 'application/json' }
121:                 }
122:             );
123:         }
124: 
125:         // First, find the records to be deleted
126:         let findQuery = supabaseAdmin.from('leads').select('id, created_at');
127:         
128:         if (email && phone) {
129:             // If both provided, find records matching either
130:             findQuery = findQuery.or(`email.eq.${email},phone.eq.${phone}`);
131:         } else if (email) {
132:             findQuery = findQuery.eq('email', email);
133:         } else if (phone) {
134:             findQuery = findQuery.eq('phone', phone);
135:         }
136: 
137:         const { data: recordsToDelete, error: findError } = await findQuery;
138: 
139:         if (findError) {
140:             console.error('GDPR deletion find error:', findError);
141:             return new Response(
142:                 JSON.stringify({
143:                     success: false,
144:                     message: 'Unable to locate records. Please try again.'
145:                 }),
146:                 {
147:                     status: 500,
148:                     headers: { 'Content-Type': 'application/json' }
149:                 }
150:             );
151:         }
152: 
153:         if (!recordsToDelete || recordsToDelete.length === 0) {
154:             return new Response(
155:                 JSON.stringify({
156:                     success: false,
157:                     message: 'No records found matching the provided information',
158:                     deletedCount: 0
159:                 }),
160:                 {
161:                     status: 404,
162:                     headers: { 'Content-Type': 'application/json' }
163:                 }
164:             );
165:         }
166: 
167:         // Log the deletion request for audit purposes
168:         const recordIds = recordsToDelete.map(record => record.id);
169:         console.log(`GDPR Deletion Request: Deleting ${recordIds.length} records`, {
170:             timestamp: new Date().toISOString(),
171:             recordIds,
172:             searchCriteria: { email: email || null, phone: phone || null }
173:         });
174: 
175:         // Perform the deletion
176:         let deleteQuery = supabaseAdmin.from('leads').delete();
177:         
178:         if (email && phone) {
179:             deleteQuery = deleteQuery.or(`email.eq.${email},phone.eq.${phone}`);
180:         } else if (email) {
181:             deleteQuery = deleteQuery.eq('email', email);
182:         } else if (phone) {
183:             deleteQuery = deleteQuery.eq('phone', phone);
184:         }
185: 
186:         const { error: deleteError } = await deleteQuery;
187: 
188:         if (deleteError) {
189:             console.error('GDPR deletion error:', deleteError);
190:             return new Response(
191:                 JSON.stringify({
192:                     success: false,
193:                     message: 'Unable to delete records. Please try again.'
194:                 }),
195:                 {
196:                     status: 500,
197:                     headers: { 'Content-Type': 'application/json' }
198:                 }
199:             );
200:         }
201: 
202:         // Send confirmation email if email was provided
203:         let emailResult = null;
204:         if (email) {
205:             try {
206:                 emailResult = await sendGDPRDeletionConfirmationEmail(email, phone, recordsToDelete.length);
207:                 if (!emailResult.success) {
208:                     console.warn(`[${requestId}] Failed to send deletion confirmation email:`, emailResult.error);
209:                 }
210:             } catch (emailError) {
211:                 console.warn(`[${requestId}] Email sending failed:`, emailError);
212:             }
213:         }
214: 
215:         // Log successful deletion
216:         const processingTime = Date.now() - startTime;
217:         console.log(`[${requestId}] GDPR deletion completed successfully in ${processingTime}ms`);
218: 
219:         // Success response
220:         return new Response(
221:             JSON.stringify({
222:                 success: true,
223:                 message: `Successfully deleted ${recordsToDelete.length} record(s)`,
224:                 deletedCount: recordsToDelete.length,
225:                 deletionDate: new Date().toISOString(),
226:                 searchCriteria: {
227:                     email: email || null,
228:                     phone: phone || null
229:                 },
230:                 note: 'This action cannot be undone. All associated data has been permanently removed.',
231:                 emailConfirmation: email ? {
232:                     sent: emailResult?.success || false,
233:                     messageId: emailResult?.messageId || null,
234:                     error: emailResult?.error || null
235:                 } : null,
236:                 requestId,
237:                 processingTime
238:             }),
239:             {
240:                 status: 200,
241:                 headers: { 
242:                     'Content-Type': 'application/json',
243:                     'X-Processing-Time': processingTime.toString()
244:                 }
245:             }
246:         );
247: 
248:     } catch (error) {
249:         const processingTime = Date.now() - startTime;
250:         console.error(`[${requestId}] Unexpected error in GDPR deletion (${processingTime}ms):`, error);
251:         
252:         return new Response(
253:             JSON.stringify({
254:                 success: false,
255:                 message: 'An unexpected error occurred. Please try again.',
256:                 requestId
257:             }),
258:             {
259:                 status: 500,
260:                 headers: { 
261:                     'Content-Type': 'application/json',
262:                     'X-Processing-Time': processingTime.toString()
263:                 }
264:             }
265:         );
266:     }
267: };
268: 
269: // Handle unsupported methods
270: export const GET: APIRoute = async () => {
271:     return new Response(
272:         JSON.stringify({
273:             success: false,
274:             message: 'Method not allowed. Use DELETE with email or phone to delete data.',
275:             usage: {
276:                 method: 'DELETE',
277:                 body: {
278:                     email: 'user@example.com (optional)',
279:                     phone: '1234567890 (optional, 10 digits)',
280:                     confirmDeletion: true
281:                 },
282:                 warning: 'This action permanently deletes all records and cannot be undone',
283:                 note: 'At least one of email or phone must be provided'
284:             }
285:         }),
286:         {
287:             status: 405,
288:             headers: { 
289:                 'Content-Type': 'application/json',
290:                 'Allow': 'DELETE'
291:             }
292:         }
293:     );
294: };
295: 
296: // Apply validation, security middleware and CSRF protection to DELETE handler
297: export const DELETE = withSecurityHeaders(
298:     withCSRFProtection(
299:         withValidation(dataDeletionRequestSchema, {
300:             sanitizationOptions: {
301:                 maxLength: 500,
302:                 preventXss: true,
303:                 preventSqlInjection: true,
304:                 preventCommandInjection: true
305:             }
306:         })(deleteHandler)
307:     )
308: );
309: 
310: export const POST: APIRoute = GET;
311: export const PUT: APIRoute = GET;
312: export const PATCH: APIRoute = GET;
```

## File: src/pages/api/gdpr/export.ts
```typescript
  1: // GDPR Data Export API endpoint
  2: // POST /api/gdpr/export - Export user data for Subject Access Requests
  3: // Requires admin authentication or proper verification
  4: 
  5: import type { APIRoute } from 'astro';
  6: import { supabaseAdmin, getClientIP, checkRateLimit } from '../../../utils/supabase';
  7: import { dataExportRequestSchema, validateSecurityContext } from '../../../utils/validation';
  8: import { withCSRFProtection } from '../../../utils/csrf';
  9: import { withSecurityHeaders } from '../../../utils/security';
 10: import { withValidation, ValidationMiddleware } from '../../../utils/validation-middleware';
 11: import { sendGDPRExportDeliveryEmail } from '../../../utils/email';
 12: 
 13: export const prerender = false;
 14: 
 15: const postHandler: APIRoute = async ({ request }) => {
 16:     const requestId = `gdpr_export_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
 17:     const startTime = Date.now();
 18:     try {
 19:         // Get client information for rate limiting
 20:         const clientIP = getClientIP(request);
 21:         
 22:         // Enhanced security validation for GDPR endpoint
 23:         const securityValidation = validateSecurityContext(request);
 24:         if (securityValidation.riskLevel === 'high') {
 25:             console.warn(`[${requestId}] High-risk GDPR export request from IP: ${clientIP}`, {
 26:                 issues: securityValidation.issues
 27:             });
 28:             return new Response(
 29:                 JSON.stringify({
 30:                     success: false,
 31:                     message: 'Request blocked by security policy',
 32:                     requestId
 33:                 }),
 34:                 {
 35:                     status: 403,
 36:                     headers: { 'Content-Type': 'application/json' }
 37:                 }
 38:             );
 39:         }
 40:         
 41:         console.log(`[${requestId}] GDPR export request started`, {
 42:             ip: clientIP,
 43:             timestamp: new Date().toISOString(),
 44:             securityRisk: securityValidation.riskLevel
 45:         });
 46: 
 47:         // Check rate limiting (2 requests per 15 minutes per IP for GDPR endpoints)
 48:         const rateLimitCheck = await checkRateLimit(clientIP, '/api/gdpr/export', 2, 15);
 49:         if (!rateLimitCheck.allowed) {
 50:             console.warn(`[${requestId}] Rate limit exceeded for IP: ${clientIP}`);
 51:             return new Response(
 52:                 JSON.stringify({
 53:                     success: false,
 54:                     message: 'Rate limit exceeded. Please try again later.',
 55:                     retryAfter: 900, // 15 minutes in seconds
 56:                     requestId
 57:                 }),
 58:                 {
 59:                     status: 429,
 60:                     headers: {
 61:                         'Content-Type': 'application/json',
 62:                         'Retry-After': '900'
 63:                     }
 64:                 }
 65:             );
 66:         }
 67: 
 68:         // Parse request body
 69:         let body: unknown;
 70:         try {
 71:             body = await request.json();
 72:         } catch (error) {
 73:             return new Response(
 74:                 JSON.stringify({
 75:                     success: false,
 76:                     message: 'Invalid JSON in request body',
 77:                     requestId
 78:                 }),
 79:                 {
 80:                     status: 400,
 81:                     headers: { 'Content-Type': 'application/json' }
 82:                 }
 83:             );
 84:         }
 85: 
 86:         // Validate input
 87:         const validation = dataExportRequestSchema.safeParse(body);
 88:         if (!validation.success) {
 89:             const errors: Record<string, string> = {};
 90:             validation.error.errors.forEach(err => {
 91:                 const path = err.path.join('.');
 92:                 errors[path] = err.message;
 93:             });
 94:             
 95:             return new Response(
 96:                 JSON.stringify({
 97:                     success: false,
 98:                     message: 'Validation failed',
 99:                     errors
100:                 }),
101:                 {
102:                     status: 400,
103:                     headers: { 'Content-Type': 'application/json' }
104:                 }
105:             );
106:         }
107: 
108:         const { email, phone } = validation.data;
109: 
110:         // Build query conditions
111:         let query = supabaseAdmin.from('leads').select('*');
112:         
113:         if (email && phone) {
114:             // If both provided, search for either
115:             query = query.or(`email.eq.${email},phone.eq.${phone}`);
116:         } else if (email) {
117:             query = query.eq('email', email);
118:         } else if (phone) {
119:             query = query.eq('phone', phone);
120:         }
121: 
122:         // Execute query
123:         const { data: leads, error } = await query;
124: 
125:         if (error) {
126:             console.error('GDPR export query error:', error);
127:             return new Response(
128:                 JSON.stringify({
129:                     success: false,
130:                     message: 'Unable to retrieve data. Please try again.'
131:                 }),
132:                 {
133:                     status: 500,
134:                     headers: { 'Content-Type': 'application/json' }
135:                 }
136:             );
137:         }
138: 
139:         // Prepare export data (remove sensitive fields)
140:         const exportData = leads.map(lead => ({
141:             id: lead.id,
142:             submission_date: lead.created_at,
143:             last_updated: lead.updated_at,
144:             debt_amount_range: lead.debt_amount,
145:             debt_type: lead.debt_type,
146:             phone_number: lead.phone,
147:             first_name: lead.first_name,
148:             last_name: lead.last_name,
149:             email: lead.email,
150:             marketing_consent: lead.consent_marketing,
151:             processing_consent: lead.consent_processing,
152:             consent_date: lead.consent_timestamp,
153:             status: lead.status,
154:             source: lead.source,
155:             notes: lead.notes
156:             // Excluded: ip_address, user_agent for privacy
157:         }));
158: 
159:         // Send confirmation email if email was provided
160:         let emailResult = null;
161:         if (email) {
162:             try {
163:                 emailResult = await sendGDPRExportDeliveryEmail(email, phone, exportData.length);
164:                 if (!emailResult.success) {
165:                     console.warn(`[${requestId}] Failed to send export delivery email:`, emailResult.error);
166:                 }
167:             } catch (emailError) {
168:                 console.warn(`[${requestId}] Email sending failed:`, emailError);
169:             }
170:         }
171: 
172:         // Log successful export
173:         const processingTime = Date.now() - startTime;
174:         console.log(`[${requestId}] GDPR export completed successfully in ${processingTime}ms`);
175: 
176:         // Return export data
177:         return new Response(
178:             JSON.stringify({
179:                 success: true,
180:                 message: `Found ${exportData.length} record(s) for the provided information`,
181:                 export_date: new Date().toISOString(),
182:                 search_criteria: {
183:                     email: email || null,
184:                     phone: phone || null
185:                 },
186:                 data: exportData,
187:                 privacy_note: 'IP addresses and user agent data are excluded from exports for privacy protection',
188:                 emailConfirmation: email ? {
189:                     sent: emailResult?.success || false,
190:                     messageId: emailResult?.messageId || null,
191:                     error: emailResult?.error || null
192:                 } : null,
193:                 requestId,
194:                 processingTime
195:             }),
196:             {
197:                 status: 200,
198:                 headers: { 
199:                     'Content-Type': 'application/json',
200:                     'Content-Disposition': `attachment; filename="gdpr-export-${Date.now()}.json"`,
201:                     'X-Processing-Time': processingTime.toString()
202:                 }
203:             }
204:         );
205: 
206:     } catch (error) {
207:         const processingTime = Date.now() - startTime;
208:         console.error(`[${requestId}] Unexpected error in GDPR export (${processingTime}ms):`, error);
209:         
210:         return new Response(
211:             JSON.stringify({
212:                 success: false,
213:                 message: 'An unexpected error occurred. Please try again.',
214:                 requestId
215:             }),
216:             {
217:                 status: 500,
218:                 headers: { 
219:                     'Content-Type': 'application/json',
220:                     'X-Processing-Time': processingTime.toString()
221:                 }
222:             }
223:         );
224:     }
225: };
226: 
227: // Apply validation, security middleware and CSRF protection to POST handler
228: export const POST = withSecurityHeaders(
229:     withCSRFProtection(
230:         withValidation(dataExportRequestSchema, {
231:             sanitizationOptions: {
232:                 maxLength: 500,
233:                 preventXss: true,
234:                 preventSqlInjection: true,
235:                 preventCommandInjection: true
236:             }
237:         })(postHandler)
238:     )
239: );
240: 
241: // Handle unsupported methods
242: export const GET: APIRoute = async () => {
243:     return new Response(
244:         JSON.stringify({
245:             success: false,
246:             message: 'Method not allowed. Use POST with email or phone to export data.',
247:             usage: {
248:                 method: 'POST',
249:                 body: {
250:                     email: 'user@example.com (optional)',
251:                     phone: '1234567890 (optional, 10 digits)'
252:                 },
253:                 note: 'At least one of email or phone must be provided'
254:             }
255:         }),
256:         {
257:             status: 405,
258:             headers: { 
259:                 'Content-Type': 'application/json',
260:                 'Allow': 'POST'
261:             }
262:         }
263:     );
264: };
265: 
266: export const PUT: APIRoute = GET;
267: export const DELETE: APIRoute = GET;
268: export const PATCH: APIRoute = GET;
```

## File: src/pages/api/webhooks/resend.ts
```typescript
  1: // Webhook handler for Resend email delivery status updates
  2: // POST /api/webhooks/resend - Handle delivery status, bounces, complaints
  3: 
  4: import type { APIRoute } from 'astro';
  5: import { supabaseAdmin, getClientIP, checkRateLimit } from '../../../utils/supabase';
  6: import { emailService } from '../../../emails/service';
  7: import { withSecurityHeaders } from '../../../utils/security';
  8: 
  9: export const prerender = false;
 10: 
 11: // Resend webhook event types
 12: interface ResendWebhookEvent {
 13:     type: 'email.sent' | 'email.delivered' | 'email.bounced' | 'email.complained' | 'email.clicked' | 'email.opened';
 14:     created_at: string;
 15:     data: {
 16:         id: string;
 17:         email_id: string;
 18:         from: string;
 19:         to: string[];
 20:         subject: string;
 21:         tags?: Record<string, string>;
 22:         created_at: string;
 23:         // Additional fields based on event type
 24:         bounce_type?: 'hard' | 'soft';
 25:         complaint_type?: 'abuse' | 'auth-failure' | 'fraud' | 'not-spam' | 'other' | 'virus';
 26:         click_data?: {
 27:             url: string;
 28:             timestamp: string;
 29:         };
 30:         open_data?: {
 31:             timestamp: string;
 32:             user_agent?: string;
 33:             ip_address?: string;
 34:         };
 35:     };
 36: }
 37: 
 38: // Verify webhook signature (if configured)
 39: function verifyWebhookSignature(request: Request, body: string): boolean {
 40:     const webhookSecret = import.meta.env.RESEND_WEBHOOK_SECRET;
 41:     if (!webhookSecret) {
 42:         console.warn('RESEND_WEBHOOK_SECRET not configured - skipping signature verification');
 43:         return true; // Skip verification if not configured
 44:     }
 45: 
 46:     const signature = request.headers.get('resend-signature');
 47:     if (!signature) {
 48:         console.error('Missing resend-signature header');
 49:         return false;
 50:     }
 51: 
 52:     try {
 53:         // Resend uses HMAC-SHA256 for signature verification
 54:         // Implementation would depend on the specific signature format used by Resend
 55:         // For now, we'll skip detailed signature verification
 56:         return true;
 57:     } catch (error) {
 58:         console.error('Webhook signature verification failed:', error);
 59:         return false;
 60:     }
 61: }
 62: 
 63: const postHandler: APIRoute = async ({ request }) => {
 64:     const requestId = `webhook_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
 65:     const startTime = Date.now();
 66: 
 67:     try {
 68:         // Get client information for rate limiting
 69:         const clientIP = getClientIP(request);
 70:         
 71:         // Check rate limiting for webhook endpoint (100 requests per 15 minutes to prevent DDoS)
 72:         const rateLimitCheck = await checkRateLimit(clientIP, '/api/webhooks/resend', 100, 15);
 73:         if (!rateLimitCheck.allowed) {
 74:             console.warn(`[${requestId}] Webhook rate limit exceeded for IP: ${clientIP}`);
 75:             return new Response(
 76:                 JSON.stringify({
 77:                     success: false,
 78:                     message: 'Rate limit exceeded',
 79:                     requestId
 80:                 }),
 81:                 {
 82:                     status: 429,
 83:                     headers: {
 84:                         'Content-Type': 'application/json',
 85:                         'Retry-After': '900'
 86:                     }
 87:                 }
 88:             );
 89:         }
 90:         // Parse webhook payload
 91:         let body: string;
 92:         let event: ResendWebhookEvent;
 93:         
 94:         try {
 95:             body = await request.text();
 96:             event = JSON.parse(body);
 97:         } catch (error) {
 98:             console.error(`[${requestId}] Invalid webhook payload:`, error);
 99:             return new Response(
100:                 JSON.stringify({
101:                     success: false,
102:                     message: 'Invalid webhook payload'
103:                 }),
104:                 { 
105:                     status: 400,
106:                     headers: { 'Content-Type': 'application/json' }
107:                 }
108:             );
109:         }
110: 
111:         // Verify webhook signature
112:         if (!verifyWebhookSignature(request, body)) {
113:             console.error(`[${requestId}] Webhook signature verification failed`);
114:             return new Response(
115:                 JSON.stringify({
116:                     success: false,
117:                     message: 'Invalid webhook signature'
118:                 }),
119:                 { 
120:                     status: 401,
121:                     headers: { 'Content-Type': 'application/json' }
122:                 }
123:             );
124:         }
125: 
126:         console.log(`[${requestId}] Processing webhook event:`, {
127:             type: event.type,
128:             emailId: event.data.email_id,
129:             to: event.data.to,
130:             timestamp: event.created_at
131:         });
132: 
133:         // Extract metadata from email tags
134:         const tags = event.data.tags || {};
135:         const leadId = tags.lead_id;
136:         const templateType = tags.template;
137:         const originalRequestId = tags.request_id;
138: 
139:         // Update email tracking record in database
140:         try {
141:             const updateData: any = {
142:                 updated_at: new Date().toISOString(),
143:                 webhook_event_type: event.type,
144:                 webhook_received_at: new Date().toISOString()
145:             };
146: 
147:             // Set status based on event type
148:             switch (event.type) {
149:                 case 'email.sent':
150:                     updateData.status = 'sent';
151:                     updateData.sent_at = event.data.created_at;
152:                     break;
153:                 
154:                 case 'email.delivered':
155:                     updateData.status = 'delivered';
156:                     updateData.delivered_at = event.created_at;
157:                     break;
158:                 
159:                 case 'email.bounced':
160:                     updateData.status = 'bounced';
161:                     updateData.bounced_at = event.created_at;
162:                     updateData.bounce_type = event.data.bounce_type;
163:                     updateData.error_message = `Email bounced (${event.data.bounce_type})`;
164:                     break;
165:                 
166:                 case 'email.complained':
167:                     updateData.status = 'complained';
168:                     updateData.complained_at = event.created_at;
169:                     updateData.complaint_type = event.data.complaint_type;
170:                     updateData.error_message = `Spam complaint (${event.data.complaint_type})`;
171:                     break;
172:                 
173:                 case 'email.opened':
174:                     updateData.opened_at = event.created_at;
175:                     updateData.open_count = 1; // Increment in database
176:                     if (event.data.open_data) {
177:                         updateData.last_open_user_agent = event.data.open_data.user_agent;
178:                         updateData.last_open_ip = event.data.open_data.ip_address;
179:                     }
180:                     break;
181:                 
182:                 case 'email.clicked':
183:                     updateData.clicked_at = event.created_at;
184:                     updateData.click_count = 1; // Increment in database
185:                     if (event.data.click_data) {
186:                         updateData.last_clicked_url = event.data.click_data.url;
187:                     }
188:                     break;
189:             }
190: 
191:             // Update tracking record by email_id
192:             const { data: trackingRecord, error: trackingError } = await supabaseAdmin
193:                 .from('email_tracking')
194:                 .update(updateData)
195:                 .eq('email_id', event.data.email_id)
196:                 .select('id, lead_id, email_type');
197: 
198:             if (trackingError) {
199:                 console.error(`[${requestId}] Failed to update email tracking:`, trackingError);
200:             } else if (trackingRecord && trackingRecord.length > 0) {
201:                 console.log(`[${requestId}] Updated email tracking record:`, {
202:                     trackingId: trackingRecord[0].id,
203:                     leadId: trackingRecord[0].lead_id,
204:                     emailType: trackingRecord[0].email_type,
205:                     eventType: event.type
206:                 });
207:             } else {
208:                 console.warn(`[${requestId}] No tracking record found for email_id: ${event.data.email_id}`);
209:             }
210: 
211:         } catch (dbError) {
212:             console.error(`[${requestId}] Database update error:`, dbError);
213:             // Continue processing - don't fail webhook for database issues
214:         }
215: 
216:         // Handle critical events that require immediate attention
217:         if (event.type === 'email.bounced' || event.type === 'email.complained') {
218:             try {
219:                 // Send alert to administrators for delivery issues
220:                 const alertData = {
221:                     timestamp: new Date().toISOString(),
222:                     environment: import.meta.env.PROD ? 'production' : 'development',
223:                     error: {
224:                         message: `Email ${event.type} for template ${templateType}`,
225:                         type: 'email_error' as const,
226:                         severity: event.type === 'email.complained' ? 'high' : 'medium' as const,
227:                         code: event.type.toUpperCase()
228:                     },
229:                     context: {
230:                         emailId: event.data.email_id,
231:                         recipientEmail: event.data.to[0],
232:                         templateType: templateType,
233:                         leadId: leadId,
234:                         requestId: originalRequestId,
235:                         bounceType: event.data.bounce_type,
236:                         complaintType: event.data.complaint_type
237:                     },
238:                     system: {
239:                         service: 'resend-webhook',
240:                         version: '1.0.0',
241:                         environment: import.meta.env.PROD ? 'production' : 'development'
242:                     },
243:                     actions: {
244:                         dashboardUrl: import.meta.env.DASHBOARD_URL || 'https://dashboard.yourdomain.com',
245:                         logsUrl: `${import.meta.env.LOGS_URL || 'https://logs.yourdomain.com'}/email-tracking`,
246:                         documentsUrl: 'https://docs.yourdomain.com/troubleshooting/email-delivery'
247:                     }
248:                 };
249: 
250:                 await emailService.sendErrorNotification(alertData, {
251:                     priority: event.type === 'email.complained' ? 'high' : 'medium'
252:                 });
253: 
254:                 console.log(`[${requestId}] Sent delivery issue alert for ${event.type}`);
255: 
256:             } catch (alertError) {
257:                 console.error(`[${requestId}] Failed to send delivery alert:`, alertError);
258:             }
259:         }
260: 
261:         // Log successful webhook processing
262:         const processingTime = Date.now() - startTime;
263:         console.log(`[${requestId}] Webhook processed successfully in ${processingTime}ms`);
264: 
265:         // Respond with success (Resend requires 2xx response)
266:         return new Response(
267:             JSON.stringify({
268:                 success: true,
269:                 message: 'Webhook processed successfully',
270:                 eventType: event.type,
271:                 emailId: event.data.email_id,
272:                 processingTime: processingTime
273:             }),
274:             {
275:                 status: 200,
276:                 headers: { 
277:                     'Content-Type': 'application/json',
278:                     'X-Processing-Time': processingTime.toString()
279:                 }
280:             }
281:         );
282: 
283:     } catch (error) {
284:         const processingTime = Date.now() - startTime;
285:         console.error(`[${requestId}] Webhook processing error (${processingTime}ms):`, error);
286:         
287:         // Return success to prevent Resend retries for our internal errors
288:         // Log the error for investigation but don't fail the webhook
289:         return new Response(
290:             JSON.stringify({
291:                 success: true,
292:                 message: 'Webhook received but processing encountered an error',
293:                 error: error instanceof Error ? error.message : 'Unknown error'
294:             }),
295:             {
296:                 status: 200,
297:                 headers: { 
298:                     'Content-Type': 'application/json',
299:                     'X-Processing-Time': processingTime.toString()
300:                 }
301:             }
302:         );
303:     }
304: };
305: 
306: // Apply security headers to POST handler (no CSRF for webhooks)
307: export const POST = withSecurityHeaders(postHandler);
308: 
309: // Handle unsupported methods
310: export const GET: APIRoute = async () => {
311:     return new Response(
312:         JSON.stringify({
313:             success: false,
314:             message: 'Webhook endpoint. Use POST for webhook events.',
315:             allowedMethods: ['POST']
316:         }),
317:         {
318:             status: 405,
319:             headers: { 
320:                 'Content-Type': 'application/json',
321:                 'Allow': 'POST'
322:             }
323:         }
324:     );
325: };
326: 
327: // Export other methods as not allowed
328: export const PUT: APIRoute = GET;
329: export const DELETE: APIRoute = GET;
330: export const PATCH: APIRoute = GET;
```

## File: src/pages/api/health.ts
```typescript
  1: // Database Health Check API endpoint
  2: // GET /api/health - Monitor database size, connectivity, and free tier usage
  3: 
  4: import type { APIRoute } from 'astro';
  5: import { supabaseAdmin, getDatabaseStats, getClientIP } from '../../utils/supabase';
  6: import { withSecurityHeaders } from '../../utils/security';
  7: import { validateSecurityContext } from '../../utils/validation';
  8: 
  9: export const prerender = false;
 10: 
 11: const getHandler: APIRoute = async ({ request }) => {
 12:     const requestId = `health_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
 13:     const clientIP = getClientIP(request);
 14: 
 15:     // Basic security validation for health endpoint
 16:     const securityValidation = validateSecurityContext(request);
 17:     if (securityValidation.riskLevel === 'high') {
 18:         console.warn(`[${requestId}] High-risk health check request from IP: ${clientIP}`, {
 19:             issues: securityValidation.issues
 20:         });
 21:         return new Response(
 22:             JSON.stringify({
 23:                 success: false,
 24:                 message: 'Request blocked by security policy',
 25:                 timestamp: new Date().toISOString()
 26:             }),
 27:             {
 28:                 status: 403,
 29:                 headers: { 'Content-Type': 'application/json' }
 30:             }
 31:         );
 32:     }
 33:     try {
 34:         const startTime = Date.now();
 35:         
 36:         // Test database connectivity
 37:         const { data: connectionTest, error: connectionError } = await supabaseAdmin
 38:             .from('leads')
 39:             .select('id')
 40:             .limit(1);
 41: 
 42:         const responseTime = Date.now() - startTime;
 43: 
 44:         if (connectionError) {
 45:             console.error('Database connection error:', connectionError);
 46:             return new Response(
 47:                 JSON.stringify({
 48:                     success: false,
 49:                     database: {
 50:                         connected: false,
 51:                         error: 'Database connection failed',
 52:                         responseTime: `${responseTime}ms`
 53:                     },
 54:                     timestamp: new Date().toISOString()
 55:                 }),
 56:                 {
 57:                     status: 503,
 58:                     headers: { 'Content-Type': 'application/json' }
 59:                 }
 60:             );
 61:         }
 62: 
 63:         // Get database size and usage statistics
 64:         const databaseStats = await getDatabaseStats();
 65:         
 66:         if (!databaseStats) {
 67:             return new Response(
 68:                 JSON.stringify({
 69:                     success: false,
 70:                     database: {
 71:                         connected: true,
 72:                         error: 'Unable to retrieve database statistics',
 73:                         responseTime: `${responseTime}ms`
 74:                     },
 75:                     timestamp: new Date().toISOString()
 76:                 }),
 77:                 {
 78:                     status: 500,
 79:                     headers: { 'Content-Type': 'application/json' }
 80:                 }
 81:             );
 82:         }
 83: 
 84:         // Get lead statistics
 85:         const { data: leadStats, error: leadStatsError } = await supabaseAdmin
 86:             .from('lead_stats')
 87:             .select('*')
 88:             .single();
 89: 
 90:         let leadStatistics = null;
 91:         if (!leadStatsError && leadStats) {
 92:             leadStatistics = {
 93:                 totalLeads: leadStats.total_leads,
 94:                 newLeads: leadStats.new_leads,
 95:                 contactedLeads: leadStats.contacted_leads,
 96:                 qualifiedLeads: leadStats.qualified_leads,
 97:                 convertedLeads: leadStats.converted_leads,
 98:                 todayLeads: leadStats.today_leads,
 99:                 weekLeads: leadStats.week_leads,
100:                 marketingConsentCount: leadStats.marketing_consent_count
101:             };
102:         }
103: 
104:         // Determine overall health status
105:         const percentUsed = databaseStats.percent_of_free_tier;
106:         let healthStatus = 'healthy';
107:         let recommendations: string[] = [];
108: 
109:         if (percentUsed >= 90) {
110:             healthStatus = 'critical';
111:             recommendations.push('Database usage is at 90%+ of free tier limit');
112:             recommendations.push('Implement data archiving immediately');
113:             recommendations.push('Consider upgrading to paid tier');
114:         } else if (percentUsed >= 80) {
115:             healthStatus = 'warning';
116:             recommendations.push('Database usage is at 80%+ of free tier limit');
117:             recommendations.push('Plan data archiving strategy');
118:             recommendations.push('Monitor usage more frequently');
119:         } else if (percentUsed >= 60) {
120:             healthStatus = 'caution';
121:             recommendations.push('Database usage is at 60%+ of free tier limit');
122:             recommendations.push('Review data retention policies');
123:         }
124: 
125:         if (responseTime > 1000) {
126:             if (healthStatus === 'healthy') healthStatus = 'caution';
127:             recommendations.push(`Database response time is slow (${responseTime}ms)`);
128:         }
129: 
130:         // Success response with comprehensive health data
131:         return new Response(
132:             JSON.stringify({
133:                 success: true,
134:                 status: healthStatus,
135:                 database: {
136:                     connected: true,
137:                     size: databaseStats.database_size,
138:                     sizeBytes: databaseStats.database_size_bytes,
139:                     freeTierStatus: databaseStats.free_tier_status,
140:                     percentUsed: databaseStats.percent_of_free_tier,
141:                     responseTime: `${responseTime}ms`
142:                 },
143:                 leads: leadStatistics,
144:                 recommendations,
145:                 monitoring: {
146:                     freeTierLimit: '500 MB',
147:                     currentUsage: databaseStats.database_size,
148:                     remainingSpace: `${Math.max(0, 500 - (databaseStats.database_size_bytes / (1024 * 1024))).toFixed(2)} MB`,
149:                     projectedDaysUntilFull: leadStatistics ? 
150:                         calculateProjectedDays(databaseStats.database_size_bytes, leadStatistics.weekLeads) : 
151:                         null
152:                 },
153:                 timestamp: new Date().toISOString(),
154:                 version: '1.0.0'
155:             }),
156:             {
157:                 status: 200,
158:                 headers: { 
159:                     'Content-Type': 'application/json',
160:                     'Cache-Control': 'no-cache, no-store, must-revalidate'
161:                 }
162:             }
163:         );
164: 
165:     } catch (error) {
166:         console.error('Health check error:', error);
167:         
168:         return new Response(
169:             JSON.stringify({
170:                 success: false,
171:                 status: 'error',
172:                 message: 'Health check failed',
173:                 error: error instanceof Error ? error.message : 'Unknown error',
174:                 timestamp: new Date().toISOString()
175:             }),
176:             {
177:                 status: 500,
178:                 headers: { 'Content-Type': 'application/json' }
179:             }
180:         );
181:     }
182: };
183: 
184: // Helper function to calculate projected days until database is full
185: function calculateProjectedDays(currentSizeBytes: number, leadsThisWeek: number): number | null {
186:     if (!leadsThisWeek || leadsThisWeek === 0) {
187:         return null; // Cannot project without usage data
188:     }
189:     
190:     const freeTierLimitBytes = 500 * 1024 * 1024; // 500 MB
191:     const remainingBytes = freeTierLimitBytes - currentSizeBytes;
192:     
193:     if (remainingBytes <= 0) {
194:         return 0; // Already at or over limit
195:     }
196:     
197:     // Estimate bytes per lead (rough calculation)
198:     // Assuming each lead takes approximately 2KB on average
199:     const estimatedBytesPerLead = 2048;
200:     const leadsPerDay = leadsThisWeek / 7;
201:     const bytesPerDay = leadsPerDay * estimatedBytesPerLead;
202:     
203:     if (bytesPerDay <= 0) {
204:         return null; // No growth
205:     }
206:     
207:     return Math.floor(remainingBytes / bytesPerDay);
208: }
209: 
210: // Handle unsupported methods
211: export const POST: APIRoute = async () => {
212:     return new Response(
213:         JSON.stringify({
214:             success: false,
215:             message: 'Method not allowed. Use GET to check system health.'
216:         }),
217:         {
218:             status: 405,
219:             headers: { 
220:                 'Content-Type': 'application/json',
221:                 'Allow': 'GET'
222:             }
223:         }
224:     );
225: };
226: 
227: // Apply security headers to GET handler
228: export const GET = withSecurityHeaders(getHandler);
229: 
230: export const PUT: APIRoute = POST;
231: export const DELETE: APIRoute = POST;
232: export const PATCH: APIRoute = POST;
```

## File: src/pages/api/leads.ts
```typescript
  1: // Enhanced API endpoint for debt relief lead submission with integrated EmailService
  2: // POST /api/leads - Submit a new lead from the qualification form
  3: 
  4: import type { APIRoute } from 'astro';
  5: import { supabaseAdmin, getClientIP } from '../../utils/supabase';
  6: import { validateLeadSubmission, type LeadSubmission, leadSubmissionSchema, validateSecurityContext } from '../../utils/validation';
  7: import { checkRateLimit } from '../../utils/supabase';
  8: import { withCSRFProtection } from '../../utils/csrf';
  9: import { withSecurityHeaders, InputSanitizer, SecurityValidator } from '../../utils/security';
 10: import { withValidation, ValidationMiddleware } from '../../utils/validation-middleware';
 11: import { emailService } from '../../emails/service';
 12: import { 
 13:     generateReferenceNumber, 
 14:     calculateLeadPriority, 
 15:     calculateExpectedContactTime, 
 16:     formatPhoneForDisplay 
 17: } from '../../emails/types';
 18: import type { 
 19:     LeadConfirmationEmailData, 
 20:     InternalLeadNotificationEmailData 
 21: } from '../../emails/types';
 22: 
 23: export const prerender = false;
 24: 
 25: // Main POST handler with CSRF and security protection
 26: const postHandler: APIRoute = async ({ request }) => {
 27:     const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
 28:     const startTime = Date.now();
 29: 
 30:     try {
 31:         // Parse request body
 32:         let body: unknown;
 33:         try {
 34:             body = await request.json();
 35:         } catch (error) {
 36:             return new Response(
 37:                 JSON.stringify({
 38:                     success: false,
 39:                     message: 'Invalid JSON in request body',
 40:                     errors: { general: 'Request body must be valid JSON' },
 41:                     requestId
 42:                 }),
 43:                 { 
 44:                     status: 400,
 45:                     headers: { 'Content-Type': 'application/json' }
 46:                 }
 47:             );
 48:         }
 49: 
 50:         // Get client information for audit trail and rate limiting
 51:         const clientIP = getClientIP(request);
 52:         const userAgent = request.headers.get('user-agent') || '';
 53: 
 54:         console.log(`[${requestId}] Lead submission started`, {
 55:             ip: clientIP,
 56:             userAgent: userAgent.substring(0, 100),
 57:             timestamp: new Date().toISOString()
 58:         });
 59: 
 60:         // Enhanced security context validation
 61:         const securityValidation = validateSecurityContext(request);
 62:         if (securityValidation.riskLevel === 'high') {
 63:             console.warn(`[${requestId}] High-risk request detected from IP: ${clientIP}`, {
 64:                 issues: securityValidation.issues,
 65:                 userAgent: request.headers.get('user-agent')
 66:             });
 67:             return new Response(
 68:                 JSON.stringify({
 69:                     success: false,
 70:                     message: 'Request blocked by security policy',
 71:                     requestId
 72:                 }),
 73:                 {
 74:                     status: 403,
 75:                     headers: { 'Content-Type': 'application/json' }
 76:                 }
 77:             );
 78:         }
 79: 
 80:         // Log medium-risk requests for monitoring
 81:         if (securityValidation.riskLevel === 'medium') {
 82:             console.warn(`[${requestId}] Medium-risk request from IP: ${clientIP}`, {
 83:                 issues: securityValidation.issues
 84:             });
 85:         }
 86: 
 87:         // Enhanced security checks
 88:         if (SecurityValidator.isLikelyBot(request)) {
 89:             console.warn(`[${requestId}] Bot-like request detected from IP: ${clientIP}`);
 90:             return new Response(
 91:                 JSON.stringify({
 92:                     success: false,
 93:                     message: 'Request blocked by security policy',
 94:                     requestId
 95:                 }),
 96:                 {
 97:                     status: 403,
 98:                     headers: { 'Content-Type': 'application/json' }
 99:                 }
100:             );
101:         }
102: 
103:         // Check for suspicious content
104:         if (SecurityValidator.hasSuspiciousContent(body)) {
105:             console.warn(`[${requestId}] Suspicious content detected from IP: ${clientIP}`);
106:             return new Response(
107:                 JSON.stringify({
108:                     success: false,
109:                     message: 'Request blocked by content filter',
110:                     requestId
111:                 }),
112:                 {
113:                     status: 403,
114:                     headers: { 'Content-Type': 'application/json' }
115:                 }
116:             );
117:         }
118: 
119:         // Enhanced input sanitization with validation middleware
120:         let sanitizedBody: Record<string, any>;
121:         try {
122:             sanitizedBody = ValidationMiddleware.sanitizeObject(body as Record<string, any>, {
123:                 maxLength: 1000,
124:                 preventXss: true,
125:                 preventSqlInjection: true,
126:                 preventCommandInjection: true,
127:                 preventLdapInjection: true
128:             });
129:         } catch (sanitizationError) {
130:             console.warn(`[${requestId}] Enhanced sanitization failed:`, sanitizationError);
131:             return new Response(
132:                 JSON.stringify({
133:                     success: false,
134:                     message: 'Input validation failed',
135:                     errors: { 
136:                         general: sanitizationError instanceof Error ? 
137:                             sanitizationError.message : 
138:                             'Input contains invalid content' 
139:                     },
140:                     requestId
141:                 }),
142:                 {
143:                     status: 400,
144:                     headers: { 'Content-Type': 'application/json' }
145:                 }
146:             );
147:         }
148: 
149:         // Check rate limiting (5 requests per 15 minutes per IP)
150:         const rateLimitCheck = await checkRateLimit(clientIP, '/api/leads', 5, 15);
151:         if (!rateLimitCheck.allowed) {
152:             console.warn(`[${requestId}] Rate limit exceeded for IP: ${clientIP}`);
153:             return new Response(
154:                 JSON.stringify({
155:                     success: false,
156:                     message: 'Rate limit exceeded. Please try again later.',
157:                     retryAfter: 900, // 15 minutes in seconds
158:                     requestId
159:                 }),
160:                 {
161:                     status: 429,
162:                     headers: {
163:                         'Content-Type': 'application/json',
164:                         'Retry-After': '900'
165:                     }
166:                 }
167:             );
168:         }
169: 
170:         // Validate input data (using sanitized input)
171:         const validation = validateLeadSubmission(sanitizedBody);
172:         if (!validation.success) {
173:             console.warn(`[${requestId}] Validation failed:`, validation.errors);
174:             return new Response(
175:                 JSON.stringify({
176:                     success: false,
177:                     message: 'Validation failed',
178:                     errors: validation.errors,
179:                     requestId
180:                 }),
181:                 {
182:                     status: 400,
183:                     headers: { 'Content-Type': 'application/json' }
184:                 }
185:             );
186:         }
187: 
188:         const leadData = validation.data!;
189: 
190:         // Check for duplicate phone number (prevent spam)
191:         const { data: existingLead, error: duplicateCheckError } = await supabaseAdmin
192:             .from('leads')
193:             .select('id, created_at')
194:             .eq('phone', leadData.phone)
195:             .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours
196:             .single();
197: 
198:         if (duplicateCheckError && duplicateCheckError.code !== 'PGRST116') { // PGRST116 = no rows found
199:             console.error(`[${requestId}] Duplicate check error:`, duplicateCheckError);
200:             return new Response(
201:                 JSON.stringify({
202:                     success: false,
203:                     message: 'Unable to process request. Please try again.',
204:                     errors: { general: 'Database error during duplicate check' },
205:                     requestId
206:                 }),
207:                 {
208:                     status: 500,
209:                     headers: { 'Content-Type': 'application/json' }
210:                 }
211:             );
212:         }
213: 
214:         if (existingLead) {
215:             console.warn(`[${requestId}] Duplicate submission detected for phone: ${leadData.phone.slice(-4)}`);
216:             return new Response(
217:                 JSON.stringify({
218:                     success: false,
219:                     message: 'A submission with this phone number was already received in the last 24 hours.',
220:                     errors: { phone: 'Duplicate submission detected' },
221:                     requestId
222:                 }),
223:                 {
224:                     status: 409,
225:                     headers: { 'Content-Type': 'application/json' }
226:                 }
227:             );
228:         }
229: 
230:         // Prepare lead record for database insertion
231:         const leadRecord = {
232:             debt_amount: leadData.debtAmount,
233:             debt_type: leadData.debtType,
234:             phone: leadData.phone,
235:             first_name: leadData.firstName || null,
236:             last_name: leadData.lastName || null,
237:             email: leadData.email || null,
238:             consent_marketing: leadData.consentMarketing,
239:             consent_processing: leadData.consentProcessing,
240:             consent_timestamp: new Date().toISOString(),
241:             ip_address: clientIP,
242:             user_agent: userAgent,
243:             status: 'new' as const,
244:             source: leadData.source || 'qualification-form',
245:             notes: leadData.notes || null,
246:             request_id: requestId
247:         };
248: 
249:         // Insert lead into database
250:         const { data: insertedLead, error: insertError } = await supabaseAdmin
251:             .from('leads')
252:             .insert(leadRecord)
253:             .select('id')
254:             .single();
255: 
256:         if (insertError) {
257:             console.error(`[${requestId}] Lead insertion error:`, insertError);
258:             
259:             // Check if it's a constraint violation (duplicate)
260:             if (insertError.code === '23505') { // PostgreSQL unique violation
261:                 return new Response(
262:                     JSON.stringify({
263:                         success: false,
264:                         message: 'A submission with this information already exists.',
265:                         errors: { general: 'Duplicate submission detected' },
266:                         requestId
267:                     }),
268:                     {
269:                         status: 409,
270:                         headers: { 'Content-Type': 'application/json' }
271:                     }
272:                 );
273:             }
274:             
275:             return new Response(
276:                 JSON.stringify({
277:                     success: false,
278:                     message: 'Unable to save your information. Please try again.',
279:                     errors: { general: 'Database insertion failed' },
280:                     requestId
281:                 }),
282:                 {
283:                     status: 500,
284:                     headers: { 'Content-Type': 'application/json' }
285:                 }
286:             );
287:         }
288: 
289:         const leadId = insertedLead.id;
290:         console.log(`[${requestId}] Lead ${leadId} inserted successfully, preparing email notifications...`);
291: 
292:         // Create complete lead object with ID for email processing
293:         const completeLead = {
294:             ...leadRecord,
295:             id: leadId,
296:             created_at: new Date().toISOString()
297:         };
298: 
299:         // Calculate lead priority for email processing
300:         const leadPriority = calculateLeadPriority({
301:             id: leadId,
302:             debtAmount: leadData.debtAmount,
303:             debtType: leadData.debtType,
304:             phone: leadData.phone,
305:             consentProcessing: leadData.consentProcessing,
306:             consentMarketing: leadData.consentMarketing,
307:             source: leadData.source || 'qualification-form',
308:             submittedAt: completeLead.created_at
309:         });
310: 
311:         // Send email notifications using enhanced EmailService
312:         let emailResults = { 
313:             userConfirmation: { success: false, error: 'Not attempted' }, 
314:             internalNotification: { success: false, error: 'Not attempted' } 
315:         };
316: 
317:         try {
318:             // Send user confirmation email (if email provided)
319:             if (leadData.email) {
320:                 const confirmationData: LeadConfirmationEmailData = {
321:                     timestamp: new Date().toISOString(),
322:                     environment: import.meta.env.PROD ? 'production' : 'development',
323:                     user: {
324:                         firstName: leadData.firstName,
325:                         email: leadData.email,
326:                         phone: formatPhoneForDisplay(leadData.phone)
327:                     },
328:                     lead: {
329:                         debtAmount: leadData.debtAmount,
330:                         debtType: leadData.debtType,
331:                         submittedAt: completeLead.created_at,
332:                         referenceNumber: generateReferenceNumber(leadId)
333:                     },
334:                     nextSteps: {
335:                         expectedContactTime: calculateExpectedContactTime(leadPriority),
336:                         contactMethod: 'Phone call from our certified debt specialist',
337:                         preparationTips: [
338:                             'Have your recent credit card or loan statements ready',
339:                             'List your monthly income and essential expenses',
340:                             'Note any financial hardships affecting your payments',
341:                             'Prepare questions about debt relief options available to you',
342:                             'Ensure you have a quiet space for the 15-20 minute consultation call'
343:                         ]
344:                     }
345:                 };
346: 
347:                 emailResults.userConfirmation = await emailService.sendLeadConfirmation(
348:                     leadData.email,
349:                     confirmationData,
350:                     {
351:                         priority: leadPriority === 'urgent' ? 'urgent' : 'high',
352:                         tags: {
353:                             lead_id: leadId,
354:                             request_id: requestId,
355:                             source: leadData.source || 'qualification-form'
356:                         }
357:                     }
358:                 );
359:             } else {
360:                 emailResults.userConfirmation = { success: true, messageId: 'skipped-no-email' };
361:             }
362: 
363:             // Send internal notification email
364:             const notificationData: InternalLeadNotificationEmailData = {
365:                 timestamp: new Date().toISOString(),
366:                 environment: import.meta.env.PROD ? 'production' : 'development',
367:                 lead: {
368:                     id: leadId,
369:                     debtAmount: leadData.debtAmount,
370:                     debtType: leadData.debtType,
371:                     phone: leadData.phone,
372:                     consentProcessing: leadData.consentProcessing,
373:                     consentMarketing: leadData.consentMarketing,
374:                     source: leadData.source || 'qualification-form',
375:                     ipAddress: clientIP,
376:                     userAgent: userAgent,
377:                     submittedAt: completeLead.created_at
378:                 },
379:                 priority: leadPriority,
380:                 source: {
381:                     page: request.headers.get('referer') || '/debt-relief',
382:                     campaign: request.headers.get('utm-campaign') || undefined,
383:                     referrer: request.headers.get('referer') || undefined
384:                 },
385:                 metadata: {
386:                     ipAddress: clientIP,
387:                     userAgent: userAgent,
388:                     location: {
389:                         // Could be enhanced with IP geolocation
390:                         country: 'United States'
391:                     }
392:                 },
393:                 actions: {
394:                     viewLeadUrl: `${import.meta.env.DASHBOARD_URL || 'https://dashboard.yourdomain.com'}/leads/${leadId}`,
395:                     callLeadUrl: `tel:+1${leadData.phone}`,
396:                     emailLeadUrl: leadData.email ? `mailto:${leadData.email}?subject=Regarding Your Debt Relief Inquiry` : '#'
397:                 }
398:             };
399: 
400:             emailResults.internalNotification = await emailService.sendInternalNotification(
401:                 notificationData,
402:                 {
403:                     priority: leadPriority === 'urgent' ? 'urgent' : 'high',
404:                     tags: {
405:                         lead_id: leadId,
406:                         request_id: requestId,
407:                         lead_priority: leadPriority,
408:                         source: leadData.source || 'qualification-form'
409:                     }
410:                 }
411:             );
412: 
413:             // Log email results for monitoring
414:             console.log(`[${requestId}] Email notifications completed:`, {
415:                 leadId: leadId,
416:                 userConfirmation: {
417:                     success: emailResults.userConfirmation.success,
418:                     emailId: emailResults.userConfirmation.emailId,
419:                     error: emailResults.userConfirmation.error
420:                 },
421:                 internalNotification: {
422:                     success: emailResults.internalNotification.success,
423:                     emailId: emailResults.internalNotification.emailId,
424:                     error: emailResults.internalNotification.error
425:                 }
426:             });
427: 
428:         } catch (emailError) {
429:             console.error(`[${requestId}] Email sending failed:`, emailError);
430:             // Continue with success response even if emails fail - user experience priority
431:         }
432: 
433:         // Track email delivery in database for analytics
434:         try {
435:             await supabaseAdmin
436:                 .from('email_tracking')
437:                 .insert([
438:                     ...(leadData.email ? [{
439:                         lead_id: leadId,
440:                         email_type: 'lead_confirmation' as const,
441:                         recipient_email: leadData.email,
442:                         success: emailResults.userConfirmation.success,
443:                         error_message: emailResults.userConfirmation.error || null,
444:                         email_id: emailResults.userConfirmation.emailId || null,
445:                         request_id: requestId
446:                     }] : []),
447:                     {
448:                         lead_id: leadId,
449:                         email_type: 'internal_notification' as const,
450:                         recipient_email: 'internal',
451:                         success: emailResults.internalNotification.success,
452:                         error_message: emailResults.internalNotification.error || null,
453:                         email_id: emailResults.internalNotification.emailId || null,
454:                         request_id: requestId
455:                     }
456:                 ]);
457:         } catch (trackingError) {
458:             console.error(`[${requestId}] Email tracking failed:`, trackingError);
459:             // Don't fail the request for tracking errors
460:         }
461: 
462:         const processingTime = Date.now() - startTime;
463:         console.log(`[${requestId}] Lead submission completed successfully in ${processingTime}ms`);
464: 
465:         // Prepare success response with email status
466:         const responseData: any = {
467:             success: true,
468:             message: 'Thank you for your submission! A debt relief specialist will contact you shortly.',
469:             leadId: leadId,
470:             requestId: requestId
471:         };
472: 
473:         // Add email status to response for debugging (only in development)
474:         if (import.meta.env.DEV) {
475:             responseData.emailStatus = {
476:                 userConfirmationSent: emailResults.userConfirmation.success,
477:                 internalNotificationSent: emailResults.internalNotification.success,
478:                 processingTimeMs: processingTime
479:             };
480:         }
481: 
482:         // Success response
483:         return new Response(
484:             JSON.stringify(responseData),
485:             {
486:                 status: 201,
487:                 headers: { 
488:                     'Content-Type': 'application/json',
489:                     'X-Remaining-Requests': rateLimitCheck.remainingRequests.toString(),
490:                     'X-Processing-Time': processingTime.toString()
491:                 }
492:             }
493:         );
494: 
495:     } catch (error) {
496:         const processingTime = Date.now() - startTime;
497:         console.error(`[${requestId}] Unexpected error in lead submission (${processingTime}ms):`, error);
498:         
499:         // Send error notification email for critical system errors
500:         try {
501:             const errorNotificationData = {
502:                 timestamp: new Date().toISOString(),
503:                 environment: import.meta.env.PROD ? 'production' : 'development',
504:                 error: {
505:                     message: error instanceof Error ? error.message : 'Unknown error',
506:                     stack: error instanceof Error ? error.stack : undefined,
507:                     type: 'api_error' as const,
508:                     severity: 'high' as const,
509:                     code: 'LEAD_SUBMISSION_ERROR'
510:                 },
511:                 context: {
512:                     endpoint: '/api/leads',
513:                     method: 'POST',
514:                     requestId: requestId,
515:                     ipAddress: getClientIP(request),
516:                     userAgent: request.headers.get('user-agent') || 'Unknown'
517:                 },
518:                 system: {
519:                     service: 'debt-relief-api',
520:                     version: '1.0.0',
521:                     environment: import.meta.env.PROD ? 'production' : 'development'
522:                 },
523:                 actions: {
524:                     dashboardUrl: import.meta.env.DASHBOARD_URL || 'https://dashboard.yourdomain.com',
525:                     logsUrl: `${import.meta.env.LOGS_URL || 'https://logs.yourdomain.com'}/search?requestId=${requestId}`,
526:                     documentsUrl: 'https://docs.yourdomain.com/troubleshooting/api-errors'
527:                 }
528:             };
529: 
530:             await emailService.sendErrorNotification(errorNotificationData);
531:         } catch (notificationError) {
532:             console.error(`[${requestId}] Failed to send error notification:`, notificationError);
533:         }
534:         
535:         return new Response(
536:             JSON.stringify({
537:                 success: false,
538:                 message: 'An unexpected error occurred. Please try again.',
539:                 errors: { general: 'Internal server error' },
540:                 requestId: requestId
541:             }),
542:             {
543:                 status: 500,
544:                 headers: { 
545:                     'Content-Type': 'application/json',
546:                     'X-Processing-Time': (Date.now() - startTime).toString()
547:                 }
548:             }
549:         );
550:     }
551: };
552: 
553: // Handle unsupported methods
554: export const GET: APIRoute = async () => {
555:     return new Response(
556:         JSON.stringify({
557:             success: false,
558:             message: 'Method not allowed. Use POST to submit leads.',
559:             allowedMethods: ['POST']
560:         }),
561:         {
562:             status: 405,
563:             headers: { 
564:                 'Content-Type': 'application/json',
565:                 'Allow': 'POST'
566:             }
567:         }
568:     );
569: };
570: 
571: // Apply security middleware and CSRF protection to POST handler
572: export const POST = withSecurityHeaders(withCSRFProtection(postHandler));
573: 
574: // Export other methods as not allowed
575: export const PUT: APIRoute = GET;
576: export const DELETE: APIRoute = GET;
577: export const PATCH: APIRoute = GET;
```

## File: src/pages/contact/index.astro
```
  1: ---
  2: import LandingLayout from '../../layouts/LandingLayout.astro';
  3: ---
  4: 
  5: <LandingLayout title="Contact Us | Debt Freedom Toolkit">
  6:     <section class="py-12 sm:py-16">
  7:         <h1 class="mb-8 text-4xl font-bold">Contact Us</h1>
  8:         
  9:         <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
 10:             <div>
 11:                 <h2 class="mb-6 text-2xl font-semibold">Get in Touch</h2>
 12:                 <p class="mb-6">Have questions about our debt relief program? Our debt specialists are ready to help you understand your options and start your journey to financial freedom.</p>
 13:                 
 14:                 <div class="mb-8">
 15:                     <h3 class="mb-2 text-xl font-medium">Phone</h3>
 16:                     <p class="text-primary text-xl font-bold">(800) 555-1234</p>
 17:                     <p class="text-sm text-gray-400">Available 9:00am - 8:00pm EST, 7 days a week</p>
 18:                 </div>
 19:                 
 20:                 <div class="mb-8">
 21:                     <h3 class="mb-2 text-xl font-medium">Email</h3>
 22:                     <p><a href="mailto:support@debtfreedomtoolkit.com" class="text-primary">support@debtfreedomtoolkit.com</a></p>
 23:                 </div>
 24:                 
 25:                 <div class="mb-8">
 26:                     <h3 class="mb-2 text-xl font-medium">Office Address</h3>
 27:                     <p>Debt Freedom Toolkit</p>
 28:                     <p>123 Financial Way, Suite 500</p>
 29:                     <p>Clearwater, FL 33759</p>
 30:                 </div>
 31:                 
 32:                 <div class="mt-10">
 33:                     <h3 class="mb-4 text-xl font-medium">Business Hours</h3>
 34:                     <table class="w-full">
 35:                         <tr>
 36:                             <td class="py-2">Monday - Friday</td>
 37:                             <td class="py-2">9:00am - 8:00pm EST</td>
 38:                         </tr>
 39:                         <tr>
 40:                             <td class="py-2">Saturday - Sunday</td>
 41:                             <td class="py-2">10:00am - 6:00pm EST</td>
 42:                         </tr>
 43:                     </table>
 44:                 </div>
 45:             </div>
 46:             
 47:             <div>
 48:                 <h2 class="mb-6 text-2xl font-semibold">Send Us a Message</h2>
 49:                 
 50:                 <form class="space-y-6">
 51:                     <div>
 52:                         <label for="name" class="form-label">Full Name*</label>
 53:                         <input 
 54:                             type="text" 
 55:                             id="name" 
 56:                             name="name" 
 57:                             class="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md 
 58:                                    text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
 59:                                    focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400
 60:                                    transition-colors duration-200" 
 61:                             placeholder="Enter your full name"
 62:                             required
 63:                         >
 64:                     </div>
 65:                     
 66:                     <div>
 67:                         <label for="email" class="form-label">Email Address*</label>
 68:                         <input 
 69:                             type="email" 
 70:                             id="email" 
 71:                             name="email" 
 72:                             class="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md 
 73:                                    text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
 74:                                    focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400
 75:                                    transition-colors duration-200" 
 76:                             placeholder="Enter your email address"
 77:                             required
 78:                         >
 79:                     </div>
 80:                     
 81:                     <div>
 82:                         <label for="phone" class="form-label">Phone Number*</label>
 83:                         <input 
 84:                             type="tel" 
 85:                             id="phone" 
 86:                             name="phone" 
 87:                             class="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md 
 88:                                    text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
 89:                                    focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400
 90:                                    transition-colors duration-200" 
 91:                             placeholder="(___) ___-____"
 92:                             required
 93:                         >
 94:                     </div>
 95:                     
 96:                     <div>
 97:                         <label for="debt-amount" class="form-label">Total Debt Amount*</label>
 98:                         <select 
 99:                             id="debt-amount" 
100:                             name="debtAmount" 
101:                             class="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md 
102:                                    text-gray-900 dark:text-white
103:                                    focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400
104:                                    transition-colors duration-200" 
105:                             required
106:                         >
107:                             <option value="">Select Amount</option>
108:                             <option value="10000-15000">$10,000 - $15,000</option>
109:                             <option value="15000-25000">$15,000 - $25,000</option>
110:                             <option value="25000-50000">$25,000 - $50,000</option>
111:                             <option value="50000+">$50,000+</option>
112:                         </select>
113:                     </div>
114:                     
115:                     <div>
116:                         <label for="message" class="form-label">Message</label>
117:                         <textarea 
118:                             id="message" 
119:                             name="message" 
120:                             rows="4" 
121:                             class="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md 
122:                                    text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
123:                                    focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400
124:                                    transition-colors duration-200 resize-vertical"
125:                             placeholder="Tell us about your debt situation and any questions you have..."
126:                         ></textarea>
127:                     </div>
128:                     
129:                     <div>
130:                         <button type="submit" class="btn w-full p-4 text-center font-bold rounded-md">
131:                             Send Message
132:                         </button>
133:                     </div>
134:                     
135:                     <p class="text-xs text-gray-500 dark:text-gray-400">
136:                         By submitting this form, you authorize Debt Freedom Toolkit to contact you at the number provided using automated technology. Your information is kept secure and confidential.
137:                     </p>
138:                 </form>
139:             </div>
140:         </div>
141:         
142:         <div class="mt-10 text-center">
143:             <a href="/debt-relief" class="btn bg-primary text-primary-content">Back to Debt Relief</a>
144:         </div>
145:     </section>
146: </LandingLayout>
```

## File: src/pages/privacy-policy/index.astro
```
 1: ---
 2: import LandingLayout from '../../layouts/LandingLayout.astro';
 3: ---
 4: 
 5: <LandingLayout title="Privacy Policy | Debt Freedom Toolkit">
 6:     <section class="py-12 sm:py-16">
 7:         <h1 class="mb-8 text-4xl font-bold">Privacy Policy</h1>
 8:         
 9:         <div class="prose prose-invert max-w-none">
10:             <p class="mb-6">Last Updated: May 20, 2025</p>
11:             
12:             <h2 class="mt-8 mb-4 text-2xl font-semibold">Introduction</h2>
13:             <p>This Privacy Policy describes how Debt Freedom Toolkit ("we," "us," or "our") collects, uses, and shares information about you when you visit our website at debtfreedomtoolkit.com, use our services, or otherwise interact with us.</p>
14:             
15:             <h2 class="mt-8 mb-4 text-2xl font-semibold">Information We Collect</h2>
16:             <p>We may collect the following types of information:</p>
17:             <ul class="list-disc pl-8 mb-6">
18:                 <li><strong>Personal Information:</strong> Name, email address, phone number, postal address, and financial information necessary to provide debt relief services.</li>
19:                 <li><strong>Usage Information:</strong> Information about how you use our website, including browsing history, search queries, and interaction with our content.</li>
20:                 <li><strong>Device Information:</strong> Information about the device you use to access our website, including device type, operating system, browser type, and IP address.</li>
21:             </ul>
22:             
23:             <h2 class="mt-8 mb-4 text-2xl font-semibold">How We Use Your Information</h2>
24:             <p>We may use the information we collect for the following purposes:</p>
25:             <ul class="list-disc pl-8 mb-6">
26:                 <li>To provide, maintain, and improve our services</li>
27:                 <li>To process your inquiries and requests</li>
28:                 <li>To communicate with you about our services, promotions, and events</li>
29:                 <li>To personalize your experience on our website</li>
30:                 <li>To analyze usage patterns and improve our website and services</li>
31:                 <li>To protect the security and integrity of our website and services</li>
32:                 <li>To comply with legal obligations and enforce our terms of service</li>
33:             </ul>
34:             
35:             <h2 class="mt-8 mb-4 text-2xl font-semibold">Information Sharing</h2>
36:             <p>We may share your information with:</p>
37:             <ul class="list-disc pl-8 mb-6">
38:                 <li><strong>Service Providers:</strong> Third-party companies that perform services on our behalf, such as website hosting, data analysis, and customer service.</li>
39:                 <li><strong>Financial Partners:</strong> Creditors, banks, and other financial institutions as necessary to provide debt relief services.</li>
40:                 <li><strong>Legal Requirements:</strong> To comply with applicable laws, regulations, legal processes, or enforceable governmental requests.</li>
41:             </ul>
42:             
43:             <h2 class="mt-8 mb-4 text-2xl font-semibold">Your Rights and Choices</h2>
44:             <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
45:             <ul class="list-disc pl-8 mb-6">
46:                 <li>Accessing, correcting, or deleting your personal information</li>
47:                 <li>Opting out of marketing communications</li>
48:                 <li>Restricting or objecting to certain processing activities</li>
49:                 <li>Requesting the transfer of your personal information</li>
50:             </ul>
51:             
52:             <div class="bg-[#e8f4f8] border-l-4 border-[#2d7984] p-6 mb-6">
53:                 <h3 class="text-lg font-semibold text-[#2d7984] mb-2">Exercise Your Data Rights</h3>
54:                 <p class="mb-3">You can easily exercise your privacy rights using our online data rights request form:</p>
55:                 <a href="/data-rights" class="inline-flex items-center bg-[#2d7984] text-white px-4 py-2 rounded-md hover:bg-[#1d5058] transition-colors">
56:                     Submit Data Rights Request →
57:                 </a>
58:             </div>
59:             
60:             <h2 class="mt-8 mb-4 text-2xl font-semibold">Data Security</h2>
61:             <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction.</p>
62:             
63:             <h2 class="mt-8 mb-4 text-2xl font-semibold">Children's Privacy</h2>
64:             <p>Our services are not intended for children under the age of 18, and we do not knowingly collect personal information from children under 18.</p>
65:             
66:             <h2 class="mt-8 mb-4 text-2xl font-semibold">Changes to This Privacy Policy</h2>
67:             <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
68:             
69:             <h2 class="mt-8 mb-4 text-2xl font-semibold">Contact Us</h2>
70:             <p>If you have any questions about this Privacy Policy, please contact us at:</p>
71:             <p>Email: privacy@debtfreedomtoolkit.com</p>
72:             <p>Phone: (800) 555-1234</p>
73:             <p>Address: 123 Financial Way, Suite 500, Clearwater, FL 33759</p>
74:         </div>
75:         
76:         <div class="mt-10">
77:             <a href="/debt-relief" class="btn bg-primary text-primary-content">Back to Debt Relief</a>
78:         </div>
79:     </section>
80: </LandingLayout>
```

## File: src/pages/accessibility-testing.astro
```
  1: ---
  2: import Layout from '../layouts/Layout.astro';
  3: ---
  4: 
  5: <Layout title="Accessibility Testing - Color Contrast">
  6:     <div class="max-w-4xl mx-auto py-8">
  7:         <h1 class="text-3xl font-bold mb-6">Accessibility Testing - Color Contrast</h1>
  8:         
  9:         <p class="mb-8">
 10:             This page allows you to test and verify color contrast compliance across both light and dark themes. 
 11:             Toggle the theme using the theme switch in the top-right corner to test both modes.
 12:         </p>
 13:         
 14:         <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
 15:             <!-- Text Elements -->
 16:             <div class="card p-6">
 17:                 <h2 class="text-xl font-bold mb-4">Text Elements</h2>
 18:                 
 19:                 <div class="space-y-4">
 20:                     <div>
 21:                         <h3 class="text-lg font-medium mb-2">Regular Text</h3>
 22:                         <p>This is standard paragraph text using the primary text color.</p>
 23:                     </div>
 24:                     
 25:                     <div>
 26:                         <h3 class="text-lg font-medium mb-2">Muted Text</h3>
 27:                         <p class="text-text-muted">This text uses the muted text color for secondary information.</p>
 28:                     </div>
 29:                     
 30:                     <div>
 31:                         <h3 class="text-lg font-medium mb-2">Links</h3>
 32:                         <p>This paragraph contains a <a href="#" class="underline">standard link</a> that should have sufficient contrast.</p>
 33:                     </div>
 34:                     
 35:                     <div>
 36:                         <h3 class="text-lg font-medium mb-2">Code Elements</h3>
 37:                         <p>Here is an example of an inline <code>code element</code> that should be readable.</p>
 38:                     </div>
 39:                 </div>
 40:             </div>
 41:             
 42:             <!-- Buttons -->
 43:             <div class="card p-6">
 44:                 <h2 class="text-xl font-bold mb-4">Buttons & Form Actions</h2>
 45:                 
 46:                 <div class="space-y-6">
 47:                     <div>
 48:                         <h3 class="text-lg font-medium mb-3">Standard Buttons</h3>
 49:                         <div class="flex flex-wrap gap-3">
 50:                             <button class="btn">Primary Button</button>
 51:                             <button class="btn-secondary">Secondary Button</button>
 52:                             <button class="btn-accent">Accent Button</button>
 53:                             <button class="btn" disabled>Disabled Button</button>
 54:                         </div>
 55:                     </div>
 56:                     
 57:                     <div>
 58:                         <h3 class="text-lg font-medium mb-3">Button Variants</h3>
 59:                         <div class="flex flex-wrap gap-3">
 60:                             <button class="btn-outline">Outline Button</button>
 61:                             <button class="btn-ghost">Ghost Button</button>
 62:                             <button class="btn btn-sm">Small Button</button>
 63:                             <button class="btn btn-lg">Large Button</button>
 64:                         </div>
 65:                     </div>
 66:                     
 67:                     <div>
 68:                         <h3 class="text-lg font-medium mb-3">Icon Buttons</h3>
 69:                         <div class="flex flex-wrap gap-3">
 70:                             <button class="btn btn-with-icon-right">
 71:                                 Next
 72:                                 <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 73:                                     <polyline points="9,18 15,12 9,6"></polyline>
 74:                                 </svg>
 75:                             </button>
 76:                             <button class="btn-secondary btn-with-icon-left">
 77:                                 <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 78:                                     <polyline points="15,18 9,12 15,6"></polyline>
 79:                                 </svg>
 80:                                 Previous
 81:                             </button>
 82:                         </div>
 83:                     </div>
 84:                     
 85:                     <div>
 86:                         <h3 class="text-lg font-medium mb-3">Form Submit Examples</h3>
 87:                         <div class="space-y-3">
 88:                             <form class="inline-block">
 89:                                 <button type="submit" class="btn">Submit Form</button>
 90:                             </form>
 91:                             <form class="inline-block ml-3">
 92:                                 <button type="button" class="btn-outline">Cancel</button>
 93:                             </form>
 94:                         </div>
 95:                     </div>
 96:                     
 97:                     <div>
 98:                         <h3 class="text-lg font-medium mb-3">Link Buttons</h3>
 99:                         <div class="flex flex-wrap gap-3">
100:                             <a href="#" class="btn">Link as Button</a>
101:                             <a href="#" class="btn-secondary">Secondary Link</a>
102:                             <a href="#" class="btn-outline">Outline Link</a>
103:                         </div>
104:                     </div>
105:                 </div>
106:             </div>
107:             
108:             <!-- Form Elements -->
109:             <div class="card p-6">
110:                 <h2 class="text-xl font-bold mb-4">Form Elements</h2>
111:                 
112:                 <div class="space-y-4">
113:                     <div>
114:                         <label for="test-input" class="form-label">Text Input</label>
115:                         <input 
116:                             type="text" 
117:                             id="test-input" 
118:                             class="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md 
119:                                    text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
120:                                    focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400
121:                                    transition-colors duration-200" 
122:                             placeholder="Placeholder text"
123:                         >
124:                     </div>
125:                     
126:                     <div>
127:                         <label for="test-select" class="form-label">Select Dropdown</label>
128:                         <select 
129:                             id="test-select" 
130:                             class="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md 
131:                                    text-gray-900 dark:text-white
132:                                    focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400
133:                                    transition-colors duration-200"
134:                         >
135:                             <option>Option 1</option>
136:                             <option>Option 2</option>
137:                             <option>Option 3</option>
138:                         </select>
139:                     </div>
140:                     
141:                     <div>
142:                         <label for="test-textarea" class="form-label">Textarea</label>
143:                         <textarea 
144:                             id="test-textarea" 
145:                             class="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md 
146:                                    text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
147:                                    focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400
148:                                    transition-colors duration-200 resize-vertical" 
149:                             placeholder="Placeholder text"
150:                         ></textarea>
151:                     </div>
152:                     
153:                     <div>
154:                         <label class="form-label">Disabled Input</label>
155:                         <input 
156:                             type="text" 
157:                             disabled 
158:                             value="Disabled input" 
159:                             class="w-full p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md 
160:                                    text-gray-500 dark:text-gray-400 cursor-not-allowed"
161:                         >
162:                     </div>
163:                 </div>
164:             </div>
165:             
166:             <!-- Selection Controls -->
167:             <div class="card p-6">
168:                 <h2 class="text-xl font-bold mb-4">Selection Controls</h2>
169:                 
170:                 <div class="space-y-6">
171:                     <div>
172:                         <h3 class="text-lg font-medium mb-3">Checkboxes</h3>
173:                         <div class="space-y-3">
174:                             <div class="flex items-center">
175:                                 <input 
176:                                     type="checkbox" 
177:                                     id="checkbox-1" 
178:                                     class="h-4 w-4 text-[#2d7984] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded 
179:                                            focus:ring-2 focus:ring-[#2d7984] dark:focus:ring-[#58cbe0] 
180:                                            checked:bg-[#2d7984] dark:checked:bg-[#58cbe0] 
181:                                            checked:border-[#2d7984] dark:checked:border-[#58cbe0]
182:                                            transition-colors duration-200"
183:                                 >
184:                                 <label for="checkbox-1" class="ml-2 text-gray-900 dark:text-white">Option 1</label>
185:                             </div>
186:                             <div class="flex items-center">
187:                                 <input 
188:                                     type="checkbox" 
189:                                     id="checkbox-2" 
190:                                     checked
191:                                     class="h-4 w-4 text-[#2d7984] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded 
192:                                            focus:ring-2 focus:ring-[#2d7984] dark:focus:ring-[#58cbe0] 
193:                                            checked:bg-[#2d7984] dark:checked:bg-[#58cbe0] 
194:                                            checked:border-[#2d7984] dark:checked:border-[#58cbe0]
195:                                            transition-colors duration-200"
196:                                 >
197:                                 <label for="checkbox-2" class="ml-2 text-gray-900 dark:text-white">Option 2 (Checked)</label>
198:                             </div>
199:                             <div class="flex items-center">
200:                                 <input 
201:                                     type="checkbox" 
202:                                     id="checkbox-3" 
203:                                     disabled
204:                                     class="h-4 w-4 text-gray-400 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded 
205:                                            cursor-not-allowed opacity-50"
206:                                 >
207:                                 <label for="checkbox-3" class="ml-2 text-gray-500 dark:text-gray-400 cursor-not-allowed">Option 3 (Disabled)</label>
208:                             </div>
209:                         </div>
210:                     </div>
211:                     
212:                     <div>
213:                         <h3 class="text-lg font-medium mb-3">Radio Buttons</h3>
214:                         <div class="space-y-3">
215:                             <div class="flex items-center">
216:                                 <input 
217:                                     type="radio" 
218:                                     id="radio-1" 
219:                                     name="radio-group" 
220:                                     value="option1"
221:                                     class="h-4 w-4 text-[#2d7984] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 
222:                                            focus:ring-2 focus:ring-[#2d7984] dark:focus:ring-[#58cbe0] 
223:                                            checked:bg-[#2d7984] dark:checked:bg-[#58cbe0] 
224:                                            checked:border-[#2d7984] dark:checked:border-[#58cbe0]
225:                                            transition-colors duration-200"
226:                                 >
227:                                 <label for="radio-1" class="ml-2 text-gray-900 dark:text-white">Radio Option 1</label>
228:                             </div>
229:                             <div class="flex items-center">
230:                                 <input 
231:                                     type="radio" 
232:                                     id="radio-2" 
233:                                     name="radio-group" 
234:                                     value="option2"
235:                                     checked
236:                                     class="h-4 w-4 text-[#2d7984] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 
237:                                            focus:ring-2 focus:ring-[#2d7984] dark:focus:ring-[#58cbe0] 
238:                                            checked:bg-[#2d7984] dark:checked:bg-[#58cbe0] 
239:                                            checked:border-[#2d7984] dark:checked:border-[#58cbe0]
240:                                            transition-colors duration-200"
241:                                 >
242:                                 <label for="radio-2" class="ml-2 text-gray-900 dark:text-white">Radio Option 2 (Selected)</label>
243:                             </div>
244:                             <div class="flex items-center">
245:                                 <input 
246:                                     type="radio" 
247:                                     id="radio-3" 
248:                                     name="radio-group" 
249:                                     value="option3"
250:                                     disabled
251:                                     class="h-4 w-4 text-gray-400 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 
252:                                            cursor-not-allowed opacity-50"
253:                                 >
254:                                 <label for="radio-3" class="ml-2 text-gray-500 dark:text-gray-400 cursor-not-allowed">Radio Option 3 (Disabled)</label>
255:                             </div>
256:                         </div>
257:                     </div>
258:                     
259:                     <div>
260:                         <h3 class="text-lg font-medium mb-3">Toggle Switch Example</h3>
261:                         <div class="flex items-center space-x-3">
262:                             <label class="relative inline-flex items-center cursor-pointer">
263:                                 <input type="checkbox" class="sr-only peer" id="toggle-switch">
264:                                 <div class="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none 
265:                                            peer-focus:ring-2 peer-focus:ring-[#2d7984] dark:peer-focus:ring-[#58cbe0] 
266:                                            rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white 
267:                                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
268:                                            after:rounded-full after:h-5 after:w-5 after:transition-all duration-200
269:                                            peer-checked:bg-[#2d7984] dark:peer-checked:bg-[#58cbe0]">
270:                                 </div>
271:                                 <span class="ml-3 text-gray-900 dark:text-white">Enable notifications</span>
272:                             </label>
273:                         </div>
274:                     </div>
275:                 </div>
276:             </div>
277:             
278:             <!-- Alert States -->
279:             <div class="card p-6">
280:                 <h2 class="text-xl font-bold mb-4">Alerts & Errors</h2>
281:                 
282:                 <div class="space-y-4">
283:                     <div>
284:                         <h3 class="text-lg font-medium mb-2">Error Message</h3>
285:                         <p class="error-message">This is an error message with proper contrast.</p>
286:                     </div>
287:                     
288:                     <div>
289:                         <h3 class="text-lg font-medium mb-2">Form Field Error</h3>
290:                         <label class="form-label">Email Address</label>
291:                         <input 
292:                             type="text" 
293:                             class="w-full p-2 bg-white dark:bg-gray-700 border-2 border-red-500 dark:border-red-400 rounded-md 
294:                                    text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
295:                                    focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400
296:                                    transition-colors duration-200" 
297:                             value="invalid.email"
298:                             aria-invalid="true"
299:                             aria-describedby="email-error"
300:                         >
301:                         <p id="email-error" class="error-message mt-1">Please enter a valid email address.</p>
302:                     </div>
303:                     
304:                     <div>
305:                         <h3 class="text-lg font-medium mb-2">Info Alert</h3>
306:                         <div class="flex gap-2 p-3 bg-primary text-white rounded">
307:                             <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
308:                             This is an informational alert.
309:                         </div>
310:                     </div>
311:                     
312:                     <div>
313:                         <h3 class="text-lg font-medium mb-2">Warning Alert</h3>
314:                         <div class="flex gap-2 p-3 bg-yellow-700 text-white rounded">
315:                             <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
316:                             This is a warning alert.
317:                         </div>
318:                     </div>
319:                 </div>
320:             </div>
321:         </div>
322:         
323:         <div class="card p-6 mb-8">
324:             <h2 class="text-xl font-bold mb-4">Contrast Testing Tool</h2>
325:             
326:             <p class="mb-4">
327:                 Use the built-in contrast testing tool to verify that all color combinations meet WCAG AA requirements.
328:             </p>
329:             
330:             <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded font-mono text-sm mb-4">
331:                 <pre>// Open your browser console and run the test function:
332: testThemeContrast();</pre>
333:             </div>
334:             
335:             <button id="run-test" class="btn">Run Contrast Tests</button>
336:             
337:             <div id="test-results" class="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded hidden">
338:                 <h3 class="font-bold mb-2">Test Results:</h3>
339:                 <div id="results-content" class="text-sm font-mono overflow-auto max-h-64"></div>
340:             </div>
341:         </div>
342:     </div>
343: </Layout>
344: 
345: <script src="/scripts/contrast-tester.js" is:inline></script>
346: <script>
347:     document.addEventListener('DOMContentLoaded', () => {
348:         const runTestButton = document.getElementById('run-test');
349:         const testResults = document.getElementById('test-results');
350:         const resultsContent = document.getElementById('results-content');
351:         
352:         if (runTestButton && testResults && resultsContent) {
353:             runTestButton.addEventListener('click', () => {
354:                 // Execute the test
355:                 const results = window.testThemeContrast();
356:                 
357:                 // Prepare result HTML
358:                 const isDarkTheme = document.documentElement.classList.contains('dark') || 
359:                                 document.documentElement.classList.contains('dark-theme');
360:                 
361:                 let html = `<div class="mb-2 font-bold">${isDarkTheme ? 'DARK' : 'LIGHT'} Theme Results:</div>`;
362:                 
363:                 results.forEach(result => {
364:                     const { name, color1Value, color2Value, ratio, passes } = result;
365:                     const formattedRatio = ratio.toFixed(2) + ':1';
366:                     const statusClass = passes ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900';
367:                     const statusText = passes ? 'PASS' : 'FAIL';
368:                     
369:                     html += `
370:                         <div class="mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
371:                             <div class="flex justify-between items-center">
372:                                 <span>${name}</span>
373:                                 <span class="${statusClass} px-2 py-1 rounded text-xs font-bold">${statusText} (${formattedRatio})</span>
374:                             </div>
375:                             <div class="flex gap-2 items-center mt-1">
376:                                 <div class="w-4 h-4 rounded" style="background-color: ${color1Value}"></div>
377:                                 <span class="text-xs">${color1Value}</span>
378:                                 <span>on</span>
379:                                 <div class="w-4 h-4 rounded" style="background-color: ${color2Value}"></div>
380:                                 <span class="text-xs">${color2Value}</span>
381:                             </div>
382:                         </div>
383:                     `;
384:                 });
385:                 
386:                 // Display results
387:                 resultsContent.innerHTML = html;
388:                 testResults.classList.remove('hidden');
389:             });
390:         }
391:     });
392: </script>
```

## File: src/pages/theme-demo.astro
```
  1: ---
  2: import Layout from '../layouts/Layout.astro';
  3: import { ThemeProvider } from '../components/theme';
  4: import ThemeTest from '../components/theme/ThemeTest';
  5: import SystemThemeDemo from '../components/theme/SystemThemeDemo';
  6: import MediaQueryListenerDemo from '../components/theme/MediaQueryListenerDemo';
  7: import ThemeUtilsDemo from '../components/theme/ThemeUtilsDemo';
  8: ---
  9: 
 10: <Layout title="Theme System Demo">
 11:   <div>
 12:     <h1 class="mb-8">Theme System Demo</h1>
 13:     
 14:     <p class="mb-6">
 15:       This page demonstrates the Theme Context Provider, System Preference Detection Utility, and Theme-Aware Component Utilities implementations.
 16:     </p>
 17:     
 18:     <div class="grid grid-cols-1 gap-8">
 19:       <section>
 20:         <h2 class="text-2xl font-bold mb-4">1. Theme Context API</h2>
 21:         <p class="mb-4">
 22:           The context allows React components to access and modify the current theme state.
 23:         </p>
 24:         <ThemeProvider client:only="react">
 25:           <ThemeTest client:only="react" />
 26:         </ThemeProvider>
 27:         
 28:         <div class="mt-4 p-4 bg-surface-2 rounded-lg">
 29:           <h3 class="font-bold mb-2">Implementation Notes</h3>
 30:           <ul class="list-disc pl-5 space-y-1">
 31:             <li>The ThemeProvider connects to the existing theme detection script via window.themeManager</li>
 32:             <li>Theme changes are synchronized between the context and localStorage</li>
 33:             <li>The context provides convenient hooks and methods for React components</li>
 34:             <li>System preferences are automatically detected and applied when using the 'system' setting</li>
 35:           </ul>
 36:         </div>
 37:       </section>
 38:       
 39:       <section>
 40:         <h2 class="text-2xl font-bold mb-4">2. System Preference Detection</h2>
 41:         <p class="mb-4">
 42:           The System Preference Detection Utility provides robust detection and event handling for system color scheme preferences.
 43:         </p>
 44:         <SystemThemeDemo client:only="react" />
 45:         
 46:         <div class="mt-4 p-4 bg-surface-2 rounded-lg">
 47:           <h3 class="font-bold mb-2">Implementation Notes</h3>
 48:           <ul class="list-disc pl-5 space-y-1">
 49:             <li>Reliable detection of system dark/light mode preference</li>
 50:             <li>Event listeners for real-time system preference changes</li>
 51:             <li>Browser compatibility handling for older browsers</li>
 52:             <li>Server-side rendering (SSR) support with safe defaults</li>
 53:             <li>TypeScript types for improved developer experience</li>
 54:           </ul>
 55:         </div>
 56:       </section>
 57:       
 58:       <section>
 59:         <h2 class="text-2xl font-bold mb-4">3. Media Query Listeners</h2>
 60:         <p class="mb-4">
 61:           The Media Query Listeners implementation ensures that the application responds to system preference changes in real-time.
 62:         </p>
 63:         <ThemeProvider client:only="react">
 64:           <MediaQueryListenerDemo client:only="react" />
 65:         </ThemeProvider>
 66:         
 67:         <div class="mt-4 p-4 bg-surface-2 rounded-lg">
 68:           <h3 class="font-bold mb-2">Implementation Notes</h3>
 69:           <ul class="list-disc pl-5 space-y-1">
 70:             <li>Automatic detection of system preference changes</li>
 71:             <li>Real-time theme updates when system preferences change</li>
 72:             <li>Efficient cleanup of event listeners to prevent memory leaks</li>
 73:             <li>Proper useEffect dependency handling</li>
 74:             <li>Error handling and improved debugging</li>
 75:           </ul>
 76:         </div>
 77:       </section>
 78:       
 79:       <section>
 80:         <h2 class="text-2xl font-bold mb-4">4. Theme-Aware Component Utilities</h2>
 81:         <p class="mb-4">
 82:           The Theme-Aware Component Utilities make it easy for developers to create components that respond to theme changes.
 83:         </p>
 84:         <ThemeProvider client:only="react">
 85:           <ThemeUtilsDemo client:only="react" />
 86:         </ThemeProvider>
 87:         
 88:         <div class="mt-4 p-4 bg-surface-2 rounded-lg">
 89:           <h3 class="font-bold mb-2">Implementation Notes</h3>
 90:           <ul class="list-disc pl-5 space-y-1">
 91:             <li>Enhanced useTheme hook with isDarkMode, isLightMode, and isSystemTheme helpers</li>
 92:             <li>themeClass utility for conditional class application</li>
 93:             <li>getThemeValue utility for theme-specific content</li>
 94:             <li>useThemeStyles hook for theme-aware styling</li>
 95:             <li>useThemeTransition hook for theme change animations</li>
 96:             <li>useContrastCheck hook for accessibility compliance</li>
 97:             <li>Non-React utilities for using theme features outside of React components</li>
 98:           </ul>
 99:         </div>
100:       </section>
101:     </div>
102:   </div>
103: </Layout>
```

## File: src/utils/email.ts
```typescript
  1: // Email utility functions for debt relief lead notifications
  2: // Uses Resend for email delivery with usage tracking and monitoring
  3: 
  4: import { Resend } from 'resend';
  5: import { supabaseAdmin } from './supabase';
  6: import type { Lead } from './supabase';
  7: 
  8: // Initialize Resend client
  9: const resendApiKey = import.meta.env.RESEND_API_KEY;
 10: 
 11: if (!resendApiKey) {
 12:     throw new Error('Missing RESEND_API_KEY environment variable');
 13: }
 14: 
 15: const resend = new Resend(resendApiKey);
 16: 
 17: // Configuration constants
 18: const FROM_EMAIL = 'Debt Relief Assistance <noreply@your-domain.com>';
 19: const INTERNAL_EMAIL = 'leads@your-domain.com';
 20: const FREE_TIER_LIMIT = 3000; // Resend free tier limit (emails per month)
 21: const USAGE_WARNING_THRESHOLD = 0.75; // 75% of limit
 22: const USAGE_CRITICAL_THRESHOLD = 0.90; // 90% of limit
 23: 
 24: // Types for email operations
 25: export interface EmailResult {
 26:     success: boolean;
 27:     messageId?: string;
 28:     error?: string;
 29: }
 30: 
 31: export interface EmailUsageStats {
 32:     currentMonth: string;
 33:     emailsSent: number;
 34:     remainingEmails: number;
 35:     percentageUsed: number;
 36:     isNearLimit: boolean;
 37:     isCritical: boolean;
 38: }
 39: 
 40: // HTML email templates
 41: function getUserConfirmationTemplate(lead: Lead): string {
 42:     const debtAmountText = {
 43:         '10000-15000': '$10,000 - $15,000',
 44:         '15000-25000': '$15,000 - $25,000', 
 45:         '25000-50000': '$25,000 - $50,000',
 46:         '50000+': '$50,000+'
 47:     }[lead.debt_amount];
 48: 
 49:     const debtTypeText = {
 50:         'credit-cards': 'Credit Cards',
 51:         'personal-loans': 'Personal Loans',
 52:         'medical': 'Medical Debt',
 53:         'mixed': 'Mixed Debt Types'
 54:     }[lead.debt_type];
 55: 
 56:     return `
 57: <!DOCTYPE html>
 58: <html>
 59: <head>
 60:     <meta charset="utf-8">
 61:     <meta name="viewport" content="width=device-width, initial-scale=1.0">
 62:     <title>Thank You for Your Debt Relief Inquiry</title>
 63:     <style>
 64:         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
 65:         .container { max-width: 600px; margin: 0 auto; padding: 20px; }
 66:         .header { background-color: #2d7984; color: white; padding: 20px; text-align: center; }
 67:         .content { padding: 20px; background-color: #f9f9f9; }
 68:         .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
 69:         .highlight { background-color: #e8f4f8; padding: 15px; border-left: 4px solid #2d7984; margin: 15px 0; }
 70:         .button { display: inline-block; background-color: #2d7984; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 15px 0; }
 71:     </style>
 72: </head>
 73: <body>
 74:     <div class="container">
 75:         <div class="header">
 76:             <h1>Thank You for Your Inquiry!</h1>
 77:         </div>
 78:         <div class="content">
 79:             <p>Dear ${lead.first_name || 'Friend'},</p>
 80:             
 81:             <p>Thank you for reaching out to us regarding debt relief assistance. We have received your inquiry and wanted to confirm the details:</p>
 82:             
 83:             <div class="highlight">
 84:                 <strong>Your Submission Details:</strong><br>
 85:                 📞 <strong>Phone:</strong> ${formatPhone(lead.phone)}<br>
 86:                 💰 <strong>Debt Amount:</strong> ${debtAmountText}<br>
 87:                 📋 <strong>Debt Type:</strong> ${debtTypeText}<br>
 88:                 ${lead.email ? `📧 <strong>Email:</strong> ${lead.email}<br>` : ''}
 89:             </div>
 90:             
 91:             <h3>What Happens Next?</h3>
 92:             <p>Our certified debt relief specialists will review your information and contact you within 24 hours to discuss:</p>
 93:             <ul>
 94:                 <li>Your eligibility for debt relief programs</li>
 95:                 <li>Potential savings and payment options</li>
 96:                 <li>The best strategy for your unique situation</li>
 97:                 <li>Free consultation with no obligations</li>
 98:             </ul>
 99:             
100:             <p><strong>Important:</strong> Please keep your phone available as our specialists will be calling from various numbers to reach you.</p>
101:             
102:             <div class="highlight">
103:                 <p><strong>Have Questions?</strong> Call us directly at <strong>(555) 123-DEBT</strong> or reply to this email.</p>
104:             </div>
105:             
106:             <p>We're committed to helping you achieve financial freedom!</p>
107:             
108:             <p>Best regards,<br>
109:             The Debt Relief Team</p>
110:         </div>
111:         <div class="footer">
112:             <p>You received this email because you submitted a debt relief inquiry on our website.</p>
113:             <p>If you did not make this request, please ignore this email or contact us at support@your-domain.com</p>
114:         </div>
115:     </div>
116: </body>
117: </html>`;
118: }
119: 
120: function getInternalNotificationTemplate(lead: Lead): string {
121:     const debtAmountText = {
122:         '10000-15000': '$10,000 - $15,000',
123:         '15000-25000': '$15,000 - $25,000', 
124:         '25000-50000': '$25,000 - $50,000',
125:         '50000+': '$50,000+'
126:     }[lead.debt_amount];
127: 
128:     const debtTypeText = {
129:         'credit-cards': 'Credit Cards',
130:         'personal-loans': 'Personal Loans',
131:         'medical': 'Medical Debt',
132:         'mixed': 'Mixed Debt Types'
133:     }[lead.debt_type];
134: 
135:     return `
136: <!DOCTYPE html>
137: <html>
138: <head>
139:     <meta charset="utf-8">
140:     <meta name="viewport" content="width=device-width, initial-scale=1.0">
141:     <title>New Debt Relief Lead</title>
142:     <style>
143:         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
144:         .container { max-width: 600px; margin: 0 auto; padding: 20px; }
145:         .header { background-color: #0062b3; color: white; padding: 20px; text-align: center; }
146:         .content { padding: 20px; background-color: #f9f9f9; }
147:         .lead-details { background-color: white; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
148:         .priority { background-color: #ff6b6b; color: white; padding: 5px 10px; border-radius: 3px; display: inline-block; }
149:         .actions { margin-top: 20px; padding: 15px; background-color: #e8f5e8; border-radius: 5px; }
150:     </style>
151: </head>
152: <body>
153:     <div class="container">
154:         <div class="header">
155:             <h1>🚨 New Debt Relief Lead</h1>
156:             <p>Lead ID: ${lead.id || 'Pending'}</p>
157:         </div>
158:         <div class="content">
159:             <div class="lead-details">
160:                 <h3>Lead Information</h3>
161:                 <table style="width: 100%; border-collapse: collapse;">
162:                     <tr style="border-bottom: 1px solid #eee;">
163:                         <td style="padding: 8px; font-weight: bold;">Name:</td>
164:                         <td style="padding: 8px;">${lead.first_name || 'Not provided'} ${lead.last_name || ''}</td>
165:                     </tr>
166:                     <tr style="border-bottom: 1px solid #eee;">
167:                         <td style="padding: 8px; font-weight: bold;">Phone:</td>
168:                         <td style="padding: 8px;"><strong>${formatPhone(lead.phone)}</strong></td>
169:                     </tr>
170:                     <tr style="border-bottom: 1px solid #eee;">
171:                         <td style="padding: 8px; font-weight: bold;">Email:</td>
172:                         <td style="padding: 8px;">${lead.email || 'Not provided'}</td>
173:                     </tr>
174:                     <tr style="border-bottom: 1px solid #eee;">
175:                         <td style="padding: 8px; font-weight: bold;">Debt Amount:</td>
176:                         <td style="padding: 8px;"><span class="priority">${debtAmountText}</span></td>
177:                     </tr>
178:                     <tr style="border-bottom: 1px solid #eee;">
179:                         <td style="padding: 8px; font-weight: bold;">Debt Type:</td>
180:                         <td style="padding: 8px;">${debtTypeText}</td>
181:                     </tr>
182:                     <tr style="border-bottom: 1px solid #eee;">
183:                         <td style="padding: 8px; font-weight: bold;">Source:</td>
184:                         <td style="padding: 8px;">${lead.source || 'qualification-form'}</td>
185:                     </tr>
186:                     <tr style="border-bottom: 1px solid #eee;">
187:                         <td style="padding: 8px; font-weight: bold;">IP Address:</td>
188:                         <td style="padding: 8px;">${lead.ip_address || 'Unknown'}</td>
189:                     </tr>
190:                     <tr style="border-bottom: 1px solid #eee;">
191:                         <td style="padding: 8px; font-weight: bold;">Submission Time:</td>
192:                         <td style="padding: 8px;">${new Date().toLocaleString()}</td>
193:                     </tr>
194:                     <tr>
195:                         <td style="padding: 8px; font-weight: bold;">Marketing Consent:</td>
196:                         <td style="padding: 8px;">${lead.consent_marketing ? '✅ Yes' : '❌ No'}</td>
197:                     </tr>
198:                 </table>
199:                 
200:                 ${lead.notes ? `
201:                 <h4>Additional Notes:</h4>
202:                 <p style="background-color: #f0f0f0; padding: 10px; border-radius: 3px;">${lead.notes}</p>
203:                 ` : ''}
204:             </div>
205:             
206:             <div class="actions">
207:                 <h3>📞 Next Actions Required:</h3>
208:                 <ul>
209:                     <li><strong>Call within 24 hours</strong> for best conversion rates</li>
210:                     <li>Update lead status in CRM system</li>
211:                     <li>Follow qualification script for debt amount range</li>
212:                     <li>Document call outcome and next steps</li>
213:                 </ul>
214:             </div>
215:         </div>
216:     </div>
217: </body>
218: </html>`;
219: }
220: 
221: // Helper function to format phone numbers
222: function formatPhone(phone: string): string {
223:     const cleaned = phone.replace(/\D/g, '');
224:     if (cleaned.length === 10) {
225:         return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
226:     }
227:     return phone;
228: }
229: 
230: // GDPR Email Templates
231: function getGDPRDeletionConfirmationTemplate(email: string, phone?: string, deletedCount: number = 0): string {
232:     return `
233: <!DOCTYPE html>
234: <html>
235: <head>
236:     <meta charset="utf-8">
237:     <meta name="viewport" content="width=device-width, initial-scale=1.0">
238:     <title>Data Deletion Confirmation</title>
239:     <style>
240:         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
241:         .container { max-width: 600px; margin: 0 auto; padding: 20px; }
242:         .header { background-color: #2d7984; color: white; padding: 20px; text-align: center; }
243:         .content { padding: 20px; background-color: #f9f9f9; }
244:         .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
245:         .highlight { background-color: #e8f4f8; padding: 15px; border-left: 4px solid #2d7984; margin: 15px 0; }
246:         .warning { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 15px 0; }
247:     </style>
248: </head>
249: <body>
250:     <div class="container">
251:         <div class="header">
252:             <h1>✅ Data Deletion Confirmed</h1>
253:         </div>
254:         <div class="content">
255:             <p>This email confirms that we have processed your data deletion request under GDPR Article 17 (Right to be Forgotten).</p>
256:             
257:             <div class="highlight">
258:                 <strong>Deletion Summary:</strong><br>
259:                 📧 <strong>Email:</strong> ${email}<br>
260:                 ${phone ? `📞 <strong>Phone:</strong> ${formatPhone(phone)}<br>` : ''}
261:                 🗑️ <strong>Records Deleted:</strong> ${deletedCount}<br>
262:                 📅 <strong>Deletion Date:</strong> ${new Date().toLocaleString()}<br>
263:             </div>
264:             
265:             <h3>What Was Deleted</h3>
266:             <p>The following personal data has been permanently removed from our systems:</p>
267:             <ul>
268:                 <li>All lead generation records associated with your information</li>
269:                 <li>Contact information (name, email, phone number)</li>
270:                 <li>Debt information and preferences</li>
271:                 <li>Marketing consent records</li>
272:                 <li>Communication history</li>
273:             </ul>
274:             
275:             <div class="warning">
276:                 <strong>⚠️ Important:</strong> This action is irreversible. All data associated with your request has been permanently deleted and cannot be recovered.
277:             </div>
278:             
279:             <h3>Your Privacy Rights</h3>
280:             <p>This deletion was processed in accordance with:</p>
281:             <ul>
282:                 <li>GDPR Article 17 - Right to erasure ('right to be forgotten')</li>
283:                 <li>Our Privacy Policy terms</li>
284:                 <li>Applicable data protection regulations</li>
285:             </ul>
286:             
287:             <h3>Questions or Concerns?</h3>
288:             <p>If you have any questions about this deletion or your privacy rights, please contact us:</p>
289:             <p>📧 Email: privacy@your-domain.com<br>
290:             📞 Phone: (555) 123-DEBT</p>
291:             
292:             <p>Thank you for using our services.</p>
293:             
294:             <p>Best regards,<br>
295:             Data Protection Officer<br>
296:             Debt Freedom Toolkit</p>
297:         </div>
298:         <div class="footer">
299:             <p>This is an automated confirmation of your GDPR data deletion request.</p>
300:             <p>Request processed on ${new Date().toLocaleString()}</p>
301:         </div>
302:     </div>
303: </body>
304: </html>`;
305: }
306: 
307: function getGDPRExportDeliveryTemplate(email: string, phone?: string, recordCount: number = 0): string {
308:     return `
309: <!DOCTYPE html>
310: <html>
311: <head>
312:     <meta charset="utf-8">
313:     <meta name="viewport" content="width=device-width, initial-scale=1.0">
314:     <title>Your Data Export is Ready</title>
315:     <style>
316:         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
317:         .container { max-width: 600px; margin: 0 auto; padding: 20px; }
318:         .header { background-color: #2d7984; color: white; padding: 20px; text-align: center; }
319:         .content { padding: 20px; background-color: #f9f9f9; }
320:         .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
321:         .highlight { background-color: #e8f4f8; padding: 15px; border-left: 4px solid #2d7984; margin: 15px 0; }
322:         .info { background-color: #d1ecf1; border-left: 4px solid #0c5460; padding: 15px; margin: 15px 0; }
323:     </style>
324: </head>
325: <body>
326:     <div class="container">
327:         <div class="header">
328:             <h1>📊 Your Data Export</h1>
329:         </div>
330:         <div class="content">
331:             <p>We have successfully processed your data export request under GDPR Article 15 (Right of access).</p>
332:             
333:             <div class="highlight">
334:                 <strong>Export Summary:</strong><br>
335:                 📧 <strong>Email:</strong> ${email}<br>
336:                 ${phone ? `📞 <strong>Phone:</strong> ${formatPhone(phone)}<br>` : ''}
337:                 📦 <strong>Records Found:</strong> ${recordCount}<br>
338:                 📅 <strong>Export Date:</strong> ${new Date().toLocaleString()}<br>
339:             </div>
340:             
341:             <h3>What's Included</h3>
342:             <p>Your data export contains all personal information we have on file, including:</p>
343:             <ul>
344:                 <li>Contact information (name, email, phone)</li>
345:                 <li>Debt relief inquiry details</li>
346:                 <li>Marketing consent preferences</li>
347:                 <li>Submission dates and sources</li>
348:                 <li>Communication history</li>
349:             </ul>
350:             
351:             <div class="info">
352:                 <strong>🔒 Privacy Protection:</strong> For security reasons, sensitive information like IP addresses and detailed user agent data are excluded from exports.
353:             </div>
354:             
355:             <h3>Data Format</h3>
356:             <p>Your data has been exported in JSON format, which is machine-readable and can be:</p>
357:             <ul>
358:                 <li>Opened in text editors</li>
359:                 <li>Imported into other systems</li>
360:                 <li>Processed programmatically</li>
361:                 <li>Converted to other formats as needed</li>
362:             </ul>
363:             
364:             <h3>Your Privacy Rights</h3>
365:             <p>This export was provided in accordance with:</p>
366:             <ul>
367:                 <li>GDPR Article 15 - Right of access</li>
368:                 <li>GDPR Article 20 - Right to data portability</li>
369:                 <li>Our Privacy Policy commitments</li>
370:             </ul>
371:             
372:             <h3>Questions or Need Help?</h3>
373:             <p>If you have questions about your data or need assistance with the export format:</p>
374:             <p>📧 Email: privacy@your-domain.com<br>
375:             📞 Phone: (555) 123-DEBT</p>
376:             
377:             <p>Best regards,<br>
378:             Data Protection Officer<br>
379:             Debt Freedom Toolkit</p>
380:         </div>
381:         <div class="footer">
382:             <p>This export was generated in response to your GDPR data access request.</p>
383:             <p>Export generated on ${new Date().toLocaleString()}</p>
384:         </div>
385:     </div>
386: </body>
387: </html>`;
388: }
389: 
390: // Track email usage in database
391: async function trackEmailUsage(type: 'user_confirmation' | 'internal_notification' | 'gdpr_deletion' | 'gdpr_export', leadId?: string): Promise<void> {
392:     try {
393:         await supabaseAdmin
394:             .from('email_usage')
395:             .insert({
396:                 email_type: type,
397:                 lead_id: leadId,
398:                 sent_at: new Date().toISOString(),
399:                 month_year: new Date().toISOString().substring(0, 7) // Format: 2025-01
400:             });
401:     } catch (error) {
402:         console.error('Failed to track email usage:', error);
403:         // Don't throw error - tracking failure shouldn't break email sending
404:     }
405: }
406: 
407: // Get current month's email usage statistics
408: export async function getEmailUsageStats(): Promise<EmailUsageStats | null> {
409:     try {
410:         const currentMonth = new Date().toISOString().substring(0, 7);
411:         
412:         const { data, error } = await supabaseAdmin
413:             .from('email_usage')
414:             .select('*')
415:             .eq('month_year', currentMonth);
416:             
417:         if (error) {
418:             console.error('Failed to fetch email usage stats:', error);
419:             return null;
420:         }
421:         
422:         const emailsSent = data?.length || 0;
423:         const remainingEmails = Math.max(0, FREE_TIER_LIMIT - emailsSent);
424:         const percentageUsed = (emailsSent / FREE_TIER_LIMIT) * 100;
425:         
426:         return {
427:             currentMonth,
428:             emailsSent,
429:             remainingEmails,
430:             percentageUsed,
431:             isNearLimit: percentageUsed >= (USAGE_WARNING_THRESHOLD * 100),
432:             isCritical: percentageUsed >= (USAGE_CRITICAL_THRESHOLD * 100)
433:         };
434:     } catch (error) {
435:         console.error('Failed to calculate email usage stats:', error);
436:         return null;
437:     }
438: }
439: 
440: // Check if we can send emails (within limits)
441: export async function checkEmailLimits(): Promise<{ canSend: boolean; reason?: string }> {
442:     const stats = await getEmailUsageStats();
443:     
444:     if (!stats) {
445:         // If we can't check stats, allow sending but log warning
446:         console.warn('Unable to check email usage limits - allowing send');
447:         return { canSend: true };
448:     }
449:     
450:     if (stats.emailsSent >= FREE_TIER_LIMIT) {
451:         return { 
452:             canSend: false, 
453:             reason: `Monthly email limit reached (${FREE_TIER_LIMIT} emails)` 
454:         };
455:     }
456:     
457:     if (stats.isCritical) {
458:         console.warn(`Email usage is at ${stats.percentageUsed.toFixed(1)}% of free tier limit`);
459:     }
460:     
461:     return { canSend: true };
462: }
463: 
464: // Send user confirmation email
465: export async function sendUserConfirmationEmail(lead: Lead): Promise<EmailResult> {
466:     try {
467:         // Check limits before sending
468:         const limitCheck = await checkEmailLimits();
469:         if (!limitCheck.canSend) {
470:             return {
471:                 success: false,
472:                 error: limitCheck.reason
473:             };
474:         }
475:         
476:         if (!lead.email) {
477:             return {
478:                 success: false,
479:                 error: 'No email address provided for user confirmation'
480:             };
481:         }
482:         
483:         const { data, error } = await resend.emails.send({
484:             from: FROM_EMAIL,
485:             to: [lead.email],
486:             subject: 'Thank You for Your Debt Relief Inquiry - We\'ll Contact You Soon!',
487:             html: getUserConfirmationTemplate(lead)
488:         });
489:         
490:         if (error) {
491:             console.error('Resend API error (user confirmation):', error);
492:             return {
493:                 success: false,
494:                 error: error.message
495:             };
496:         }
497:         
498:         // Track successful email send
499:         await trackEmailUsage('user_confirmation', lead.id);
500:         
501:         return {
502:             success: true,
503:             messageId: data?.id
504:         };
505:         
506:     } catch (error) {
507:         console.error('Failed to send user confirmation email:', error);
508:         return {
509:             success: false,
510:             error: error instanceof Error ? error.message : 'Unknown email error'
511:         };
512:     }
513: }
514: 
515: // Send internal notification email
516: export async function sendInternalNotificationEmail(lead: Lead): Promise<EmailResult> {
517:     try {
518:         // Check limits before sending
519:         const limitCheck = await checkEmailLimits();
520:         if (!limitCheck.canSend) {
521:             return {
522:                 success: false,
523:                 error: limitCheck.reason
524:             };
525:         }
526:         
527:         const { data, error } = await resend.emails.send({
528:             from: FROM_EMAIL,
529:             to: [INTERNAL_EMAIL],
530:             subject: `🚨 New Debt Relief Lead: ${formatPhone(lead.phone)} - ${lead.debt_amount}`,
531:             html: getInternalNotificationTemplate(lead)
532:         });
533:         
534:         if (error) {
535:             console.error('Resend API error (internal notification):', error);
536:             return {
537:                 success: false,
538:                 error: error.message
539:             };
540:         }
541:         
542:         // Track successful email send
543:         await trackEmailUsage('internal_notification', lead.id);
544:         
545:         return {
546:             success: true,
547:             messageId: data?.id
548:         };
549:         
550:     } catch (error) {
551:         console.error('Failed to send internal notification email:', error);
552:         return {
553:             success: false,
554:             error: error instanceof Error ? error.message : 'Unknown email error'
555:         };
556:     }
557: }
558: 
559: // Send both confirmation and notification emails
560: export async function sendLeadEmails(lead: Lead): Promise<{
561:     userConfirmation: EmailResult;
562:     internalNotification: EmailResult;
563: }> {
564:     const [userConfirmation, internalNotification] = await Promise.all([
565:         lead.email ? sendUserConfirmationEmail(lead) : { success: true, messageId: 'skipped-no-email' },
566:         sendInternalNotificationEmail(lead)
567:     ]);
568:     
569:     return {
570:         userConfirmation,
571:         internalNotification
572:     };
573: }
574: 
575: // Send usage alerts to development team
576: export async function sendUsageAlerts(): Promise<void> {
577:     const stats = await getEmailUsageStats();
578:     
579:     if (!stats || (!stats.isNearLimit && !stats.isCritical)) {
580:         return; // No alerts needed
581:     }
582:     
583:     const alertLevel = stats.isCritical ? 'CRITICAL' : 'WARNING';
584:     const subject = `🚨 ${alertLevel}: Resend Email Usage at ${stats.percentageUsed.toFixed(1)}%`;
585:     
586:     const alertTemplate = `
587: <!DOCTYPE html>
588: <html>
589: <head>
590:     <meta charset="utf-8">
591:     <title>Email Usage Alert</title>
592: </head>
593: <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
594:     <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
595:         <div style="background-color: ${stats.isCritical ? '#ff4444' : '#ff9900'}; color: white; padding: 20px; text-align: center;">
596:             <h1>${alertLevel}: Email Usage Alert</h1>
597:         </div>
598:         <div style="padding: 20px; background-color: #f9f9f9;">
599:             <h3>Email Usage Statistics for ${stats.currentMonth}</h3>
600:             <ul>
601:                 <li><strong>Emails Sent:</strong> ${stats.emailsSent} / ${FREE_TIER_LIMIT}</li>
602:                 <li><strong>Remaining:</strong> ${stats.remainingEmails}</li>
603:                 <li><strong>Usage:</strong> ${stats.percentageUsed.toFixed(1)}%</li>
604:             </ul>
605:             
606:             <h3>Recommended Actions:</h3>
607:             <ul>
608:                 ${stats.isCritical ? 
609:                     '<li><strong>URGENT:</strong> Consider upgrading Resend plan or reducing email sends</li>' :
610:                     '<li>Monitor usage closely and plan for potential upgrade</li>'
611:                 }
612:                 <li>Review email sending patterns and optimize if possible</li>
613:                 <li>Consider implementing email batching for non-critical notifications</li>
614:             </ul>
615:         </div>
616:     </div>
617: </body>
618: </html>`;
619:     
620:     try {
621:         // Send alert to development team (using same internal email for now)
622:         await resend.emails.send({
623:             from: FROM_EMAIL,
624:             to: [INTERNAL_EMAIL],
625:             subject,
626:             html: alertTemplate
627:         });
628:         
629:         console.log(`Email usage alert sent: ${alertLevel} at ${stats.percentageUsed.toFixed(1)}%`);
630:     } catch (error) {
631:         console.error('Failed to send usage alert:', error);
632:     }
633: }
634: 
635: // GDPR Email Functions
636: 
637: // Send GDPR data deletion confirmation email
638: export async function sendGDPRDeletionConfirmationEmail(
639:     email: string, 
640:     phone?: string, 
641:     deletedCount: number = 0
642: ): Promise<EmailResult> {
643:     try {
644:         // Check limits before sending
645:         const limitCheck = await checkEmailLimits();
646:         if (!limitCheck.canSend) {
647:             return {
648:                 success: false,
649:                 error: limitCheck.reason
650:             };
651:         }
652:         
653:         const { data, error } = await resend.emails.send({
654:             from: FROM_EMAIL,
655:             to: [email],
656:             subject: 'Data Deletion Confirmation - Your Request Has Been Processed',
657:             html: getGDPRDeletionConfirmationTemplate(email, phone, deletedCount)
658:         });
659:         
660:         if (error) {
661:             console.error('Resend API error (GDPR deletion confirmation):', error);
662:             return {
663:                 success: false,
664:                 error: error.message
665:             };
666:         }
667:         
668:         // Track successful email send
669:         await trackEmailUsage('gdpr_deletion');
670:         
671:         return {
672:             success: true,
673:             messageId: data?.id
674:         };
675:         
676:     } catch (error) {
677:         console.error('Failed to send GDPR deletion confirmation email:', error);
678:         return {
679:             success: false,
680:             error: error instanceof Error ? error.message : 'Unknown email error'
681:         };
682:     }
683: }
684: 
685: // Send GDPR data export delivery email  
686: export async function sendGDPRExportDeliveryEmail(
687:     email: string, 
688:     phone?: string, 
689:     recordCount: number = 0
690: ): Promise<EmailResult> {
691:     try {
692:         // Check limits before sending
693:         const limitCheck = await checkEmailLimits();
694:         if (!limitCheck.canSend) {
695:             return {
696:                 success: false,
697:                 error: limitCheck.reason
698:             };
699:         }
700:         
701:         const { data, error } = await resend.emails.send({
702:             from: FROM_EMAIL,
703:             to: [email],
704:             subject: 'Your Data Export is Ready - GDPR Request Completed',
705:             html: getGDPRExportDeliveryTemplate(email, phone, recordCount)
706:         });
707:         
708:         if (error) {
709:             console.error('Resend API error (GDPR export delivery):', error);
710:             return {
711:                 success: false,
712:                 error: error.message
713:             };
714:         }
715:         
716:         // Track successful email send
717:         await trackEmailUsage('gdpr_export');
718:         
719:         return {
720:             success: true,
721:             messageId: data?.id
722:         };
723:         
724:     } catch (error) {
725:         console.error('Failed to send GDPR export delivery email:', error);
726:         return {
727:             success: false,
728:             error: error instanceof Error ? error.message : 'Unknown email error'
729:         };
730:     }
731: }
```

## File: src/utils/validation.ts
```typescript
  1: // Validation schemas for debt relief lead submission
  2: // Using Zod for runtime validation with TypeScript integration and XSS prevention
  3: 
  4: import { z } from 'zod';
  5: 
  6: // XSS prevention patterns
  7: const XSS_PATTERNS = [
  8:     /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
  9:     /<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi,
 10:     /<object[\s\S]*?>[\s\S]*?<\/object>/gi,
 11:     /<embed[\s\S]*?>/gi,
 12:     /<link[\s\S]*?>/gi,
 13:     /<meta[\s\S]*?>/gi,
 14:     /javascript:/gi,
 15:     /vbscript:/gi,
 16:     /data:text\/html/gi,
 17:     /on\w+\s*=/gi,
 18:     /<style[\s\S]*?>[\s\S]*?<\/style>/gi
 19: ];
 20: 
 21: // SQL injection patterns
 22: const SQL_INJECTION_PATTERNS = [
 23:     /(\s*(union|select|insert|update|delete|drop|create|alter|exec|execute)\s+)/gi,
 24:     /(\s*(and|or)\s+\w+\s*=\s*\w+)/gi,
 25:     /('\s*(or|and)\s*')/gi,
 26:     /(--\s*)/g,
 27:     /\/\*[\s\S]*?\*\//g
 28: ];
 29: 
 30: // Custom string validation with XSS and injection prevention
 31: const secureString = (maxLength: number = 255) => 
 32:     z.string()
 33:         .max(maxLength, `Text must be less than ${maxLength} characters`)
 34:         .refine(
 35:             (val) => !XSS_PATTERNS.some(pattern => pattern.test(val)),
 36:             { message: 'Input contains potentially harmful content' }
 37:         )
 38:         .refine(
 39:             (val) => !SQL_INJECTION_PATTERNS.some(pattern => pattern.test(val)),
 40:             { message: 'Input contains potentially harmful content' }
 41:         )
 42:         .transform(val => val.trim());
 43: 
 44: // Enhanced email validation with additional security checks
 45: const secureEmail = z.string()
 46:     .email('Please enter a valid email address')
 47:     .max(100, 'Email must be less than 100 characters')
 48:     .refine(
 49:         (email) => {
 50:             // Additional email security checks
 51:             const domain = email.split('@')[1];
 52:             if (!domain) return false;
 53:             
 54:             // Check for suspicious domains or patterns
 55:             const suspiciousDomains = ['tempmail', 'throwaway', 'guerrillamail', '10minutemail'];
 56:             const isSuspicious = suspiciousDomains.some(suspicious => 
 57:                 domain.toLowerCase().includes(suspicious)
 58:             );
 59:             
 60:             // Allow but log suspicious domains (don't block legitimate users)
 61:             if (isSuspicious) {
 62:                 console.warn(`Potentially suspicious email domain: ${domain}`);
 63:             }
 64:             
 65:             return true;
 66:         },
 67:         { message: 'Email address format is not supported' }
 68:     )
 69:     .transform(email => email.toLowerCase().trim());
 70: 
 71: // Enhanced phone validation with additional security
 72: const securePhone = z.string()
 73:     .transform(val => val.replace(/\D/g, '')) // Strip formatting first
 74:     .refine(
 75:         (phone) => /^[0-9]{10}$/.test(phone),
 76:         { message: 'Phone number must be exactly 10 digits' }
 77:     )
 78:     .refine(
 79:         (phone) => {
 80:             // Check for obviously fake numbers
 81:             const fakePatterns = [
 82:                 /^0{10}$/, // All zeros
 83:                 /^1{10}$/, // All ones
 84:                 /^(\d)\1{9}$/, // All same digit
 85:                 /^1234567890$/, // Sequential
 86:                 /^5555555555$/ // Common test number
 87:             ];
 88:             
 89:             const isFake = fakePatterns.some(pattern => pattern.test(phone));
 90:             if (isFake) {
 91:                 console.warn(`Potentially fake phone number pattern detected`);
 92:             }
 93:             
 94:             return true; // Allow but log for review
 95:         },
 96:         { message: 'Phone number format appears invalid' }
 97:     );
 98: 
 99: // Enhanced lead submission validation schema with security measures
100: export const leadSubmissionSchema = z.object({
101:     // Required form fields from qualification form
102:     debtAmount: z.enum(['10000-15000', '15000-25000', '25000-50000', '50000+'], {
103:         required_error: 'Please select your debt amount',
104:         invalid_type_error: 'Invalid debt amount selection'
105:     }),
106:     
107:     debtType: z.enum(['credit-cards', 'personal-loans', 'medical', 'mixed'], {
108:         required_error: 'Please select your debt type',
109:         invalid_type_error: 'Invalid debt type selection'
110:     }),
111:     
112:     phone: securePhone,
113:     
114:     // Optional contact fields (for enhanced forms) with security validation
115:     firstName: secureString(50)
116:         .min(1, 'First name is required')
117:         .optional(),
118:         
119:     lastName: secureString(50)
120:         .min(1, 'Last name is required')
121:         .optional(),
122:         
123:     email: secureEmail
124:         .optional()
125:         .or(z.literal('')), // Allow empty string
126:     
127:     // GDPR compliance fields
128:     consentProcessing: z.boolean()
129:         .refine(val => val === true, {
130:             message: 'You must consent to data processing to submit this form'
131:         }),
132:         
133:     consentMarketing: z.boolean()
134:         .default(false),
135:     
136:     // Optional metadata with security validation
137:     source: secureString(50)
138:         .default('qualification-form')
139:         .optional(),
140:         
141:     notes: secureString(1000)
142:         .optional(),
143:     
144:     // Honeypot fields for bot detection (should be empty)
145:     website: z.string()
146:         .max(0, 'This field should be empty')
147:         .optional()
148:         .or(z.literal('')),
149:     
150:     address2: z.string()
151:         .max(0, 'This field should be empty')
152:         .optional()
153:         .or(z.literal('')),
154:     
155:     fax: z.string()
156:         .max(0, 'This field should be empty')
157:         .optional()
158:         .or(z.literal(''))
159: });
160: 
161: // Type inference from the schema
162: export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;
163: 
164: // Response schemas for API endpoints
165: export const leadResponseSchema = z.object({
166:     success: z.boolean(),
167:     message: z.string(),
168:     leadId: z.string().uuid().optional(),
169:     errors: z.record(z.string()).optional()
170: });
171: 
172: export type LeadResponse = z.infer<typeof leadResponseSchema>;
173: 
174: // Rate limit response schema
175: export const rateLimitResponseSchema = z.object({
176:     success: z.boolean(),
177:     message: z.string(),
178:     retryAfter: z.number().optional() // seconds until rate limit resets
179: });
180: 
181: export type RateLimitResponse = z.infer<typeof rateLimitResponseSchema>;
182: 
183: // Database health check schema
184: export const healthCheckSchema = z.object({
185:     success: z.boolean(),
186:     database: z.object({
187:         connected: z.boolean(),
188:         size: z.string(),
189:         sizeBytes: z.number(),
190:         freeTierStatus: z.string(),
191:         percentUsed: z.number()
192:     }).optional(),
193:     timestamp: z.string().datetime()
194: });
195: 
196: export type HealthCheck = z.infer<typeof healthCheckSchema>;
197: 
198: // GDPR data export schema
199: export const dataExportRequestSchema = z.object({
200:     email: z.string()
201:         .email('Please provide a valid email address')
202:         .optional(),
203:     phone: z.string()
204:         .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
205:         .optional()
206: }).refine(
207:     data => data.email || data.phone,
208:     {
209:         message: 'Either email or phone number must be provided',
210:         path: ['email'] // Show error on email field
211:     }
212: );
213: 
214: export type DataExportRequest = z.infer<typeof dataExportRequestSchema>;
215: 
216: // Data deletion request schema (GDPR Right to be Forgotten)
217: export const dataDeletionRequestSchema = z.object({
218:     email: z.string()
219:         .email('Please provide a valid email address')
220:         .optional(),
221:     phone: z.string()
222:         .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
223:         .optional(),
224:     confirmDeletion: z.boolean()
225:         .refine(val => val === true, {
226:             message: 'You must confirm the deletion request'
227:         })
228: }).refine(
229:     data => data.email || data.phone,
230:     {
231:         message: 'Either email or phone number must be provided',
232:         path: ['email']
233:     }
234: );
235: 
236: export type DataDeletionRequest = z.infer<typeof dataDeletionRequestSchema>;
237: 
238: // Validation helper functions
239: export function validateLeadSubmission(data: unknown): {
240:     success: boolean;
241:     data?: LeadSubmission;
242:     errors?: Record<string, string>;
243: } {
244:     try {
245:         const validated = leadSubmissionSchema.parse(data);
246:         return { success: true, data: validated };
247:     } catch (error) {
248:         if (error instanceof z.ZodError) {
249:             const errors: Record<string, string> = {};
250:             error.errors.forEach(err => {
251:                 const path = err.path.join('.');
252:                 errors[path] = err.message;
253:             });
254:             return { success: false, errors };
255:         }
256:         return { 
257:             success: false, 
258:             errors: { general: 'Validation failed' } 
259:         };
260:     }
261: }
262: 
263: // Phone number formatting utility
264: export function formatPhoneForDisplay(phone: string): string {
265:     const cleaned = phone.replace(/\D/g, '');
266:     if (cleaned.length === 10) {
267:         return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
268:     }
269:     return phone;
270: }
271: 
272: // Phone number cleaning utility (remove all formatting)
273: export function cleanPhoneNumber(phone: string): string {
274:     return phone.replace(/\D/g, '');
275: }
276: 
277: // Email validation utility
278: export function isValidEmail(email: string): boolean {
279:     try {
280:         z.string().email().parse(email);
281:         return true;
282:     } catch {
283:         return false;
284:     }
285: }
286: 
287: // Additional security validation schemas for API endpoints
288: 
289: // Enhanced CSRF request validation
290: export const csrfValidationSchema = z.object({
291:     csrfToken: z.string()
292:         .min(16, 'CSRF token is required')
293:         .max(64, 'CSRF token format is invalid')
294:         .regex(/^[a-zA-Z0-9]+$/, 'CSRF token contains invalid characters'),
295:     sessionId: z.string()
296:         .min(16, 'Session ID is required')
297:         .max(64, 'Session ID format is invalid')
298:         .regex(/^[a-zA-Z0-9/+=]+$/, 'Session ID contains invalid characters')
299: });
300: 
301: // Request metadata validation
302: export const requestMetadataSchema = z.object({
303:     timestamp: z.string()
304:         .datetime('Invalid timestamp format')
305:         .optional()
306:         .refine(
307:             (timestamp) => {
308:                 if (!timestamp) return true;
309:                 const requestTime = new Date(timestamp).getTime();
310:                 const now = Date.now();
311:                 const tenMinutes = 10 * 60 * 1000;
312:                 return (now - requestTime) < tenMinutes;
313:             },
314:             { message: 'Request is too old and may be replayed' }
315:         ),
316:     userAgent: z.string()
317:         .max(500, 'User agent string is too long')
318:         .optional(),
319:     referrer: z.string()
320:         .url('Invalid referrer URL')
321:         .optional()
322: });
323: 
324: // Enhanced file upload validation (for future use)
325: export const fileUploadSchema = z.object({
326:     filename: z.string()
327:         .min(1, 'Filename is required')
328:         .max(255, 'Filename is too long')
329:         .refine(
330:             (filename) => {
331:                 // Check for dangerous file extensions
332:                 const dangerousExtensions = [
333:                     '.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js', 
334:                     '.jar', '.php', '.asp', '.jsp', '.sh', '.py', '.pl', '.rb'
335:                 ];
336:                 const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
337:                 return !dangerousExtensions.includes(extension);
338:             },
339:             { message: 'File type is not allowed' }
340:         )
341:         .refine(
342:             (filename) => !filename.includes('..'),
343:             { message: 'Filename contains invalid path characters' }
344:         ),
345:     mimeType: z.string()
346:         .refine(
347:             (mimeType) => {
348:                 const allowedTypes = [
349:                     'image/jpeg', 'image/png', 'image/gif', 'image/webp',
350:                     'application/pdf', 'text/plain', 'text/csv'
351:                 ];
352:                 return allowedTypes.includes(mimeType);
353:             },
354:             { message: 'File type is not supported' }
355:         ),
356:     size: z.number()
357:         .int()
358:         .min(1, 'File is empty')
359:         .max(5 * 1024 * 1024, 'File size exceeds 5MB limit') // 5MB limit
360: });
361: 
362: // API key validation (for future authentication)
363: export const apiKeySchema = z.string()
364:     .min(32, 'API key is too short')
365:     .max(128, 'API key is too long')
366:     .regex(/^[a-zA-Z0-9_-]+$/, 'API key contains invalid characters');
367: 
368: // Webhook signature validation
369: export const webhookValidationSchema = z.object({
370:     signature: z.string()
371:         .min(10, 'Webhook signature is required')
372:         .max(256, 'Webhook signature is too long'),
373:     timestamp: z.string()
374:         .datetime('Invalid webhook timestamp')
375:         .refine(
376:             (timestamp) => {
377:                 const webhookTime = new Date(timestamp).getTime();
378:                 const now = Date.now();
379:                 const fiveMinutes = 5 * 60 * 1000;
380:                 // Webhook should not be older than 5 minutes
381:                 return (now - webhookTime) < fiveMinutes;
382:             },
383:             { message: 'Webhook timestamp is too old' }
384:         ),
385:     event: z.string()
386:         .min(1, 'Webhook event type is required')
387:         .max(100, 'Webhook event type is too long')
388:         .regex(/^[a-zA-Z0-9._-]+$/, 'Invalid webhook event type format')
389: });
390: 
391: // IP address validation
392: export const ipAddressSchema = z.string()
393:     .refine(
394:         (ip) => {
395:             // IPv4 validation
396:             const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
397:             // IPv6 validation (basic)
398:             const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
399:             return ipv4Regex.test(ip) || ipv6Regex.test(ip) || ip === '127.0.0.1';
400:         },
401:         { message: 'Invalid IP address format' }
402:     );
403: 
404: // Enhanced security validation function for API requests
405: export function validateSecurityContext(request: Request): {
406:     success: boolean;
407:     issues: string[];
408:     riskLevel: 'low' | 'medium' | 'high';
409: } {
410:     const issues: string[] = [];
411:     let riskLevel: 'low' | 'medium' | 'high' = 'low';
412: 
413:     // Check user agent
414:     const userAgent = request.headers.get('user-agent') || '';
415:     if (!userAgent) {
416:         issues.push('Missing user agent');
417:         riskLevel = 'medium';
418:     } else if (userAgent.length < 20) {
419:         issues.push('Suspicious user agent');
420:         riskLevel = 'medium';
421:     }
422: 
423:     // Check for bot patterns
424:     const botPatterns = [
425:         /bot/i, /crawler/i, /spider/i, /scraper/i, /curl/i, 
426:         /wget/i, /python/i, /postman/i, /insomnia/i
427:     ];
428:     
429:     if (botPatterns.some(pattern => pattern.test(userAgent))) {
430:         issues.push('Bot-like user agent detected');
431:         riskLevel = 'high';
432:     }
433: 
434:     // Check referer for reasonable origin
435:     const referer = request.headers.get('referer');
436:     const origin = request.headers.get('origin');
437:     
438:     if (request.method === 'POST' && !referer && !origin) {
439:         issues.push('Missing referer and origin headers');
440:         riskLevel = 'medium';
441:     }
442: 
443:     // Check for common attack headers
444:     const suspiciousHeaders = ['x-forwarded-host', 'x-original-url', 'x-rewrite-url'];
445:     for (const header of suspiciousHeaders) {
446:         if (request.headers.get(header)) {
447:             issues.push(`Suspicious header detected: ${header}`);
448:             riskLevel = 'high';
449:         }
450:     }
451: 
452:     // Check content length for reasonable size
453:     const contentLength = request.headers.get('content-length');
454:     if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) { // 10MB
455:         issues.push('Unusually large request body');
456:         riskLevel = 'high';
457:     }
458: 
459:     return {
460:         success: issues.length === 0,
461:         issues,
462:         riskLevel
463:     };
464: }
465: 
466: // Validation error formatter
467: export function formatValidationErrors(errors: z.ZodError): Record<string, string> {
468:     const formatted: Record<string, string> = {};
469:     
470:     errors.errors.forEach(error => {
471:         const path = error.path.join('.');
472:         formatted[path] = error.message;
473:     });
474:     
475:     return formatted;
476: }
477: 
478: // Advanced input sanitization beyond basic XSS protection
479: export function advancedSanitization(input: string, options: {
480:     allowLineBreaks?: boolean;
481:     allowBasicMarkdown?: boolean;
482:     maxConsecutiveSpaces?: number;
483: } = {}): string {
484:     const { 
485:         allowLineBreaks = false, 
486:         allowBasicMarkdown = false,
487:         maxConsecutiveSpaces = 2
488:     } = options;
489: 
490:     let sanitized = input.trim();
491: 
492:     // Remove null bytes and control characters
493:     sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
494: 
495:     // Normalize unicode characters to prevent bypasses
496:     sanitized = sanitized.normalize('NFKC');
497: 
498:     // Remove excessive whitespace
499:     if (!allowLineBreaks) {
500:         sanitized = sanitized.replace(/\n/g, ' ');
501:     }
502:     
503:     // Limit consecutive spaces
504:     const spaceRegex = new RegExp(`\\s{${maxConsecutiveSpaces + 1},}`, 'g');
505:     sanitized = sanitized.replace(spaceRegex, ' '.repeat(maxConsecutiveSpaces));
506: 
507:     // If markdown is allowed, preserve basic formatting
508:     if (!allowBasicMarkdown) {
509:         sanitized = sanitized.replace(/[*_`#]/g, '');
510:     }
511: 
512:     // Remove any remaining HTML entities that might be used for bypasses
513:     sanitized = sanitized
514:         .replace(/&lt;/g, '<')
515:         .replace(/&gt;/g, '>')
516:         .replace(/&quot;/g, '"')
517:         .replace(/&#x?[0-9a-f]+;/gi, '');
518: 
519:     return sanitized;
520: }
```

## File: astro.config.mjs
```
 1: import { defineConfig } from 'astro/config';
 2: import tailwind from '@astrojs/tailwind';
 3: import react from '@astrojs/react';
 4: import netlify from '@astrojs/netlify';
 5: 
 6: // https://astro.build/config
 7: export default defineConfig({
 8:   integrations: [
 9:     tailwind(),
10:     react()
11:   ],
12:   adapter: netlify()
13: });
```

## File: src/components/debt-relief/ChevronIcon.astro
```
1: ---
2: // src/components/debt-relief/ChevronIcon.astro
3: import ChevronDownIcon from '../icons/ChevronDownIcon.astro';
4: ---
5: 
6: <ChevronDownIcon />
```

## File: src/components/debt-relief/DebtFreedomLogo.astro
```
1: ---
2: // src/components/debt-relief/DebtFreedomLogo.astro
3: ---
4: 
5: <div class="flex items-center">
6:     <img src="/images/debtfreedomtoolkitlogo.png" alt="Logo" width="40" height="40" />
7: </div>
```

## File: src/components/debt-relief/FAQItem.astro
```
  1: ---
  2: // src/components/debt-relief/FAQItem.astro
  3: import ChevronIcon from './ChevronIcon.astro';
  4: 
  5: interface Props {
  6:     question: string;
  7:     answer: string;
  8: }
  9: 
 10: const { question, answer } = Astro.props;
 11: const id = `faq-${Math.floor(Math.random() * 1000)}`;
 12: ---
 13: 
 14: <div class="faq-item mb-4 bg-background-form rounded-lg overflow-hidden shadow-md border border-border hover:shadow-lg transition-all duration-300" style="position: relative; z-index: 1;">
 15:     <button 
 16:         class="faq-question w-full p-5 text-left flex justify-between items-center hover:bg-background-form/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
 17:         aria-expanded="false" 
 18:         aria-controls={id}
 19:     >
 20:         <span class="font-semibold">{question}</span>
 21:         <span class="flex-shrink-0 ml-2">
 22:             <ChevronIcon />
 23:         </span>
 24:     </button>
 25:     <div id={id} class="faq-answer hidden overflow-hidden p-5 pt-0 bg-background-form border-t-0 border-border" aria-hidden="true">
 26:         <div class="faq-content transform transition-all duration-300 opacity-0 translate-y-4">
 27:             <p class="text-text py-4 leading-relaxed">{answer}</p>
 28:         </div>
 29:     </div>
 30: </div>
 31: 
 32: <style>
 33:     .faq-item {
 34:         transform: translateZ(0); /* Force hardware acceleration */
 35:         will-change: transform, box-shadow; /* Optimize for animation */
 36:     }
 37:     
 38:     .faq-question:hover {
 39:         background-color: rgba(var(--color-form-bg-rgb), 0.7);
 40:     }
 41:     
 42:     /* Enhanced focus outline for better accessibility */
 43:     .faq-question:focus-visible {
 44:         outline: none;
 45:         box-shadow: 0 0 0 3px var(--color-primary);
 46:     }
 47:     
 48:     /* Improved focus styles for dark mode */
 49:     .dark .faq-question:focus-visible {
 50:         box-shadow: 0 0 0 3px #58cbe0; /* Brighter in dark mode */
 51:     }
 52:     
 53:     /* Smooth height transition for FAQ answers */
 54:     .faq-answer {
 55:         transition: all 0.3s ease-out;
 56:         max-height: 0;
 57:     }
 58:     
 59:     .faq-answer:not(.hidden) {
 60:         max-height: 500px; /* Large enough to fit content */
 61:     }
 62:     
 63:     /* Visible state for FAQ content */
 64:     .faq-content {
 65:         opacity: 0;
 66:         transform: translateY(10px);
 67:         transition: opacity 0.3s ease-out, transform 0.3s ease-out;
 68:     }
 69:     
 70:     .faq-content.visible {
 71:         opacity: 1;
 72:         transform: translateY(0);
 73:     }
 74:     
 75:     /* Chevron animation - Use :global() to target child component class */
 76:     .faq-question[aria-expanded="true"] :global(.chevron-icon) {
 77:         transform: rotate(180deg);
 78:     }
 79: </style>
 80: 
 81: <script>
 82:     // Enhanced client-side script for accordion functionality with animations
 83:     document.addEventListener('astro:page-load', () => {
 84:         const faqItems = document.querySelectorAll('.faq-item');
 85:         
 86:         faqItems.forEach(item => {
 87:             const button = item.querySelector('.faq-question');
 88:             const answer = item.querySelector('.faq-answer');
 89:             const content = item.querySelector('.faq-content');
 90:             
 91:             if (button && answer && content) {
 92:                 button.addEventListener('click', () => {
 93:                     const expanded = button.getAttribute('aria-expanded') === 'true';
 94:                     
 95:                     // Toggle aria states
 96:                     button.setAttribute('aria-expanded', expanded ? 'false' : 'true');
 97:                     answer.setAttribute('aria-hidden', expanded ? 'true' : 'false');
 98:                     
 99:                     if (expanded) {
100:                         // Closing the FAQ
101:                         content.classList.remove('visible');
102:                         // No need to manually set transform, it's handled by CSS
103:                         
104:                         // Wait for content animation to complete before hiding
105:                         setTimeout(() => {
106:                             answer.classList.add('hidden');
107:                         }, 300);
108:                     } else {
109:                         // Opening the FAQ
110:                         answer.classList.remove('hidden');
111:                         
112:                         // Small delay for the content animation
113:                         setTimeout(() => {
114:                             content.classList.add('visible');
115:                             // No need to manually set transform, it's handled by CSS
116:                         }, 10);
117:                     }
118:                 });
119:             }
120:         });
121:         
122:         // Add keyboard navigation for accessibility
123:         faqItems.forEach((item, index) => {
124:             const button = item.querySelector('.faq-question');
125:             
126:             if (button) {
127:                 button.addEventListener('keydown', (e) => {
128:                     // Up arrow key
129:                     if (e.key === 'ArrowUp' && index > 0) {
130:                         e.preventDefault();
131:                         faqItems[index - 1].querySelector('.faq-question').focus();
132:                     }
133:                     // Down arrow key
134:                     else if (e.key === 'ArrowDown' && index < faqItems.length - 1) {
135:                         e.preventDefault();
136:                         faqItems[index + 1].querySelector('.faq-question').focus();
137:                     }
138:                     // Home key
139:                     else if (e.key === 'Home') {
140:                         e.preventDefault();
141:                         faqItems[0].querySelector('.faq-question').focus();
142:                     }
143:                     // End key
144:                     else if (e.key === 'End') {
145:                         e.preventDefault();
146:                         faqItems[faqItems.length - 1].querySelector('.faq-question').focus();
147:                     }
148:                 });
149:             }
150:         });
151:     });
152:     
153:     // For browsers that don't support astro:page-load event, also use DOMContentLoaded
154:     document.addEventListener('DOMContentLoaded', () => {
155:         if (!document.body.dataset.astroPageLoaded) {
156:             const event = new Event('astro:page-load');
157:             document.dispatchEvent(event);
158:             document.body.dataset.astroPageLoaded = 'true';
159:         }
160:     });
161: </script>
```

## File: src/components/debt-relief/FAQSection.astro
```
  1: ---
  2: // src/components/debt-relief/FAQSection.astro
  3: import FAQItem from './FAQItem.astro';
  4: 
  5: const faqs = [
  6:     {
  7:         question: "How does debt settlement work?",
  8:         answer: "Our program works by negotiating directly with your creditors to reduce the amount you owe. While you make affordable monthly deposits into a dedicated account, our team works to settle each debt for less than the full balance. Once enough funds are accumulated and a settlement is reached, we pay the creditor and the debt is considered resolved."
  9:     },
 10:     {
 11:         question: "What types of debt qualify?",
 12:         answer: "Our program works with unsecured debts such as credit cards, personal loans, medical debt, and some private student loans. Secured debts like mortgages and auto loans, federal student loans, and tax debt typically do not qualify."
 13:     },
 14:     {
 15:         question: "How much does the program cost?",
 16:         answer: "Our fees are performance-based, meaning we only charge when we successfully settle a debt. Fees are calculated as a percentage of the enrolled debt amount or the amount saved, depending on your state. During your free consultation, we'll explain the exact fee structure for your situation."
 17:     },
 18:     {
 19:         question: "Will this affect my credit score?",
 20:         answer: "Yes, debt settlement can negatively impact your credit score initially. When you stop making payments to creditors as part of the program, it will be reported to credit bureaus. However, many clients find that resolving their debt problems provides long-term financial benefits that outweigh the temporary credit impact."
 21:     },
 22:     {
 23:         question: "How long does the program take?",
 24:         answer: "Most clients complete our program within 24-36 months, though timeframes can range from 12-48 months depending on your specific situation, including the amount of debt enrolled and your monthly program payment amount."
 25:     },
 26:     {
 27:         question: "Can creditors sue me during the program?",
 28:         answer: "While creditors have the legal right to pursue collection, including potential lawsuits, our experienced team works to negotiate settlements before such actions occur. If legal action is taken, we work with partners who can provide appropriate guidance."
 29:     }
 30: ];
 31: ---
 32: 
 33: <div class="space-y-4 faq-container">
 34:     {faqs.map((faq, index) => (
 35:         <div class="animate-fade-in" style={`animation-delay: ${index * 100}ms`}>
 36:             <FAQItem
 37:                 question={faq.question}
 38:                 answer={faq.answer}
 39:             />
 40:         </div>
 41:     ))}
 42: </div>
 43: 
 44: <style>
 45:     /* Ensure SVG icons stay at the correct size and don't get enlarged - use new class name */
 46:     :global(.faq-container svg.chevron-icon) {
 47:         max-width: 20px;
 48:         max-height: 20px;
 49:         width: 20px;
 50:         height: 20px;
 51:         flex-shrink: 0;
 52:     }
 53:     
 54:     /* Hide any potential oversized chevrons */
 55:     :global(.faq-container > svg),
 56:     :global(.faq-container svg:not(.chevron-icon)) {
 57:         display: none;
 58:     }
 59: </style>
 60: 
 61: <div class="mt-10 text-center animate-fade-in" style="animation-delay: 600ms">
 62:     <a href="tel:8005551234" class="btn btn-lg animate-pulse-once" style="animation-delay: 800ms">Speak With A Specialist Now: (800) 555-1234</a>
 63: </div>
 64: 
 65: <script>
 66:     // Additional script to ensure all FAQ items are properly initialized
 67:     document.addEventListener('astro:page-load', () => {
 68:         // Get all FAQ items and ensure they're properly set up
 69:         const initializeFAQs = () => {
 70:             const faqItems = document.querySelectorAll('.faq-item');
 71:             faqItems.forEach(item => {
 72:                 // Make sure all the required elements exist
 73:                 const button = item.querySelector('.faq-question');
 74:                 const answer = item.querySelector('.faq-answer');
 75:                 const content = item.querySelector('.faq-content');
 76:                 const icon = item.querySelector('.chevron-icon');
 77:                 
 78:                 if (button && answer && content) {
 79:                     // Ensure ARIA attributes are correctly set
 80:                     const id = answer.id || `faq-${Math.floor(Math.random() * 10000)}`;
 81:                     
 82:                     // Set the correct ID if it's missing
 83:                     if (!answer.id) {
 84:                         answer.id = id;
 85:                     }
 86:                     
 87:                     button.setAttribute('aria-controls', id);
 88:                     button.setAttribute('aria-expanded', 'false');
 89:                     answer.setAttribute('aria-hidden', 'true');
 90:                 }
 91:             });
 92:         };
 93:         
 94:         // Run initialization
 95:         initializeFAQs();
 96:         
 97:         // Add a backup for browsers that might not support the astro:page-load event
 98:         setTimeout(initializeFAQs, 500);
 99:     });
100:     
101:     // Fallback for compatibility
102:     document.addEventListener('DOMContentLoaded', () => {
103:         if (!document.body.dataset.astroPageLoaded) {
104:             const event = new Event('astro:page-load');
105:             document.dispatchEvent(event);
106:             document.body.dataset.astroPageLoaded = 'true';
107:         }
108:     });
109: </script>
110: 
111: <style>
112:     .faq-container {
113:         position: relative;
114:     }
115:     
116:     /* Add staggered animation for better visual experience */
117:     .faq-container > div {
118:         opacity: 0;
119:         transform: translateY(10px);
120:         animation: fadeSlideUp 0.5s ease-out forwards;
121:     }
122:     
123:     @keyframes fadeSlideUp {
124:         to { 
125:             opacity: 1;
126:             transform: translateY(0);
127:         }
128:     }
129: </style>
```

## File: src/components/debt-relief/FinalCTA.astro
```
 1: ---
 2: // src/components/debt-relief/FinalCTA.astro
 3: import ModernPhoneIcon from '../icons/ModernPhoneIcon.astro';
 4: ---
 5: 
 6: <div class="p-10 text-center bg-primary rounded-lg shadow-xl border-2 border-primary transform hover:scale-[1.01] transition-all duration-300">
 7:     <h2 class="mb-6 text-3xl font-bold text-primary-content">Ready To Take Control Of Your Debt?</h2>
 8:     <p class="mb-8 text-lg text-primary-content font-medium">Get Your Free Debt Relief Consultation</p>
 9:     
10:     <div class="flex flex-col items-center gap-6">
11:         <a 
12:             href="#qualification-form" 
13:             class="btn btn-lg bg-primary-content text-primary hover:opacity-90 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
14:         >
15:             Check If You Qualify
16:         </a>
17:         <div class="text-primary-content font-medium">OR</div>
18:         <a 
19:             href="tel:8005551234" 
20:             class="btn text-2xl font-bold text-primary-content hover:underline transition-all flex items-center gap-2"
21:         >
22:             <ModernPhoneIcon class="w-6 h-6" />
23:             (800) 555-1234
24:         </a>
25:     </div>
26:     
27:     <p class="mt-6 text-primary-content text-sm">Available 9:00am - 8:00pm EST, 7 days a week</p>
28: </div>
```

## File: src/components/debt-relief/Hero.astro
```
 1: ---
 2: // src/components/debt-relief/Hero.astro
 3: interface Props {
 4:     title: string;
 5:     subtitle: string;
 6:     description: string;
 7:     primaryCta: {
 8:         text: string;
 9:         url: string;
10:     };
11:     phoneNumber: string;
12:     availability: string;
13: }
14: 
15: const { 
16:     title = "Break Free From Credit Card Debt - Save Up To 50%",
17:     subtitle = "Reduce Your Debt By Thousands | Become Debt-Free in 12-36 Months",
18:     description = "Are you struggling with $15,000+ in credit card debt? Our professional debt settlement program can help you reduce what you owe and become debt-free faster than making minimum payments.",
19:     primaryCta = {
20:         text: "Get Your Free Consultation Now",
21:         url: "#qualification-form"
22:     },
23:     phoneNumber = "(800) 555-1234",
24:     availability = "Available 9:00am - 8:00pm EST, 7 days a week"
25: } = Astro.props;
26: ---
27: 
28: <section class="py-12 sm:py-20 text-center md:text-left">
29:     <div class="max-w-4xl mx-auto md:mx-0">
30:         <h1 class="mb-4 text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-shadow text-[#2d7984]">{title}</h1>
31:         <h2 class="mb-6 text-xl font-medium text-gray-600 leading-relaxed">{subtitle}</h2>
32:         <p class="mb-8 text-lg max-w-3xl leading-relaxed">{description}</p>
33:         
34:         <div class="flex flex-wrap gap-6 justify-center md:justify-start items-center">
35:             <a 
36:                 href={primaryCta.url} 
37:                 class="bg-[#2d7984] text-white py-4 px-6 rounded-lg font-bold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all text-lg"
38:             >
39:                 {primaryCta.text}
40:             </a>
41:             <div class="flex flex-col sm:flex-row items-center gap-2">
42:                 <span class="font-semibold">or Call</span>
43:                 <a 
44:                     href={`tel:${phoneNumber.replace(/\D/g, '')}`} 
45:                     class="text-xl font-bold text-[#2d7984] hover:text-[#58cbe0] transition-colors"
46:                 >
47:                     {phoneNumber}
48:                 </a>
49:             </div>
50:         </div>
51:         
52:         <p class="mt-4 text-sm text-text-muted">{availability}</p>
53:     </div>
54: </section>
55: 
56: <style>
57:     .text-shadow {
58:         text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
59:     }
60:     
61:     /* Improved responsive behavior for very small screens */
62:     @media (max-width: 340px) {
63:         .btn {
64:             width: 100%;
65:         }
66:     }
67: </style>
```

## File: src/components/debt-relief/ProcessStep.astro
```
 1: ---
 2: // src/components/debt-relief/ProcessStep.astro
 3: interface Props {
 4:     stepNumber: number;
 5:     title: string;
 6:     description: string;
 7: }
 8: 
 9: const { stepNumber, title, description } = Astro.props;
10: ---
11: 
12: <div class="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-gray-900 hover:shadow-xl hover:dark:shadow-gray-900 transition-all duration-300">
13:     <div class="flex items-center justify-center w-16 h-16 mb-6 text-xl font-bold text-white bg-primary rounded-full shadow-md dark:shadow-gray-800 transform hover:scale-110 transition-all duration-300">
14:         {stepNumber}
15:     </div>
16:     <h3 class="mb-4 text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">{title}</h3>
17:     <p class="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">{description}</p>
18: </div>
```

## File: src/components/BackgroundPattern.astro
```
 1: ---
 2: // This component generates a decorative background with abstract shapes
 3: // Can be included anywhere you want a creative background pattern
 4: import DotsPattern from './icons/DotsPattern.astro';
 5: ---
 6: 
 7: <div class="background-pattern-container absolute inset-0 overflow-hidden pointer-events-none z-0">
 8:     <div class="dark:opacity-20 opacity-10 transition-opacity duration-500 ease-out">
 9:         <!-- Circles with smooth transitions -->
10:         <div class="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary/30 blur-3xl transition-all duration-700 ease-out"></div>
11:         <div class="absolute bottom-40 right-[5%] w-96 h-96 rounded-full bg-accent/20 blur-3xl transition-all duration-700 ease-out"></div>
12:         
13:         <!-- Lines with gradient transitions -->
14:         <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent transition-all duration-600 ease-out"></div>
15:         <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent transition-all duration-600 ease-out"></div>
16:         
17:         <!-- Decorative shapes with enhanced transitions -->
18:         <div class="absolute top-[30%] left-[5%] w-24 h-24 rotate-45 border border-primary/20 rounded-lg transition-all duration-500 ease-out"></div>
19:         <div class="absolute top-[40%] right-[10%] w-32 h-32 -rotate-12 border border-accent/20 rounded-full transition-all duration-500 ease-out"></div>
20:         <div class="absolute bottom-[20%] left-[20%] w-40 h-40 rotate-12 border border-secondary/20 rounded-3xl transition-all duration-500 ease-out"></div>
21:         
22:         <!-- Dots pattern with smooth opacity transition -->
23:         <div class="absolute inset-0 opacity-30 transition-opacity duration-600 ease-out">
24:             <DotsPattern />
25:         </div>
26:     </div>
27: </div>
```

## File: src/components/BenefitsSection.astro
```
  1: ---
  2: import CheckmarkIcon from './icons/CheckmarkIcon.astro';
  3: ---
  4: 
  5: <div class="benefits-section py-16 md:py-20 relative" id="benefits">
  6:     <div class="container mx-auto px-4">
  7:         <!-- Section Header -->
  8:         <div class="text-center mb-16">
  9:             <h2 class="text-3xl md:text-4xl font-bold mb-4 text-text-light dark:text-text-dark transition-colors duration-300">How Our Debt Relief Program Works</h2>
 10:             <p class="text-lg max-w-3xl mx-auto text-text-muted-light dark:text-text-muted-dark transition-colors duration-300">Our proven debt settlement approach has helped thousands of clients reduce their debt and regain financial freedom.</p>
 11:         </div>
 12:         
 13:         <!-- Benefits Cards -->
 14:         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
 15:             <!-- Benefit Card 1 -->
 16:             <div class="benefit-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md dark:shadow-gray-900 transition-all duration-300 hover:shadow-xl hover:dark:shadow-gray-900 relative group">
 17:                 <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
 18:                 <div class="h-2 bg-primary"></div>
 19:                 <div class="p-6 md:p-8 relative z-10">
 20:                     <div class="step-number flex items-center justify-center rounded-full w-12 h-12 mb-6 text-white font-bold text-lg bg-primary">1</div>
 21:                     <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Free Consultation</h3>
 22:                     <p class="mb-6 text-gray-600 dark:text-gray-300 transition-colors duration-300">Our debt specialists assess your situation to determine if debt settlement is right for you and how much you could save.</p>
 23:                     <div class="flex items-center gap-3 text-primary">
 24:                         <CheckmarkIcon />
 25:                         <span class="font-medium">No upfront fees</span>
 26:                     </div>
 27:                 </div>
 28:             </div>
 29:             
 30:             <!-- Benefit Card 2 -->
 31:             <div class="benefit-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md dark:shadow-gray-900 transition-all duration-300 hover:shadow-xl hover:dark:shadow-gray-900 relative group">
 32:                 <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
 33:                 <div class="h-2 bg-primary"></div>
 34:                 <div class="p-6 md:p-8 relative z-10">
 35:                     <div class="step-number flex items-center justify-center rounded-full w-12 h-12 mb-6 text-white font-bold text-lg bg-primary">2</div>
 36:                     <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Customized Plan</h3>
 37:                     <p class="mb-6 text-gray-600 dark:text-gray-300 transition-colors duration-300">We create a personalized debt settlement strategy based on your financial situation and debt amount.</p>
 38:                     <div class="flex items-center gap-3 text-primary">
 39:                         <CheckmarkIcon />
 40:                         <span class="font-medium">Affordable monthly payments</span>
 41:                     </div>
 42:                 </div>
 43:             </div>
 44:             
 45:             <!-- Benefit Card 3 -->
 46:             <div class="benefit-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md dark:shadow-gray-900 transition-all duration-300 hover:shadow-xl hover:dark:shadow-gray-900 relative group">
 47:                 <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
 48:                 <div class="h-2 bg-primary"></div>
 49:                 <div class="p-6 md:p-8 relative z-10">
 50:                     <div class="step-number flex items-center justify-center rounded-full w-12 h-12 mb-6 text-white font-bold text-lg bg-primary">3</div>
 51:                     <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Dedicated Support</h3>
 52:                     <p class="mb-6 text-gray-600 dark:text-gray-300 transition-colors duration-300">Our team negotiates with creditors on your behalf to reduce your debt, often by up to 50% of your enrolled balance.</p>
 53:                     <div class="flex items-center gap-3 text-primary">
 54:                         <CheckmarkIcon />
 55:                         <span class="font-medium">Expert negotiators</span>
 56:                     </div>
 57:                 </div>
 58:             </div>
 59:             
 60:             <!-- Benefit Card 4 -->
 61:             <div class="benefit-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md dark:shadow-gray-900 transition-all duration-300 hover:shadow-xl hover:dark:shadow-gray-900 relative group">
 62:                 <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
 63:                 <div class="h-2 bg-primary"></div>
 64:                 <div class="p-6 md:p-8 relative z-10">
 65:                     <div class="step-number flex items-center justify-center rounded-full w-12 h-12 mb-6 text-white font-bold text-lg bg-primary">4</div>
 66:                     <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Debt Reduction</h3>
 67:                     <p class="mb-6 text-gray-600 dark:text-gray-300 transition-colors duration-300">Watch your debt decrease as we reach settlements with each of your creditors, providing you with documentation of each resolution.</p>
 68:                     <div class="flex items-center gap-3 text-primary">
 69:                         <CheckmarkIcon />
 70:                         <span class="font-medium">Transparent process</span>
 71:                     </div>
 72:                 </div>
 73:             </div>
 74:             
 75:             <!-- Benefit Card 5 -->
 76:             <div class="benefit-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md dark:shadow-gray-900 transition-all duration-300 hover:shadow-xl hover:dark:shadow-gray-900 relative group">
 77:                 <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
 78:                 <div class="h-2 bg-primary"></div>
 79:                 <div class="p-6 md:p-8 relative z-10">
 80:                     <div class="step-number flex items-center justify-center rounded-full w-12 h-12 mb-6 text-white font-bold text-lg bg-primary">5</div>
 81:                     <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Financial Freedom</h3>
 82:                     <p class="mb-6 text-gray-600 dark:text-gray-300 transition-colors duration-300">Complete the program debt-free, with settlements typically achieved in 24-48 months versus decades of minimum payments.</p>
 83:                     <div class="flex items-center gap-3 text-primary">
 84:                         <CheckmarkIcon />
 85:                         <span class="font-medium">Faster debt resolution</span>
 86:                     </div>
 87:                 </div>
 88:             </div>
 89:             
 90:             <!-- Benefit Card 6 -->
 91:             <div class="benefit-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md dark:shadow-gray-900 transition-all duration-300 hover:shadow-xl hover:dark:shadow-gray-900 relative group">
 92:                 <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
 93:                 <div class="h-2 bg-primary"></div>
 94:                 <div class="p-6 md:p-8 relative z-10">
 95:                     <div class="step-number flex items-center justify-center rounded-full w-12 h-12 mb-6 text-white font-bold text-lg bg-primary">6</div>
 96:                     <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Rebuild Credit</h3>
 97:                     <p class="mb-6 text-gray-600 dark:text-gray-300 transition-colors duration-300">Get resources and guidance to help rebuild your credit after completing our debt settlement program.</p>
 98:                     <div class="flex items-center gap-3 text-primary">
 99:                         <CheckmarkIcon />
100:                         <span class="font-medium">Credit restoration support</span>
101:                     </div>
102:                 </div>
103:             </div>
104:         </div>
105:         
106:         <!-- Results Stats Section -->
107:         <div class="results-stats mt-20 p-8 md:p-10 rounded-xl shadow-lg bg-primary text-white">
108:             <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
109:                 <div class="stat-item text-center">
110:                     <div class="text-4xl md:text-5xl font-bold mb-2">50%</div>
111:                     <p class="text-lg opacity-90">Average Debt Reduction</p>
112:                 </div>
113:                 
114:                 <div class="stat-item text-center">
115:                     <div class="text-4xl md:text-5xl font-bold mb-2">24-48</div>
116:                     <p class="text-lg opacity-90">Months to Debt Freedom</p>
117:                 </div>
118:                 
119:                 <div class="stat-item text-center">
120:                     <div class="text-4xl md:text-5xl font-bold mb-2">$0</div>
121:                     <p class="text-lg opacity-90">Upfront Fees</p>
122:                 </div>
123:             </div>
124:         </div>
125:     </div>
126: </div>
127: 
128: <style>
129:     .benefit-card {
130:         height: 100%;
131:         display: flex;
132:         flex-direction: column;
133:         transition: transform 0.3s ease, box-shadow 0.3s ease;
134:     }
135:     
136:     .benefit-card:hover {
137:         transform: translateY(-5px);
138:     }
139:     
140:     .step-number {
141:         transition: all 0.3s ease;
142:     }
143:     
144:     .benefit-card:hover .step-number {
145:         transform: scale(1.1);
146:         box-shadow: 0 0 15px rgba(45, 121, 132, 0.5);
147:     }
148:     
149:     @media (prefers-reduced-motion: reduce) {
150:         .benefit-card:hover {
151:             transform: none;
152:         }
153:         
154:         .benefit-card:hover .step-number {
155:             transform: none;
156:             box-shadow: none;
157:         }
158:     }
159:     
160:     .stat-item {
161:         position: relative;
162:     }
163:     
164:     .stat-item::after {
165:         content: '';
166:         position: absolute;
167:         right: 0;
168:         top: 20%;
169:         bottom: 20%;
170:         width: 1px;
171:         background-color: rgba(255, 255, 255, 0.3);
172:     }
173:     
174:     .stat-item:last-child::after {
175:         display: none;
176:     }
177:     
178:     @media (max-width: 768px) {
179:         .stat-item::after {
180:             display: none;
181:         }
182:     }
183: </style>
```

## File: src/components/Logo.astro
```
 1: ---
 2: // Logo.astro - Updated to use the debt-freedom-logo.svg
 3: interface Props {
 4:   width?: string;
 5:   height?: string;
 6:   class?: string;
 7: }
 8: 
 9: // The original SVG dimensions are 502x560, so let's maintain the aspect ratio
10: const { width = "90", height = "100", class: className = "" } = Astro.props;
11: ---
12: 
13: <img 
14:   src="/images/debt-freedom-logo.svg" 
15:   alt="Debt Freedom Toolkit Logo" 
16:   width={width} 
17:   height={height} 
18:   class={`logo ${className}`}
19:   loading="lazy"
20:   decoding="async"
21: />
22: 
23: <style>
24:   .logo {
25:     display: inline-block;
26:     height: auto;
27:     max-height: 50px; /* Constrain height for header */
28:     width: auto;
29:   }
30:   
31:   /* Adjust logo size in the footer to be slightly smaller */
32:   :global(footer) .logo {
33:     max-height: 45px;
34:   }
35: </style>
```

## File: src/components/TrustIndicators.astro
```
 1: ---
 2: import ShieldIcon from './icons/ShieldIcon.astro';
 3: import UsersIcon from './icons/UsersIcon.astro';
 4: import CreditCardIcon from './icons/CreditCardIcon.astro';
 5: import ClockIcon from './icons/ClockIcon.astro';
 6: ---
 7: 
 8: <div class="trust-indicators py-8 md:py-10 relative">
 9:     <div class="container mx-auto px-4">
10:         <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 backdrop-blur-sm rounded-xl shadow-lg dark:shadow-gray-900 p-6 md:p-8 transition-colors duration-300">
11:             <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12">
12:                 <!-- Trust Badge 1: BBB Rating -->
13:                 <div class="trust-badge flex flex-col items-center text-center">
14:                     <div class="badge-icon bg-[#2d7984]/10 dark:bg-[#58cbe0]/10 p-3 rounded-full mb-3">
15:                         <ShieldIcon class="text-[#2d7984] dark:text-[#58cbe0]" />
16:                     </div>
17:                     <div class="badge-text">
18:                         <p class="font-bold text-md text-gray-900 dark:text-white transition-colors duration-300">A+ BBB Rating</p>
19:                         <p class="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">Accredited Business</p>
20:                     </div>
21:                 </div>
22: 
23:                 <!-- Trust Badge 2: Customers Served -->
24:                 <div class="trust-badge flex flex-col items-center text-center">
25:                     <div class="badge-icon bg-[#2d7984]/10 dark:bg-[#58cbe0]/10 p-3 rounded-full mb-3">
26:                         <UsersIcon class="text-[#2d7984] dark:text-[#58cbe0]" />
27:                     </div>
28:                     <div class="badge-text">
29:                         <p class="font-bold text-md text-gray-900 dark:text-white transition-colors duration-300">50,000+</p>
30:                         <p class="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">Clients Served</p>
31:                     </div>
32:                 </div>
33: 
34:                 <!-- Trust Badge 3: Debt Resolved -->
35:                 <div class="trust-badge flex flex-col items-center text-center">
36:                     <div class="badge-icon bg-[#2d7984]/10 dark:bg-[#58cbe0]/10 p-3 rounded-full mb-3">
37:                         <CreditCardIcon class="text-[#2d7984] dark:text-[#58cbe0]" />
38:                     </div>
39:                     <div class="badge-text">
40:                         <p class="font-bold text-md text-gray-900 dark:text-white transition-colors duration-300">$1.2 Billion</p>
41:                         <p class="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">Debt Resolved</p>
42:                     </div>
43:                 </div>
44: 
45:                 <!-- Trust Badge 4: Years in Business -->
46:                 <div class="trust-badge flex flex-col items-center text-center">
47:                     <div class="badge-icon bg-[#2d7984]/10 dark:bg-[#58cbe0]/10 p-3 rounded-full mb-3">
48:                         <ClockIcon class="text-[#2d7984] dark:text-[#58cbe0]" />
49:                     </div>
50:                     <div class="badge-text">
51:                         <p class="font-bold text-md text-gray-900 dark:text-white transition-colors duration-300">12+ Years</p>
52:                         <p class="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">Industry Experience</p>
53:                     </div>
54:                 </div>
55:             </div>
56:         </div>
57:     </div>
58: </div>
59: 
60: <style>
61:     .trust-badge {
62:         transition: transform 0.3s ease;
63:     }
64:     
65:     .trust-badge:hover {
66:         transform: translateY(-5px);
67:     }
68:     
69:     @media (prefers-reduced-motion: reduce) {
70:         .trust-badge:hover {
71:             transform: none;
72:         }
73:     }
74: </style>
```

## File: src/components/Alert.astro
```
 1: ---
 2: import InfoIcon from './icons/InfoIcon.astro';
 3: 
 4: interface Props {
 5:     class?: string;
 6:     type?: 'info' | 'warning' | 'error' | 'success';
 7: }
 8: 
 9: const { class: className, type = 'info' } = Astro.props;
10: 
11: // Determine theme-aware color classes based on type for proper contrast in both light and dark modes
12: const colorClasses = {
13:     info: 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-800',
14:     warning: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 border border-yellow-200 dark:border-yellow-800',
15:     error: 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 border border-red-200 dark:border-red-800',
16:     success: 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 border border-green-200 dark:border-green-800'
17: };
18: 
19: const activeColorClass = colorClasses[type];
20: ---
21: 
22: <div class:list={[
23:     'flex gap-4 p-4 rounded-lg shadow-md dark:shadow-gray-900 transition-colors duration-300',
24:     activeColorClass,
25:     className
26: ]}>
27:     <InfoIcon class="w-6 h-6 shrink-0 opacity-80" />
28:     <div class="flex-1">
29:         <slot />
30:     </div>
31: </div>
```

## File: src/components/CTASection.astro
```
  1: ---
  2: import PhoneIcon from './icons/PhoneIcon.astro';
  3: import CheckIcon from './icons/CheckIcon.astro';
  4: import TrustLogo1 from './icons/TrustLogo1.astro';
  5: import TrustLogo2 from './icons/TrustLogo2.astro';
  6: import TrustLogo3 from './icons/TrustLogo3.astro';
  7: import TrustLogo4 from './icons/TrustLogo4.astro';
  8: ---
  9: 
 10: <div class="cta-section py-16 md:py-20 relative bg-white dark:bg-gray-900 transition-colors duration-300" id="cta">
 11:     <!-- Background decorations -->
 12:     <div class="absolute inset-0 overflow-hidden pointer-events-none">
 13:         <div class="absolute top-0 right-0 w-1/2 h-1/2 bg-[#2d7984]/5 dark:bg-[#58cbe0]/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 transition-colors duration-300"></div>
 14:         <div class="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#58cbe0]/5 dark:bg-[#58cbe0]/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 transition-colors duration-300"></div>
 15:     </div>
 16:     
 17:     <div class="container mx-auto px-4 relative z-10 max-w-6xl">
 18:         <div class="cta-card bg-[#1d5058] dark:bg-[#2d7984] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform-gpu hover:-translate-y-1 transition-all duration-300 border border-gray-200/20 dark:border-gray-700/20">
 19:             <div class="p-8 md:p-12 lg:p-16">
 20:                 <div class="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-y-12 gap-x-20 items-start">
 21:                     <!-- CTA Content -->
 22:                     <div>
 23:                         <h2 class="text-3xl md:text-4xl text-white font-extrabold mb-6 leading-tight md:leading-snug transition-colors duration-300">
 24:                             Ready to Start Your Debt-Free Journey?
 25:                         </h2>
 26:                         <p class="text-base md:text-lg text-white/95 mb-10 max-w-md transition-colors duration-300">
 27:                             Our debt relief specialists are standing by to help you reduce your debt and regain control of your finances.
 28:                         </p>
 29:                         
 30:                         <div class="flex flex-col sm:flex-row gap-4">
 31:                             <a href="#consultation" class="relative cta-button bg-white dark:bg-gray-900 text-[#2d7984] dark:text-[#58cbe0] hover:bg-white/90 dark:hover:bg-gray-900/90 focus:ring-2 focus:ring-white/60 dark:focus:ring-gray-900/60 ring-offset-2 ring-offset-[#1d5058] dark:ring-offset-[#2d7984] transition-all duration-200 ease-out py-4 px-8 rounded-lg text-center font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
 32:                                 Get Your Free Consultation
 33:                             </a>
 34:                             
 35:                             <a href="tel:8005551234" class="btn group cta-phone-button flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 active:scale-95 focus:ring-2 focus:ring-white/60 ring-offset-2 ring-offset-[#1d5058] transition-all duration-200 ease-out py-4 px-8 rounded-lg text-center font-bold text-lg shadow-lg hover:shadow-xl">
 36:                                 <PhoneIcon class="w-5 h-5 stroke-current opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200" />
 37:                                 Call (800) 555-1234
 38:                             </a>
 39:                         </div>
 40:                     </div>
 41:                     
 42:                     <!-- CTA Features List -->
 43:                     <div class="cta-features relative bg-[#2d7984]/20 dark:bg-[#58cbe0]/20 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10 dark:border-gray-900/10 order-2 lg:order-none self-start transition-colors duration-300">
 44:                         <h3 class="text-xl text-white font-bold mb-6 transition-colors duration-300">
 45:                             Why Choose Debt Freedom Toolkit?
 46:                         </h3>
 47:                         
 48:                         <ul class="space-y-5">
 49:                             <li class="flex items-start gap-4">
 50:                                 <div class="feature-icon flex-shrink-0 pt-0.5 bg-white/20 dark:bg-gray-900/20 rounded-full p-1 transition-colors duration-300">
 51:                                     <CheckIcon class="text-white w-4 h-4 md:w-5 md:h-5 transition-colors duration-300" />
 52:                                 </div>
 53:                                 <div>
 54:                                     <h4 class="text-white font-medium transition-colors duration-300">No Upfront Fees</h4>
 55:                                     <p class="text-white/95 text-sm md:text-base transition-colors duration-300">You don't pay until we successfully negotiate your debt.</p>
 56:                                 </div>
 57:                             </li>
 58:                             
 59:                             <li class="flex items-start gap-4">
 60:                                 <div class="feature-icon flex-shrink-0 pt-0.5 bg-white/20 dark:bg-gray-900/20 rounded-full p-1 transition-colors duration-300">
 61:                                     <CheckIcon class="text-white w-4 h-4 md:w-5 md:h-5 transition-colors duration-300" />
 62:                                 </div>
 63:                                 <div>
 64:                                     <h4 class="text-white font-medium transition-colors duration-300">Expert Negotiators</h4>
 65:                                     <p class="text-white/95 text-sm md:text-base transition-colors duration-300">Our team has settled over $1.2 billion in debt for our clients.</p>
 66:                                 </div>
 67:                             </li>
 68:                             
 69:                             <li class="flex items-start gap-4">
 70:                                 <div class="feature-icon flex-shrink-0 pt-0.5 bg-white/20 dark:bg-gray-900/20 rounded-full p-1 transition-colors duration-300">
 71:                                     <CheckIcon class="text-white w-4 h-4 md:w-5 md:h-5 transition-colors duration-300" />
 72:                                 </div>
 73:                                 <div>
 74:                                     <h4 class="text-white font-medium transition-colors duration-300">Personalized Approach</h4>
 75:                                     <p class="text-white/95 text-sm md:text-base transition-colors duration-300">Custom solutions based on your unique financial situation.</p>
 76:                                 </div>
 77:                             </li>
 78:                             
 79:                             <li class="flex items-start gap-4">
 80:                                 <div class="feature-icon flex-shrink-0 pt-0.5 bg-white/20 dark:bg-gray-900/20 rounded-full p-1 transition-colors duration-300">
 81:                                     <CheckIcon class="text-white w-4 h-4 md:w-5 md:h-5 transition-colors duration-300" />
 82:                                 </div>
 83:                                 <div>
 84:                                     <h4 class="text-white font-medium transition-colors duration-300">Faster Than DIY</h4>
 85:                                     <p class="text-white/95 text-sm md:text-base transition-colors duration-300">Become debt-free in 24-48 months versus 10+ years of minimum payments.</p>
 86:                                 </div>
 87:                             </li>
 88:                         </ul>
 89:                     </div>
 90:                 </div>
 91:             </div>
 92:         </div>
 93:         
 94:         <!-- Additional Trust Elements -->
 95:         <div class="trust-elements mt-16 text-center">
 96:             <p class="text-lg text-gray-600 dark:text-gray-300 font-medium mb-6 transition-colors duration-300">Trusted & Featured By</p>
 97:             
 98:             <div class="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
 99:                 <div class="trust-logo h-12 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0">
100:                     <TrustLogo1 class="text-gray-600 dark:text-gray-300 transition-colors duration-300" />
101:                 </div>
102:                 
103:                 <div class="trust-logo h-12 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0">
104:                     <TrustLogo2 class="text-gray-600 dark:text-gray-300 transition-colors duration-300" />
105:                 </div>
106:                 
107:                 <div class="trust-logo h-12 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0">
108:                     <TrustLogo3 class="text-gray-600 dark:text-gray-300 transition-colors duration-300" />
109:                 </div>
110:                 
111:                 <div class="trust-logo h-12 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0">
112:                     <TrustLogo4 class="text-gray-600 dark:text-gray-300 transition-colors duration-300" />
113:                 </div>
114:             </div>
115:         </div>
116:     </div>
117: </div>
118: 
119: <style>
120:     /* Theme-aware CTA card styling */
121:     .cta-card {
122:         background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%);
123:         box-shadow: 
124:             0 20px 45px -10px rgba(0, 0, 0, 0.25),
125:             0 10px 25px -5px rgba(var(--color-primary-rgb), 0.1);
126:         transition: 
127:             transform var(--theme-transition-duration) var(--theme-transition-easing),
128:             box-shadow var(--theme-transition-duration) var(--theme-transition-easing),
129:             background var(--theme-transition-duration) var(--theme-transition-easing);
130:     }
131:     
132:     .dark .cta-card {
133:         background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
134:         box-shadow: 
135:             0 20px 45px -10px rgba(0, 0, 0, 0.4),
136:             0 10px 25px -5px rgba(var(--color-primary-light-rgb), 0.15);
137:     }
138:     
139:     .cta-card:hover {
140:         box-shadow: 
141:             0 35px 60px -15px rgba(0, 0, 0, 0.3),
142:             0 15px 35px -10px rgba(var(--color-primary-rgb), 0.15);
143:     }
144:     
145:     .dark .cta-card:hover {
146:         box-shadow: 
147:             0 35px 60px -15px rgba(0, 0, 0, 0.5),
148:             0 15px 35px -10px rgba(var(--color-primary-light-rgb), 0.2);
149:     }
150:     
151:     /* Enhanced button styles with theme awareness */
152:     .cta-button {
153:         backdrop-filter: blur(8px);
154:         -webkit-backdrop-filter: blur(8px);
155:         border: 1px solid rgba(var(--color-background-primary-rgb), 0.2);
156:         box-shadow: 
157:             0 4px 15px rgba(0, 0, 0, 0.1),
158:             inset 0 1px 0 rgba(255, 255, 255, 0.1);
159:         transition: all var(--theme-transition-duration) var(--theme-transition-easing);
160:         text-decoration: none !important; /* Remove blue underlines */
161:         color: inherit !important; /* Use the intended colors */
162:     }
163:     
164:     .cta-button:visited {
165:         color: inherit !important; /* Ensure visited links don't change color */
166:     }
167:     
168:     .cta-button:hover {
169:         box-shadow: 
170:             0 8px 25px rgba(0, 0, 0, 0.15),
171:             inset 0 1px 0 rgba(255, 255, 255, 0.2);
172:     }
173:     
174:     .cta-phone-button {
175:         backdrop-filter: blur(12px);
176:         -webkit-backdrop-filter: blur(12px);
177:         transition: all var(--theme-transition-duration) var(--theme-transition-easing);
178:         text-decoration: none !important; /* Remove blue underlines */
179:         color: white !important; /* Force white text for visibility */
180:         border-color: rgba(255, 255, 255, 0.3) !important;
181:         box-shadow: 
182:             0 4px 15px rgba(0, 0, 0, 0.1),
183:             inset 0 1px 0 rgba(255, 255, 255, 0.1);
184:     }
185:     
186:     .cta-phone-button:visited {
187:         color: white !important; /* Ensure visited links stay white */
188:     }
189:     
190:     .cta-phone-button:hover {
191:         color: white !important; /* Keep white text on hover */
192:         background-color: rgba(255, 255, 255, 0.2) !important;
193:         border-color: rgba(255, 255, 255, 0.5) !important;
194:         box-shadow: 
195:             0 8px 25px rgba(0, 0, 0, 0.15),
196:             inset 0 1px 0 rgba(255, 255, 255, 0.2);
197:         transform: translateY(-1px) !important;
198:     }
199:     
200:     /* Ensure all CTA section links don't have underlines */
201:     .cta-section a:not(.btn) {
202:         text-decoration: none !important;
203:     }
204:     
205:     .cta-section a:not(.btn):hover {
206:         text-decoration: none !important;
207:     }
208:     
209:     /* Feature icons with enhanced theme transitions */
210:     .feature-icon {
211:         transition: 
212:             transform 0.2s ease,
213:             background-color var(--theme-transition-duration) var(--theme-transition-easing);
214:     }
215:     
216:     li:hover .feature-icon {
217:         transform: scale(1.05);
218:         background-color: rgba(var(--color-background-primary-rgb), 0.3);
219:     }
220:     
221:     .dark li:hover .feature-icon {
222:         background-color: rgba(var(--color-background-primary-rgb), 0.25);
223:     }
224:     
225:     /* Trust logos with smooth transitions */
226:     .trust-logo {
227:         transition: 
228:             opacity var(--theme-transition-duration) var(--theme-transition-easing),
229:             filter var(--theme-transition-duration) var(--theme-transition-easing);
230:     }
231:     
232:     .trust-logo:hover {
233:         filter: grayscale(0%) brightness(1.1);
234:     }
235:     
236:     /* CTA features background enhancement */
237:     .cta-features {
238:         backdrop-filter: blur(12px);
239:         -webkit-backdrop-filter: blur(12px);
240:         box-shadow: 
241:             inset 0 1px 0 rgba(var(--color-background-primary-rgb), 0.1),
242:             0 4px 15px rgba(0, 0, 0, 0.05);
243:         transition: 
244:             background-color var(--theme-transition-duration) var(--theme-transition-easing),
245:             border-color var(--theme-transition-duration) var(--theme-transition-easing);
246:     }
247:     
248:     .dark .cta-features {
249:         box-shadow: 
250:             inset 0 1px 0 rgba(var(--color-background-primary-rgb), 0.05),
251:             0 4px 15px rgba(0, 0, 0, 0.1);
252:     }
253:     
254:     /* Accessibility improvements */
255:     @media (prefers-reduced-motion: reduce) {
256:         .cta-card,
257:         .cta-button,
258:         .cta-phone-button,
259:         .feature-icon,
260:         .trust-logo {
261:             transition: none !important;
262:         }
263:         
264:         .cta-card:hover,
265:         .cta-button:hover,
266:         .cta-phone-button:hover {
267:             transform: none !important;
268:         }
269:         
270:         li:hover .feature-icon {
271:             transform: none !important;
272:         }
273:     }
274:     
275:     /* High contrast mode adjustments */
276:     @media (prefers-contrast: high) {
277:         .cta-card {
278:             border: 2px solid var(--color-border-strong);
279:         }
280:         
281:         .cta-features {
282:             border: 1px solid var(--color-border-default);
283:         }
284:     }
285: </style>
```

## File: src/components/EnhancedHero.astro
```
  1: ---
  2: import BlobShape1 from './icons/BlobShape1.astro';
  3: import BlobShape2 from './icons/BlobShape2.astro';
  4: import PhoneIcon from './icons/PhoneIcon.astro';
  5: import ClockIcon from './icons/ClockIcon.astro';
  6: ---
  7: 
  8: <div class="hero-section py-12 md:py-16 lg:py-20 relative bg-background-light dark:bg-background-dark transition-colors duration-300">
  9:     <!-- Background shape decorations (svg) -->
 10:     <div class="absolute inset-0 overflow-hidden pointer-events-none">
 11:         <BlobShape1 class="absolute -top-20 -right-20 text-primary-light dark:text-primary opacity-10 transition-colors duration-300" />
 12:         <BlobShape2 class="absolute -bottom-24 -left-24 text-accent-light dark:text-accent opacity-10 transition-colors duration-300" />
 13:     </div>
 14: 
 15:     <div class="container mx-auto px-4 relative z-10">
 16:         <div class="max-w-4xl mx-auto text-center">
 17:             <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-text-light dark:text-text-dark animate-fade-in transition-colors duration-300">
 18:                 Break Free From Credit Card Debt 
 19:                 <span class="text-primary-light dark:text-primary transition-colors duration-300">Save Up To 50%</span>
 20:             </h1>
 21:             
 22:             <p class="text-xl md:text-2xl text-text-muted-light dark:text-text-muted-dark mb-8 animate-fade-in-delay-1 transition-colors duration-300">
 23:                 Reduce Your Debt By Thousands | Become Debt-Free In 
 24:                 <span class="text-primary-light dark:text-primary font-semibold transition-colors duration-300">12-36 Months</span>
 25:             </p>
 26:             
 27:             <div class="relative mb-12 max-w-3xl mx-auto">
 28:                 <!-- Pulsing background for emphasis -->
 29:                 <div class="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 dark:from-primary-light/20 dark:via-primary-light/30 dark:to-primary-light/20 rounded-lg blur-md transition-colors duration-300"></div>
 30:                 <p class="relative bg-background-form-light dark:bg-background-form-dark text-lg md:text-xl text-text-muted-light dark:text-text-muted-dark p-6 rounded-lg shadow-md mb-8 animate-fade-in-delay-2 transition-colors duration-300 border border-border-light dark:border-border-dark">
 31:                     Are you struggling with <span class="font-bold text-text-light dark:text-text-dark transition-colors duration-300">$15,000+ in credit card debt</span>? Our professional debt settlement program can help you reduce what you owe and become debt-free faster than making minimum payments.
 32:                 </p>
 33:             </div>
 34:             
 35:             <div class="flex flex-col sm:flex-row justify-center gap-6 mb-6 animate-fade-in-delay-3">
 36:                 <a href="#consultation" class="btn btn-lg group relative overflow-hidden bg-primary hover:bg-primary-hover active:bg-primary-active text-text-button transition-all duration-200">
 37:                     <span class="relative z-10">Get Your Free Consultation Now</span>
 38:                     <div class="absolute inset-0 bg-gradient-to-r from-primary-light/20 via-secondary/20 to-primary-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
 39:                 </a>
 40:                 <a 
 41:                     href="tel:+18005551234" 
 42:                     class="nav-link inline-flex items-center justify-center gap-2 text-text-muted-light dark:text-text-muted-dark hover:text-[#2d7984] dark:hover:text-[#58cbe0] transition-all duration-300 cursor-pointer rounded-lg px-4 py-2 hover:bg-[#2d7984]/5 dark:hover:bg-[#58cbe0]/10 group"
 43:                     aria-label="Call (800) 555-1234"
 44:                 >
 45:                     <PhoneIcon class="text-text-muted-light dark:text-text-muted-dark group-hover:text-[#2d7984] dark:group-hover:text-[#58cbe0] transition-colors duration-300 group-hover:scale-110 transform" />
 46:                     <span class="text-lg font-medium group-hover:font-semibold transition-all duration-300">(800) 555-1234</span>
 47:                 </a>
 48:             </div>
 49:             
 50:             <p class="text-sm text-text-muted-light dark:text-text-muted-dark animate-fade-in-delay-3 transition-colors duration-300">
 51:                 <span class="inline-flex items-center gap-1">
 52:                     <ClockIcon width="16" height="16" class="text-text-muted-light dark:text-text-muted-dark transition-colors duration-300" />
 53:                     Available 9:00am - 8:00pm EST, 7 days a week
 54:                 </span>
 55:             </p>
 56:         </div>
 57:     </div>
 58: </div>
 59: 
 60: <style>
 61:     /* Hero section with theme-aware background gradients */
 62:     .hero-section {
 63:         position: relative;
 64:     }
 65:     
 66:     .hero-section::before {
 67:         content: '';
 68:         position: absolute;
 69:         top: 0;
 70:         left: 0;
 71:         right: 0;
 72:         bottom: 0;
 73:         background: 
 74:             radial-gradient(circle at 20% 20%, rgba(var(--color-primary-rgb), 0.03) 0%, transparent 50%),
 75:             radial-gradient(circle at 80% 80%, rgba(var(--color-accent-rgb), 0.03) 0%, transparent 50%);
 76:         pointer-events: none;
 77:         transition: background var(--theme-transition-duration) var(--theme-transition-easing);
 78:     }
 79:     
 80:     .dark .hero-section::before {
 81:         background: 
 82:             radial-gradient(circle at 20% 20%, rgba(var(--color-primary-light-rgb), 0.05) 0%, transparent 50%),
 83:             radial-gradient(circle at 80% 80%, rgba(var(--color-accent-rgb), 0.05) 0%, transparent 50%);
 84:     }
 85:     
 86:     /* Enhanced button styling with theme-aware shadows */
 87:     .btn-lg {
 88:         position: relative;
 89:         transition: 
 90:             transform 0.2s ease, 
 91:             box-shadow 0.2s ease,
 92:             background-color var(--theme-transition-duration) var(--theme-transition-easing);
 93:     }
 94:     
 95:     .btn-lg:hover {
 96:         transform: translateY(-2px);
 97:         box-shadow: 
 98:             0 6px 15px -3px rgba(var(--color-primary-rgb), 0.4),
 99:             0 2px 8px -1px rgba(var(--color-primary-rgb), 0.2);
100:     }
101:     
102:     .dark .btn-lg:hover {
103:         box-shadow: 
104:             0 6px 15px -3px rgba(var(--color-primary-light-rgb), 0.3),
105:             0 2px 8px -1px rgba(var(--color-primary-light-rgb), 0.15);
106:     }
107:     
108:     .btn-lg:active {
109:         transform: translateY(0);
110:         box-shadow: 
111:             0 2px 4px -1px rgba(var(--color-primary-rgb), 0.3);
112:     }
113:     
114:     .dark .btn-lg:active {
115:         box-shadow: 
116:             0 2px 4px -1px rgba(var(--color-primary-light-rgb), 0.2);
117:     }
118:     
119:     /* Smooth transitions for all hero elements */
120:     .hero-section * {
121:         transition: 
122:             color var(--theme-transition-duration) var(--theme-transition-easing),
123:             background-color var(--theme-transition-duration) var(--theme-transition-easing),
124:             border-color var(--theme-transition-duration) var(--theme-transition-easing);
125:     }
126:     
127:     @media (prefers-reduced-motion: reduce) {
128:         .btn-lg:hover {
129:             transform: none;
130:         }
131:         
132:         .hero-section::before {
133:             transition: none;
134:         }
135:         
136:         .hero-section * {
137:             transition: none;
138:         }
139:     }
140: </style>
```

## File: src/components/TestimonialsSection.astro
```
  1: ---
  2: import QuoteIcon from './icons/QuoteIcon.astro';
  3: import StarIcon from './icons/StarIcon.astro';
  4: ---
  5: 
  6: <div class="testimonials-section py-16 md:py-20 relative bg-gray-50 dark:bg-gray-900 transition-colors duration-300" id="testimonials">
  7:     <div class="container mx-auto px-4">
  8:         <!-- Section Header -->
  9:         <div class="text-center mb-16">
 10:             <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Client Success Stories</h2>
 11:             <p class="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300 transition-colors duration-300">Don't just take our word for it. See what our clients have to say about their debt relief journey.</p>
 12:         </div>
 13:         
 14:         <!-- Decorative Elements -->
 15:         <div class="absolute top-20 left-10 w-20 h-20 rounded-full blur-xl bg-primary/10 transition-colors duration-300"></div>
 16:         <div class="absolute bottom-20 right-10 w-32 h-32 rounded-full blur-xl bg-accent/10 transition-colors duration-300"></div>
 17:         
 18:         <!-- Testimonials Grid -->
 19:         <div class="testimonial-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 20:             <!-- Testimonial 1 -->
 21:             <div class="testimonial-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 md:p-8 rounded-xl shadow-md dark:shadow-gray-900 relative transition-all duration-300">
 22:                 <!-- Quote icon -->
 23:                 <div class="absolute -top-5 -left-2 opacity-20 text-primary transition-colors duration-300">
 24:                     <QuoteIcon class="w-8 h-8" />
 25:                 </div>
 26:                 
 27:                 <!-- Rating Stars -->
 28:                 <div class="flex items-center mb-4 mt-2">
 29:                     <StarIcon class="w-5 h-5 text-warning transition-colors duration-300" />
 30:                     <StarIcon class="w-5 h-5 text-warning transition-colors duration-300" />
 31:                     <StarIcon class="w-5 h-5 text-warning transition-colors duration-300" />
 32:                     <StarIcon class="w-5 h-5 text-warning transition-colors duration-300" />
 33:                     <StarIcon class="w-5 h-5 text-warning transition-colors duration-300" />
 34:                 </div>
 35:                 
 36:                 <!-- Testimonial Text -->
 37:                 <blockquote class="mb-6">
 38:                     <p class="italic text-gray-600 dark:text-gray-300 transition-colors duration-300">"I was drowning in nearly $30,000 of credit card debt with high interest rates. The Debt Freedom Toolkit team helped me settle for just $15,400 - that's almost 50% savings! I'm now completely debt-free and rebuilding my credit."</p>
 39:                 </blockquote>
 40:                 
 41:                 <!-- Client Info -->
 42:                 <div class="flex items-center">
 43:                     <div class="avatar-placeholder rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4 bg-primary/20 text-primary transition-colors duration-300">MS</div>
 44:                     <div>
 45:                         <h4 class="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Michael S.</h4>
 46:                         <p class="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Chicago, IL • Saved $14,600</p>
 47:                     </div>
 48:                 </div>
 49:             </div>
 50:             
 51:             <!-- Testimonial 2 -->
 52:             <div class="testimonial-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 md:p-8 rounded-xl shadow-md dark:shadow-gray-900 relative transition-all duration-300">
 53:                 <!-- Quote icon -->
 54:                 <div class="absolute -top-5 -left-2 opacity-20 text-primary transition-colors duration-300">
 55:                     <QuoteIcon class="w-8 h-8" />
 56:                 </div>
 57:                 
 58:                 <!-- Rating Stars -->
 59:                 <div class="flex items-center mb-4 mt-2">
 60:                     <StarIcon class="w-5 h-5 text-warning transition-colors duration-300" />
 61:                     <StarIcon class="w-5 h-5 text-warning transition-colors duration-300" />
 62:                     <StarIcon class="w-5 h-5 text-warning transition-colors duration-300" />
 63:                     <StarIcon class="w-5 h-5 text-warning transition-colors duration-300" />
 64:                     <StarIcon class="w-5 h-5 text-warning transition-colors duration-300" />
 65:                 </div>
 66:                 
 67:                 <!-- Testimonial Text -->
 68:                 <blockquote class="mb-6">
 69:                     <p class="italic text-gray-600 dark:text-gray-300 transition-colors duration-300">"After my medical emergency, I had over $22,000 in credit card debt that I used to cover expenses. I couldn't even make the minimum payments anymore. Debt Freedom Toolkit settled my debt for about 45% of what I owed. The relief is indescribable."</p>
 70:                 </blockquote>
 71:                 
 72:                 <!-- Client Info -->
 73:                 <div class="flex items-center">
 74:                     <div class="avatar-placeholder rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4 bg-primary/20 text-primary transition-colors duration-300">JR</div>
 75:                     <div>
 76:                         <h4 class="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Jennifer R.</h4>
 77:                         <p class="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Atlanta, GA • Saved $12,100</p>
 78:                     </div>
 79:                 </div>
 80:             </div>
 81:             
 82:             <!-- Testimonial 3 -->
 83:             <div class="testimonial-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 md:p-8 rounded-xl shadow-md dark:shadow-gray-900 relative transition-all duration-300">
 84:                 <!-- Quote icon -->
 85:                 <div class="absolute -top-5 -left-2 opacity-20 text-primary transition-colors duration-300">
 86:                     <QuoteIcon class="w-8 h-8" />
 87:                 </div>
 88:                 
 89:                 <!-- Rating Stars -->
 90:                 <div class="flex items-center mb-4 mt-2">
 91:                     <StarIcon class="w-5 h-5 text-warning transition-colors duration-300" />
 92:                     <StarIcon class="w-5 h-5 text-warning transition-colors duration-300" />
 93:                     <StarIcon class="w-5 h-5 text-warning transition-colors duration-300" />
 94:                     <StarIcon class="w-5 h-5 text-warning transition-colors duration-300" />
 95:                     <StarIcon class="w-5 h-5 text-warning transition-colors duration-300" />
 96:                 </div>
 97:                 
 98:                 <!-- Testimonial Text -->
 99:                 <blockquote class="mb-6">
100:                     <p class="italic text-gray-600 dark:text-gray-300 transition-colors duration-300">"My wife and I accumulated $42,000 in credit card debt over the years. The interest alone was killing us. The Debt Freedom Toolkit team negotiated settlements with all 6 credit card companies, and we ended up paying just $23,100. We completed the program in 28 months!"</p>
101:                 </blockquote>
102:                 
103:                 <!-- Client Info -->
104:                 <div class="flex items-center">
105:                     <div class="avatar-placeholder rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4 bg-primary/20 text-primary transition-colors duration-300">DT</div>
106:                     <div>
107:                         <h4 class="font-semibold text-gray-900 dark:text-white transition-colors duration-300">David T.</h4>
108:                         <p class="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Phoenix, AZ • Saved $18,900</p>
109:                     </div>
110:                 </div>
111:             </div>
112:         </div>
113:         
114: 
115:     </div>
116: </div>
117: 
118: <style>
119:     .testimonial-card {
120:         transition: transform 0.3s ease, box-shadow 0.3s ease;
121:     }
122:     
123:     .testimonial-card:hover {
124:         transform: translateY(-8px);
125:     }
126:     
127:     @media (prefers-reduced-motion: reduce) {
128:         .testimonial-card:hover {
129:             transform: none;
130:         }
131:     }
132: </style>
```

## File: src/components/ThemeToggle.astro
```
  1: ---
  2: import SunIcon from './icons/SunIcon.astro';
  3: import SystemIcon from './icons/SystemIcon.astro';
  4: import MoonIcon from './icons/MoonIcon.astro';
  5: ---
  6: 
  7: <div class="theme-toggle-container" data-theme-toggle>
  8:   <div class="theme-toggle" role="radiogroup" aria-label="Theme Selection" tabindex="0">
  9:     <button 
 10:       class="theme-option" 
 11:       data-theme="light" 
 12:       role="radio" 
 13:       aria-checked="false"
 14:       aria-label="Light theme">
 15:       <SunIcon class="theme-icon" />
 16:       <span class="sr-only">Light theme</span>
 17:     </button>
 18:     
 19:     <button 
 20:       class="theme-option" 
 21:       data-theme="system" 
 22:       role="radio" 
 23:       aria-checked="false"
 24:       aria-label="System theme">
 25:       <SystemIcon class="theme-icon" />
 26:       <span class="sr-only">System theme</span>
 27:     </button>
 28:     
 29:     <button 
 30:       class="theme-option" 
 31:       data-theme="dark" 
 32:       role="radio" 
 33:       aria-checked="false"
 34:       aria-label="Dark theme">
 35:       <MoonIcon class="theme-icon" />
 36:       <span class="sr-only">Dark theme</span>
 37:     </button>
 38:   </div>
 39:   
 40:   <div aria-live="polite" class="sr-only" id="theme-announcement"></div>
 41: </div>
 42: 
 43: <style>
 44:   .theme-toggle-container {
 45:     position: relative;
 46:   }
 47:   
 48:   .theme-toggle {
 49:     display: flex;
 50:     border-radius: 9999px;
 51:     overflow: hidden;
 52:     border: 1px solid var(--color-border);
 53:     background: var(--color-form-bg);
 54:     box-shadow: 0 2px 4px var(--shadow-color-light);
 55:     transition: border-color 0.2s ease, box-shadow 0.2s ease;
 56:   }
 57:   
 58:   .theme-toggle:focus-visible {
 59:     outline: 3px solid var(--color-primary);
 60:     outline-offset: 2px;
 61:   }
 62:   
 63:   .theme-option {
 64:     display: flex;
 65:     align-items: center;
 66:     justify-content: center;
 67:     padding: 0.5rem;
 68:     cursor: pointer;
 69:     width: 40px;
 70:     height: 40px;
 71:     background: transparent;
 72:     border: none;
 73:     color: var(--color-text);
 74:     transition: all 0.2s ease;
 75:   }
 76:   
 77:   .theme-option:hover {
 78:     background-color: rgba(var(--color-primary-rgb, 45, 121, 132), 0.1);
 79:   }
 80:   
 81:   .theme-option.selected {
 82:     background-color: var(--color-primary);
 83:     color: white;
 84:   }
 85:   
 86:   .theme-option:focus-visible {
 87:     outline: 3px solid var(--color-primary);
 88:     outline-offset: 2px;
 89:     z-index: 1;
 90:   }
 91:   
 92:   .dark .theme-option:focus-visible {
 93:     outline: 3px solid #58cbe0;
 94:   }
 95:   
 96:   .theme-icon {
 97:     transition: transform 0.3s ease;
 98:   }
 99:   
100:   .theme-option:hover .theme-icon {
101:     transform: rotate(15deg);
102:   }
103:   
104:   @media (prefers-reduced-motion: reduce) {
105:     .theme-icon {
106:       transition: none;
107:     }
108:     
109:     .theme-option,
110:     .theme-toggle {
111:       transition: none;
112:     }
113:     
114:     .theme-option:hover .theme-icon {
115:       transform: none;
116:     }
117:   }
118:   
119:   .sr-only {
120:     position: absolute;
121:     width: 1px;
122:     height: 1px;
123:     padding: 0;
124:     margin: -1px;
125:     overflow: hidden;
126:     clip: rect(0, 0, 0, 0);
127:     white-space: nowrap;
128:     border-width: 0;
129:   }
130: </style>
131: 
132: <script>
133:   function getCurrentTheme() {
134:     try {
135:       if (typeof window === 'undefined') return 'system';
136:       if (window.themeManager && typeof window.themeManager.getTheme === 'function') {
137:         return window.themeManager.getTheme();
138:       }
139:       return localStorage.getItem('theme') || 'system';
140:     } catch (error) {
141:       console.warn('Error getting current theme:', error);
142:       return 'system';
143:     }
144:   }
145: 
146:   function setToggleState(theme) {
147:     try {
148:       const options = document.querySelectorAll('.theme-option');
149:       options.forEach(option => {
150:         const optionTheme = option.getAttribute('data-theme');
151:         const isSelected = optionTheme === theme;
152:         option.setAttribute('aria-checked', isSelected.toString());
153:         option.classList.toggle('selected', isSelected);
154:       });
155:     } catch (error) {
156:       console.warn('Error setting toggle state:', error);
157:     }
158:   }
159: 
160:   function updateTheme(theme) {
161:     try {
162:       if (window.themeManager && typeof window.themeManager.setTheme === 'function') {
163:         window.themeManager.setTheme(theme);
164:       } else {
165:         localStorage.setItem('theme', theme);
166:         
167:         if (theme === 'system') {
168:           const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
169:           document.documentElement.classList.toggle('dark', systemTheme === 'dark');
170:           document.documentElement.classList.toggle('dark-theme', systemTheme === 'dark');
171:           document.documentElement.classList.toggle('light-theme', systemTheme === 'light');
172:         } else {
173:           document.documentElement.classList.toggle('dark', theme === 'dark');
174:           document.documentElement.classList.toggle('dark-theme', theme === 'dark');
175:           document.documentElement.classList.toggle('light-theme', theme === 'light');
176:         }
177:       }
178:       
179:       setToggleState(theme);
180:       
181:       const announcement = document.getElementById('theme-announcement');
182:       if (announcement) {
183:         let message = `Theme changed to ${theme}`;
184:         if (theme === 'system') {
185:           const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
186:           message += ` (using ${systemTheme} theme based on system preference)`;
187:         }
188:         announcement.textContent = message;
189:       }
190:     } catch (error) {
191:       console.error('Error updating theme:', error);
192:     }
193:   }
194: 
195:   document.addEventListener('DOMContentLoaded', () => {
196:     try {
197:       const options = document.querySelectorAll('.theme-option');
198:       
199:       if (!options || options.length === 0) {
200:         console.warn('Theme toggle elements not found');
201:         return;
202:       }
203:       
204:       const currentTheme = getCurrentTheme();
205:       setToggleState(currentTheme);
206:       
207:       options.forEach((option, index) => {
208:         option.addEventListener('click', () => {
209:           const theme = option.dataset.theme;
210:           if (theme) {
211:             updateTheme(theme);
212:           }
213:         });
214:         
215:         option.addEventListener('keydown', (e) => {
216:           if (e.key === ' ' || e.key === 'Enter') {
217:             e.preventDefault();
218:             option.click();
219:           } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
220:             e.preventDefault();
221:             const nextIndex = (index + 1) % options.length;
222:             options[nextIndex].focus();
223:           } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
224:             e.preventDefault();
225:             const prevIndex = (index - 1 + options.length) % options.length;
226:             options[prevIndex].focus();
227:           }
228:         });
229:       });
230:       
231:       window.addEventListener('theme-change', () => {
232:         const newTheme = getCurrentTheme();
233:         setToggleState(newTheme);
234:       });
235:       
236:     } catch (error) {
237:       console.error('Error initializing theme toggle:', error);
238:     }
239:   });
240: </script>
```

## File: src/layouts/LandingLayout.astro
```
  1: ---
  2: import '../styles/globals.css';
  3: import '../styles/print.css';
  4: import '@fontsource-variable/inter/wght.css';
  5: import interWoff2 from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
  6: import LandingHeader from '../components/debt-relief/LandingHeader.astro';
  7: import Footer from '../components/Footer.astro';
  8: 
  9: interface Props {
 10:     title: string;
 11: }
 12: 
 13: const { title } = Astro.props;
 14: ---
 15: 
 16: <!doctype html>
 17: <html lang="en" class="custom-scrollbar">
 18:     <head>
 19:         <meta charset="UTF-8" />
 20:         <title>{title}</title>
 21:         <meta name="viewport" content="width=device-width" />
 22:         <meta name="generator" content={Astro.generator} />
 23:         <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
 24:         <link rel="preload" as="font" type="font/woff2" href={interWoff2} crossorigin />
 25:         <!-- Additional meta tags for landing page SEO -->
 26:         <meta name="description" content="Professional debt settlement program to help you reduce what you owe and become debt-free faster than making minimum payments." />
 27:         <meta property="og:title" content="Debt Freedom Toolkit - Break Free From Credit Card Debt" />
 28:         <meta property="og:description" content="Our professional debt settlement program can help you reduce what you owe and become debt-free faster than making minimum payments." />
 29:         <meta property="og:url" content="https://debtfreedomtoolkit.com" />
 30:         <link rel="canonical" href="https://debtfreedomtoolkit.com" />
 31:         
 32:         <!-- Theme Manager Script - executed before page renders to prevent FOUC -->
 33:         <script is:inline>
 34:             // Immediate theme application to prevent FOUC (Flash of Unstyled Content)
 35:             (function () {
 36:                 // Theme constants
 37:                 const THEMES = { LIGHT: 'light', DARK: 'dark', SYSTEM: 'system' };
 38:                 const STORAGE_KEY = 'theme';
 39:                 
 40:                 // Utility functions
 41:                 function getStorageItem(key, fallback) {
 42:                     try {
 43:                         return localStorage.getItem(key) || fallback;
 44:                     } catch (error) {
 45:                         console.warn('localStorage access failed:', error);
 46:                         return fallback;
 47:                     }
 48:                 }
 49:                 
 50:                 function getSystemPreference() {
 51:                     try {
 52:                         return window.matchMedia('(prefers-color-scheme: dark)').matches 
 53:                             ? THEMES.DARK 
 54:                             : THEMES.LIGHT;
 55:                     } catch (error) {
 56:                         console.warn('Media query not supported:', error);
 57:                         return THEMES.LIGHT;
 58:                     }
 59:                 }
 60:                 
 61:                 function applyTheme(theme) {
 62:                     try {
 63:                         const documentElement = document.documentElement;
 64:                         const shouldUseDarkMode = theme === THEMES.DARK || 
 65:                             (theme === THEMES.SYSTEM && getSystemPreference() === THEMES.DARK);
 66:                         
 67:                         // Remove all theme classes
 68:                         documentElement.classList.remove('dark', 'dark-theme', 'light-theme');
 69:                         
 70:                         // Apply appropriate theme classes
 71:                         if (shouldUseDarkMode) {
 72:                             documentElement.classList.add('dark', 'dark-theme');
 73:                             documentElement.setAttribute('data-theme', THEMES.DARK);
 74:                         } else {
 75:                             documentElement.classList.add('light-theme');
 76:                             documentElement.setAttribute('data-theme', THEMES.LIGHT);
 77:                         }
 78:                     } catch (error) {
 79:                         console.error('Theme application failed:', error);
 80:                     }
 81:                 }
 82:                 
 83:                 // Get and apply initial theme
 84:                 const storedTheme = getStorageItem(STORAGE_KEY, THEMES.SYSTEM);
 85:                 applyTheme(storedTheme);
 86:                 
 87:                 // Basic theme manager for immediate availability
 88:                 window.themeManager = {
 89:                     getTheme: function() {
 90:                         return getStorageItem(STORAGE_KEY, THEMES.SYSTEM);
 91:                     },
 92:                     setTheme: function(theme) {
 93:                         if (!Object.values(THEMES).includes(theme)) {
 94:                             console.warn('Invalid theme value:', theme);
 95:                             return;
 96:                         }
 97:                         try {
 98:                             localStorage.setItem(STORAGE_KEY, theme);
 99:                             applyTheme(theme);
100:                             
101:                             // Dispatch theme change event
102:                             const resolvedTheme = theme === THEMES.SYSTEM ? getSystemPreference() : theme;
103:                             window.dispatchEvent(new CustomEvent('theme-change', {
104:                                 detail: { theme, resolvedTheme }
105:                             }));
106:                         } catch (error) {
107:                             console.error('Theme setting failed:', error);
108:                         }
109:                     },
110:                     THEMES: THEMES
111:                 };
112:             })();
113:         </script>
114:     </head>
115:     <body class="antialiased text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
116:         <div class="flex flex-col min-h-screen px-4 sm:px-8 md:px-12 relative bg-white dark:bg-gray-900 transition-colors duration-300">
117:             <!-- Background Pattern -->
118:             <div class="absolute inset-0 overflow-hidden pointer-events-none">
119:                 <div class="fixed inset-0 z-0">
120:                     <!-- Light mode gradients (hidden in dark mode) -->
121:                     <div class="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/5 to-transparent dark:hidden transition-opacity duration-300"></div>
122:                     <div class="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-primary/5 to-transparent dark:hidden transition-opacity duration-300"></div>
123: 
124:                     <!-- Dark mode gradients (hidden in light mode) -->
125:                     <div class="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary-light/10 to-transparent hidden dark:block transition-opacity duration-300"></div>
126:                     <div class="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-primary-light/10 to-transparent hidden dark:block transition-opacity duration-300"></div>
127: 
128:                     <!-- Noise texture overlay -->
129:                     <div class="absolute inset-0 opacity-20 dark:opacity-30 bg-noise"></div>
130:                 </div>
131:             </div>
132:             
133:             <div class="flex flex-col w-full max-w-5xl mx-auto grow py-4 sm:py-6 md:py-8 relative z-10">
134:                 <LandingHeader />
135:                 <main class="grow"><slot /></main>
136:                 <Footer />
137:             </div>
138:         </div>
139:     </body>
140: </html>
141: 
142: <style>
143:     .bg-noise {
144:         background-image: var(--background-image-noise);
145:     }
146: 
147:     /* Use CSS variables defined in globals.css for theme-specific noise pattern */
148:     :root {
149:         --background-image-noise: linear-gradient(to bottom, rgba(250, 250, 255, 0.05), rgba(250, 250, 255, 0.1)), url('/images/noise.png');
150:     }
151: 
152:     .dark {
153:         --background-image-noise: linear-gradient(to bottom, rgba(10, 15, 25, 0.1), rgba(10, 15, 25, 0.2)), url('/images/noise.png');
154:     }
155:     
156:     /* Improve font rendering */
157:     body {
158:         text-rendering: optimizeLegibility;
159:         -webkit-font-smoothing: antialiased;
160:         -moz-osx-font-smoothing: grayscale;
161:     }
162:     
163:     /* Smooth scrolling for better UX */
164:     html {
165:         scroll-behavior: smooth;
166:     }
167:     
168:     /* Ensure proper page height on mobile */
169:     @media (max-width: 640px) {
170:         html, body {
171:             min-height: 100%;
172:             height: -webkit-fill-available;
173:         }
174:     }
175:     
176:     /* Ensure proper spacing on various device sizes */
177:     @media (min-width: 1280px) {
178:         .max-w-5xl {
179:             max-width: 64rem;
180:         }
181:     }
182:     
183:     /* Prevent content from being too wide on extra large screens */
184:     @media (min-width: 1536px) {
185:         body {
186:             font-size: 1.05rem;
187:         }
188:     }
189:     
190:     /* Handle iOS-specific issues */
191:     @supports (-webkit-touch-callout: none) {
192:         .min-h-screen {
193:             min-height: -webkit-fill-available;
194:         }
195:     }
196: </style>
```

## File: src/pages/debt-relief.astro
```
  1: ---
  2: import LandingLayout from '../layouts/LandingLayout.astro';
  3: import { Image } from 'astro:assets';
  4: 
  5: // Page metadata
  6: const pageTitle = 'Break Free From Credit Card Debt - Save Up To 50%';
  7: const pageDescription = 'Professional debt settlement program to help you reduce what you owe and become debt-free faster';
  8: 
  9: // Import debt relief section components
 10: import DebtReliefHero from '../components/debt-relief/Hero.astro';
 11: import QualificationForm from '../components/debt-relief/QualificationForm.astro';
 12: import Benefits from '../components/debt-relief/Benefits.astro';
 13: import ProcessSteps from '../components/debt-relief/ProcessSteps.astro';
 14: import Testimonials from '../components/debt-relief/Testimonials.astro';
 15: import ComparisonTable from '../components/debt-relief/ComparisonTable.astro';
 16: import DebtCalculator from '../components/debt-relief/DebtCalculator.astro';
 17: import FAQSection from '../components/debt-relief/FAQSection.astro';
 18: import Disclosures from '../components/debt-relief/Disclosures.astro';
 19: import FinalCTA from '../components/debt-relief/FinalCTA.astro';
 20: import TrustIndicators from '../components/TrustIndicators.astro';
 21: ---
 22: 
 23: <LandingLayout title={pageTitle}>
 24:     <!-- Hero Section -->
 25:     <div class="py-16 sm:py-20 md:py-24">
 26:         <DebtReliefHero 
 27:             title="Break Free From Credit Card Debt - Save Up To 50%"
 28:             subtitle="Reduce Your Debt By Thousands | Become Debt-Free in 12-36 Months"
 29:             description="Are you struggling with $15,000+ in credit card debt? Our professional debt settlement program can help you reduce what you owe and become debt-free faster than making minimum payments."
 30:             primaryCta={{
 31:                 text: "Get Your Free Consultation Now",
 32:                 url: "#qualification-form"
 33:             }}
 34:             phoneNumber="(800) 555-1234"
 35:             availability="Available 9:00am - 8:00pm EST, 7 days a week"
 36:         />
 37:     </div>
 38:     
 39:     <!-- Trust Indicators -->
 40:     <div class="pb-16 border-b border-border">
 41:         <TrustIndicators />
 42:     </div>
 43: 
 44:     <!-- Qualification Form Section -->
 45:     <section id="qualification-form" class="py-16 sm:py-20">
 46:         <h2 class="mb-10 text-center">You Could Save Thousands - See If You Qualify in 30 Seconds</h2>
 47:         <div class="max-w-lg mx-auto">
 48:             <QualificationForm />
 49:         </div>
 50:     </section>
 51: 
 52:     <!-- Benefits Section -->
 53:     <section class="py-16 sm:py-20 bg-background-form/30 border-y border-border">
 54:         <div class="max-w-5xl mx-auto">
 55:             <h2 class="mb-12 text-center">Why Choose Our Debt Settlement Program?</h2>
 56:             <Benefits />
 57:         </div>
 58:     </section>
 59: 
 60:     <!-- Process Steps Section -->
 61:     <section class="py-16 sm:py-20">
 62:         <div class="max-w-5xl mx-auto">
 63:             <h2 class="mb-12 text-center">How It Works - 3 Simple Steps</h2>
 64:             <ProcessSteps />
 65:         </div>
 66:     </section>
 67:     
 68:     <!-- Debt Calculator Section -->
 69:     <section class="py-16 sm:py-20 bg-background-form/30 border-y border-border">
 70:         <div class="max-w-4xl mx-auto">
 71:             <h2 class="mb-12 text-center">Calculate Your Debt Savings</h2>
 72:             <DebtCalculator />
 73:         </div>
 74:     </section>
 75: 
 76:     <!-- Testimonials Section -->
 77:     <section class="py-16 sm:py-20 bg-background-form/30 border-y border-border" id="testimonials-section">
 78:         <div class="max-w-5xl mx-auto">
 79:             <h2 class="mb-12 text-center">Client Success Stories</h2>
 80:             <Testimonials />
 81:         </div>
 82:     </section>
 83: 
 84:     <!-- Comparison Table Section -->
 85:     <section class="py-16 sm:py-20">
 86:         <div class="max-w-5xl mx-auto">
 87:             <h2 class="mb-12 text-center">Compare Your Options</h2>
 88:             <ComparisonTable />
 89:         </div>
 90:     </section>
 91: 
 92:     <!-- FAQ Section -->
 93:     <section id="faq" class="py-16 sm:py-20 bg-background-form/30 border-y border-border">
 94:         <div class="max-w-3xl mx-auto">
 95:             <h2 class="mb-12 text-center">Frequently Asked Questions</h2>
 96:             <FAQSection />
 97:         </div>
 98:     </section>
 99: 
100:     <!-- Disclosures Section -->
101:     <section class="py-16">
102:         <div class="max-w-4xl mx-auto">
103:             <h2 class="mb-8 text-center">Important Program Disclosures</h2>
104:             <Disclosures />
105:         </div>
106:     </section>
107: 
108:     <!-- Final CTA Section -->
109:     <section class="py-16 sm:py-20">
110:         <div class="max-w-2xl mx-auto">
111:             <FinalCTA />
112:         </div>
113:     </section>
114: </LandingLayout>
115: 
116: <style>
117:     /* Keep only the basic styling needed for this page */
118:     h2 {
119:         position: relative;
120:     }
121:     
122:     h2::after {
123:         content: "";
124:         position: absolute;
125:         bottom: -0.75rem;
126:         left: 50%;
127:         transform: translateX(-50%);
128:         width: 100px;
129:         height: 3px;
130:         background-color: var(--color-primary);
131:         border-radius: 3px;
132:     }
133:     
134:     @media (min-width: 768px) {
135:         section {
136:             scroll-margin-top: 80px;
137:         }
138:     }
139: </style>
```

## File: src/pages/index.astro
```
 1: ---
 2: import Layout from '../layouts/Layout.astro';
 3: import EnhancedHero from '../components/EnhancedHero.astro';
 4: import DebtReliefForm from '../components/DebtReliefForm.astro';
 5: import BenefitsSection from '../components/BenefitsSection.astro';
 6: import TestimonialsSection from '../components/TestimonialsSection.astro';
 7: import CTASection from '../components/CTASection.astro';
 8: import TrustIndicators from '../components/TrustIndicators.astro';
 9: ---
10: 
11: <Layout title="Break Free From Credit Card Debt - Save Up To 50% | Debt Freedom Toolkit">
12:     <EnhancedHero />
13:     <TrustIndicators />
14:     <BenefitsSection />
15:     <TestimonialsSection />
16:     <DebtReliefForm />
17:     <CTASection />
18: </Layout>
```

## File: tailwind.config.js
```javascript
  1: /** @type {import('tailwindcss').Config} */
  2: export default {
  3:   content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  4:   darkMode: 'class',
  5:   theme: {
  6:     extend: {
  7:       // Transition utilities for dark mode
  8:       transitionProperty: {
  9:         'theme': 'color, background-color, border-color, box-shadow, outline-color, fill, stroke, opacity',
 10:         'colors': 'color, background-color, border-color',
 11:         'backgrounds': 'background-color, background-image',
 12:         'borders': 'border-color, border-width, border-opacity',
 13:         'shadows': 'box-shadow, text-shadow',
 14:         'layout': 'width, height, margin, padding',
 15:         'all-theme': 'color, background-color, border-color, box-shadow, outline-color, fill, stroke, opacity, transform, filter',
 16:       },
 17:       transitionDuration: {
 18:         '50': '50ms',
 19:         '250': '250ms',
 20:         '400': '400ms',
 21:         '600': '600ms',
 22:         '800': '800ms',
 23:         '1200': '1200ms',
 24:         'theme-fast': '150ms',
 25:         'theme': '250ms',
 26:         'theme-slow': '400ms',
 27:       },
 28:       transitionTimingFunction: {
 29:         'theme': 'cubic-bezier(0.4, 0, 0.2, 1)',
 30:         'theme-in': 'cubic-bezier(0.4, 0, 1, 1)',
 31:         'theme-out': 'cubic-bezier(0, 0, 0.2, 1)',
 32:         'theme-smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
 33:         'bounce-light': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
 34:       },
 35:       colors: {
 36:         primary: {
 37:           // Base colors
 38:           DEFAULT: '#2d7984',     // Base primary color
 39:           light: '#58cbe0',       // Light variant
 40:           dark: '#1d5058',        // Dark variant
 41: 
 42:           // Hover states
 43:           hover: '#266974',       // Base hover state
 44:           lightHover: '#4bbbce',  // Light variant hover
 45:           darkHover: '#15373e',   // Dark variant hover
 46: 
 47:           // Active states
 48:           active: '#1d5058',      // Base active state
 49:           lightActive: '#3eafc2', // Light variant active
 50:           darkActive: '#102b30',  // Dark variant active
 51: 
 52:           // Focus states
 53:           focus: '#2d7984',       // Base focus state
 54:           lightFocus: '#58cbe0',  // Light variant focus
 55:           darkFocus: '#1d5058',   // Dark variant focus
 56: 
 57:           // Disabled states
 58:           disabled: '#a3c5cb',    // Base disabled state
 59:           lightDisabled: '#b8e0ea', // Light variant disabled
 60:           darkDisabled: '#6a8a8f', // Dark variant disabled
 61:           
 62:           // Text on primary backgrounds
 63:           textOnPrimary: '#ffffff',      // Text on base primary
 64:           textOnLight: '#1a2234',        // Text on light variant
 65:           textOnDark: '#ffffff',         // Text on dark variant
 66:         },
 67:         secondary: {
 68:           // Base colors
 69:           DEFAULT: '#0062b3',     // Base secondary color
 70:           light: '#4a94d8',       // Light variant
 71:           dark: '#004b8c',        // Dark variant
 72: 
 73:           // Hover states
 74:           hover: '#0055a0',       // Base hover state
 75:           lightHover: '#3a85c9',  // Light variant hover
 76:           darkHover: '#003e73',   // Dark variant hover
 77: 
 78:           // Active states
 79:           active: '#00488c',      // Base active state
 80:           lightActive: '#2a75b9', // Light variant active
 81:           darkActive: '#00315c',  // Dark variant active
 82: 
 83:           // Focus states
 84:           focus: '#0062b3',       // Base focus state
 85:           lightFocus: '#4a94d8',  // Light variant focus
 86:           darkFocus: '#004b8c',   // Dark variant focus
 87: 
 88:           // Disabled states
 89:           disabled: '#7da7d1',    // Base disabled state
 90:           lightDisabled: '#9cc0e8', // Light variant disabled
 91:           darkDisabled: '#495d7a', // Dark variant disabled
 92:           
 93:           // Text on secondary backgrounds
 94:           textOnSecondary: '#ffffff',      // Text on base secondary
 95:           textOnLight: '#1a2234',        // Text on light variant
 96:           textOnDark: '#ffffff',         // Text on dark variant
 97:         },
 98:         accent: {
 99:           // Base colors
100:           DEFAULT: '#58cbe0',     // Base accent color (teal)
101:           light: '#7fdff2',       // Light variant
102:           dark: '#3ba6b9',        // Dark variant
103:           warm: '#F8C88F',        // Warm accent (peach)
104:           warmLight: '#fbd7ab',   // Light warm variant
105:           warmDark: '#f6b973',    // Dark warm variant
106: 
107:           // Hover states
108:           hover: '#42bfd5',       // Base hover state
109:           lightHover: '#6dd3e7',  // Light variant hover
110:           darkHover: '#3291a2',   // Dark variant hover
111:           warmHover: '#f7bd7c',   // Warm variant hover
112: 
113:           // Active states
114:           active: '#37a4b8',      // Base active state
115:           lightActive: '#5cc8dc', // Light variant active
116:           darkActive: '#297c8c',  // Dark variant active
117:           warmActive: '#f5b269',  // Warm variant active
118: 
119:           // Focus states
120:           focus: '#58cbe0',       // Base focus state
121:           lightFocus: '#7fdff2',  // Light variant focus
122:           darkFocus: '#3ba6b9',   // Dark variant focus
123:           warmFocus: '#F8C88F',   // Warm variant focus
124: 
125:           // Disabled states
126:           disabled: '#aadbe5',    // Base disabled state
127:           lightDisabled: '#c4ecf5', // Light variant disabled
128:           darkDisabled: '#78a7b0', // Dark variant disabled
129:           warmDisabled: '#f9dcc0', // Warm variant disabled
130:           
131:           // Text on accent backgrounds
132:           textOnAccent: '#1a2234',      // Text on base accent
133:           textOnLight: '#1a2234',        // Text on light variant
134:           textOnDark: '#ffffff',         // Text on dark variant
135:           textOnWarm: '#1a2234',         // Text on warm variant
136:           textOnWarmLight: '#1a2234',    // Text on light warm variant
137:           textOnWarmDark: '#1a2234',     // Text on dark warm variant
138:         },
139:         background: {
140:           // Base background colors
141:           DEFAULT: '#ffffff',     // Light mode default
142:           light: '#ffffff',       // Explicit light mode
143:           dark: '#1a2234',        // Dark mode (dark blue)
144:           
145:           // Form backgrounds
146:           form: {
147:             DEFAULT: '#F7FAFC',   // Light mode default
148:             light: '#F7FAFC',     // Light form background (very light gray)
149:             dark: '#202b3d',      // Dark form background (darker blue)
150:           },
151:           
152:           // Input backgrounds
153:           input: {
154:             DEFAULT: '#EDF2F7',   // Light mode default
155:             light: '#EDF2F7',     // Light input background (light gray)
156:             dark: '#151d2c',      // Dark input background (darkest blue)
157:           },
158:           
159:           // Surface backgrounds for cards, panels, etc.
160:           surface: {
161:             DEFAULT: '#ffffff',   // Light mode default
162:             light: '#ffffff',     // Light surface (white)
163:             dark: '#1a2234',      // Dark surface (same as main dark bg)
164:             elevated: {
165:               light: '#ffffff',   // Light elevated surface
166:               dark: '#202b3d',    // Dark elevated surface (slightly lighter)
167:             }
168:           },
169:           
170:           // Overlay backgrounds
171:           overlay: {
172:             light: 'rgba(0, 0, 0, 0.5)',      // Dark overlay for light mode
173:             dark: 'rgba(0, 0, 0, 0.7)',       // Darker overlay for dark mode
174:           }
175:         },
176:         text: {
177:           // Primary text colors
178:           DEFAULT: '#1a2234',     // Light mode default (dark blue-gray)
179:           light: '#1a2234',       // Explicit light mode text
180:           dark: '#ffffff',        // Dark mode text (white)
181:           
182:           // Muted text colors
183:           muted: {
184:             DEFAULT: '#4A5568',   // Light mode default
185:             light: '#4A5568',     // Light mode muted (medium gray)
186:             dark: '#b0c0d0',      // Dark mode muted (light blue-gray)
187:           },
188:           
189:           // Secondary text colors
190:           secondary: {
191:             DEFAULT: '#718096',   // Light mode default
192:             light: '#718096',     // Light mode secondary (lighter gray)
193:             dark: '#a0aec0',      // Dark mode secondary (medium blue-gray)
194:           },
195:           
196:           // Button text colors
197:           button: {
198:             DEFAULT: '#ffffff',   // Default button text (white)
199:             primary: '#ffffff',   // Text on primary buttons
200:             accent: '#1a2234',    // Text on accent buttons (dark on light)
201:             outline: {
202:               light: '#1a2234',   // Text for outline buttons in light mode
203:               dark: '#ffffff',    // Text for outline buttons in dark mode
204:             }
205:           },
206:           
207:           // Placeholder text
208:           placeholder: {
209:             DEFAULT: '#718096',   // Light mode default
210:             light: '#718096',     // Light mode placeholder
211:             dark: '#8896ac',      // Dark mode placeholder (lighter for visibility)
212:           },
213:           
214:           // Inverse text (for use on opposite backgrounds)
215:           inverse: {
216:             light: '#ffffff',     // White text for dark backgrounds in light mode
217:             dark: '#1a2234',      // Dark text for light backgrounds in dark mode
218:           }
219:         },
220:         border: {
221:           // Base border colors
222:           DEFAULT: '#E2E8F0',     // Light mode default
223:           light: '#E2E8F0',       // Light mode border (light gray)
224:           dark: '#2D3748',        // Dark mode border (dark gray)
225:           
226:           // Focus border colors
227:           focus: {
228:             DEFAULT: '#2d7984',   // Default focus border (primary color)
229:             light: '#2d7984',     // Light mode focus
230:             dark: '#58cbe0',      // Dark mode focus (brighter for visibility)
231:           },
232:           
233:           // Subtle borders
234:           subtle: {
235:             light: '#F7FAFC',     // Very light border for light mode
236:             dark: '#1a2234',      // Subtle border for dark mode
237:           },
238:           
239:           // Error borders
240:           error: {
241:             DEFAULT: '#e53e3e',   // Default error border
242:             light: '#e53e3e',     // Light mode error
243:             dark: '#fc8181',      // Dark mode error (lighter for visibility)
244:           }
245:         },
246:         complementary: {
247:           // Complementary/neutral colors
248:           DEFAULT: '#F7FAFC',     // Light mode default
249:           light: '#F7FAFC',       // Light complementary (very light gray)
250:           dark: '#1a2234',        // Dark complementary (same as dark background)
251:           
252:           // Alternative complementary colors
253:           alt: {
254:             light: '#EDF2F7',     // Alternative light complementary
255:             dark: '#202b3d',      // Alternative dark complementary
256:           }
257:         },
258:         error: {
259:           // Error/danger colors
260:           DEFAULT: '#e53e3e',     // Light mode default
261:           light: '#e53e3e',       // Light mode error (red)
262:           dark: '#fc8181',        // Dark mode error (lighter red for visibility)
263:           
264:           // Error background colors
265:           bg: {
266:             light: '#fed7d7',     // Light error background
267:             dark: '#2d1b1b',      // Dark error background
268:           },
269:           
270:           // Error text colors
271:           text: {
272:             light: '#c53030',     // Light mode error text
273:             dark: '#feb2b2',      // Dark mode error text
274:           }
275:         },
276:         success: {
277:           // Success colors
278:           DEFAULT: '#10b981',     // Base success color
279:           light: '#10b981',       // Light mode success (green)
280:           dark: '#68d391',        // Dark mode success (lighter green)
281:           
282:           // Success background colors
283:           bg: {
284:             light: '#c6f6d5',     // Light success background
285:             dark: '#1a2e1a',      // Dark success background
286:           },
287:           
288:           // Success text colors
289:           text: {
290:             light: '#22543d',     // Light mode success text
291:             dark: '#9ae6b4',      // Dark mode success text
292:           }
293:         },
294:         warning: {
295:           // Warning colors
296:           DEFAULT: '#f59e0b',     // Base warning color
297:           light: '#f59e0b',       // Light mode warning (amber)
298:           dark: '#fbbf24',        // Dark mode warning (lighter amber)
299:           
300:           // Warning background colors
301:           bg: {
302:             light: '#fef3c7',     // Light warning background
303:             dark: '#2d2412',      // Dark warning background
304:           },
305:           
306:           // Warning text colors
307:           text: {
308:             light: '#92400e',     // Light mode warning text
309:             dark: '#fcd34d',      // Dark mode warning text
310:           }
311:         },
312:         info: {
313:           // Info colors
314:           DEFAULT: '#3b82f6',     // Base info color
315:           light: '#3b82f6',       // Light mode info (blue)
316:           dark: '#60a5fa',        // Dark mode info (lighter blue)
317:           
318:           // Info background colors
319:           bg: {
320:             light: '#dbeafe',     // Light info background
321:             dark: '#1e293b',      // Dark info background
322:           },
323:           
324:           // Info text colors
325:           text: {
326:             light: '#1e40af',     // Light mode info text
327:             dark: '#93c5fd',      // Dark mode info text
328:           }
329:         },
330:       },
331:       backgroundImage: {
332:         'noise': 'linear-gradient(to bottom, rgba(250, 250, 255, 0.05), rgba(250, 250, 255, 0.1)), url("/images/noise.png")',
333:       },
334:       boxShadow: {
335:         'cta': '0 20px 45px -10px rgba(0,0,0,.35)',
336:       }
337:     },
338:   },
339:   plugins: [
340:     // Dark mode transition plugin
341:     function({ addBase, addComponents, addUtilities, theme }) {
342:       // Add base transition styles for theme switching
343:       addBase({
344:         // Global transition base styles
345:         '*': {
346:           '@media (prefers-reduced-motion: no-preference)': {
347:             'transition-property': 'color, background-color, border-color, box-shadow, outline-color, fill, stroke',
348:             'transition-duration': theme('transitionDuration.theme'),
349:             'transition-timing-function': theme('transitionTimingFunction.theme'),
350:           }
351:         },
352:         
353:         // Respect reduced motion preference
354:         '@media (prefers-reduced-motion: reduce)': {
355:           '*': {
356:             'transition-property': 'none !important',
357:             'transition-duration': '0s !important',
358:             'animation': 'none !important',
359:           }
360:         },
361:         
362:         // Enhanced transitions for interactive elements
363:         'button, a, input, select, textarea': {
364:           '@media (prefers-reduced-motion: no-preference)': {
365:             'transition-property': 'color, background-color, border-color, box-shadow, outline-color, transform, opacity',
366:             'transition-duration': theme('transitionDuration.theme-fast'),
367:             'transition-timing-function': theme('transitionTimingFunction.theme'),
368:           }
369:         },
370:         
371:         // Smooth transitions for hover effects
372:         'button:hover, a:hover': {
373:           '@media (prefers-reduced-motion: no-preference)': {
374:             'transition-timing-function': theme('transitionTimingFunction.theme-out'),
375:           }
376:         },
377:         
378:         // SVG elements for icon transitions
379:         'svg': {
380:           '@media (prefers-reduced-motion: no-preference)': {
381:             'transition-property': 'fill, stroke, transform, opacity',
382:             'transition-duration': theme('transitionDuration.theme-fast'),
383:             'transition-timing-function': theme('transitionTimingFunction.theme'),
384:           }
385:         }
386:       });
387:       
388:       // Add component-level transitions
389:       addComponents({
390:         // Theme transition utility classes
391:         '.transition-theme': {
392:           'transition-property': 'color, background-color, border-color, box-shadow, outline-color, fill, stroke',
393:           'transition-duration': theme('transitionDuration.theme'),
394:           'transition-timing-function': theme('transitionTimingFunction.theme'),
395:         },
396:         
397:         '.transition-theme-fast': {
398:           'transition-property': 'color, background-color, border-color, box-shadow, outline-color, fill, stroke',
399:           'transition-duration': theme('transitionDuration.theme-fast'),
400:           'transition-timing-function': theme('transitionTimingFunction.theme'),
401:         },
402:         
403:         '.transition-theme-slow': {
404:           'transition-property': 'color, background-color, border-color, box-shadow, outline-color, fill, stroke',
405:           'transition-duration': theme('transitionDuration.theme-slow'),
406:           'transition-timing-function': theme('transitionTimingFunction.theme-smooth'),
407:         },
408:         
409:         '.transition-colors-smooth': {
410:           'transition-property': 'color, background-color, border-color',
411:           'transition-duration': theme('transitionDuration.theme'),
412:           'transition-timing-function': theme('transitionTimingFunction.theme-smooth'),
413:         },
414:         
415:         '.transition-shadows': {
416:           'transition-property': 'box-shadow, text-shadow',
417:           'transition-duration': theme('transitionDuration.theme-fast'),
418:           'transition-timing-function': theme('transitionTimingFunction.theme'),
419:         },
420:         
421:         '.transition-transform-smooth': {
422:           'transition-property': 'transform, opacity',
423:           'transition-duration': theme('transitionDuration.300'),
424:           'transition-timing-function': theme('transitionTimingFunction.theme-smooth'),
425:         },
426:         
427:         // No transition utility for cases where transitions should be disabled
428:         '.transition-none-important': {
429:           'transition': 'none !important',
430:         },
431:         
432:         // Smooth bounce effect for interactive elements
433:         '.transition-bounce': {
434:           'transition-property': 'transform',
435:           'transition-duration': theme('transitionDuration.300'),
436:           'transition-timing-function': theme('transitionTimingFunction.bounce-light'),
437:         }
438:       });
439:       
440:       // Add utility classes for specific transition scenarios
441:       addUtilities({
442:         // Quick utility for theme-aware elements
443:         '.theme-transition': {
444:           'transition': `color ${theme('transitionDuration.theme')} ${theme('transitionTimingFunction.theme')}, background-color ${theme('transitionDuration.theme')} ${theme('transitionTimingFunction.theme')}, border-color ${theme('transitionDuration.theme')} ${theme('transitionTimingFunction.theme')}`,
445:         },
446:         
447:         // Utility for elements that need all theme properties
448:         '.theme-transition-all': {
449:           'transition': `color ${theme('transitionDuration.theme')} ${theme('transitionTimingFunction.theme')}, background-color ${theme('transitionDuration.theme')} ${theme('transitionTimingFunction.theme')}, border-color ${theme('transitionDuration.theme')} ${theme('transitionTimingFunction.theme')}, box-shadow ${theme('transitionDuration.theme')} ${theme('transitionTimingFunction.theme')}, outline-color ${theme('transitionDuration.theme')} ${theme('transitionTimingFunction.theme')}`,
450:         },
451:         
452:         // Fast transitions for interactive feedback
453:         '.theme-transition-fast': {
454:           'transition': `color ${theme('transitionDuration.theme-fast')} ${theme('transitionTimingFunction.theme')}, background-color ${theme('transitionDuration.theme-fast')} ${theme('transitionTimingFunction.theme')}, border-color ${theme('transitionDuration.theme-fast')} ${theme('transitionTimingFunction.theme')}`,
455:         }
456:       });
457:     }
458:   ],
459: }
```

## File: src/components/debt-relief/TestimonialItem.astro
```
 1: ---
 2: // src/components/debt-relief/TestimonialItem.astro
 3: import ModernQuoteIcon from '../icons/ModernQuoteIcon.astro';
 4: 
 5: interface Props {
 6:     quote: string;
 7:     name: string;
 8:     location: string;
 9:     debtDetails: string;
10: }
11: 
12: const { quote, name, location, debtDetails } = Astro.props;
13: ---
14: 
15: <div class="testimonial-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-lg dark:shadow-gray-900 hover:shadow-xl hover:dark:shadow-gray-900 transition-all duration-300">
16:     <div class="relative z-10">
17:         <!-- Quote Icon -->
18:         <div class="mb-4">
19:             <span class="testimonial-quote-wrapper">
20:                 <ModernQuoteIcon class="testimonial-quote-icon text-primary opacity-40" width="2.5rem" height="2.5rem" />
21:             </span>
22:         </div>
23:         
24:         <!-- Testimonial Quote -->
25:         <blockquote class="mb-4 italic text-gray-900 dark:text-white text-lg leading-relaxed transition-colors duration-300">{quote}</blockquote>
26:         
27:         <!-- Client Information -->
28:         <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
29:             <div class="font-bold text-primary">- {name}, {location}</div>
30:             <div class="text-sm text-gray-600 dark:text-gray-300 mt-2 transition-colors duration-300">{debtDetails}</div>
31:         </div>
32:     </div>
33: </div>
34: 
35: <style>
36:     .testimonial-card {
37:         position: relative;
38:         overflow: hidden;
39:         transform: translateZ(0);
40:         will-change: transform, box-shadow;
41:         transition: transform 0.3s ease, box-shadow 0.3s ease;
42:     }
43:     
44:     .testimonial-card:hover {
45:         transform: translateY(-2px);
46:     }
47:     
48:     blockquote {
49:         position: relative;
50:         text-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
51:     }
52:     
53:     /* Dark mode text shadow for better readability */
54:     .dark blockquote {
55:         text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
56:     }
57:     
58:     .testimonial-quote-wrapper {
59:         display: block;
60:         position: relative;
61:         width: 2.5rem;
62:         height: 2.5rem;
63:     }
64:     
65:     .testimonial-quote-icon {
66:         max-width: 100%;
67:         max-height: 100%;
68:     }
69:     
70:     @media (prefers-reduced-motion: reduce) {
71:         .testimonial-card:hover {
72:             transform: none;
73:         }
74:     }
75: </style>
```

## File: src/components/DebtReliefForm.astro
```
  1: ---
  2: import LockIcon from './icons/LockIcon.astro';
  3: import PhoneIcon from './icons/PhoneIcon.astro';
  4: import ShieldIcon from './icons/ShieldIcon.astro';
  5: import CheckIcon from './icons/CheckIcon.astro';
  6: import CreditCardAltIcon from './icons/CreditCardAltIcon.astro';
  7: import CheckCircleIcon from './icons/CheckCircleIcon.astro';
  8: ---
  9: 
 10: <div id="consultation" class="consultation-section py-16 md:py-20 relative">
 11:     <!-- Decorative background elements -->
 12:     <div class="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
 13:     <div class="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent -z-10"></div>
 14:     
 15:     <div class="container mx-auto px-4">
 16:         <div class="text-center mb-12">
 17:             <h2 class="text-3xl md:text-4xl font-bold mb-4">You Could Save Thousands</h2>
 18:             <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">See if you qualify for our debt relief program in just 30 seconds.</p>
 19:             <p class="text-sm text-[#2d7984] dark:text-[#58cbe0] font-semibold">Join 50,000+ customers who reduced their debt by up to 50%</p>
 20:         </div>
 21:         
 22:         <!-- Enhanced Form Container -->
 23:         <div class="form-container max-w-2xl mx-auto relative">
 24:             <!-- Glowing effect for emphasis -->
 25:             <div class="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20 rounded-xl blur-md"></div>
 26:             
 27:             <div class="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 md:p-10 rounded-xl shadow-xl dark:shadow-gray-900 transition-colors duration-300">
 28:                 <div class="mb-8 flex items-center justify-between">
 29:                     <h3 class="font-bold text-2xl">Quick Debt Relief Check</h3>
 30:                     <div class="secure-badge flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
 31:                         <LockIcon />
 32:                         <span>Secure & Confidential</span>
 33:                     </div>
 34:                 </div>
 35:                 
 36:                 <form id="debt-relief-form" class="space-y-6">
 37:                     <div class="form-group">
 38:                         <label for="debt-amount" class="form-label block mb-2 text-lg">How much debt do you have?*</label>
 39:                         <select 
 40:                             id="debt-amount" 
 41:                             name="debtAmount" 
 42:                             class="w-full p-4 rounded-lg text-lg 
 43:                                    bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
 44:                                    text-gray-900 dark:text-white
 45:                                    focus:outline-none focus:ring-2 focus:ring-[#2d7984] dark:focus:ring-[#58cbe0] focus:border-[#2d7984] dark:focus:border-[#58cbe0]
 46:                                    transition-colors duration-200" 
 47:                             required
 48:                         >
 49:                             <option value="">Select Amount</option>
 50:                             <option value="5000-10000">$5,000 - $10,000</option>
 51:                             <option value="10000-25000">$10,000 - $25,000</option>
 52:                             <option value="25000-50000">$25,000 - $50,000</option>
 53:                             <option value="50000+">$50,000+</option>
 54:                         </select>
 55:                         <div id="debt-amount-error" class="error-message hidden mt-2 pl-1"></div>
 56:                     </div>
 57:                     
 58:                     <div class="form-group">
 59:                         <label for="debt-type" class="form-label block mb-2 text-lg">What type of debt do you have?*</label>
 60:                         <select 
 61:                             id="debt-type" 
 62:                             name="debtType" 
 63:                             class="w-full p-4 rounded-lg text-lg 
 64:                                    bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
 65:                                    text-gray-900 dark:text-white
 66:                                    focus:outline-none focus:ring-2 focus:ring-[#2d7984] dark:focus:ring-[#58cbe0] focus:border-[#2d7984] dark:focus:border-[#58cbe0]
 67:                                    transition-colors duration-200" 
 68:                             required
 69:                         >
 70:                             <option value="">Select Type</option>
 71:                             <option value="credit-card">Credit Card</option>
 72:                             <option value="medical">Medical</option>
 73:                             <option value="personal-loans">Personal Loans</option>
 74:                             <option value="mixed">Mixed Debt</option>
 75:                         </select>
 76:                         <div id="debt-type-error" class="error-message hidden mt-2 pl-1"></div>
 77:                     </div>
 78:                     
 79:                     <div class="form-group">
 80:                         <label for="phone" class="form-label block mb-2 text-lg">Phone Number*</label>
 81:                         <div class="relative">
 82:                             <input 
 83:                                 type="tel" 
 84:                                 id="phone" 
 85:                                 name="phone"
 86:                                 class="w-full p-4 pl-10 rounded-lg text-lg 
 87:                                        bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
 88:                                        text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
 89:                                        focus:outline-none focus:ring-2 focus:ring-[#2d7984] dark:focus:ring-[#58cbe0] focus:border-[#2d7984] dark:focus:border-[#58cbe0]
 90:                                        transition-colors duration-200" 
 91:                                 placeholder="(000) 000-0000"
 92:                                 required
 93:                                 aria-describedby="phone-format"
 94:                             />
 95:                             <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
 96:                                 <PhoneIcon width="20" height="20" />
 97:                             </div>
 98:                         </div>
 99:                         <small id="phone-format" class="text-gray-500 dark:text-gray-400 text-sm block mt-1 pl-1">Format: (XXX) XXX-XXXX</small>
100:                         <div id="phone-error" class="error-message hidden mt-2 pl-1"></div>
101:                     </div>
102:                     
103:                     <button 
104:                         type="submit" 
105:                         class="debt-relief-submit-btn w-full py-4 text-lg font-bold mt-6 relative overflow-hidden group rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
106:                         aria-label="Submit form to check eligibility"
107:                     >
108:                         <span class="relative z-10 text-white font-bold">See How Much I Can Save</span>
109:                         <div class="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-primary)] bg-[length:200%_100%] animate-gradient"></div>
110:                     </button>
111:                     
112:                     <div class="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
113:                         <p class="flex items-center justify-center gap-1">
114:                             <ShieldIcon width="16" height="16" />
115:                             Your information is protected with 256-bit encryption
116:                         </p>
117:                     </div>
118:                 </form>
119:             </div>
120:         </div>
121:         
122:         <!-- Form Benefits -->
123:         <div class="form-benefits mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
124:             <div class="benefit-item text-center">
125:                 <div class="icon-wrapper bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
126:                     <ShieldIcon width="32" height="32" class="text-primary" />
127:                 </div>
128:                 <h4 class="font-bold mb-2">100% Free Consultation</h4>
129:                 <p class="text-gray-600 dark:text-gray-300">No obligation or upfront fees to get started.</p>
130:             </div>
131:             
132:             <div class="benefit-item text-center">
133:                 <div class="icon-wrapper bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
134:                     <CheckIcon width="32" height="32" class="text-primary" />
135:                 </div>
136:                 <h4 class="font-bold mb-2">Instant Qualification Check</h4>
137:                 <p class="text-gray-600 dark:text-gray-300">Find out if you qualify in as little as 30 seconds.</p>
138:             </div>
139:             
140:             <div class="benefit-item text-center">
141:                 <div class="icon-wrapper bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
142:                     <CreditCardAltIcon class="text-primary" />
143:                 </div>
144:                 <h4 class="font-bold mb-2">No Impact On Credit Score</h4>
145:                 <p class="text-gray-600 dark:text-gray-300">Our qualification process won't hurt your credit.</p>
146:             </div>
147:         </div>
148:     </div>
149: </div>
150: 
151: <style>
152:     /* Enhanced focus states for better accessibility */
153:     select:focus, input:focus {
154:         outline: none;
155:         box-shadow: 0 0 0 3px rgba(45, 121, 132, 0.3); /* Updated to match new primary color */
156:         border-color: var(--color-primary);
157:     }
158:     
159:     /* Dark mode focus states */
160:     .dark select:focus, .dark input:focus {
161:         box-shadow: 0 0 0 3px rgba(88, 203, 224, 0.4); /* Brighter in dark mode */
162:     }
163:     
164:     /* Error states with high contrast */
165:     .error-message {
166:         color: var(--color-error);
167:         font-size: 0.875rem;
168:         font-weight: 500;
169:     }
170:     
171:     .input-error {
172:         border-color: var(--color-error) !important;
173:     }
174:     
175:     /* Make sure placeholders have enough contrast */
176:     input::placeholder {
177:         color: #9ca3af; /* gray-400 */
178:         opacity: 1;
179:     }
180:     
181:     .dark input::placeholder {
182:         color: #6b7280; /* gray-500 for dark mode */
183:     }
184:     
185:     /* Form animations */
186:     .form-container {
187:         transition: transform 0.3s ease, box-shadow 0.3s ease;
188:     }
189:     
190:     .form-container:hover {
191:         transform: translateY(-5px);
192:     }
193:     
194:     /* Enhanced shadow for dark mode */
195:     .dark .form-container:hover {
196:         box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
197:     }
198:     
199:     @media (prefers-reduced-motion: reduce) {
200:         .form-container:hover {
201:             transform: none;
202:             box-shadow: none;
203:         }
204:     }
205:     
206:     /* Submit button styling */
207:     .debt-relief-submit-btn {
208:         border: none;
209:         cursor: pointer;
210:         position: relative;
211:         overflow: hidden;
212:         background: transparent;
213:         transition: all 0.3s ease;
214:     }
215:     
216:     .debt-relief-submit-btn:hover {
217:         transform: translateY(-2px);
218:         box-shadow: 0 15px 35px rgba(var(--color-primary-rgb), 0.3);
219:     }
220:     
221:     .debt-relief-submit-btn:active {
222:         transform: translateY(0);
223:     }
224:     
225:     .debt-relief-submit-btn span {
226:         color: white !important;
227:         text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
228:         position: relative;
229:         z-index: 10;
230:     }
231:     
232:     .debt-relief-submit-btn:focus {
233:         outline: none;
234:         box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.4), 0 15px 35px rgba(var(--color-primary-rgb), 0.3);
235:     }
236:     
237:     .debt-relief-submit-btn:disabled {
238:         opacity: 0.6;
239:         cursor: not-allowed;
240:         transform: none !important;
241:     }
242:     
243:     .debt-relief-submit-btn:disabled:hover {
244:         transform: none;
245:         box-shadow: 0 4px 15px rgba(var(--color-primary-rgb), 0.2);
246:     }
247:     
248:     /* Submit button animation */
249:     @keyframes gradient {
250:         0% { background-position: 0% 50%; }
251:         50% { background-position: 100% 50%; }
252:         100% { background-position: 0% 50%; }
253:     }
254:     
255:     .animate-gradient {
256:         animation: gradient 3s ease infinite;
257:     }
258:     
259:     /* Benefit items animation */
260:     .benefit-item {
261:         transition: transform 0.3s ease;
262:     }
263:     
264:     .benefit-item:hover {
265:         transform: translateY(-5px);
266:     }
267:     
268:     .icon-wrapper {
269:         transition: all 0.3s ease;
270:     }
271:     
272:     .benefit-item:hover .icon-wrapper {
273:         transform: scale(1.1);
274:         box-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.3);
275:     }
276:     
277:     @media (prefers-reduced-motion: reduce) {
278:         .animate-gradient {
279:             animation: none;
280:         }
281:         
282:         .debt-relief-submit-btn:hover {
283:             transform: none;
284:         }
285:         
286:         .benefit-item:hover {
287:             transform: none;
288:         }
289:         
290:         .benefit-item:hover .icon-wrapper {
291:             transform: none;
292:             box-shadow: none;
293:         }
294:     }
295: </style>
296: 
297: <script>
298: // Import cleave.js and US phone addon
299: import Cleave from 'cleave.js';
300: import 'cleave.js/dist/addons/cleave-phone.us';
301: 
302: // Client-side validation and form handling
303: document.addEventListener('DOMContentLoaded', () => {
304:     const form = document.getElementById('debt-relief-form');
305:     const phoneInput = document.getElementById('phone');
306:     const debtAmountSelect = document.getElementById('debt-amount');
307:     const debtTypeSelect = document.getElementById('debt-type');
308:     
309:     const debtAmountError = document.getElementById('debt-amount-error');
310:     const debtTypeError = document.getElementById('debt-type-error');
311:     const phoneError = document.getElementById('phone-error');
312:     
313:     // Initialize cleave.js for phone formatting
314:     let phoneCleave = null;
315:     if (phoneInput) {
316:         phoneCleave = new Cleave(phoneInput, {
317:             phone: true,
318:             phoneRegionCode: 'US'
319:         });
320:         
321:         // Clear error when user types
322:         phoneInput.addEventListener('input', () => {
323:             clearError(phoneInput, phoneError);
324:         });
325:     }
326:     
327:     // Function to show error
328:     const showError = (element, errorElement, message) => {
329:         element.classList.add('input-error');
330:         errorElement.textContent = message;
331:         errorElement.classList.remove('hidden');
332:     };
333:     
334:     // Function to clear error
335:     const clearError = (element, errorElement) => {
336:         element.classList.remove('input-error');
337:         errorElement.textContent = '';
338:         errorElement.classList.add('hidden');
339:     };
340:     
341:     // Clear errors when user selects an option
342:     debtAmountSelect && debtAmountSelect.addEventListener('change', () => clearError(debtAmountSelect, debtAmountError));
343:     debtTypeSelect && debtTypeSelect.addEventListener('change', () => clearError(debtTypeSelect, debtTypeError));
344:     
345:     // Form submission
346:     if (form) {
347:         form.addEventListener('submit', (e) => {
348:             e.preventDefault();
349:             let isValid = true;
350:             
351:             // Validate debt amount
352:             if (!debtAmountSelect.value) {
353:                 showError(debtAmountSelect, debtAmountError, 'Please select your debt amount');
354:                 isValid = false;
355:             }
356:             
357:             // Validate debt type
358:             if (!debtTypeSelect.value) {
359:                 showError(debtTypeSelect, debtTypeError, 'Please select your debt type');
360:                 isValid = false;
361:             }
362:             
363:             // Validate phone using cleave.js getRawValue()
364:             const rawPhone = phoneCleave ? phoneCleave.getRawValue() : phoneInput.value.replace(/\D/g, '');
365:             if (!rawPhone || rawPhone.length !== 10) {
366:                 showError(phoneInput, phoneError, 'Please enter a valid 10-digit phone number');
367:                 isValid = false;
368:             }
369:             
370:             if (!isValid) {
371:                 return;
372:             }
373:             
374:             // Get the raw phone value for submission
375:             console.log('Phone raw value for submission:', rawPhone);
376:             
377:             // Create success message
378:             const formContainer = form.closest('.relative');
379:             const successMessage = document.createElement('div');
380:             successMessage.className = 'text-center py-8';
381:             // Note: We can't use the Astro component directly in JS, so we use the SVG inline
382:             successMessage.innerHTML = `
383:                 <div class="success-icon mx-auto mb-6 bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center">
384:                     <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" class="text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
385:                         <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
386:                         <polyline points="22 4 12 14.01 9 11.01"></polyline>
387:                     </svg>
388:                 </div>
389:                 <h3 class="text-2xl font-bold mb-4">Thank You!</h3>
390:                 <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">A debt relief specialist will contact you shortly to discuss your options.</p>
391:                 <p class="text-gray-600 dark:text-gray-300">Need immediate assistance? Call us at <span class="text-[#2d7984] dark:text-[#58cbe0] font-semibold">(800) 555-1234</span></p>
392:             `;
393:             
394:             // Hide form and show success message with animation
395:             form.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
396:             form.style.opacity = '0';
397:             form.style.transform = 'translateY(20px)';
398:             
399:             setTimeout(() => {
400:                 form.style.display = 'none';
401:                 formContainer.appendChild(successMessage);
402:                 
403:                 // Reset form and cleave instance
404:                 form.reset();
405:                 if (phoneCleave) {
406:                     phoneCleave.setRawValue('');
407:                 }
408:                 
409:                 // Clear all errors
410:                 clearError(debtAmountSelect, debtAmountError);
411:                 clearError(debtTypeSelect, debtTypeError);
412:                 clearError(phoneInput, phoneError);
413:             }, 500);
414:         });
415:     }
416: });
417: </script>
```

## File: src/components/Header.astro
```
  1: ---
  2: import Logo from '../components/Logo.astro';
  3: import ThemeToggle from '../components/ThemeToggle.astro';
  4: import HamburgerIcon from '../components/icons/HamburgerIcon.astro';
  5: import XIcon from '../components/icons/XIcon.astro';
  6: 
  7: const navItems = [
  8:     { linkText: 'Home', href: '/' },
  9:     { linkText: 'How It Works', href: '#benefits' },
 10:     { linkText: 'Success Stories', href: '#testimonials' },
 11:     { linkText: 'FAQ', href: '/faq' },
 12:     { linkText: 'About Us', href: '/about' }
 13: ];
 14: ---
 15: 
 16: <header class="header-section fixed top-0 left-0 right-0 z-50 transition-all duration-300" id="main-header">
 17:     <div class="container mx-auto px-4">
 18:         <nav class="flex justify-between items-center py-4">
 19:             <!-- Logo with text -->
 20:             <div class="logo-container flex items-center">
 21:                 <a href="/" class="nav-link inline-flex items-center gap-3" aria-label="Debt Freedom Toolkit">
 22:                     <Logo />
 23:                     <span class="text-lg md:text-xl font-bold text-[#2d7984] dark:text-[#58cbe0] hidden sm:inline-block">DebtFreedomToolkit.com</span>
 24:                 </a>
 25:             </div>
 26:             
 27:             <!-- Desktop Navigation and Theme Toggle -->
 28:             <div class="hidden md:flex md:items-center md:gap-4">
 29:                 {
 30:                     !!navItems?.length && (
 31:                         <ul class="flex items-center gap-x-6">
 32:                             {navItems.map((item) => (
 33:                                 <li>
 34:                                     <a 
 35:                                         href={item.href} 
 36:                                         class="nav-link inline-block px-1.5 py-1 text-gray-900 dark:text-gray-100 hover:text-[#2d7984] dark:hover:text-[#58cbe0] font-medium transition-colors relative no-underline after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2d7984] dark:after:bg-[#58cbe0] after:transform after:scale-x-0 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left"
 37:                                     >
 38:                                         {item.linkText}
 39:                                     </a>
 40:                                 </li>
 41:                             ))}
 42:                             <li>
 43:                                 <a 
 44:                                     href="#consultation" 
 45:                                     class="btn ml-4 bg-[#2d7984] hover:bg-[#1d5058] text-white font-semibold"
 46:                                 >
 47:                                     Get Started
 48:                                 </a>
 49:                             </li>
 50:                         </ul>
 51:                     )
 52:                 }
 53:                 <ThemeToggle />
 54:             </div>
 55:             
 56:             <!-- Mobile Menu Button -->
 57:             <div class="block md:hidden">
 58:                 <div class="flex items-center gap-2">
 59:                     <ThemeToggle />
 60:                     <button id="mobile-menu-button" class="flex items-center p-2 rounded-lg text-gray-900 dark:text-gray-100 hover:text-[#2d7984] dark:hover:text-[#58cbe0] focus:outline-none focus:ring-2 focus:ring-[#2d7984] dark:focus:ring-[#58cbe0]" aria-expanded="false" aria-controls="mobile-menu" aria-label="Toggle menu">
 61:                         <HamburgerIcon class="w-6 h-6" />
 62:                     </button>
 63:                 </div>
 64:             </div>
 65:         </nav>
 66:     </div>
 67:     
 68:     <!-- Mobile Menu (Hidden by default) -->
 69:     <div id="mobile-menu" class="hidden bg-white dark:bg-gray-800 shadow-lg absolute left-0 right-0 top-full border-t border-gray-200 dark:border-gray-700 animate-fade-in">
 70:         <div class="container mx-auto px-4 py-4">
 71:             <ul class="flex flex-col gap-y-3">
 72:                 {navItems.map((item) => (
 73:                     <li>
 74:                         <a 
 75:                             href={item.href} 
 76:                             class="nav-link block py-2 px-4 hover:bg-[#2d7984]/10 dark:hover:bg-[#58cbe0]/20 rounded-lg font-medium transition-colors text-gray-900 dark:text-gray-100 no-underline"
 77:                         >
 78:                             {item.linkText}
 79:                         </a>
 80:                     </li>
 81:                 ))}
 82:                 <li class="mt-2">
 83:                     <a 
 84:                         href="#consultation" 
 85:                         class="btn w-full text-center bg-[#2d7984] hover:bg-[#1d5058] text-white font-semibold"
 86:                     >
 87:                         Get Started
 88:                     </a>
 89:                 </li>
 90:             </ul>
 91:         </div>
 92:     </div>
 93: </header>
 94: 
 95: <!-- Add padding top to account for fixed header -->
 96: <div class="pt-20"></div>
 97: 
 98: <script>
 99:     // Header scroll behavior
100:     document.addEventListener('DOMContentLoaded', () => {
101:         const header = document.getElementById('main-header');
102:         const mobileMenuButton = document.getElementById('mobile-menu-button');
103:         const mobileMenu = document.getElementById('mobile-menu');
104:         let lastScrollY = window.scrollY;
105:         
106:         // Function to update header state
107:         const updateHeaderState = () => {
108:             const scrollY = window.scrollY;
109:             
110:             // Add shadow and background when scrolled
111:             if (scrollY > 10) {
112:                 header.classList.add('bg-white/95', 'dark:bg-gray-900/95', 'backdrop-blur-md', 'shadow-lg', 'dark:shadow-gray-900', 'border-b', 'border-gray-200', 'dark:border-gray-700');
113:             } else {
114:                 header.classList.remove('bg-white/95', 'dark:bg-gray-900/95', 'backdrop-blur-md', 'shadow-lg', 'dark:shadow-gray-900', 'border-b', 'border-gray-200', 'dark:border-gray-700');
115:             }
116:             
117:             // Hide header when scrolling down, show when scrolling up
118:             if (scrollY > lastScrollY && scrollY > 200) {
119:                 header.classList.add('-translate-y-full');
120:             } else {
121:                 header.classList.remove('-translate-y-full');
122:             }
123:             
124:             lastScrollY = scrollY;
125:         };
126:         
127:         // Toggle mobile menu
128:         mobileMenuButton?.addEventListener('click', () => {
129:             const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
130:             mobileMenuButton.setAttribute('aria-expanded', !expanded);
131:             
132:             if (!expanded) {
133:                 mobileMenu.classList.remove('hidden');
134:                 // Change hamburger to X
135:                 mobileMenuButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
136:             } else {
137:                 mobileMenu.classList.add('hidden');
138:                 // Change X to hamburger
139:                 mobileMenuButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`;
140:             }
141:         });
142:         
143:         // Close mobile menu when clicking on a link
144:         document.querySelectorAll('#mobile-menu a').forEach(link => {
145:             link.addEventListener('click', () => {
146:                 mobileMenu.classList.add('hidden');
147:                 mobileMenuButton.setAttribute('aria-expanded', 'false');
148:                 // Change X to hamburger
149:                 mobileMenuButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`;
150:             });
151:         });
152:         
153:         // Set initial header state
154:         updateHeaderState();
155:         
156:         // Update header state on scroll
157:         window.addEventListener('scroll', updateHeaderState);
158:         
159:         // Handle smooth scrolling for anchor links
160:         document.querySelectorAll('a[href^="#"]').forEach(anchor => {
161:             anchor.addEventListener('click', function(e) {
162:                 e.preventDefault();
163:                 
164:                 const targetId = this.getAttribute('href');
165:                 if (targetId === '#') return;
166:                 
167:                 const targetElement = document.querySelector(targetId);
168:                 if (targetElement) {
169:                     const headerHeight = header.offsetHeight;
170:                     const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
171:                     
172:                     window.scrollTo({
173:                         top: targetPosition,
174:                         behavior: 'smooth'
175:                     });
176:                 }
177:             });
178:         });
179:     });
180: </script>
```

## File: src/styles/globals.css
```css
   1: @tailwind base;
   2: @tailwind components;
   3: @tailwind utilities;
   4: 
   5: /* ===================================================================
   6:    GLOBAL CSS VARIABLES FOR COMPREHENSIVE THEME SYSTEM
   7:    ===================================================================
   8:    
   9:    This file defines a comprehensive set of CSS variables that provide
  10:    consistent theming across light and dark modes. Variables are organized
  11:    into logical sections for maintainability and ease of use.
  12:    
  13:    STRUCTURE:
  14:    1. Base Variables (font, transitions, etc.)
  15:    2. Brand Colors (primary, secondary, accent)
  16:    3. Light Theme Variables 
  17:    4. Dark Theme Variables
  18:    
  19:    NAMING CONVENTION:
  20:    --color-[category]-[variant]
  21:    --color-[category]-[variant]-rgb (for rgba usage)
  22:    
  23:    CATEGORIES:
  24:    - text-* (all text colors)
  25:    - background-* (all background colors) 
  26:    - border-* (all border colors)
  27:    - shadow-* (all shadow colors)
  28:    - state-* (success, warning, error, info)
  29:    ================================================================= */
  30: 
  31: /* ===================================================================
  32:    1. BASE VARIABLES (THEME-INDEPENDENT)
  33:    ================================================================= */
  34: :root {
  35:     /* Typography */
  36:     --font-sans: 'Inter Variable', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  37:     
  38:     /* Brand Colors - Consistent across all themes */
  39:     --color-primary: #2d7984;
  40:     --color-primary-rgb: 45, 121, 132;
  41:     --color-primary-light: #58cbe0;
  42:     --color-primary-light-rgb: 88, 203, 224;
  43:     --color-primary-dark: #1d5058;
  44:     --color-primary-dark-rgb: 29, 80, 88;
  45:     
  46:     --color-secondary: #0062b3;
  47:     --color-secondary-rgb: 0, 98, 179;
  48:     --color-secondary-light: #4a94d8;
  49:     --color-secondary-light-rgb: 74, 148, 216;
  50:     --color-secondary-dark: #004b8c;
  51:     --color-secondary-dark-rgb: 0, 75, 140;
  52:     
  53:     --color-accent: #58cbe0;
  54:     --color-accent-rgb: 88, 203, 224;
  55:     --color-accent-warm: #F8C88F;
  56:     --color-accent-warm-rgb: 248, 200, 143;
  57:     
  58:     /* Base State Colors */
  59:     --color-success-base: #10b981;
  60:     --color-success-base-rgb: 16, 185, 129;
  61:     --color-warning-base: #f59e0b;
  62:     --color-warning-base-rgb: 245, 158, 11;
  63:     --color-error-base: #ef4444;
  64:     --color-error-base-rgb: 239, 68, 68;
  65:     --color-info-base: #3b82f6;
  66:     --color-info-base-rgb: 59, 130, 246;
  67:     
  68:     /* Theme Transition System */
  69:     --theme-transition-duration: 250ms;
  70:     --theme-transition-duration-fast: 150ms;
  71:     --theme-transition-duration-slow: 400ms;
  72:     --theme-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
  73:     --theme-transition-easing-smooth: cubic-bezier(0.16, 1, 0.3, 1);
  74:     --theme-transition-properties: color, background-color, border-color, box-shadow, outline-color, fill, stroke, opacity, transform;
  75:     
  76:     /* Layout & Spacing */
  77:     --border-radius-sm: 0.25rem;
  78:     --border-radius: 0.375rem;
  79:     --border-radius-lg: 0.5rem;
  80:     --border-radius-xl: 0.75rem;
  81:     
  82:     /* Focus Ring */
  83:     --focus-ring-width: 3px;
  84:     --focus-ring-offset: 2px;
  85: }
  86: 
  87: /* ===================================================================
  88:    2. LIGHT THEME VARIABLES (DEFAULT)
  89:    ================================================================= */
  90: .light-theme, :root[data-theme="light"], :root:not([data-theme]) {
  91:     /* ===================== TEXT COLORS ===================== */
  92:     --color-text-primary: #1a2234;
  93:     --color-text-primary-rgb: 26, 34, 52;
  94:     --color-text-secondary: #4a5568;
  95:     --color-text-secondary-rgb: 74, 85, 104;
  96:     --color-text-muted: #718096;
  97:     --color-text-muted-rgb: 113, 128, 150;
  98:     --color-text-disabled: #a0aec0;
  99:     --color-text-disabled-rgb: 160, 174, 192;
 100:     --color-text-inverse: #ffffff;
 101:     --color-text-inverse-rgb: 255, 255, 255;
 102:     --color-text-placeholder: #a0aec0;
 103:     --color-text-placeholder-rgb: 160, 174, 192;
 104:     
 105:     /* Text on colored backgrounds */
 106:     --color-text-on-primary: #ffffff;
 107:     --color-text-on-primary-rgb: 255, 255, 255;
 108:     --color-text-on-secondary: #ffffff;
 109:     --color-text-on-secondary-rgb: 255, 255, 255;
 110:     --color-text-on-accent: #1a2234;
 111:     --color-text-on-accent-rgb: 26, 34, 52;
 112:     
 113:     /* Link colors */
 114:     --color-text-link: #0062b3;
 115:     --color-text-link-rgb: 0, 98, 179;
 116:     --color-text-link-hover: #004b8c;
 117:     --color-text-link-hover-rgb: 0, 75, 140;
 118:     --color-text-link-visited: #5a4fcf;
 119:     --color-text-link-visited-rgb: 90, 79, 207;
 120:     
 121:     /* ===================== BACKGROUND COLORS ===================== */
 122:     --color-background-primary: #ffffff;
 123:     --color-background-primary-rgb: 255, 255, 255;
 124:     --color-background-secondary: #f7fafc;
 125:     --color-background-secondary-rgb: 247, 250, 252;
 126:     --color-background-tertiary: #edf2f7;
 127:     --color-background-tertiary-rgb: 237, 242, 247;
 128:     
 129:     /* Form backgrounds */
 130:     --color-background-form: #f7fafc;
 131:     --color-background-form-rgb: 247, 250, 252;
 132:     --color-background-input: #ffffff;
 133:     --color-background-input-rgb: 255, 255, 255;
 134:     --color-background-input-disabled: #f7fafc;
 135:     --color-background-input-disabled-rgb: 247, 250, 252;
 136:     
 137:     /* Surface backgrounds */
 138:     --color-background-surface: #ffffff;
 139:     --color-background-surface-rgb: 255, 255, 255;
 140:     --color-background-elevated: #ffffff;
 141:     --color-background-elevated-rgb: 255, 255, 255;
 142:     --color-background-overlay: rgba(26, 34, 52, 0.8);
 143:     --color-background-backdrop: rgba(26, 34, 52, 0.5);
 144:     
 145:     /* Interactive backgrounds */
 146:     --color-background-hover: #f7fafc;
 147:     --color-background-hover-rgb: 247, 250, 252;
 148:     --color-background-active: #edf2f7;
 149:     --color-background-active-rgb: 237, 242, 247;
 150:     --color-background-selected: #e6fffa;
 151:     --color-background-selected-rgb: 230, 255, 250;
 152:     
 153:     /* Code backgrounds */
 154:     --color-background-code: #f7fafc;
 155:     --color-background-code-rgb: 247, 250, 252;
 156:     --color-background-code-block: #2d3748;
 157:     --color-background-code-block-rgb: 45, 55, 72;
 158:     
 159:     /* ===================== BORDER COLORS ===================== */
 160:     --color-border-default: #e2e8f0;
 161:     --color-border-default-rgb: 226, 232, 240;
 162:     --color-border-subtle: #f7fafc;
 163:     --color-border-subtle-rgb: 247, 250, 252;
 164:     --color-border-strong: #cbd5e0;
 165:     --color-border-strong-rgb: 203, 213, 224;
 166:     --color-border-focus: var(--color-primary);
 167:     --color-border-focus-rgb: var(--color-primary-rgb);
 168:     --color-border-interactive: #cbd5e0;
 169:     --color-border-interactive-rgb: 203, 213, 224;
 170:     --color-border-interactive-hover: #a0aec0;
 171:     --color-border-interactive-hover-rgb: 160, 174, 192;
 172:     
 173:     /* ===================== SHADOW COLORS ===================== */
 174:     --color-shadow-light: rgba(0, 0, 0, 0.05);
 175:     --color-shadow-medium: rgba(0, 0, 0, 0.1);
 176:     --color-shadow-heavy: rgba(0, 0, 0, 0.15);
 177:     --color-shadow-focus: rgba(45, 121, 132, 0.3);
 178:     --color-shadow-inset: inset 0 2px 4px rgba(0, 0, 0, 0.05);
 179:     
 180:     /* ===================== STATE COLORS ===================== */
 181:     /* Success */
 182:     --color-success: #10b981;
 183:     --color-success-rgb: 16, 185, 129;
 184:     --color-success-light: #d1fae5;
 185:     --color-success-light-rgb: 209, 250, 229;
 186:     --color-success-dark: #059669;
 187:     --color-success-dark-rgb: 5, 150, 105;
 188:     --color-text-success: #064e3b;
 189:     --color-text-success-rgb: 6, 78, 59;
 190:     --color-background-success: #ecfdf5;
 191:     --color-background-success-rgb: 236, 253, 245;
 192:     --color-border-success: #86efac;
 193:     --color-border-success-rgb: 134, 239, 172;
 194:     
 195:     /* Warning */
 196:     --color-warning: #f59e0b;
 197:     --color-warning-rgb: 245, 158, 11;
 198:     --color-warning-light: #fef3c7;
 199:     --color-warning-light-rgb: 254, 243, 199;
 200:     --color-warning-dark: #d97706;
 201:     --color-warning-dark-rgb: 217, 119, 6;
 202:     --color-text-warning: #92400e;
 203:     --color-text-warning-rgb: 146, 64, 14;
 204:     --color-background-warning: #fffbeb;
 205:     --color-background-warning-rgb: 255, 251, 235;
 206:     --color-border-warning: #fcd34d;
 207:     --color-border-warning-rgb: 252, 211, 77;
 208:     
 209:     /* Error */
 210:     --color-error: #ef4444;
 211:     --color-error-rgb: 239, 68, 68;
 212:     --color-error-light: #fecaca;
 213:     --color-error-light-rgb: 254, 202, 202;
 214:     --color-error-dark: #dc2626;
 215:     --color-error-dark-rgb: 220, 38, 38;
 216:     --color-text-error: #991b1b;
 217:     --color-text-error-rgb: 153, 27, 27;
 218:     --color-background-error: #fef2f2;
 219:     --color-background-error-rgb: 254, 242, 242;
 220:     --color-border-error: #fca5a5;
 221:     --color-border-error-rgb: 252, 165, 165;
 222:     
 223:     /* Info */
 224:     --color-info: #3b82f6;
 225:     --color-info-rgb: 59, 130, 246;
 226:     --color-info-light: #dbeafe;
 227:     --color-info-light-rgb: 219, 234, 254;
 228:     --color-info-dark: #2563eb;
 229:     --color-info-dark-rgb: 37, 99, 235;
 230:     --color-text-info: #1e3a8a;
 231:     --color-text-info-rgb: 30, 58, 138;
 232:     --color-background-info: #eff6ff;
 233:     --color-background-info-rgb: 239, 246, 255;
 234:     --color-border-info: #93c5fd;
 235:     --color-border-info-rgb: 147, 197, 253;
 236:     
 237:     /* ===================== SPECIAL BACKGROUNDS ===================== */
 238:     --background-image-noise: linear-gradient(
 239:         to bottom,
 240:         rgba(250, 250, 255, 0.05),
 241:         rgba(250, 250, 255, 0.1)
 242:     ), url('/images/noise.png');
 243: }
 244: 
 245: /* ===================================================================
 246:    3. DARK THEME VARIABLES
 247:    ================================================================= */
 248: .dark-theme, .dark, :root[data-theme="dark"] {
 249:     /* ===================== TEXT COLORS ===================== */
 250:     --color-text-primary: #ffffff;
 251:     --color-text-primary-rgb: 255, 255, 255;
 252:     --color-text-secondary: #e2e8f0;
 253:     --color-text-secondary-rgb: 226, 232, 240;
 254:     --color-text-muted: #a0aec0;
 255:     --color-text-muted-rgb: 160, 174, 192;
 256:     --color-text-disabled: #718096;
 257:     --color-text-disabled-rgb: 113, 128, 150;
 258:     --color-text-inverse: #1a2234;
 259:     --color-text-inverse-rgb: 26, 34, 52;
 260:     --color-text-placeholder: #718096;
 261:     --color-text-placeholder-rgb: 113, 128, 150;
 262:     
 263:     /* Text on colored backgrounds */
 264:     --color-text-on-primary: #ffffff;
 265:     --color-text-on-primary-rgb: 255, 255, 255;
 266:     --color-text-on-secondary: #ffffff;
 267:     --color-text-on-secondary-rgb: 255, 255, 255;
 268:     --color-text-on-accent: #1a2234;
 269:     --color-text-on-accent-rgb: 26, 34, 52;
 270:     
 271:     /* Link colors */
 272:     --color-text-link: #58cbe0;
 273:     --color-text-link-rgb: 88, 203, 224;
 274:     --color-text-link-hover: #4bbbce;
 275:     --color-text-link-hover-rgb: 75, 187, 206;
 276:     --color-text-link-visited: #9f7aea;
 277:     --color-text-link-visited-rgb: 159, 122, 234;
 278:     
 279:     /* ===================== BACKGROUND COLORS ===================== */
 280:     --color-background-primary: #1a2234;
 281:     --color-background-primary-rgb: 26, 34, 52;
 282:     --color-background-secondary: #202b3d;
 283:     --color-background-secondary-rgb: 32, 43, 61;
 284:     --color-background-tertiary: #2d3748;
 285:     --color-background-tertiary-rgb: 45, 55, 72;
 286:     
 287:     /* Form backgrounds */
 288:     --color-background-form: #202b3d;
 289:     --color-background-form-rgb: 32, 43, 61;
 290:     --color-background-input: #2d3748;
 291:     --color-background-input-rgb: 45, 55, 72;
 292:     --color-background-input-disabled: #4a5568;
 293:     --color-background-input-disabled-rgb: 74, 85, 104;
 294:     
 295:     /* Surface backgrounds */
 296:     --color-background-surface: #202b3d;
 297:     --color-background-surface-rgb: 32, 43, 61;
 298:     --color-background-elevated: #2d3748;
 299:     --color-background-elevated-rgb: 45, 55, 72;
 300:     --color-background-overlay: rgba(0, 0, 0, 0.8);
 301:     --color-background-backdrop: rgba(0, 0, 0, 0.5);
 302:     
 303:     /* Interactive backgrounds */
 304:     --color-background-hover: #2d3748;
 305:     --color-background-hover-rgb: 45, 55, 72;
 306:     --color-background-active: #4a5568;
 307:     --color-background-active-rgb: 74, 85, 104;
 308:     --color-background-selected: #1a365d;
 309:     --color-background-selected-rgb: 26, 54, 93;
 310:     
 311:     /* Code backgrounds */
 312:     --color-background-code: #2d3748;
 313:     --color-background-code-rgb: 45, 55, 72;
 314:     --color-background-code-block: #1a202c;
 315:     --color-background-code-block-rgb: 26, 32, 44;
 316:     
 317:     /* ===================== BORDER COLORS ===================== */
 318:     --color-border-default: #4a5568;
 319:     --color-border-default-rgb: 74, 85, 104;
 320:     --color-border-subtle: #2d3748;
 321:     --color-border-subtle-rgb: 45, 55, 72;
 322:     --color-border-strong: #718096;
 323:     --color-border-strong-rgb: 113, 128, 150;
 324:     --color-border-focus: var(--color-primary-light);
 325:     --color-border-focus-rgb: var(--color-primary-light-rgb);
 326:     --color-border-interactive: #718096;
 327:     --color-border-interactive-rgb: 113, 128, 150;
 328:     --color-border-interactive-hover: #a0aec0;
 329:     --color-border-interactive-hover-rgb: 160, 174, 192;
 330:     
 331:     /* ===================== SHADOW COLORS ===================== */
 332:     --color-shadow-light: rgba(0, 0, 0, 0.25);
 333:     --color-shadow-medium: rgba(0, 0, 0, 0.5);
 334:     --color-shadow-heavy: rgba(0, 0, 0, 0.75);
 335:     --color-shadow-focus: rgba(88, 203, 224, 0.4);
 336:     --color-shadow-inset: inset 0 2px 4px rgba(0, 0, 0, 0.25);
 337:     
 338:     /* ===================== STATE COLORS ===================== */
 339:     /* Success */
 340:     --color-success: #68d391;
 341:     --color-success-rgb: 104, 211, 145;
 342:     --color-success-light: #276749;
 343:     --color-success-light-rgb: 39, 103, 73;
 344:     --color-success-dark: #9ae6b4;
 345:     --color-success-dark-rgb: 154, 230, 180;
 346:     --color-text-success: #9ae6b4;
 347:     --color-text-success-rgb: 154, 230, 180;
 348:     --color-background-success: #1a202c;
 349:     --color-background-success-rgb: 26, 32, 44;
 350:     --color-border-success: #276749;
 351:     --color-border-success-rgb: 39, 103, 73;
 352:     
 353:     /* Warning */
 354:     --color-warning: #fbd38d;
 355:     --color-warning-rgb: 251, 211, 141;
 356:     --color-warning-light: #744210;
 357:     --color-warning-light-rgb: 116, 66, 16;
 358:     --color-warning-dark: #fed7aa;
 359:     --color-warning-dark-rgb: 254, 215, 170;
 360:     --color-text-warning: #fed7aa;
 361:     --color-text-warning-rgb: 254, 215, 170;
 362:     --color-background-warning: #1a202c;
 363:     --color-background-warning-rgb: 26, 32, 44;
 364:     --color-border-warning: #744210;
 365:     --color-border-warning-rgb: 116, 66, 16;
 366:     
 367:     /* Error */
 368:     --color-error: #fc8181;
 369:     --color-error-rgb: 252, 129, 129;
 370:     --color-error-light: #742a2a;
 371:     --color-error-light-rgb: 116, 42, 42;
 372:     --color-error-dark: #feb2b2;
 373:     --color-error-dark-rgb: 254, 178, 178;
 374:     --color-text-error: #feb2b2;
 375:     --color-text-error-rgb: 254, 178, 178;
 376:     --color-background-error: #1a202c;
 377:     --color-background-error-rgb: 26, 32, 44;
 378:     --color-border-error: #742a2a;
 379:     --color-border-error-rgb: 116, 42, 42;
 380:     
 381:     /* Info */
 382:     --color-info: #90cdf4;
 383:     --color-info-rgb: 144, 205, 244;
 384:     --color-info-light: #2a4365;
 385:     --color-info-light-rgb: 42, 67, 101;
 386:     --color-info-dark: #bee3f8;
 387:     --color-info-dark-rgb: 190, 227, 248;
 388:     --color-text-info: #bee3f8;
 389:     --color-text-info-rgb: 190, 227, 248;
 390:     --color-background-info: #1a202c;
 391:     --color-background-info-rgb: 26, 32, 44;
 392:     --color-border-info: #2a4365;
 393:     --color-border-info-rgb: 42, 67, 101;
 394:     
 395:     /* ===================== SPECIAL BACKGROUNDS ===================== */
 396:     --background-image-noise: linear-gradient(
 397:         to bottom,
 398:         rgba(10, 15, 25, 0.1),
 399:         rgba(10, 15, 25, 0.2)
 400:     ), url('/images/noise.png');
 401: }
 402: 
 403: /* Enhanced support for reduced motion preference - Performance & Accessibility */
 404: @media (prefers-reduced-motion: reduce) {
 405:     :root {
 406:         --theme-transition-duration: 0ms;
 407:         --theme-transition-duration-fast: 0ms;
 408:         --theme-transition-duration-slow: 0ms;
 409:     }
 410:     
 411:     /* Disable all transitions and animations for users who prefer reduced motion */
 412:     *, *::before, *::after {
 413:         animation-duration: 0.01ms !important;
 414:         animation-iteration-count: 1 !important;
 415:         transition-duration: 0.01ms !important;
 416:         scroll-behavior: auto !important;
 417:     }
 418:     
 419:     /* Ensure transforms are still applied for layout, just without animation */
 420:     .animate-fade-in,
 421:     .animate-slide-up,
 422:     .animate-slide-down,
 423:     .animate-slide-left,
 424:     .animate-slide-right,
 425:     .animate-scale-in {
 426:         opacity: 1 !important;
 427:         transform: none !important;
 428:     }
 429: }
 430: 
 431: /* JavaScript-controlled reduced motion class for more precise control */
 432: .reduced-motion,
 433: .reduced-motion *,
 434: .reduced-motion *::before,
 435: .reduced-motion *::after {
 436:     animation-duration: 0.01ms !important;
 437:     animation-iteration-count: 1 !important;
 438:     transition-duration: 0.01ms !important;
 439:     scroll-behavior: auto !important;
 440: }
 441: 
 442: /* Alternative interaction feedback for reduced motion users */
 443: .reduced-motion .btn:hover {
 444:     transform: none !important;
 445:     filter: brightness(1.1) !important;
 446: }
 447: 
 448: .reduced-motion .card-hover:hover {
 449:     transform: none !important;
 450:     border-color: var(--color-primary) !important;
 451:     box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2) !important;
 452: }
 453: 
 454: .reduced-motion .theme-toggle .theme-option:hover .theme-icon {
 455:     transform: none !important;
 456: }
 457: 
 458: .reduced-motion .btn-with-icon-right:hover svg,
 459: .reduced-motion .btn-with-icon-left:hover svg {
 460:     transform: none !important;
 461: }
 462: 
 463: /* Performance optimizations for theme transitions */
 464: .theme-transition-performance {
 465:     /* Promote to composite layer for GPU acceleration */
 466:     will-change: opacity, transform, background-color, color, border-color;
 467:     /* Force hardware acceleration */
 468:     transform: translateZ(0);
 469:     /* Optimize rendering */
 470:     backface-visibility: hidden;
 471:     perspective: 1000px;
 472: }
 473: 
 474: /* Remove will-change after transitions complete to free up GPU memory */
 475: .theme-transition-complete {
 476:     will-change: auto;
 477: }
 478: 
 479: /* Custom media query variables */
 480: @custom-media --viewport-xs (max-width: 480px);
 481: @custom-media --viewport-sm (min-width: 640px);
 482: @custom-media --viewport-md (min-width: 768px);
 483: @custom-media --viewport-lg (min-width: 1024px);
 484: @custom-media --viewport-xl (min-width: 1280px);
 485: @custom-media --viewport-2xl (min-width: 1536px);
 486: @custom-media --prefers-reduced-motion (prefers-reduced-motion: reduce);
 487: @custom-media --dark-mode (prefers-color-scheme: dark);
 488: @custom-media --light-mode (prefers-color-scheme: light);
 489: 
 490: @layer base {
 491:     html {
 492:         /* Apply optimized theme transitions */
 493:         transition: 
 494:             var(--theme-transition-properties) 
 495:             var(--theme-transition-duration) 
 496:             var(--theme-transition-easing);
 497:         /* Performance optimization for root element */
 498:         transform: translateZ(0);
 499:     }
 500:     
 501:     body {
 502:         color: var(--color-text-primary);
 503:         background-color: var(--color-background-primary);
 504:         /* Apply optimized theme transitions */
 505:         transition: 
 506:             var(--theme-transition-properties) 
 507:             var(--theme-transition-duration) 
 508:             var(--theme-transition-easing);
 509:         /* Performance optimization */
 510:         will-change: background-color, color;
 511:     }
 512:     
 513:     /* Clean up will-change after page load for performance */
 514:     body.loaded {
 515:         will-change: auto;
 516:     }
 517:     
 518:     /* Apply theme transitions to headings */
 519:     h1, h2, h3, h4, h5, h6 {
 520:         transition: 
 521:             var(--theme-transition-properties) 
 522:             var(--theme-transition-duration) 
 523:             var(--theme-transition-easing);
 524:     }
 525:     
 526:     h1 {
 527:         font-size: 2.25rem;
 528:         line-height: 1.2;
 529:         font-weight: 800;
 530:         letter-spacing: -0.025em;
 531:         color: var(--color-text);
 532:         margin-bottom: 1rem;
 533:         text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
 534:     }
 535:     
 536:     @media (min-width: 640px) {
 537:         h1 {
 538:             font-size: 3rem;
 539:             line-height: 1.1;
 540:         }
 541:     }
 542: 
 543:     h2 {
 544:         font-size: 1.5rem;
 545:         line-height: 1.3;
 546:         font-weight: 700;
 547:         color: var(--color-text);
 548:         margin-bottom: 0.75rem;
 549:     }
 550:     
 551:     @media (min-width: 640px) {
 552:         h2 {
 553:             font-size: 1.875rem;
 554:             line-height: 1.2;
 555:         }
 556:     }
 557:     
 558:     h3 {
 559:         font-size: 1.25rem;
 560:         line-height: 1.4;
 561:         font-weight: 600;
 562:         color: var(--color-text);
 563:         margin-bottom: 0.5rem;
 564:     }
 565:     
 566:     h4 {
 567:         font-size: 1.125rem;
 568:         line-height: 1.5;
 569:         font-weight: 600;
 570:         color: var(--color-text);
 571:         margin-bottom: 0.5rem;
 572:     }
 573:     
 574:     p {
 575:         line-height: 1.6;
 576:         margin-bottom: 1rem;
 577:         transition: 
 578:             var(--theme-transition-properties) 
 579:             var(--theme-transition-duration) 
 580:             var(--theme-transition-easing);
 581:     }
 582: 
 583:     a:not(.btn):not(.nav-link) {
 584:         text-decoration: underline;
 585:         color: var(--color-secondary);
 586:         transition: 
 587:             var(--theme-transition-properties) 
 588:             var(--theme-transition-duration) 
 589:             var(--theme-transition-easing);
 590:     }
 591:     
 592:     /* Dark mode links with better contrast */
 593:     .dark a:not(.btn):not(.nav-link) {
 594:         color: #58cbe0; /* Brighter in dark mode for better contrast */
 595:     }
 596:     
 597:     a:not(.btn):not(.nav-link):hover {
 598:         opacity: 0.85;
 599:         text-decoration-thickness: 2px; /* Make underline thicker on hover for better visibility */
 600:     }
 601:     
 602:     /* Enhanced focus visible styles for accessibility during theme transitions */
 603:     a:focus-visible,
 604:     button:focus-visible,
 605:     input:focus-visible,
 606:     select:focus-visible,
 607:     textarea:focus-visible {
 608:         outline: 3px solid var(--color-border-focus);
 609:         outline-offset: 2px;
 610:         /* Ensure focus remains visible during theme transitions */
 611:         transition: outline-color var(--theme-transition-duration) var(--theme-transition-easing),
 612:                    outline-width 0ms; /* Instant outline width to maintain visibility */
 613:         /* Prevent outline from being affected by will-change optimizations */
 614:         z-index: 9999;
 615:         position: relative;
 616:     }
 617:     
 618:     /* Enhanced dark mode focus with improved contrast */
 619:     .dark a:focus-visible,
 620:     .dark button:focus-visible,
 621:     .dark input:focus-visible,
 622:     .dark select:focus-visible,
 623:     .dark textarea:focus-visible {
 624:         outline-color: var(--color-border-focus);
 625:         /* Ensure sufficient contrast in dark mode */
 626:         box-shadow: 0 0 0 1px var(--color-background-primary),
 627:                    0 0 0 4px var(--color-border-focus);
 628:     }
 629:     
 630:     /* Focus styles that respect reduced motion */
 631:     @media (prefers-reduced-motion: reduce) {
 632:         a:focus-visible,
 633:         button:focus-visible,
 634:         input:focus-visible,
 635:         select:focus-visible,
 636:         textarea:focus-visible {
 637:             transition: none !important;
 638:         }
 639:     }
 640: 
 641:     pre {
 642:         padding: 1.5rem;
 643:         overflow-x: auto;
 644:         border-radius: 0.5rem;
 645:         background-color: var(--color-form-bg);
 646:         transition: 
 647:             var(--theme-transition-properties) 
 648:             var(--theme-transition-duration) 
 649:             var(--theme-transition-easing);
 650:     }
 651: 
 652:     :not(pre) > code {
 653:         padding-left: 0.25rem;
 654:         padding-right: 0.25rem;
 655:         padding-top: 0.125rem;
 656:         padding-bottom: 0.125rem;
 657:         font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
 658:         border-radius: 0.25rem;
 659:         background-color: var(--color-form-bg);
 660:         color: #0062b3; /* Darker blue in light mode for better contrast */
 661:         font-size: 0.9em;
 662:         transition: 
 663:             var(--theme-transition-properties) 
 664:             var(--theme-transition-duration) 
 665:             var(--theme-transition-easing);
 666:     }
 667:     
 668:     /* Adjusted dark mode code color */
 669:     .dark :not(pre) > code {
 670:         color: #58cbe0; /* Brighter in dark mode for better contrast */
 671:     }
 672:     
 673:     input, select, textarea {
 674:         background-color: var(--color-input-bg);
 675:         color: var(--color-text);
 676:         border: 1px solid var(--color-border);
 677:         transition: 
 678:             var(--theme-transition-properties) 
 679:             var(--theme-transition-duration) 
 680:             var(--theme-transition-easing);
 681:     }
 682:     
 683:     /* Placeholder styling with proper contrast */
 684:     ::placeholder {
 685:         color: var(--color-placeholder);
 686:         opacity: 1; /* Override Firefox default opacity */
 687:     }
 688:     
 689:     /* Specific styles for inputs and selects to ensure contrast */
 690:     input, select, textarea {
 691:         color: var(--color-text); /* Ensure text has proper contrast */
 692:     }
 693:     
 694:     /* High contrast focus states for form elements */
 695:     input:focus, select:focus, textarea:focus {
 696:         border-color: var(--color-primary);
 697:         box-shadow: 0 0 0 1px var(--color-primary);
 698:     }
 699:     
 700:     /* Disabled state styling with improved contrast */
 701:     input:disabled, 
 702:     select:disabled, 
 703:     textarea:disabled {
 704:         background-color: #e2e8f0; /* Light gray bg */
 705:         color: #4a5568; /* Darker text for contrast */
 706:         border-color: #cbd5e0;
 707:         cursor: not-allowed;
 708:     }
 709:     
 710:     .dark input:disabled, 
 711:     .dark select:disabled, 
 712:     .dark textarea:disabled {
 713:         background-color: #2d3748; /* Dark gray bg */
 714:         color: #a0aec0; /* Light enough text for contrast */
 715:         border-color: #4a5568;
 716:         cursor: not-allowed;
 717:     }
 718:     
 719:     /* Apply transitions to SVG elements */
 720:     svg {
 721:         transition: 
 722:             fill var(--theme-transition-duration) var(--theme-transition-easing),
 723:             stroke var(--theme-transition-duration) var(--theme-transition-easing);
 724:     }
 725:     
 726:     /* Ensure SVGs have sufficient contrast */
 727:     svg.icon {
 728:         color: currentColor; /* Inherit text color for proper contrast */
 729:     }
 730:     
 731:     /* Enhanced handling for theme-aware images and complex backgrounds */
 732:     .theme-aware-image {
 733:         transition: opacity var(--theme-transition-duration) var(--theme-transition-easing);
 734:     }
 735:     
 736:     /* Theme-aware background images */
 737:     .theme-background-image {
 738:         transition: 
 739:             opacity var(--theme-transition-duration-slow) var(--theme-transition-easing-smooth),
 740:             background-image var(--theme-transition-duration-slow) var(--theme-transition-easing-smooth);
 741:     }
 742:     
 743:     /* Complex gradients and shadows */
 744:     .theme-gradient {
 745:         transition: 
 746:             background var(--theme-transition-duration-slow) var(--theme-transition-easing-smooth),
 747:             opacity var(--theme-transition-duration) var(--theme-transition-easing);
 748:     }
 749:     
 750:     .theme-shadow {
 751:         transition: 
 752:             box-shadow var(--theme-transition-duration) var(--theme-transition-easing),
 753:             filter var(--theme-transition-duration) var(--theme-transition-easing);
 754:     }
 755:     
 756:     /* Enhanced backdrop blur transitions */
 757:     .theme-backdrop {
 758:         transition: 
 759:             backdrop-filter var(--theme-transition-duration) var(--theme-transition-easing),
 760:             -webkit-backdrop-filter var(--theme-transition-duration) var(--theme-transition-easing),
 761:             background var(--theme-transition-duration) var(--theme-transition-easing);
 762:     }
 763:     
 764:     /* Error message styling */
 765:     .error-message {
 766:         color: var(--color-error);
 767:         font-size: 0.875rem;
 768:         margin-top: 0.25rem;
 769:         font-weight: 500; /* Slightly bolder for better visibility */
 770:     }
 771:     
 772:     .error-border {
 773:         border-color: var(--color-error) !important;
 774:     }
 775: }
 776: 
 777: @layer components {
 778:     /* Navigation link styles - override default link styling */
 779:     .nav-link {
 780:         text-decoration: none !important;
 781:         color: inherit !important;
 782:     }
 783:     
 784:     .nav-link:hover {
 785:         text-decoration: none !important;
 786:     }
 787:     
 788:     .nav-link:visited {
 789:         color: inherit !important;
 790:     }
 791:     
 792:     /* Utility class for removing underlines */
 793:     .no-underline {
 794:         text-decoration: none !important;
 795:     }
 796:     
 797:     /* Reduced motion alternative styles - provide meaningful feedback without motion */
 798:     .reduced-motion-alternative {
 799:         /* Use color changes instead of animations */
 800:         transition: background-color 0.1s ease, color 0.1s ease, border-color 0.1s ease;
 801:     }
 802:     
 803:     @media (prefers-reduced-motion: reduce) {
 804:         /* Alternative hover effects that don't use motion */
 805:         .btn:hover {
 806:             transform: none !important;
 807:             /* Use subtle color shift instead */
 808:             filter: brightness(1.1);
 809:         }
 810:         
 811:         .card-hover:hover {
 812:             transform: none !important;
 813:             /* Use border highlight instead of elevation */
 814:             border-color: var(--color-primary);
 815:             box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
 816:         }
 817:         
 818:         /* Theme transitions still work but are instant */
 819:         .theme-gradient,
 820:         .theme-background-image,
 821:         .theme-shadow,
 822:         .theme-backdrop {
 823:             transition: none !important;
 824:         }
 825:         
 826:         /* Focus states remain visible but without animation */
 827:         a:focus-visible,
 828:         button:focus-visible,
 829:         input:focus-visible,
 830:         select:focus-visible,
 831:         textarea:focus-visible {
 832:             /* Instant, high-contrast focus */
 833:             outline: 4px solid var(--color-primary) !important;
 834:             outline-offset: 2px !important;
 835:             transition: none !important;
 836:         }
 837:     }
 838:     
 839:     /* Markdown content styling */
 840:     .markdown > * {
 841:         margin-top: 1.5rem;
 842:         margin-bottom: 1.5rem;
 843:     }
 844: 
 845:     .markdown :where(h1, h2) {
 846:         margin-top: 3rem;
 847:         margin-bottom: 1.5rem;
 848:     }
 849: 
 850:     .markdown > :first-child {
 851:         margin-top: 0;
 852:     }
 853: 
 854:     .markdown > :last-child {
 855:         margin-bottom: 0;
 856:     }
 857:     
 858:     /* Animation utilities - Enhanced with more options */
 859:     .animate-fade-in {
 860:         animation: fadeIn 0.5s ease-in-out;
 861:     }
 862:     
 863:     .animate-slide-up {
 864:         animation: slideUp 0.5s ease-out;
 865:     }
 866:     
 867:     .animate-slide-down {
 868:         animation: slideDown 0.5s ease-out;
 869:     }
 870:     
 871:     .animate-slide-left {
 872:         animation: slideLeft 0.5s ease-out;
 873:     }
 874:     
 875:     .animate-slide-right {
 876:         animation: slideRight 0.5s ease-out;
 877:     }
 878:     
 879:     .animate-scale-in {
 880:         animation: scaleIn 0.5s ease-out;
 881:     }
 882:     
 883:     .animate-pulse-once {
 884:         animation: pulseOnce 2s ease-in-out;
 885:     }
 886:     
 887:     .animate-float {
 888:         animation: float 6s ease-in-out infinite;
 889:     }
 890:     
 891:     .animate-spin-slow {
 892:         animation: spin 8s linear infinite;
 893:     }
 894:     
 895:     .animate-fade-in-delay-1 {
 896:         opacity: 0;
 897:         animation: fadeIn 0.5s ease-in-out 0.2s forwards;
 898:     }
 899:     
 900:     .animate-fade-in-delay-2 {
 901:         opacity: 0;
 902:         animation: fadeIn 0.5s ease-in-out 0.4s forwards;
 903:     }
 904:     
 905:     .animate-fade-in-delay-3 {
 906:         opacity: 0;
 907:         animation: fadeIn 0.5s ease-in-out 0.6s forwards;
 908:     }
 909:     
 910:     .animate-slide-up-delay-1 {
 911:         opacity: 0;
 912:         animation: slideUp 0.5s ease-out 0.2s forwards;
 913:     }
 914:     
 915:     .animate-slide-up-delay-2 {
 916:         opacity: 0;
 917:         animation: slideUp 0.5s ease-out 0.4s forwards;
 918:     }
 919:     
 920:     .animate-slide-up-delay-3 {
 921:         opacity: 0;
 922:         animation: slideUp 0.5s ease-out 0.6s forwards;
 923:     }
 924:     
 925:     .animate-bounce-subtle {
 926:         animation: bounceSoft 2s ease-in-out infinite;
 927:     }
 928:     
 929:     @media (prefers-reduced-motion: reduce) {
 930:         .animate-fade-in,
 931:         .animate-slide-up,
 932:         .animate-slide-down,
 933:         .animate-slide-left,
 934:         .animate-slide-right,
 935:         .animate-scale-in,
 936:         .animate-pulse-once,
 937:         .animate-float,
 938:         .animate-spin-slow,
 939:         .animate-bounce-subtle,
 940:         .animate-fade-in-delay-1,
 941:         .animate-fade-in-delay-2,
 942:         .animate-fade-in-delay-3,
 943:         .animate-slide-up-delay-1,
 944:         .animate-slide-up-delay-2,
 945:         .animate-slide-up-delay-3 {
 946:             animation: none !important;
 947:             opacity: 1 !important;
 948:             transform: none !important;
 949:         }
 950:     }
 951:     
 952:     /* Animation keyframes */
 953:     @keyframes fadeIn {
 954:         from { opacity: 0; }
 955:         to { opacity: 1; }
 956:     }
 957:     
 958:     @keyframes slideUp {
 959:         from { 
 960:             opacity: 0;
 961:             transform: translateY(20px);
 962:         }
 963:         to { 
 964:             opacity: 1;
 965:             transform: translateY(0);
 966:         }
 967:     }
 968:     
 969:     @keyframes slideDown {
 970:         from { 
 971:             opacity: 0;
 972:             transform: translateY(-20px);
 973:         }
 974:         to { 
 975:             opacity: 1;
 976:             transform: translateY(0);
 977:         }
 978:     }
 979:     
 980:     @keyframes slideLeft {
 981:         from { 
 982:             opacity: 0;
 983:             transform: translateX(20px);
 984:         }
 985:         to { 
 986:             opacity: 1;
 987:             transform: translateX(0);
 988:         }
 989:     }
 990:     
 991:     @keyframes slideRight {
 992:         from { 
 993:             opacity: 0;
 994:             transform: translateX(-20px);
 995:         }
 996:         to { 
 997:             opacity: 1;
 998:             transform: translateX(0);
 999:         }
1000:     }
1001:     
1002:     @keyframes scaleIn {
1003:         from { 
1004:             opacity: 0;
1005:             transform: scale(0.95);
1006:         }
1007:         to { 
1008:             opacity: 1;
1009:             transform: scale(1);
1010:         }
1011:     }
1012:     
1013:     @keyframes pulseOnce {
1014:         0% { transform: scale(1); }
1015:         50% { transform: scale(1.05); }
1016:         100% { transform: scale(1); }
1017:     }
1018:     
1019:     @keyframes float {
1020:         0% { transform: translateY(0); }
1021:         50% { transform: translateY(-10px); }
1022:         100% { transform: translateY(0); }
1023:     }
1024:     
1025:     @keyframes spin {
1026:         from { transform: rotate(0deg); }
1027:         to { transform: rotate(360deg); }
1028:     }
1029:     
1030:     @keyframes bounceSoft {
1031:         0%, 100% { transform: translateY(0); }
1032:         50% { transform: translateY(-5px); }
1033:     }
1034:     
1035:     /* Customized scrollbar for better UX */
1036:     .custom-scrollbar {
1037:         scrollbar-width: thin;
1038:         scrollbar-color: var(--color-primary) transparent;
1039:     }
1040:     
1041:     .custom-scrollbar::-webkit-scrollbar {
1042:         width: 6px;
1043:         height: 6px;
1044:     }
1045:     
1046:     .custom-scrollbar::-webkit-scrollbar-track {
1047:         background: transparent;
1048:     }
1049:     
1050:     .custom-scrollbar::-webkit-scrollbar-thumb {
1051:         background-color: var(--color-primary);
1052:         border-radius: 3px;
1053:     }
1054:     
1055:     /* Text highlighting style */
1056:     ::selection {
1057:         background-color: rgba(var(--color-primary-rgb), 0.3);
1058:         color: var(--color-text);
1059:     }
1060:     
1061:     /* Glass morphism effect */
1062:     .glass-morphism {
1063:         background: rgba(var(--color-background-rgb), 0.7);
1064:         backdrop-filter: blur(10px);
1065:         -webkit-backdrop-filter: blur(10px);
1066:         border: 1px solid rgba(var(--color-border-rgb), 0.3);
1067:     }
1068:     
1069:     /* Enhanced card styles */
1070:     .card-hover {
1071:         transition: transform 0.3s ease, box-shadow 0.3s ease;
1072:     }
1073:     
1074:     .card-hover:hover {
1075:         transform: translateY(-5px);
1076:         box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
1077:     }
1078:     
1079:     /* Gradient text */
1080:     .gradient-text {
1081:         background-clip: text;
1082:         -webkit-background-clip: text;
1083:         color: transparent;
1084:         background-image: linear-gradient(to right, var(--color-primary), var(--color-accent));
1085:     }
1086:     
1087:     /* Gradient borders */
1088:     .gradient-border {
1089:         position: relative;
1090:         border-radius: 0.5rem;
1091:         z-index: 0;
1092:     }
1093:     
1094:     .gradient-border::before {
1095:         content: '';
1096:         position: absolute;
1097:         inset: -2px;
1098:         border-radius: 0.5rem;
1099:         background: linear-gradient(to right, var(--color-primary), var(--color-accent));
1100:         z-index: -1;
1101:     }
1102:     
1103:     .gradient-border::after {
1104:         content: '';
1105:         position: absolute;
1106:         inset: 0;
1107:         border-radius: 0.5rem;
1108:         background: var(--color-background);
1109:         z-index: -1;
1110:     }
1111: 
1112:     /* Enhanced button styles */
1113:     .btn {
1114:         display: inline-flex;
1115:         align-items: center;
1116:         justify-content: center;
1117:         gap: 0.5rem;
1118:         cursor: pointer;
1119:         text-align: center;
1120:         font-weight: 600;
1121:         text-decoration: none;
1122:         background-color: var(--color-primary);
1123:         color: var(--color-button-text);
1124:         padding: var(--btn-py, 0.875rem) var(--btn-px, 1.25rem);
1125:         font-size: var(--btn-font-size, 0.875rem);
1126:         border-radius: var(--btn-border-radius, 0.375rem);
1127:         position: relative;
1128:         overflow: hidden;
1129:         box-shadow: 0 4px 6px -1px rgba(var(--color-primary-rgb), 0.2), 0 2px 4px -1px rgba(var(--color-primary-rgb), 0.1);
1130:         transition: 
1131:             all var(--theme-transition-duration) var(--theme-transition-easing),
1132:             transform 0.2s ease;
1133:     }
1134: 
1135:     .btn::before {
1136:         content: '';
1137:         position: absolute;
1138:         top: 0;
1139:         left: 0;
1140:         width: 100%;
1141:         height: 100%;
1142:         background: linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(0,0,0,0.05));
1143:         pointer-events: none;
1144:     }
1145: 
1146:     .btn:hover {
1147:         box-shadow: 0 6px 10px -2px rgba(var(--color-primary-rgb), 0.25), 0 4px 6px -1px rgba(var(--color-primary-rgb), 0.15);
1148:         transform: translateY(-1px);
1149:         background-color: #266974; /* Slightly darker for better hover contrast */
1150:     }
1151:     
1152:     .btn:active {
1153:         transform: translateY(1px);
1154:         box-shadow: 0 2px 4px -1px rgba(var(--color-primary-rgb), 0.2);
1155:         background-color: #1d5058; /* Even darker for active state */
1156:     }
1157: 
1158:     .btn:disabled {
1159:         background-color: #4b5563; /* Gray that meets contrast with white */
1160:         color: #ffffff;
1161:         opacity: 0.7;
1162:         cursor: not-allowed;
1163:         box-shadow: none;
1164:         transform: none;
1165:     }
1166:     
1167:     /* Button variants */
1168:     .btn-accent {
1169:         background-color: var(--color-accent);
1170:         color: var(--color-accent-button-text); /* Dark text on light background */
1171:         box-shadow: 0 4px 6px -1px rgba(var(--color-accent-rgb), 0.2), 0 2px 4px -1px rgba(var(--color-accent-rgb), 0.1);
1172:     }
1173:     
1174:     .btn-accent:hover {
1175:         box-shadow: 0 6px 10px -2px rgba(var(--color-accent-rgb), 0.25), 0 4px 6px -1px rgba(var(--color-accent-rgb), 0.15);
1176:         background-color: #4bbbce; /* Slightly darker for hover */
1177:     }
1178:     
1179:     .btn-accent:active {
1180:         box-shadow: 0 2px 4px -1px rgba(var(--color-accent-rgb), 0.2);
1181:         background-color: #3eafc2; /* Even darker for active state */
1182:     }
1183:     
1184:     .btn-secondary {
1185:         background-color: var(--color-secondary);
1186:         color: var(--color-button-text);
1187:         box-shadow: 0 4px 6px -1px rgba(var(--color-secondary-rgb), 0.2), 0 2px 4px -1px rgba(var(--color-secondary-rgb), 0.1);
1188:     }
1189:     
1190:     .btn-secondary:hover {
1191:         box-shadow: 0 6px 10px -2px rgba(var(--color-secondary-rgb), 0.25), 0 4px 6px -1px rgba(var(--color-secondary-rgb), 0.15);
1192:         background-color: #0055a0; /* Slightly darker for hover */
1193:     }
1194:     
1195:     .btn-secondary:active {
1196:         box-shadow: 0 2px 4px -1px rgba(var(--color-secondary-rgb), 0.2);
1197:         background-color: #00488c; /* Even darker for active state */
1198:     }
1199:     
1200:     /* Outline button variant */
1201:     .btn-outline {
1202:         background-color: transparent;
1203:         color: var(--color-primary);
1204:         border: 2px solid var(--color-primary);
1205:         box-shadow: none;
1206:     }
1207:     
1208:     .btn-outline:hover {
1209:         background-color: var(--color-primary);
1210:         color: var(--color-button-text);
1211:         box-shadow: 0 6px 10px -2px rgba(var(--color-primary-rgb), 0.25), 0 4px 6px -1px rgba(var(--color-primary-rgb), 0.15);
1212:     }
1213:     
1214:     /* Ghost button variant */
1215:     .btn-ghost {
1216:         background-color: transparent;
1217:         color: var(--color-primary);
1218:         box-shadow: none;
1219:     }
1220:     
1221:     .btn-ghost:hover {
1222:         background-color: rgba(var(--color-primary-rgb), 0.1);
1223:         box-shadow: none;
1224:     }
1225:     
1226:     .btn-ghost:active {
1227:         background-color: rgba(var(--color-primary-rgb), 0.2);
1228:         box-shadow: none;
1229:     }
1230:     
1231:     /* With icon animation */
1232:     .btn-with-icon-right:hover svg {
1233:         transform: translateX(4px);
1234:         transition: transform 0.2s ease-out;
1235:     }
1236:     
1237:     .btn-with-icon-left:hover svg {
1238:         transform: translateX(-4px);
1239:         transition: transform 0.2s ease-out;
1240:     }
1241:     
1242:     /* Button size variants */
1243:     .btn-xs {
1244:         --btn-font-size: 0.75rem;
1245:         --btn-py: 0.375rem;
1246:         --btn-px: 0.75rem;
1247:         --btn-border-radius: 0.25rem;
1248:     }
1249:     
1250:     .btn-sm {
1251:         --btn-font-size: 0.875rem;
1252:         --btn-py: 0.625rem;
1253:         --btn-px: 1rem;
1254:         --btn-border-radius: 0.25rem;
1255:     }
1256:     
1257:     .form-container {
1258:         border-radius: 0.5rem;
1259:         padding: 1.5rem;
1260:         background-color: var(--color-form-bg);
1261:         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
1262:         border: 1px solid var(--color-border);
1263:         transition: 
1264:             var(--theme-transition-properties) 
1265:             var(--theme-transition-duration) 
1266:             var(--theme-transition-easing);
1267:     }
1268: 
1269:     .btn-lg {
1270:         --btn-font-size: 1.125rem;
1271:         --btn-px: 1.5rem;
1272:         --btn-py: 1.125rem;
1273:     }
1274:     
1275:     /* Card component with theme transitions */
1276:     .card {
1277:         background-color: var(--color-form-bg);
1278:         border: 1px solid var(--color-border);
1279:         border-radius: 0.5rem;
1280:         box-shadow: 0 2px 4px var(--shadow-color-light);
1281:         transition: 
1282:             var(--theme-transition-properties) 
1283:             var(--theme-transition-duration) 
1284:             var(--theme-transition-easing);
1285:     }
1286:     
1287:     /* High-contrast form labels */
1288:     .form-label {
1289:         display: block;
1290:         font-weight: 500;
1291:         margin-bottom: 0.5rem;
1292:         color: var(--color-text);
1293:     }
1294:     
1295:     /* Form error styles */
1296:     .input-error {
1297:         border-color: var(--color-error);
1298:     }
1299:     
1300:     /* Selection control styles - checkboxes and radio buttons */
1301:     .checkbox-primary,
1302:     .radio-primary {
1303:         accent-color: var(--color-primary);
1304:         width: 1rem;
1305:         height: 1rem;
1306:         border-radius: 0.25rem; /* For checkboxes */
1307:         border: 1px solid var(--color-border-default);
1308:         background-color: var(--color-background-input);
1309:         transition: var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-easing);
1310:     }
1311:     
1312:     .radio-primary {
1313:         border-radius: 50%; /* Make radio buttons circular */
1314:     }
1315:     
1316:     .checkbox-primary:focus,
1317:     .radio-primary:focus {
1318:         outline: 2px solid var(--color-primary);
1319:         outline-offset: 2px;
1320:         box-shadow: 0 0 0 2px var(--color-background-primary), 0 0 0 4px var(--color-primary);
1321:     }
1322:     
1323:     .checkbox-primary:checked,
1324:     .radio-primary:checked {
1325:         background-color: var(--color-primary);
1326:         border-color: var(--color-primary);
1327:     }
1328:     
1329:     .checkbox-primary:disabled,
1330:     .radio-primary:disabled {
1331:         background-color: var(--color-background-input-disabled);
1332:         border-color: var(--color-border-default);
1333:         cursor: not-allowed;
1334:         opacity: 0.6;
1335:     }
1336:     
1337:     /* Dark mode enhancements for selection controls */
1338:     .dark .checkbox-primary:focus,
1339:     .dark .radio-primary:focus {
1340:         outline-color: var(--color-primary-light);
1341:         box-shadow: 0 0 0 2px var(--color-background-primary), 0 0 0 4px var(--color-primary-light);
1342:     }
1343:     
1344:     .dark .checkbox-primary:checked,
1345:     .dark .radio-primary:checked {
1346:         background-color: var(--color-primary-light);
1347:         border-color: var(--color-primary-light);
1348:     }
1349:     
1350:     /* Toggle switch utility classes */
1351:     .toggle-switch {
1352:         position: relative;
1353:         display: inline-flex;
1354:         align-items: center;
1355:         cursor: pointer;
1356:     }
1357:     
1358:     .toggle-switch input {
1359:         position: absolute;
1360:         opacity: 0;
1361:         width: 0;
1362:         height: 0;
1363:     }
1364:     
1365:     .toggle-slider {
1366:         position: relative;
1367:         width: 2.75rem; /* 44px */
1368:         height: 1.5rem; /* 24px */
1369:         background-color: var(--color-border-default);
1370:         border-radius: 9999px;
1371:         transition: var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-easing);
1372:     }
1373:     
1374:     .toggle-slider::after {
1375:         content: '';
1376:         position: absolute;
1377:         top: 2px;
1378:         left: 2px;
1379:         width: 1.25rem; /* 20px */
1380:         height: 1.25rem; /* 20px */
1381:         background-color: var(--color-background-primary);
1382:         border-radius: 50%;
1383:         transition: transform var(--theme-transition-duration) var(--theme-transition-easing);
1384:     }
1385:     
1386:     .toggle-switch input:checked + .toggle-slider {
1387:         background-color: var(--color-primary);
1388:     }
1389:     
1390:     .toggle-switch input:checked + .toggle-slider::after {
1391:         transform: translateX(1.25rem); /* 20px */
1392:     }
1393:     
1394:     .toggle-switch input:focus + .toggle-slider {
1395:         outline: 2px solid var(--color-primary);
1396:         outline-offset: 2px;
1397:     }
1398:     
1399:     .toggle-switch input:disabled + .toggle-slider {
1400:         background-color: var(--color-background-input-disabled);
1401:         cursor: not-allowed;
1402:         opacity: 0.6;
1403:     }
1404:     
1405:     .toggle-switch input:disabled + .toggle-slider::after {
1406:         background-color: var(--color-text-disabled);
1407:     }
1408:     
1409:     /* Dark mode toggle switch enhancements */
1410:     .dark .toggle-switch input:checked + .toggle-slider {
1411:         background-color: var(--color-primary-light);
1412:     }
1413:     
1414:     .dark .toggle-switch input:focus + .toggle-slider {
1415:         outline-color: var(--color-primary-light);
1416:     }
1417:     
1418:     /* Ensures SVG icons in buttons have proper contrast */
1419:     .btn svg {
1420:         fill: currentColor;
1421:         stroke: currentColor;
1422:         width: 1em;
1423:         height: 1em;
1424:     }
1425: }
```

## File: src/components/debt-relief/QualificationForm.astro
```
  1: ---
  2: // src/components/debt-relief/QualificationForm.astro
  3: ---
  4: 
  5: <div id="qualification-form" class="p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-gray-900/75 transition-all duration-300">
  6:     <h3 class="mb-6 text-xl font-bold text-gray-900 dark:text-white">Quick Debt Relief Check</h3>
  7:     
  8:     <!-- Divider after header -->
  9:     <div class="border-t border-gray-200 dark:border-gray-700 mb-6"></div>
 10:     
 11:     <!-- Success Message -->
 12:     <div id="success-message" class="hidden mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
 13:         <div class="flex items-center">
 14:             <svg class="w-5 h-5 text-green-600 dark:text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
 15:                 <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
 16:             </svg>
 17:             <div>
 18:                 <h4 class="text-green-800 dark:text-green-300 font-semibold">Submission Successful!</h4>
 19:                 <p class="text-green-700 dark:text-green-400 text-sm mt-1">Thank you for your submission! A debt relief specialist will contact you shortly.</p>
 20:             </div>
 21:         </div>
 22:     </div>
 23:     
 24:     <!-- Error Message -->
 25:     <div id="general-error" class="hidden mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
 26:         <div class="flex items-center">
 27:             <svg class="w-5 h-5 text-red-600 dark:text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
 28:                 <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
 29:             </svg>
 30:             <div>
 31:                 <h4 class="text-red-800 dark:text-red-300 font-semibold">Submission Error</h4>
 32:                 <p id="general-error-text" class="text-red-700 dark:text-red-400 text-sm mt-1"></p>
 33:             </div>
 34:         </div>
 35:     </div>
 36:     
 37:     <form id="qualification-form-element" class="space-y-6">
 38:         <div class="form-control animate-fade-in-delay-1">
 39:             <label for="debt-amount" class="block mb-2 font-medium text-gray-900 dark:text-white">How much debt do you have?*</label>
 40:             <select 
 41:                 id="debt-amount" 
 42:                 name="debtAmount" 
 43:                 class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md 
 44:                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white
 45:                        focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-primary dark:focus:border-primary-light
 46:                        transition-colors duration-200 shadow-inner" 
 47:                 required
 48:             >
 49:                 <option value="">Select Amount</option>
 50:                 <option value="10000-15000">$10,000 - $15,000</option>
 51:                 <option value="15000-25000">$15,000 - $25,000</option>
 52:                 <option value="25000-50000">$25,000 - $50,000</option>
 53:                 <option value="50000+">$50,000+</option>
 54:             </select>
 55:             <div id="debt-amount-error" class="error-message hidden mt-1"></div>
 56:         </div>
 57:         
 58:         <div class="form-control animate-fade-in-delay-2">
 59:             <label for="debt-type" class="block mb-2 font-medium text-gray-900 dark:text-white">What type of debt do you have?*</label>
 60:             <select 
 61:                 id="debt-type" 
 62:                 name="debtType" 
 63:                 class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md 
 64:                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white
 65:                        focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-primary dark:focus:border-primary-light
 66:                        transition-colors duration-200 shadow-inner" 
 67:                 required
 68:             >
 69:                 <option value="">Select Type</option>
 70:                 <option value="credit-cards">Credit Cards</option>
 71:                 <option value="personal-loans">Personal Loans</option>
 72:                 <option value="medical">Medical Debt</option>
 73:                 <option value="mixed">Mixed Unsecured Debt</option>
 74:             </select>
 75:             <div id="debt-type-error" class="error-message hidden mt-1"></div>
 76:         </div>
 77:         
 78:         <div class="form-control animate-fade-in-delay-3">
 79:             <label for="phone" class="block mb-2 font-medium text-gray-900 dark:text-white">Phone Number*</label>
 80:             <input 
 81:                 type="tel" 
 82:                 id="phone" 
 83:                 name="phone" 
 84:                 class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md 
 85:                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
 86:                        focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-primary dark:focus:border-primary-light
 87:                        transition-colors duration-200 shadow-inner" 
 88:                 placeholder="(000) 000-0000" 
 89:                 required
 90:                 aria-describedby="phone-format"
 91:             />
 92:             <small id="phone-format" class="text-gray-600 dark:text-gray-400">Format: (XXX) XXX-XXXX</small>
 93:             <div id="phone-error" class="error-message hidden mt-1"></div>
 94:         </div>
 95:         
 96:         <div class="form-control animate-fade-in-delay-4">
 97:             <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white">Email Address (Optional)</label>
 98:             <input 
 99:                 type="email" 
100:                 id="email" 
101:                 name="email" 
102:                 class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md 
103:                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
104:                        focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-primary dark:focus:border-primary-light
105:                        transition-colors duration-200 shadow-inner" 
106:                 placeholder="your.email@example.com"
107:                 aria-describedby="email-help"
108:             />
109:             <small id="email-help" class="text-gray-600 dark:text-gray-400">Receive confirmation and updates about your debt relief options</small>
110:             <div id="email-error" class="error-message hidden mt-1"></div>
111:         </div>
112:         
113:         <!-- GDPR Consent Section -->
114:         <div class="form-control animate-fade-in-delay-5">
115:             <fieldset class="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
116:                 <legend class="text-sm font-medium text-gray-900 dark:text-white px-2">Privacy and Consent</legend>
117:                 
118:                 <div class="space-y-3">
119:                     <!-- Required Data Processing Consent -->
120:                     <div class="flex items-start">
121:                         <input 
122:                             type="checkbox" 
123:                             id="consent-processing" 
124:                             name="consentProcessing" 
125:                             required
126:                             class="mt-1 w-4 h-4 text-primary bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-primary dark:focus:ring-primary-light focus:ring-2"
127:                         />
128:                         <label for="consent-processing" class="ml-3 text-sm text-gray-900 dark:text-white">
129:                             <span class="font-medium">I consent to the processing of my personal data*</span>
130:                             <span class="block text-gray-600 dark:text-gray-400 mt-1">
131:                                 Required to process your debt relief inquiry and contact you with available options.
132:                             </span>
133:                         </label>
134:                     </div>
135:                     <div id="consent-processing-error" class="error-message hidden"></div>
136:                     
137:                     <!-- Optional Marketing Consent -->
138:                     <div class="flex items-start">
139:                         <input 
140:                             type="checkbox" 
141:                             id="consent-marketing" 
142:                             name="consentMarketing"
143:                             class="mt-1 w-4 h-4 text-primary bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-primary dark:focus:ring-primary-light focus:ring-2"
144:                         />
145:                         <label for="consent-marketing" class="ml-3 text-sm text-gray-900 dark:text-white">
146:                             <span class="font-medium">I consent to receive marketing communications (Optional)</span>
147:                             <span class="block text-gray-600 dark:text-gray-400 mt-1">
148:                                 Receive updates about additional financial services that may benefit you.
149:                             </span>
150:                         </label>
151:                     </div>
152:                     
153:                     <!-- Privacy Policy Links -->
154:                     <div class="text-xs text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
155:                         By submitting this form, you agree to our 
156:                         <a href="/privacy-policy" target="_blank" class="text-primary dark:text-primary-light underline hover:no-underline">Privacy Policy</a> 
157:                         and 
158:                         <a href="/terms-of-service" target="_blank" class="text-primary dark:text-primary-light underline hover:no-underline">Terms of Service</a>.
159:                     </div>
160:                 </div>
161:             </fieldset>
162:         </div>
163:         
164:         <!-- Divider before button -->
165:         <div class="border-t border-gray-200 dark:border-gray-700 pt-4"></div>
166:         
167:         <button 
168:             type="submit" 
169:             id="submit-button"
170:             class="w-full p-4 text-center font-bold btn btn-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all animate-pulse-once"
171:             aria-label="Submit form to check your savings options"
172:         >
173:             <span id="submit-text">Check Your Savings Options</span>
174:             <span id="submit-spinner" class="hidden">
175:                 <svg class="inline w-5 h-5 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
176:                     <path d="m100 50.5908c0 27.2899-22.2071 49.497-49.497 49.497s-49.497-22.2071-49.497-49.497c0-27.2899 22.2071-49.497 49.497-49.497s49.497 22.2071 49.497 49.497z" fill="currentColor"/>
177:                     <path d="m93.9676 39.0409c0-4.9706-4.0326-9.003-9.003-9.003s-9.003 4.0324-9.003 9.003c0 4.9706 4.0326 9.003 9.003 9.003s9.003-4.0324 9.003-9.003z" fill="currentFill"/>
178:                 </svg>
179:                 Submitting...
180:             </span>
181:         </button>
182:     </form>
183:     
184:     <p class="mt-6 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
185:         By submitting, you authorize DebtFreedom to contact you at the number provided using automated technology. 
186:         Your information is kept secure and confidential.
187:     </p>
188: </div>
189: 
190: <style>
191:     /* Theme-aware container with enhanced depth */
192:     #qualification-form {
193:         transition: all var(--theme-transition-duration) var(--theme-transition-easing);
194:     }
195:     
196:     /* Enhanced focus states for better accessibility with theme awareness */
197:     select:focus, input:focus {
198:         outline: none;
199:         box-shadow: 0 0 0 3px rgba(45, 121, 132, 0.3);
200:     }
201:     
202:     /* Dark mode focus states */
203:     .dark select:focus, .dark input:focus {
204:         box-shadow: 0 0 0 3px rgba(88, 203, 224, 0.4);
205:     }
206:     
207:     /* Error states with high contrast and theme awareness */
208:     .error-message {
209:         color: #ef4444; /* Light mode error */
210:         font-size: 0.875rem;
211:         font-weight: 500;
212:     }
213:     
214:     .dark .error-message {
215:         color: #fc8181; /* Dark mode error - lighter for better contrast */
216:     }
217:     
218:     .input-error {
219:         border-color: #ef4444 !important; /* Light mode error border */
220:     }
221:     
222:     .dark .input-error {
223:         border-color: #fc8181 !important; /* Dark mode error border */
224:     }
225:     
226:     /* Theme-aware placeholder styling */
227:     input::placeholder {
228:         transition: color var(--theme-transition-duration) var(--theme-transition-easing);
229:     }
230:     
231:     /* Improve form field appearance on mobile */
232:     @media (max-width: 640px) {
233:         select, input {
234:             font-size: 16px; /* Prevents iOS zoom on focus */
235:         }
236:     }
237:     
238:     /* Container hover effects with theme awareness */
239:     #qualification-form:hover {
240:         transform: translateY(-2px);
241:     }
242:     
243:     /* Divider styling with smooth transitions */
244:     .border-t {
245:         transition: border-color var(--theme-transition-duration) var(--theme-transition-easing);
246:     }
247:     
248:     /* Accessibility improvements */
249:     @media (prefers-reduced-motion: reduce) {
250:         #qualification-form,
251:         #qualification-form:hover,
252:         .border-t,
253:         input::placeholder {
254:             transition: none !important;
255:             transform: none !important;
256:         }
257:     }
258:     
259:     /* High contrast mode adjustments */
260:     @media (prefers-contrast: high) {
261:         #qualification-form {
262:             border-width: 2px;
263:         }
264:         
265:         select, input {
266:             border-width: 2px;
267:         }
268:     }
269: </style>
270: 
271: <script>
272: // Import cleave.js and US phone addon
273: import Cleave from 'cleave.js';
274: import 'cleave.js/dist/addons/cleave-phone.us';
275: 
276: // Client-side validation and form handling
277: document.addEventListener('DOMContentLoaded', async () => {
278:     const form = document.getElementById('qualification-form-element');
279:     
280:     // CSRF token management
281:     let csrfToken = null;
282:     let sessionId = null;
283:     
284:     // Fetch CSRF token on page load
285:     try {
286:         const csrfResponse = await fetch('/api/csrf-token');
287:         if (csrfResponse.ok) {
288:             const csrfData = await csrfResponse.json();
289:             csrfToken = csrfData.token;
290:             sessionId = csrfData.sessionId;
291:             console.log('CSRF token obtained successfully');
292:         } else {
293:             console.warn('Failed to obtain CSRF token');
294:         }
295:     } catch (error) {
296:         console.warn('Error fetching CSRF token:', error);
297:     }
298:     const phoneInput = document.getElementById('phone');
299:     const emailInput = document.getElementById('email');
300:     const debtAmountSelect = document.getElementById('debt-amount');
301:     const debtTypeSelect = document.getElementById('debt-type');
302:     const consentProcessingCheckbox = document.getElementById('consent-processing');
303:     const consentMarketingCheckbox = document.getElementById('consent-marketing');
304:     
305:     // Error elements
306:     const debtAmountError = document.getElementById('debt-amount-error');
307:     const debtTypeError = document.getElementById('debt-type-error');
308:     const phoneError = document.getElementById('phone-error');
309:     const emailError = document.getElementById('email-error');
310:     const consentProcessingError = document.getElementById('consent-processing-error');
311:     
312:     // UI elements
313:     const successMessage = document.getElementById('success-message');
314:     const generalError = document.getElementById('general-error');
315:     const generalErrorText = document.getElementById('general-error-text');
316:     const submitButton = document.getElementById('submit-button');
317:     const submitText = document.getElementById('submit-text');
318:     const submitSpinner = document.getElementById('submit-spinner');
319:     
320:     // Initialize cleave.js for phone formatting
321:     let phoneCleave = null;
322:     if (phoneInput) {
323:         phoneCleave = new Cleave(phoneInput, {
324:             phone: true,
325:             phoneRegionCode: 'US'
326:         });
327:         
328:         // Clear error when user types
329:         phoneInput.addEventListener('input', () => {
330:             clearError(phoneInput, phoneError);
331:         });
332:     }
333:     
334:     // Function to show success message
335:     const showSuccess = () => {
336:         hideMessages();
337:         successMessage.classList.remove('hidden');
338:         successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
339:     };
340:     
341:     // Function to show general error
342:     const showGeneralError = (message) => {
343:         hideMessages();
344:         generalErrorText.textContent = message;
345:         generalError.classList.remove('hidden');
346:         generalError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
347:     };
348:     
349:     // Function to hide all messages
350:     const hideMessages = () => {
351:         successMessage.classList.add('hidden');
352:         generalError.classList.add('hidden');
353:     };
354:     
355:     // Function to show field error
356:     const showError = (element, errorElement, message) => {
357:         element.classList.add('input-error');
358:         errorElement.textContent = message;
359:         errorElement.classList.remove('hidden');
360:     };
361:     
362:     // Function to clear field error
363:     const clearError = (element, errorElement) => {
364:         element.classList.remove('input-error');
365:         errorElement.textContent = '';
366:         errorElement.classList.add('hidden');
367:     };
368:     
369:     // Function to set loading state
370:     const setLoadingState = (loading) => {
371:         if (loading) {
372:             submitButton.disabled = true;
373:             submitButton.classList.add('opacity-75', 'cursor-not-allowed');
374:             submitText.classList.add('hidden');
375:             submitSpinner.classList.remove('hidden');
376:         } else {
377:             submitButton.disabled = false;
378:             submitButton.classList.remove('opacity-75', 'cursor-not-allowed');
379:             submitText.classList.remove('hidden');
380:             submitSpinner.classList.add('hidden');
381:         }
382:     };
383:     
384:     // Clear errors when user interacts with fields
385:     debtAmountSelect && debtAmountSelect.addEventListener('change', () => clearError(debtAmountSelect, debtAmountError));
386:     debtTypeSelect && debtTypeSelect.addEventListener('change', () => clearError(debtTypeSelect, debtTypeError));
387:     emailInput && emailInput.addEventListener('input', () => clearError(emailInput, emailError));
388:     consentProcessingCheckbox && consentProcessingCheckbox.addEventListener('change', () => clearError(consentProcessingCheckbox, consentProcessingError));
389:     
390:     // Form submission
391:     if (form) {
392:         form.addEventListener('submit', async (e) => {
393:             e.preventDefault();
394:             let isValid = true;
395:             
396:             // Hide any previous messages
397:             hideMessages();
398:             
399:             // Clear any previous field errors
400:             clearError(debtAmountSelect, debtAmountError);
401:             clearError(debtTypeSelect, debtTypeError);
402:             clearError(phoneInput, phoneError);
403:             clearError(emailInput, emailError);
404:             clearError(consentProcessingCheckbox, consentProcessingError);
405:             
406:             // Validate debt amount
407:             if (!debtAmountSelect.value) {
408:                 showError(debtAmountSelect, debtAmountError, 'Please select your debt amount');
409:                 isValid = false;
410:             }
411:             
412:             // Validate debt type
413:             if (!debtTypeSelect.value) {
414:                 showError(debtTypeSelect, debtTypeError, 'Please select your debt type');
415:                 isValid = false;
416:             }
417:             
418:             // Validate phone using cleave.js getRawValue()
419:             const rawPhone = phoneCleave ? phoneCleave.getRawValue() : phoneInput.value.replace(/\D/g, '');
420:             if (!rawPhone || rawPhone.length !== 10) {
421:                 showError(phoneInput, phoneError, 'Please enter a valid 10-digit phone number');
422:                 isValid = false;
423:             }
424:             
425:             // Validate email (optional, but if provided must be valid)
426:             const emailValue = emailInput.value.trim();
427:             if (emailValue && !isValidEmail(emailValue)) {
428:                 showError(emailInput, emailError, 'Please enter a valid email address');
429:                 isValid = false;
430:             }
431:             
432:             // Validate required consent
433:             if (!consentProcessingCheckbox.checked) {
434:                 showError(consentProcessingCheckbox, consentProcessingError, 'You must consent to data processing to submit this form');
435:                 isValid = false;
436:             }
437:             
438:             if (!isValid) {
439:                 // Scroll to first error
440:                 const firstError = document.querySelector('.input-error');
441:                 if (firstError) {
442:                     firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
443:                 }
444:                 return;
445:             }
446:             
447:             // Set loading state
448:             setLoadingState(true);
449:             
450:             try {
451:                 // Prepare submission data
452:                 const submissionData = {
453:                     debtAmount: debtAmountSelect.value,
454:                     debtType: debtTypeSelect.value,
455:                     phone: rawPhone,
456:                     email: emailValue || undefined,
457:                     consentProcessing: consentProcessingCheckbox.checked,
458:                     consentMarketing: consentMarketingCheckbox.checked,
459:                     source: 'qualification-form'
460:                 };
461:                 
462:                 // Prepare headers with CSRF token
463:                 const headers = {
464:                     'Content-Type': 'application/json'
465:                 };
466:                 
467:                 if (csrfToken) {
468:                     headers['x-csrf-token'] = csrfToken;
469:                 }
470:                 
471:                 // Submit to API
472:                 const response = await fetch('/api/leads', {
473:                     method: 'POST',
474:                     headers,
475:                     body: JSON.stringify(submissionData)
476:                 });
477:                 
478:                 const result = await response.json();
479:                 
480:                 if (response.ok && result.success) {
481:                     // Success - show success message and reset form
482:                     showSuccess();
483:                     
484:                     // Reset form and cleave instance
485:                     form.reset();
486:                     if (phoneCleave) {
487:                         phoneCleave.setRawValue('');
488:                     }
489:                     
490:                     // Optional: Track success event for analytics
491:                     console.log('Lead submitted successfully:', result.leadId);
492:                     
493:                 } else {
494:                     // Handle API errors
495:                     if (result.errors) {
496:                         let hasFieldErrors = false;
497:                         
498:                         // Show field-specific errors
499:                         Object.entries(result.errors).forEach(([field, message]) => {
500:                             switch (field) {
501:                                 case 'debtAmount':
502:                                     showError(debtAmountSelect, debtAmountError, message);
503:                                     hasFieldErrors = true;
504:                                     break;
505:                                 case 'debtType':
506:                                     showError(debtTypeSelect, debtTypeError, message);
507:                                     hasFieldErrors = true;
508:                                     break;
509:                                 case 'phone':
510:                                     showError(phoneInput, phoneError, message);
511:                                     hasFieldErrors = true;
512:                                     break;
513:                                 case 'email':
514:                                     showError(emailInput, emailError, message);
515:                                     hasFieldErrors = true;
516:                                     break;
517:                                 case 'consentProcessing':
518:                                     showError(consentProcessingCheckbox, consentProcessingError, message);
519:                                     hasFieldErrors = true;
520:                                     break;
521:                                 default:
522:                                     // Show general error for non-field-specific errors
523:                                     showGeneralError(message);
524:                             }
525:                         });
526:                         
527:                         // If we have field errors, scroll to the first one
528:                         if (hasFieldErrors) {
529:                             const firstError = document.querySelector('.input-error');
530:                             if (firstError) {
531:                                 firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
532:                             }
533:                         }
534:                     } else {
535:                         // Show general error message
536:                         showGeneralError(result.message || 'An error occurred. Please try again.');
537:                     }
538:                     
539:                     // Handle specific error cases
540:                     if (response.status === 429) {
541:                         showGeneralError('You have submitted too many requests. Please try again in an hour.');
542:                     } else if (response.status === 409) {
543:                         showGeneralError('A submission with this information was already received recently.');
544:                     } else if (response.status === 403 && result.code === 'CSRF_TOKEN_INVALID') {
545:                         // Try to refresh CSRF token and retry once
546:                         try {
547:                             const csrfResponse = await fetch('/api/csrf-token');
548:                             if (csrfResponse.ok) {
549:                                 const csrfData = await csrfResponse.json();
550:                                 csrfToken = csrfData.token;
551:                                 sessionId = csrfData.sessionId;
552:                                 showGeneralError('Security token expired. Please try submitting again.');
553:                             } else {
554:                                 showGeneralError('Security validation failed. Please refresh the page and try again.');
555:                             }
556:                         } catch (tokenError) {
557:                             showGeneralError('Security validation failed. Please refresh the page and try again.');
558:                         }
559:                     } else if (response.status === 403) {
560:                         showGeneralError('Request blocked by security policy. Please refresh the page and try again.');
561:                     }
562:                 }
563:                 
564:             } catch (error) {
565:                 console.error('Form submission error:', error);
566:                 showGeneralError('Unable to submit form. Please check your internet connection and try again.');
567:             } finally {
568:                 // Remove loading state
569:                 setLoadingState(false);
570:             }
571:         });
572:     }
573:     
574:     // Email validation helper
575:     function isValidEmail(email) {
576:         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
577:         return emailRegex.test(email);
578:     }
579: });
580: </script>
```

## File: src/components/Footer.astro
```
  1: ---
  2: import Logo from "./Logo.astro";
  3: import FacebookIcon from "./icons/FacebookIcon.astro";
  4: import TwitterIcon from "./icons/TwitterIcon.astro";
  5: import LinkedInIcon from "./icons/LinkedInIcon.astro";
  6: import InstagramIcon from "./icons/InstagramIcon.astro";
  7: import PhoneIcon from "./icons/PhoneIcon.astro";
  8: import EmailIcon from "./icons/EmailIcon.astro";
  9: import LocationIcon from "./icons/LocationIcon.astro";
 10: import ClockIcon from "./icons/ClockIcon.astro";
 11: ---
 12: 
 13: <!-- Modern 2025 Footer Design -->
 14: <footer class="modern-footer relative overflow-hidden">
 15:     <!-- Newsletter CTA Section -->
 16:     <div class="newsletter-section bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[var(--color-primary)] py-16 px-6 text-center relative">
 17:         <div class="absolute inset-0 bg-black/20"></div>
 18:         <div class="container mx-auto max-w-4xl relative z-10">
 19:             <div class="mb-8">
 20:                 <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
 21:                     Start Your Debt-Free Journey Today
 22:                 </h2>
 23:                 <p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
 24:                     Join thousands who've already taken control of their financial future. Get personalized debt relief strategies delivered to your inbox.
 25:                 </p>
 26:             </div>
 27:             
 28:             <div class="newsletter-form flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
 29:                 <input 
 30:                     type="email" 
 31:                     placeholder="Enter your email address" 
 32:                     class="flex-1 px-6 py-4 rounded-lg border-0 bg-white text-[var(--color-text-primary)] placeholder-gray-500 focus:ring-4 focus:ring-white/30 focus:outline-none text-lg"
 33:                 />
 34:                 <button class="btn-primary px-8 py-4 bg-white text-[var(--color-primary)] font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-lg shadow-lg">
 35:                     Get Started
 36:                 </button>
 37:             </div>
 38:             
 39:             <p class="text-sm text-white/70 mt-4 opacity-80">
 40:                 🔒 Your information is secure and never shared
 41:             </p>
 42:         </div>
 43:         
 44:         <!-- Animated background elements -->
 45:         <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
 46:             <div class="floating-element absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
 47:             <div class="floating-element absolute top-3/4 right-1/4 w-12 h-12 bg-white/5 rounded-full animate-pulse delay-1000"></div>
 48:             <div class="floating-element absolute top-1/2 right-1/3 w-8 h-8 bg-white/10 rounded-full animate-pulse delay-500"></div>
 49:         </div>
 50:     </div>
 51: 
 52:     <!-- Main Footer Content -->
 53:     <div class="main-footer" style="background: linear-gradient(to bottom, var(--color-background-secondary), var(--color-background-primary));">
 54:         <div class="container mx-auto max-w-7xl py-20 px-6">
 55:             <div class="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
 56:                 
 57:                 <!-- Company Brand Section -->
 58:                 <div class="lg:col-span-1 space-y-6">
 59:                     <div class="brand-section">
 60:                         <a href="/" class="inline-block mb-6 transform hover:scale-105 transition-transform duration-300" aria-label="Debt Freedom Toolkit">
 61:                             <Logo />
 62:                         </a>
 63:                         <p class="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-6">
 64:                             Transforming financial futures since 2010. We've helped over 50,000 Americans eliminate $2.8 billion in debt.
 65:                         </p>
 66:                     </div>
 67:                     
 68:                     <!-- Trust Badges -->
 69:                     <div class="trust-badges space-y-3">
 70:                         <div class="flex items-center gap-3 text-[var(--color-success)]">
 71:                             <div class="w-2 h-2 bg-[var(--color-success)] rounded-full animate-pulse"></div>
 72:                             <span class="text-sm font-medium">BBB A+ Accredited Business</span>
 73:                         </div>
 74:                         <div class="flex items-center gap-3 text-[var(--color-info)]">
 75:                             <div class="w-2 h-2 bg-[var(--color-info)] rounded-full animate-pulse"></div>
 76:                             <span class="text-sm font-medium">256-bit SSL Encryption</span>
 77:                         </div>
 78:                         <div class="flex items-center gap-3 text-[var(--color-primary-light)]">
 79:                             <div class="w-2 h-2 bg-[var(--color-primary-light)] rounded-full animate-pulse"></div>
 80:                             <span class="text-sm font-medium">IAPDA Certified</span>
 81:                         </div>
 82:                     </div>
 83:                     
 84:                     <!-- Social Media -->
 85:                     <div class="social-section">
 86:                         <h4 class="text-lg font-bold mb-4 text-[#58cbe0]">Follow Our Journey</h4>
 87:                         <div class="flex space-x-4">
 88:                             <a href="https://facebook.com/debtfreedomtoolkit" class="social-icon-modern group" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
 89:                                 <div class="w-12 h-12 bg-gradient-to-br from-[#1877f2] to-[#0c5aa6] rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg text-white">
 90:                                     <FacebookIcon />
 91:                                 </div>
 92:                             </a>
 93:                             <a href="https://twitter.com/debtfreedomtool" class="social-icon-modern group" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
 94:                                 <div class="w-12 h-12 bg-gradient-to-br from-[#1da1f2] to-[#0d8bd9] rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg text-white">
 95:                                     <TwitterIcon />
 96:                                 </div>
 97:                             </a>
 98:                             <a href="https://linkedin.com/company/debt-freedom-toolkit" class="social-icon-modern group" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
 99:                                 <div class="w-12 h-12 bg-gradient-to-br from-[#0077b5] to-[#005582] rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg text-white">
100:                                     <LinkedInIcon />
101:                                 </div>
102:                             </a>
103:                             <a href="https://instagram.com/debtfreedomtoolkit" class="social-icon-modern group" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
104:                                 <div class="w-12 h-12 bg-gradient-to-br from-[#e4405f] via-[#f56040] to-[#ffdc80] rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg text-white">
105:                                     <InstagramIcon />
106:                                 </div>
107:                             </a>
108:                         </div>
109:                     </div>
110:                 </div>
111:                 
112:                 <!-- Navigation Links -->
113:                 <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
114:                     <!-- Quick Links -->
115:                     <div class="nav-section">
116:                         <h4 class="text-xl font-bold mb-6 text-[var(--color-primary-light)] border-b-2 border-[var(--color-primary-light)]/30 pb-2">Quick Links</h4>
117:                         <nav>
118:                             <ul class="space-y-4">
119:                                 <li><a href="/" class="footer-link text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] transition-all duration-300 group flex items-center gap-2">
120:                                     <span class="w-1 h-1 bg-[var(--color-primary-light)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
121:                                     Home
122:                                 </a></li>
123:                                 <li><a href="/#benefits" class="footer-link text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] transition-all duration-300 group flex items-center gap-2">
124:                                     <span class="w-1 h-1 bg-[var(--color-primary-light)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
125:                                     How It Works
126:                                 </a></li>
127:                                 <li><a href="/#testimonials" class="footer-link text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] transition-all duration-300 group flex items-center gap-2">
128:                                     <span class="w-1 h-1 bg-[var(--color-primary-light)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
129:                                     Success Stories
130:                                 </a></li>
131:                                 <li><a href="/debt-relief" class="footer-link text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] transition-all duration-300 group flex items-center gap-2">
132:                                     <span class="w-1 h-1 bg-[var(--color-primary-light)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
133:                                     Debt Relief Services
134:                                 </a></li>
135:                             </ul>
136:                         </nav>
137:                     </div>
138:                     
139:                     <!-- Resources & Legal -->
140:                     <div class="nav-section">
141:                         <h4 class="text-xl font-bold mb-6 text-[var(--color-primary-light)] border-b-2 border-[var(--color-primary-light)]/30 pb-2">Resources & Legal</h4>
142:                         <nav>
143:                             <ul class="space-y-4">
144:                                 <li><a href="/privacy-policy" class="footer-link text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] transition-all duration-300 group flex items-center gap-2">
145:                                     <span class="w-1 h-1 bg-[var(--color-primary-light)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
146:                                     Privacy Policy
147:                                 </a></li>
148:                                 <li><a href="/data-rights" class="footer-link text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] transition-all duration-300 group flex items-center gap-2">
149:                                     <span class="w-1 h-1 bg-[var(--color-primary-light)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
150:                                     Your Data Rights
151:                                 </a></li>
152:                                 <li><a href="/terms-of-service" class="footer-link text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] transition-all duration-300 group flex items-center gap-2">
153:                                     <span class="w-1 h-1 bg-[var(--color-primary-light)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
154:                                     Terms of Service
155:                                 </a></li>
156:                                 <li><a href="/debt-relief" class="footer-link text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] transition-all duration-300 group flex items-center gap-2">
157:                                     <span class="w-1 h-1 bg-[var(--color-primary-light)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
158:                                     Debt Calculator
159:                                 </a></li>
160:                                 <li><a href="/contact" class="footer-link text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] transition-all duration-300 group flex items-center gap-2">
161:                                     <span class="w-1 h-1 bg-[var(--color-primary-light)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
162:                                     FAQ & Support
163:                                 </a></li>
164:                                 <li><a href="/" class="footer-link text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] transition-all duration-300 group flex items-center gap-2">
165:                                     <span class="w-1 h-1 bg-[var(--color-primary-light)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
166:                                     Sitemap
167:                                 </a></li>
168:                             </ul>
169:                         </nav>
170:                     </div>
171:                 </div>
172:                 
173:                 <!-- Contact Section -->
174:                 <div class="lg:col-span-1">
175:                     <h4 class="text-xl font-bold mb-6 text-[var(--color-primary-light)] border-b-2 border-[var(--color-primary-light)]/30 pb-2">Get In Touch</h4>
176:                     <div class="contact-info space-y-6">
177:                         <div class="contact-item group">
178:                             <div class="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-background-secondary)] hover:bg-[var(--color-background-tertiary)] transition-all duration-300 transform group-hover:scale-105">
179:                                 <div class="icon-wrapper mt-1">
180:                                     <PhoneIcon class="text-[var(--color-success)] w-5 h-5" />
181:                                 </div>
182:                                 <div>
183:                                     <p class="text-sm text-[var(--color-text-muted)] mb-1">Call Us Now</p>
184:                                     <a href="tel:+18005551234" class="text-[var(--color-text-primary)] font-semibold hover:text-[var(--color-success)] transition-colors">
185:                                         (800) 555-1234
186:                                     </a>
187:                                 </div>
188:                             </div>
189:                         </div>
190:                         
191:                         <div class="contact-item group">
192:                             <div class="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-background-secondary)] hover:bg-[var(--color-background-tertiary)] transition-all duration-300 transform group-hover:scale-105">
193:                                 <div class="icon-wrapper mt-1">
194:                                     <EmailIcon class="text-[var(--color-info)] w-5 h-5" />
195:                                 </div>
196:                                 <div>
197:                                     <p class="text-sm text-[var(--color-text-muted)] mb-1">Email Support</p>
198:                                     <a href="mailto:support@debtfreedomtoolkit.com" class="text-[var(--color-text-primary)] font-semibold hover:text-[var(--color-info)] transition-colors break-all">
199:                                         support@debtfreedomtoolkit.com
200:                                     </a>
201:                                 </div>
202:                             </div>
203:                         </div>
204:                         
205:                         <div class="contact-item group">
206:                             <div class="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-background-secondary)] hover:bg-[var(--color-background-tertiary)] transition-all duration-300 transform group-hover:scale-105">
207:                                 <div class="icon-wrapper mt-1">
208:                                     <ClockIcon class="text-[var(--color-primary-light)] w-5 h-5" />
209:                                 </div>
210:                                 <div>
211:                                     <p class="text-sm text-[var(--color-text-muted)] mb-1">Business Hours</p>
212:                                     <div class="text-[var(--color-text-primary)] font-medium">
213:                                         <p>Mon-Fri: 9:00am - 8:00pm EST</p>
214:                                         <p class="text-sm text-[var(--color-text-secondary)]">Sat-Sun: 10:00am - 6:00pm EST</p>
215:                                     </div>
216:                                 </div>
217:                             </div>
218:                         </div>
219:                     </div>
220:                 </div>
221:             </div>
222:             
223:             <!-- Bottom Section -->
224:             <div class="bottom-section border-t border-[var(--color-border-default)] pt-8">
225:                 <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
226:                     <!-- Disclaimer -->
227:                     <div class="lg:col-span-2">
228:                         <div class="disclaimer-section space-y-4">
229:                             <div class="bg-[var(--color-background-secondary)] p-6 rounded-xl border border-[var(--color-border-default)]">
230:                                 <p class="text-xs text-[var(--color-text-muted)] leading-relaxed mb-3">
231:                                     <strong class="text-[var(--color-warning)]">Important Disclaimer:</strong> Debt Freedom Toolkit is not a lender or debt settlement company. We do not provide financial advice or credit repair services. Results vary by individual. This website is for informational purposes only and is not an offer or solicitation for debt settlement services.
232:                                 </p>
233:                                 <div class="flex flex-wrap gap-4 text-xs text-[var(--color-text-muted)]">
234:                                     <span class="flex items-center gap-2">
235:                                         <div class="w-2 h-2 bg-[var(--color-success)] rounded-full"></div>
236:                                         BBB A+ Rating
237:                                     </span>
238:                                     <span class="flex items-center gap-2">
239:                                         <div class="w-2 h-2 bg-[var(--color-info)] rounded-full"></div>
240:                                         AFCC Member
241:                                     </span>
242:                                     <span class="flex items-center gap-2">
243:                                         <div class="w-2 h-2 bg-[var(--color-primary-light)] rounded-full"></div>
244:                                         IAPDA Certified
245:                                     </span>
246:                                 </div>
247:                             </div>
248:                         </div>
249:                     </div>
250:                     
251:                     <!-- Security & Payment -->
252:                     <div class="lg:col-span-1">
253:                         <div class="security-section text-center lg:text-right">
254:                             <p class="text-sm text-[var(--color-text-muted)] mb-4">
255:                                 <span class="flex items-center justify-center lg:justify-end gap-2 mb-2">
256:                                     <div class="w-3 h-3 bg-[var(--color-success)] rounded-full animate-pulse"></div>
257:                                     <strong class="text-[var(--color-success)]">Secure & Protected</strong>
258:                                 </span>
259:                                 256-bit SSL encryption protects all your personal information
260:                             </p>
261:                             
262:                             <!-- Payment Methods -->
263:                             <div class="payment-methods-modern">
264:                                 <p class="text-xs text-[var(--color-text-muted)] mb-3">Secure Payment Methods:</p>
265:                                 <div class="flex justify-center lg:justify-end gap-2">
266:                                     <div class="payment-card w-10 h-6 bg-gradient-to-r from-[var(--color-info)] to-[var(--color-info-dark)] rounded opacity-80 hover:opacity-100 transition-opacity"></div>
267:                                     <div class="payment-card w-10 h-6 bg-gradient-to-r from-[var(--color-error)] to-[var(--color-error-dark)] rounded opacity-80 hover:opacity-100 transition-opacity"></div>
268:                                     <div class="payment-card w-10 h-6 bg-gradient-to-r from-[var(--color-success)] to-[var(--color-success-dark)] rounded opacity-80 hover:opacity-100 transition-opacity"></div>
269:                                     <div class="payment-card w-10 h-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded opacity-80 hover:opacity-100 transition-opacity"></div>
270:                                 </div>
271:                             </div>
272:                         </div>
273:                     </div>
274:                 </div>
275:                 
276:                 <!-- Copyright -->
277:                 <div class="copyright-section text-center pt-8 border-t border-[var(--color-border-subtle)] mt-8">
278:                     <p class="text-sm text-[var(--color-text-muted)]">
279:                         © {new Date().getFullYear()} DebtFreedom Financial Solutions LLC. All rights reserved. 
280:                         <span class="text-[var(--color-primary-light)]">Building Financial Freedom Since 2010</span>
281:                     </p>
282:                 </div>
283:             </div>
284:         </div>
285:     </div>
286: </footer>
287: 
288: <style>
289: /* Modern Footer Styling */
290: .modern-footer {
291:     position: relative;
292:     overflow: hidden;
293: }
294: 
295: /* Newsletter Section Animations */
296: @keyframes float {
297:     0%, 100% { transform: translateY(0px) rotate(0deg); }
298:     33% { transform: translateY(-10px) rotate(1deg); }
299:     66% { transform: translateY(5px) rotate(-1deg); }
300: }
301: 
302: .floating-element {
303:     animation: float 6s ease-in-out infinite;
304: }
305: 
306: /* Enhanced Social Icons */
307: .social-icon-modern {
308:     position: relative;
309:     overflow: hidden;
310: }
311: 
312: .social-icon-modern::before {
313:     content: '';
314:     position: absolute;
315:     top: 0;
316:     left: -100%;
317:     width: 100%;
318:     height: 100%;
319:     background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
320:     transition: left 0.6s;
321:     border-radius: 12px;
322: }
323: 
324: .social-icon-modern:hover::before {
325:     left: 100%;
326: }
327: 
328: /* Footer Links Enhancement - Override base link styles */
329: .footer-link {
330:     position: relative;
331:     display: inline-block;
332:     font-weight: 500;
333:     text-decoration: none !important; /* Remove underlines */
334:     color: inherit !important; /* Use the color from parent/utility classes */
335: }
336: 
337: .footer-link:visited {
338:     color: inherit !important; /* Ensure visited links don't change color */
339: }
340: 
341: .footer-link::after {
342:     content: '';
343:     position: absolute;
344:     width: 0;
345:     height: 1px;
346:     bottom: -2px;
347:     left: 0;
348:     background-color: var(--color-primary-light);
349:     transition: width 0.3s ease-in-out;
350: }
351: 
352: .footer-link:hover::after {
353:     width: 100%;
354: }
355: 
356: /* Ensure all footer links don't have underlines */
357: .modern-footer a:not(.btn) {
358:     text-decoration: none !important;
359: }
360: 
361: .modern-footer a:not(.btn):hover {
362:     text-decoration: none !important;
363: }
364: 
365: /* Contact Item Hover Effects */
366: .contact-item {
367:     cursor: pointer;
368: }
369: 
370: /* Newsletter Form Styling */
371: .newsletter-form input {
372:     box-shadow: 0 10px 25px rgba(0,0,0,0.1);
373: }
374: 
375: .newsletter-form input:focus {
376:     transform: translateY(-2px);
377:     box-shadow: 0 15px 35px rgba(0,0,0,0.15);
378: }
379: 
380: .btn-primary {
381:     box-shadow: 0 10px 25px rgba(0,0,0,0.1);
382: }
383: 
384: .btn-primary:hover {
385:     box-shadow: 0 15px 35px rgba(0,0,0,0.15);
386: }
387: 
388: /* Payment Cards */
389: .payment-card {
390:     cursor: pointer;
391:     box-shadow: 0 4px 8px rgba(0,0,0,0.2);
392: }
393: 
394: .payment-card:hover {
395:     transform: translateY(-2px);
396:     box-shadow: 0 8px 16px rgba(0,0,0,0.3);
397: }
398: 
399: /* Responsive Design */
400: @media (max-width: 768px) {
401:     .newsletter-section {
402:         padding: 3rem 1rem;
403:     }
404:     
405:     .main-footer {
406:         padding: 3rem 1rem;
407:     }
408:     
409:     .newsletter-form {
410:         flex-direction: column;
411:     }
412:     
413:     .social-icon-modern {
414:         margin-bottom: 1rem;
415:     }
416: }
417: 
418: /* Accessibility */
419: @media (prefers-reduced-motion: reduce) {
420:     .floating-element,
421:     .social-icon-modern,
422:     .contact-item,
423:     .payment-card {
424:         animation: none;
425:         transform: none;
426:         transition: none;
427:     }
428:     
429:     .social-icon-modern:hover,
430:     .contact-item:hover,
431:     .payment-card:hover {
432:         transform: none;
433:     }
434: }
435: 
436: /* Focus states for accessibility */
437: .footer-link:focus,
438: .social-icon-modern:focus,
439: .newsletter-form input:focus,
440: .btn-primary:focus {
441:     outline: 2px solid #58cbe0;
442:     outline-offset: 2px;
443: }
444: </style>
```

## File: src/layouts/Layout.astro
```
  1: ---
  2: import '../styles/globals.css';
  3: import '@fontsource-variable/inter/wght.css';
  4: import interWoff2 from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
  5: import Header from '../components/Header.astro';
  6: import Footer from '../components/Footer.astro';
  7: import ThemeToggle from '../components/ThemeToggle.astro';
  8: 
  9: interface Props {
 10:     title: string;
 11: }
 12: 
 13: const { title } = Astro.props;
 14: ---
 15: 
 16: <!doctype html>
 17: <html lang="en" class="custom-scrollbar">
 18:     <head>
 19:         <meta charset="UTF-8" />
 20:         <title>{title}</title>
 21:         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 22:         <meta
 23:             name="description"
 24:             content="Break free from credit card debt and save up to 50%. Our professional debt settlement program helps you reduce what you owe and become debt-free faster with no upfront fees."
 25:         />
 26:         <meta name="keywords" content="debt relief, credit card debt, debt settlement, debt reduction, financial freedom, debt help" />
 27:         <meta name="robots" content="index, follow" />
 28:         <meta name="author" content="Debt Freedom Toolkit" />
 29:         <meta name="generator" content={Astro.generator} />
 30: 
 31:         <!-- Open Graph / Social Media Meta Tags -->
 32:         <meta property="og:type" content="website" />
 33:         <meta property="og:title" content={title} />
 34:         <meta property="og:description" content="Break free from credit card debt and save up to 50%. Reduce your debt and become financially free." />
 35:         <meta property="og:image" content="/images/debtfreedomtoolkitlogo.png" />
 36:         <meta property="og:url" content="https://debtfreedomtoolkit.com" />
 37:         <meta property="og:site_name" content="Debt Freedom Toolkit" />
 38: 
 39:         <!-- Twitter Meta Tags -->
 40:         <meta name="twitter:card" content="summary_large_image" />
 41:         <meta name="twitter:title" content={title} />
 42:         <meta name="twitter:description" content="Break free from credit card debt and save up to 50%. Reduce your debt and become financially free." />
 43:         <meta name="twitter:image" content="/images/debtfreedomtoolkitlogo.png" />
 44: 
 45:         <!-- Favicon -->
 46:         <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
 47:         <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
 48:         <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
 49:         <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
 50:         <link rel="manifest" href="/site.webmanifest" />
 51:         <meta name="theme-color" content="#2d7984" />
 52: 
 53:         <!-- Preload critical resources -->
 54:         <link rel="preload" as="font" type="font/woff2" href={interWoff2} crossorigin />
 55:         <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
 56: 
 57:         <!-- Enhanced Theme and Motion Manager Script - executed before page renders to prevent FOUC -->
 58:         <script is:inline>
 59:             // Immediate theme and motion preference application to prevent FOUC
 60:             (function () {
 61:                 // Theme constants
 62:                 const THEMES = { LIGHT: 'light', DARK: 'dark', SYSTEM: 'system' };
 63:                 const STORAGE_KEY = 'theme';
 64:                 const MOTION_STORAGE_KEY = 'reduced-motion-preference';
 65:                 
 66:                 // Utility functions
 67:                 function getStorageItem(key, fallback) {
 68:                     try {
 69:                         return localStorage.getItem(key) || fallback;
 70:                     } catch (error) {
 71:                         console.warn('localStorage access failed:', error);
 72:                         return fallback;
 73:                     }
 74:                 }
 75:                 
 76:                 function getSystemPreference() {
 77:                     try {
 78:                         return window.matchMedia('(prefers-color-scheme: dark)').matches 
 79:                             ? THEMES.DARK 
 80:                             : THEMES.LIGHT;
 81:                     } catch (error) {
 82:                         console.warn('Media query not supported:', error);
 83:                         return THEMES.LIGHT;
 84:                     }
 85:                 }
 86:                 
 87:                 function applyTheme(theme) {
 88:                     try {
 89:                         const documentElement = document.documentElement;
 90:                         const shouldUseDarkMode = theme === THEMES.DARK || 
 91:                             (theme === THEMES.SYSTEM && getSystemPreference() === THEMES.DARK);
 92:                         
 93:                         // Remove all theme classes
 94:                         documentElement.classList.remove('dark', 'dark-theme', 'light-theme');
 95:                         
 96:                         // Apply appropriate theme classes
 97:                         if (shouldUseDarkMode) {
 98:                             documentElement.classList.add('dark', 'dark-theme');
 99:                             documentElement.setAttribute('data-theme', THEMES.DARK);
100:                         } else {
101:                             documentElement.classList.add('light-theme');
102:                             documentElement.setAttribute('data-theme', THEMES.LIGHT);
103:                         }
104:                     } catch (error) {
105:                         console.error('Theme application failed:', error);
106:                     }
107:                 }
108:                 
109:                 // Motion preference utilities
110:                 function getSystemMotionPreference() {
111:                     try {
112:                         return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
113:                     } catch (error) {
114:                         console.warn('Motion media query not supported:', error);
115:                         return false;
116:                     }
117:                 }
118:                 
119:                 function getUserMotionPreference() {
120:                     try {
121:                         const stored = localStorage.getItem(MOTION_STORAGE_KEY);
122:                         if (stored === 'true') return true;
123:                         if (stored === 'false') return false;
124:                         // Default to system preference if no user preference stored
125:                         return getSystemMotionPreference();
126:                     } catch (error) {
127:                         console.warn('Motion preference access failed:', error);
128:                         return getSystemMotionPreference();
129:                     }
130:                 }
131:                 
132:                 function applyMotionPreference(reducedMotion) {
133:                     try {
134:                         const documentElement = document.documentElement;
135:                         if (reducedMotion) {
136:                             documentElement.classList.add('reduced-motion');
137:                             documentElement.setAttribute('data-reduced-motion', 'true');
138:                         } else {
139:                             documentElement.classList.remove('reduced-motion');
140:                             documentElement.setAttribute('data-reduced-motion', 'false');
141:                         }
142:                     } catch (error) {
143:                         console.error('Motion preference application failed:', error);
144:                     }
145:                 }
146: 
147:                 // Get and apply initial theme and motion preferences
148:                 const storedTheme = getStorageItem(STORAGE_KEY, THEMES.SYSTEM);
149:                 const reducedMotion = getUserMotionPreference();
150:                 applyTheme(storedTheme);
151:                 applyMotionPreference(reducedMotion);
152:                 
153:                 // Enhanced theme and motion manager for immediate availability
154:                 window.themeManager = {
155:                     getTheme: function() {
156:                         return getStorageItem(STORAGE_KEY, THEMES.SYSTEM);
157:                     },
158:                     setTheme: function(theme) {
159:                         if (!Object.values(THEMES).includes(theme)) {
160:                             console.warn('Invalid theme value:', theme);
161:                             return;
162:                         }
163:                         try {
164:                             localStorage.setItem(STORAGE_KEY, theme);
165:                             applyTheme(theme);
166:                             
167:                             // Dispatch theme change event
168:                             const resolvedTheme = theme === THEMES.SYSTEM ? getSystemPreference() : theme;
169:                             window.dispatchEvent(new CustomEvent('theme-change', {
170:                                 detail: { theme, resolvedTheme }
171:                             }));
172:                         } catch (error) {
173:                             console.error('Theme setting failed:', error);
174:                         }
175:                     },
176:                     getReducedMotion: function() {
177:                         return getUserMotionPreference();
178:                     },
179:                     setReducedMotion: function(reduced) {
180:                         try {
181:                             localStorage.setItem(MOTION_STORAGE_KEY, reduced.toString());
182:                             applyMotionPreference(reduced);
183:                             
184:                             // Dispatch motion preference change event
185:                             window.dispatchEvent(new CustomEvent('motion-preference-change', {
186:                                 detail: { reducedMotion: reduced }
187:                             }));
188:                         } catch (error) {
189:                             console.error('Motion preference setting failed:', error);
190:                         }
191:                     },
192:                     THEMES: THEMES
193:                 };
194:             })();
195:         </script>
196:         
197:         <!-- Load comprehensive theme manager after DOM -->
198:         <script src="/src/scripts/themeManager.js" type="module"></script>
199:     </head>
200:     <body class="antialiased text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
201:         <!-- Import Background Pattern Component -->
202:         <div class="flex flex-col min-h-screen px-6 sm:px-12 relative bg-white dark:bg-gray-900 transition-colors duration-300">
203:             <!-- Background Pattern -->
204:             <div class="absolute inset-0 overflow-hidden pointer-events-none">
205:                 <div class="fixed inset-0 z-0">
206:                     <!-- Light mode gradients - use opacity transitions instead of visibility -->
207:                     <div class="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/5 to-transparent opacity-100 dark:opacity-0 transition-opacity duration-500 ease-out"></div>
208:                     <div class="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-primary/5 to-transparent opacity-100 dark:opacity-0 transition-opacity duration-500 ease-out"></div>
209: 
210:                     <!-- Dark mode gradients - use opacity transitions instead of visibility -->
211:                     <div class="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary-light/10 to-transparent opacity-0 dark:opacity-100 transition-opacity duration-500 ease-out"></div>
212:                     <div class="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-primary-light/10 to-transparent opacity-0 dark:opacity-100 transition-opacity duration-500 ease-out"></div>
213: 
214:                     <!-- Noise texture overlay with enhanced transitions -->
215:                     <div class="absolute inset-0 opacity-20 dark:opacity-30 bg-noise transition-opacity duration-500 ease-out"></div>
216:                 </div>
217:             </div>
218: 
219:             <div class="flex flex-col w-full max-w-6xl mx-auto grow relative z-10">
220:                 <Header />
221:                 <main class="grow"><slot /></main>
222:                 <Footer />
223:             </div>
224:         </div>
225: 
226:         <!-- Back to Top Button with enhanced transitions -->
227:         <button
228:             id="back-to-top"
229:             class="fixed bottom-8 right-8 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 translate-y-20 opacity-0 hover:bg-primary-dark hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800 z-50 theme-shadow"
230:             aria-label="Back to top"
231:         >
232:             <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
233:                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
234:             </svg>
235:         </button>
236: 
237:         <!-- Loading Indicator with enhanced theme transitions -->
238:         <div id="page-loader" class="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-[100] transition-all duration-500 theme-background-image">
239:             <div class="relative">
240:                 <div class="w-16 h-16 border-4 border-primary/30 dark:border-primary-light/30 border-t-primary dark:border-t-primary-light rounded-full animate-spin transition-colors duration-500"></div>
241:                 <div class="mt-4 text-center text-gray-600 dark:text-gray-300 transition-colors duration-500">Loading...</div>
242:             </div>
243:         </div>
244:     </body>
245: </html>
246: 
247: <style>
248:     .bg-noise {
249:         background-image: var(--background-image-noise);
250:     }
251: 
252:     /* Use CSS variables defined in globals.css for theme-specific noise pattern */
253:     :root {
254:         --background-image-noise: linear-gradient(to bottom, rgba(250, 250, 255, 0.05), rgba(250, 250, 255, 0.1)), url('/images/noise.png');
255:     }
256: 
257:     .dark {
258:         --background-image-noise: linear-gradient(to bottom, rgba(10, 15, 25, 0.1), rgba(10, 15, 25, 0.2)), url('/images/noise.png');
259:     }
260: </style>
261: 
262: <script>
263:     // Page loader functionality with performance optimization
264:     const pageLoader = document.getElementById('page-loader');
265: 
266:     // Hide loader once page is fully loaded
267:     window.addEventListener('load', () => {
268:         if (pageLoader) {
269:             // Add fade out transition
270:             pageLoader.style.opacity = '0';
271: 
272:             // Remove from DOM after transition completes
273:             setTimeout(() => {
274:                 pageLoader.style.display = 'none';
275:             }, 500);
276:         }
277:         
278:         // Performance optimization: Remove will-change properties after page load
279:         document.body.classList.add('loaded');
280:         
281:         // Clean up will-change properties on elements with theme transitions
282:         const elementsWithWillChange = document.querySelectorAll('[style*="will-change"]');
283:         elementsWithWillChange.forEach(element => {
284:             // Only clean up if not actively transitioning
285:             setTimeout(() => {
286:                 if (element.style.willChange && !element.matches(':hover, :focus, :active')) {
287:                     element.style.willChange = 'auto';
288:                 }
289:             }, 1000);
290:         });
291:     });
292: 
293:     // Back to top button functionality
294:     document.addEventListener('DOMContentLoaded', () => {
295:         const backToTopButton = document.getElementById('back-to-top');
296: 
297:         if (backToTopButton) {
298:             // Function to toggle button visibility
299:             const toggleBackToTopButton = () => {
300:                 if (window.scrollY > 300) {
301:                     backToTopButton.classList.remove('translate-y-20', 'opacity-0');
302:                     backToTopButton.classList.add('translate-y-0', 'opacity-100');
303:                 } else {
304:                     backToTopButton.classList.add('translate-y-20', 'opacity-0');
305:                     backToTopButton.classList.remove('translate-y-0', 'opacity-100');
306:                 }
307:             };
308: 
309:             // Initial check
310:             toggleBackToTopButton();
311: 
312:             // Add scroll event listener
313:             window.addEventListener('scroll', toggleBackToTopButton);
314: 
315:             // Add click event to scroll to top
316:             backToTopButton.addEventListener('click', () => {
317:                 window.scrollTo({
318:                     top: 0,
319:                     behavior: 'smooth'
320:                 });
321:             });
322:         }
323: 
324:         // Add smooth scroll behavior to all anchor links
325:         document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((anchor) => {
326:             anchor.addEventListener('click', function (e) {
327:                 e.preventDefault();
328: 
329:                 const targetId = this.getAttribute('href');
330:                 const targetElement = document.querySelector(targetId);
331: 
332:                 if (targetElement) {
333:                     // Account for fixed header height
334:                     const headerHeight = document.querySelector('header')?.offsetHeight || 0;
335:                     const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
336: 
337:                     window.scrollTo({
338:                         top: targetPosition,
339:                         behavior: 'smooth'
340:                     });
341:                 }
342:             });
343:         });
344: 
345:         // Add animation on scroll
346:         const animateOnScroll = () => {
347:             const elements = document.querySelectorAll('.animate-on-scroll');
348: 
349:             elements.forEach((element) => {
350:                 const elementTop = element.getBoundingClientRect().top;
351:                 const windowHeight = window.innerHeight;
352: 
353:                 if (elementTop < windowHeight * 0.9) {
354:                     // Trigger the animation based on the class
355:                     if (element.classList.contains('fade-in-up')) {
356:                         element.style.opacity = '1';
357:                         element.style.transform = 'translateY(0)';
358:                     } else if (element.classList.contains('fade-in')) {
359:                         element.style.opacity = '1';
360:                     }
361:                 }
362:             });
363:         };
364: 
365:         // Run once on load
366:         animateOnScroll();
367: 
368:         // Add scroll listener
369:         window.addEventListener('scroll', animateOnScroll);
370:     });
371: </script>
```

## File: package.json
```json
 1: {
 2:   "name": "astro-netlify-platform-starter",
 3:   "type": "module",
 4:   "version": "0.1.0",
 5:   "scripts": {
 6:     "dev": "astro dev",
 7:     "start": "astro dev",
 8:     "build": "astro build",
 9:     "preview": "astro preview",
10:     "astro": "astro",
11:     "email:preview": "astro dev --open /email-preview",
12:     "email:validate": "node scripts/validate-email-config.ts",
13:     "email:test": "node scripts/test-email-templates.ts"
14:   },
15:   "dependencies": {
16:     "@astrojs/netlify": "^6.3.3",
17:     "@astrojs/react": "^4.2.7",
18:     "@astrojs/tailwind": "^6.0.2",
19:     "@fontsource-variable/inter": "^5.0.4",
20:     "@netlify/blobs": "^6.3.0",
21:     "@netlify/functions": "^1.6.0",
22:     "@react-email/components": "^0.0.41",
23:     "@react-email/render": "^1.1.2",
24:     "@react-email/tailwind": "^1.0.5",
25:     "@supabase/supabase-js": "^2.39.0",
26:     "astro": "^5.7.13",
27:     "blobshape": "^1.0.0",
28:     "cleave.js": "^1.6.0",
29:     "marked": "^9.1.6",
30:     "marked-shiki": "^1.1.3",
31:     "react": "^18.2.0",
32:     "react-dom": "^18.2.0",
33:     "resend": "^4.5.1",
34:     "tailwindcss": "^3.3.5",
35:     "unique-names-generator": "^4.7.1",
36:     "zod": "^3.22.4"
37:   },
38:   "devDependencies": {
39:     "@types/node": "^20.10.0",
40:     "@types/react": "^18.2.15",
41:     "@types/react-dom": "^18.2.7"
42:   }
43: }
```
