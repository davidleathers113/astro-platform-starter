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
5. Multiple file entries, each consisting of:
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
- Only files matching these patterns are included: src/**/\*.astro, src/**/_.tsx, src/\*\*/_.ts, src/**/\*.css, astro.config.mjs, tailwind.config.js, tsconfig.json, package.json, netlify/**/\*
- Files matching these patterns are excluded: node_modules/**, **/.git/**, **/_.log, \*\*/_.bak, **/\*.zip, **/_.gz, \*\*/_.min.js, **/\*.min.css, **/_.tsbuildinfo, package-lock.json, LICENSE_, dist/**, .netlify/**, .vscode/**, public/assets/**, \*_/_.md, !README.md, !CLAUDE.md, !docs/\*.md
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
  layouts/
    LandingLayout.astro
    Layout.astro
  pages/
    api/
      blob.ts
      blobs.ts
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
    color-palette-demo.astro
    debt-relief.astro
    image-cdn.astro
    index.astro
    revalidation.astro
    theme-demo.astro
  styles/
    globals.css
    print.css
  utils/
    highlighter.ts
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

## File: src/pages/blobs/\_components/ShapeEditor.tsx

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

## File: src/pages/blobs/\_components/ShapePreview.tsx

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
 20:     <!-- Base Colors Section -->
 21:     <section class="mb-12">
 22:       <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Base Colors</h2>
 23:       <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
 24:         <!-- Primary Default -->
 25:         <div class="rounded-lg overflow-hidden shadow-md">
 26:           <div class="h-32 bg-primary flex items-center justify-center">
 27:             <span class="text-primary-textOnPrimary font-semibold">#2d7984</span>
 28:           </div>
 29:           <div class="p-4 bg-white dark:bg-gray-800">
 30:             <h3 class="font-semibold">Primary</h3>
 31:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary</code>
 32:           </div>
 33:         </div>
 34:
 35:         <!-- Light Variant -->
 36:         <div class="rounded-lg overflow-hidden shadow-md">
 37:           <div class="h-32 bg-primary-light flex items-center justify-center">
 38:             <span class="text-primary-textOnLight font-semibold">#58cbe0</span>
 39:           </div>
 40:           <div class="p-4 bg-white dark:bg-gray-800">
 41:             <h3 class="font-semibold">Primary Light</h3>
 42:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-light</code>
 43:           </div>
 44:         </div>
 45:
 46:         <!-- Dark Variant -->
 47:         <div class="rounded-lg overflow-hidden shadow-md">
 48:           <div class="h-32 bg-primary-dark flex items-center justify-center">
 49:             <span class="text-primary-textOnDark font-semibold">#1d5058</span>
 50:           </div>
 51:           <div class="p-4 bg-white dark:bg-gray-800">
 52:             <h3 class="font-semibold">Primary Dark</h3>
 53:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-dark</code>
 54:           </div>
 55:         </div>
 56:       </div>
 57:     </section>
 58:
 59:     <!-- Interactive Elements Section -->
 60:     <section class="mb-12">
 61:       <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Interactive States</h2>
 62:       <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 63:         <!-- Buttons -->
 64:         <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
 65:           <h3 class="font-semibold mb-4">Buttons</h3>
 66:           <div class="space-y-4">
 67:             <div>
 68:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Primary Button (hover & active states)</p>
 69:               <button class="bg-primary hover:bg-primary-hover active:bg-primary-active text-primary-textOnPrimary px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-focus focus:ring-opacity-50">
 70:                 Primary Button
 71:               </button>
 72:             </div>
 73:
 74:             <div>
 75:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Light Variant (hover & active states)</p>
 76:               <button class="bg-primary-light hover:bg-primary-lightHover active:bg-primary-lightActive text-primary-textOnLight px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-lightFocus focus:ring-opacity-50">
 77:                 Light Button
 78:               </button>
 79:             </div>
 80:
 81:             <div>
 82:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Dark Variant (hover & active states)</p>
 83:               <button class="bg-primary-dark hover:bg-primary-darkHover active:bg-primary-darkActive text-primary-textOnDark px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-darkFocus focus:ring-opacity-50">
 84:                 Dark Button
 85:               </button>
 86:             </div>
 87:
 88:             <div>
 89:               <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Disabled State</p>
 90:               <button class="bg-primary-disabled text-white px-4 py-2 rounded cursor-not-allowed opacity-75">
 91:                 Disabled Button
 92:               </button>
 93:             </div>
 94:           </div>
 95:         </div>
 96:
 97:         <!-- Other Interactive Elements -->
 98:         <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
 99:           <h3 class="font-semibold mb-4">Form Elements</h3>
100:           <div class="space-y-4">
101:             <div>
102:               <label class="block mb-2">Input with focus state</label>
103:               <input type="text" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary-focus focus:border-primary" placeholder="Focus to see primary-focus ring">
104:             </div>
105:
106:             <div>
107:               <label class="block mb-2">Input with light variant focus</label>
108:               <input type="text" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary-lightFocus focus:border-primary-light" placeholder="Focus to see primary-lightFocus ring">
109:             </div>
110:
111:             <div>
112:               <p class="mb-2">Link with hover/focus styles</p>
113:               <a href="#" class="text-primary hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-primary-focus rounded">Primary link with hover state</a>
114:             </div>
115:           </div>
116:         </div>
117:       </div>
118:     </section>
119:
120:     <!-- Hover States Section -->
121:     <section class="mb-12">
122:       <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Hover States</h2>
123:       <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
124:         <!-- Base Hover -->
125:         <div class="rounded-lg overflow-hidden shadow-md">
126:           <div class="h-32 bg-primary-hover flex items-center justify-center">
127:             <span class="text-white font-semibold">#266974</span>
128:           </div>
129:           <div class="p-4 bg-white dark:bg-gray-800">
130:             <h3 class="font-semibold">Primary Hover</h3>
131:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-hover</code>
132:           </div>
133:         </div>
134:
135:         <!-- Light Hover -->
136:         <div class="rounded-lg overflow-hidden shadow-md">
137:           <div class="h-32 bg-primary-lightHover flex items-center justify-center">
138:             <span class="text-gray-900 font-semibold">#4bbbce</span>
139:           </div>
140:           <div class="p-4 bg-white dark:bg-gray-800">
141:             <h3 class="font-semibold">Primary Light Hover</h3>
142:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-lightHover</code>
143:           </div>
144:         </div>
145:
146:         <!-- Dark Hover -->
147:         <div class="rounded-lg overflow-hidden shadow-md">
148:           <div class="h-32 bg-primary-darkHover flex items-center justify-center">
149:             <span class="text-white font-semibold">#15373e</span>
150:           </div>
151:           <div class="p-4 bg-white dark:bg-gray-800">
152:             <h3 class="font-semibold">Primary Dark Hover</h3>
153:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-darkHover</code>
154:           </div>
155:         </div>
156:       </div>
157:     </section>
158:
159:     <!-- Active States Section -->
160:     <section class="mb-12">
161:       <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Active States</h2>
162:       <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
163:         <!-- Base Active -->
164:         <div class="rounded-lg overflow-hidden shadow-md">
165:           <div class="h-32 bg-primary-active flex items-center justify-center">
166:             <span class="text-white font-semibold">#1d5058</span>
167:           </div>
168:           <div class="p-4 bg-white dark:bg-gray-800">
169:             <h3 class="font-semibold">Primary Active</h3>
170:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-active</code>
171:           </div>
172:         </div>
173:
174:         <!-- Light Active -->
175:         <div class="rounded-lg overflow-hidden shadow-md">
176:           <div class="h-32 bg-primary-lightActive flex items-center justify-center">
177:             <span class="text-gray-900 font-semibold">#3eafc2</span>
178:           </div>
179:           <div class="p-4 bg-white dark:bg-gray-800">
180:             <h3 class="font-semibold">Primary Light Active</h3>
181:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-lightActive</code>
182:           </div>
183:         </div>
184:
185:         <!-- Dark Active -->
186:         <div class="rounded-lg overflow-hidden shadow-md">
187:           <div class="h-32 bg-primary-darkActive flex items-center justify-center">
188:             <span class="text-white font-semibold">#102b30</span>
189:           </div>
190:           <div class="p-4 bg-white dark:bg-gray-800">
191:             <h3 class="font-semibold">Primary Dark Active</h3>
192:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-darkActive</code>
193:           </div>
194:         </div>
195:       </div>
196:     </section>
197:
198:     <!-- Focus States Section -->
199:     <section class="mb-12">
200:       <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Focus States</h2>
201:       <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
202:         <!-- Base Focus -->
203:         <div class="rounded-lg overflow-hidden shadow-md">
204:           <div class="h-32 flex items-center justify-center relative">
205:             <div class="absolute inset-4 bg-primary"></div>
206:             <div class="absolute inset-0 bg-primary-focus ring-4 ring-primary-focus ring-opacity-50"></div>
207:             <span class="relative z-10 text-white font-semibold">#2d7984 (with focus ring)</span>
208:           </div>
209:           <div class="p-4 bg-white dark:bg-gray-800">
210:             <h3 class="font-semibold">Primary Focus</h3>
211:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-focus</code>
212:           </div>
213:         </div>
214:
215:         <!-- Light Focus -->
216:         <div class="rounded-lg overflow-hidden shadow-md">
217:           <div class="h-32 flex items-center justify-center relative">
218:             <div class="absolute inset-4 bg-primary-light"></div>
219:             <div class="absolute inset-0 bg-primary-lightFocus ring-4 ring-primary-lightFocus ring-opacity-50"></div>
220:             <span class="relative z-10 text-gray-900 font-semibold">#58cbe0 (with focus ring)</span>
221:           </div>
222:           <div class="p-4 bg-white dark:bg-gray-800">
223:             <h3 class="font-semibold">Primary Light Focus</h3>
224:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-lightFocus</code>
225:           </div>
226:         </div>
227:
228:         <!-- Dark Focus -->
229:         <div class="rounded-lg overflow-hidden shadow-md">
230:           <div class="h-32 flex items-center justify-center relative">
231:             <div class="absolute inset-4 bg-primary-dark"></div>
232:             <div class="absolute inset-0 bg-primary-darkFocus ring-4 ring-primary-darkFocus ring-opacity-50"></div>
233:             <span class="relative z-10 text-white font-semibold">#1d5058 (with focus ring)</span>
234:           </div>
235:           <div class="p-4 bg-white dark:bg-gray-800">
236:             <h3 class="font-semibold">Primary Dark Focus</h3>
237:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-darkFocus</code>
238:           </div>
239:         </div>
240:       </div>
241:     </section>
242:
243:     <!-- Disabled States Section -->
244:     <section class="mb-12">
245:       <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Disabled States</h2>
246:       <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
247:         <!-- Base Disabled -->
248:         <div class="rounded-lg overflow-hidden shadow-md">
249:           <div class="h-32 bg-primary-disabled flex items-center justify-center">
250:             <span class="text-white font-semibold">#a3c5cb</span>
251:           </div>
252:           <div class="p-4 bg-white dark:bg-gray-800">
253:             <h3 class="font-semibold">Primary Disabled</h3>
254:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-disabled</code>
255:           </div>
256:         </div>
257:
258:         <!-- Light Disabled -->
259:         <div class="rounded-lg overflow-hidden shadow-md">
260:           <div class="h-32 bg-primary-lightDisabled flex items-center justify-center">
261:             <span class="text-gray-900 font-semibold">#b8e0ea</span>
262:           </div>
263:           <div class="p-4 bg-white dark:bg-gray-800">
264:             <h3 class="font-semibold">Primary Light Disabled</h3>
265:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-lightDisabled</code>
266:           </div>
267:         </div>
268:
269:         <!-- Dark Disabled -->
270:         <div class="rounded-lg overflow-hidden shadow-md">
271:           <div class="h-32 bg-primary-darkDisabled flex items-center justify-center">
272:             <span class="text-white font-semibold">#6a8a8f</span>
273:           </div>
274:           <div class="p-4 bg-white dark:bg-gray-800">
275:             <h3 class="font-semibold">Primary Dark Disabled</h3>
276:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bg-primary-darkDisabled</code>
277:           </div>
278:         </div>
279:       </div>
280:     </section>
281:
282:     <!-- Text Colors Section -->
283:     <section class="mb-12">
284:       <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Text Colors</h2>
285:       <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
286:         <!-- Text on Primary -->
287:         <div class="rounded-lg overflow-hidden shadow-md">
288:           <div class="h-32 bg-primary flex flex-col items-center justify-center">
289:             <span class="text-primary-textOnPrimary font-semibold mb-2">Text on Primary</span>
290:             <code class="bg-black bg-opacity-20 text-white text-sm px-2 py-1 rounded">text-primary-textOnPrimary</code>
291:           </div>
292:           <div class="p-4 bg-white dark:bg-gray-800">
293:             <h3 class="font-semibold">Text on Primary</h3>
294:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">#ffffff</code>
295:           </div>
296:         </div>
297:
298:         <!-- Text on Light -->
299:         <div class="rounded-lg overflow-hidden shadow-md">
300:           <div class="h-32 bg-primary-light flex flex-col items-center justify-center">
301:             <span class="text-primary-textOnLight font-semibold mb-2">Text on Light</span>
302:             <code class="bg-black bg-opacity-20 text-primary-textOnLight text-sm px-2 py-1 rounded">text-primary-textOnLight</code>
303:           </div>
304:           <div class="p-4 bg-white dark:bg-gray-800">
305:             <h3 class="font-semibold">Text on Light</h3>
306:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">#1a2234</code>
307:           </div>
308:         </div>
309:
310:         <!-- Text on Dark -->
311:         <div class="rounded-lg overflow-hidden shadow-md">
312:           <div class="h-32 bg-primary-dark flex flex-col items-center justify-center">
313:             <span class="text-primary-textOnDark font-semibold mb-2">Text on Dark</span>
314:             <code class="bg-black bg-opacity-20 text-white text-sm px-2 py-1 rounded">text-primary-textOnDark</code>
315:           </div>
316:           <div class="p-4 bg-white dark:bg-gray-800">
317:             <h3 class="font-semibold">Text on Dark</h3>
318:             <code class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">#ffffff</code>
319:           </div>
320:         </div>
321:       </div>
322:     </section>
323:
324:     <!-- Usage Guidelines -->
325:     <section class="mb-8">
326:       <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Usage Guidelines</h2>
327:       <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
328:         <h3 class="font-semibold mb-4">When to use each variant</h3>
329:         <ul class="space-y-3 list-disc pl-5">
330:           <li><strong>Primary (default):</strong> Use for primary action buttons, key UI elements, and main accent colors.</li>
331:           <li><strong>Light variant:</strong> Use for secondary elements, backgrounds, highlights, and when you need a lighter version of the primary color that maintains brand identity.</li>
332:           <li><strong>Dark variant:</strong> Use for more prominent elements that need stronger contrast, or for hover states of the primary color.</li>
333:           <li><strong>Hover states:</strong> Apply to interactive elements when hovered to provide visual feedback.</li>
334:           <li><strong>Active states:</strong> Apply to interactive elements when clicked/pressed to provide visual feedback.</li>
335:           <li><strong>Focus states:</strong> Apply to interactive elements when focused (e.g., via keyboard navigation) to improve accessibility.</li>
336:           <li><strong>Disabled states:</strong> Apply to elements that are currently not interactive or available.</li>
337:         </ul>
338:
339:         <h3 class="font-semibold mt-6 mb-4">Accessibility Considerations</h3>
340:         <ul class="space-y-3 list-disc pl-5">
341:           <li>Always use the appropriate text color (<code>textOnPrimary</code>, <code>textOnLight</code>, <code>textOnDark</code>) to ensure sufficient contrast for readability.</li>
342:           <li>Focus states should be clearly visible for keyboard navigation - use the focus ring variants as shown in the examples.</li>
343:           <li>Ensure disabled elements maintain clear visual distinction but avoid using color alone to convey information.</li>
344:         </ul>
345:       </div>
346:     </section>
347:
348:     <!-- Full Color Palette Reference -->
349:     <section>
350:       <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-border dark:border-gray-700">Complete Color Palette Reference</h2>
351:       <div class="overflow-x-auto">
352:         <table class="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
353:           <thead class="bg-gray-50 dark:bg-gray-700">
354:             <tr>
355:               <th class="px-4 py-3 text-left">Name</th>
356:               <th class="px-4 py-3 text-left">Hex Value</th>
357:               <th class="px-4 py-3 text-left">Tailwind Class</th>
358:               <th class="px-4 py-3 text-left">Preview</th>
359:             </tr>
360:           </thead>
361:           <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
362:             <!-- Base Colors -->
363:             <tr>
364:               <td class="px-4 py-3">Primary</td>
365:               <td class="px-4 py-3"><code>#2d7984</code></td>
366:               <td class="px-4 py-3"><code>bg-primary</code></td>
367:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary rounded"></div></td>
368:             </tr>
369:             <tr>
370:               <td class="px-4 py-3">Primary Light</td>
371:               <td class="px-4 py-3"><code>#58cbe0</code></td>
372:               <td class="px-4 py-3"><code>bg-primary-light</code></td>
373:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-light rounded"></div></td>
374:             </tr>
375:             <tr>
376:               <td class="px-4 py-3">Primary Dark</td>
377:               <td class="px-4 py-3"><code>#1d5058</code></td>
378:               <td class="px-4 py-3"><code>bg-primary-dark</code></td>
379:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-dark rounded"></div></td>
380:             </tr>
381:
382:             <!-- Hover States -->
383:             <tr>
384:               <td class="px-4 py-3">Primary Hover</td>
385:               <td class="px-4 py-3"><code>#266974</code></td>
386:               <td class="px-4 py-3"><code>bg-primary-hover</code></td>
387:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-hover rounded"></div></td>
388:             </tr>
389:             <tr>
390:               <td class="px-4 py-3">Primary Light Hover</td>
391:               <td class="px-4 py-3"><code>#4bbbce</code></td>
392:               <td class="px-4 py-3"><code>bg-primary-lightHover</code></td>
393:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-lightHover rounded"></div></td>
394:             </tr>
395:             <tr>
396:               <td class="px-4 py-3">Primary Dark Hover</td>
397:               <td class="px-4 py-3"><code>#15373e</code></td>
398:               <td class="px-4 py-3"><code>bg-primary-darkHover</code></td>
399:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-darkHover rounded"></div></td>
400:             </tr>
401:
402:             <!-- Active States -->
403:             <tr>
404:               <td class="px-4 py-3">Primary Active</td>
405:               <td class="px-4 py-3"><code>#1d5058</code></td>
406:               <td class="px-4 py-3"><code>bg-primary-active</code></td>
407:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-active rounded"></div></td>
408:             </tr>
409:             <tr>
410:               <td class="px-4 py-3">Primary Light Active</td>
411:               <td class="px-4 py-3"><code>#3eafc2</code></td>
412:               <td class="px-4 py-3"><code>bg-primary-lightActive</code></td>
413:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-lightActive rounded"></div></td>
414:             </tr>
415:             <tr>
416:               <td class="px-4 py-3">Primary Dark Active</td>
417:               <td class="px-4 py-3"><code>#102b30</code></td>
418:               <td class="px-4 py-3"><code>bg-primary-darkActive</code></td>
419:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-darkActive rounded"></div></td>
420:             </tr>
421:
422:             <!-- Focus States -->
423:             <tr>
424:               <td class="px-4 py-3">Primary Focus</td>
425:               <td class="px-4 py-3"><code>#2d7984</code></td>
426:               <td class="px-4 py-3"><code>bg-primary-focus</code></td>
427:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-focus rounded"></div></td>
428:             </tr>
429:             <tr>
430:               <td class="px-4 py-3">Primary Light Focus</td>
431:               <td class="px-4 py-3"><code>#58cbe0</code></td>
432:               <td class="px-4 py-3"><code>bg-primary-lightFocus</code></td>
433:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-lightFocus rounded"></div></td>
434:             </tr>
435:             <tr>
436:               <td class="px-4 py-3">Primary Dark Focus</td>
437:               <td class="px-4 py-3"><code>#1d5058</code></td>
438:               <td class="px-4 py-3"><code>bg-primary-darkFocus</code></td>
439:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-darkFocus rounded"></div></td>
440:             </tr>
441:
442:             <!-- Disabled States -->
443:             <tr>
444:               <td class="px-4 py-3">Primary Disabled</td>
445:               <td class="px-4 py-3"><code>#a3c5cb</code></td>
446:               <td class="px-4 py-3"><code>bg-primary-disabled</code></td>
447:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-disabled rounded"></div></td>
448:             </tr>
449:             <tr>
450:               <td class="px-4 py-3">Primary Light Disabled</td>
451:               <td class="px-4 py-3"><code>#b8e0ea</code></td>
452:               <td class="px-4 py-3"><code>bg-primary-lightDisabled</code></td>
453:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-lightDisabled rounded"></div></td>
454:             </tr>
455:             <tr>
456:               <td class="px-4 py-3">Primary Dark Disabled</td>
457:               <td class="px-4 py-3"><code>#6a8a8f</code></td>
458:               <td class="px-4 py-3"><code>bg-primary-darkDisabled</code></td>
459:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-darkDisabled rounded"></div></td>
460:             </tr>
461:
462:             <!-- Text Colors -->
463:             <tr>
464:               <td class="px-4 py-3">Text on Primary</td>
465:               <td class="px-4 py-3"><code>#ffffff</code></td>
466:               <td class="px-4 py-3"><code>text-primary-textOnPrimary</code></td>
467:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary flex items-center justify-center"><span class="text-primary-textOnPrimary text-xs">Text</span></div></td>
468:             </tr>
469:             <tr>
470:               <td class="px-4 py-3">Text on Light</td>
471:               <td class="px-4 py-3"><code>#1a2234</code></td>
472:               <td class="px-4 py-3"><code>text-primary-textOnLight</code></td>
473:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-light flex items-center justify-center"><span class="text-primary-textOnLight text-xs">Text</span></div></td>
474:             </tr>
475:             <tr>
476:               <td class="px-4 py-3">Text on Dark</td>
477:               <td class="px-4 py-3"><code>#ffffff</code></td>
478:               <td class="px-4 py-3"><code>text-primary-textOnDark</code></td>
479:               <td class="px-4 py-3"><div class="w-16 h-8 bg-primary-dark flex items-center justify-center"><span class="text-primary-textOnDark text-xs">Text</span></div></td>
480:             </tr>
481:           </tbody>
482:         </table>
483:       </div>
484:     </section>
485:   </div>
486: </Layout>
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

## File: src/components/BackgroundPattern.astro

```
 1: ---
 2: // This component generates a decorative background with abstract shapes
 3: // Can be included anywhere you want a creative background pattern
 4: ---
 5:
 6: <div class="background-pattern-container absolute inset-0 overflow-hidden pointer-events-none z-0">
 7:     <div class="dark:opacity-20 opacity-10">
 8:         <!-- Circles -->
 9:         <div class="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary/30 blur-3xl"></div>
10:         <div class="absolute bottom-40 right-[5%] w-96 h-96 rounded-full bg-accent/20 blur-3xl"></div>
11:
12:         <!-- Lines -->
13:         <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
14:         <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
15:
16:         <!-- Decorative shapes -->
17:         <div class="absolute top-[30%] left-[5%] w-24 h-24 rotate-45 border border-primary/20 rounded-lg"></div>
18:         <div class="absolute top-[40%] right-[10%] w-32 h-32 -rotate-12 border border-accent/20 rounded-full"></div>
19:         <div class="absolute bottom-[20%] left-[20%] w-40 h-40 rotate-12 border border-secondary/20 rounded-3xl"></div>
20:
21:         <!-- Dots pattern -->
22:         <div class="absolute inset-0 opacity-30">
23:             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
24:                 <defs>
25:                     <pattern id="dots-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
26:                         <circle cx="1" cy="1" r="1" fill="currentColor" class="text-primary/40" />
27:                     </pattern>
28:                 </defs>
29:                 <rect width="100%" height="100%" fill="url(#dots-pattern)" />
30:             </svg>
31:         </div>
32:     </div>
33: </div>
```

## File: src/components/BenefitsSection.astro

```
  1: ---
  2: ---
  3:
  4: <div class="benefits-section py-16 md:py-20 relative" id="benefits">
  5:     <div class="container mx-auto px-4">
  6:         <!-- Section Header -->
  7:         <div class="text-center mb-16">
  8:             <h2 class="text-3xl md:text-4xl font-bold mb-4">How Our Debt Relief Program Works</h2>
  9:             <p class="text-lg text-text-muted max-w-3xl mx-auto">Our proven debt settlement approach has helped thousands of clients reduce their debt and regain financial freedom.</p>
 10:         </div>
 11:
 12:         <!-- Benefits Cards -->
 13:         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
 14:             <!-- Benefit Card 1 -->
 15:             <div class="benefit-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl bg-background-form dark:bg-slate-800 relative group">
 16:                 <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
 17:                 <div class="h-2 bg-primary"></div>
 18:                 <div class="p-6 md:p-8 relative z-10">
 19:                     <div class="step-number flex items-center justify-center rounded-full bg-primary w-12 h-12 mb-6 text-white font-bold text-lg">1</div>
 20:                     <h3 class="text-xl font-bold mb-4">Free Consultation</h3>
 21:                     <p class="text-text-muted mb-6">Our debt specialists assess your situation to determine if debt settlement is right for you and how much you could save.</p>
 22:                     <div class="flex items-center gap-3 text-primary">
 23:                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 24:                             <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
 25:                             <polyline points="22 4 12 14.01 9 11.01"></polyline>
 26:                         </svg>
 27:                         <span class="font-medium">No upfront fees</span>
 28:                     </div>
 29:                 </div>
 30:             </div>
 31:
 32:             <!-- Benefit Card 2 -->
 33:             <div class="benefit-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl bg-background-form dark:bg-slate-800 relative group">
 34:                 <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
 35:                 <div class="h-2 bg-primary"></div>
 36:                 <div class="p-6 md:p-8 relative z-10">
 37:                     <div class="step-number flex items-center justify-center rounded-full bg-primary w-12 h-12 mb-6 text-white font-bold text-lg">2</div>
 38:                     <h3 class="text-xl font-bold mb-4">Customized Plan</h3>
 39:                     <p class="text-text-muted mb-6">We create a personalized debt settlement strategy based on your financial situation and debt amount.</p>
 40:                     <div class="flex items-center gap-3 text-primary">
 41:                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 42:                             <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
 43:                             <polyline points="22 4 12 14.01 9 11.01"></polyline>
 44:                         </svg>
 45:                         <span class="font-medium">Affordable monthly payments</span>
 46:                     </div>
 47:                 </div>
 48:             </div>
 49:
 50:             <!-- Benefit Card 3 -->
 51:             <div class="benefit-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl bg-background-form dark:bg-slate-800 relative group">
 52:                 <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
 53:                 <div class="h-2 bg-primary"></div>
 54:                 <div class="p-6 md:p-8 relative z-10">
 55:                     <div class="step-number flex items-center justify-center rounded-full bg-primary w-12 h-12 mb-6 text-white font-bold text-lg">3</div>
 56:                     <h3 class="text-xl font-bold mb-4">Dedicated Support</h3>
 57:                     <p class="text-text-muted mb-6">Our team negotiates with creditors on your behalf to reduce your debt, often by up to 50% of your enrolled balance.</p>
 58:                     <div class="flex items-center gap-3 text-primary">
 59:                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 60:                             <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
 61:                             <polyline points="22 4 12 14.01 9 11.01"></polyline>
 62:                         </svg>
 63:                         <span class="font-medium">Expert negotiators</span>
 64:                     </div>
 65:                 </div>
 66:             </div>
 67:
 68:             <!-- Benefit Card 4 -->
 69:             <div class="benefit-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl bg-background-form dark:bg-slate-800 relative group">
 70:                 <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
 71:                 <div class="h-2 bg-primary"></div>
 72:                 <div class="p-6 md:p-8 relative z-10">
 73:                     <div class="step-number flex items-center justify-center rounded-full bg-primary w-12 h-12 mb-6 text-white font-bold text-lg">4</div>
 74:                     <h3 class="text-xl font-bold mb-4">Debt Reduction</h3>
 75:                     <p class="text-text-muted mb-6">Watch your debt decrease as we reach settlements with each of your creditors, providing you with documentation of each resolution.</p>
 76:                     <div class="flex items-center gap-3 text-primary">
 77:                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 78:                             <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
 79:                             <polyline points="22 4 12 14.01 9 11.01"></polyline>
 80:                         </svg>
 81:                         <span class="font-medium">Transparent process</span>
 82:                     </div>
 83:                 </div>
 84:             </div>
 85:
 86:             <!-- Benefit Card 5 -->
 87:             <div class="benefit-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl bg-background-form dark:bg-slate-800 relative group">
 88:                 <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
 89:                 <div class="h-2 bg-primary"></div>
 90:                 <div class="p-6 md:p-8 relative z-10">
 91:                     <div class="step-number flex items-center justify-center rounded-full bg-primary w-12 h-12 mb-6 text-white font-bold text-lg">5</div>
 92:                     <h3 class="text-xl font-bold mb-4">Financial Freedom</h3>
 93:                     <p class="text-text-muted mb-6">Complete the program debt-free, with settlements typically achieved in 24-48 months versus decades of minimum payments.</p>
 94:                     <div class="flex items-center gap-3 text-primary">
 95:                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 96:                             <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
 97:                             <polyline points="22 4 12 14.01 9 11.01"></polyline>
 98:                         </svg>
 99:                         <span class="font-medium">Faster debt resolution</span>
100:                     </div>
101:                 </div>
102:             </div>
103:
104:             <!-- Benefit Card 6 -->
105:             <div class="benefit-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl bg-background-form dark:bg-slate-800 relative group">
106:                 <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
107:                 <div class="h-2 bg-primary"></div>
108:                 <div class="p-6 md:p-8 relative z-10">
109:                     <div class="step-number flex items-center justify-center rounded-full bg-primary w-12 h-12 mb-6 text-white font-bold text-lg">6</div>
110:                     <h3 class="text-xl font-bold mb-4">Rebuild Credit</h3>
111:                     <p class="text-text-muted mb-6">Get resources and guidance to help rebuild your credit after completing our debt settlement program.</p>
112:                     <div class="flex items-center gap-3 text-primary">
113:                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
114:                             <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
115:                             <polyline points="22 4 12 14.01 9 11.01"></polyline>
116:                         </svg>
117:                         <span class="font-medium">Credit restoration support</span>
118:                     </div>
119:                 </div>
120:             </div>
121:         </div>
122:
123:         <!-- Results Stats Section -->
124:         <div class="results-stats mt-20 p-8 md:p-10 bg-primary rounded-xl text-white shadow-lg">
125:             <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
126:                 <div class="stat-item text-center">
127:                     <div class="text-4xl md:text-5xl font-bold mb-2">50%</div>
128:                     <p class="text-lg opacity-90">Average Debt Reduction</p>
129:                 </div>
130:
131:                 <div class="stat-item text-center">
132:                     <div class="text-4xl md:text-5xl font-bold mb-2">24-48</div>
133:                     <p class="text-lg opacity-90">Months to Debt Freedom</p>
134:                 </div>
135:
136:                 <div class="stat-item text-center">
137:                     <div class="text-4xl md:text-5xl font-bold mb-2">$0</div>
138:                     <p class="text-lg opacity-90">Upfront Fees</p>
139:                 </div>
140:             </div>
141:         </div>
142:     </div>
143: </div>
144:
145: <style>
146:     .benefit-card {
147:         border: 1px solid var(--color-border);
148:         height: 100%;
149:         display: flex;
150:         flex-direction: column;
151:     }
152:
153:     .benefit-card:hover {
154:         transform: translateY(-5px);
155:     }
156:
157:     .step-number {
158:         transition: all 0.3s ease;
159:     }
160:
161:     .benefit-card:hover .step-number {
162:         transform: scale(1.1);
163:         box-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.5);
164:     }
165:
166:     @media (prefers-reduced-motion: reduce) {
167:         .benefit-card:hover {
168:             transform: none;
169:         }
170:
171:         .benefit-card:hover .step-number {
172:             transform: none;
173:             box-shadow: none;
174:         }
175:     }
176:
177:     .stat-item {
178:         position: relative;
179:     }
180:
181:     .stat-item::after {
182:         content: '';
183:         position: absolute;
184:         right: 0;
185:         top: 20%;
186:         bottom: 20%;
187:         width: 1px;
188:         background-color: rgba(255, 255, 255, 0.3);
189:     }
190:
191:     .stat-item:last-child::after {
192:         display: none;
193:     }
194:
195:     @media (max-width: 768px) {
196:         .stat-item::after {
197:             display: none;
198:         }
199:     }
200: </style>
```

## File: src/components/CTASection.astro

```
  1: ---
  2: ---
  3:
  4: <div class="cta-section py-16 md:py-20 relative" id="cta">
  5:     <!-- Background decorations -->
  6:     <div class="absolute inset-0 overflow-hidden pointer-events-none">
  7:         <div class="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
  8:         <div class="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
  9:     </div>
 10:
 11:     <div class="container mx-auto px-4 relative z-10">
 12:         <div class="cta-card bg-primary rounded-2xl overflow-hidden shadow-xl">
 13:             <div class="p-8 md:p-12 lg:p-16">
 14:                 <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
 15:                     <!-- CTA Content -->
 16:                     <div>
 17:                         <h2 class="text-3xl md:text-4xl text-white font-bold mb-6">Ready to Start Your Debt-Free Journey?</h2>
 18:                         <p class="text-lg text-white/90 mb-8">
 19:                             Our debt relief specialists are standing by to help you reduce your debt and regain control of your finances.
 20:                         </p>
 21:
 22:                         <div class="flex flex-col sm:flex-row gap-4">
 23:                             <a href="#consultation" class="cta-button bg-white text-primary hover:bg-white/90 transition-all py-4 px-8 rounded-lg text-center font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
 24:                                 Get Your Free Consultation
 25:                             </a>
 26:
 27:                             <a href="tel:8005551234" class="cta-phone-button flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all py-4 px-8 rounded-lg text-center font-bold text-lg">
 28:                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 29:                                     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
 30:                                 </svg>
 31:                                 Call (800) 555-1234
 32:                             </a>
 33:                         </div>
 34:                     </div>
 35:
 36:                     <!-- CTA Features List -->
 37:                     <div class="cta-features bg-white/10 rounded-xl p-6 md:p-8">
 38:                         <h3 class="text-xl text-white font-bold mb-6">Why Choose Debt Freedom Toolkit?</h3>
 39:
 40:                         <ul class="space-y-5">
 41:                             <li class="flex items-start gap-4">
 42:                                 <div class="feature-icon flex-shrink-0 mt-1 bg-white/20 rounded-full p-1">
 43:                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 44:                                         <polyline points="20 6 9 17 4 12"></polyline>
 45:                                     </svg>
 46:                                 </div>
 47:                                 <div>
 48:                                     <h4 class="text-white font-semibold">No Upfront Fees</h4>
 49:                                     <p class="text-white/90">You don't pay until we successfully negotiate your debt.</p>
 50:                                 </div>
 51:                             </li>
 52:
 53:                             <li class="flex items-start gap-4">
 54:                                 <div class="feature-icon flex-shrink-0 mt-1 bg-white/20 rounded-full p-1">
 55:                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 56:                                         <polyline points="20 6 9 17 4 12"></polyline>
 57:                                     </svg>
 58:                                 </div>
 59:                                 <div>
 60:                                     <h4 class="text-white font-semibold">Expert Negotiators</h4>
 61:                                     <p class="text-white/90">Our team has settled over $1.2 billion in debt for our clients.</p>
 62:                                 </div>
 63:                             </li>
 64:
 65:                             <li class="flex items-start gap-4">
 66:                                 <div class="feature-icon flex-shrink-0 mt-1 bg-white/20 rounded-full p-1">
 67:                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 68:                                         <polyline points="20 6 9 17 4 12"></polyline>
 69:                                     </svg>
 70:                                 </div>
 71:                                 <div>
 72:                                     <h4 class="text-white font-semibold">Personalized Approach</h4>
 73:                                     <p class="text-white/90">Custom solutions based on your unique financial situation.</p>
 74:                                 </div>
 75:                             </li>
 76:
 77:                             <li class="flex items-start gap-4">
 78:                                 <div class="feature-icon flex-shrink-0 mt-1 bg-white/20 rounded-full p-1">
 79:                                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 80:                                         <polyline points="20 6 9 17 4 12"></polyline>
 81:                                     </svg>
 82:                                 </div>
 83:                                 <div>
 84:                                     <h4 class="text-white font-semibold">Faster Than DIY</h4>
 85:                                     <p class="text-white/90">Become debt-free in 24-48 months versus 10+ years of minimum payments.</p>
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
 96:             <p class="text-lg text-text-muted font-medium mb-6">Trusted & Featured By</p>
 97:
 98:             <div class="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
 99:                 <div class="trust-logo opacity-70 hover:opacity-100 transition-opacity">
100:                     <svg width="100" height="30" viewBox="0 0 100 30" fill="currentColor" class="text-text-muted">
101:                         <rect x="0" y="5" width="20" height="20" rx="3"></rect>
102:                         <rect x="25" y="5" width="50" height="5" rx="2"></rect>
103:                         <rect x="25" y="15" width="40" height="3" rx="1"></rect>
104:                         <rect x="25" y="22" width="30" height="3" rx="1"></rect>
105:                     </svg>
106:                 </div>
107:
108:                 <div class="trust-logo opacity-70 hover:opacity-100 transition-opacity">
109:                     <svg width="100" height="30" viewBox="0 0 100 30" fill="currentColor" class="text-text-muted">
110:                         <circle cx="15" cy="15" r="15"></circle>
111:                         <rect x="35" y="5" width="40" height="5" rx="2"></rect>
112:                         <rect x="35" y="15" width="60" height="3" rx="1"></rect>
113:                         <rect x="35" y="22" width="30" height="3" rx="1"></rect>
114:                     </svg>
115:                 </div>
116:
117:                 <div class="trust-logo opacity-70 hover:opacity-100 transition-opacity">
118:                     <svg width="100" height="30" viewBox="0 0 100 30" fill="currentColor" class="text-text-muted">
119:                         <polygon points="15,0 30,30 0,30"></polygon>
120:                         <rect x="35" y="5" width="60" height="5" rx="2"></rect>
121:                         <rect x="35" y="15" width="50" height="3" rx="1"></rect>
122:                         <rect x="35" y="22" width="40" height="3" rx="1"></rect>
123:                     </svg>
124:                 </div>
125:
126:                 <div class="trust-logo opacity-70 hover:opacity-100 transition-opacity">
127:                     <svg width="100" height="30" viewBox="0 0 100 30" fill="currentColor" class="text-text-muted">
128:                         <rect x="0" y="0" width="30" height="30" rx="15"></rect>
129:                         <rect x="35" y="5" width="40" height="5" rx="2"></rect>
130:                         <rect x="35" y="15" width="60" height="3" rx="1"></rect>
131:                         <rect x="35" y="22" width="50" height="3" rx="1"></rect>
132:                     </svg>
133:                 </div>
134:             </div>
135:         </div>
136:     </div>
137: </div>
138:
139: <style>
140:     .cta-button, .cta-phone-button {
141:         transition: all 0.3s ease;
142:     }
143:
144:     @media (prefers-reduced-motion: reduce) {
145:         .cta-button:hover, .cta-phone-button:hover {
146:             transform: none !important;
147:         }
148:     }
149:
150:     .feature-icon {
151:         transition: all 0.2s ease;
152:     }
153:
154:     li:hover .feature-icon {
155:         transform: scale(1.1);
156:         background-color: rgba(255, 255, 255, 0.3);
157:     }
158:
159:     @media (prefers-reduced-motion: reduce) {
160:         li:hover .feature-icon {
161:             transform: none;
162:         }
163:     }
164: </style>
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

## File: src/components/DebtReliefHero.astro

```
 1: ---
 2: ---
 3:
 4: <div class="py-12 text-center">
 5:     <h1 class="text-4xl md:text-5xl font-bold mb-6">Break Free From Credit Card Debt - Save Up To 50%</h1>
 6:     <p class="text-xl text-text-muted mb-6">Reduce Your Debt By Thousands | Become Debt-Free In 12-36 Months</p>
 7:
 8:     <p class="text-lg text-text-muted mb-8 max-w-3xl mx-auto">
 9:         Are you struggling with $15,000+ in credit card debt? Our professional debt settlement program can help you reduce what you owe and become debt-free faster than making minimum payments.
10:     </p>
11:
12:     <div class="flex flex-col sm:flex-row justify-center gap-4 mb-4">
13:         <a href="#consultation" class="btn btn-lg">Get Your Free Consultation Now</a>
14:         <span class="flex items-center justify-center text-text-muted">or Call (800) 555-1234</span>
15:     </div>
16:
17:     <p class="text-sm text-text-muted">Available 9:00am - 8:00pm EST, 7 days a week</p>
18: </div>
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

## File: src/components/EnhancedHero.astro

```
 1: ---
 2: ---
 3:
 4: <div class="hero-section py-12 md:py-16 lg:py-20 relative">
 5:     <!-- Background shape decorations (svg) - FIXED SIZING -->
 6:     <div class="absolute inset-0 overflow-hidden pointer-events-none">
 7:         <svg class="absolute -top-20 -right-20 text-primary opacity-10" width="100" height="100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
 8:             <path fill="currentColor" d="M37.9,-64.5C49.1,-57.6,58.5,-47.8,63.6,-36.2C68.7,-24.7,69.5,-11.3,68.1,1.4C66.7,14.1,63.1,26.2,56.2,36.1C49.3,46,39,53.9,27.4,61.7C15.8,69.5,2.9,77.3,-9.1,76.7C-21.1,76.1,-33.1,67.2,-43.5,57.2C-53.9,47.2,-62.7,36.1,-68.8,23.3C-74.9,10.4,-78.2,-4.2,-75.8,-17.5C-73.3,-30.9,-65,-43,-53.9,-49.9C-42.8,-56.9,-28.8,-58.7,-16.1,-63.7C-3.4,-68.6,8.1,-76.7,19.8,-76.2C31.6,-75.7,43.5,-67.5,37.9,-64.5Z" transform="translate(100 100)" />
 9:         </svg>
10:
11:         <svg class="absolute -bottom-24 -left-24 text-accent opacity-10" width="100" height="100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
12:             <path fill="currentColor" d="M44.3,-73.1C57.9,-67.1,69.8,-56.3,76.4,-42.9C83,-29.4,84.4,-13.5,80.4,-0.1C76.4,13.3,67.1,24.2,58.7,35.8C50.3,47.5,42.8,59.9,31.7,69.3C20.7,78.7,6.2,85.2,-8.6,84.2C-23.4,83.3,-38.6,75,-51.5,64.3C-64.4,53.7,-75,40.8,-80.3,25.7C-85.5,10.6,-85.3,-6.7,-79.9,-21.6C-74.4,-36.5,-63.6,-49,-50.2,-54.5C-36.9,-60.1,-21,-58.6,-6.4,-59.8C8.3,-61,16.5,-64.9,28.5,-69.8C40.4,-74.6,56.1,-80.4,44.3,-73.1Z" transform="translate(100 100)" />
13:         </svg>
14:     </div>
15:
16:     <div class="container mx-auto px-4 relative z-10">
17:         <div class="max-w-4xl mx-auto text-center">
18:             <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight animate-fade-in">Break Free From Credit Card Debt <span class="text-primary">Save Up To 50%</span></h1>
19:
20:             <p class="text-xl md:text-2xl text-text-muted mb-8 animate-fade-in-delay-1">Reduce Your Debt By Thousands | Become Debt-Free In <span class="text-primary font-semibold">12-36 Months</span></p>
21:
22:             <div class="relative mb-12 max-w-3xl mx-auto">
23:                 <!-- Pulsing background for emphasis -->
24:                 <div class="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-lg blur-md"></div>
25:                 <p class="relative bg-background-form dark:bg-slate-800 text-lg md:text-xl text-text-muted p-6 rounded-lg shadow-md mb-8 animate-fade-in-delay-2">
26:                     Are you struggling with <span class="font-bold">$15,000+ in credit card debt</span>? Our professional debt settlement program can help you reduce what you owe and become debt-free faster than making minimum payments.
27:                 </p>
28:             </div>
29:
30:             <div class="flex flex-col sm:flex-row justify-center gap-6 mb-6 animate-fade-in-delay-3">
31:                 <a href="#consultation" class="btn btn-lg group relative overflow-hidden">
32:                     <span class="relative z-10">Get Your Free Consultation Now</span>
33:                     <div class="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient"></div>
34:                 </a>
35:                 <div class="flex items-center justify-center gap-2 text-text-muted">
36:                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
37:                         <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
38:                     </svg>
39:                     <span class="text-lg font-medium">(800) 555-1234</span>
40:                 </div>
41:             </div>
42:
43:             <p class="text-sm text-text-muted animate-fade-in-delay-3">
44:                 <span class="inline-flex items-center gap-1">
45:                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
46:                         <circle cx="12" cy="12" r="10"></circle>
47:                         <polyline points="12 6 12 12 16 14"></polyline>
48:                     </svg>
49:                     Available 9:00am - 8:00pm EST, 7 days a week
50:                 </span>
51:             </p>
52:         </div>
53:     </div>
54: </div>
55:
56: <style>
57:     /* Adding gradient animation for the CTA button */
58:     @keyframes gradient {
59:         0% { background-position: 0% 50%; }
60:         50% { background-position: 100% 50%; }
61:         100% { background-position: 0% 50%; }
62:     }
63:
64:     .animate-gradient {
65:         animation: gradient 3s ease infinite;
66:         opacity: 0.9;
67:     }
68:
69:     .group:hover .animate-gradient {
70:         opacity: 1;
71:     }
72:
73:     /* Shadow effect on hover for buttons */
74:     .btn-lg {
75:         position: relative;
76:         transition: transform 0.2s ease, box-shadow 0.2s ease;
77:     }
78:
79:     .btn-lg:hover {
80:         transform: translateY(-2px);
81:         box-shadow: 0 6px 15px -3px rgba(var(--color-primary-rgb), 0.4);
82:     }
83:
84:     .btn-lg:active {
85:         transform: translateY(0);
86:     }
87:
88:     @media (prefers-reduced-motion: reduce) {
89:         .animate-gradient {
90:             animation: none;
91:         }
92:
93:         .btn-lg:hover {
94:             transform: none;
95:         }
96:     }
97: </style>
```

## File: src/components/Logo.astro

```
 1: ---
 2: // Improvement idea: get actual width as props, and auto-set height by correct aspect-ratio
 3: ---
 4:
 5: <svg width="122" height="50" viewBox="0 0 122 50" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo">
 6:     <g clip-path="url(#clip0_175_3110)">
 7:         <path d="M27.9828 49.0799V36.6502L28.2433 36.391H30.8459L31.1065 36.6502V49.0799L30.8459 49.3391H28.2433L27.9828 49.0799Z" class="logo-fill"></path>
 8:         <path d="M27.9828 12.688V0.259198L28.2433 0H30.8459L31.1065 0.259198V12.688L30.8459 12.9472H28.2433L27.9828 12.688Z" class="logo-fill"></path>
 9:         <path d="M16.6687 40.1195H16.3007L14.4605 38.2879V37.9217L18.7575 33.6477L20.7061 33.6486L20.9675 33.9069V35.8454L16.6687 40.1195Z" class="logo-fill"></path>
