export type SettingsSection = {
    /** Route path for the settings section */
    href: string;
    /** Short label used in navigation */
    label: string;
    /** Supporting description used in the settings hub */
    description: string;
};

export const settingsSections: Array<SettingsSection> = [
    {
        href: "/settings",
        label: "Overview",
        description:
            "Start here to choose the settings area you want to manage.",
    },
    {
        href: "/settings/password",
        label: "Password",
        description: "Update your password with current-password verification.",
    },
    {
        href: "/settings/email",
        label: "Email",
        description: "Change your sign-in email with a confirmation-code flow.",
    },
    {
        href: "/settings/appearance",
        label: "Appearance",
        description: "Customize your theme preference between light, dark, or system.",
    },
];
