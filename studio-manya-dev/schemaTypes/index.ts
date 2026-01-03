import { authorType } from './author'
import { categoryType } from './category'
import { postType } from './post'

import { home } from './pages/home'
import { city } from './pages/city'
import { service } from './pages/service'

export const schemaTypes = [postType, authorType, categoryType, home, city, service]
