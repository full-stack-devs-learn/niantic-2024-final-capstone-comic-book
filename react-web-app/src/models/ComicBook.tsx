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
    isInCollection?: boolean;
    isInWishlist?: boolean;
    imageUrl?: string;
    bookCondition?: string;
}