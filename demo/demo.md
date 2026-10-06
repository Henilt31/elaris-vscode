# Elaris Workspace Specification

> "Clarity, light, and code."
> A clean VS Code theme designed for focused daylight coding.

## 1. Principles of Daylight Design

Elaris is engineered around five fundamental values:

1. **Clarity** — High readability without over-saturating token boundaries.
2. **Air** — Open, uncluttered layout with soft breathing room between panels.
3. **Depth** — Subtle surface tiers (`#F7F8FA`, `#FFFFFF`, `#F3F5F8`) without heavy borders.
4. **Precision** — Semantic color hierarchy indicating syntax role at a glance.
5. **Focus** — Neutralized noise that keeps attention fixed on logic and algorithms.

## 2. Code Demonstration

```typescript
import { Elaris } from '@elaris/theme';

const session = new Elaris({
  daylightMode: true,
  ambientContrast: 'soft',
});

await session.initialize();
```

* Inspect the project on GitHub: [Henilt31/elaris-vscode](https://github.com/Henilt31/elaris-vscode)
* Contributions and issues are welcomed.
