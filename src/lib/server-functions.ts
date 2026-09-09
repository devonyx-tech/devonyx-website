import { createServerFn } from "@tanstack/react-start";
import { getPosts, getPost, getCareerJobs, getProjects } from "./notion";

export const getPostsFn = createServerFn({ method: "GET" }).handler(
	async () => {
		return getPosts(false);
	},
);

export const getPostFn = createServerFn({ method: "GET" })
	.validator((data: { slug: string }) => data)
	.handler(async ({ data }) => {
		const post = await getPost(data.slug);
		if (!post) {
			throw new Error("Not found");
		}
		return post;
	});

export const getCareerJobsFn = createServerFn({ method: "GET" }).handler(
	async () => {
		return getCareerJobs();
	},
);

export const getProjectsFn = createServerFn({ method: "GET" }).handler(
	async () => {
		return getProjects();
	},
);