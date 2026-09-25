// Free printable guides, one per language (see docs/seo-strategy.md §6).
// The same JSON feeds the /free-guide page and scripts/guides.mjs, which renders the PDFs into public/guides/.
import en from './en.json';
import uk from './uk.json';
import ru from './ru.json';

const GUIDES = { en, uk, ru };

export const getGuide = (lng) => GUIDES[lng] || GUIDES.en;
