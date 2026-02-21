# Migration Guide: Apply Landing Page Pattern to Other Pages

## Overview

This guide shows how to apply the same optimization pattern used on the landing page to the remaining pages: `/analyze`, `/chat`, `/history`, and `/report`.

---

## Step-by-Step Process

### 1. Analyze the Current Page

```bash
# Open the page file
code app/(root)/[page]/page.tsx

# Ask these questions:
# - What are the main sections?
# - Are there inline SVGs?
# - What data is hardcoded?
# - What logic exists before the return?
```

### 2. Create Folder Structure

```bash
# For each page, create:
mkdir components/[page-name]
touch components/[page-name]/index.ts
touch types/[page-name].ts
touch constants/[page-name].ts

# If the page has client-side logic:
touch hooks/use[PageName].ts
```

### 3. Extract SVG Icons

```typescript
// If new icons are found, add to constants/icons.tsx
export const NewIcon = ({ className }: SVGProps<SVGSVGElement>) => (
  <svg>...</svg>
);
```

### 4. Identify and Create Components

Look for these patterns to split into components:

#### Common Sections to Extract:

- **Header/Hero** - Top section with title
- **Form** - Input areas
- **Results** - Display areas
- **Sidebar** - Side navigation
- **Actions** - Button groups
- **StatusBar** - Progress indicators
- **Cards** - Repeated card patterns

### 5. Define Types

```typescript
// types/[page].ts
export interface PageData {
  // Define your data structure
}

export interface PageProps {
  // Define your props
}
```

### 6. Extract Constants

```typescript
// constants/[page].ts
export const PAGE_CONFIG = {
  // Static configuration
};

export const DEFAULT_VALUES = {
  // Default form values
};

export const VALIDATION_RULES = {
  // Validation rules
};
```

### 7. Move Logic to Hooks

```typescript
// hooks/use[PageName].ts
export function usePageName() {
  // State management
  const [data, setData] = useState();

  // Side effects
  useEffect(() => {
    // Logic here
  }, []);

  // Event handlers
  const handleAction = () => {
    // Handler logic
  };

  // Return everything the component needs
  return {
    data,
    handleAction,
    isLoading,
    error,
  };
}
```

### 8. Clean Up Page Component

```typescript
// app/(root)/[page]/page.tsx
import { Metadata } from "next";
import { Component1, Component2 } from "@/components/[page]";

export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description"
};

export default function PageName() {
  return (
    <div>
      <Component1 />
      <Component2 />
    </div>
  );
}
```

---

## Example: Migrating `/analyze` Page

### Current Structure (Hypothetical)

```typescript
// app/(root)/analyze/page.tsx (200 lines)
export default function AnalyzePage() {
  // States
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);

  // Handlers
  const handleUpload = () => { ... };
  const handleAnalyze = () => { ... };

  return (
    <div>
      {/* File upload section */}
      <div>...</div>

      {/* Progress indicator */}
      <div>...</div>

      {/* Results display */}
      <div>...</div>
    </div>
  );
}
```

### Step 1: Create Structure

```bash
mkdir components/analyze
touch components/analyze/FileUploadSection.tsx
touch components/analyze/ProgressIndicator.tsx
touch components/analyze/ResultsDisplay.tsx
touch components/analyze/index.ts
touch types/analyze.ts
touch constants/analyze.ts
touch hooks/useAnalyze.ts
```

### Step 2: Define Types

```typescript
// types/analyze.ts
export interface AnalyzeResult {
  score: number;
  summary: string;
  details: string[];
}

export interface FileData {
  name: string;
  size: number;
  type: string;
}
```

### Step 3: Create Constants

```typescript
// constants/analyze.ts
export const ACCEPTED_FILE_TYPES = [".pdf", ".docx"];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ANALYSIS_STEPS = [
  "Parsing document",
  "Extracting skills",
  "Matching criteria",
  "Generating report",
];
```

### Step 4: Create Hook

```typescript
// hooks/useAnalyze.ts
export function useAnalyze() {
  const [file, setFile] = useState<FileData | null>(null);
  const [results, setResults] = useState<AnalyzeResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpload = (uploadedFile: File) => {
    setFile({
      name: uploadedFile.name,
      size: uploadedFile.size,
      type: uploadedFile.type,
    });
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Analysis logic here
    setIsAnalyzing(false);
  };

  return {
    file,
    results,
    isAnalyzing,
    handleUpload,
    handleAnalyze,
  };
}
```