10:         <path d="M16.6669 9.21965H16.2988L14.4587 11.0513V11.4174L18.7557 15.6914L20.7042 15.6905L20.9657 15.4322V13.4937L16.6669 9.21965Z" class="logo-fill"></path>
11:         <path d="M0.260534 23.1157H17.9595L18.2201 23.3749V25.9642L17.9595 26.2234H0.260534L0 25.9642V23.3749L0.260534 23.1157Z" class="logo-fill"></path>
12:         <path d="M105.082 23.1157H121.74L122.001 23.3749V25.9642L121.74 26.2234H104.041L103.781 25.9642L104.821 23.3749L105.082 23.1157Z" class="logo-fill"></path>
13:         <path
14:             d="M50.529 25.7748L50.2685 26.034H42.1946L41.9341 26.2932C41.9341 26.8116 42.4552 28.3659 44.5385 28.3659C45.3201 28.3659 46.1008 28.1067 46.3614 27.5883L46.6219 27.3291H49.7474L50.0079 27.5883C49.7474 29.1425 48.4456 31.4753 44.5385 31.4753C40.1113 31.4753 38.027 28.3659 38.027 24.7389C38.027 21.1119 40.1104 18.0025 44.278 18.0025C48.4456 18.0025 50.529 21.1119 50.529 24.7389V25.7757V25.7748ZM46.6219 23.1837C46.6219 22.9245 46.3614 21.111 44.278 21.111C42.1946 21.111 41.9341 22.9245 41.9341 23.1837L42.1946 23.4429H46.3614L46.6219 23.1837Z"
15:             class="logo-fill"></path>
16:         <path
17:             d="M57.8212 27.3291C57.8212 27.8475 58.0818 28.1067 58.6028 28.1067H60.9467L61.2073 28.3659V30.9569L60.9467 31.2161H58.6028C56.2589 31.2161 54.1756 30.1793 54.1756 27.3291V21.6285L53.915 21.3693H52.0922L51.8317 21.1101V18.5191L52.0922 18.2599H53.915L54.1756 18.0007V15.6688L54.4361 15.4096H57.5616L57.8221 15.6688V18.0007L58.0827 18.2599H60.9476L61.2082 18.5191V21.1101L60.9476 21.3693H58.0827L57.8221 21.6285V27.3291H57.8212Z"
18:             class="logo-fill"></path>
19:         <path d="M67.4573 31.2161H64.3318L64.0713 30.9569V13.3378L64.3318 13.0786H67.4573L67.7178 13.3378V30.9569L67.4573 31.2161Z" class="logo-fill"></path>
20:         <path
21:             d="M74.489 16.1881H71.3635L71.103 15.9289V13.3378L71.3635 13.0786H74.489L74.7495 13.3378V15.9289L74.489 16.1881ZM74.489 31.2161H71.3635L71.103 30.9569V18.52L71.3635 18.2608H74.489L74.7495 18.52V30.9569L74.489 31.2161Z"
22:             class="logo-fill"></path>
23:         <path
24:             d="M86.7295 13.3378V15.9289L86.469 16.1881H84.1251C83.604 16.1881 83.3435 16.4473 83.3435 16.9657V18.0025L83.604 18.2617H86.2085L86.469 18.5209V21.1119L86.2085 21.3711H83.604L83.3435 21.6303V30.9578L83.083 31.217H79.9575L79.6969 30.9578V21.6303L79.4364 21.3711H77.6136L77.353 21.1119V18.5209L77.6136 18.2617H79.4364L79.6969 18.0025V16.9657C79.6969 14.1154 81.7803 13.0786 84.1242 13.0786H86.4681L86.7286 13.3378H86.7295Z"
25:             class="logo-fill"></path>
26:         <path
27:             d="M96.3657 31.4753C95.3235 34.0664 94.2823 35.6207 90.6357 35.6207H89.3331L89.0725 35.3615V32.7704L89.3331 32.5112H90.6357C91.9375 32.5112 92.198 32.252 92.4586 31.4744V31.2152L88.2918 21.1101V18.5191L88.5524 18.2599H90.8963L91.1568 18.5191L94.2823 27.3291H94.5428L97.6683 18.5191L97.9289 18.2599H100.273L100.533 18.5191V21.1101L96.3666 31.4744L96.3657 31.4753Z"
28:             class="logo-fill"></path>
29:         <path
30:             d="M32.2761 31.2161L32.0156 30.9569L32.0174 23.4492C32.0174 22.1542 31.5055 21.15 29.9341 21.1174C29.1261 21.0965 28.2014 21.1156 27.2139 21.1573L27.0664 21.3077L27.0682 30.9569L26.8077 31.2161H23.6831L23.4225 30.9569V18.3813L23.6831 18.1221L30.7148 18.0587C34.2374 18.0587 35.6631 20.4667 35.6631 23.1846V30.9569L35.4025 31.2161H32.2761Z"
31:             class="logo-fill"></path>
32:     </g>
33:     <defs>
34:         <clipPath id="clip0_175_3110">
35:             <rect width="122" height="49.3382" fill="white"></rect>
36:         </clipPath>
37:     </defs>
38: </svg>
39:
40: <style>
41:     .dark-theme .logo-fill,
42:     :root .logo-fill {
43:         fill: #ffffff;
44:     }
45:
46:     .light-theme .logo-fill {
47:         fill: #1a2234;
48:     }
49: </style>
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

