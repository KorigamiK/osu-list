#!/usr/bin/env node

import { main } from "../dist/cli/main.js";

await main();

process.exit(0); // Realm doesn't exit on its own, see: realm-js#4535
