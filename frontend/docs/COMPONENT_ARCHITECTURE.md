# Production-Grade Component Structure

## ✅ Current Architecture

```
components/
├── ui/                      # Primitive/Reusable UI components
│   ├── Button.tsx          # Configurable button (primary, secondary, outline, ghost)
│   ├── Card.tsx            # Card wrapper (default, glass, bordered variants)
│   ├── Badge.tsx           # Status badges (success, warning, error, info)
│   └── index.ts            # Barrel export
│
├── layout/                  # Application layout components
│   ├── Header.tsx          # Global navigation header
│   ├── Footer.tsx          # Global footer
│   ├── Container.tsx       # Responsive container wrapper
│   └── index.ts            # Barrel export
│
├── shared/                  # Shared feature components (cross-page)
│   └── [Future: ScoreCircle, ProgressBar, etc.]
│
└── features/               # Page-specific components
    └── landing/            # Landing page components
        ├── BackgroundAmbience.tsx
        ├── HeroSection.tsx
        ├── HeroVisual.tsx
        ├── FeatureCard.tsx
        ├── FeaturesSection.tsx
        ├── TestimonialSection.tsx
        ├── CTASection.tsx
        └── index.ts
```

## Component Hierarchy

### 1. **ui/** - Primitive Components

**Purpose**: Building blocks used everywhere  
**Rules**:

- ✅ Pure presentational components
- ✅ Highly reusable across ALL pages
- ✅ No business logic
- ✅ Accept className for customization
- ✅ Use TypeScript for props
- ✅ Follow design system tokens

**Examples**:

```typescript
import { Button, Card, Badge } from "@/components/ui";

// Used anywhere in the app
<Button variant="primary" size="lg">Click Me</Button>
<Card variant="glass">Content</Card>
<Badge variant="success">Active</Badge>
```

**When to add here**:

- Component used on 3+ different pages
- Generic UI pattern (buttons, inputs, cards)
- Part of design system

---

### 2. **layout/** - Layout Components

**Purpose**: Application structure and shell  
**Rules**:

- ✅ Used for page layout structure
- ✅ Appears on multiple/all pages
- ✅ Handles navigation and containers
- ✅ Can contain business logic for navigation

**Examples**:

```typescript
import { Header, Footer, Container } from "@/components/layout";

<Header />
<Container maxWidth="7xl">
  <YourContent />
</Container>
<Footer />
```

**When to add here**:

- Navigation components
- Page wrappers
- Persistent UI elements

---

### 3. **shared/** - Shared Feature Components

**Purpose**: Reusable components with some domain logic  
**Rules**:

- ✅ Used across 2+ different features/pages
- ✅ More specific than ui/ but not page-specific
- ✅ Can contain business logic
- ✅ Domain-aware (knows about app concepts)

**Examples**:

```typescript
// Future components
import { ScoreCircle, SkillBadge, StatusCard } from "@/components/shared";

// Used in both analyze and report pages
<ScoreCircle score={87} label="Overall Match" />
<SkillBadge skill="React" level={95} />
```

**When to add here**:

- Component used on 2+ pages
- Has domain knowledge (scores, skills, etc.)
- More than just presentation

---

### 4. **features/[page]/** - Page-Specific Components

**Purpose**: Components unique to one page/feature  
**Rules**:

- ✅ Only used on one specific page
- ✅ Can contain page-specific logic
- ✅ Can use ui, layout, and shared components
- ✅ Keep them focused and single-purpose

**Examples**:

```typescript
// features/landing/
export function HeroSection() { ... }
export function HeroVisual() { ... }

// features/report/
export function SkillsRadarChart() { ... }
export function RecommendationCard() { ... }
```

**When to add here**:

- Component only used on one page
- Complex page sections
- Page-specific visualizations

---

## Import Best Practices

### ✅ Good: Use Barrel Exports

```typescript
// Clean, organized imports
import { Button, Card, Badge } from "@/components/ui";
import { Header, Footer } from "@/components/layout";
import { HeroSection, CTASection } from "@/components/features/landing";
```

### ❌ Bad: Direct File Imports

```typescript
// Harder to refactor, couples to file structure
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
```

---

## Decision Tree: Where Does This Component Go?

```
Is it a basic UI element (button, input, card)?
├─ YES → components/ui/
└─ NO
    │
    Is it for layout/navigation (header, footer, container)?
    ├─ YES → components/layout/
    └─ NO
        │
        Used on 2+ different pages/features?
        ├─ YES → components/shared/
        └─ NO → components/features/[page]/
```

---

## Examples by Type

### UI Components (Primitives)

