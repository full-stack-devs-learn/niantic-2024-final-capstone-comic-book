// export class ComicBook
// {
//     comicBookId!: number;
//     marvelId?: number;
//     title!: string;
//     description?: string;
//     imageUrl?: string;
//     detailsUrl?: string;
//     bookCondition?: string;
//     year?: Date;
// }

export class ComicBook {
    comicBookId?: number;
    marvelId!: number;
    title!: string;
    description?: string;
    thumbnail?: { path: string; extension: string };
    urls?: { type: string; url: string }[];
    isInCollection?: boolean;
    isInWishlist?: boolean;
}