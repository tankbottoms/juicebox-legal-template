import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import headings from './md_plugins/headings.js';
import { directive } from './md_plugins/directive.js';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [headings, remarkGfm, remarkParse, remarkFrontmatter, remarkDirective, directive],
	rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
});

export default config;