```typescript
// components/ui/Button.tsx
export function Button({ variant, size, children, icon }: ButtonProps) {
  return (
    <button className={...}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

// Usage: Everywhere
<Button variant="primary">Submit</Button>
```

### Layout Components

```typescript
// components/layout/Container.tsx
export function Container({ maxWidth, children }: ContainerProps) {
  return (
    <div className={`max-w-${maxWidth} mx-auto px-6`}>
      {children}
    </div>
  );
}

// Usage: All pages
<Container maxWidth="7xl">
  <PageContent />
</Container>
```

### Shared Components (Future)

```typescript
// components/shared/ScoreCircle.tsx
export function ScoreCircle({ score, label, size }: ScoreCircleProps) {
  return (
    <div className="score-circle">
      <svg>...</svg>
      <span>{score}%</span>
      <p>{label}</p>
    </div>
  );
}

// Usage: analyze/, report/, history/
<ScoreCircle score={87} label="Match Score" />
```

### Feature Components

```typescript
// components/features/landing/HeroSection.tsx
export function HeroSection() {
  return (
    <Container maxWidth="7xl">
      <h1>Landing page specific hero</h1>
      <Button variant="primary">Get Started</Button>
    </Container>
  );
}

// Usage: Only on landing page
```

---

## Migration Guide for New Pages

### Step 1: Identify Reusable Patterns

When creating components for a new page, ask:

- "Will this button/card/input be used elsewhere?" → **ui/**
- "Is this pattern already in ui/?" → **Reuse it!**
- "Will 2+ pages need this?" → **shared/**
- "Only for this page?" → **features/[page]/**

### Step 2: Build from Bottom Up

```typescript
// 1. Use existing ui/ components
import { Button, Card } from "@/components/ui";

// 2. Create page-specific components
// features/analyze/FileUploadSection.tsx
export function FileUploadSection() {
  return (
    <Card variant="glass">
      <Button variant="outline">Upload</Button>
    </Card>
  );
}

// 3. Compose in page
import { FileUploadSection } from "@/components/features/analyze";
```

---

## Refactoring Checklist

When you see duplicated code:

- [ ] Is it used in 2+ places?
- [ ] Could other pages benefit?
- [ ] Is it a generic UI pattern?
- [ ] Should it be in ui/ or shared/?
- [ ] Extract and update all usages

---

## Benefits of This Structure

✅ **Clarity** - Immediately know where components go  
✅ **Reusability** - ui/ components work everywhere  
✅ **Maintainability** - Change once, update everywhere  
✅ **Scalability** - Easy to add new pages/features  
✅ **Consistency** - Design system enforced  
✅ **Team-Friendly** - Clear conventions  
✅ **Testing** - Test primitives once  
✅ **Bundle Size** - No duplicate code

---

## Anti-Patterns to Avoid

❌ **Don't duplicate UI components** - Use ui/ instead  
❌ **Don't put page-specific in shared/** - Use features/  
❌ **Don't skip barrel exports** - Maintain index.ts files  
❌ **Don't couple to file structure** - Import from index  
❌ **Don't create mega components** - Keep them focused

---

## Real World Example: Report Page

```typescript
// ✅ Good: Use existing + new patterns
import { Card, Badge, Button } from "@/components/ui";
import { Container, Header, Footer } from "@/components/layout";
import {
  ScoreOverview,
  SkillsRadarChart,
  RecommendationCard
} from "@/components/features/report";

export default function ReportPage() {
  return (
    <>
      <Header />
      <Container maxWidth="7xl">
        <ScoreOverview />
        <SkillsRadarChart />
        <Card>
          <Badge variant="success">Recommended</Badge>
          <Button variant="primary">Download Report</Button>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
```

---

## Comparison: Old vs New

### Old Structure ❌

```
components/
├── landing/
│   ├── Button.tsx (duplicated)
│   ├── Footer.tsx (wrong place)
│   └── HeroSection.tsx
└── analyze/
    └── Button.tsx (duplicated!)
```

### New Structure ✅

```
components/
├── ui/
│   └── Button.tsx (used everywhere)
├── layout/
│   └── Footer.tsx (correct place)
├── shared/
│   └── ScoreCircle.tsx (used in 2+ pages)
└── features/
    ├── landing/
    │   └── HeroSection.tsx
    └── analyze/
        └── FileUploadSection.tsx (uses ui/Button)
```

---

## Summary

🎯 **The Rule**: More reusable = higher in the hierarchy

```
ui/       → Everywhere (highest reusability)
layout/   → Multiple pages
shared/   → 2+ features
features/ → Single page (lowest reusability)
```

This structure scales from small projects to enterprise applications.
