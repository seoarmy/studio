
import { StructureResolver } from 'sanity/structure'
import { MapPin, Briefcase, Home, FileText, Users, Tag } from 'lucide-react'

export const structure: StructureResolver = (S) =>
    S.list()
        .title('Panel de Control')
        .items([
            S.listItem()
                .title('Página de Inicio')
                .icon(Home)
                .child(
                    S.document().schemaType('home').documentId('home').title('Editar Home')
                ),
            S.divider(),
            // --- GRUPO LANDINGS ---
            S.listItem()
                .title('Landing Pages')
                .child(
                    S.list()
                        .title('Templates de Landings')
                        .items([
                            S.listItem()
                                .title('Ciudades')
                                .icon(MapPin)
                                .child(
                                    S.documentTypeList('city')
                                        .title('Ciudades Disponibles')
                                ),
                            S.listItem()
                                .title('Servicios')
                                .icon(Briefcase)
                                .child(
                                    S.documentTypeList('service')
                                        .title('Servicios Detallados')
                                ),
                        ])
                ),
            S.divider(),
            // --- BLOG ---
            S.listItem()
                .title('Blog / Noticias')
                .icon(FileText)
                .child(
                    S.list()
                        .title('Contenido del Blog')
                        .items([
                            S.documentTypeListItem('post').title('Todos los Posts').icon(FileText),
                            S.documentTypeListItem('author').title('Autores').icon(Users),
                            S.documentTypeListItem('category').title('Categorías').icon(Tag),
                        ])
                ),
            // --- OTROS ---
            ...S.documentTypeListItems().filter(
                (listItem) => !['home', 'city', 'service', 'post', 'author', 'category'].includes(listItem.getId() || '')
            ),
        ])
