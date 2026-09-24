const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const Icon = {
  Sun: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
    </svg>
  ),
  Moon: (p) => (
    <svg {...base} {...p}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  ),
  Menu: (p) => (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  ),
  Close: (p) => (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  Left: (p) => (
    <svg {...base} {...p}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  ),
  Right: (p) => (
    <svg {...base} {...p}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  ),
  Pin: (p) => (
    <svg {...base} {...p}>
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  ),
  Phone: (p) => (
    <svg {...base} {...p}>
      <path d="M5 4h3.2l1.6 4-2 1.3a11 11 0 0 0 5 5l1.3-2 4 1.6V17a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  ),
  Chat: (p) => (
    <svg {...base} {...p}>
      <path d="M4 19.5 5.3 16A8 8 0 1 1 8 18.7Z" />
      <path d="M9 10.5h6M9 13.5h4" />
    </svg>
  ),
  Bus: (p) => (
    <svg {...base} {...p}>
      <rect x="4.5" y="3.5" width="15" height="14" rx="3" />
      <path d="M4.5 11h15M8 17.5V20M16 17.5V20" />
      <circle cx="8.2" cy="14.3" r="0.9" fill="currentColor" />
      <circle cx="15.8" cy="14.3" r="0.9" fill="currentColor" />
    </svg>
  ),
  Food: (p) => (
    <svg {...base} {...p}>
      <path d="M3.5 12.5h17a8.5 8.5 0 0 1-17 0Z" />
      <path d="M9 9c0-1.5 1-1.5 1-3M13 9c0-1.5 1-1.5 1-3" />
    </svg>
  ),
  Shop: (p) => (
    <svg {...base} {...p}>
      <path d="M4 9.5 5.5 4h13L20 9.5" />
      <path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0" />
      <path d="M5.5 12v8h13v-8M10 20v-4.5h4V20" />
    </svg>
  ),
  Walk: (p) => (
    <svg {...base} {...p}>
      <circle cx="13" cy="4.5" r="1.8" />
      <path d="M10.5 21l2-6-2.5-2.5 1-4.5 3 2.5h3M9.5 8.5 7 11.5M13.5 15l2.5 6" />
    </svg>
  ),
  Clock: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  ),
  Star: (p) => (
    <svg {...base} {...p}>
      <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9Z" fill="currentColor" stroke="none" />
    </svg>
  ),
  Seat: (p) => (
    <svg {...base} {...p}>
      <path d="M7 11V5.5A1.5 1.5 0 0 1 8.5 4h7A1.5 1.5 0 0 1 17 5.5V11" />
      <path d="M5 11h14v3.5H5zM7 14.5V20M17 14.5V20" />
    </svg>
  ),
};

export const nearbyIcon = {
  bus: Icon.Bus,
  food: Icon.Food,
  shop: Icon.Shop,
  walk: Icon.Walk,
};
