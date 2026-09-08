import React from 'react';
import { Text, Area, Color, IconPicker, Repeater, StringList, Section } from './Fields';

// Every editor receives the section value plus a setter for one field.
// `set` replaces a single key; `patch` merges an object.

export const SiteEditor = ({ value, set }) => (
  <>
    <Section title="Brand" desc="Shown in the browser tab and used across the site.">
      <Text label="Brand name" value={value.brandName} onChange={(v) => set('brandName', v)} />
    </Section>
    <Section title="SEO & social" desc="Applied to the document head as you type.">
      <Text label="Page title" value={value.seoTitle} onChange={(v) => set('seoTitle', v)} />
      <Area label="Meta description" value={value.seoDescription} onChange={(v) => set('seoDescription', v)} rows={3} />
      <Area label="Keywords" value={value.seoKeywords} onChange={(v) => set('seoKeywords', v)} rows={2} hint="Comma-separated." />
      <Text label="Author" value={value.seoAuthor} onChange={(v) => set('seoAuthor', v)} />
    </Section>
  </>
);

export const ThemeEditor = ({ value, set }) => (
  <Section title="Accent colour" desc="Drives --primary-color across every page. Updates live.">
    <Color label="Primary colour" value={value.primaryColor} onChange={(v) => set('primaryColor', v)} />
  </Section>
);

export const NavEditor = ({ value, set }) => (
  <>
    <Section title="Navigation links" desc="Target is the id of the home-page section to scroll to.">
      <Repeater
        label="Links"
        items={value.links}
        onChange={(v) => set('links', v)}
        blank={{ label: 'New link', target: 'home' }}
        titleOf={(it) => it.label || 'Untitled'}
        fields={(item, update) => (
          <>
            <Text label="Label" value={item.label} onChange={(v) => update({ ...item, label: v })} />
            <Text label="Section id" value={item.target} onChange={(v) => update({ ...item, target: v })} hint="home · about · services · demo · contact" />
          </>
        )}
      />
    </Section>
    <Section title="Header button">
      <Text label="Button label" value={value.ctaLabel} onChange={(v) => set('ctaLabel', v)} />
    </Section>
  </>
);

export const HeroEditor = ({ value, set }) => (
  <>
    <Section title="Headline" desc="The accent word is highlighted in your brand colour.">
      <Text label="Badge line" value={value.badge} onChange={(v) => set('badge', v)} />
      <Text label="Title — before accent" value={value.titleLead} onChange={(v) => set('titleLead', v)} />
      <Text label="Accent word" value={value.titleAccent} onChange={(v) => set('titleAccent', v)} />
      <Text label="Title — after accent" value={value.titleTail} onChange={(v) => set('titleTail', v)} />
      <Area label="Subtitle" value={value.subtitle} onChange={(v) => set('subtitle', v)} />
    </Section>
    <Section title="Buttons">
      <Text label="Primary button" value={value.primaryCta} onChange={(v) => set('primaryCta', v)} />
      <Text label="Secondary link" value={value.secondaryCta} onChange={(v) => set('secondaryCta', v)} />
    </Section>
    <Section title="Trust badge">
      <Text label="Trust text" value={value.trustText} onChange={(v) => set('trustText', v)} />
      <Text label="Rating" value={value.rating} onChange={(v) => set('rating', v)} />
      <StringList label="Avatar image URLs" items={value.avatars} onChange={(v) => set('avatars', v)} placeholder="https://…" />
    </Section>
    <Section title="Background code fragments" desc="Ambient text drifting behind the hero. Twelve are positioned by CSS; extras will not be placed.">
      <StringList label="Fragments" items={value.codeFragments} onChange={(v) => set('codeFragments', v)} />
    </Section>
  </>
);

export const PartnersEditor = ({ value, set }) => (
  <Section title="Partner marquee" desc="Scrolls infinitely; the list is duplicated automatically.">
    <Text label="Heading" value={value.title} onChange={(v) => set('title', v)} />
    <Repeater
      label="Logos"
      items={value.logos}
      onChange={(v) => set('logos', v)}
      blank={{ name: 'New partner', icon: 'Cpu' }}
      titleOf={(it) => it.name}
      fields={(item, update) => (
        <>
          <Text label="Name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
          <IconPicker value={item.icon} onChange={(v) => update({ ...item, icon: v })} />
        </>
      )}
    />
  </Section>
);

