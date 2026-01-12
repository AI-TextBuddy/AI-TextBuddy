const generateBtn = document.getElementById('generateBtn');
const output = document.getElementById('output');

generateBtn.addEventListener('click', async () => {
    const prompt = document.getElementById('userInput').value;
    if (!prompt) {
        alert("Please enter a topic or product name!");
        return;
    }

    output.innerHTML = "Generating text...";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_OPENAI_API_KEY" // <- Замени с твоя ключ
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: `Write a professional product description for: ${prompt}`}],
                max_tokens: 200
            })
        });

        const data = await response.json();
        output.innerHTML = data.choices[0].message.content;
    } catch (err) {
        output.innerHTML = "Error generating text. Check your API key.";
        console.error(err);
    }
});
