// OpenRouter Model Configuration
// Switch between different AI models easily

export const OPENROUTER_MODELS = {
    // ========== FREE MODELS ==========
    FREE_FAST: {
        id: "meta-llama/llama-3.1-8b-instruct:free",
        name: "Llama 3.1 8B (Free)",
        description: "Fast and free, good for simple worksheets",
        costPer1M: 0,
        speed: "⚡⚡⚡ Very Fast"
    },

    FREE_SMART: {
        id: "google/gemma-2-9b-it:free",
        name: "Gemma 2 9B (Free)",
        description: "Free Google model, balanced performance",
        costPer1M: 0,
        speed: "⚡⚡ Fast"
    },

    // ========== BUDGET MODELS ==========
    BUDGET_FAST: {
        id: "meta-llama/llama-3.1-70b-instruct",
        name: "Llama 3.1 70B",
        description: "Excellent quality, very affordable",
        costPer1M: 0.35, // $0.35 per 1M tokens
        speed: "⚡⚡ Fast"
    },

    BUDGET_SMART: {
        id: "google/gemini-flash-1.5",
        name: "Gemini Flash 1.5",
        description: "Google's fast model, great for education",
        costPer1M: 0.25,
        speed: "⚡⚡⚡ Very Fast"
    },

    // ========== PREMIUM MODELS ==========
    PREMIUM_GPT4: {
        id: "openai/gpt-4-turbo",
        name: "GPT-4 Turbo",
        description: "Best quality, complex reasoning",
        costPer1M: 10.0, // $10 per 1M tokens input
        speed: "⚡ Moderate"
    },

    PREMIUM_CLAUDE: {
        id: "anthropic/claude-3.5-sonnet",
        name: "Claude 3.5 Sonnet",
        description: "Anthropic's best, excellent at following instructions",
        costPer1M: 3.0,
        speed: "⚡ Moderate"
    },

    PREMIUM_GEMINI: {
        id: "google/gemini-pro-1.5",
        name: "Gemini Pro 1.5",
        description: "Google's premium model, large context",
        costPer1M: 2.5,
        speed: "⚡⚡ Fast"
    }
};

// Recommended model for different tasks
export const RECOMMENDED_MODELS = {
    simple_worksheet: OPENROUTER_MODELS.FREE_FAST,
    complex_worksheet: OPENROUTER_MODELS.BUDGET_FAST,
    exam_generation: OPENROUTER_MODELS.PREMIUM_GPT4,
    reading_comprehension: OPENROUTER_MODELS.BUDGET_SMART,
    english_class: OPENROUTER_MODELS.PREMIUM_GPT4, // Better for language accuracy
    default: OPENROUTER_MODELS.PREMIUM_GPT4
};

// Get model based on task type
export function getRecommendedModel(taskType = 'default') {
    return RECOMMENDED_MODELS[taskType] || RECOMMENDED_MODELS.default;
}

// Cost estimation
export function estimateCost(model, tokenCount) {
    const costPerToken = model.costPer1M / 1000000;
    return (costPerToken * tokenCount).toFixed(4);
}
