import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Verlofoverzicht from '../../../src/pages/Verlofoverzicht.jsx';
import '@testing-library/jest-dom/vitest';

// Mock navigate van React Router
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock Firestore functies
const mockGetDocs = vi.fn(() => ({
  forEach: (cb) => cb({ id: "1" }),  
}));

// Mock firebase
vi.mock("../firebase", () => ({
  db: {},
  Timestamp: {
    fromDate: vi.fn(() => new Date()),
  },
}));

// Mock Firebase Firestore 
const mockSetDoc = vi.fn();
const mockAddDoc = vi.fn();
const mockDoc = vi.fn(() => ({}));
const mockCollection = vi.fn();
const mockQuery = vi.fn();
const mockWhere = vi.fn();
const mockDocumentId = vi.fn();

vi.mock("firebase/firestore", () => ({
  getFirestore: vi.fn(() => ({})),
  getDocs: (...args) => mockGetDocs(...args),
  setDoc: (...args) => mockSetDoc(...args),
  addDoc: (...args) => mockAddDoc(...args),
  doc: (...args) => mockDoc(...args),
  collection: (...args) => mockCollection(...args),
  query: (...args) => mockQuery(...args),
  where: (...args) => mockWhere(...args),
  documentId: (...args) => mockDocumentId(...args),
}));

// Mock van localStorage 
beforeAll(() => {
  global.localStorage = {
    store: {},

    getItem: vi.fn(function (key) {
      return this.store[key] || null;
    }),

    setItem: vi.fn(function (key, value) {
      this.store[key] = String(value);
    }),

    removeItem: vi.fn(function (key) {
      delete this.store[key];
    }),

    clear: vi.fn(function () {
      this.store = {};
    }),
  };
});

// Ruimt de DOM op na elke test
afterEach(() => cleanup());

describe('Verlof Overzicht Geschiedenis Component', () => {
    it('geschiedenis toont alle aanvragen van ingelogde user in geschiedenis', async () => {
        //inloggen
        localStorage.setItem("userId", 7);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("rol", "manager");

        render(<Verlofoverzicht idsZichtbaar={true} />);

        await vi.waitFor(() => expect(screen.getByText('S3C1_testAanvraag_1')).toBeInTheDocument());

        // expect(screen.getByText('S3C1_testAanvraag_1')).toBeInTheDocument();
        // expect(screen.getByText('S3C1_testAanvraag_2')).toBeInTheDocument();
    });
});