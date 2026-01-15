
export const homeQuery = `*[_type == "home"] | order(_updatedAt desc)[0]{
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
  ...,
  howWeHelp {
    ...,
    "image": image.asset->url
  },
  factors {
    ...,
    "image": image.asset->url
  },
  position {
    ...,
    "image": image.asset->url
  }
}`;

export const serviceSlugsQuery = `*[_type == "service" && defined(slug.current)][].slug.current`;

export const servicesQuery = `*[_type == "service"] {
  title,
  "slug": slug.current,
  meta,
  cta1
}`;

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
