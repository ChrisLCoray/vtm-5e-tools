/**
 * Houses commonly accessible tools
 */
import { SourceBooks } from './commonData';

// Common string
export function buildSourcePage(source: number | undefined, page: number | undefined): string {
    let sb: any;
    for (const [key, data] of Object.entries(SourceBooks)) {
        const book: any = data;
        if (book.id === source) {
            sb = data;
        }
    }
    return sb ? ` — Source: ${sb.abbr}, page ${page}` : '';
}

export function isNullOrUndefined(item: any): boolean {
    return typeof (item) === 'undefined' || item === undefined || item === 'undefined' || item === null || item === 'null';
}

export function convertStringDate(date: string): any {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        return date;
    } 
        const stringDate = `${d.getDate()  } ${  d.getMonth()  }, ${  d.getFullYear()}`;
        console.log(`stringDate = ${stringDate}`);
        return `${d.getDate()  } ${  d.getMonth()  }, ${  d.getFullYear()}`;
    
}

// Takes a prefix and a title, e.g. 'Date of Birth' and converts to DOM-friendly string ID
export function titleToId(prefix: string, title: string): string {
    return `${prefix  }-${  title ? title.toLowerCase().replace(/ /g, '-') : Math.floor(Math.random() * 1000) + 1}`;
}
