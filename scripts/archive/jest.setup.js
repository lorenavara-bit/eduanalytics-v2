const { TextEncoder, TextDecoder } = require('util');
const { TransformStream } = require('stream/web'); // Node 16.5+

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.TransformStream = TransformStream;

global.BroadcastChannel = class BroadcastChannel {
    constructor(name) {
        this.name = name;
        this.onmessage = null;
    }
    postMessage(message) { }
    close() { }
};

require('@testing-library/jest-dom');
require('whatwg-fetch');

// Mock environment variables
process.env.VITE_SUPABASE_URL = 'https://mock-supabase.co';
process.env.VITE_SUPABASE_ANON_KEY = 'mock-anon-key';
process.env.VITE_GEMINI_API_KEY = 'mock-gemini-key';
process.env.VITE_COMMERCIAL = 'false';