export const StatsEditor = ({ value, set }) => (
  <>
    <Section title="Section intro">
      <Text label="Heading" value={value.heading} onChange={(v) => set('heading', v)} />
      <Area label="Intro" value={value.intro} onChange={(v) => set('intro', v)} />
    </Section>
    <Section title="Stat cards">
      <Repeater
        label="Stats"
        items={value.items}
        onChange={(v) => set('items', v)}
        blank={{ value: '0%', label: 'New stat', desc: '' }}
        titleOf={(it) => `${it.value} — ${it.label}`}
        fields={(item, update) => (
          <>
            <Text label="Big number" value={item.value} onChange={(v) => update({ ...item, value: v })} />
            <Text label="Label" value={item.label} onChange={(v) => update({ ...item, label: v })} />
            <Area label="Description" value={item.desc} onChange={(v) => update({ ...item, desc: v })} rows={2} />
          </>
        )}
      />
    </Section>
  </>
);

export const FeaturesEditor = ({ value, set }) => (
  <>
    <Section title="Section header">
      <Text label="Eyebrow" value={value.eyebrow} onChange={(v) => set('eyebrow', v)} />
      <Text label="Heading" value={value.heading} onChange={(v) => set('heading', v)} />
      <Area label="Intro" value={value.intro} onChange={(v) => set('intro', v)} />
    </Section>
    <Section title="Service cards">
      <Repeater
        label="Services"
        items={value.items}
        onChange={(v) => set('items', v)}
        blank={{ icon: 'Boxes', title: 'New service', desc: '' }}
        titleOf={(it) => it.title}
        fields={(item, update) => (
          <>
            <IconPicker value={item.icon} onChange={(v) => update({ ...item, icon: v })} />
            <Text label="Title" value={item.title} onChange={(v) => update({ ...item, title: v })} />
            <Area label="Description" value={item.desc} onChange={(v) => update({ ...item, desc: v })} />
          </>
        )}
      />
    </Section>
    <Section title="About card">
      <Text label="Eyebrow" value={value.aboutEyebrow} onChange={(v) => set('aboutEyebrow', v)} />
      <Text label="Heading" value={value.aboutHeading} onChange={(v) => set('aboutHeading', v)} />
      <StringList label="Paragraphs" items={value.aboutParagraphs} onChange={(v) => set('aboutParagraphs', v)} />
      <Text label="Button label" value={value.aboutCta} onChange={(v) => set('aboutCta', v)} />
    </Section>
  </>
);

export const IndustriesEditor = ({ value, set }) => (
  <>
    <Section title="Section header">
      <Text label="Eyebrow" value={value.eyebrow} onChange={(v) => set('eyebrow', v)} />
      <Text label="Heading" value={value.heading} onChange={(v) => set('heading', v)} />
      <Area label="Intro" value={value.intro} onChange={(v) => set('intro', v)} />
    </Section>
    <Section title="Industry tiles">
      <Repeater
        label="Industries"
        items={value.items}
        onChange={(v) => set('items', v)}
        blank={{ icon: 'Boxes', label: 'New industry' }}
        titleOf={(it) => it.label}
        fields={(item, update) => (
          <>
            <Text label="Label" value={item.label} onChange={(v) => update({ ...item, label: v })} />
            <IconPicker value={item.icon} onChange={(v) => update({ ...item, icon: v })} />
          </>
        )}
      />
    </Section>
  </>
);

export const DemoEditor = ({ value, set }) => (
  <>
    <Section title="Section header">
      <Text label="Eyebrow" value={value.eyebrow} onChange={(v) => set('eyebrow', v)} />
      <Text label="Heading" value={value.heading} onChange={(v) => set('heading', v)} />
      <Area label="Intro" value={value.intro} onChange={(v) => set('intro', v)} />
      <Text label="Primary button" value={value.primaryCta} onChange={(v) => set('primaryCta', v)} />
      <Text label="Secondary button" value={value.secondaryCta} onChange={(v) => set('secondaryCta', v)} />
    </Section>
    <Section title="Demo sites" desc="Each is loaded in an iframe. Sites that block embedding will show blank.">
      <Repeater
        label="Demos"
        items={value.items}
        onChange={(v) => set('items', v)}
        blank={{ name: 'New demo', url: 'https://' }}
        titleOf={(it) => it.name}
        fields={(item, update) => (
          <>
            <Text label="Name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
            <Text label="URL" value={item.url} onChange={(v) => update({ ...item, url: v })} />
          </>
        )}
      />
    </Section>
  </>
);

export const TechEditor = ({ value, set }) => (
  <Section title="Technology marquee">
    <Text label="Heading" value={value.title} onChange={(v) => set('title', v)} />
    <Repeater
      label="Technologies"
      items={value.items}
      onChange={(v) => set('items', v)}
      blank={{ name: 'New tech', icon: 'Code2' }}
      titleOf={(it) => it.name}
      fields={(item, update) => (
        <>
          <Text label="Name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
          <IconPicker value={item.icon} onChange={(v) => update({ ...item, icon: v })} />
        </>
      )}
    />
  </Section>
);

