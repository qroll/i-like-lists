declare module "flexsearch" {

    interface SearchResults {
        field: string;
        result: number[];
    }

    export interface Index<T> {
        readonly id: string;
        readonly index: string;
        readonly length: number;

        init(options?: CreateOptions): this;
        info(): {
            id: any;
            items: any;
            cache: any;
            matcher: number;
            worker: any;
            threshold: any;
            depth: any;
            resolution: any;
            contextual: boolean;
        };
        add(o: T): this;
        add(id: number, o: T): this;

        search(
            query: string,
            options: number | SearchOptions,
            callback: (results: SearchResults[]) => void
        ): void;
        search(query: string, options?: number | SearchOptions): Promise<SearchResults[]>;
        search(
            options: SearchOptions & { query: string },
            callback: (results: SearchResults[]) => void
        ): void;
        search(options: SearchOptions & { query: string }): Promise<SearchResults[]>;

        update(id: number, o: T): this;
        remove(id: number): this;
        clear(): this;
        destroy(): this;
        addMatcher(matcher: Matcher): this;

        where(whereObj: { [key: string]: string } | ((o: T) => boolean)): T[];
        encode(str: string): string;
        export(): string;
        import(exported: string): this;
    }

    type DefaultTokenizer = "strict" | "forward" | "reverse" | "full";

    type StringIndex = string;
    type OptionIndex = {
        field: string;
        tokenize: DefaultTokenizer;
        optimize: boolean;
        resolution: number;
        minlength: number;
        context: {
            depth: number,
            resolution: number
        }
    }
    type ArrayIndex = (string | OptionIndex)[]
    type Index = StringIndex | ArrayIndex
    type DocumentToIndexSingleField = string
    type DocumentWithDefaultId = { index: Index }
    type DocumentWithKey = { key: string, index: Index }

    export interface CreateOptions {
        document?: DocumentToIndexSingleField | DocumentWithDefaultId | DocumentWithKey;
        tokenize: DefaultTokenizer;
    }

    interface Document<T> extends Index<T> {
        // it's ok
    }
    declare class Document<T = any> {
        constructor(options: CreateOptions)
    }
}

  // FlexSearch.create(<options>)
  // FlexSearch.registerMatcher({KEY: VALUE})
  // FlexSearch.registerEncoder(name, encoder)
  // FlexSearch.registerLanguage(lang, {stemmer:{}, filter:[]})
  // FlexSearch.encode(name, string)