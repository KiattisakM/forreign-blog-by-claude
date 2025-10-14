# Implementation Plan: Foreign Stock Blog - Phase 3 & Beyond

**Created:** 2025-10-14 11:25
**Status:** Phases 1-2 Complete, Starting Phase 3

## Progress Summary

✅ **Phase 1 Complete:** Foundation & Data (Types, Mock Data, Config)
✅ **Phase 2 Complete:** Components & Layout (shadcn/ui, Cards, Badges, Layout)
🎯 **Phase 3 Next:** Pages & Routing
⏳ **Phase 4 Pending:** Features & Interactivity
⏳ **Phase 5 Pending:** Polish & Optimization

---

## 🎯 Phase 3: Pages & Routing (CURRENT)

**Goal:** Create all pages and implement React Router navigation
**Estimated Time:** 3-4 hours
**Dependencies:** Phase 1, Phase 2 complete

### Task Breakdown

#### Task 3.1: Setup React Router ⚡ PRIORITY
**Status:** Not Started
**Estimated Time:** 20 minutes
**Files to Modify:**
- `src/main.tsx` - Wrap App with BrowserRouter
- `src/App.tsx` - Define all routes with Route components

**Routes to Implement:**
```typescript
/ → HomePage
/articles → ArticleListPage
/articles/:slug → ArticleDetailPage
/markets/:market → MarketPage
/sectors/:sector → SectorPage
/about → AboutPage
```

**Success Criteria:**
- [ ] All routes defined and navigable
- [ ] URLs clean and semantic
- [ ] No 404 errors on valid routes
- [ ] Build passes TypeScript checks

---

#### Task 3.2: Create Home Page
**Status:** Not Started
**Estimated Time:** 45 minutes
**File:** `src/pages/HomePage.tsx`

**Components to Build:**
1. **Hero Section**
   - Large title: "Foreign Stock Blog"
   - Subtitle/tagline about international investing
   - CTA button → /articles

2. **Featured Articles Section**
   - Filter articles where `featured: true`
   - Display 3-4 StockArticleCard components
   - Grid layout (responsive)

3. **Market Overview Cards**
   - 3 cards for US, EU, ASIA
   - Show article count per market
   - Click to filter by market
   - Use shadcn Card component

**Success Criteria:**
- [ ] Visually appealing landing page
- [ ] Featured articles display correctly
- [ ] All links functional
- [ ] Responsive on mobile/tablet/desktop
- [ ] Uses MainLayout wrapper

---

#### Task 3.3: Create Article List Page
**Status:** Not Started
**Estimated Time:** 1 hour
**File:** `src/pages/ArticleListPage.tsx`

**Features:**
1. **Article Grid**
   - Display all articles in responsive grid
   - Use StockArticleCard component
   - 1 column mobile, 2 tablet, 3 desktop

2. **Sidebar Integration**
   - Integrate Sidebar component for filtering
   - State management for selected filters
   - Real-time filter updates

3. **Search Bar**
   - Input in header or page top
   - Filter by title, stock symbol, company name
   - Case-insensitive matching

4. **Sort Options**
   - Newest first (default)
   - Oldest first
   - By reading time
   - By category

5. **Results Count**
   - Show "X articles found"
   - Update dynamically with filters

**Success Criteria:**
- [ ] All articles display correctly
- [ ] Filters work (market, sector)
- [ ] Search functions properly
- [ ] Sort options change order
- [ ] No performance issues
- [ ] Empty state when no results

---

#### Task 3.4: Create Article Detail Page
**Status:** Not Started
**Estimated Time:** 1 hour
**File:** `src/pages/ArticleDetailPage.tsx`

**Layout:**
```
┌──────────────────┬─────────────┐
│                  │  Stock Info │
│  Article Content │   Sidebar   │
│                  │             │
├──────────────────┴─────────────┤
│   Related Articles (3 cards)   │
└─────────────────────────────────┘
```

**Components:**
1. **Article Header**
   - Title (large, bold)
   - Market & Sector badges
   - Author info (name, avatar)
   - Publish date (dayjs relative time)
   - Reading time
   - Category badge

2. **Article Content**
   - Full article text (formatted)
   - Images if present
   - Preserve line breaks/paragraphs

