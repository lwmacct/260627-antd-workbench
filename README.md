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
  WorkbenchProvider,
  WorkbenchShell,
  WorkbenchSectionLayout,
} from "@lwmacct/260627-antd-workbench";
```

The package owns the workbench theme, shell layout, top navigation, responsive mobile menu, and section layout patterns. Applications should keep routing, authentication, data fetching, and business pages local.
