/**
 * Storybook interaction tests for appearance settings behavior.
 *
 * Covered scenarios:
 * - Theme controls render with the active mode highlighted.
 * - Selecting a different mode updates the active button state.
 *
 * These tests prevent regressions where appearance settings route wiring or
 * mode selection behavior breaks.
 */
import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { StoryTestParameters } from "@/stories/testing/storyTestContext";
import SettingsAppearancePage from "@/pages/SettingsAppearancePage/SettingsAppearancePage";
import withAppProviders from "@/stories/decorators/withAppProviders";
import withMemoryRouter from "@/stories/decorators/withMemoryRouter";

const baseStoryTest: NonNullable<StoryTestParameters["storyTest"]> = {
    router: {
        storyPath: "/settings/appearance",
        initialEntries: ["/settings/appearance"],
    },
    auth: {
        isLoggedIn: true,
        isLoading: false,
    },
};

const meta: Meta<typeof SettingsAppearancePage> = {
    title: "Pages/SettingsAppearancePage",
    component: SettingsAppearancePage,
    tags: ["autodocs"],
    decorators: [withMemoryRouter, withAppProviders],
    parameters: {
        layout: "fullscreen",
        storyTest: {
            ...baseStoryTest,
            appearance: {
                mode: "system",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof SettingsAppearancePage>;

export const Default: Story = {};

export const LightModeSelected: Story = {
    parameters: {
        storyTest: {
            ...baseStoryTest,
            appearance: {
                mode: "light",
            },
        },
    },
};

export const DarkModeSelected: Story = {
    parameters: {
        storyTest: {
            ...baseStoryTest,
            appearance: {
                mode: "dark",
            },
        },
    },
};

export const InteractiveThemeSelection: Story = {
    parameters: {
        storyTest: {
            ...baseStoryTest,
            appearance: {
                mode: "system",
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const systemButton = canvas.getByRole("button", {
            name: "System Default",
        });
        const lightButton = canvas.getByRole("button", { name: "Light Mode" });
        const darkButton = canvas.getByRole("button", { name: "Dark Mode" });

        expect(
            canvas.getByRole("group", { name: "Theme preference options" }),
        ).toBeVisible();
        expect(systemButton.className).toContain("button--primary");
        expect(lightButton.className).toContain("button--secondary");
        expect(darkButton.className).toContain("button--secondary");
        expect(systemButton).toHaveAttribute("aria-pressed", "true");
        expect(lightButton).toHaveAttribute("aria-pressed", "false");
        expect(darkButton).toHaveAttribute("aria-pressed", "false");

        await userEvent.click(lightButton);

        expect(systemButton.className).toContain("button--secondary");
        expect(lightButton.className).toContain("button--primary");
        expect(darkButton.className).toContain("button--secondary");
        expect(systemButton).toHaveAttribute("aria-pressed", "false");
        expect(lightButton).toHaveAttribute("aria-pressed", "true");
        expect(darkButton).toHaveAttribute("aria-pressed", "false");

        await userEvent.click(darkButton);

        expect(systemButton.className).toContain("button--secondary");
        expect(lightButton.className).toContain("button--secondary");
        expect(darkButton.className).toContain("button--primary");
        expect(systemButton).toHaveAttribute("aria-pressed", "false");
        expect(lightButton).toHaveAttribute("aria-pressed", "false");
        expect(darkButton).toHaveAttribute("aria-pressed", "true");
    },
};
