# Additional Performance Optimizations

## Further Optimizations You Can Implement

### 1. **Image Optimizations**

```bash
# Install next-optimized-images for advanced image optimization
npm install next-optimized-images imagemin-mozjpeg imagemin-optipng

# Add to next.config.mjs
withOptimizedImages: {
  mozjpeg: { quality: 80 },
  optipng: { optimizationLevel: 3 },
}
```

### 2. **Bundle Analysis & Tree Shaking**

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Analyze your bundle
npm run analyze
```

### 3. **Database Query Optimizations**

```javascript
// Use React Query for caching API calls
npm install @tanstack/react-query

// Example implementation
const { data, isLoading } = useQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

### 4. **Advanced Preloading**

```javascript
// Preload critical routes
import { useRouter } from "next/router";

const router = useRouter();
useEffect(() => {
  router.prefetch("/projects");
  router.prefetch("/about");
}, [router]);
```

### 5. **Web Workers for Heavy Tasks**

```javascript
// offload heavy computations to web workers
const worker = new Worker("/workers/image-processing.js");
worker.postMessage({ imageData: data });
```

### 6. **Memory Optimization**

```javascript
// Use React.memo for expensive components
export default React.memo(ExpensiveComponent, (prevProps, nextProps) => {
  return prevProps.data === nextProps.data;
});

// Cleanup intervals and listeners
useEffect(() => {
  const interval = setInterval(updateData, 1000);
  return () => clearInterval(interval);
}, []);
```

### 7. **Critical CSS Extraction**

```bash
# Install critical CSS extraction
npm install --save-dev critical

# Extract critical CSS
critical src/**/*.html --base dist/ --css dist/styles/*.css --minify true
```

### 8. **Advanced Service Worker**

```javascript
// Implement advanced caching strategies
// - Network First for API calls
// - Cache First for static assets
// - Stale While Revalidate for user data

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/api/")) {
    event.respondWith(networkFirst(event.request));
  } else if (
    event.request.url.includes(".js") ||
    event.request.url.includes(".css")
  ) {
    event.respondWith(cacheFirst(event.request));
  }
});
```

### 9. **Font Optimization**

```html
<!-- Preload critical fonts -->
<link
  rel="preload"
  href="/fonts/Inter-Regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>

<!-- Use font-display: swap -->
@font-face { font-family: 'Inter'; src: url('/fonts/Inter-Regular.woff2')
format('woff2'); font-display: swap; }
```

### 10. **Third-party Script Optimization**

```javascript
// Use Next.js Script component for third-party scripts
import Script from "next/script";

<Script
  src="https://analytics.example.com/script.js"
  strategy="afterInteractive"
  onLoad={() => console.log("Analytics loaded")}
/>;
```

### 11. **Resource Hints**

```html
<!-- DNS prefetch for external domains -->
<link rel="dns-prefetch" href="//fonts.googleapis.com" />
<link rel="dns-prefetch" href="//api.example.com" />

<!-- Preconnect for critical external resources -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Prefetch next page resources -->
<link rel="prefetch" href="/projects" />
```

### 12. **Performance Budgets**

```json
// lighthouse-budget.json
{
  "resourceSizes": [
    { "resourceType": "script", "budget": 150 },
    { "resourceType": "image", "budget": 500 },
    { "resourceType": "stylesheet", "budget": 50 }
  ],
  "resourceCounts": [
    { "resourceType": "script", "budget": 10 },
    { "resourceType": "third-party", "budget": 5 }
  ]
}
```

### 13. **Advanced Lazy Loading**

```javascript
// Intersection Observer for custom lazy loading
const useInViewport = (ref, options) => {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      options,
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return isInViewport;
};
```

### 14. **State Management Optimization**

```javascript
// Use Zustand for efficient state management
import { create } from "zustand";

const useStore = create((set) => ({
  data: null,
  loading: false,
  setData: (data) => set({ data, loading: false }),
  setLoading: (loading) => set({ loading }),
}));
```

### 15. **Error Boundary with Performance Tracking**

```javascript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log performance impact of errors
    console.error("Component error affecting performance:", error);
  }
}
```

## Advanced Lighthouse Optimizations

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **INP (Interaction to Next Paint)**: < 200ms

### Monitoring Tools

```bash
# Web Vitals library
npm install web-vitals

# Implementation
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Performance APIs

```javascript
// Navigation Timing API
const perfData = performance.getEntriesByType("navigation")[0];
console.log(
  "DOM Load Time:",
  perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
);

// Resource Timing API
const resources = performance.getEntriesByType("resource");
resources.forEach((resource) => {
  console.log(`${resource.name}: ${resource.duration}ms`);
});
```

## Testing Strategy

### Lighthouse CI Configuration

```json
// .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli@0.8.x
          lhci autorun
```

### Performance Testing Checklist

- [ ] Lighthouse scores > 90 for all categories
- [ ] Core Web Vitals pass
- [ ] Bundle size < 250KB (gzipped)
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] No layout shifts during load
- [ ] Images optimized and properly sized
- [ ] Fonts preloaded and optimized
- [ ] Service Worker functioning correctly
- [ ] Critical CSS extracted and inlined

These additional optimizations can help you achieve even better performance scores and provide an exceptional user experience!
