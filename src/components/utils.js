export const getOffset = (adjustment) => {
    if (typeof window !== "undefined") {
        const currentWidth = window.innerWidth;
        if (currentWidth <= 500) {
            if (adjustment) {
                return 410 - adjustment;
            } else {
                return 410;
            }

        }
    }
    return 70;
};



