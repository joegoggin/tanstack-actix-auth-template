
import styles from "./DashboardPage.module.scss";

/**
 * The authenticated dashboard page for signed-in users.
 * Displays dashboard content and provides a log-out action.
 *
 * Route: `/dashboard`
 *
 * ## Props
 *
 * - None.
 *
 * ## Related Components
 *
 * - `MainLayout` - Wraps the page with primary app navigation.
 */
function DashboardPage() {
    const quickStats = [
        {
            label: "Authentication",
            value: "Session Health",
            description: "Verify protected routes and signed-in access are behaving correctly.",
        },
        {
            label: "Account Security",
            value: "Credential Controls",
            description: "Use settings routes to validate password rotation and verified email changes.",
        },
        {
            label: "Recovery Flow",
            value: "Reset Readiness",
            description: "Run reset-code verification and password reset workflows end-to-end.",
        },
    ];

    return (
        <section className={styles["dashboard-page"]}>
            <header className={styles["dashboard-page__hero"]}>
                <p className={styles["dashboard-page__eyebrow"]}>Control center</p>
                <h1>Dashboard</h1>
                <p className={styles["dashboard-page__lead"]}>
                    Review core auth surfaces and move through the template from one place.
                </p>
            </header>

            <div className={styles["dashboard-page__grid"]}>
                {quickStats.map((stat) => (
                    <article key={stat.label} className={styles["dashboard-page__card"]}>
                        <p className={styles["dashboard-page__label"]}>{stat.label}</p>
                        <h2>{stat.value}</h2>
                        <p>{stat.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default DashboardPage;
