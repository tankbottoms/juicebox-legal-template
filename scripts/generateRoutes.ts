// Provided a docs folder, generate a routes file for the app to create a sidebar.
import fs from 'fs';

/**
Provided a filstructure

- docs/
    - Category1 (Top level folder is the category)
        - _category_.json (json file with the category name and position)
        - SubCategory1 (Sub level folder is the sub category)
            - _category_.json (json file with the sub category name and position)
            - file1.md (markdown file)
            - file2.md (markdown file)
        - SubCategory2 (Sub level folder is the sub category)
            - _category_.json (json file with the sub category name and position)
            - file1.md (markdown file)
            - file2.md (markdown file)
    - Category2
        ...

Generates a routes file for the app to create a sidebar.
*/

const dir = './src/docs';
const filterFormats = ['doc', 'docx', 'pdf', 'DS_Store'];

type Leaf = {
	label: string;
	leaf: string;
	position: number;
};

type RouteItem = {
	label: string;
	position: number;
	items?: RouteItem[];
	hasRootDoc?: boolean;
	path?: string;
	leaves?: Leaf[];
};

type Category = {
	label: string;
	position: number;
};

function readMarkdownFrontmatter(path: string): { [key: string]: string } {
	const markdown = fs.readFileSync(path, 'utf8');
	// Check if first line is a frontmatter
	const hasFrontmatter = markdown.split('\n')[0];
	if (!hasFrontmatter.startsWith('---')) {
		return {};
	}
	const frontmatter = markdown.split('---')[1];
	const frontmatterJson = frontmatter
		.split('\n')
		.map(line => line.split(': '))
		.reduce((acc, [key, value]) => {
			if (key && value) {
				acc[key] = value;
				return acc;
			} else return acc;
		}, {} as { [key: string]: string });
	return frontmatterJson;
}

function readCategoryJson(path: string): Category {
	const json = fs.readFileSync(path, 'utf8');
	return JSON.parse(json);
}

function recursiveCreateRoutes(path: string, fullPath = ''): RouteItem[] {
	const files = fs.readdirSync(path);
	const routes: RouteItem[] = [];
	for (const file of files) {
		const filePath = `${path}/${file}`;
		const stats = fs.statSync(filePath);
		if (filterFormats.includes(file.split('.')[1])) continue;

		if (stats.isDirectory()) {
			let categoryJson: Category = { label: '', position: 0 };
			try {
				categoryJson = readCategoryJson(`${filePath}/_category_.json`);
			} catch (e) {
				console.info('NOTE: No category json found for', filePath);
				continue;
			}
			// Check if the category has a README.md
			const readmePath = `${filePath}/README.md`;
			const readmeExists = fs.existsSync(readmePath);

			const items = recursiveCreateRoutes(filePath, `${fullPath}/${filePath}`);
			const item = {
				label: categoryJson.label,
				position: categoryJson.position,
				path: file,
				hasRootDoc: readmeExists
			} as RouteItem;

			item.leaves = [];
			item.items = [];

			for (const newItem of items) {
				if (typeof newItem === 'string') {
					const frontmatter = readMarkdownFrontmatter(`${path}/${item.path}/${newItem}`);
					item.leaves.push({
						leaf: newItem,
						label: frontmatter.title && frontmatter.title.replaceAll("'", ''),
						position: Number(frontmatter.sidebar_position)
					});
				} else {
					item.items.push(newItem);
				}
			}
			item.leaves = item.leaves.sort((a, b) => Number(a.position) - Number(b.position));
			item.items = item.items.sort((a, b) => Number(a.position) - Number(b.position));
			routes.push(item);
		} else {
			if (file.endsWith('.json')) {
				continue;
			}
			routes.push((`${file}` as unknown) as RouteItem);
		}
	}
	return routes;
}

const routes = recursiveCreateRoutes(dir);
const sortedRoutes = routes.sort((a: RouteItem, b: RouteItem) => {
	return Number(a.position) - Number(b.position);
});

fs.writeFileSync('./src/docs.json', JSON.stringify(sortedRoutes, null, 2));
