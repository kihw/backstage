import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

// App backend plugin
backend.add(import('@backstage/plugin-app-backend'));

// Catalog plugin
backend.add(import('@backstage/plugin-catalog-backend'));

// Events plugin
backend.add(import('@backstage/plugin-events-backend'));

backend.start();