import styles from "./HomePage.module.scss";
import RootLayout from "@/layouts/RootLayout/RootLayout";
import Button, { ButtonVariant } from "@/components/core/Button/Button";
import TemplateLogoIcon from "@/components/icons/TemplateLogoIcon";

/**
 * Props for the HomePage component.
 */
type HomePageProps = {
    /** Whether the user is currently authenticated */
    isLoggedIn: boolean;
};

/**
 * The home page and landing page for the template application.
 * Highlights the included authentication starter flows and provides
 * navigation to sign up, log in, or access the dashboard.
 *
 * Route: `/`
 *
 * ## Props
 *
 * - `isLoggedIn` - Whether the user is currently authenticated
 *
 * ## Related Components
 *
 * - `Button` - Used for navigation actions
 * - `RootLayout` - Global page layout wrapper
 * - `TemplateLogoIcon` - Displays the template logo mark
 */
function HomePage({ isLoggedIn }: HomePageProps) {
    const featureHighlights = [
        {
            title: "Complete auth flow included",
            description:
                "Start from sign up, email confirmation, log in, refresh-token rotation, and logout.",
        },
        {
            title: "Recover accounts safely",
            description:
                "Forgot-password, verify-reset-code, and set-password routes are wired end-to-end.",
        },
        {
            title: "Account security settings",
            description:
                "Authenticated password change and email change with verification are ready to use.",
        },
    ];

    const workflowSteps = [
        {
            title: "Create an account",
            description: "Sign up and confirm email ownership with a one-time code.",
        },
        {
            title: "Authenticate and persist session",
            description: "Log in with optional remember-me to test cookie-based sessions.",
        },
        {
            title: "Validate recovery and security flows",
            description: "Run password reset, password change, and email change workflows.",
        },
    ];

    return (
        <RootLayout className={styles["home-page"]} showAmbient={false}>
            <div className={styles["home-page__ambient"]} aria-hidden="true">
                <span className={styles["home-page__orb"]} />
                <span className={styles["home-page__orb"]} />
                <span className={styles["home-page__orb"]} />
                <span className={styles["home-page__orb"]} />
                <span className={styles["home-page__orb"]} />
                <span className={styles["home-page__orb"]} />
                <span className={styles["home-page__orb"]} />
                <span className={styles["home-page__orb"]} />
                <span className={styles["home-page__orb"]} />
                <span className={styles["home-page__orb"]} />
                <span className={styles["home-page__orb"]} />
                <span className={styles["home-page__orb"]} />
            </div>

            <main className={styles["home-page__content"]}>
                <section className={styles["home-page__hero"]}>
                    <div className={styles["home-page__hero-copy"]}>
                        <p className={styles["home-page__eyebrow"]}>TanStack + Actix starter</p>
                        <div
                            className={styles["home-page__logo"]}
                            aria-label="Template logo"
                            role="img"
                        >
                            <TemplateLogoIcon />
                        </div>
                        <h1>Launch secure apps from a neutral starter.</h1>
                        <p className={styles["home-page__lead"]}>
                            Build on a production-ready authentication foundation with reusable UI,
                            route guards, and testing workflows that scale with your project.
                        </p>
                        <div className={styles["home-page__buttons"]}>
                            {isLoggedIn ? (
                                <Button href="/dashboard">View Dashboard</Button>
                            ) : (
                                <>
                                    <Button href="/auth/sign-up">Sign Up</Button>
                                    <Button
                                        href="/auth/log-in"
                                        variant={ButtonVariant.SECONDARY}
                                    >
                                        Log In
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    <aside className={styles["home-page__hero-panel"]}>
                        <p className={styles["home-page__panel-label"]}>Workflow Preview</p>
                        <h2>Everything needed for a secure account baseline.</h2>
                        <ul className={styles["home-page__panel-points"]}>
                            <li>
                                <h3>Route protection</h3>
                                <p>Private routes gate dashboard and settings behind active sessions.</p>
                            </li>
                            <li>
                                <h3>Cookie-based sessions</h3>
                                <p>Access and refresh tokens are issued, rotated, and revoked securely.</p>
                            </li>
                            <li>
                                <h3>Recovery paths</h3>
                                <p>Password reset and account-security updates are fully integrated.</p>
                            </li>
                        </ul>
                    </aside>
                </section>

                <section className={styles["home-page__section"]}>
                    <h2>What this starter gives you</h2>
                    <div className={styles["home-page__feature-grid"]}>
                        {featureHighlights.map((feature) => (
                            <article
                                key={feature.title}
                                className={styles["home-page__feature-card"]}
                            >
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className={styles["home-page__section"]}>
                    <h2>Starter workflow from sign-up to account updates</h2>
                    <ol className={styles["home-page__steps"]}>
                        {workflowSteps.map((step, index) => (
                            <li key={step.title}>
                                <span>{index + 1}</span>
                                <div>
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>
            </main>
        </RootLayout>
    );
}

export default HomePage;