## File: src/components/TestimonialsSection.astro

```
  1: ---
  2: ---
  3:
  4: <div class="testimonials-section py-16 md:py-20 relative" id="testimonials">
  5:     <div class="container mx-auto px-4">
  6:         <!-- Section Header -->
  7:         <div class="text-center mb-16">
  8:             <h2 class="text-3xl md:text-4xl font-bold mb-4">Client Success Stories</h2>
  9:             <p class="text-lg text-text-muted max-w-3xl mx-auto">Don't just take our word for it. See what our clients have to say about their debt relief journey.</p>
 10:         </div>
 11:
 12:         <!-- Decorative Elements -->
 13:         <div class="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 blur-xl"></div>
 14:         <div class="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-accent/10 blur-xl"></div>
 15:
 16:         <!-- Testimonials Grid -->
 17:         <div class="testimonial-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 18:             <!-- Testimonial 1 -->
 19:             <div class="testimonial-card bg-background-form dark:bg-slate-800/80 p-6 md:p-8 rounded-xl shadow-md border border-border relative">
 20:                 <!-- Quote icon -->
 21:                 <div class="absolute -top-5 -left-2 text-primary opacity-20">
 22:                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
 23:                         <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.036-.33.084-.507.144l-.626.176.54-2.404c.047.023.088.04.123.05.6.104 1.082.188 1.442.25.363.06.705.09 1.025.09 1.213 0 2.136-.293 2.77-.88.manifold.632-.587 1.106-1.77 1.677-1.184.57-1.87.92-2.05 2.058-.18 1.138-.026 2.14.47 3.01.5.87 1.36 1.3 2.59 1.3.8 0 1.536-.24 2.207-.723s1.01-1.14 1.01-1.97c0-.16-.03-.33-.09-.52-.06-.18-.14-.33-.24-.43-.1-.1-.21-.19-.33-.23-.12-.05-.25-.08-.38-.08-.38 0-.74.13-1.08.4-.35.27-.63.63-.83 1.1-.21.47-.32.88-.32 1.24zm9 0c0-.88-.23-1.618-.69-2.217-.326-.41-.768-.68-1.327-.81-.55-.13-1.07-.14-1.54-.03-.16.03-.33.08-.51.14l-.63.18.55-2.4c.05.02.09.04.12.05.6.1 1.08.18 1.44.25.36.06.7.09 1.02.09 1.21 0 2.13-.3 2.77-.88.63-.59 1.11-1.78 1.68-3.01.6-.15 1.15-.23 1.67-.23.8 0 1.53-.24 2.2-.72s1.01-1.14 1.01-1.97c0-.16-.03-.33-.09-.52-.06-.18-.14-.33-.24-.43-.09-.1-.2-.19-.33-.23-.12-.05-.25-.08-.38-.08-.38 0-.74.13-1.08.4-.35.27-.63.63-.83 1.1-.2.47-.3.88-.3 1.24z" />
 24:                     </svg>
 25:                 </div>
 26:
 27:                 <!-- Rating Stars -->
 28:                 <div class="flex items-center mb-4 mt-2">
 29:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
 30:                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
 31:                     </svg>
 32:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
 33:                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
 34:                     </svg>
 35:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
 36:                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
 37:                     </svg>
 38:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
 39:                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
 40:                     </svg>
 41:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
 42:                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
 43:                     </svg>
 44:                 </div>
 45:
 46:                 <!-- Testimonial Text -->
 47:                 <blockquote class="mb-6">
 48:                     <p class="text-text-muted italic">"I was drowning in nearly $30,000 of credit card debt with high interest rates. The Debt Freedom Toolkit team helped me settle for just $15,400 - that's almost 50% savings! I'm now completely debt-free and rebuilding my credit."</p>
 49:                 </blockquote>
 50:
 51:                 <!-- Client Info -->
 52:                 <div class="flex items-center">
 53:                     <div class="avatar-placeholder bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center text-primary font-bold text-lg mr-4">MS</div>
 54:                     <div>
 55:                         <h4 class="font-semibold">Michael S.</h4>
 56:                         <p class="text-sm text-text-muted">Chicago, IL • Saved $14,600</p>
 57:                     </div>
 58:                 </div>
 59:             </div>
 60:
 61:             <!-- Testimonial 2 -->
 62:             <div class="testimonial-card bg-background-form dark:bg-slate-800/80 p-6 md:p-8 rounded-xl shadow-md border border-border relative">
 63:                 <!-- Quote icon -->
 64:                 <div class="absolute -top-5 -left-2 text-primary opacity-20">
 65:                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
 66:                         <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.036-.33.084-.507.144l-.626.176.54-2.404c.047.023.088.04.123.05.6.104 1.082.188 1.442.25.363.06.705.09 1.025.09 1.213 0 2.136-.293 2.77-.88.manifold.632-.587 1.106-1.77 1.677-1.184.57-1.87.92-2.05 2.058-.18 1.138-.026 2.14.47 3.01.5.87 1.36 1.3 2.59 1.3.8 0 1.536-.24 2.207-.723s1.01-1.14 1.01-1.97c0-.16-.03-.33-.09-.52-.06-.18-.14-.33-.24-.43-.1-.1-.21-.19-.33-.23-.12-.05-.25-.08-.38-.08-.38 0-.74.13-1.08.4-.35.27-.63.63-.83 1.1-.21.47-.32.88-.32 1.24zm9 0c0-.88-.23-1.618-.69-2.217-.326-.41-.768-.68-1.327-.81-.55-.13-1.07-.14-1.54-.03-.16.03-.33.08-.51.14l-.63.18.55-2.4c.05.02.09.04.12.05.6.1 1.08.18 1.44.25.36.06.7.09 1.02.09 1.21 0 2.13-.3 2.77-.88.63-.59 1.11-1.78 1.68-3.01.6-.15 1.15-.23 1.67-.23.8 0 1.53-.24 2.2-.72s1.01-1.14 1.01-1.97c0-.16-.03-.33-.09-.52-.06-.18-.14-.33-.24-.43-.09-.1-.2-.19-.33-.23-.12-.05-.25-.08-.38-.08-.38 0-.74.13-1.08.4-.35.27-.63.63-.83 1.1-.2.47-.3.88-.3 1.24z" />
 67:                     </svg>
 68:                 </div>
 69:
 70:                 <!-- Rating Stars -->
 71:                 <div class="flex items-center mb-4 mt-2">
 72:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
 73:                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
 74:                     </svg>
 75:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
 76:                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
 77:                     </svg>
 78:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
 79:                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
 80:                     </svg>
 81:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
 82:                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
 83:                     </svg>
 84:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
 85:                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
 86:                     </svg>
 87:                 </div>
 88:
 89:                 <!-- Testimonial Text -->
 90:                 <blockquote class="mb-6">
 91:                     <p class="text-text-muted italic">"After my medical emergency, I had over $22,000 in credit card debt that I used to cover expenses. I couldn't even make the minimum payments anymore. Debt Freedom Toolkit settled my debt for about 45% of what I owed. The relief is indescribable."</p>
 92:                 </blockquote>
 93:
 94:                 <!-- Client Info -->
 95:                 <div class="flex items-center">
 96:                     <div class="avatar-placeholder bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center text-primary font-bold text-lg mr-4">JR</div>
 97:                     <div>
 98:                         <h4 class="font-semibold">Jennifer R.</h4>
 99:                         <p class="text-sm text-text-muted">Atlanta, GA • Saved $12,100</p>
100:                     </div>
101:                 </div>
102:             </div>
103:
104:             <!-- Testimonial 3 -->
105:             <div class="testimonial-card bg-background-form dark:bg-slate-800/80 p-6 md:p-8 rounded-xl shadow-md border border-border relative">
106:                 <!-- Quote icon -->
107:                 <div class="absolute -top-5 -left-2 text-primary opacity-20">
108:                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
109:                         <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.036-.33.084-.507.144l-.626.176.54-2.404c.047.023.088.04.123.05.6.104 1.082.188 1.442.25.363.06.705.09 1.025.09 1.213 0 2.136-.293 2.77-.88.manifold.632-.587 1.106-1.77 1.677-1.184.57-1.87.92-2.05 2.058-.18 1.138-.026 2.14.47 3.01.5.87 1.36 1.3 2.59 1.3.8 0 1.536-.24 2.207-.723s1.01-1.14 1.01-1.97c0-.16-.03-.33-.09-.52-.06-.18-.14-.33-.24-.43-.1-.1-.21-.19-.33-.23-.12-.05-.25-.08-.38-.08-.38 0-.74.13-1.08.4-.35.27-.63.63-.83 1.1-.21.47-.32.88-.32 1.24zm9 0c0-.88-.23-1.618-.69-2.217-.326-.41-.768-.68-1.327-.81-.55-.13-1.07-.14-1.54-.03-.16.03-.33.08-.51.14l-.63.18.55-2.4c.05.02.09.04.12.05.6.1 1.08.18 1.44.25.36.06.7.09 1.02.09 1.21 0 2.13-.3 2.77-.88.63-.59 1.11-1.78 1.68-3.01.6-.15 1.15-.23 1.67-.23.8 0 1.53-.24 2.2-.72s1.01-1.14 1.01-1.97c0-.16-.03-.33-.09-.52-.06-.18-.14-.33-.24-.43-.09-.1-.2-.19-.33-.23-.12-.05-.25-.08-.38-.08-.38 0-.74.13-1.08.4-.35.27-.63.63-.83 1.1-.2.47-.3.88-.3 1.24z" />
110:                     </svg>
111:                 </div>
112:
113:                 <!-- Rating Stars -->
114:                 <div class="flex items-center mb-4 mt-2">
115:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
116:                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
117:                     </svg>
118:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
119:                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
120:                     </svg>
121:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
122:                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
123:                     </svg>
124:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
125:                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
126:                     </svg>
127:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
128:                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
129:                     </svg>
130:                 </div>
131:
132:                 <!-- Testimonial Text -->
133:                 <blockquote class="mb-6">
134:                     <p class="text-text-muted italic">"My wife and I accumulated $42,000 in credit card debt over the years. The interest alone was killing us. The Debt Freedom Toolkit team negotiated settlements with all 6 credit card companies, and we ended up paying just $23,100. We completed the program in 28 months!"</p>
135:                 </blockquote>
136:
137:                 <!-- Client Info -->
138:                 <div class="flex items-center">
139:                     <div class="avatar-placeholder bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center text-primary font-bold text-lg mr-4">DT</div>
140:                     <div>
141:                         <h4 class="font-semibold">David T.</h4>
142:                         <p class="text-sm text-text-muted">Phoenix, AZ • Saved $18,900</p>
143:                     </div>
144:                 </div>
145:             </div>
146:         </div>
147:
148:         <!-- Video Testimonial / Featured Client Story -->
149:         <div class="video-testimonial mt-16 p-6 md:p-8 bg-background-form dark:bg-slate-800 rounded-xl shadow-lg border border-border">
150:             <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
151:                 <!-- Video Thumbnail (Left) -->
152:                 <div class="lg:col-span-2 relative">
153:                     <div class="video-placeholder bg-primary/10 h-full min-h-[280px] rounded-lg flex items-center justify-center">
154:                         <div class="video-play-button bg-primary hover:bg-primary/90 transition-colors w-16 h-16 rounded-full flex items-center justify-center cursor-pointer">
155:                             <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
156:                                 <path d="M8 5v14l11-7z"></path>
157:                             </svg>
158:                         </div>
159:                     </div>
160:                 </div>
161:
162:                 <!-- Testimonial Content (Right) -->
163:                 <div class="lg:col-span-3">
164:                     <div class="flex items-center mb-4">
165:                         <div class="avatar-placeholder bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center text-primary font-bold text-xl mr-5">SJ</div>
166:                         <div>
167:                             <h3 class="text-2xl font-bold">Sarah J.</h3>
168:                             <p class="text-text-muted">Nurse & Mother of Two</p>
169:                         </div>
170:                     </div>
171:
172:                     <div class="mb-4">
173:                         <span class="inline-block bg-primary/10 text-primary font-semibold text-sm px-3 py-1 rounded-full">$17,850 Saved</span>
174:                         <span class="inline-block bg-primary/10 text-primary font-semibold text-sm px-3 py-1 rounded-full ml-2">18 Months</span>
175:                     </div>
176:
177:                     <blockquote class="mb-6">
178:                         <p class="text-lg mb-4 text-text-muted italic">"After my divorce, I was left with over $35,000 in credit card debt. I was working double shifts just to make minimum payments. Debt Freedom Toolkit cut my debt in half and gave me a manageable monthly payment."</p>
179:                         <p class="text-text-muted italic">Watch Sarah's full story about how she became debt-free and rebuilt her life after financial hardship.</p>
180:                     </blockquote>
181:
182:                     <a href="#watch-story" class="btn flex items-center gap-2 inline-flex">
183:                         <span>Watch Full Story</span>
184:                         <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
185:                             <polyline points="9 18 15 12 9 6"></polyline>
186:                         </svg>
187:                     </a>
188:                 </div>
189:             </div>
190:         </div>
191:     </div>
192: </div>
193:
194: <style>
195:     .testimonial-card {
196:         transition: transform 0.3s ease, box-shadow 0.3s ease;
197:     }
198:
199:     .testimonial-card:hover {
200:         transform: translateY(-8px);
201:         box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
202:     }
203:
204:     .video-play-button {
205:         transition: all 0.3s ease;
206:     }
207:
208:     .video-play-button:hover {
209:         transform: scale(1.1);
210:         box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.5);
211:     }
212:
213:     @media (prefers-reduced-motion: reduce) {
214:         .testimonial-card:hover {
215:             transform: none;
216:         }
217:
218:         .video-play-button:hover {
219:             transform: none;
220:             box-shadow: none;
221:         }
222:     }
223:
224:     .video-placeholder {
225:         background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E"),
226:         linear-gradient(to bottom right, rgba(var(--color-primary-rgb), 0.05), rgba(var(--color-accent-rgb), 0.1));
227:     }
228: </style>
```

## File: src/components/TrustIndicators.astro

```
 1: ---
 2: ---
 3:
 4: <div class="trust-indicators py-8 md:py-10 relative">
 5:     <div class="container mx-auto px-4">
 6:         <div class="bg-gray-100 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8">
 7:             <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12">
 8:                 <!-- Trust Badge 1: BBB Rating -->
 9:                 <div class="trust-badge flex flex-col items-center text-center">
10:                     <div class="badge-icon bg-[#2d7984]/10 p-3 rounded-full mb-3">
11:                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
12:                             <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
13:                         </svg>
14:                     </div>
15:                     <div class="badge-text">
16:                         <p class="font-bold text-md">A+ BBB Rating</p>
17:                         <p class="text-gray-600 text-sm">Accredited Business</p>
18:                     </div>
19:                 </div>
20:
21:                 <!-- Trust Badge 2: Customers Served -->
22:                 <div class="trust-badge flex flex-col items-center text-center">
23:                     <div class="badge-icon bg-[#2d7984]/10 p-3 rounded-full mb-3">
24:                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
25:                             <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
26:                             <circle cx="9" cy="7" r="4"></circle>
27:                             <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
28:                             <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
29:                         </svg>
30:                     </div>
31:                     <div class="badge-text">
32:                         <p class="font-bold text-md">50,000+</p>
33:                         <p class="text-gray-600 text-sm">Clients Served</p>
34:                     </div>
35:                 </div>
36:
37:                 <!-- Trust Badge 3: Debt Resolved -->
38:                 <div class="trust-badge flex flex-col items-center text-center">
39:                     <div class="badge-icon bg-[#2d7984]/10 p-3 rounded-full mb-3">
40:                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
41:                             <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
42:                             <line x1="12" y1="16" x2="12" y2="16"></line>
43:                             <line x1="6" y1="12" x2="6" y2="12"></line>
44:                             <line x1="18" y1="12" x2="18" y2="12"></line>
45:                             <line x1="12" y1="8" x2="12" y2="8"></line>
46:                         </svg>
47:                     </div>
48:                     <div class="badge-text">
49:                         <p class="font-bold text-md">$1.2 Billion</p>
50:                         <p class="text-gray-600 text-sm">Debt Resolved</p>
51:                     </div>
52:                 </div>
53:
54:                 <!-- Trust Badge 4: Years in Business -->
55:                 <div class="trust-badge flex flex-col items-center text-center">
56:                     <div class="badge-icon bg-[#2d7984]/10 p-3 rounded-full mb-3">
57:                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
58:                             <circle cx="12" cy="12" r="10"></circle>
59:                             <polyline points="12 6 12 12 16 14"></polyline>
60:                         </svg>
61:                     </div>
62:                     <div class="badge-text">
63:                         <p class="font-bold text-md">12+ Years</p>
64:                         <p class="text-gray-600 text-sm">Industry Experience</p>
65:                     </div>
66:                 </div>
67:             </div>
68:         </div>
69:     </div>
70: </div>
71:
72: <style>
73:     .trust-badge {
74:         transition: transform 0.3s ease;
75:     }
76:
77:     .trust-badge:hover {
78:         transform: translateY(-5px);
79:     }
80:
81:     @media (prefers-reduced-motion: reduce) {
82:         .trust-badge:hover {
83:             transform: none;
84:         }
85:     }
86: </style>
```

## File: src/pages/blobs/\_components/NewShape.tsx

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

