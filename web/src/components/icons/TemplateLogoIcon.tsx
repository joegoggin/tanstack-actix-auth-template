type TemplateLogoIconProps = {
    /** Whether to render the wordmark text next to the logo mark. */
    showWordmark?: boolean;
    /** Whether to render the subtitle under the wordmark. */
    showSubtitle?: boolean;
};

/**
 * A neutral template logo with a geometric mark and optional wordmark.
 *
 * ## Props
 *
 * - `showWordmark` - Whether to render the wordmark text next to the logo mark
 * - `showSubtitle` - Whether to render the subtitle under the wordmark
 *
 * ## Example
 *
 * ```tsx
 * <TemplateLogoIcon showWordmark={false} />
 * ```
 */
const TemplateLogoIcon: React.FC<TemplateLogoIconProps> = ({
    showWordmark = true,
    showSubtitle = true,
}) => {
    const showSubtitleText = showWordmark && showSubtitle;
    const wordmarkWidth = 180;
    const textX = 56;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={
                showWordmark
                    ? showSubtitleText
                        ? `0 0 ${wordmarkWidth} 58`
                        : `0 0 ${wordmarkWidth} 48`
                    : "0 0 48 48"
            }
            width={showWordmark ? `${wordmarkWidth}` : "48"}
            height={showWordmark ? (showSubtitleText ? "58" : "48") : "48"}
            fill="none"
        >
            <g className="template-logo__mark" transform="translate(4 4)">
                <rect
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                    rx="6"
                    fill="rgb(var(--brand-mark-primary-rgb, 122, 162, 247))"
                />
                <rect
                    x="16"
                    y="8"
                    width="24"
                    height="24"
                    rx="6"
                    fill="rgb(var(--brand-mark-secondary-rgb, 131, 192, 146))"
                />
                <path
                    d="M8 13h24"
                    stroke="rgb(var(--brand-mark-highlight-rgb, 236, 207, 164))"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                <path
                    d="M8 21h24"
                    stroke="rgb(var(--brand-mark-accent-rgb, 187, 154, 247))"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </g>
            {showWordmark ? (
                <>
                    <text
                        x={textX}
                        y={showSubtitleText ? "29" : "31"}
                        fill="currentColor"
                        fontFamily="Space Grotesk, sans-serif"
                        fontSize="24"
                        fontWeight="700"
                        letterSpacing="0.2"
                    >
                        Template
                    </text>
                    {showSubtitleText ? (
                        <text
                            x={textX}
                            y="43"
                            fill="currentColor"
                            fontFamily="Source Sans 3, sans-serif"
                            fontSize="10"
                            fontWeight="600"
                            letterSpacing="0.2"
                            opacity="0.86"
                        >
                            Auth starter kit
                        </text>
                    ) : null}
                </>
            ) : null}
        </svg>
    );
};

export default TemplateLogoIcon;
