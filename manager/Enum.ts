import { CVModel } from "../models/CVModel";

enum SortingCriteria {
    NameAscending = 0,
    NameDescending = 1,
    PercentageAscending = 2,
    PercentageDescending = 3
}

export function convertNumberToSortingCriteria(value: number): SortingCriteria {
    switch (value) {
        case 0:
            return SortingCriteria.NameAscending;
        case 1:
            return SortingCriteria.NameDescending;
        case 2:
            return SortingCriteria.PercentageAscending;
        case 3:
            return SortingCriteria.PercentageDescending;
        default:
            throw new Error("Invalid value");
    }
}

export function compare(a: CVModel, b: CVModel, sortingCriteria: SortingCriteria): number {
    switch (sortingCriteria) {
        case SortingCriteria.NameAscending:
            return a.filename.localeCompare(b.filename);
        case SortingCriteria.NameDescending:
            return b.filename.localeCompare(a.filename);
        case SortingCriteria.PercentageAscending:
            return a.percentage - b.percentage;
        case SortingCriteria.PercentageDescending:
            return b.percentage - a.percentage;
        default:
            throw new Error("Invalid sorting criteria");
    }
}

export default SortingCriteria;