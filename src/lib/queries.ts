
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
