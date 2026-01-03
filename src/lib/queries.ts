
export const homeQuery = `*[_type == "home"][0]{
  ...,
  "whyUsImage": whyUsImage.asset->url,
  "successCasesList": successCasesList[]{
    ...,
    "image": image.asset->url
  },
  "testimonialsList": testimonialsList[]{
    ...,
    "avatar": avatar.asset->url
  },
  "locationsMapImage": locationsMapImage.asset->url
}`;

export const cityQuery = `*[_type == "city" && slug.current == $slug][0]{
  ...
}`;

export const citySlugsQuery = `*[_type == "city" && defined(slug.current)][].slug.current`;

export const serviceQuery = `*[_type == "service" && slug.current == $slug][0]{
  ...
}`;

export const serviceSlugsQuery = `*[_type == "service" && defined(slug.current)][].slug.current`;

export const categoryPostsQuery = `*[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id)] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  mainImage,
  "categories": categories[]-> { title, "slug": slug.current },
  "author": author-> { name, "slug": slug.current }
}`;

export const categoryQuery = `*[_type == "category" && slug.current == $slug][0] {
  title,
  description
}`;

export const categoriesQuery = `*[_type == "category"] {
  title,
  "slug": slug.current
}`;