export const ProcessEditor = ({ value, set }) => (
  <>
    <Section title="Section header">
      <Text label="Eyebrow" value={value.eyebrow} onChange={(v) => set('eyebrow', v)} />
      <Text label="Heading" value={value.heading} onChange={(v) => set('heading', v)} />
      <Area label="Intro" value={value.intro} onChange={(v) => set('intro', v)} />
    </Section>
    <Section title="Process steps">
      <Repeater
        label="Steps"
        items={value.steps}
        onChange={(v) => set('steps', v)}
        blank={{ n: '06', title: 'New step', desc: '' }}
        titleOf={(it) => `${it.n} · ${it.title}`}
        fields={(item, update) => (
          <>
            <Text label="Number" value={item.n} onChange={(v) => update({ ...item, n: v })} />
            <Text label="Title" value={item.title} onChange={(v) => update({ ...item, title: v })} />
            <Area label="Description" value={item.desc} onChange={(v) => update({ ...item, desc: v })} rows={2} />
          </>
        )}
      />
    </Section>
  </>
);

export const ContactEditor = ({ value, set }) => (
  <Section title="Contact details" desc="Used in the contact section and the fallback error message.">
    <Text label="Heading" value={value.heading} onChange={(v) => set('heading', v)} />
    <Text label="Email" value={value.email} onChange={(v) => set('email', v)} />
    <Text label="Phone (displayed)" value={value.phone} onChange={(v) => set('phone', v)} />
    <Text label="Phone (tel: link)" value={value.phoneHref} onChange={(v) => set('phoneHref', v)} hint="Digits and + only, e.g. +919348386856" />
    <Area label="Address" value={value.address} onChange={(v) => set('address', v)} rows={2} />
  </Section>
);

export const FooterEditor = ({ value, set }) => (
  <>
    <Section title="Footer brand">
      <Area label="About text" value={value.about} onChange={(v) => set('about', v)} />
      <Text label="Copyright line" value={value.copyright} onChange={(v) => set('copyright', v)} hint="The year is added automatically." />
    </Section>
    <Section title="Social links" desc="Type picks the icon: linkedin, github, fiverr, or instagram.">
      <Repeater
        label="Socials"
        items={value.socials}
        onChange={(v) => set('socials', v)}
        blank={{ type: 'github', url: 'https://' }}
        titleOf={(it) => it.type}
        fields={(item, update) => (
          <>
            <Text label="Type" value={item.type} onChange={(v) => update({ ...item, type: v })} />
            <Text label="URL" value={item.url} onChange={(v) => update({ ...item, url: v })} />
          </>
        )}
      />
    </Section>
    <Section title="Link columns" desc="kind: 'section' scrolls the home page, 'route' navigates to a page.">
      <Repeater
        label="Columns"
        items={value.columns}
        onChange={(v) => set('columns', v)}
        blank={{ title: 'New column', links: [] }}
        titleOf={(it) => it.title}
        fields={(col, updateCol) => (
          <>
            <Text label="Column title" value={col.title} onChange={(v) => updateCol({ ...col, title: v })} />
            <Repeater
              label="Links"
              items={col.links}
              onChange={(v) => updateCol({ ...col, links: v })}
              blank={{ label: 'New link', href: '/', kind: 'route' }}
              titleOf={(l) => l.label}
              fields={(link, updateLink) => (
                <>
                  <Text label="Label" value={link.label} onChange={(v) => updateLink({ ...link, label: v })} />
                  <Text label="Href / section id" value={link.href} onChange={(v) => updateLink({ ...link, href: v })} />
                  <Text label="Kind" value={link.kind} onChange={(v) => updateLink({ ...link, kind: v })} hint="route or section" />
                </>
              )}
            />
          </>
        )}
      />
    </Section>
    <Section title="Legal links">
      <Repeater
        label="Legal links"
        items={value.legalLinks}
        onChange={(v) => set('legalLinks', v)}
        blank={{ label: 'New', href: '/' }}
        titleOf={(it) => it.label}
        fields={(item, update) => (
          <>
            <Text label="Label" value={item.label} onChange={(v) => update({ ...item, label: v })} />
            <Text label="Path" value={item.href} onChange={(v) => update({ ...item, href: v })} />
          </>
        )}
      />
    </Section>
  </>
);

