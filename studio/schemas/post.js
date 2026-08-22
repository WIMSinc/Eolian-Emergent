import { defineField, defineType } from "sanity";

/**
 * Blog post.
 *
 * Field set is deliberately lean — one author, no editorial workflow — but
 * every field either renders on the page or feeds structured data. The `faqs`
 * array is the deliberate AEO play: it emits FAQPage JSON-LD alongside the
 * BlogPosting schema, which is what answer engines quote directly.
 */
export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required().max(90).warning("Long titles get truncated in search results"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      description: "The URL. Once a post is live, changing this breaks existing links.",
      options: { source: "title", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description:
        "Shown on the index and used as the meta description when no SEO override is set. Aim for 120–160 characters.",
      validation: (r) => r.required().max(300),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "Describe the image for screen readers and search engines.",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt text" },
            { name: "caption", type: "string", title: "Caption" },
          ],
        },
      ],
    }),
    defineField({
      name: "faqs",
      title: "Common questions",
      description:
        "Optional. Renders at the end of the post and emits FAQPage structured data — the strongest signal for AI answer engines. Two to five entries works well.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", type: "string", validation: (r) => r.required() }),
            defineField({ name: "answer", type: "text", rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title override",
      type: "string",
      description: "Only set this if the post title does not work as a search result headline.",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description override",
      type: "text",
      rows: 2,
      description: "Defaults to the excerpt when empty.",
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "excerpt", media: "coverImage" },
  },
});