## File: src/pages/blobs/\_components/StoredShapes.tsx

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
52:                         <label for="name" class="block mb-2 font-medium">Full Name*</label>
53:                         <input type="text" id="name" name="name" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white" required>
54:                     </div>
55:
56:                     <div>
57:                         <label for="email" class="block mb-2 font-medium">Email Address*</label>
58:                         <input type="email" id="email" name="email" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white" required>
59:                     </div>
60:
61:                     <div>
62:                         <label for="phone" class="block mb-2 font-medium">Phone Number*</label>
63:                         <input type="tel" id="phone" name="phone" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white" placeholder="(___) ___-____" required>
64:                     </div>
65:
66:                     <div>
67:                         <label for="debt-amount" class="block mb-2 font-medium">Total Debt Amount*</label>
68:                         <select id="debt-amount" name="debtAmount" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white" required>
69:                             <option value="">Select Amount</option>
70:                             <option value="10000-15000">$10,000 - $15,000</option>
71:                             <option value="15000-25000">$15,000 - $25,000</option>
72:                             <option value="25000-50000">$25,000 - $50,000</option>
73:                             <option value="50000+">$50,000+</option>
74:                         </select>
75:                     </div>
76:
77:                     <div>
78:                         <label for="message" class="block mb-2 font-medium">Message</label>
79:                         <textarea id="message" name="message" rows="4" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"></textarea>
80:                     </div>
81:
82:                     <div>
83:                         <button type="submit" class="w-full p-4 text-center font-bold bg-primary text-primary-content rounded-md transition-colors hover:bg-primary/85">
84:                             Send Message
85:                         </button>
86:                     </div>
87:
88:                     <p class="text-xs text-gray-400">
89:                         By submitting this form, you authorize Debt Freedom Toolkit to contact you at the number provided using automated technology. Your information is kept secure and confidential.
90:                     </p>
91:                 </form>
92:             </div>
93:         </div>
94:
95:         <div class="mt-10 text-center">
96:             <a href="/debt-relief" class="btn bg-primary text-primary-content">Back to Debt Relief</a>
97:         </div>
98:     </section>
99: </LandingLayout>
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
52:             <h2 class="mt-8 mb-4 text-2xl font-semibold">Data Security</h2>
53:             <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction.</p>
54:
55:             <h2 class="mt-8 mb-4 text-2xl font-semibold">Children's Privacy</h2>
56:             <p>Our services are not intended for children under the age of 18, and we do not knowingly collect personal information from children under 18.</p>
57:
58:             <h2 class="mt-8 mb-4 text-2xl font-semibold">Changes to This Privacy Policy</h2>
59:             <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
60:
61:             <h2 class="mt-8 mb-4 text-2xl font-semibold">Contact Us</h2>
62:             <p>If you have any questions about this Privacy Policy, please contact us at:</p>
63:             <p>Email: privacy@debtfreedomtoolkit.com</p>
64:             <p>Phone: (800) 555-1234</p>
65:             <p>Address: 123 Financial Way, Suite 500, Clearwater, FL 33759</p>
66:         </div>
67:
68:         <div class="mt-10">
69:             <a href="/debt-relief" class="btn bg-primary text-primary-content">Back to Debt Relief</a>
70:         </div>
71:     </section>
72: </LandingLayout>
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
 44:                 <h2 class="text-xl font-bold mb-4">Buttons</h2>
 45:
 46:                 <div class="space-y-4">
 47:                     <div>
 48:                         <h3 class="text-lg font-medium mb-2">Primary Button</h3>
 49:                         <button class="btn">Primary Button</button>
 50:                     </div>
 51:
 52:                     <div>
 53:                         <h3 class="text-lg font-medium mb-2">Secondary Button</h3>
 54:                         <button class="btn-secondary">Secondary Button</button>
 55:                     </div>
 56:
 57:                     <div>
 58:                         <h3 class="text-lg font-medium mb-2">Accent Button</h3>
 59:                         <button class="btn-accent">Accent Button</button>
 60:                     </div>
 61:
 62:                     <div>
 63:                         <h3 class="text-lg font-medium mb-2">Disabled Button</h3>
 64:                         <button class="btn" disabled>Disabled Button</button>
 65:                     </div>
 66:                 </div>
 67:             </div>
 68:
 69:             <!-- Form Elements -->
 70:             <div class="card p-6">
 71:                 <h2 class="text-xl font-bold mb-4">Form Elements</h2>
 72:
 73:                 <div class="space-y-4">
 74:                     <div>
 75:                         <label for="test-input" class="form-label">Text Input</label>
 76:                         <input type="text" id="test-input" class="w-full p-2 rounded" placeholder="Placeholder text">
 77:                     </div>
 78:
 79:                     <div>
 80:                         <label for="test-select" class="form-label">Select Dropdown</label>
 81:                         <select id="test-select" class="w-full p-2 rounded">
 82:                             <option>Option 1</option>
 83:                             <option>Option 2</option>
 84:                             <option>Option 3</option>
 85:                         </select>
 86:                     </div>
 87:
 88:                     <div>
 89:                         <label for="test-textarea" class="form-label">Textarea</label>
 90:                         <textarea id="test-textarea" class="w-full p-2 rounded" placeholder="Placeholder text"></textarea>
 91:                     </div>
 92:
 93:                     <div>
 94:                         <label class="form-label">Disabled Input</label>
 95:                         <input type="text" disabled value="Disabled input" class="w-full p-2 rounded">
 96:                     </div>
 97:                 </div>
 98:             </div>
 99:
100:             <!-- Alert States -->
101:             <div class="card p-6">
102:                 <h2 class="text-xl font-bold mb-4">Alerts & Errors</h2>
103:
104:                 <div class="space-y-4">
105:                     <div>
106:                         <h3 class="text-lg font-medium mb-2">Error Message</h3>
107:                         <p class="error-message">This is an error message with proper contrast.</p>
108:                     </div>
109:
110:                     <div>
111:                         <h3 class="text-lg font-medium mb-2">Form Field Error</h3>
112:                         <label class="form-label">Email Address</label>
113:                         <input type="text" class="w-full p-2 rounded input-error" value="invalid.email">
114:                         <p class="error-message">Please enter a valid email address.</p>
115:                     </div>
116:
117:                     <div>
118:                         <h3 class="text-lg font-medium mb-2">Info Alert</h3>
119:                         <div class="flex gap-2 p-3 bg-primary text-white rounded">
120:                             <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
121:                             This is an informational alert.
122:                         </div>
123:                     </div>
124:
125:                     <div>
126:                         <h3 class="text-lg font-medium mb-2">Warning Alert</h3>
127:                         <div class="flex gap-2 p-3 bg-yellow-700 text-white rounded">
128:                             <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
129:                             This is a warning alert.
130:                         </div>
131:                     </div>
132:                 </div>
133:             </div>
134:         </div>
135:
136:         <div class="card p-6 mb-8">
137:             <h2 class="text-xl font-bold mb-4">Contrast Testing Tool</h2>
138:
139:             <p class="mb-4">
140:                 Use the built-in contrast testing tool to verify that all color combinations meet WCAG AA requirements.
141:             </p>
142:
143:             <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded font-mono text-sm mb-4">
144:                 <pre>// Open your browser console and run the test function:
145: testThemeContrast();</pre>
146:             </div>
147:
148:             <button id="run-test" class="btn">Run Contrast Tests</button>
149:
150:             <div id="test-results" class="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded hidden">
151:                 <h3 class="font-bold mb-2">Test Results:</h3>
152:                 <div id="results-content" class="text-sm font-mono overflow-auto max-h-64"></div>
153:             </div>
154:         </div>
155:     </div>
156: </Layout>
157:
158: <script src="/scripts/contrast-tester.js" is:inline></script>
159: <script>
160:     document.addEventListener('DOMContentLoaded', () => {
161:         const runTestButton = document.getElementById('run-test');
162:         const testResults = document.getElementById('test-results');
163:         const resultsContent = document.getElementById('results-content');
164:
165:         if (runTestButton && testResults && resultsContent) {
166:             runTestButton.addEventListener('click', () => {
167:                 // Execute the test
168:                 const results = window.testThemeContrast();
169:
170:                 // Prepare result HTML
171:                 const isDarkTheme = document.documentElement.classList.contains('dark') ||
172:                                 document.documentElement.classList.contains('dark-theme');
173:
174:                 let html = `<div class="mb-2 font-bold">${isDarkTheme ? 'DARK' : 'LIGHT'} Theme Results:</div>`;
175:
176:                 results.forEach(result => {
177:                     const { name, color1Value, color2Value, ratio, passes } = result;
178:                     const formattedRatio = ratio.toFixed(2) + ':1';
179:                     const statusClass = passes ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900';
180:                     const statusText = passes ? 'PASS' : 'FAIL';
181:
182:                     html += `
183:                         <div class="mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
184:                             <div class="flex justify-between items-center">
185:                                 <span>${name}</span>
186:                                 <span class="${statusClass} px-2 py-1 rounded text-xs font-bold">${statusText} (${formattedRatio})</span>
187:                             </div>
188:                             <div class="flex gap-2 items-center mt-1">
189:                                 <div class="w-4 h-4 rounded" style="background-color: ${color1Value}"></div>
190:                                 <span class="text-xs">${color1Value}</span>
191:                                 <span>on</span>
192:                                 <div class="w-4 h-4 rounded" style="background-color: ${color2Value}"></div>
193:                                 <span class="text-xs">${color2Value}</span>
194:                             </div>
195:                         </div>
196:                     `;
197:                 });
198:
199:                 // Display results
200:                 resultsContent.innerHTML = html;
201:                 testResults.classList.remove('hidden');
202:             });
203:         }
204:     });
205: </script>
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

## File: src/utils/highlighter.ts

```typescript
1: import { createHighlighter } from 'shiki';
2:
3: export const highlighterPromise = createHighlighter({
4:     langs: ['jsx', 'js'],
5:     themes: ['min-dark']
6: });
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

## File: src/components/debt-relief/ChevronIcon.astro

```
 1: ---
 2: // src/components/debt-relief/ChevronIcon.astro
 3: ---
 4:
 5: <!-- Small, controlled chevron icon for FAQ items -->
 6: <svg
 7:   xmlns="http://www.w3.org/2000/svg"
 8:   viewBox="0 0 24 24"
 9:   fill="none"
10:   stroke="currentColor"
11:   stroke-width="1.5"
12:   stroke-linecap="round"
13:   stroke-linejoin="round"
14:   class="chevron-icon text-primary"
15: >
16:   <path d="M6 9l6 6 6-6"></path>
17: </svg>
18:
19: <style>
20:   .chevron-icon {
21:     max-width: 16px;
22:     max-height: 16px;
23:     width: 16px;
24:     height: 16px;
25:     transition: transform 0.3s ease;
26:     transform-origin: center;
27:   }
28: </style>
```

## File: src/components/debt-relief/DebtFreedomLogo.astro

```
1: ---
2: // src/components/debt-relief/DebtFreedomLogo.astro
3: ---
4:
5: <div class="flex items-center">
6:   <img src="/images/debt-freedom-logo.svg" alt="Debt Freedom Toolkit" width="40" height="40" />
7:   <span class="ml-2 text-xl font-semibold text-[#2d7984]">Debt Freedom Toolkit</span>
8: </div>
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

## File: src/components/debt-relief/FinalCTA.astro

```
 1: ---
 2: // src/components/debt-relief/FinalCTA.astro
 3: ---
 4:
 5: <div class="p-10 text-center bg-primary rounded-lg shadow-xl border-2 border-primary transform hover:scale-[1.01] transition-all duration-300">
 6:     <h2 class="mb-6 text-3xl font-bold text-primary-content">Ready To Take Control Of Your Debt?</h2>
 7:     <p class="mb-8 text-lg text-primary-content font-medium">Get Your Free Debt Relief Consultation</p>
 8:
 9:     <div class="flex flex-col items-center gap-6">
10:         <a
11:             href="#qualification-form"
12:             class="btn btn-lg bg-primary-content text-primary hover:opacity-90 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
13:         >
14:             Check If You Qualify
15:         </a>
16:         <div class="text-primary-content font-medium">OR</div>
17:         <a
18:             href="tel:8005551234"
19:             class="text-2xl font-bold text-primary-content hover:underline transition-all flex items-center gap-2"
20:         >
21:             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
22:                 <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
23:             </svg>
24:             (800) 555-1234
25:         </a>
26:     </div>
27:
28:     <p class="mt-6 text-primary-content text-sm">Available 9:00am - 8:00pm EST, 7 days a week</p>
29: </div>
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
12: <div class="flex flex-col items-center text-center p-6 form-container rounded-lg bg-background-form text-text shadow-lg border border-border hover:shadow-xl transition-all">
13:     <div class="flex items-center justify-center w-16 h-16 mb-6 text-xl font-bold text-primary-content bg-primary rounded-full shadow-md transform hover:scale-110 transition-all">
14:         {stepNumber}
15:     </div>
16:     <h3 class="mb-4 text-2xl font-semibold">{title}</h3>
17:     <p class="text-text-muted leading-relaxed">{description}</p>
18: </div>
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

## File: src/components/Alert.astro

```
 1: ---
 2: interface Props {
 3:     class?: string;
 4:     type?: 'info' | 'warning' | 'error' | 'success';
 5: }
 6:
 7: const { class: className, type = 'info' } = Astro.props;
 8:
 9: // Determine color classes based on type for proper contrast
10: const colorClasses = {
11:     info: 'bg-primary text-white',
12:     warning: 'bg-yellow-700 text-white',
13:     error: 'bg-red-700 text-white',
14:     success: 'bg-green-700 text-white'
15: };
16:
17: const activeColorClass = colorClasses[type];
18: ---
19:
20: <div class:list={['flex gap-4 p-4 rounded-sm', activeColorClass, className]}>
21:     <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24">
22:         <path
23:             d="M12 20.016q3.281 0 5.648-2.367t2.367-5.648-2.367-5.648-5.648-2.367-5.648 2.367-2.367 5.648 2.367 5.648 5.648 2.367zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93zM11.016 6.984h1.969v6h-1.969v-6zM11.016 15h1.969v2.016h-1.969v-2.016z"
24:         ></path>
25:     </svg>
26:     <slot />
27: </div>
```

## File: src/components/DebtReliefForm.astro

```
  1: ---
  2: ---
  3:
  4: <div id="consultation" class="consultation-section py-16 md:py-20 relative">
  5:     <!-- Decorative background elements -->
  6:     <div class="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
  7:     <div class="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent -z-10"></div>
  8:
  9:     <div class="container mx-auto px-4">
 10:         <div class="text-center mb-12">
 11:             <h2 class="text-3xl md:text-4xl font-bold mb-4">You Could Save Thousands</h2>
 12:             <p class="text-xl text-text-muted max-w-3xl mx-auto">See if you qualify for our debt relief program in just 30 seconds.</p>
 13:         </div>
 14:
 15:         <!-- Enhanced Form Container -->
 16:         <div class="form-container max-w-2xl mx-auto relative">
 17:             <!-- Glowing effect for emphasis -->
 18:             <div class="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20 rounded-xl blur-md"></div>
 19:
 20:             <div class="relative bg-background-form dark:bg-slate-800 p-8 md:p-10 rounded-xl shadow-xl border border-border">
 21:                 <div class="mb-8 flex items-center justify-between">
 22:                     <h3 class="font-bold text-2xl">Quick Debt Relief Check</h3>
 23:                     <div class="secure-badge flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
 24:                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
 25:                             <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
 26:                             <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
 27:                         </svg>
 28:                         <span>Secure & Confidential</span>
 29:                     </div>
 30:                 </div>
 31:
 32:                 <form id="debt-relief-form" class="space-y-6">
 33:                     <div class="form-group">
 34:                         <label for="debt-amount" class="form-label block mb-2 text-lg">How much debt do you have?*</label>
 35:                         <select
 36:                             id="debt-amount"
 37:                             name="debtAmount"
 38:                             class="w-full p-4 rounded-lg text-lg transition-shadow duration-200 focus:ring-2 focus:ring-primary/50"
 39:                             required
 40:                         >
 41:                             <option value="">Select Amount</option>
 42:                             <option value="5000-10000">$5,000 - $10,000</option>
 43:                             <option value="10000-25000">$10,000 - $25,000</option>
 44:                             <option value="25000-50000">$25,000 - $50,000</option>
 45:                             <option value="50000+">$50,000+</option>
 46:                         </select>
 47:                         <div id="debt-amount-error" class="error-message hidden mt-2 pl-1"></div>
 48:                     </div>
 49:
 50:                     <div class="form-group">
 51:                         <label for="debt-type" class="form-label block mb-2 text-lg">What type of debt do you have?*</label>
 52:                         <select
 53:                             id="debt-type"
 54:                             name="debtType"
 55:                             class="w-full p-4 rounded-lg text-lg transition-shadow duration-200 focus:ring-2 focus:ring-primary/50"
 56:                             required
 57:                         >
 58:                             <option value="">Select Type</option>
 59:                             <option value="credit-card">Credit Card</option>
 60:                             <option value="medical">Medical</option>
 61:                             <option value="personal-loans">Personal Loans</option>
 62:                             <option value="mixed">Mixed Debt</option>
 63:                         </select>
 64:                         <div id="debt-type-error" class="error-message hidden mt-2 pl-1"></div>
 65:                     </div>
 66:
 67:                     <div class="form-group">
 68:                         <label for="phone" class="form-label block mb-2 text-lg">Phone Number*</label>
 69:                         <div class="relative">
 70:                             <input
 71:                                 type="tel"
 72:                                 id="phone"
 73:                                 name="phone"
 74:                                 class="w-full p-4 pl-10 rounded-lg text-lg transition-shadow duration-200 focus:ring-2 focus:ring-primary/50"
 75:                                 placeholder="(000) 000-0000"
 76:                                 pattern="^\(\d{3}\) \d{3}-\d{4}$"
 77:                                 required
 78:                                 aria-describedby="phone-format"
 79:                             />
 80:                             <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">
 81:                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
 82:                                     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
 83:                                 </svg>
 84:                             </div>
 85:                         </div>
 86:                         <small id="phone-format" class="text-text-muted text-sm block mt-1 pl-1">Format: (XXX) XXX-XXXX</small>
 87:                         <div id="phone-error" class="error-message hidden mt-2 pl-1"></div>
 88:                     </div>
 89:
 90:                     <button
 91:                         type="submit"
 92:                         class="btn w-full py-4 text-lg font-bold mt-6 relative overflow-hidden group"
 93:                         aria-label="Submit form to check eligibility"
 94:                     >
 95:                         <span class="relative z-10">Check My Eligibility Now</span>
 96:                         <div class="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient"></div>
 97:                     </button>
 98:
 99:                     <div class="text-center mt-4 text-sm text-text-muted">
