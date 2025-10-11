# Google Search Console - Indexing Checklist

## Your Portfolio Indexing Checklist

### Phase 1: Verification (COMPLETED)
- [x] Google verification file uploaded to `/public`
- [x] Vercel.json configured with rewrite rule
- [x] Changes pushed to production
- [x] Deployed to Vercel
- [ ] Verify file accessible: `https://yourdomain.com/google11c981db57feb3c4.html`
- [ ] Complete verification in Google Search Console

---

### Phase 2: Request Indexing (Priority Order)

#### Day 1: Core Pages (Submit First)
- [ ] **Homepage**
  - URL: `https://yourdomain.com/`
  - Priority: 🔴 CRITICAL
  - Action: URL Inspection → Request Indexing

- [ ] **Projects Page**
  - URL: `https://yourdomain.com/projects`
  - Priority: 🔴 CRITICAL
  - Action: URL Inspection → Request Indexing

- [ ] **About Page**
  - URL: `https://yourdomain.com/about`
  - Priority: 🟡 HIGH
  - Action: URL Inspection → Request Indexing

- [ ] **Skills Page**
  - URL: `https://yourdomain.com/skills`
  - Priority: 🟡 HIGH
  - Action: URL Inspection → Request Indexing

- [ ] **Contact Page**
  - URL: `https://yourdomain.com/contact`
  - Priority: 🟡 HIGH
  - Action: URL Inspection → Request Indexing

#### Day 2: Secondary Pages (If Applicable)
- [ ] Individual project pages (if any)
- [ ] Blog posts (if any)
- [ ] Other important pages

---

### Phase 3: Submit Sitemap

#### Create Sitemap (If Not Exists)
Check if you have a sitemap at: `https://yourdomain.com/sitemap.xml`

**If NO sitemap exists:**
1. [ ] Generate sitemap (use sitemap generator tool or plugin)
2. [ ] Add to `/public` folder
3. [ ] Rebuild and deploy
4. [ ] Verify accessibility: `https://yourdomain.com/sitemap.xml`

**Submit to Google:**
1. [ ] Go to Google Search Console
2. [ ] Click "Sitemaps" in left sidebar
3. [ ] Click "Add a new sitemap"
4. [ ] Enter: `sitemap.xml`
5. [ ] Click "Submit"
6. [ ] Wait for "Success" status

---

### Phase 4: Monitor & Verify

#### After 24 Hours:
- [ ] Check indexing status of homepage
  - URL Inspection tool shows: "URL is on Google"
  
- [ ] Google site search test:
  - Search: `site:yourdomain.com`
  - Verify pages appear in results

#### After 48-72 Hours:
- [ ] Check Coverage Report
  - Go to: Coverage → Valid
  - Verify all submitted pages are indexed
  
- [ ] Check Performance
  - Go to: Performance
  - Review clicks, impressions, CTR

---

### Phase 5: Ongoing Optimization

#### Weekly Tasks:
- [ ] Check Coverage report for errors
- [ ] Review Performance metrics
- [ ] Fix any crawl errors

#### Monthly Tasks:
- [ ] Review Core Web Vitals
- [ ] Check Mobile Usability
- [ ] Update sitemap if new pages added
- [ ] Request re-indexing for updated content

---

## Detailed Procedures

### How to Request Indexing (Step-by-Step)

1. **Open Google Search Console**
   - Visit: https://search.google.com/search-console/
   - Select your property

2. **Access URL Inspection**
   - Click the search bar at the top
   - Or click "URL Inspection" in left sidebar

3. **Enter URL**
   - Type full URL: `https://yourdomain.com/`
   - Press Enter

4. **Wait for Results**
   - Takes 5-30 seconds
   - Review status

5. **Request Indexing**
   - Click "REQUEST INDEXING" button
   - Wait for live test (10-60 seconds)
   - See confirmation: "Indexing requested"

6. **Repeat for Other Pages**
   - Max 10-12 URLs per day
   - Prioritize important pages

---

## Troubleshooting

### Common Issues & Solutions

#### "URL is not on Google"
- **Solution:** Request indexing (normal for new sites)

#### "Blocked by robots.txt"
- **Check:** `https://yourdomain.com/robots.txt`
- **Solution:** Ensure not blocking important pages

#### "Page has noindex tag"
- **Check:** Page HTML meta tags
- **Solution:** Remove `<meta name="robots" content="noindex">`

#### "Server error (5xx)"
- **Check:** Site accessibility
- **Solution:** Fix server issues, then re-request

#### "Crawled - currently not indexed"
- **Reason:** Low quality or duplicate content
- **Solution:** Improve content quality, add more unique value

#### "Discovered - currently not indexed"
- **Reason:** Google found URL but hasn't crawled yet
- **Solution:** Request indexing manually

---

## Success Metrics

### Week 1:
- [ ] At least homepage indexed
- [ ] 2-3 main pages indexed

### Week 2-4:
- [ ] All submitted pages indexed
- [ ] Appearing in search results
- [ ] Getting impressions (Performance tab)

### Month 2-3:
- [ ] Getting clicks from search
- [ ] Core Web Vitals: Good status
- [ ] No coverage errors

---

## Quick Command Reference

### Test Verification File:
```bash
curl https://yourdomain.com/google11c981db57feb3c4.html
```

### Test Sitemap:
```bash
curl https://yourdomain.com/sitemap.xml
```

### Google Site Search:
```
site:yourdomain.com
```

### Check Specific Page:
```
site:yourdomain.com/projects
```

---

## 📅 Timeline Expectations

| Timeframe | Expected Result |
|-----------|----------------|
| 0-24 hours | Verification complete, first pages crawled |
| 24-48 hours | Homepage indexed |
| 2-7 days | Main pages indexed |
| 1-2 weeks | All pages indexed |
| 2-4 weeks | Appearing in search results |
| 1-3 months | Ranking for target keywords |

---

## Next Steps After This Checklist

1. [ ] Set up Google Analytics
2. [ ] Create structured data (JSON-LD)
3. [ ] Optimize meta descriptions
4. [ ] Build backlinks
5. [ ] Create content regularly
6. [ ] Monitor and improve performance

---

**Last Updated:** October 10, 2025
**Status:** Ready for indexing after Vercel deployment
