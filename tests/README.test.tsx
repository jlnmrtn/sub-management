import { render, screen } from '@testing-library/react';
import fs from 'fs';
import path from 'path';

describe('README', () => {
  test('renders README file', () => {
    const readmeFilePath = path.join(process.cwd(), 'README.md');
    const readmeFileExists = fs.existsSync(readmeFilePath);
    expect(readmeFileExists).toBe(true);
  });
});
