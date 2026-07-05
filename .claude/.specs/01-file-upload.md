# Landing page
## design system 
  -- use existing (global.css)
  -- Layout container: max-w-[1280px] mx-auto px-6.
  Section dividers: border-b border-border between every major section.

## Page structure

--  Build a long-scrolling landing page with these 7 sections in order.
1. Nav (sticky)
Sticky top header with backdrop-blur bg-background/80 and bottom border.
Left: logo (a small square with a rotated inner diamond) + wordmark "EQUINOX" + "v0.4" mono badge.
Center links (desktop only): Philosophy, Features, Pricing — smooth-scroll anchor links.
Right: "Sign in" (text link) and "Start free" (dark filled button).
No hamburger on mobile needed, but hide center links with hidden md:flex.
2. Hero
12-column grid (lg:grid-cols-12), left content spans 7 cols, right image spans 5.
Eyebrow: mono, uppercase, tiny, with a green dot — "01 / Project Operating System".
Headline: massive text-[clamp(40px,6vw,76px)] leading-[1.02], font-semibold, tracking-tight: "Ship work in the equilibrium of cost, time, and quality." (equilibrium is text-primary)
Subhead: text-[15px] text-muted max-w-xl leading-relaxed.
Two buttons: "Create a workspace" (dark filled, with ArrowUpRight icon) and "View live demo" (outlined).
Stats row below buttons (3 items): 48 teams onboarded, 214 projects shipped, 99.98% uptime. Values are large semibold tabular nums; labels are text-[10px] mono uppercase.
Right side: a rounded-xl bordered image container with a soft shadow. It displays a 1024×1024 image (use a placeholder div with a gradient or a src prop the user can swap later). Overlaid top-left with a small mono label: "fig.01 — the equilibrium model".
3. Logo strip
bg-secondary/40, bordered top and bottom.
Left label: "Trusted by ops-led teams" (mono tiny uppercase).
Right side: 6 fake company names in mono tracking-widest text, muted, spaced evenly: SOLARIS, NORTHWIND, HALCYON, VERTEX, MERIDIAN, ATLAS·CO.
4. Triangle (Philosophy)
ID: triangle
12-column header grid: left 5 cols has eyebrow "02 / The triangle" and h2 "You don't have to pick two." (44px, semibold, tracking-tight). Right side (col-start-7, span 6) has a muted paragraph explaining the cost-time-quality constraint triangle.
Below the text: a centered single image. max-w-[720px] w-full h-auto, rounded slightly if needed. Same image as hero (the triangle diagram). Alt text should describe a Cost-Time-Quality equilibrium diagram.
5. Features (Capabilities)
ID: features, bg-secondary/30
Intro block (max-w-2xl): eyebrow "03 / Capabilities", h2 "Opinionated where it matters. Flexible where it doesn't." (second line text-muted).
Three feature rows, each in a 12-column grid, alternating left/right image:
Row 1 (Workflows) — "Kanban, list, and timeline — same source of truth." Stats: 3 views, ∞ custom fields.
Row 2 (Multi-tenant) — "One identity. Many workspaces." Stats: RBAC built-in, SCIM ready.
Row 3 (Signals) — "Dashboards that read like instruments." Stats: 12+ metrics, 1s refresh.
Every row has an eyebrow in text-primary mono uppercase, a 28px semibold title, 14px muted copy, and a stat row with large tabular numbers + tiny mono labels.
The visual side of each row is a MiniMock (see below). On even rows, flip the grid direction so text is on the right and mock on the left.
MiniMock components (build these as small inline JSX blocks, not separate files):

Variant 0 (Kanban): A surface-colored card with 4 columns: Todo, In progress, Review, Done. Each column has 1–3 tiny placeholder task cards (white bg, rounded, with two gray lines inside). Mono column headers.
Variant 1 (Orgs): A stacked list of 4 org rows. Each row has a dark square avatar with 2-letter initials, org name, role badge (mono uppercase), and an arrow icon on the far right. Hover state hover:bg-secondary/40.
Variant 2 (Signals): A 2×2 grid of small metric cards (Active, Tasks due, Cycle time, Budget left) with large numbers and a small primary-colored delta label. Below that, a 12-bar chart made of thin rounded bars in bg-primary/80 with varying heights.
6. Pricing
ID: pricing
Intro: eyebrow "04 / Pricing", h2 "Pay only for active seats."
3-column grid (md:grid-cols-3):
Studio — $0, "per workspace, forever". Features: Up to 5 members, 3 active projects, Kanban + list views, Community support. CTA: "Start free" (outlined).
Team (featured) — $18, "per member / month". Dark card (bg-foreground text-background). Features: Unlimited projects, Timeline + dashboards, RBAC + invitation links, Priority support, Audit log. CTA: "Start 14-day trial" (white button). Add a small "popular" badge.
Enterprise — Custom, "annual contract". Features: SSO + SCIM, Custom data residency, Dedicated success, 99.99% SLA. CTA: "Talk to sales" (outlined).
Feature list items use a small check icon (text-success or text-primary) and 13px text.
7. CTA
12-column grid. Left 7 cols: eyebrow "05 / Equilibrium", h2 "Stop trading one constraint for another." + muted paragraph.
Right 5 cols: two buttons aligned right on desktop — "Create a workspace" (dark) and "Sign in" (outlined).
8. Footer
Simple flex row: left side logo mark + "EQUINOX" + copyright. Right side: Privacy, Terms, Status, Changelog links (muted, hover to foreground).
General styling rules:

Use only Tailwind utility classes. Do not write custom CSS.
All headings use tracking-tight and font-semibold.
Eyebrows/labels are font-mono text-[10px] uppercase tracking-widest text-muted (or text-primary when accenting).
Buttons and interactive elements should have transition-colors / transition-opacity.
Ensure text-primary is used sparingly: the word "equilibrium" in the hero, eyebrow labels in features, and metric deltas.
The page background is bg-background and text is text-foreground.
Output: Produce a single React component file (e.g., LandingPage.tsx) that exports the full page as the default component. Use lucide-react icons where needed (ArrowUpRight, Check, Minus). Use anchor <a> tags for in-page anchors and <Link> (or plain <a>) for "/login" and "/register".
