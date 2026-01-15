const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
    projectId: '7f88m3q2',
    dataset: 'production',
    token: 'skZ6P3Zp4z5K1Yg9XQ0', // This token is invalid/placeholder. I need to ask the user to provide a token or use the CLI session.
    // Wait, I am running this locally on the user's machine where 'sanity login' has likely been run.
    // However, the JS client usually needs a token for write operations.
    // I will check if I can use 'sanity exec' which might inject the client with credentials.
    apiVersion: '2024-01-01',
    useCdn: false,
});

// Since I don't have the token, I should use the CLI to run this script or rely on existing config?
// Actually, 'sanity exec' is the best way to run scripts with authenticated client.
// I will rewrite this to be compatible with 'sanity exec'.

/* 
   To run with sanity exec:
   npx sanity exec studio-manya-dev/upload-images.js --with-user-token
*/

const images = [
    { slug: 'seo', path: 'C:/Users/theor/.gemini/antigravity/brain/0b3bf120-0ffc-4808-ac71-024150f81891/seo_hero_1768440127718.png' },
    { slug: 'diseno-web', path: 'C:/Users/theor/.gemini/antigravity/brain/0b3bf120-0ffc-4808-ac71-024150f81891/web_design_hero_1768440142824.png' },
    { slug: 'gestion-rrss', path: 'C:/Users/theor/.gemini/antigravity/brain/0b3bf120-0ffc-4808-ac71-024150f81891/social_media_hero_1768440157705.png' },
    { slug: 'performance-marketing', path: 'C:/Users/theor/.gemini/antigravity/brain/0b3bf120-0ffc-4808-ac71-024150f81891/performance_marketing_hero_1768440171891.png' },
    { slug: 'crm', path: 'C:/Users/theor/.gemini/antigravity/brain/0b3bf120-0ffc-4808-ac71-024150f81891/crm_hero_1768440194876.png' },
    { slug: 'automatizaciones', path: 'C:/Users/theor/.gemini/antigravity/brain/0b3bf120-0ffc-4808-ac71-024150f81891/automation_hero_1768440212558.png' },
    { slug: 'erp', path: 'C:/Users/theor/.gemini/antigravity/brain/0b3bf120-0ffc-4808-ac71-024150f81891/erp_hero_1768440228051.png' },
    { slug: 'cms', path: 'C:/Users/theor/.gemini/antigravity/brain/0b3bf120-0ffc-4808-ac71-024150f81891/cms_hero_1768440240863.png' },
    { slug: 'gestion-proyectos', path: 'C:/Users/theor/.gemini/antigravity/brain/0b3bf120-0ffc-4808-ac71-024150f81891/project_management_hero_1768440268158.png' },
    { slug: 'apps-medida', path: 'C:/Users/theor/.gemini/antigravity/brain/0b3bf120-0ffc-4808-ac71-024150f81891/custom_apps_hero_1768440283062.png' },
    { slug: 'base-datos', path: 'C:/Users/theor/.gemini/antigravity/brain/0b3bf120-0ffc-4808-ac71-024150f81891/database_hero_1768440298531.png' },
    { slug: 'paginas-web', path: 'C:/Users/theor/.gemini/antigravity/brain/0b3bf120-0ffc-4808-ac71-024150f81891/web_pages_hero_1768440313470.png' },
];

async function uploadImages(cliClient) {
    // Use the client passed from sanity exec if available, otherwise fallback (which will fail without token)
    const sanityClient = cliClient || client;

    for (const image of images) {
        if (!fs.existsSync(image.path)) {
            console.error(`File not found: ${image.path}`);
            continue;
        }

        try {
            console.log(`Uploading image for ${image.slug}...`);
            const fileStream = fs.createReadStream(image.path);
            const asset = await sanityClient.assets.upload('image', fileStream, {
                filename: path.basename(image.path)
            });

            console.log(`Image uploaded. Asset ID: ${asset._id}`);

            console.log(`Patching service document service-${image.slug}...`);

            // We are updating the 'howWeHelp' image field as it's the main one shown in the code snippet content.
            // Wait, the code snippet uses `service.howWeHelp.image` AND `service.factors.image` AND `service.position.image`.
            // The user request said "Hero images". But the schema has `hero` as an object without an image field?
            // Let's check schema again. `hero` has `h1` and `subservices`. 
            // `howWeHelp`, `factors`, `position` have images.
            // The frontend falls back to: `visuals.help`, `visuals.factors`, etc.

            // I will put the same image in ALL 3 places for now to ensure it covers everything.

            await sanityClient
                .patch(`service-${image.slug}`)
                .set({
                    'howWeHelp.image': {
                        _type: 'image',
                        asset: { _type: "reference", _ref: asset._id }
                    },
                    'factors.image': {
                        _type: 'image',
                        asset: { _type: "reference", _ref: asset._id }
                    },
                    'position.image': {
                        _type: 'image',
                        asset: { _type: "reference", _ref: asset._id }
                    }
                })
                .commit();

            console.log(`Document updated for ${image.slug}`);

        } catch (err) {
            console.error(`Failed to process ${image.slug}:`, err.message);
        }
    }
}

// Check if running via sanity exec (cliClient will be injected or available via context? No, usually imports working)
// When running with `sanity exec`, we can import 'part:@sanity/base/client' or utilize the fact that it runs in the studio context? 
// Actually, `sanity exec` just runs the script. We need to instantiate the client.
// But `sanity exec` provides credentials in environment variables? 
// The easiest way is to use `sanity documents create` or similar CLI commands, but we have logic.
// 
// Let's try to assume `sanity exec` sets up the env so we can use `getCliClient` from `import {getCliClient} from 'sanity/cli'`? 
// No, let's use the pattern where we require 'sanity' and create client. 
// IF we run `npx sanity exec <script> --with-user-token`, it should work if we use `getCliClient`?
// Let's try a simpler approach: define the function and export it, or run it.

// Let's just try running it with `npx sanity exec`. 
// Sanity v3 `exec` command runs the script. The script needs to import `createClient` (which we did).
// And we need a token. `sanity exec` with `--with-user-token` injects `SANITY_AUTH_TOKEN`? No.
// It injects a client instance? 
// The documentation says: "The script will have access to the same environment variables as the studio."
// 
// Let's try to use the `sanity` package's `getCliClient` if we are inside a studio folder.

const { getCliClient } = require('sanity/cli');

const cliClient = getCliClient({ apiVersion: '2024-01-01' });

uploadImages(cliClient);
