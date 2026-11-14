import { useEffect } from 'react';

const DEFAULT_SITE_NAME = 'Vedaspark.pro';
const DEFAULT_TITLE = "Vedaspark.pro | JOB | CONSULTANCY | PLACEMENT";
const DEFAULT_DESC = 'Vedaspark.pro - Premier Job, HR Consultancy & Placement Portal. Find verified tech, engineering, sales & corporate career opportunities.';
const DEFAULT_KEYWORDS = 'vedaspark, vedaspark.pro, jobs, consultancy, placement, tech jobs, career opportunities, hiring portal';
const DEFAULT_OG_IMAGE = 'https://www.vedaspark.pro/images/vedaspark-logo.png';

export default function SEOHead({
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    ogType = 'website',
    jsonLd,
    noindex = false
}) {
    useEffect(() => {
        // 1. Update Document Title
        const pageTitle = title 
            ? (title.includes(DEFAULT_SITE_NAME) ? title : `${title} | ${DEFAULT_SITE_NAME}`)
            : DEFAULT_TITLE;
        document.title = pageTitle;

        // 2. Helper to set or create meta tag
        const setMeta = (attrName, attrValue, content) => {
            if (!content) return;
            let element = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attrName, attrValue);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        const pageDesc = description || DEFAULT_DESC;
        const pageKeywords = keywords || DEFAULT_KEYWORDS;
        const pageImage = ogImage || DEFAULT_OG_IMAGE;
        const pageUrl = canonicalUrl || window.location.href;

        // Standard Meta
        setMeta('name', 'description', pageDesc);
        setMeta('name', 'keywords', pageKeywords);
        setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

        // Open Graph / Facebook
        setMeta('property', 'og:title', pageTitle);
        setMeta('property', 'og:description', pageDesc);
        setMeta('property', 'og:image', pageImage);
        setMeta('property', 'og:url', pageUrl);
        setMeta('property', 'og:type', ogType);
        setMeta('property', 'og:site_name', DEFAULT_SITE_NAME);

        // Twitter Cards
        setMeta('name', 'twitter:card', 'summary_large_image');
        setMeta('name', 'twitter:title', pageTitle);
        setMeta('name', 'twitter:description', pageDesc);
        setMeta('name', 'twitter:image', pageImage);

        // 3. Canonical Link
        let canonicalElem = document.head.querySelector('link[rel="canonical"]');
        if (!canonicalElem) {
            canonicalElem = document.createElement('link');
            canonicalElem.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalElem);
        }
        canonicalElem.setAttribute('href', pageUrl);

        // 4. Schema.org JSON-LD
        let scriptElem = document.head.querySelector('#seo-json-ld');
        if (jsonLd) {
            if (!scriptElem) {
                scriptElem = document.createElement('script');
                scriptElem.setAttribute('id', 'seo-json-ld');
                scriptElem.setAttribute('type', 'application/ld+json');
                document.head.appendChild(scriptElem);
            }
            scriptElem.textContent = typeof jsonLd === 'string' ? jsonLd : JSON.stringify(jsonLd);
        } else if (scriptElem) {
            scriptElem.remove();
        }

        return () => {
            const script = document.head.querySelector('#seo-json-ld');
            if (script) script.remove();
        };
    }, [title, description, keywords, canonicalUrl, ogImage, ogType, jsonLd, noindex]);

    return null;
}
