import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file, glob } from 'astro/loaders';

const statItem = z.object({
  value: z.string(),
  label: z.string(),
  count: z.number().nullable(),
  before: z.string(),
  after: z.string(),
});

const hero = defineCollection({
  loader: file('src/content/sections/hero.json'),
  schema: z.object({
    badge: z.string(),
    phrases: z.array(z.string()),
    subheadline: z.string(),
    cta1: z.string(),
    cta2: z.string(),
    stats: z.array(statItem),
  }),
});

const about = defineCollection({
  loader: file('src/content/sections/about.json'),
  schema: z.object({
    badge: z.string(),
    title: z.string(),
    story: z.string(),
    detail: z.string(),
    promise: z.string(),
    highlights: z.array(z.object({ icon: z.string(), title: z.string(), desc: z.string() })),
    stats: z.array(statItem),
  }),
});

const services = defineCollection({
  loader: file('src/content/sections/services.json'),
  schema: z.object({
    badge: z.string(),
    title: z.string(),
    sub: z.string(),
    hint: z.string(),
    services: z.array(z.object({ num: z.string(), label: z.string(), desc: z.string() })),
    stats: z.array(z.object({ num: z.string(), plus: z.string(), label: z.string() })),
  }),
});

const qualifications = defineCollection({
  loader: file('src/content/sections/qualifications.json'),
  schema: z.object({
    badge: z.string(),
    title: z.string(),
    sub: z.string(),
    memberships: z.object({
      heading: z.string(),
      items: z.array(z.object({
        abbr: z.string(),
        name: z.string(),
        country: z.string(),
        desc: z.string(),
        color: z.string(),
      })),
    }),
    approvals: z.object({
      heading: z.string(),
      items: z.array(z.object({
        icon: z.string(),
        name: z.string(),
        detail: z.string(),
        authority: z.string(),
      })),
    }),
  }),
});

const consultant = defineCollection({
  loader: file('src/content/sections/consultant.json'),
  schema: z.object({
    badge: z.string(),
    title: z.string(),
    sub: z.string(),
    namePlaceholder: z.string(),
    emailPlaceholder: z.string(),
    messagePlaceholder: z.string(),
    submit: z.string(),
    info: z.array(z.object({
      icon: z.string(),
      label: z.string(),
      value: z.string(),
      href: z.string().nullable(),
    })),
  }),
});

const teamSection = defineCollection({
  loader: file('src/content/sections/team-section.json'),
  schema: z.object({
    badge: z.string(),
    title: z.string(),
    sub: z.string(),
    labels: z.object({
      about: z.string(),
      qualifications: z.string(),
      specializations: z.string(),
      viewCert: z.string(),
      founded: z.string(),
      experience: z.string(),
      clients: z.string(),
      certified: z.string(),
    }),
  }),
});

const contactSection = defineCollection({
  loader: file('src/content/sections/contact-section.json'),
  schema: z.object({
    badge: z.string(),
    title: z.string(),
    sub: z.string(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    arabicName: z.string(),
    credentials: z.string(),
    fullTitle: z.string(),
    role: z.object({ en: z.string(), ar: z.string() }),
    designation: z.string(),
    photo: z.string(),
    bio: z.object({ en: z.string(), ar: z.string() }),
    certificate: z.string(),
    qualifications: z.array(z.string()),
    specializations: z.array(z.string()),
    social: z.object({
      facebook: z.string().optional(),
      linkedin: z.string().optional(),
    }),
  }),
});

const contactInfo = defineCollection({
  loader: file('src/content/contact-info.json', {
    parser: (text) => ({ info: JSON.parse(text) }),
  }),
  schema: z.object({
    contact: z.object({
      address: z.object({
        en: z.string(),
        ar: z.string(),
        area: z.string(),
        city: z.string(),
        country: z.string(),
      }),
      phones: z.array(z.object({ number: z.string(), display: z.string(), type: z.string() })),
      email: z.string(),
      workingHours: z.object({
        days: z.object({ en: z.string(), ar: z.string() }),
        hours: z.string(),
        timezone: z.string(),
      }),
      social: z.object({
        facebook: z.object({ url: z.string(), label: z.string() }),
        linkedin: z.object({ url: z.string(), label: z.string() }),
      }),
      consultant: z.object({
        heading: z.object({ en: z.string(), ar: z.string() }),
        subheading: z.object({ en: z.string(), ar: z.string() }),
        formFields: z.array(z.object({
          name: z.string(),
          label: z.string(),
          type: z.string(),
          required: z.boolean(),
        })),
      }),
    }),
    externalLinks: z.array(z.object({ name: z.string(), url: z.string(), description: z.string() })),
  }),
});

export const collections = {
  hero,
  about,
  services,
  qualifications,
  consultant,
  teamSection,
  contactSection,
  team,
  contactInfo,
};
