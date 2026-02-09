
const apiKey = "54017650-0863-4436-a868-93409238101e";
const url = "https://api.sambanova.ai/v1/chat/completions";

async function testConnection() {
    console.log("Probando conexión a SambaNova...");
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "Meta-Llama-3.1-8B-Instruct",
                messages: [{ role: "user", content: "Ping" }],
                max_tokens: 10
            })
        });

        console.log("Status:", response.status, response.statusText);
        const text = await response.text();
        console.log("Response:", text);

    } catch (error) {
        console.error("Error de conexión:", error.message);
    }
}

testConnection();
