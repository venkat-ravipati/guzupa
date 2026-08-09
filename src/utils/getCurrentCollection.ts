export function getCurrentCollection(): string {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    if (month >= 2 && month <= 6) {
        return `Spring / Summer ${year}`;
    }

    if (month >= 7 && month <= 9) {
        return `Monsoon ${year}`;
    }

    return `Autumn / Winter ${year}`;
}