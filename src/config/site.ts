export type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

export const navigation: NavItem[] = [
  { label: '01. HOME', href: '#home', active: true },
  { label: '02. WORK', href: '#work' },
  { label: '03. ABOUT', href: '#about' },
  { label: '04. CONTACT', href: '#contact' },
];

export const links = {
  resume: '#resume',
  work: '#work',
  contact: '#contact',
};
