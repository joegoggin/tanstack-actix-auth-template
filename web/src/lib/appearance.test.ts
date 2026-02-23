/**
 * Unit tests for appearance preference persistence and theme initialization.
 *
 * Covered scenarios:
 * - Default preferences are used when storage is empty or malformed.
 * - Persisted theme mode is restored from storage.
 * - System-mode initialization resolves against `matchMedia`.
 * - System-theme subscription emits updates and unregisters listeners.
 *
 * These tests prevent regressions where appearance state is lost after refresh
 * or system theme updates fail to propagate.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AppearanceStorage } from "@/lib/appearance";
import {
    APPEARANCE_STORAGE_KEY,
    DEFAULT_APPEARANCE_PREFERENCES,
    initializeAppearance,
    loadAppearancePreferences,
    persistAppearancePreferences,
    subscribeToSystemTheme,
} from "@/lib/appearance";

const createMemoryStorage = (): AppearanceStorage => {
    const state = new Map<string, string>();

    return {
        getItem: (key: string) => {
            return state.get(key) ?? null;
        },
        setItem: (key: string, value: string) => {
            state.set(key, value);
        },
    };
};

const mockMatchMedia = (initialMatches: boolean) => {
    const originalMatchMedia = window.matchMedia;
    let matches = initialMatches;
    const listeners = new Set<(event: MediaQueryListEvent) => void>();

    const mediaQuery = {
        get matches() {
            return matches;
        },
        media: "(prefers-color-scheme: dark)",
        onchange: null,
        addEventListener: vi.fn(
            (eventName: string, listener: (event: MediaQueryListEvent) => void) => {
                if (eventName === "change") {
                    listeners.add(listener);
                }
            },
        ),
        removeEventListener: vi.fn(
            (eventName: string, listener: (event: MediaQueryListEvent) => void) => {
                if (eventName === "change") {
                    listeners.delete(listener);
                }
            },
        ),
        addListener: vi.fn((listener: (event: MediaQueryListEvent) => void) => {
            listeners.add(listener);
        }),
        removeListener: vi.fn((listener: (event: MediaQueryListEvent) => void) => {
            listeners.delete(listener);
        }),
        dispatchEvent: vi.fn(),
    };

    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation(() => mediaQuery),
    });

    return {
        mediaQuery,
        setMatches: (nextMatches: boolean) => {
            matches = nextMatches;
        },
        emitChange: (nextMatches: boolean) => {
            matches = nextMatches;
            const event = { matches: nextMatches } as MediaQueryListEvent;
            for (const listener of listeners) {
                listener(event);
            }
        },
        restore: () => {
            Object.defineProperty(window, "matchMedia", {
                writable: true,
                value: originalMatchMedia,
            });
        },
    };
};

describe("appearance helpers", () => {
    let storage: AppearanceStorage;

    beforeEach(() => {
        storage = createMemoryStorage();
        document.documentElement.removeAttribute("data-theme");
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("uses default appearance when storage is empty", () => {
        expect(loadAppearancePreferences(storage)).toEqual(
            DEFAULT_APPEARANCE_PREFERENCES,
        );
    });

    it("falls back to defaults when stored json is malformed", () => {
        storage.setItem(APPEARANCE_STORAGE_KEY, "{not-json");

        expect(loadAppearancePreferences(storage)).toEqual(
            DEFAULT_APPEARANCE_PREFERENCES,
        );
    });

    it("falls back to defaults when stored mode is invalid", () => {
        storage.setItem(
            APPEARANCE_STORAGE_KEY,
            JSON.stringify({ mode: "sepia" }),
        );

        expect(loadAppearancePreferences(storage)).toEqual(
            DEFAULT_APPEARANCE_PREFERENCES,
        );
    });

    it("restores persisted appearance mode", () => {
        persistAppearancePreferences({ mode: "dark" }, storage);

        expect(loadAppearancePreferences(storage)).toEqual({ mode: "dark" });
    });

    it("initializes theme from system preference when mode is system", () => {
        const mediaQueryMock = mockMatchMedia(true);

        try {
            persistAppearancePreferences({ mode: "system" }, storage);
            initializeAppearance(storage);

            expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

            mediaQueryMock.setMatches(false);
            initializeAppearance(storage);

            expect(document.documentElement.getAttribute("data-theme")).toBe("light");
        } finally {
            mediaQueryMock.restore();
        }
    });

    it("subscribes to system theme changes and cleans up listeners", () => {
        const mediaQueryMock = mockMatchMedia(false);
        const onThemeChange = vi.fn();

        try {
            const unsubscribe = subscribeToSystemTheme(onThemeChange);

            mediaQueryMock.emitChange(true);
            expect(onThemeChange).toHaveBeenCalledWith("dark");

            unsubscribe();
            expect(mediaQueryMock.mediaQuery.removeEventListener).toHaveBeenCalled();
        } finally {
            mediaQueryMock.restore();
        }
    });
});