100:                         <p class="flex items-center justify-center gap-1">
101:                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
102:                                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
103:                             </svg>
104:                             Your information is protected with 256-bit encryption
105:                         </p>
106:                     </div>
107:                 </form>
108:             </div>
109:         </div>
110:
111:         <!-- Form Benefits -->
112:         <div class="form-benefits mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
113:             <div class="benefit-item text-center">
114:                 <div class="icon-wrapper bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
115:                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
116:                         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
117:                     </svg>
118:                 </div>
119:                 <h4 class="font-bold mb-2">100% Free Consultation</h4>
120:                 <p class="text-text-muted">No obligation or upfront fees to get started.</p>
121:             </div>
122:
123:             <div class="benefit-item text-center">
124:                 <div class="icon-wrapper bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
125:                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
126:                         <polyline points="20 6 9 17 4 12"></polyline>
127:                     </svg>
128:                 </div>
129:                 <h4 class="font-bold mb-2">Instant Qualification Check</h4>
130:                 <p class="text-text-muted">Find out if you qualify in as little as 30 seconds.</p>
131:             </div>
132:
133:             <div class="benefit-item text-center">
134:                 <div class="icon-wrapper bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
135:                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
136:                         <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
137:                         <line x1="1" y1="10" x2="23" y2="10"></line>
138:                     </svg>
139:                 </div>
140:                 <h4 class="font-bold mb-2">No Impact On Credit Score</h4>
141:                 <p class="text-text-muted">Our qualification process won't hurt your credit.</p>
142:             </div>
143:         </div>
144:     </div>
145: </div>
146:
147: <style>
148:     /* Enhanced focus states for better accessibility */
149:     select:focus, input:focus {
150:         outline: none;
151:         box-shadow: 0 0 0 3px rgba(45, 121, 132, 0.3); /* Updated to match new primary color */
152:         border-color: var(--color-primary);
153:     }
154:
155:     /* Dark mode focus states */
156:     .dark select:focus, .dark input:focus {
157:         box-shadow: 0 0 0 3px rgba(88, 203, 224, 0.4); /* Brighter in dark mode */
158:     }
159:
160:     /* Error states with high contrast */
161:     .error-message {
162:         color: var(--color-error);
163:         font-size: 0.875rem;
164:         font-weight: 500;
165:     }
166:
167:     .input-error {
168:         border-color: var(--color-error) !important;
169:     }
170:
171:     /* Make sure placeholders have enough contrast */
172:     input::placeholder {
173:         color: var(--color-placeholder);
174:         opacity: 1;
175:     }
176:
177:     /* Form animations */
178:     .form-container {
179:         transition: transform 0.3s ease, box-shadow 0.3s ease;
180:     }
181:
182:     .form-container:hover {
183:         transform: translateY(-5px);
184:         box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
185:     }
186:
187:     @media (prefers-reduced-motion: reduce) {
188:         .form-container:hover {
189:             transform: none;
190:             box-shadow: none;
191:         }
192:     }
193:
194:     /* Submit button animation */
195:     @keyframes gradient {
196:         0% { background-position: 0% 50%; }
197:         50% { background-position: 100% 50%; }
198:         100% { background-position: 0% 50%; }
199:     }
200:
201:     .animate-gradient {
202:         animation: gradient 3s ease infinite;
203:     }
204:
205:     /* Benefit items animation */
206:     .benefit-item {
207:         transition: transform 0.3s ease;
208:     }
209:
210:     .benefit-item:hover {
211:         transform: translateY(-5px);
212:     }
213:
214:     .icon-wrapper {
215:         transition: all 0.3s ease;
216:     }
217:
218:     .benefit-item:hover .icon-wrapper {
219:         transform: scale(1.1);
220:         box-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.3);
221:     }
222:
223:     @media (prefers-reduced-motion: reduce) {
224:         .animate-gradient {
225:             animation: none;
226:         }
227:
228:         .benefit-item:hover {
229:             transform: none;
230:         }
231:
232:         .benefit-item:hover .icon-wrapper {
233:             transform: none;
234:             box-shadow: none;
235:         }
236:     }
237: </style>
238:
239: <script>
240: // Client-side validation and form handling
241: document.addEventListener('DOMContentLoaded', () => {
242:     const form = document.getElementById('debt-relief-form');
243:     const phoneInput = document.getElementById('phone');
244:     const debtAmountSelect = document.getElementById('debt-amount');
245:     const debtTypeSelect = document.getElementById('debt-type');
246:
247:     const debtAmountError = document.getElementById('debt-amount-error');
248:     const debtTypeError = document.getElementById('debt-type-error');
249:     const phoneError = document.getElementById('phone-error');
250:
251:     // Function to show error
252:     const showError = (element, errorElement, message) => {
253:         element.classList.add('input-error');
254:         errorElement.textContent = message;
255:         errorElement.classList.remove('hidden');
256:     };
257:
258:     // Function to clear error
259:     const clearError = (element, errorElement) => {
260:         element.classList.remove('input-error');
261:         errorElement.textContent = '';
262:         errorElement.classList.add('hidden');
263:     };
264:
265:     // Basic phone formatting
266:     phoneInput && phoneInput.addEventListener('input', (e) => {
267:         let value = e.target.value.replace(/\D/g, '');
268:         if (value.length > 0) {
269:             if (value.length <= 3) {
270:                 value = `(${value}`;
271:             } else if (value.length <= 6) {
272:                 value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
273:             } else {
274:                 value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
275:             }
276:         }
277:         e.target.value = value;
278:
279:         // Clear error when user types
280:         clearError(phoneInput, phoneError);
281:     });
282:
283:     // Clear errors when user selects an option
284:     debtAmountSelect && debtAmountSelect.addEventListener('change', () => clearError(debtAmountSelect, debtAmountError));
285:     debtTypeSelect && debtTypeSelect.addEventListener('change', () => clearError(debtTypeSelect, debtTypeError));
286:
287:     // Form submission
288:     if (form) {
289:         form.addEventListener('submit', (e) => {
290:             e.preventDefault();
291:             let isValid = true;
292:
293:             // Validate debt amount
294:             if (!debtAmountSelect.value) {
295:                 showError(debtAmountSelect, debtAmountError, 'Please select your debt amount');
296:                 isValid = false;
297:             }
298:
299:             // Validate debt type
300:             if (!debtTypeSelect.value) {
301:                 showError(debtTypeSelect, debtTypeError, 'Please select your debt type');
302:                 isValid = false;
303:             }
304:
305:             // Validate phone
306:             if (!phoneInput.value.match(/^\(\d{3}\) \d{3}-\d{4}$/)) {
307:                 showError(phoneInput, phoneError, 'Please enter a valid phone number');
308:                 isValid = false;
309:             }
310:
311:             if (!isValid) {
312:                 return;
313:             }
314:
315:             // Create success message
316:             const formContainer = form.closest('.relative');
317:             const successMessage = document.createElement('div');
318:             successMessage.className = 'text-center py-8';
319:             successMessage.innerHTML = `
320:                 <div class="success-icon mx-auto mb-6 bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center">
321:                     <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" class="text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
322:                         <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
323:                         <polyline points="22 4 12 14.01 9 11.01"></polyline>
324:                     </svg>
325:                 </div>
326:                 <h3 class="text-2xl font-bold mb-4">Thank You!</h3>
327:                 <p class="text-lg text-text-muted mb-6">A debt relief specialist will contact you shortly to discuss your options.</p>
328:                 <p class="text-text-muted">Need immediate assistance? Call us at <span class="text-primary font-semibold">(800) 555-1234</span></p>
329:             `;
330:
331:             // Hide form and show success message with animation
332:             form.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
333:             form.style.opacity = '0';
334:             form.style.transform = 'translateY(20px)';
335:
336:             setTimeout(() => {
337:                 form.style.display = 'none';
338:                 formContainer.appendChild(successMessage);
339:
340:                 // Reset form
341:                 form.reset();
342:
343:                 // Clear all errors
344:                 clearError(debtAmountSelect, debtAmountError);
345:                 clearError(debtTypeSelect, debtTypeError);
346:                 clearError(phoneInput, phoneError);
347:             }, 500);
348:         });
349:     }
350: });
351: </script>
```

## File: src/components/Footer.astro

```
  1: ---
  2: import Logo from "./Logo.astro";
  3: ---
  4:
  5: <footer class="footer-section pt-16 pb-12 sm:pt-24 sm:pb-16 relative">
  6:     <div class="container mx-auto px-4">
  7:         <div class="mb-12">
  8:             <slot />
  9:         </div>
 10:
 11:         <div class="footer-content grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
 12:             <!-- Company Info -->
 13:             <div class="col-span-1 md:col-span-1">
 14:                 <div class="mb-6">
 15:                     <a href="/" class="inline-block" aria-label="Debt Freedom Toolkit">
 16:                         <Logo />
 17:                     </a>
 18:                 </div>
 19:                 <p class="text-text-muted mb-6">Helping Americans overcome credit card debt and regain financial freedom since 2010.</p>
 20:                 <div class="flex space-x-4">
 21:                     <a href="#" class="social-icon bg-primary/10 hover:bg-primary/20 text-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors" aria-label="Facebook">
 22:                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
 23:                             <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
 24:                         </svg>
 25:                     </a>
 26:                     <a href="#" class="social-icon bg-primary/10 hover:bg-primary/20 text-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors" aria-label="Twitter">
 27:                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
 28:                             <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
 29:                         </svg>
 30:                     </a>
 31:                     <a href="#" class="social-icon bg-primary/10 hover:bg-primary/20 text-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors" aria-label="LinkedIn">
 32:                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
 33:                             <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
 34:                         </svg>
 35:                     </a>
 36:                     <a href="#" class="social-icon bg-primary/10 hover:bg-primary/20 text-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors" aria-label="Instagram">
 37:                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
 38:                             <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
 39:                         </svg>
 40:                     </a>
 41:                 </div>
 42:             </div>
 43:
 44:             <!-- Quick Links -->
 45:             <div class="col-span-1">
 46:                 <h4 class="text-lg font-bold mb-6">Quick Links</h4>
 47:                 <ul class="space-y-4">
 48:                     <li><a href="/" class="text-text-muted hover:text-primary transition-colors">Home</a></li>
 49:                     <li><a href="#benefits" class="text-text-muted hover:text-primary transition-colors">How It Works</a></li>
 50:                     <li><a href="#testimonials" class="text-text-muted hover:text-primary transition-colors">Success Stories</a></li>
 51:                     <li><a href="/about" class="text-text-muted hover:text-primary transition-colors">About Us</a></li>
 52:                     <li><a href="/blog" class="text-text-muted hover:text-primary transition-colors">Debt Relief Blog</a></li>
 53:                 </ul>
 54:             </div>
 55:
 56:             <!-- Legal & Resources -->
 57:             <div class="col-span-1">
 58:                 <h4 class="text-lg font-bold mb-6">Legal & Resources</h4>
 59:                 <ul class="space-y-4">
 60:                     <li><a href="/privacy-policy" class="text-text-muted hover:text-primary transition-colors">Privacy Policy</a></li>
 61:                     <li><a href="/terms-of-service" class="text-text-muted hover:text-primary transition-colors">Terms of Service</a></li>
 62:                     <li><a href="/debt-calculator" class="text-text-muted hover:text-primary transition-colors">Debt Calculator</a></li>
 63:                     <li><a href="/faq" class="text-text-muted hover:text-primary transition-colors">FAQ</a></li>
 64:                     <li><a href="/sitemap" class="text-text-muted hover:text-primary transition-colors">Sitemap</a></li>
 65:                 </ul>
 66:             </div>
 67:
 68:             <!-- Contact Information -->
 69:             <div class="col-span-1">
 70:                 <h4 class="text-lg font-bold mb-6">Contact Us</h4>
 71:                 <ul class="space-y-4">
 72:                     <li class="flex items-start gap-3">
 73:                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="text-primary mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 74:                             <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
 75:                         </svg>
 76:                         <span class="text-text-muted">(800) 555-1234</span>
 77:                     </li>
 78:                     <li class="flex items-start gap-3">
 79:                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="text-primary mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 80:                             <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
 81:                             <polyline points="22,6 12,13 2,6"></polyline>
 82:                         </svg>
 83:                         <span class="text-text-muted">support@debtfreedomtoolkit.com</span>
 84:                     </li>
 85:                     <li class="flex items-start gap-3">
 86:                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="text-primary mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 87:                             <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
 88:                             <circle cx="12" cy="10" r="3"></circle>
 89:                         </svg>
 90:                         <span class="text-text-muted">123 Financial District<br>Suite 456<br>New York, NY 10001</span>
 91:                     </li>
 92:                     <li class="flex items-start gap-3">
 93:                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="text-primary mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 94:                             <circle cx="12" cy="12" r="10"></circle>
 95:                             <polyline points="12 6 12 12 16 14"></polyline>
 96:                         </svg>
 97:                         <span class="text-text-muted">Mon-Fri: 9:00am - 8:00pm EST<br>Sat-Sun: 10:00am - 6:00pm EST</span>
 98:                     </li>
 99:                 </ul>
100:             </div>
101:         </div>
102:
103:         <!-- Disclaimer & Copyright -->
104:         <div class="border-t border-border pt-8">
105:             <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
106:                 <div class="text-xs text-text-muted">
107:                     <p class="mb-2"><strong>Disclaimer:</strong> Debt Freedom Toolkit is not a lender or debt settlement company. We do not provide financial advice or credit repair services. Results vary by individual.</p>
108:                     <p>This website is for informational purposes only and is not an offer or solicitation for debt settlement services.</p>
109:                 </div>
110:                 <div class="text-xs text-text-muted md:text-right">
111:                     <p class="mb-2"><strong>Security:</strong> This website is secured using 256-bit encryption to protect your personal information.</p>
112:                     <p>BBB Accredited Business - A+ Rating | AFCC Member | IAPDA Certified</p>
113:                 </div>
114:             </div>
115:
116:             <div class="flex flex-col md:flex-row md:justify-between items-center">
117:                 <p class="text-text-muted text-sm mb-4 md:mb-0">© {new Date().getFullYear()} DebtFreedom Financial Solutions LLC. All rights reserved.</p>
118:
119:                 <div class="payment-methods flex gap-3">
120:                     <span class="text-text-muted text-sm">Accepted Payment Methods:</span>
121:                     <div class="flex gap-2">
122:                         <div class="payment-icon w-8 h-5 bg-gray-200 rounded opacity-70"></div>
123:                         <div class="payment-icon w-8 h-5 bg-gray-200 rounded opacity-70"></div>
124:                         <div class="payment-icon w-8 h-5 bg-gray-200 rounded opacity-70"></div>
125:                         <div class="payment-icon w-8 h-5 bg-gray-200 rounded opacity-70"></div>
126:                     </div>
127:                 </div>
128:             </div>
129:         </div>
130:     </div>
131: </footer>
132:
133: <style>
134:     .social-icon {
135:         transition: all 0.2s ease;
136:     }
137:
138:     .social-icon:hover {
139:         transform: translateY(-3px);
140:     }
141:
142:     @media (prefers-reduced-motion: reduce) {
143:         .social-icon:hover {
144:             transform: none;
145:         }
146:     }
147:
148:     .payment-icon {
149:         transition: opacity 0.2s ease;
150:     }
151:
152:     .payment-icon:hover {
153:         opacity: 1;
154:     }
155: </style>
```

## File: src/components/Header.astro

```
  1: ---
  2: import Logo from '../components/Logo.astro';
  3: import ThemeToggle from '../components/ThemeToggle.astro';
  4:
  5: const navItems = [
  6:     { linkText: 'Home', href: '/' },
  7:     { linkText: 'How It Works', href: '#benefits' },
  8:     { linkText: 'Success Stories', href: '#testimonials' },
  9:     { linkText: 'FAQ', href: '/faq' },
 10:     { linkText: 'About Us', href: '/about' },
 11:     { linkText: 'Blog', href: '/blog' }
 12: ];
 13: ---
 14:
 15: <header class="header-section fixed top-0 left-0 right-0 z-50 transition-all duration-300" id="main-header">
 16:     <div class="container mx-auto px-4">
 17:         <nav class="flex justify-between items-center py-4">
 18:             <!-- Logo -->
 19:             <div class="logo-container">
 20:                 <a href="/" class="inline-block" aria-label="Debt Freedom Toolkit">
 21:                     <Logo />
 22:                 </a>
 23:             </div>
 24:
 25:             <!-- Desktop Navigation and Theme Toggle -->
 26:             <div class="hidden md:flex md:items-center md:gap-4">
 27:                 {
 28:                     !!navItems?.length && (
 29:                         <ul class="flex items-center gap-x-6">
 30:                             {navItems.map((item) => (
 31:                                 <li>
 32:                                     <a
 33:                                         href={item.href}
 34:                                         class="inline-block px-1.5 py-1 text-text hover:text-primary font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left"
 35:                                     >
 36:                                         {item.linkText}
 37:                                     </a>
 38:                                 </li>
 39:                             ))}
 40:                             <li>
 41:                                 <a
 42:                                     href="#consultation"
 43:                                     class="btn ml-4"
 44:                                 >
 45:                                     Get Started
 46:                                 </a>
 47:                             </li>
 48:                         </ul>
 49:                     )
 50:                 }
 51:                 <ThemeToggle />
 52:             </div>
 53:
 54:             <!-- Mobile Menu Button -->
 55:             <div class="block md:hidden">
 56:                 <div class="flex items-center gap-2">
 57:                     <ThemeToggle />
 58:                     <button id="mobile-menu-button" class="flex items-center p-2 rounded-lg text-text hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary" aria-expanded="false" aria-controls="mobile-menu" aria-label="Toggle menu">
 59:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 60:                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
 61:                     </svg>
 62:                 </button>
 63:                 </div>
 64:             </div>
 65:         </nav>
 66:     </div>
 67:
 68:     <!-- Mobile Menu (Hidden by default) -->
 69:     <div id="mobile-menu" class="hidden bg-background-form dark:bg-gray-800 shadow-lg absolute left-0 right-0 top-full border-t border-border dark:border-gray-700 animate-fade-in">
 70:         <div class="container mx-auto px-4 py-4">
 71:             <ul class="flex flex-col gap-y-3">
 72:                 {navItems.map((item) => (
 73:                     <li>
 74:                         <a
 75:                             href={item.href}
 76:                             class="block py-2 px-4 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg font-medium transition-colors text-gray-900 dark:text-gray-100"
 77:                         >
 78:                             {item.linkText}
 79:                         </a>
 80:                     </li>
 81:                 ))}
 82:                 <li class="mt-2">
 83:                     <a
 84:                         href="#consultation"
 85:                         class="btn w-full text-center"
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
112:                 header.classList.add('bg-white/95', 'dark:bg-gray-900/95', 'backdrop-blur-md', 'shadow-md', 'border-b', 'border-border', 'dark:border-gray-700');
113:             } else {
114:                 header.classList.remove('bg-white/95', 'dark:bg-gray-900/95', 'backdrop-blur-md', 'shadow-md', 'border-b', 'border-border', 'dark:border-gray-700');
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
135:                 mobileMenuButton.innerHTML = `
136:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
137:                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
138:                     </svg>
139:                 `;
140:             } else {
141:                 mobileMenu.classList.add('hidden');
142:                 // Change X to hamburger
143:                 mobileMenuButton.innerHTML = `
144:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
145:                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
146:                     </svg>
147:                 `;
148:             }
149:         });
150:
151:         // Close mobile menu when clicking on a link
152:         document.querySelectorAll('#mobile-menu a').forEach(link => {
153:             link.addEventListener('click', () => {
154:                 mobileMenu.classList.add('hidden');
155:                 mobileMenuButton.setAttribute('aria-expanded', 'false');
156:                 // Change X to hamburger
157:                 mobileMenuButton.innerHTML = `
158:                     <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
159:                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
160:                     </svg>
161:                 `;
162:             });
163:         });
164:
165:         // Set initial header state
166:         updateHeaderState();
167:
168:         // Update header state on scroll
169:         window.addEventListener('scroll', updateHeaderState);
170:
171:         // Handle smooth scrolling for anchor links
172:         document.querySelectorAll('a[href^="#"]').forEach(anchor => {
173:             anchor.addEventListener('click', function(e) {
174:                 e.preventDefault();
175:
176:                 const targetId = this.getAttribute('href');
177:                 if (targetId === '#') return;
178:
179:                 const targetElement = document.querySelector(targetId);
180:                 if (targetElement) {
181:                     const headerHeight = header.offsetHeight;
182:                     const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
183:
184:                     window.scrollTo({
185:                         top: targetPosition,
186:                         behavior: 'smooth'
187:                     });
188:                 }
189:             });
190:         });
191:     });
192: </script>
```

## File: src/components/ThemeToggle.astro

```
  1: ---
  2: ---
  3:
  4: <div class="theme-toggle-container" data-theme-toggle>
  5:   <div class="theme-toggle" role="radiogroup" aria-label="Theme Selection" tabindex="0">
  6:     <button
  7:       class="theme-option"
  8:       data-theme="light"
  9:       role="radio"
 10:       aria-checked="false"
 11:       aria-label="Light theme">
 12:       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon">
 13:         <circle cx="12" cy="12" r="5"></circle>
 14:         <line x1="12" y1="1" x2="12" y2="3"></line>
 15:         <line x1="12" y1="21" x2="12" y2="23"></line>
 16:         <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
 17:         <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
 18:         <line x1="1" y1="12" x2="3" y2="12"></line>
 19:         <line x1="21" y1="12" x2="23" y2="12"></line>
 20:         <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
 21:         <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
 22:       </svg>
 23:       <span class="sr-only">Light theme</span>
 24:     </button>
 25:
 26:     <button
 27:       class="theme-option"
 28:       data-theme="system"
 29:       role="radio"
 30:       aria-checked="false"
 31:       aria-label="System theme">
 32:       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon">
 33:         <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
 34:         <line x1="8" y1="21" x2="16" y2="21"></line>
 35:         <line x1="12" y1="17" x2="12" y2="21"></line>
 36:       </svg>
 37:       <span class="sr-only">System theme</span>
 38:     </button>
 39:
 40:     <button
 41:       class="theme-option"
 42:       data-theme="dark"
 43:       role="radio"
 44:       aria-checked="false"
 45:       aria-label="Dark theme">
 46:       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon">
 47:         <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
 48:       </svg>
 49:       <span class="sr-only">Dark theme</span>
 50:     </button>
 51:   </div>
 52:
 53:   <div aria-live="polite" class="sr-only" id="theme-announcement"></div>
 54: </div>
 55:
 56: <style>
 57:   .theme-toggle-container {
 58:     position: relative;
 59:   }
 60:
 61:   .theme-toggle {
 62:     display: flex;
 63:     border-radius: 9999px;
 64:     overflow: hidden;
 65:     border: 1px solid var(--color-border);
 66:     background: var(--color-form-bg);
 67:     box-shadow: 0 2px 4px var(--shadow-color-light);
 68:     transition: border-color 0.2s ease, box-shadow 0.2s ease;
 69:   }
 70:
 71:   .theme-toggle:focus-visible {
 72:     outline: 3px solid var(--color-primary);
 73:     outline-offset: 2px;
 74:   }
 75:
 76:   .theme-option {
 77:     display: flex;
 78:     align-items: center;
 79:     justify-content: center;
 80:     padding: 0.5rem;
 81:     cursor: pointer;
 82:     width: 40px;
 83:     height: 40px;
 84:     background: transparent;
 85:     border: none;
 86:     color: var(--color-text);
 87:     transition: all 0.2s ease;
 88:   }
 89:
 90:   .theme-option:hover {
 91:     background-color: rgba(var(--color-primary-rgb, 45, 121, 132), 0.1);
 92:   }
 93:
 94:   /* Updated selected state for better contrast */
 95:   .theme-option.selected {
 96:     background-color: var(--color-primary);
 97:     color: white; /* Ensure white text on the darker primary color for contrast */
 98:   }
 99:
