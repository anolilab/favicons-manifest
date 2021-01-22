import path from 'path';

export const fixture = (uri: string): string => {
    return path.resolve(__dirname, "..", "fixtures", uri)
}
