// src/setupTests.js
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Vitest koppelen met jest-dom matchers
expect.extend(matchers);
 