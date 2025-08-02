import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

// App backend plugin
backend.add(import('@backstage/plugin-app-backend'));

// Catalog plugin  
backend.add(import('@backstage/plugin-catalog-backend'));

backend.start();