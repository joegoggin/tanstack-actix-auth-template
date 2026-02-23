import { createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { expect, userEvent, within } from "@storybook/test";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ThemeMode } from "@/lib/appearance";
import SettingsAppearancePage from "@/pages/SettingsAppearancePage/SettingsAppearancePage";
import { AuthContext } from "@/contexts/AuthContext";
import { AppearanceContext } from "@/contexts/AppearanceContext";

const rootRoute = createRootRoute();
const route = createRoute({
    getParentRoute: () => rootRoute,
    path: "/settings/appearance",
    component: SettingsAppearancePage,
});
const router = createRouter({
    routeTree: rootRoute.addChildren([route]),
    initialEntries: ["/settings/appearance"],
});

const AppearancePageWithContext = ({ initialMode = "system" as ThemeMode }) => {
    const [mode, setMode] = useState<ThemeMode>(initialMode);

    return (
        <AuthContext.Provider
            value={{
                user: {
                    id: "123",
                    email: "test@example.com",
                    first_name: "Test",
                    last_name: "User",
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    email_confirmed: true,
                },
                loading: false,
                isLoggedIn: true,
                refreshUser: async () => {},
                setUser: () => {},
                logout: async () => {},
            }}
        >
            <AppearanceContext.Provider
                value={{
                    mode,
                    setMode,
                    resolvedTheme: mode === "system" ? "light" : mode,
                }}
            >
                <RouterProvider router={router} />
            </AppearanceContext.Provider>
        </AuthContext.Provider>
    );
};

const meta: Meta<typeof AppearancePageWithContext> = {
    title: "Pages/SettingsAppearancePage",
    component: AppearancePageWithContext,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof AppearancePageWithContext>;

export const Default: Story = {
    args: {
        initialMode: "system",
    },
};

export const LightModeSelected: Story = {
    args: {
        initialMode: "light",
    },
};

export const DarkModeSelected: Story = {
    args: {
        initialMode: "dark",
    },
};

export const InteractiveThemeSelection: Story = {
    args: {
        initialMode: "system",
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        
        await step("Wait for component rendering", async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
        });
        
        // Find buttons using text since role mapping might be delayed or unavailable
        const systemBtn = canvas.getByText(/system default/i).closest('button') as HTMLButtonElement;
        const lightBtn = canvas.getByText(/light mode/i).closest('button') as HTMLButtonElement;
        const darkBtn = canvas.getByText(/dark mode/i).closest('button') as HTMLButtonElement;
        
        // Verify initial state
        expect(systemBtn.className).toContain("button--primary");
        expect(lightBtn.className).toContain("button--secondary");
        expect(darkBtn.className).toContain("button--secondary");

        // Click light mode
        await userEvent.click(lightBtn);
        
        // Verify state changed
        expect(systemBtn.className).toContain("button--secondary");
        expect(lightBtn.className).toContain("button--primary");
        expect(darkBtn.className).toContain("button--secondary");
        
        // Click dark mode
        await userEvent.click(darkBtn);
        
        // Verify state changed again
        expect(systemBtn.className).toContain("button--secondary");
        expect(lightBtn.className).toContain("button--secondary");
        expect(darkBtn.className).toContain("button--primary");
    },
};
