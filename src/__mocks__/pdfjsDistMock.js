module.exports = {
    getDocument: jest.fn(() => ({
        promise: Promise.resolve({
            numPages: 1,
            getPage: jest.fn(() => Promise.resolve({
                getTextContent: jest.fn(() => Promise.resolve({ items: [] })),
                getViewport: jest.fn(() => ({ width: 100, height: 100 })),
                render: jest.fn(() => ({ promise: Promise.resolve() })),
            })),
        }),
    })),
    GlobalWorkerOptions: {
        workerSrc: '',
    },
};