100:   /* High contrast focus style */
101:   .theme-option:focus-visible {
102:     outline: 3px solid var(--color-primary);
103:     outline-offset: 2px;
104:     z-index: 1;
105:   }
106:
107:   .dark .theme-option:focus-visible {
108:     outline: 3px solid #58cbe0; /* Brighter outline in dark mode */
109:   }
110:
111:   .theme-icon {
112:     transition: transform 0.3s ease;
113:   }
114:
115:   @media (prefers-reduced-motion: reduce) {
116:     .theme-icon {
117:       transition: none;
118:     }
119:
120:     .theme-option,
121:     .theme-toggle {
122:       transition: none;
123:     }
124:   }
125:
126:   .theme-option:hover .theme-icon {
127:     transform: rotate(15deg);
128:   }
129:
130:   @media (prefers-reduced-motion: reduce) {
131:     .theme-option:hover .theme-icon {
132:       transform: none;
133:     }
134:   }
135:
136:   .sr-only {
137:     position: absolute;
138:     width: 1px;
139:     height: 1px;
140:     padding: 0;
141:     margin: -1px;
142:     overflow: hidden;
143:     clip: rect(0, 0, 0, 0);
144:     white-space: nowrap;
145:     border-width: 0;
146:   }
147: </style>
148:
149: <script>
150:   // Initialize as early as possible to prevent FOUC (Flash of Unstyled Content)
151:   (function immediateInit() {
152:     try {
153:       const options = document.querySelectorAll('.theme-option');
154:       if (!options || options.length === 0) return; // Wait for DOM
155:
156:       const currentTheme = getCurrentTheme();
157:       setToggleState(currentTheme);
158:     } catch (error) {
159:       // Silent fail for immediate initialization
160:       // Full initialization will happen in DOMContentLoaded
161:     }
162:   })();
163:
164:   // Type Definitions
165:   /**
166:    * @typedef {'light' | 'dark' | 'system'} ThemeType
167:    */
168:
169:   /**
170:    * Get current theme from localStorage or system preference
171:    * @returns {ThemeType} The current theme
172:    */
173:   function getCurrentTheme() {
174:     try {
175:       if (typeof window === 'undefined') return 'system';
176:       if (window.themeManager && typeof window.themeManager.getTheme === 'function') {
177:         return window.themeManager.getTheme();
178:       }
179:       // Fallback if themeManager is not available
180:       return localStorage.getItem('theme') || 'system';
181:     } catch (error) {
182:       console.warn('Error getting current theme:', error);
183:       return 'system';
184:     }
185:   }
186:
187:   /**
188:    * Get resolved theme (actual theme being applied)
189:    * @returns {'light' | 'dark'} The resolved theme
190:    */
191:   function getResolvedTheme() {
192:     try {
193:       const theme = getCurrentTheme();
194:       if (theme === 'system') {
195:         return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
196:       }
197:       return theme;
198:     } catch (error) {
199:       console.warn('Error getting resolved theme:', error);
200:       return 'light'; // Default fallback
201:     }
202:   }
203:
204:   /**
205:    * Initialize theme toggle state based on the current theme
206:    * @param {ThemeType} theme - The current theme
207:    */
208:   function setToggleState(theme) {
209:     try {
210:       const options = document.querySelectorAll('.theme-option');
211:       options.forEach(option => {
212:         const optionTheme = option.getAttribute('data-theme');
213:         const isSelected = optionTheme === theme;
214:         option.setAttribute('aria-checked', isSelected.toString());
215:         option.classList.toggle('selected', isSelected);
216:       });
217:     } catch (error) {
218:       console.warn('Error setting toggle state:', error);
219:     }
220:   }
221:
222:   /**
223:    * Update theme using themeManager or fallback method
224:    * @param {ThemeType} theme - The theme to set
225:    */
226:   function updateTheme(theme) {
227:     try {
228:       // Use themeManager if available
229:       if (window.themeManager && typeof window.themeManager.setTheme === 'function') {
230:         window.themeManager.setTheme(theme);
231:       } else {
232:         // Fallback if themeManager is not available
233:         localStorage.setItem('theme', theme);
234:
235:         // Apply theme directly (simplified version of what themeManager would do)
236:         if (theme === 'system') {
237:           const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
238:           document.documentElement.classList.toggle('dark', systemTheme === 'dark');
239:           document.documentElement.classList.toggle('dark-theme', systemTheme === 'dark');
240:           document.documentElement.classList.toggle('light-theme', systemTheme === 'light');
241:         } else {
242:           document.documentElement.classList.toggle('dark', theme === 'dark');
243:           document.documentElement.classList.toggle('dark-theme', theme === 'dark');
244:           document.documentElement.classList.toggle('light-theme', theme === 'light');
245:         }
246:       }
247:
248:       // Update toggle state
249:       setToggleState(theme);
250:
251:       // Announce to screen readers
252:       announceThemeChange(theme);
253:     } catch (error) {
254:       console.error('Error updating theme:', error);
255:     }
256:   }
257:
258:   /**
259:    * Announce theme change to screen readers
260:    * @param {ThemeType} theme - The current theme
261:    */
262:   function announceThemeChange(theme) {
263:     try {
264:       const announcement = document.getElementById('theme-announcement');
265:       if (announcement) {
266:         let message = `Theme changed to ${theme}`;
267:         if (theme === 'system') {
268:           const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
269:           message += ` (using ${systemTheme} theme based on system preference)`;
270:         }
271:         announcement.textContent = message;
272:       }
273:     } catch (error) {
274:       console.warn('Error announcing theme change:', error);
275:     }
276:   }
277:
278:   // Initialize theme toggle when the DOM is fully loaded
279:   document.addEventListener('DOMContentLoaded', () => {
280:     try {
281:       const themeToggle = document.querySelector('.theme-toggle');
282:       const options = document.querySelectorAll('.theme-option');
283:
284:       if (!themeToggle || !options || options.length === 0) {
285:         console.warn('Theme toggle elements not found');
286:         return;
287:       }
288:
289:       // Set initial state
290:       const currentTheme = getCurrentTheme();
291:       setToggleState(currentTheme);
292:
293:       // Handle container keyboard navigation
294:       themeToggle.addEventListener('keydown', (e) => {
295:         if (e.key === 'Enter' || e.key === ' ') {
296:           e.preventDefault(); // Prevent scrolling with space
297:
298:           // Find and activate the selected option
299:           const selectedOption = document.querySelector('.theme-option[aria-checked="true"]');
300:           if (selectedOption) {
301:             (selectedOption as HTMLElement).focus();
302:           } else {
303:             // Focus the first option if none is selected
304:             (options[0] as HTMLElement).focus();
305:           }
306:         }
307:       });
308:
309:       // Set up navigation between options
310:       options.forEach((option, index) => {
311:         // Click handler for changing theme
312:         option.addEventListener('click', () => {
313:           const theme = (option as HTMLElement).dataset.theme as ThemeType;
314:           if (theme) {
315:             updateTheme(theme);
316:             (option as HTMLElement).focus(); // Maintain focus on clicked button
317:           }
318:         });
319:
320:         // Keyboard handler for individual options
321:         option.addEventListener('keydown', (e) => {
322:           const key = e.key;
323:
324:           // Space or Enter activates the option
325:           if (key === ' ' || key === 'Enter') {
326:             e.preventDefault();
327:             (option as HTMLElement).click();
328:           }
329:
330:           // Arrow navigation
331:           else if (key === 'ArrowRight' || key === 'ArrowDown') {
332:             e.preventDefault();
333:             const nextIndex = (index + 1) % options.length;
334:             (options[nextIndex] as HTMLElement).focus();
335:           } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
336:             e.preventDefault();
337:             const prevIndex = (index - 1 + options.length) % options.length;
338:             (options[prevIndex] as HTMLElement).focus();
339:           }
340:         });
341:       });
342:
343:       // Listen for theme changes from other sources
344:       window.addEventListener('theme-change', () => {
345:         const newTheme = getCurrentTheme();
346:         setToggleState(newTheme);
347:       });
348:
349:       // Listen for system preference changes
350:       const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
351:       const handleMediaChange = () => {
352:         // If current theme is 'system', update toggle appearance
353:         if (getCurrentTheme() === 'system') {
354:           announceThemeChange('system');
355:         }
356:       };
357:
358:       // Add the listener with proper browser support check
359:       if (darkModeMediaQuery.addEventListener) {
360:         darkModeMediaQuery.addEventListener('change', handleMediaChange);
361:       } else if ((darkModeMediaQuery as any).addListener) {
362:         // For older browsers
363:         (darkModeMediaQuery as any).addListener(handleMediaChange);
364:       }
365:     } catch (error) {
366:       console.error('Error initializing theme toggle:', error);
367:     }
368:   });
369:
370:   // Ensure cleanup for single-page applications
371:   document.addEventListener('beforeunload', () => {
372:     try {
373:       const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
374:       // Remove event listeners
375:       if (darkModeMediaQuery.removeEventListener) {
376:         darkModeMediaQuery.removeEventListener('change', () => {});
377:       } else if ((darkModeMediaQuery as any).removeListener) {
378:         (darkModeMediaQuery as any).removeListener(() => {});
379:       }
380:     } catch (error) {
381:       // Silent fail on cleanup
382:     }
383:   });
384: </script>
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

## File: tailwind.config.js

```javascript
 1: /** @type {import('tailwindcss').Config} */
 2: export default {
 3:   content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
 4:   darkMode: 'class',
 5:   theme: {
 6:     extend: {
 7:       colors: {
 8:         primary: {
 9:           // Base colors
10:           DEFAULT: '#2d7984',     // Base primary color
11:           light: '#58cbe0',       // Light variant
12:           dark: '#1d5058',        // Dark variant
13:
14:           // Hover states
15:           hover: '#266974',       // Base hover state
16:           lightHover: '#4bbbce',  // Light variant hover
17:           darkHover: '#15373e',   // Dark variant hover
18:
19:           // Active states
20:           active: '#1d5058',      // Base active state
21:           lightActive: '#3eafc2', // Light variant active
22:           darkActive: '#102b30',  // Dark variant active
23:
24:           // Focus states
25:           focus: '#2d7984',       // Base focus state
26:           lightFocus: '#58cbe0',  // Light variant focus
27:           darkFocus: '#1d5058',   // Dark variant focus
28:
29:           // Disabled states
30:           disabled: '#a3c5cb',    // Base disabled state
31:           lightDisabled: '#b8e0ea', // Light variant disabled
32:           darkDisabled: '#6a8a8f', // Dark variant disabled
33:
34:           // Text on primary backgrounds
35:           textOnPrimary: '#ffffff',      // Text on base primary
36:           textOnLight: '#1a2234',        // Text on light variant
37:           textOnDark: '#ffffff',         // Text on dark variant
38:         },
39:         secondary: {
40:           DEFAULT: '#0062b3',
41:           light: '#4a94d8',
42:           dark: '#004b8c',
43:         },
44:         accent: {
45:           DEFAULT: '#58cbe0',
46:           warm: '#F8C88F',
47:         },
48:         background: {
49:           DEFAULT: 'var(--color-background, #ffffff)',
50:           form: 'var(--color-form-bg, #F7FAFC)',
51:           input: 'var(--color-input-bg, #EDF2F7)',
52:         },
53:         text: {
54:           DEFAULT: 'var(--color-text, #1a2234)',
55:           muted: 'var(--color-text-muted, #4A5568)',
56:           button: 'var(--color-button-text, #FFFFFF)',
57:           accent: 'var(--color-accent-button-text, #1a2234)',
58:         },
59:         border: {
60:           DEFAULT: 'var(--color-border, #E2E8F0)',
61:         },
62:         complementary: {
63:           DEFAULT: 'var(--color-complementary, #F7FAFC)',
64:         },
65:         error: {
66:           DEFAULT: 'var(--color-error, #e53e3e)',
67:         },
68:       },
69:       backgroundImage: {
70:         'noise': 'linear-gradient(to bottom, rgba(250, 250, 255, 0.05), rgba(250, 250, 255, 0.1)), url("/images/noise.png")',
71:       }
72:     },
73:   },
74:   plugins: [],
75: }
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

## File: src/components/debt-relief/QualificationForm.astro

```
  1: ---
  2: // src/components/debt-relief/QualificationForm.astro
  3: ---
  4:
  5: <div id="qualification-form" class="p-6 sm:p-8 form-container rounded-lg bg-background-form text-text shadow-lg border-2 border-border hover:shadow-xl transition-all">
  6:     <h3 class="mb-6 text-xl font-bold">Quick Debt Relief Check</h3>
  7:
  8:     <form id="qualification-form-element" class="space-y-6">
  9:         <div class="form-control animate-fade-in-delay-1">
 10:             <label for="debt-amount" class="form-label block mb-2 font-medium">How much debt do you have?*</label>
 11:             <select id="debt-amount" name="debtAmount" class="w-full p-3 border border-border rounded-md bg-input-bg shadow-inner focus:ring-2 focus:ring-primary focus:border-primary transition-all" required>
 12:                 <option value="">Select Amount</option>
 13:                 <option value="10000-15000">$10,000 - $15,000</option>
 14:                 <option value="15000-25000">$15,000 - $25,000</option>
 15:                 <option value="25000-50000">$25,000 - $50,000</option>
 16:                 <option value="50000+">$50,000+</option>
 17:             </select>
 18:             <div id="debt-amount-error" class="error-message hidden mt-1"></div>
 19:         </div>
 20:
 21:         <div class="form-control animate-fade-in-delay-2">
 22:             <label for="debt-type" class="form-label block mb-2 font-medium">What type of debt do you have?*</label>
 23:             <select id="debt-type" name="debtType" class="w-full p-3 border border-border rounded-md bg-input-bg shadow-inner focus:ring-2 focus:ring-primary focus:border-primary transition-all" required>
 24:                 <option value="">Select Type</option>
 25:                 <option value="credit-cards">Credit Cards</option>
 26:                 <option value="personal-loans">Personal Loans</option>
 27:                 <option value="medical">Medical Debt</option>
 28:                 <option value="mixed">Mixed Unsecured Debt</option>
 29:             </select>
 30:             <div id="debt-type-error" class="error-message hidden mt-1"></div>
 31:         </div>
 32:
 33:         <div class="form-control animate-fade-in-delay-3">
 34:             <label for="phone" class="form-label block mb-2 font-medium">Phone Number*</label>
 35:             <input
 36:                 type="tel"
 37:                 id="phone"
 38:                 name="phone"
 39:                 class="w-full p-3 border border-border rounded-md bg-input-bg shadow-inner focus:ring-2 focus:ring-primary focus:border-primary transition-all"
 40:                 placeholder="(___) ___-____"
 41:                 pattern="^\(\d{3}\) \d{3}-\d{4}$"
 42:                 required
 43:                 aria-describedby="phone-format"
 44:             />
 45:             <small id="phone-format" class="text-text-muted">Format: (XXX) XXX-XXXX</small>
 46:             <div id="phone-error" class="error-message hidden mt-1"></div>
 47:         </div>
 48:
 49:         <button
 50:             type="submit"
 51:             class="w-full p-4 text-center font-bold btn btn-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all animate-pulse-once"
 52:             aria-label="Submit form to check your savings options"
 53:         >
 54:             Check Your Savings Options
 55:         </button>
 56:     </form>
 57:
 58:     <p class="mt-6 text-xs text-text-muted leading-relaxed">
 59:         By submitting, you authorize DebtFreedom to contact you at the number provided using automated technology.
 60:         Your information is kept secure and confidential.
 61:     </p>
 62: </div>
 63:
 64: <style>
 65:     /* Enhanced focus states for better accessibility */
 66:     select:focus, input:focus {
 67:         outline: none;
 68:         box-shadow: 0 0 0 3px rgba(45, 121, 132, 0.3); /* Updated to match new primary color */
 69:     }
 70:
 71:     /* Dark mode focus states */
 72:     .dark select:focus, .dark input:focus {
 73:         box-shadow: 0 0 0 3px rgba(88, 203, 224, 0.4); /* Brighter in dark mode */
 74:     }
 75:
 76:     /* Error states with high contrast */
 77:     .error-message {
 78:         color: var(--color-error);
 79:         font-size: 0.875rem;
 80:         font-weight: 500;
 81:     }
 82:
 83:     .input-error {
 84:         border-color: var(--color-error) !important;
 85:     }
 86:
 87:     /* Make sure placeholders have enough contrast */
 88:     input::placeholder {
 89:         color: var(--color-placeholder);
 90:         opacity: 1;
 91:     }
 92:
 93:     /* Improve form field appearance on mobile */
 94:     @media (max-width: 640px) {
 95:         select, input {
 96:             font-size: 16px; /* Prevents iOS zoom on focus */
 97:         }
 98:     }
 99: </style>
100:
101: <script>
102: // Client-side validation and form handling
103: document.addEventListener('DOMContentLoaded', () => {
104:     const form = document.getElementById('qualification-form-element');
105:     const phoneInput = document.getElementById('phone');
106:     const debtAmountSelect = document.getElementById('debt-amount');
107:     const debtTypeSelect = document.getElementById('debt-type');
108:
109:     const debtAmountError = document.getElementById('debt-amount-error');
110:     const debtTypeError = document.getElementById('debt-type-error');
111:     const phoneError = document.getElementById('phone-error');
112:
113:     // Function to show error
114:     const showError = (element, errorElement, message) => {
115:         element.classList.add('input-error');
116:         errorElement.textContent = message;
117:         errorElement.classList.remove('hidden');
118:     };
119:
120:     // Function to clear error
121:     const clearError = (element, errorElement) => {
122:         element.classList.remove('input-error');
123:         errorElement.textContent = '';
124:         errorElement.classList.add('hidden');
125:     };
126:
127:     // Basic phone formatting
128:     phoneInput.addEventListener('input', (e) => {
129:         let value = e.target.value.replace(/\D/g, '');
130:         if (value.length > 0) {
131:             if (value.length <= 3) {
132:                 value = `(${value}`;
133:             } else if (value.length <= 6) {
134:                 value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
135:             } else {
136:                 value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
137:             }
138:         }
139:         e.target.value = value;
140:
141:         // Clear error when user types
142:         clearError(phoneInput, phoneError);
143:     });
144:
145:     // Clear errors when user selects an option
146:     debtAmountSelect.addEventListener('change', () => clearError(debtAmountSelect, debtAmountError));
147:     debtTypeSelect.addEventListener('change', () => clearError(debtTypeSelect, debtTypeError));
148:
149:     // Form submission
150:     form.addEventListener('submit', (e) => {
151:         e.preventDefault();
152:         let isValid = true;
153:
154:         // Validate debt amount
155:         if (!debtAmountSelect.value) {
156:             showError(debtAmountSelect, debtAmountError, 'Please select your debt amount');
157:             isValid = false;
158:         }
159:
160:         // Validate debt type
161:         if (!debtTypeSelect.value) {
162:             showError(debtTypeSelect, debtTypeError, 'Please select your debt type');
163:             isValid = false;
164:         }
165:
166:         // Validate phone
167:         if (!phoneInput.value.match(/^\(\d{3}\) \d{3}-\d{4}$/)) {
168:             showError(phoneInput, phoneError, 'Please enter a valid phone number');
169:             isValid = false;
170:         }
171:
172:         if (!isValid) {
173:             return;
174:         }
175:
176:         // Form submission would go here
177:         // This is a placeholder for actual submission logic
178:         alert('Thank you for your submission! A debt relief specialist will contact you shortly.');
179:         form.reset();
180:
181:         // Clear all errors
182:         clearError(debtAmountSelect, debtAmountError);
183:         clearError(debtTypeSelect, debtTypeError);
184:         clearError(phoneInput, phoneError);
185:     });
186: });
187: </script>
```

## File: src/components/debt-relief/TestimonialItem.astro

```
 1: ---
 2: // src/components/debt-relief/TestimonialItem.astro
 3: interface Props {
 4:     quote: string;
 5:     name: string;
 6:     location: string;
 7:     debtDetails: string;
 8: }
 9:
10: const { quote, name, location, debtDetails } = Astro.props;
11: ---
12:
13: <div class="testimonial-card p-6 bg-background-form rounded-lg shadow-lg border border-border hover:shadow-xl transition-all duration-300">
14:     <div class="relative z-10">
15:         <!-- Quote Icon -->
16:         <div class="mb-4">
17:             <span class="testimonial-quote-wrapper">
18:                 <svg
19:                     xmlns="http://www.w3.org/2000/svg"
20:                     viewBox="0 0 24 24"
21:                     fill="currentColor"
22:                     class="testimonial-quote-icon text-primary opacity-40"
23:                     aria-hidden="true"
24:                 >
25:                     <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 00-2.794-5.432l-1.736-.896c.161.405.28.83.357 1.27.114.63.094 1.281-.059 1.905l-.148.705.113.152a6.7 6.7 0 003.071 2.19zm.464-10.7c-.512-.006-.998.1-1.438.299l-.133.066.052.145a6.704 6.704 0 002.573 3.483l.4.332-.214.336a6.707 6.707 0 00-.259 5.182c.16.426.38.825.645 1.189.12.164.24.32.365.474.125.154.29.302.19.199l.712.712c.97-.243 1.927-.672 2.8-1.28.317-.218.63-.456.936-.711l.433-.346.144.429c.122.365.307.697.539.978.36.438.783.794 1.238 1.043l.744.41c.135-.214.257-.44.365-.675a6.706 6.706 0 00.408-4.122l-.187-.793-.159-.075a6.718 6.718 0 00-2.031-.607c.019.307.07.612.148.909.078.297.194.585.341.861l.252.66-.598.265a6.7 6.7 0 01-3.963.445l-1.151-.234.49-1.084c.108-.238.208-.488.3-.749.09-.26.17-.53.237-.812.146-.591.224-1.227.225-1.856a6.73 6.73 0 00-3.35-5.813 6.724 6.724 0 00-2.127-.695zm.2-2.29a6.709 6.709 0 00-3.194 1.814 6.71 6.71 0 00-1.16 7.565c.022-.012.055-.025.09-.043l.879-.472.069-.037a4.893 4.893 0 011.735-.335 4.903 4.903 0 014.898 4.55 4.88 4.88 0 01-.118 1.1 4.91 4.91 0 01-2.385 3.188c.12.007.24.012.36.017a4.886 4.886 0 002.96-.586 4.885 4.885 0 001.019-.813 4.886 4.886 0 002.106-.977 4.89 4.89 0 00.743-4.174 4.887 4.887 0 00-1.77-2.767 4.885 4.885 0 00-2.007-.862a4.899 4.899 0 00-3.812.756 4.883 4.883 0 00-1.68 2.206 4.87 4.87 0 00-.147.447 4.886 4.886 0 00-2.297.021 4.886 4.886 0 00-2.861 2.173 4.888 4.888 0 00-.189-2.567 4.89 4.89 0 001.537-1.308 4.895 4.895 0 00.946-1.929 4.895 4.895 0 00-.2-2.766z" clip-rule="evenodd" />
26:                 </svg>
27:             </span>
28:         </div>
29:
30:         <!-- Testimonial Quote -->
31:         <blockquote class="mb-4 italic text-text text-lg leading-relaxed">{quote}</blockquote>
32:
33:         <!-- Client Information -->
34:         <div class="mt-6 pt-4 border-t border-border">
35:             <div class="font-bold text-primary">- {name}, {location}</div>
36:             <div class="text-sm text-text-muted mt-2">{debtDetails}</div>
37:         </div>
38:     </div>
39: </div>
40:
41: <style>
42:     .testimonial-card {
43:         position: relative;
44:         overflow: hidden;
45:         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
46:         transform: translateZ(0);
47:         will-change: transform, box-shadow;
48:     }
49:
50:     .testimonial-card:hover {
51:         transform: translateY(-2px);
52:         box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
53:     }
54:
55:     blockquote {
56:         position: relative;
57:         text-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
58:     }
59:
60:     /* Use properly scoped selectors without !important */
61:     .testimonial-quote-wrapper {
62:         display: block;
63:         position: relative;
64:         width: 2.5rem;
65:         height: 2.5rem;
66:     }
67:
68:     .testimonial-quote-icon {
69:         width: 2.5rem;
70:         height: 2.5rem;
71:         max-width: 100%;
72:         max-height: 100%;
73:     }
74: </style>
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
 17: <html lang="en">
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
 32:         <!-- Theme detection script - executed before page renders -->
 33:         <script is:inline>
 34:             (function() {
 35:                 // Check for saved theme preference in localStorage
 36:                 const savedTheme = localStorage.getItem('theme');
 37:
 38:                 // Function to get system color scheme preference
 39:                 function getSystemPreference() {
 40:                     return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
 41:                 }
 42:
 43:                 // Apply the theme
 44:                 function applyTheme(theme) {
 45:                     // If theme is 'system', get the system preference
 46:                     if (theme === 'system') {
 47:                         theme = getSystemPreference();
 48:                     }
 49:
 50:                     // Apply the appropriate theme class to the document
 51:                     if (theme === 'dark') {
 52:                         document.documentElement.classList.add('dark-theme');
 53:                         document.documentElement.classList.add('dark');
 54:                         document.documentElement.classList.remove('light-theme');
 55:                         document.documentElement.setAttribute('data-theme', 'dark');
 56:                     } else {
 57:                         document.documentElement.classList.add('light-theme');
 58:                         document.documentElement.classList.remove('dark-theme');
 59:                         document.documentElement.classList.remove('dark');
 60:                         document.documentElement.setAttribute('data-theme', 'light');
 61:                     }
 62:                 }
 63:
 64:                 // Determine which theme to use
 65:                 let themeToApply;
 66:
 67:                 if (savedTheme) {
 68:                     // Use saved preference if available
 69:                     themeToApply = savedTheme;
 70:                 } else {
 71:                     // Otherwise, use system preference and save it
 72:                     themeToApply = 'system';
 73:                     localStorage.setItem('theme', 'system');
 74:                 }
 75:
 76:                 // Apply the theme immediately to prevent flash
 77:                 applyTheme(themeToApply);
 78:
 79:                 // Set up listener for system preference changes
 80:                 window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
 81:                     if (localStorage.getItem('theme') === 'system') {
 82:                         applyTheme('system');
 83:                     }
 84:                 });
 85:
 86:                 // Make these functions available globally
 87:                 window.themeManager = {
 88:                     getTheme: function() {
 89:                         return localStorage.getItem('theme') || 'system';
 90:                     },
 91:                     setTheme: function(theme) {
 92:                         localStorage.setItem('theme', theme);
 93:                         applyTheme(theme);
 94:
 95:                         // Dispatch an event for cross-tab synchronization
 96:                         window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme }}));
 97:                     }
 98:                 };
 99:
100:                 // Listen for storage changes for cross-tab sync
101:                 window.addEventListener('storage', (e) => {
102:                     if (e.key === 'theme') {
103:                         applyTheme(e.newValue);
104:                     }
105:                 });
106:             })();
107:         </script>
108:     </head>
109:     <body class="antialiased text-gray-900 bg-white">
110:         <div class="flex flex-col min-h-screen px-4 bg-noise sm:px-8 md:px-12 relative">
111:             <!-- Background Pattern -->
112:             <div class="absolute inset-0 overflow-hidden pointer-events-none">
113:                 <div class="fixed inset-0 z-0">
114:                     <div class="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[#2d7984]/5 to-transparent"></div>
115:                     <div class="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-[#2d7984]/5 to-transparent"></div>
116:                 </div>
117:             </div>
118:
119:             <div class="flex flex-col w-full max-w-5xl mx-auto grow py-4 sm:py-6 md:py-8 relative z-10">
120:                 <LandingHeader />
121:                 <main class="grow"><slot /></main>
122:                 <Footer />
123:             </div>
124:         </div>
125:     </body>
126: </html>
127:
128: <style>
129:     .bg-noise {
130:         background-image: linear-gradient(to bottom, rgba(250, 250, 255, 0.05), rgba(250, 250, 255, 0.1)), url('/images/noise.png');
131:         background-attachment: fixed;
132:         position: relative;
133:         z-index: 0;
134:     }
135:
136:     /* Add texture overlay for better visual effect */
137:     .bg-noise::before {
138:         content: "";
139:         position: absolute;
140:         top: 0;
141:         left: 0;
142:         width: 100%;
143:         height: 100%;
144:         background-image: url('/images/noise.png');
145:         opacity: 0.03;
146:         z-index: -1;
147:         pointer-events: none;
148:     }
149:
150:     /* Improve font rendering */
151:     body {
152:         text-rendering: optimizeLegibility;
153:         -webkit-font-smoothing: antialiased;
154:         -moz-osx-font-smoothing: grayscale;
155:     }
156:
157:     /* Smooth scrolling for better UX */
158:     html {
159:         scroll-behavior: smooth;
160:     }
161:
162:     /* Ensure proper page height on mobile */
163:     @media (max-width: 640px) {
164:         html, body {
165:             min-height: 100%;
166:             height: -webkit-fill-available;
167:         }
168:     }
169:
170:     /* Ensure proper spacing on various device sizes */
171:     @media (min-width: 1280px) {
172:         .max-w-5xl {
173:             max-width: 64rem;
174:         }
175:     }
176:
177:     /* Prevent content from being too wide on extra large screens */
178:     @media (min-width: 1536px) {
179:         body {
180:             font-size: 1.05rem;
181:         }
182:     }
183:
184:     /* Handle iOS-specific issues */
185:     @supports (-webkit-touch-callout: none) {
186:         .min-h-screen {
187:             min-height: -webkit-fill-available;
188:         }
189:     }
190: </style>
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
 22:         <meta name="description" content="Break free from credit card debt and save up to 50%. Our professional debt settlement program helps you reduce what you owe and become debt-free faster with no upfront fees." />
 23:         <meta name="keywords" content="debt relief, credit card debt, debt settlement, debt reduction, financial freedom, debt help" />
 24:         <meta name="robots" content="index, follow" />
 25:         <meta name="author" content="Debt Freedom Toolkit" />
 26:         <meta name="generator" content={Astro.generator} />
 27:
 28:         <!-- Open Graph / Social Media Meta Tags -->
 29:         <meta property="og:type" content="website" />
 30:         <meta property="og:title" content={title} />
 31:         <meta property="og:description" content="Break free from credit card debt and save up to 50%. Reduce your debt and become financially free." />
 32:         <meta property="og:image" content="/images/debtfreedomtoolkitlogo.png" />
 33:         <meta property="og:url" content="https://debtfreedomtoolkit.com" />
 34:         <meta property="og:site_name" content="Debt Freedom Toolkit" />
 35:
 36:         <!-- Twitter Meta Tags -->
 37:         <meta name="twitter:card" content="summary_large_image" />
 38:         <meta name="twitter:title" content={title} />
 39:         <meta name="twitter:description" content="Break free from credit card debt and save up to 50%. Reduce your debt and become financially free." />
 40:         <meta name="twitter:image" content="/images/debtfreedomtoolkitlogo.png" />
 41:
 42:         <!-- Favicon -->
 43:         <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
 44:         <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
 45:         <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
 46:         <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
 47:         <link rel="manifest" href="/site.webmanifest" />
 48:         <meta name="theme-color" content="#2d7984" />
 49:
 50:         <!-- Preload critical resources -->
 51:         <link rel="preload" as="font" type="font/woff2" href={interWoff2} crossorigin />
 52:         <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
 53:
 54:         <!-- Theme detection script - executed before page renders -->
 55:         <script is:inline>
 56:             (function() {
 57:                 // Check for saved theme preference in localStorage
 58:                 const savedTheme = localStorage.getItem('theme');
 59:
 60:                 // Function to get system color scheme preference
 61:                 function getSystemPreference() {
 62:                     return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
 63:                 }
 64:
 65:                 // Apply the theme
 66:                 function applyTheme(theme) {
 67:                     // If theme is 'system', get the system preference
 68:                     if (theme === 'system') {
 69:                         theme = getSystemPreference();
 70:                     }
 71:
 72:                     // Apply the appropriate theme class to the document
 73:                     if (theme === 'dark') {
 74:                         document.documentElement.classList.add('dark-theme');
 75:                         document.documentElement.classList.add('dark');
 76:                         document.documentElement.classList.remove('light-theme');
 77:                         document.documentElement.setAttribute('data-theme', 'dark');
 78:                     } else {
 79:                         document.documentElement.classList.add('light-theme');
 80:                         document.documentElement.classList.remove('dark-theme');
 81:                         document.documentElement.classList.remove('dark');
 82:                         document.documentElement.setAttribute('data-theme', 'light');
 83:                     }
 84:                 }
 85:
 86:                 // Determine which theme to use
 87:                 let themeToApply;
 88:
 89:                 if (savedTheme) {
 90:                     // Use saved preference if available
 91:                     themeToApply = savedTheme;
 92:                 } else {
 93:                     // Otherwise, use system preference and save it
 94:                     themeToApply = 'system';
 95:                     localStorage.setItem('theme', 'system');
 96:                 }
 97:
 98:                 // Apply the theme immediately to prevent flash
 99:                 applyTheme(themeToApply);
100:
101:                 // Set up listener for system preference changes
102:                 window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
103:                     if (localStorage.getItem('theme') === 'system') {
104:                         applyTheme('system');
105:                     }
106:                 });
107:
108:                 // Make these functions available globally
109:                 window.themeManager = {
110:                     getTheme: function() {
111:                         return localStorage.getItem('theme') || 'system';
112:                     },
113:                     setTheme: function(theme) {
114:                         localStorage.setItem('theme', theme);
115:                         applyTheme(theme);
116:
117:                         // Dispatch an event for cross-tab synchronization
118:                         window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme }}));
119:                     }
120:                 };
121:
122:                 // Listen for storage changes for cross-tab sync
123:                 window.addEventListener('storage', (e) => {
124:                     if (e.key === 'theme') {
125:                         applyTheme(e.newValue);
126:                     }
127:                 });
128:             })();
129:         </script>
130:     </head>
131:     <body class="antialiased text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
132:         <!-- Import Background Pattern Component -->
133:         <div class="flex flex-col min-h-screen px-6 sm:px-12 relative bg-white dark:bg-gray-900 transition-colors duration-300">
134:             <!-- Background Pattern -->
135:             <div class="absolute inset-0 overflow-hidden pointer-events-none">
136:                 <div class="fixed inset-0 z-0">
137:                     <!-- Light mode gradients (hidden in dark mode) -->
138:                     <div class="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[#2d7984]/5 to-transparent dark:hidden"></div>
139:                     <div class="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-[#2d7984]/5 to-transparent dark:hidden"></div>
140:
141:                     <!-- Dark mode gradients (hidden in light mode) -->
142:                     <div class="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[#58cbe0]/10 to-transparent hidden dark:block"></div>
143:                     <div class="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-[#58cbe0]/10 to-transparent hidden dark:block"></div>
144:
145:                     <!-- Noise texture overlay -->
146:                     <div class="absolute inset-0 opacity-20 dark:opacity-30 bg-noise"></div>
147:                 </div>
148:             </div>
149:
150:             <div class="flex flex-col w-full max-w-6xl mx-auto grow relative z-10">
151:                 <Header />
152:                 <main class="grow"><slot /></main>
153:                 <Footer />
154:             </div>
155:         </div>
156:
157:         <!-- Back to Top Button -->
158:         <button id="back-to-top" class="fixed bottom-8 right-8 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 translate-y-20 opacity-0 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800 z-50" aria-label="Back to top">
159:             <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
160:                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
161:             </svg>
162:         </button>
163:
164:         <!-- Loading Indicator -->
165:         <div id="page-loader" class="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-[100] transition-opacity duration-500">
166:             <div class="relative">
167:                 <div class="w-16 h-16 border-4 border-[#2d7984]/30 border-t-[#2d7984] rounded-full animate-spin"></div>
168:                 <div class="mt-4 text-center text-gray-600 dark:text-gray-300">Loading...</div>
169:             </div>
170:         </div>
171:     </body>
172: </html>
173:
174: <style>
175:     .bg-noise {
176:         background-image: var(--background-image-noise);
177:     }
178:
179:     /* Use CSS variables defined in globals.css for theme-specific noise pattern */
180:     :root {
181:         --background-image-noise: linear-gradient(to bottom, rgba(250, 250, 255, 0.05), rgba(250, 250, 255, 0.1)), url('/images/noise.png');
182:     }
183:
184:     .dark {
185:         --background-image-noise: linear-gradient(to bottom, rgba(10, 15, 25, 0.1), rgba(10, 15, 25, 0.2)), url('/images/noise.png');
186:     }
187: </style>
188:
189: <script>
190:     // Page loader functionality
191:     const pageLoader = document.getElementById('page-loader');
192:
193:     // Hide loader once page is fully loaded
194:     window.addEventListener('load', () => {
195:         if (pageLoader) {
196:             // Add fade out transition
197:             pageLoader.style.opacity = '0';
198:
199:             // Remove from DOM after transition completes
200:             setTimeout(() => {
201:                 pageLoader.style.display = 'none';
202:             }, 500);
203:         }
204:     });
205:
206:     // Back to top button functionality
207:     document.addEventListener('DOMContentLoaded', () => {
208:         const backToTopButton = document.getElementById('back-to-top');
209:
210:         if (backToTopButton) {
211:             // Function to toggle button visibility
212:             const toggleBackToTopButton = () => {
213:                 if (window.scrollY > 300) {
214:                     backToTopButton.classList.remove('translate-y-20', 'opacity-0');
215:                     backToTopButton.classList.add('translate-y-0', 'opacity-100');
216:                 } else {
217:                     backToTopButton.classList.add('translate-y-20', 'opacity-0');
218:                     backToTopButton.classList.remove('translate-y-0', 'opacity-100');
219:                 }
220:             };
221:
222:             // Initial check
223:             toggleBackToTopButton();
224:
225:             // Add scroll event listener
226:             window.addEventListener('scroll', toggleBackToTopButton);
227:
228:             // Add click event to scroll to top
229:             backToTopButton.addEventListener('click', () => {
230:                 window.scrollTo({
231:                     top: 0,
232:                     behavior: 'smooth'
233:                 });
234:             });
235:         }
236:
237:         // Add smooth scroll behavior to all anchor links
238:         document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
239:             anchor.addEventListener('click', function(e) {
240:                 e.preventDefault();
241:
242:                 const targetId = this.getAttribute('href');
243:                 const targetElement = document.querySelector(targetId);
244:
245:                 if (targetElement) {
246:                     // Account for fixed header height
247:                     const headerHeight = document.querySelector('header')?.offsetHeight || 0;
248:                     const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
249:
250:                     window.scrollTo({
251:                         top: targetPosition,
252:                         behavior: 'smooth'
253:                     });
254:                 }
255:             });
256:         });
257:
258:         // Add animation on scroll
259:         const animateOnScroll = () => {
260:             const elements = document.querySelectorAll('.animate-on-scroll');
261:
262:             elements.forEach(element => {
263:                 const elementTop = element.getBoundingClientRect().top;
264:                 const windowHeight = window.innerHeight;
265:
266:                 if (elementTop < windowHeight * 0.9) {
267:                     // Trigger the animation based on the class
268:                     if (element.classList.contains('fade-in-up')) {
269:                         element.style.opacity = '1';
270:                         element.style.transform = 'translateY(0)';
271:                     } else if (element.classList.contains('fade-in')) {
272:                         element.style.opacity = '1';
273:                     }
274:                 }
275:             });
276:         };
277:
278:         // Run once on load
279:         animateOnScroll();
280:
281:         // Add scroll listener
282:         window.addEventListener('scroll', animateOnScroll);
283:     });
284: </script>
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
 15: // import ComparisonTable from '../components/debt-relief/ComparisonTable.astro';
 16: import FAQSection from '../components/debt-relief/FAQSection.astro';
 17: import Disclosures from '../components/debt-relief/Disclosures.astro';
 18: import FinalCTA from '../components/debt-relief/FinalCTA.astro';
 19: import TrustIndicators from '../components/TrustIndicators.astro';
 20: ---
 21:
 22: <LandingLayout title={pageTitle}>
 23:     <!-- Hero Section -->
 24:     <div class="py-16 sm:py-20 md:py-24">
 25:         <DebtReliefHero
 26:             title="Break Free From Credit Card Debt - Save Up To 50%"
 27:             subtitle="Reduce Your Debt By Thousands | Become Debt-Free in 12-36 Months"
 28:             description="Are you struggling with $15,000+ in credit card debt? Our professional debt settlement program can help you reduce what you owe and become debt-free faster than making minimum payments."
 29:             primaryCta={{
 30:                 text: "Get Your Free Consultation Now",
 31:                 url: "#qualification-form"
 32:             }}
 33:             phoneNumber="(800) 555-1234"
 34:             availability="Available 9:00am - 8:00pm EST, 7 days a week"
 35:         />
 36:     </div>
 37:
 38:     <!-- Trust Indicators -->
 39:     <div class="pb-16 border-b border-border">
 40:         <TrustIndicators />
 41:     </div>
 42:
 43:     <!-- Qualification Form Section -->
 44:     <section id="qualification-form" class="py-16 sm:py-20">
 45:         <h2 class="mb-10 text-center">You Could Save Thousands - See If You Qualify in 30 Seconds</h2>
 46:         <div class="max-w-lg mx-auto">
 47:             <QualificationForm />
 48:         </div>
 49:     </section>
 50:
 51:     <!-- Benefits Section -->
 52:     <section class="py-16 sm:py-20 bg-background-form/30 border-y border-border">
 53:         <div class="max-w-5xl mx-auto">
 54:             <h2 class="mb-12 text-center">Why Choose Our Debt Settlement Program?</h2>
 55:             <Benefits />
 56:         </div>
 57:     </section>
 58:
 59:     <!-- Process Steps Section -->
 60:     <section class="py-16 sm:py-20">
 61:         <div class="max-w-5xl mx-auto">
 62:             <h2 class="mb-12 text-center">How It Works - 3 Simple Steps</h2>
 63:             <ProcessSteps />
 64:         </div>
 65:     </section>
 66:
 67:     <!-- Testimonials Section -->
 68:     <section class="py-16 sm:py-20 bg-background-form/30 border-y border-border" id="testimonials-section">
 69:         <div class="max-w-5xl mx-auto">
 70:             <h2 class="mb-12 text-center">Client Success Stories</h2>
 71:             <Testimonials />
 72:         </div>
 73:     </section>
 74:
 75:     <!-- Comparison Table Section -->
 76:     <section class="py-16 sm:py-20">
 77:         <div class="max-w-5xl mx-auto">
 78:             <h2 class="mb-12 text-center">Compare Your Options</h2>
 79:             <!-- Comparison table will be implemented in a separate component -->
 80:             <div class="p-8 text-center bg-background-form rounded-lg shadow-md border border-border">
 81:                 <p class="text-text-muted">Comparison table implementation coming soon...</p>
 82:             </div>
 83:         </div>
 84:     </section>
 85:
 86:     <!-- FAQ Section -->
 87:     <section class="py-16 sm:py-20 bg-background-form/30 border-y border-border">
 88:         <div class="max-w-3xl mx-auto">
 89:             <h2 class="mb-12 text-center">Frequently Asked Questions</h2>
 90:             <FAQSection />
 91:         </div>
 92:     </section>
 93:
 94:     <!-- Disclosures Section -->
 95:     <section class="py-16">
 96:         <div class="max-w-4xl mx-auto">
 97:             <h2 class="mb-8 text-center">Important Program Disclosures</h2>
 98:             <Disclosures />
 99:         </div>