// Shared header editor for the standalone pages.
const PageHeader = ({ value, set }) => (
  <Section title="Page header">
    <Text label="Eyebrow" value={value.eyebrow} onChange={(v) => set('eyebrow', v)} />
    <Text label="Title" value={value.title} onChange={(v) => set('title', v)} />
    <Area label="Intro" value={value.intro} onChange={(v) => set('intro', v)} />
  </Section>
);

export const MembersEditor = ({ value, set }) => (
  <>
    <PageHeader value={value} set={set} />
    <Section title="Team members" desc="Leave the image blank to show the placeholder avatar.">
      <Repeater
        label="Members"
        items={value.items}
        onChange={(v) => set('items', v)}
        blank={{ name: 'New member', role: 'Role', image: '', quote: '' }}
        titleOf={(it) => `${it.name} — ${it.role}`}
        fields={(item, update) => (
          <>
            <Text label="Name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
            <Text label="Role" value={item.role} onChange={(v) => update({ ...item, role: v })} />
            <Text label="Photo path" value={item.image} onChange={(v) => update({ ...item, image: v })} hint="e.g. /images/name.png — put the file in public/images/" />
            <Area label="Quote" value={item.quote} onChange={(v) => update({ ...item, quote: v })} />
          </>
        )}
      />
    </Section>
  </>
);

export const CareersEditor = ({ value, set }) => (
  <>
    <PageHeader value={value} set={set} />
    <Section title="Open positions">
      <Repeater
        label="Positions"
        items={value.positions}
        onChange={(v) => set('positions', v)}
        blank={{ title: 'New role', type: 'Full-time', location: 'Remote', desc: '' }}
        titleOf={(it) => it.title}
        fields={(item, update) => (
          <>
            <Text label="Title" value={item.title} onChange={(v) => update({ ...item, title: v })} />
            <Text label="Type" value={item.type} onChange={(v) => update({ ...item, type: v })} />
            <Text label="Location" value={item.location} onChange={(v) => update({ ...item, location: v })} />
            <Area label="Description" value={item.desc} onChange={(v) => update({ ...item, desc: v })} rows={2} />
          </>
        )}
      />
    </Section>
    <Section title="Bottom call to action">
      <Text label="Text" value={value.footerCtaText} onChange={(v) => set('footerCtaText', v)} />
      <Text label="Button label" value={value.footerCtaLabel} onChange={(v) => set('footerCtaLabel', v)} />
    </Section>
  </>
);

export const GalleryEditor = ({ value, set }) => (
  <>
    <PageHeader value={value} set={set} />
    <Section title="Gallery tiles" desc="Add an image path to replace the placeholder icon.">
      <Repeater
        label="Tiles"
        items={value.tiles}
        onChange={(v) => set('tiles', v)}
        blank={{ label: 'New tile', image: '' }}
        titleOf={(it) => it.label}
        fields={(item, update) => (
          <>
            <Text label="Caption" value={item.label} onChange={(v) => update({ ...item, label: v })} />
            <Text label="Image path" value={item.image} onChange={(v) => update({ ...item, image: v })} hint="e.g. /images/office.jpg" />
          </>
        )}
      />
    </Section>
  </>
);

export const StatusEditor = ({ value, set }) => (
  <>
    <PageHeader value={value} set={set} />
    <Section title="Status banner">
      <Text label="Banner text" value={value.bannerText} onChange={(v) => set('bannerText', v)} />
    </Section>
    <Section title="Monitored services">
      <Repeater
        label="Services"
        items={value.services}
        onChange={(v) => set('services', v)}
        blank={{ name: 'New service', status: 'Operational', uptime: '100%' }}
        titleOf={(it) => it.name}
        fields={(item, update) => (
          <>
            <Text label="Name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
            <Text label="Status" value={item.status} onChange={(v) => update({ ...item, status: v })} />
            <Text label="Uptime" value={item.uptime} onChange={(v) => update({ ...item, uptime: v })} />
          </>
        )}
      />
    </Section>
  </>
);

export const SecurityEditor = ({ value, set }) => (
  <>
    <PageHeader value={value} set={set} />
    <Section title="Security measures">
      <Repeater
        label="Measures"
        items={value.measures}
        onChange={(v) => set('measures', v)}
        blank={{ icon: 'ShieldCheck', title: 'New measure', desc: '' }}
        titleOf={(it) => it.title}
        fields={(item, update) => (
          <>
            <IconPicker value={item.icon} onChange={(v) => update({ ...item, icon: v })} />
            <Text label="Title" value={item.title} onChange={(v) => update({ ...item, title: v })} />
            <Area label="Description" value={item.desc} onChange={(v) => update({ ...item, desc: v })} />
          </>
        )}
      />
    </Section>
  </>
);

