export type Widget = 'string' | 'text' | 'number' | 'image' | 'boolean' | 'list' | 'object';

export interface FieldDef {
  name: string;
  label: string;
  widget: Widget;
  /** For 'object': the fixed set of sub-fields. For 'list' of objects: the shape of each item (omit for a list of plain strings). */
  fields?: FieldDef[];
}

const statItem: FieldDef[] = [
  { name: 'value', label: 'Display value', widget: 'string' },
  { name: 'label', label: 'Label', widget: 'string' },
  { name: 'count', label: 'Count (for the counting animation)', widget: 'number' },
  { name: 'before', label: 'Prefix (e.g. "+")', widget: 'string' },
  { name: 'after', label: 'Suffix (e.g. "+")', widget: 'string' },
];

export const schemas: Record<string, FieldDef[]> = {
  cms_hero: [
    { name: 'badge', label: 'Badge', widget: 'string' },
    { name: 'phrases', label: 'Rotating phrases', widget: 'list' },
    { name: 'subheadline', label: 'Subheadline', widget: 'text' },
    { name: 'cta1', label: 'Primary button text', widget: 'string' },
    { name: 'cta2', label: 'Secondary button text', widget: 'string' },
    { name: 'stats', label: 'Stats', widget: 'list', fields: statItem },
  ],
  cms_about: [
    { name: 'badge', label: 'Badge', widget: 'string' },
    { name: 'title', label: 'Title', widget: 'string' },
    { name: 'story', label: 'Story', widget: 'text' },
    { name: 'detail', label: 'Detail', widget: 'text' },
    { name: 'promise', label: 'Promise', widget: 'text' },
    {
      name: 'highlights',
      label: 'Highlights',
      widget: 'list',
      fields: [
        { name: 'icon', label: 'Icon (emoji)', widget: 'string' },
        { name: 'title', label: 'Title', widget: 'string' },
        { name: 'desc', label: 'Description', widget: 'text' },
      ],
    },
    { name: 'stats', label: 'Stats', widget: 'list', fields: statItem },
  ],
  cms_services: [
    { name: 'badge', label: 'Badge', widget: 'string' },
    { name: 'title', label: 'Title', widget: 'string' },
    { name: 'sub', label: 'Subtitle', widget: 'text' },
    { name: 'hint', label: 'Hint text', widget: 'string' },
    {
      name: 'services',
      label: 'Services',
      widget: 'list',
      fields: [
        { name: 'num', label: 'Number', widget: 'string' },
        { name: 'label', label: 'Label', widget: 'string' },
        { name: 'desc', label: 'Description', widget: 'text' },
      ],
    },
    {
      name: 'stats',
      label: 'Stats',
      widget: 'list',
      fields: [
        { name: 'num', label: 'Number', widget: 'string' },
        { name: 'plus', label: 'Suffix (e.g. "+")', widget: 'string' },
        { name: 'label', label: 'Label', widget: 'string' },
      ],
    },
  ],
  cms_qualifications: [
    { name: 'badge', label: 'Badge', widget: 'string' },
    { name: 'title', label: 'Title', widget: 'string' },
    { name: 'sub', label: 'Subtitle', widget: 'text' },
    {
      name: 'memberships',
      label: 'Professional memberships',
      widget: 'object',
      fields: [
        { name: 'heading', label: 'Heading', widget: 'string' },
        {
          name: 'items',
          label: 'Memberships',
          widget: 'list',
          fields: [
            { name: 'abbr', label: 'Abbreviation', widget: 'string' },
            { name: 'name', label: 'Full name', widget: 'string' },
            { name: 'country', label: 'Country', widget: 'string' },
            { name: 'desc', label: 'Description', widget: 'text' },
            { name: 'color', label: 'Color (hex)', widget: 'string' },
          ],
        },
      ],
    },
    {
      name: 'approvals',
      label: 'Regulatory approvals',
      widget: 'object',
      fields: [
        { name: 'heading', label: 'Heading', widget: 'string' },
        {
          name: 'items',
          label: 'Approvals',
          widget: 'list',
          fields: [
            { name: 'icon', label: 'Icon (emoji)', widget: 'string' },
            { name: 'name', label: 'Name', widget: 'string' },
            { name: 'detail', label: 'Detail', widget: 'text' },
            { name: 'authority', label: 'Authority', widget: 'string' },
          ],
        },
      ],
    },
  ],
  cms_consultant: [
    { name: 'badge', label: 'Badge', widget: 'string' },
    { name: 'title', label: 'Title', widget: 'string' },
    { name: 'sub', label: 'Subtitle', widget: 'text' },
    { name: 'name_placeholder', label: 'Name field placeholder', widget: 'string' },
    { name: 'email_placeholder', label: 'Email field placeholder', widget: 'string' },
    { name: 'message_placeholder', label: 'Message field placeholder', widget: 'string' },
    { name: 'submit', label: 'Submit button text', widget: 'string' },
    {
      name: 'info',
      label: 'Contact info rows',
      widget: 'list',
      fields: [
        { name: 'icon', label: 'Icon (emoji)', widget: 'string' },
        { name: 'label', label: 'Label', widget: 'string' },
        { name: 'value', label: 'Value', widget: 'string' },
        { name: 'href', label: 'Link (tel:/mailto:, optional)', widget: 'string' },
      ],
    },
  ],
  cms_team_section: [
    { name: 'badge', label: 'Badge', widget: 'string' },
    { name: 'title', label: 'Title', widget: 'string' },
    { name: 'sub', label: 'Subtitle', widget: 'text' },
    {
      name: 'labels',
      label: 'UI labels',
      widget: 'object',
      fields: [
        { name: 'about', label: 'About', widget: 'string' },
        { name: 'qualifications', label: 'Qualifications', widget: 'string' },
        { name: 'specializations', label: 'Specializations', widget: 'string' },
        { name: 'viewCert', label: 'View certificate', widget: 'string' },
        { name: 'founded', label: 'Founded', widget: 'string' },
        { name: 'experience', label: 'Experience', widget: 'string' },
        { name: 'clients', label: 'Clients', widget: 'string' },
        { name: 'certified', label: 'Certified', widget: 'string' },
      ],
    },
  ],
  cms_contact_section: [
    { name: 'badge', label: 'Badge', widget: 'string' },
    { name: 'title', label: 'Title', widget: 'string' },
    { name: 'sub', label: 'Subtitle', widget: 'text' },
  ],
  cms_team: [
    { name: 'name', label: 'Name (English)', widget: 'string' },
    { name: 'arabic_name', label: 'Name (Arabic)', widget: 'string' },
    { name: 'credentials', label: 'Credentials (e.g. ACCA)', widget: 'string' },
    { name: 'full_title', label: 'Full title', widget: 'string' },
    {
      name: 'role',
      label: 'Role',
      widget: 'object',
      fields: [
        { name: 'en', label: 'English', widget: 'string' },
        { name: 'ar', label: 'Arabic', widget: 'string' },
      ],
    },
    { name: 'designation', label: 'Designation', widget: 'string' },
    { name: 'photo', label: 'Photo path/URL', widget: 'image' },
    {
      name: 'bio',
      label: 'Bio',
      widget: 'object',
      fields: [
        { name: 'en', label: 'English', widget: 'text' },
        { name: 'ar', label: 'Arabic', widget: 'text' },
      ],
    },
    { name: 'certificate', label: 'Certificate image path/URL', widget: 'image' },
    { name: 'qualifications', label: 'Qualifications', widget: 'list' },
    { name: 'specializations', label: 'Specializations', widget: 'list' },
    {
      name: 'social',
      label: 'Social links',
      widget: 'object',
      fields: [
        { name: 'facebook', label: 'Facebook URL', widget: 'string' },
        { name: 'linkedin', label: 'LinkedIn URL', widget: 'string' },
      ],
    },
  ],
  cms_contact_info: [
    {
      name: 'contact',
      label: 'Contact details',
      widget: 'object',
      fields: [
        {
          name: 'address',
          label: 'Address',
          widget: 'object',
          fields: [
            { name: 'en', label: 'English', widget: 'text' },
            { name: 'ar', label: 'Arabic', widget: 'text' },
            { name: 'area', label: 'Area', widget: 'string' },
            { name: 'city', label: 'City', widget: 'string' },
            { name: 'country', label: 'Country', widget: 'string' },
          ],
        },
        {
          name: 'phones',
          label: 'Phone numbers',
          widget: 'list',
          fields: [
            { name: 'number', label: 'Number (for tel: link)', widget: 'string' },
            { name: 'display', label: 'Display text', widget: 'string' },
            { name: 'type', label: 'Type (landline/mobile)', widget: 'string' },
          ],
        },
        { name: 'email', label: 'Email', widget: 'string' },
        {
          name: 'workingHours',
          label: 'Working hours',
          widget: 'object',
          fields: [
            {
              name: 'days',
              label: 'Days',
              widget: 'object',
              fields: [
                { name: 'en', label: 'English', widget: 'string' },
                { name: 'ar', label: 'Arabic', widget: 'string' },
              ],
            },
            { name: 'hours', label: 'Hours', widget: 'string' },
            { name: 'timezone', label: 'Timezone', widget: 'string' },
          ],
        },
        {
          name: 'social',
          label: 'Social links',
          widget: 'object',
          fields: [
            {
              name: 'facebook',
              label: 'Facebook',
              widget: 'object',
              fields: [
                { name: 'url', label: 'URL', widget: 'string' },
                { name: 'label', label: 'Label', widget: 'string' },
              ],
            },
            {
              name: 'linkedin',
              label: 'LinkedIn',
              widget: 'object',
              fields: [
                { name: 'url', label: 'URL', widget: 'string' },
                { name: 'label', label: 'Label', widget: 'string' },
              ],
            },
          ],
        },
        {
          name: 'consultant',
          label: 'Consultation form copy',
          widget: 'object',
          fields: [
            {
              name: 'heading',
              label: 'Heading',
              widget: 'object',
              fields: [
                { name: 'en', label: 'English', widget: 'string' },
                { name: 'ar', label: 'Arabic', widget: 'string' },
              ],
            },
            {
              name: 'subheading',
              label: 'Subheading',
              widget: 'object',
              fields: [
                { name: 'en', label: 'English', widget: 'string' },
                { name: 'ar', label: 'Arabic', widget: 'string' },
              ],
            },
            {
              name: 'formFields',
              label: 'Form fields',
              widget: 'list',
              fields: [
                { name: 'name', label: 'Field name', widget: 'string' },
                { name: 'label', label: 'Field label', widget: 'string' },
                { name: 'type', label: 'Field type', widget: 'string' },
                { name: 'required', label: 'Required', widget: 'boolean' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'external_links',
      label: 'External links',
      widget: 'list',
      fields: [
        { name: 'name', label: 'Name', widget: 'string' },
        { name: 'url', label: 'URL', widget: 'string' },
        { name: 'description', label: 'Description', widget: 'text' },
      ],
    },
  ],
};

export const resourceLabels: Record<string, string> = {
  cms_hero: 'Hero',
  cms_about: 'About',
  cms_services: 'Services',
  cms_qualifications: 'Qualifications',
  cms_consultant: 'Consultant form',
  cms_team_section: 'Team section',
  cms_contact_section: 'Contact section',
  cms_team: 'Team members',
  cms_contact_info: 'Contact info',
};
