import { useLocation } from "@tanstack/react-router";
import appearanceStyles from "./SettingsAppearancePage.module.scss";
import type { ThemeMode } from "@/lib/appearance";
import styles from "@/pages/SettingsPage/SettingsPage.module.scss";
import Button, { ButtonVariant } from "@/components/core/Button/Button";
import { useAuth } from "@/contexts/AuthContext";
import { settingsSections } from "@/pages/SettingsPage/settingsSections";
import { useAppearance } from "@/contexts/AppearanceContext";

/**
 * The authenticated appearance settings page.
 * Allows users to update the application's theme to light, dark, or system preference.
 *
 * Route: `/settings/appearance`
 *
 * ## Props
 *
 * - None.
 *
 * ## Related Components
 *
 * - `Button` - Allows the user to select the theme.
 */
function SettingsAppearancePage() {
    const { pathname } = useLocation();
    const { user } = useAuth();
    const { mode, setMode } = useAppearance();

    const handleThemeChange = (newMode: ThemeMode) => {
        setMode(newMode);
    };

    return (
        <section className={styles["settings-page"]}>
            <header className={styles["settings-page__hero"]}>
                <p className={styles["settings-page__eyebrow"]}>Preferences</p>
                <h1>Appearance</h1>
                <p className={styles["settings-page__lead"]}>
                    Customize the look and feel of your application.
                </p>
                {user?.email && (
                    <p className={styles["settings-page__current-email"]}>
                        Signed in as <strong>{user.email}</strong>
                    </p>
                )}
            </header>

            <nav
                className={styles["settings-page__subnav"]}
                aria-label="Settings sections"
            >
                {settingsSections.map((section) => {
                    const isActive =
                        pathname === section.href || pathname === `${section.href}/`;

                    return (
                        <Button
                            key={section.href}
                            href={section.href}
                            variant={
                                isActive
                                    ? ButtonVariant.PRIMARY
                                    : ButtonVariant.SECONDARY
                            }
                            className={styles["settings-page__subnav-button"]}
                        >
                            {section.label}
                        </Button>
                    );
                })}
            </nav>

            <article className={styles["settings-page__panel"]}>
                <h2>Theme Preference</h2>
                <p className={styles["settings-page__panel-lead"]}>
                    Select your preferred theme for the application.
                </p>
                
                <div className={appearanceStyles["appearance-page__theme-options"]}>
                    <Button 
                        variant={mode === "system" ? ButtonVariant.PRIMARY : ButtonVariant.SECONDARY}
                        onClick={() => handleThemeChange("system")}
                    >
                        System Default
                    </Button>
                    <Button 
                        variant={mode === "light" ? ButtonVariant.PRIMARY : ButtonVariant.SECONDARY}
                        onClick={() => handleThemeChange("light")}
                    >
                        Light Mode
                    </Button>
                    <Button 
                        variant={mode === "dark" ? ButtonVariant.PRIMARY : ButtonVariant.SECONDARY}
                        onClick={() => handleThemeChange("dark")}
                    >
                        Dark Mode
                    </Button>
                </div>
            </article>
        </section>
    );
}

export default SettingsAppearancePage;