// Long-form body blocks shared by docs and blog posts.
const BodyBlocks = ({ blocks, onChange }) => (
  <Repeater
    label="Body"
    items={blocks}
    onChange={onChange}
    blank={{ type: 'p', text: '' }}
    titleOf={(b) => (b.type === 'h' ? `Heading — ${b.text.slice(0, 40)}` : `Paragraph — ${b.text.slice(0, 40)}`)}
    fields={(block, update) => (
      <>
        <label className="af">
          <span className="af-label">Type</span>
          <select className="af-input" value={block.type} onChange={(e) => update({ ...block, type: e.target.value })}>
            <option value="p">Paragraph</option>
            <option value="h">Heading</option>
          </select>
        </label>
        <Area label="Text" value={block.text} onChange={(v) => update({ ...block, text: v })} rows={5} />
      </>
    )}
  />
);

export const DocsEditor = ({ value, set }) => (
  <>
    <PageHeader value={value} set={set} />
    <Section title="Documentation pages" desc="Slug becomes the URL: /documentation/your-slug">
      <Repeater
        label="Docs"
        items={value.items}
        onChange={(v) => set('items', v)}
        blank={{ slug: 'new-doc', icon: 'BookOpen', title: 'New doc', desc: '', content: [] }}
        titleOf={(it) => it.title}
        fields={(item, update) => (
          <>
            <Text label="Title" value={item.title} onChange={(v) => update({ ...item, title: v })} />
            <Text label="Slug" value={item.slug} onChange={(v) => update({ ...item, slug: v })} />
            <IconPicker value={item.icon} onChange={(v) => update({ ...item, icon: v })} />
            <Area label="Summary" value={item.desc} onChange={(v) => update({ ...item, desc: v })} rows={2} />
            <BodyBlocks blocks={item.content} onChange={(v) => update({ ...item, content: v })} />
          </>
        )}
      />
    </Section>
  </>
);

export const BlogEditor = ({ value, set }) => (
  <>
    <PageHeader value={value} set={set} />
    <Section title="Blog posts" desc="Slug becomes the URL: /tech-blog/your-slug">
      <Repeater
        label="Posts"
        items={value.posts}
        onChange={(v) => set('posts', v)}
        blank={{ slug: 'new-post', tag: 'Engineering', date: '', readTime: '5 min read', title: 'New post', excerpt: '', content: [] }}
        titleOf={(it) => it.title}
        fields={(item, update) => (
          <>
            <Text label="Title" value={item.title} onChange={(v) => update({ ...item, title: v })} />
            <Text label="Slug" value={item.slug} onChange={(v) => update({ ...item, slug: v })} />
            <Text label="Tag" value={item.tag} onChange={(v) => update({ ...item, tag: v })} />
            <Text label="Date" value={item.date} onChange={(v) => update({ ...item, date: v })} />
            <Text label="Read time" value={item.readTime} onChange={(v) => update({ ...item, readTime: v })} />
            <Area label="Excerpt" value={item.excerpt} onChange={(v) => update({ ...item, excerpt: v })} />
            <BodyBlocks blocks={item.content} onChange={(v) => update({ ...item, content: v })} />
          </>
        )}
      />
    </Section>
  </>
);

export const LegalEditor = ({ value, set }) => (
  <>
    {Object.keys(value).map((slug) => {
      const page = value[slug];
      const updatePage = (next) => set(slug, next);
      return (
        <Section key={slug} title={page.title} desc={`/${slug}`}>
          <Text label="Eyebrow" value={page.eyebrow} onChange={(v) => updatePage({ ...page, eyebrow: v })} />
          <Text label="Title" value={page.title} onChange={(v) => updatePage({ ...page, title: v })} />
          <Text label="Effective date" value={page.effective} onChange={(v) => updatePage({ ...page, effective: v })} />
          <Area label="Intro" value={page.intro} onChange={(v) => updatePage({ ...page, intro: v })} />
          <Repeater
            label="Sections"
            items={page.sections}
            onChange={(v) => updatePage({ ...page, sections: v })}
            blank={{ heading: 'New section', body: [''] }}
            titleOf={(s) => s.heading}
            fields={(sec, updateSec) => (
              <>
                <Text label="Heading" value={sec.heading} onChange={(v) => updateSec({ ...sec, heading: v })} />
                <StringList label="Paragraphs" items={sec.body} onChange={(v) => updateSec({ ...sec, body: v })} />
              </>
            )}
          />
        </Section>
      );
    })}
  </>
);
