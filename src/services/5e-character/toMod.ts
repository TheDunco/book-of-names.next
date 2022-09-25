export const toMod = (score: number): number => {
    if (score == 1) {
        return -5;
    }
    if (score == 2 || score == 3) {
        return -4;
    }
    if (score == 4 || score == 5) {
        return -3;
    }
    if (score == 6 || score == 7) {
        return -2;
    }
    if (score == 8 || score == 9) {
        return -1;
    }
    if (score == 10 || score == 11) {
        return 0;
    }
    if (score == 12 || score == 13) {
        return 1;
    }
    if (score == 14 || score == 15) {
        return 2;
    }
    if (score == 16 || score == 17) {
        return 3;
    }
    if (score == 18 || score == 19) {
        return 4;
    }
    if (score == 20 || score == 21) {
        return 5;
    }
    if (score == 22 || score == 23) {
        return 6;
    }
    if (score == 24 || score == 25) {
        return 7;
    }
    if (score == 26 || score == 27) {
        return 8;
    }
    if (score == 28 || score == 29) {
        return 9;
    }
    if (score == 30) {
        return 10;
    }
    return 0;
};