100:     </section>
101:
102:     <!-- Final CTA Section -->
103:     <section class="py-16 sm:py-20">
104:         <div class="max-w-2xl mx-auto">
105:             <FinalCTA />
106:         </div>
107:     </section>
108: </LandingLayout>
109:
110: <style>
111:     /* Keep only the basic styling needed for this page */
112:     h2 {
113:         position: relative;
114:     }
115:
116:     h2::after {
117:         content: "";
118:         position: absolute;
119:         bottom: -0.75rem;
120:         left: 50%;
121:         transform: translateX(-50%);
122:         width: 100px;
123:         height: 3px;
124:         background-color: var(--color-primary);
125:         border-radius: 3px;
126:     }
127:
128:     @media (min-width: 768px) {
129:         section {
130:             scroll-margin-top: 80px;
131:         }
132:     }
133: </style>
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
12:     <div class="brand-header flex items-center justify-center mb-8 animate-fade-in">
13:         <a href="/" class="text-center inline-block">
14:             <span class="text-primary font-bold text-2xl">Debt Freedom Toolkit</span>
15:         </a>
16:     </div>
17:
18:     <EnhancedHero />
19:     <TrustIndicators />
20:     <BenefitsSection />
21:     <TestimonialsSection />
22:     <DebtReliefForm />
23:     <CTASection />
24: </Layout>
```

## File: src/styles/globals.css

```css
  1: @tailwind base;
  2: @tailwind components;
  3: @tailwind utilities;
  4:
  5: /* Base theme variables */
  6: :root {
  7:     --font-sans: 'Inter Variable', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  8:
  9:     /* Brand colors (consistent across themes) */
 10:     --color-primary: #2d7984; /* Darkened from #42a5b2 for better contrast */
 11:     --color-primary-rgb: 45, 121, 132; /* Updated to match new hex value */
 12:     --color-primary-light: #58cbe0; /* Lighter shade for accents and highlights */
 13:     --color-primary-dark: #1d5058; /* Darker shade for hover states */
 14:
 15:     --color-secondary: #0062b3; /* Darkened from #2980b9 for better contrast */
 16:     --color-secondary-rgb: 0, 98, 179; /* Updated to match new hex value */
 17:     --color-secondary-light: #4a94d8; /* Lighter shade for accents and highlights */
 18:     --color-secondary-dark: #004b8c; /* Darker shade for hover states */
 19:
 20:     --color-accent: #58cbe0; /* Light teal from logo */
 21:     --color-accent-rgb: 88, 203, 224; /* Added RGB value */
 22:     --color-warm-accent: #F8C88F; /* Warm peach-orange */
 23:     --color-warm-accent-rgb: 248, 200, 143; /* Added RGB value */
 24:
 25:     /* Extended palette for richer UI */
 26:     --color-success: #10b981; /* Green */
 27:     --color-success-rgb: 16, 185, 129;
 28:     --color-warning: #f59e0b; /* Amber */
 29:     --color-warning-rgb: 245, 158, 11;
 30:     --color-info: #3b82f6; /* Blue */
 31:     --color-info-rgb: 59, 130, 246;
 32:
 33:     /* Theme transition variables */
 34:     --theme-transition-duration: 250ms;
 35:     --theme-transition-easing: ease;
 36:     --theme-transition-properties: color, background-color, border-color, box-shadow, outline-color, fill, stroke, opacity, transform;
 37: }
 38:
 39: /* Dark theme (default) */
 40: .dark-theme, .dark, :root[data-theme="dark"] {
 41:     /* Background colors */
 42:     --color-background: #1a2234; /* Dark blue background */
 43:     --color-background-rgb: 26, 34, 52;
 44:     --color-form-bg: #202b3d; /* Darker blue for form backgrounds */
 45:     --color-form-bg-rgb: 32, 43, 61;
 46:     --color-input-bg: #151d2c; /* Even darker for inputs */
 47:     --color-input-bg-rgb: 21, 29, 44;
 48:
 49:     /* Text colors */
 50:     --color-text: #FFFFFF; /* White text for dark backgrounds */
 51:     --color-text-rgb: 255, 255, 255;
 52:     --color-text-muted: #b0c0d0; /* Lightened from #A0AEC0 for better contrast */
 53:     --color-text-muted-rgb: 176, 192, 208; /* Updated to match hex */
 54:
 55:     /* Button colors */
 56:     --color-button-text: #FFFFFF; /* White text for buttons */
 57:     --color-button-text-rgb: 255, 255, 255;
 58:     --color-accent-button-text: #1a2234; /* Dark text for accent buttons */
 59:     --color-accent-button-text-rgb: 26, 34, 52;
 60:
 61:     /* Form element colors */
 62:     --color-placeholder: #8896ac; /* Lighter gray for placeholders in dark mode */
 63:     --color-placeholder-rgb: 136, 150, 172; /* Added RGB value */
 64:
 65:     /* Border colors */
 66:     --color-border: #2D3748; /* Dark border color */
 67:     --color-border-rgb: 45, 55, 72;
 68:
 69:     /* Complementary color */
 70:     --color-complementary: #1a2234;
 71:     --color-complementary-rgb: 26, 34, 52;
 72:
 73:     /* Error colors */
 74:     --color-error: #fc8181; /* Light red with good contrast on dark */
 75:     --color-error-rgb: 252, 129, 129;
 76:
 77:     /* Shadow colors for depth */
 78:     --shadow-color: rgba(0, 0, 0, 0.5);
 79:     --shadow-color-light: rgba(0, 0, 0, 0.25);
 80:
 81:     /* Background image */
 82:     --background-image-noise: linear-gradient(
 83:             to bottom,
 84:             rgba(10, 15, 25, 0.1),
 85:             rgba(10, 15, 25, 0.2)
 86:         ),
 87:         url('/images/noise.png');
 88: }
 89:
 90: /* Light theme */
 91: .light-theme, :root[data-theme="light"] {
 92:     /* Background colors */
 93:     --color-background: #FFFFFF; /* White background */
 94:     --color-background-rgb: 255, 255, 255;
 95:     --color-form-bg: #F7FAFC; /* Light gray for form backgrounds */
 96:     --color-form-bg-rgb: 247, 250, 252;
 97:     --color-input-bg: #EDF2F7; /* Slightly darker for inputs */
 98:     --color-input-bg-rgb: 237, 242, 247;
 99:
100:     /* Text colors */
101:     --color-text: #1a2234; /* Dark text for light backgrounds */
102:     --color-text-rgb: 26, 34, 52;
103:     --color-text-muted: #4A5568; /* Muted text color */
104:     --color-text-muted-rgb: 74, 85, 104;
105:
106:     /* Button colors */
107:     --color-button-text: #FFFFFF; /* White text for buttons */
108:     --color-button-text-rgb: 255, 255, 255;
109:     --color-accent-button-text: #1a2234; /* Dark text for accent buttons */
110:     --color-accent-button-text-rgb: 26, 34, 52;
111:
112:     /* Form element colors */
113:     --color-placeholder: #718096; /* Mid-gray for placeholders in light mode */
114:     --color-placeholder-rgb: 113, 128, 150; /* Added RGB value */
115:
116:     /* Border colors */
117:     --color-border: #E2E8F0; /* Light border color */
118:     --color-border-rgb: 226, 232, 240;
119:
120:     /* Complementary color */
121:     --color-complementary: #F7FAFC;
122:     --color-complementary-rgb: 247, 250, 252;
123:
124:     /* Error colors */
125:     --color-error: #e53e3e; /* Red with good contrast on white */
126:     --color-error-rgb: 229, 62, 62;
127:
128:     /* Shadow colors for depth */
129:     --shadow-color: rgba(0, 0, 0, 0.1);
130:     --shadow-color-light: rgba(0, 0, 0, 0.05);
131:
132:     /* Background image */
133:     --background-image-noise: linear-gradient(
134:             to bottom,
135:             rgba(250, 250, 255, 0.05),
136:             rgba(250, 250, 255, 0.1)
137:         ),
138:         url('/images/noise.png');
139: }
140:
141: /* Support for reduced motion preference */
142: @media (prefers-reduced-motion: reduce) {
143:     :root {
144:         --theme-transition-duration: 0ms;
145:     }
146: }
147:
148: /* Custom media query variables */
149: @custom-media --viewport-xs (max-width: 480px);
150: @custom-media --viewport-sm (min-width: 640px);
151: @custom-media --viewport-md (min-width: 768px);
152: @custom-media --viewport-lg (min-width: 1024px);
153: @custom-media --viewport-xl (min-width: 1280px);
154: @custom-media --viewport-2xl (min-width: 1536px);
155: @custom-media --prefers-reduced-motion (prefers-reduced-motion: reduce);
156: @custom-media --dark-mode (prefers-color-scheme: dark);
157: @custom-media --light-mode (prefers-color-scheme: light);
158:
159: @layer base {
160:     html {
161:         /* Apply theme transitions */
162:         transition:
163:             var(--theme-transition-properties)
164:             var(--theme-transition-duration)
165:             var(--theme-transition-easing);
166:     }
167:
168:     body {
169:         color: var(--color-text);
170:         background-color: var(--color-background);
171:         /* Apply theme transitions */
172:         transition:
173:             var(--theme-transition-properties)
174:             var(--theme-transition-duration)
175:             var(--theme-transition-easing);
176:     }
177:
178:     /* Apply theme transitions to headings */
179:     h1, h2, h3, h4, h5, h6 {
180:         transition:
181:             var(--theme-transition-properties)
182:             var(--theme-transition-duration)
183:             var(--theme-transition-easing);
184:     }
185:
186:     h1 {
187:         font-size: 2.25rem;
188:         line-height: 1.2;
189:         font-weight: 800;
190:         letter-spacing: -0.025em;
191:         color: var(--color-text);
192:         margin-bottom: 1rem;
193:         text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
194:     }
195:
196:     @media (min-width: 640px) {
197:         h1 {
198:             font-size: 3rem;
199:             line-height: 1.1;
200:         }
201:     }
202:
203:     h2 {
204:         font-size: 1.5rem;
205:         line-height: 1.3;
206:         font-weight: 700;
207:         color: var(--color-text);
208:         margin-bottom: 0.75rem;
209:     }
210:
211:     @media (min-width: 640px) {
212:         h2 {
213:             font-size: 1.875rem;
214:             line-height: 1.2;
215:         }
216:     }
217:
218:     h3 {
219:         font-size: 1.25rem;
220:         line-height: 1.4;
221:         font-weight: 600;
222:         color: var(--color-text);
223:         margin-bottom: 0.5rem;
224:     }
225:
226:     h4 {
227:         font-size: 1.125rem;
228:         line-height: 1.5;
229:         font-weight: 600;
230:         color: var(--color-text);
231:         margin-bottom: 0.5rem;
232:     }
233:
234:     p {
235:         line-height: 1.6;
236:         margin-bottom: 1rem;
237:         transition:
238:             var(--theme-transition-properties)
239:             var(--theme-transition-duration)
240:             var(--theme-transition-easing);
241:     }
242:
243:     a:not(.btn) {
244:         text-decoration: underline;
245:         color: var(--color-secondary);
246:         transition:
247:             var(--theme-transition-properties)
248:             var(--theme-transition-duration)
249:             var(--theme-transition-easing);
250:     }
251:
252:     /* Dark mode links with better contrast */
253:     .dark a:not(.btn) {
254:         color: #58cbe0; /* Brighter in dark mode for better contrast */
255:     }
256:
257:     a:not(.btn):hover {
258:         opacity: 0.85;
259:         text-decoration-thickness: 2px; /* Make underline thicker on hover for better visibility */
260:     }
261:
262:     /* Improved focus visible styles for better accessibility */
263:     a:focus-visible,
264:     button:focus-visible,
265:     input:focus-visible,
266:     select:focus-visible,
267:     textarea:focus-visible {
268:         outline: 3px solid var(--color-primary);
269:         outline-offset: 2px;
270:         transition: outline-color var(--theme-transition-duration) var(--theme-transition-easing);
271:     }
272:
273:     /* Enhanced dark mode focus */
274:     .dark a:focus-visible,
275:     .dark button:focus-visible,
276:     .dark input:focus-visible,
277:     .dark select:focus-visible,
278:     .dark textarea:focus-visible {
279:         outline: 3px solid #58cbe0; /* Brighter outline in dark mode */
280:     }
281:
282:     pre {
283:         padding: 1.5rem;
284:         overflow-x: auto;
285:         border-radius: 0.5rem;
286:         background-color: var(--color-form-bg);
287:         transition:
288:             var(--theme-transition-properties)
289:             var(--theme-transition-duration)
290:             var(--theme-transition-easing);
291:     }
292:
293:     :not(pre) > code {
294:         padding-left: 0.25rem;
295:         padding-right: 0.25rem;
296:         padding-top: 0.125rem;
297:         padding-bottom: 0.125rem;
298:         font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
299:         border-radius: 0.25rem;
300:         background-color: var(--color-form-bg);
301:         color: #0062b3; /* Darker blue in light mode for better contrast */
302:         font-size: 0.9em;
303:         transition:
304:             var(--theme-transition-properties)
305:             var(--theme-transition-duration)
306:             var(--theme-transition-easing);
307:     }
308:
309:     /* Adjusted dark mode code color */
310:     .dark :not(pre) > code {
311:         color: #58cbe0; /* Brighter in dark mode for better contrast */
312:     }
313:
314:     input, select, textarea {
315:         background-color: var(--color-input-bg);
316:         color: var(--color-text);
317:         border: 1px solid var(--color-border);
318:         transition:
319:             var(--theme-transition-properties)
320:             var(--theme-transition-duration)
321:             var(--theme-transition-easing);
322:     }
323:
324:     /* Placeholder styling with proper contrast */
325:     ::placeholder {
326:         color: var(--color-placeholder);
327:         opacity: 1; /* Override Firefox default opacity */
328:     }
329:
330:     /* Specific styles for inputs and selects to ensure contrast */
331:     input, select, textarea {
332:         color: var(--color-text); /* Ensure text has proper contrast */
333:     }
334:
335:     /* High contrast focus states for form elements */
336:     input:focus, select:focus, textarea:focus {
337:         border-color: var(--color-primary);
338:         box-shadow: 0 0 0 1px var(--color-primary);
339:     }
340:
341:     /* Disabled state styling with improved contrast */
342:     input:disabled,
343:     select:disabled,
344:     textarea:disabled {
345:         background-color: #e2e8f0; /* Light gray bg */
346:         color: #4a5568; /* Darker text for contrast */
347:         border-color: #cbd5e0;
348:         cursor: not-allowed;
349:     }
350:
351:     .dark input:disabled,
352:     .dark select:disabled,
353:     .dark textarea:disabled {
354:         background-color: #2d3748; /* Dark gray bg */
355:         color: #a0aec0; /* Light enough text for contrast */
356:         border-color: #4a5568;
357:         cursor: not-allowed;
358:     }
359:
360:     /* Apply transitions to SVG elements */
361:     svg {
362:         transition:
363:             fill var(--theme-transition-duration) var(--theme-transition-easing),
364:             stroke var(--theme-transition-duration) var(--theme-transition-easing);
365:     }
366:
367:     /* Ensure SVGs have sufficient contrast */
368:     svg.icon {
369:         color: currentColor; /* Inherit text color for proper contrast */
370:     }
371:
372:     /* Special handling for theme-aware images that change between themes */
373:     .theme-aware-image {
374:         transition: opacity var(--theme-transition-duration) var(--theme-transition-easing);
375:     }
376:
377:     /* Error message styling */
378:     .error-message {
379:         color: var(--color-error);
380:         font-size: 0.875rem;
381:         margin-top: 0.25rem;
382:         font-weight: 500; /* Slightly bolder for better visibility */
383:     }
384:
385:     .error-border {
386:         border-color: var(--color-error) !important;
387:     }
388: }
389:
390: @layer components {
391:     /* Markdown content styling */
392:     .markdown > * {
393:         margin-top: 1.5rem;
394:         margin-bottom: 1.5rem;
395:     }
396:
397:     .markdown :where(h1, h2) {
398:         margin-top: 3rem;
399:         margin-bottom: 1.5rem;
400:     }
401:
402:     .markdown > :first-child {
403:         margin-top: 0;
404:     }
405:
406:     .markdown > :last-child {
407:         margin-bottom: 0;
408:     }
409:
410:     /* Animation utilities - Enhanced with more options */
411:     .animate-fade-in {
412:         animation: fadeIn 0.5s ease-in-out;
413:     }
414:
415:     .animate-slide-up {
416:         animation: slideUp 0.5s ease-out;
417:     }
418:
419:     .animate-slide-down {
420:         animation: slideDown 0.5s ease-out;
421:     }
422:
423:     .animate-slide-left {
424:         animation: slideLeft 0.5s ease-out;
425:     }
426:
427:     .animate-slide-right {
428:         animation: slideRight 0.5s ease-out;
429:     }
430:
431:     .animate-scale-in {
432:         animation: scaleIn 0.5s ease-out;
433:     }
434:
435:     .animate-pulse-once {
436:         animation: pulseOnce 2s ease-in-out;
437:     }
438:
439:     .animate-float {
440:         animation: float 6s ease-in-out infinite;
441:     }
442:
443:     .animate-spin-slow {
444:         animation: spin 8s linear infinite;
445:     }
446:
447:     .animate-fade-in-delay-1 {
448:         opacity: 0;
449:         animation: fadeIn 0.5s ease-in-out 0.2s forwards;
450:     }
451:
452:     .animate-fade-in-delay-2 {
453:         opacity: 0;
454:         animation: fadeIn 0.5s ease-in-out 0.4s forwards;
455:     }
456:
457:     .animate-fade-in-delay-3 {
458:         opacity: 0;
459:         animation: fadeIn 0.5s ease-in-out 0.6s forwards;
460:     }
461:
462:     .animate-slide-up-delay-1 {
463:         opacity: 0;
464:         animation: slideUp 0.5s ease-out 0.2s forwards;
465:     }
466:
467:     .animate-slide-up-delay-2 {
468:         opacity: 0;
469:         animation: slideUp 0.5s ease-out 0.4s forwards;
470:     }
471:
472:     .animate-slide-up-delay-3 {
473:         opacity: 0;
474:         animation: slideUp 0.5s ease-out 0.6s forwards;
475:     }
476:
477:     .animate-bounce-subtle {
478:         animation: bounceSoft 2s ease-in-out infinite;
479:     }
480:
481:     @media (prefers-reduced-motion: reduce) {
482:         .animate-fade-in,
483:         .animate-slide-up,
484:         .animate-slide-down,
485:         .animate-slide-left,
486:         .animate-slide-right,
487:         .animate-scale-in,
488:         .animate-pulse-once,
489:         .animate-float,
490:         .animate-spin-slow,
491:         .animate-bounce-subtle,
492:         .animate-fade-in-delay-1,
493:         .animate-fade-in-delay-2,
494:         .animate-fade-in-delay-3,
495:         .animate-slide-up-delay-1,
496:         .animate-slide-up-delay-2,
497:         .animate-slide-up-delay-3 {
498:             animation: none !important;
499:             opacity: 1 !important;
500:             transform: none !important;
501:         }
502:     }
503:
504:     /* Animation keyframes */
505:     @keyframes fadeIn {
506:         from { opacity: 0; }
507:         to { opacity: 1; }
508:     }
509:
510:     @keyframes slideUp {
511:         from {
512:             opacity: 0;
513:             transform: translateY(20px);
514:         }
515:         to {
516:             opacity: 1;
517:             transform: translateY(0);
518:         }
519:     }
520:
521:     @keyframes slideDown {
522:         from {
523:             opacity: 0;
524:             transform: translateY(-20px);
525:         }
526:         to {
527:             opacity: 1;
528:             transform: translateY(0);
529:         }
530:     }
531:
532:     @keyframes slideLeft {
533:         from {
534:             opacity: 0;
535:             transform: translateX(20px);
536:         }
537:         to {
538:             opacity: 1;
539:             transform: translateX(0);
540:         }
541:     }
542:
543:     @keyframes slideRight {
544:         from {
545:             opacity: 0;
546:             transform: translateX(-20px);
547:         }
548:         to {
549:             opacity: 1;
550:             transform: translateX(0);
551:         }
552:     }
553:
554:     @keyframes scaleIn {
555:         from {
556:             opacity: 0;
557:             transform: scale(0.95);
558:         }
559:         to {
560:             opacity: 1;
561:             transform: scale(1);
562:         }
563:     }
564:
565:     @keyframes pulseOnce {
566:         0% { transform: scale(1); }
567:         50% { transform: scale(1.05); }
568:         100% { transform: scale(1); }
569:     }
570:
571:     @keyframes float {
572:         0% { transform: translateY(0); }
573:         50% { transform: translateY(-10px); }
574:         100% { transform: translateY(0); }
575:     }
576:
577:     @keyframes spin {
578:         from { transform: rotate(0deg); }
579:         to { transform: rotate(360deg); }
580:     }
581:
582:     @keyframes bounceSoft {
583:         0%, 100% { transform: translateY(0); }
584:         50% { transform: translateY(-5px); }
585:     }
586:
587:     /* Customized scrollbar for better UX */
588:     .custom-scrollbar {
589:         scrollbar-width: thin;
590:         scrollbar-color: var(--color-primary) transparent;
591:     }
592:
593:     .custom-scrollbar::-webkit-scrollbar {
594:         width: 6px;
595:         height: 6px;
596:     }
597:
598:     .custom-scrollbar::-webkit-scrollbar-track {
599:         background: transparent;
600:     }
601:
602:     .custom-scrollbar::-webkit-scrollbar-thumb {
603:         background-color: var(--color-primary);
604:         border-radius: 3px;
605:     }
606:
607:     /* Text highlighting style */
608:     ::selection {
609:         background-color: rgba(var(--color-primary-rgb), 0.3);
610:         color: var(--color-text);
611:     }
612:
613:     /* Glass morphism effect */
614:     .glass-morphism {
615:         background: rgba(var(--color-background-rgb), 0.7);
616:         backdrop-filter: blur(10px);
617:         -webkit-backdrop-filter: blur(10px);
618:         border: 1px solid rgba(var(--color-border-rgb), 0.3);
619:     }
620:
621:     /* Enhanced card styles */
622:     .card-hover {
623:         transition: transform 0.3s ease, box-shadow 0.3s ease;
624:     }
625:
626:     .card-hover:hover {
627:         transform: translateY(-5px);
628:         box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
629:     }
630:
631:     /* Gradient text */
632:     .gradient-text {
633:         background-clip: text;
634:         -webkit-background-clip: text;
635:         color: transparent;
636:         background-image: linear-gradient(to right, var(--color-primary), var(--color-accent));
637:     }
638:
639:     /* Gradient borders */
640:     .gradient-border {
641:         position: relative;
642:         border-radius: 0.5rem;
643:         z-index: 0;
644:     }
645:
646:     .gradient-border::before {
647:         content: '';
648:         position: absolute;
649:         inset: -2px;
650:         border-radius: 0.5rem;
651:         background: linear-gradient(to right, var(--color-primary), var(--color-accent));
652:         z-index: -1;
653:     }
654:
655:     .gradient-border::after {
656:         content: '';
657:         position: absolute;
658:         inset: 0;
659:         border-radius: 0.5rem;
660:         background: var(--color-background);
661:         z-index: -1;
662:     }
663:
664:     /* Enhanced button styles */
665:     .btn {
666:         display: inline-flex;
667:         align-items: center;
668:         justify-content: center;
669:         gap: 0.5rem;
670:         cursor: pointer;
671:         text-align: center;
672:         font-weight: 600;
673:         text-decoration: none;
674:         background-color: var(--color-primary);
675:         color: var(--color-button-text);
676:         padding: var(--btn-py, 0.875rem) var(--btn-px, 1.25rem);
677:         font-size: var(--btn-font-size, 0.875rem);
678:         border-radius: var(--btn-border-radius, 0.375rem);
679:         position: relative;
680:         overflow: hidden;
681:         box-shadow: 0 4px 6px -1px rgba(var(--color-primary-rgb), 0.2), 0 2px 4px -1px rgba(var(--color-primary-rgb), 0.1);
682:         transition:
683:             all var(--theme-transition-duration) var(--theme-transition-easing),
684:             transform 0.2s ease;
685:     }
686:
687:     .btn::before {
688:         content: '';
689:         position: absolute;
690:         top: 0;
691:         left: 0;
692:         width: 100%;
693:         height: 100%;
694:         background: linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(0,0,0,0.05));
695:         pointer-events: none;
696:     }
697:
698:     .btn:hover {
699:         box-shadow: 0 6px 10px -2px rgba(var(--color-primary-rgb), 0.25), 0 4px 6px -1px rgba(var(--color-primary-rgb), 0.15);
700:         transform: translateY(-1px);
701:         background-color: #266974; /* Slightly darker for better hover contrast */
702:     }
703:
704:     .btn:active {
705:         transform: translateY(1px);
706:         box-shadow: 0 2px 4px -1px rgba(var(--color-primary-rgb), 0.2);
707:         background-color: #1d5058; /* Even darker for active state */
708:     }
709:
710:     .btn:disabled {
711:         background-color: #4b5563; /* Gray that meets contrast with white */
712:         color: #ffffff;
713:         opacity: 0.7;
714:         cursor: not-allowed;
715:         box-shadow: none;
716:         transform: none;
717:     }
718:
719:     /* Button variants */
720:     .btn-accent {
721:         background-color: var(--color-accent);
722:         color: var(--color-accent-button-text); /* Dark text on light background */
723:         box-shadow: 0 4px 6px -1px rgba(var(--color-accent-rgb), 0.2), 0 2px 4px -1px rgba(var(--color-accent-rgb), 0.1);
724:     }
725:
726:     .btn-accent:hover {
727:         box-shadow: 0 6px 10px -2px rgba(var(--color-accent-rgb), 0.25), 0 4px 6px -1px rgba(var(--color-accent-rgb), 0.15);
728:         background-color: #4bbbce; /* Slightly darker for hover */
729:     }
730:
731:     .btn-accent:active {
732:         box-shadow: 0 2px 4px -1px rgba(var(--color-accent-rgb), 0.2);
733:         background-color: #3eafc2; /* Even darker for active state */
734:     }
735:
736:     .btn-secondary {
737:         background-color: var(--color-secondary);
738:         color: var(--color-button-text);
739:         box-shadow: 0 4px 6px -1px rgba(var(--color-secondary-rgb), 0.2), 0 2px 4px -1px rgba(var(--color-secondary-rgb), 0.1);
740:     }
741:
742:     .btn-secondary:hover {
743:         box-shadow: 0 6px 10px -2px rgba(var(--color-secondary-rgb), 0.25), 0 4px 6px -1px rgba(var(--color-secondary-rgb), 0.15);
744:         background-color: #0055a0; /* Slightly darker for hover */
745:     }
746:
747:     .btn-secondary:active {
748:         box-shadow: 0 2px 4px -1px rgba(var(--color-secondary-rgb), 0.2);
749:         background-color: #00488c; /* Even darker for active state */
750:     }
751:
752:     /* Outline button variant */
753:     .btn-outline {
754:         background-color: transparent;
755:         color: var(--color-primary);
756:         border: 2px solid var(--color-primary);
757:         box-shadow: none;
758:     }
759:
760:     .btn-outline:hover {
761:         background-color: var(--color-primary);
762:         color: var(--color-button-text);
763:         box-shadow: 0 6px 10px -2px rgba(var(--color-primary-rgb), 0.25), 0 4px 6px -1px rgba(var(--color-primary-rgb), 0.15);
764:     }
765:
766:     /* Ghost button variant */
767:     .btn-ghost {
768:         background-color: transparent;
769:         color: var(--color-primary);
770:         box-shadow: none;
771:     }
772:
773:     .btn-ghost:hover {
774:         background-color: rgba(var(--color-primary-rgb), 0.1);
775:         box-shadow: none;
776:     }
777:
778:     .btn-ghost:active {
779:         background-color: rgba(var(--color-primary-rgb), 0.2);
780:         box-shadow: none;
781:     }
782:
783:     /* With icon animation */
784:     .btn-with-icon-right:hover svg {
785:         transform: translateX(4px);
786:         transition: transform 0.2s ease-out;
787:     }
788:
789:     .btn-with-icon-left:hover svg {
790:         transform: translateX(-4px);
791:         transition: transform 0.2s ease-out;
792:     }
793:
794:     /* Button size variants */
795:     .btn-xs {
796:         --btn-font-size: 0.75rem;
797:         --btn-py: 0.375rem;
798:         --btn-px: 0.75rem;
799:         --btn-border-radius: 0.25rem;
800:     }
801:
802:     .btn-sm {
803:         --btn-font-size: 0.875rem;
804:         --btn-py: 0.625rem;
805:         --btn-px: 1rem;
806:         --btn-border-radius: 0.25rem;
807:     }
808:
809:     .form-container {
810:         border-radius: 0.5rem;
811:         padding: 1.5rem;
812:         background-color: var(--color-form-bg);
813:         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
814:         border: 1px solid var(--color-border);
815:         transition:
816:             var(--theme-transition-properties)
817:             var(--theme-transition-duration)
818:             var(--theme-transition-easing);
819:     }
820:
821:     .btn-lg {
822:         --btn-font-size: 1.125rem;
823:         --btn-px: 1.5rem;
824:         --btn-py: 1.125rem;
825:     }
826:
827:     /* Card component with theme transitions */
828:     .card {
829:         background-color: var(--color-form-bg);
830:         border: 1px solid var(--color-border);
831:         border-radius: 0.5rem;
832:         box-shadow: 0 2px 4px var(--shadow-color-light);
833:         transition:
834:             var(--theme-transition-properties)
835:             var(--theme-transition-duration)
836:             var(--theme-transition-easing);
837:     }
838:
839:     /* High-contrast form labels */
840:     .form-label {
841:         display: block;
842:         font-weight: 500;
843:         margin-bottom: 0.5rem;
844:         color: var(--color-text);
845:     }
846:
847:     /* Form error styles */
848:     .input-error {
849:         border-color: var(--color-error);
850:     }
851:
852:     /* Ensures SVG icons in buttons have proper contrast */
853:     .btn svg {
854:         fill: currentColor;
855:         stroke: currentColor;
856:         width: 1em;
857:         height: 1em;
858:     }
859: }
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
10:     "astro": "astro"
11:   },
12:   "dependencies": {
13:     "@astrojs/netlify": "^6.3.3",
14:     "@astrojs/react": "^4.2.7",
15:     "@astrojs/tailwind": "^6.0.2",
16:     "@fontsource-variable/inter": "^5.0.4",
17:     "@netlify/blobs": "^6.3.0",
18:     "@netlify/functions": "^1.6.0",
19:     "astro": "^5.7.13",
20:     "blobshape": "^1.0.0",
21:     "marked": "^9.1.6",
22:     "marked-shiki": "^1.1.3",
23:     "react": "^18.2.0",
24:     "react-dom": "^18.2.0",
25:     "tailwindcss": "^3.3.5",
26:     "unique-names-generator": "^4.7.1"
27:   },
28:   "devDependencies": {
29:     "@types/node": "^20.10.0",
30:     "@types/react": "^18.2.15",
31:     "@types/react-dom": "^18.2.7"
32:   }
33: }
```