3. **Stock Info Sidebar** (sticky)
   - Stock symbol (large, prominent)
   - Company name
   - Market, Exchange, Sector badges
   - Currency
   - Market cap (if available)
   - Sentiment indicator (if present)
   - Price target (if present)

4. **Related Articles**
   - Find articles from same market or sector
   - Display 3 StockArticleCard components
   - Exclude current article

5. **Navigation**
   - Back button → /articles
   - Breadcrumbs: Home / Articles / [Article Title]

**Success Criteria:**
- [ ] Article displays with proper formatting
- [ ] Stock info sidebar visible and informative
- [ ] Related articles show correctly
- [ ] Navigation works
- [ ] Responsive layout (sidebar below on mobile)
- [ ] 404 handling for invalid slugs

---

#### Task 3.5: Market & Sector Filter Pages
**Status:** Not Started
**Estimated Time:** 30 minutes
**Files:**
- `src/pages/MarketPage.tsx`
- `src/pages/SectorPage.tsx`

**Approach:**
- Reuse ArticleListPage component
- Pre-filter by URL param (market or sector)
- Show page title: "Articles about [Market/Sector]"
- Allow additional filtering on top

**Success Criteria:**
- [ ] Market pages filter correctly
- [ ] Sector pages filter correctly
- [ ] Can still use sidebar for additional filters
- [ ] URLs like `/markets/US`, `/sectors/Technology` work

---

#### Task 3.6: Create About Page
**Status:** Not Started
**Estimated Time:** 20 minutes
**File:** `src/pages/AboutPage.tsx`

**Content Sections:**
1. **Mission Statement**
   - Purpose of the blog
   - What makes it unique
   - Target audience

2. **Disclaimer**
   - "Not financial advice" warning
   - "Do your own research" message
   - Educational purpose only

3. **Contact/Social** (optional)
   - Email, Twitter, etc.
   - Feedback form link

**Success Criteria:**
- [ ] Professional appearance
- [ ] Clear disclaimer visible
- [ ] Uses MainLayout
- [ ] Responsive

---

## 🔄 Phase 4: Features & Interactivity (NEXT)

**Status:** Not Started
**Dependencies:** Phase 3 complete

### Task 4.1: Implement Advanced Search
- Search across title, content, stock symbol, company name
- Debounced input (300ms)
- Highlight matching terms

### Task 4.2: Enhance Filter Logic
- URL params for shareable filters
- Clear all filters button
- Filter persistence in localStorage

### Task 4.3: Dark Mode Toggle
- Toggle button in header
- Persist preference
- Smooth transitions
- Financial-appropriate dark theme

### Task 4.4: Responsive Enhancements
- Mobile drawer for filters
- Touch-friendly interactions
- Optimize images for mobile

---

## 📊 Phase 5: Polish & Optimization (FUTURE)

**Status:** Not Started
**Dependencies:** Phase 4 complete

### Task 5.1: Loading States
- Skeleton loaders
- Spinner components
- Error boundaries

### Task 5.2: Performance Optimization
- React.lazy for code splitting
- React.memo for expensive components
- Image optimization
- Bundle analysis

### Task 5.3: SEO & Meta Tags
- react-helmet-async for meta tags
- Open Graph tags
- Structured data
- Sitemap generation

### Task 5.4: Documentation
- README with setup instructions
- Component documentation
- Deployment guide

### Task 5.5: Testing & Bug Fixes
- Manual testing checklist
- Cross-browser testing
- Fix reported issues

---

## 📋 Execution Checklist

**Before Starting Each Task:**
- [ ] Read relevant existing code
- [ ] Check dependencies are complete
- [ ] Update todo list with task breakdown

**During Implementation:**
- [ ] Write clean, typed code
- [ ] Test incrementally
- [ ] Keep components focused and reusable

**After Completing Each Task:**
- [ ] Test in browser (dev mode)
- [ ] Run `pnpm run build` to verify
- [ ] Update todo list
- [ ] Mark task complete in plan

**After Completing Each Phase:**
- [ ] Full manual testing
- [ ] Git commit with descriptive message
- [ ] Update context.md with progress

---

## 🚀 Ready to Execute

**Current Target:** Phase 3 - Pages & Routing

Run `gogogo` to start Phase 3 implementation.
