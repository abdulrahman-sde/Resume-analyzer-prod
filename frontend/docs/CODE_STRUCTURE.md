# Code Structure & Best Practices

## Project Architecture

This project follows a clean, modular architecture with clear separation of concerns:

```
/
├── app/                      # Next.js App Router pages
│   ├── (root)/              # Landing page route group
│   │   └── page.tsx         # Static landing page (UI only)
│   └── layout.tsx           # Root layout
├── components/              # Reusable UI components
│   ├── landing/            # Landing page specific components
│   │   ├── BackgroundAmbience.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HeroVisual.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── TestimonialSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts        # Barrel export
│   └── Header.tsx           # Shared components
├── constants/               # Static data and configurations
│   ├── icons.tsx           # SVG icon components
│   └── landing.ts          # Landing page constants
├── types/                   # TypeScript type definitions
│   └── landing.ts          # Landing page types
├── hooks/                   # Custom React hooks (for state/logic)
└── lib/                     # Utilities and helper functions
```

## Design Principles

### 1. **Separation of Concerns**

- **`.tsx` files**: Pure UI components (JSX/TSX only)
- **`hooks/`**: Business logic, state management, side effects
- **`constants/`**: Static data, configurations
- **`types/`**: TypeScript interfaces and types
- **`lib/`**: Pure utility functions

### 2. **Component Organization**

Each major page has its own folder in `components/` containing:

- All related UI components
- An `index.ts` barrel export for clean imports

### 3. **Static Generation**

Pages export metadata for optimal SEO and static generation:

```typescript
export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description",
};
```

### 4. **Type Safety**

All props and data structures are typed using TypeScript interfaces from the `types/` folder.

### 5. **Constants Over Hardcoding**

- SVG icons → `constants/icons.tsx`
- Page data → `constants/[page].ts`
- Configuration → `constants/config.ts`

## Adding New Features

### Adding a New Page Component

1. Create folder: `components/[page-name]/`
2. Create component files (UI only)
3. Create `index.ts` for barrel exports
4. Define types in `types/[page-name].ts`
5. Add constants to `constants/[page-name].ts`
6. Extract logic to `hooks/use[PageName].ts`

### Example: Adding Analytics Page Components

```bash
# 1. Create folder structure
mkdir components/analytics

# 2. Create components (UI only)
touch components/analytics/ChartSection.tsx
touch components/analytics/StatsCard.tsx
touch components/analytics/index.ts

# 3. Create types
touch types/analytics.ts

# 4. Create constants
touch constants/analytics.ts

# 5. Create hook (if needed)
touch hooks/useAnalytics.ts
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `HeroSection.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAnalytics.ts`)
- **Types**: camelCase (e.g., `landing.ts`)
- **Constants**: camelCase (e.g., `landing.ts`)
- **Utils**: camelCase (e.g., `formatDate.ts`)

## Import Patterns

### Good ✅

```typescript
// Use barrel exports
import { HeroSection, CTASection } from "@/components/landing";
import { FEATURES } from "@/constants/landing";
import { Feature } from "@/types/landing";
```

### Avoid ❌

```typescript
// Don't import directly
import { HeroSection } from "@/components/landing/HeroSection";
```

## Component Best Practices

### Keep Components Pure

```typescript
// ✅ Good: Pure UI component
export function HeroSection() {
  return <div>...</div>;
}

// ❌ Bad: Logic in component
export function HeroSection() {
  const [data, setData] = useState();
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  return <div>...</div>;
}
```

### Extract Logic to Hooks

```typescript
// hooks/useHeroData.ts
export function useHeroData() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return { data };
}

// components/landing/HeroSection.tsx
export function HeroSection() {
  const { data } = useHeroData();
  return <div>{data}</div>;
}
```

## Performance Optimization

### Static Pages

- Use `export const metadata` for SEO
- No client-side data fetching on static pages
- All data should come from constants

### Component Splitting

- Each section is a separate component
- Easy to lazy load if needed
- Better code organization and testing

## Testing Strategy

- **Unit tests**: For hooks and utilities
- **Component tests**: For UI components
- **Integration tests**: For page flows

## Migration Checklist

When refactoring existing code:

- [ ] Extract SVG icons to `constants/icons.tsx`
- [ ] Move data to `constants/[page].ts`
- [ ] Create types in `types/[page].ts`
- [ ] Split page into logical components
- [ ] Extract logic to hooks
- [ ] Add metadata export
- [ ] Update imports
- [ ] Test functionality
