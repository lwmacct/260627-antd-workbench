# @lwmacct/260627-antd-workbench

Opinionated React and Ant Design workbench primitives for dense operation consoles.

## Install

```bash
npm install @lwmacct/260627-antd-workbench
```

## Usage

```tsx
import "antd/dist/reset.css";
import "@lwmacct/260627-antd-workbench/styles.css";

import {
  WorkbenchAppearanceSettings,
  WorkbenchProvider,
  WorkbenchShell,
  WorkbenchSectionLayout,
} from "@lwmacct/260627-antd-workbench";
```

The package owns the workbench theme, shell layout, top navigation, responsive mobile menu, and section layout patterns. Applications should keep routing, authentication, data fetching, and business pages local.

## Appearance

`WorkbenchProvider` stores appearance as one local JSON object. Applications can
choose their own storage key and place the settings UI on any local settings
page.

```tsx
<WorkbenchProvider
  defaultAppearance={{
    accent: "#2388ff",
    density: "comfortable",
    mode: "dark",
    radius: 6,
  }}
  storageKey="app.appearance"
  withAntdApp
>
  {children}
</WorkbenchProvider>
```

```tsx
<WorkbenchAppearanceSettings />
```