### Step 5: Create Components

```typescript
// components/analyze/FileUploadSection.tsx
interface FileUploadSectionProps {
  onUpload: (file: File) => void;
}

export function FileUploadSection({ onUpload }: FileUploadSectionProps) {
  return (
    <div className="upload-area">
      {/* UI only */}
    </div>
  );
}

// components/analyze/ProgressIndicator.tsx
interface ProgressIndicatorProps {
  isAnalyzing: boolean;
  currentStep: number;
}

export function ProgressIndicator({ isAnalyzing, currentStep }: ProgressIndicatorProps) {
  return (
    <div className="progress">
      {/* UI only */}
    </div>
  );
}

// components/analyze/ResultsDisplay.tsx
interface ResultsDisplayProps {
  results: AnalyzeResult | null;
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  if (!results) return null;

  return (
    <div className="results">
      {/* UI only */}
    </div>
  );
}
```

### Step 6: Create Index

```typescript
// components/analyze/index.ts
export { FileUploadSection } from "./FileUploadSection";
export { ProgressIndicator } from "./ProgressIndicator";
export { ResultsDisplay } from "./ResultsDisplay";
```

### Step 7: Clean Page

```typescript
// app/(root)/analyze/page.tsx (30 lines)
import { Metadata } from "next";
import {
  FileUploadSection,
  ProgressIndicator,
  ResultsDisplay
} from "@/components/analyze";
import { useAnalyze } from "@/hooks/useAnalyze";

export const metadata: Metadata = {
  title: "Analyze CV - ATS Pro",
  description: "Upload and analyze candidate resumes"
};

export default function AnalyzePage() {
  const { file, results, isAnalyzing, handleUpload, handleAnalyze } = useAnalyze();

  return (
    <div className="container">
      <FileUploadSection onUpload={handleUpload} />
      <ProgressIndicator isAnalyzing={isAnalyzing} currentStep={0} />
      <ResultsDisplay results={results} />
    </div>
  );
}
```

---

## Checklist for Each Page

- [ ] Create component folder: `components/[page]/`
- [ ] Create types file: `types/[page].ts`
- [ ] Create constants file: `constants/[page].ts`
- [ ] Create hook file: `hooks/use[Page].ts` (if needed)
- [ ] Extract SVG icons to `constants/icons.tsx`
- [ ] Split page into logical components
- [ ] Move all state/logic to hooks
- [ ] Keep components as pure UI
- [ ] Add TypeScript types to everything
- [ ] Create barrel export: `components/[page]/index.ts`
- [ ] Add metadata export to page
- [ ] Test functionality
- [ ] Check for TypeScript errors
- [ ] Review code quality

---

## Quick Reference

### File Naming

- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Types: `camelCase.ts`
- Constants: `camelCase.ts`

### Import Pattern

```typescript
// Good ✅
import { Component } from "@/components/page";
import { useHook } from "@/hooks/useHook";
import { TYPE } from "@/types";
import { CONSTANT } from "@/constants";

// Bad ❌
import Component from "@/components/page/Component";
```

### Component Structure

```typescript
// 1. Imports
import { Icon } from "@/constants/icons";
import { Type } from "@/types/page";

// 2. Props interface
interface ComponentProps {
  prop: Type;
}

// 3. Component
export function Component({ prop }: ComponentProps) {
  return <div>UI only</div>;
}
```

### Hook Structure

```typescript
// 1. Imports
import { useState, useEffect } from "react";
import { Type } from "@/types/page";

// 2. Hook
export function usePageName() {
  // State
  const [state, setState] = useState<Type>();

  // Effects
  useEffect(() => {
    // Side effects
  }, []);

  // Handlers
  const handleAction = () => {
    // Logic
  };

  // Return API
  return {
    state,
    handleAction,
  };
}
```

---

## Benefits Reminder

✅ Maintainable - Easy to find and update
✅ Reusable - Components work anywhere
✅ Testable - Each piece tests independently
✅ Type-safe - Catch errors at compile time
✅ Scalable - Pattern works for any page
✅ Clean - UI separated from logic
✅ Fast - Static generation when possible
✅ Professional - Industry best practices
