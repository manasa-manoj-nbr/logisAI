document.addEventListener("DOMContentLoaded", () => {
    const chatMessages = document.getElementById("chatMessages");
    const chatForm = document.getElementById("chatForm");
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");

    userInput.addEventListener("input", () => {
        userInput.style.width = "auto";
        userInput.style.width = userInput.scrollHeight + "px";
    });

    chatForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (!message) return;
        const user = addMessage(message, true);
        userInput.value = ""
        userInput.style.height = "auto";
        sendButton.disabled = true;
        const typing = typeLoading()
        try {
            const response = await generateResponse(message);
            typing.remove()
            addMessage(response,false)
        } catch (error) {
            typing.remove()
            const errorMessage = addErrorMessage(error.message);
        } finally {
            sendButton.disabled=false
        }
    })

    async function generateResponse(prompt) {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyA-PexBwPpzu_-xAkwnOTM306CKDbS2Kvw`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            }
            )
        }

        );
        if (!response.ok) {
            throw new Error("Failed to generate response. Please try again later!");
        }
        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        const formattedText = formatBoldText(text)
        return formattedText;
    };

    function addMessage(text,isUser) {
        const message = document.createElement("div");
        message.className = `message ${isUser ? "user-message" : ""}`;
        message.innerHTML = `
        <div class = "avatar ${isUser ? 'user-avatar' : ""}"> ${isUser ? "U" : "AI"} </div>
        <div class="message-content">${text}</div>
        `;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function typeLoading() {
        const indicator = document.createElement("div");
        indicator.className = "message";
        indicator.innerHTML = `
        <div class="avatar">AI</div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        `;
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indicator;
    };

    function addErrorMessage(text) {
        const error = document.createElement("div");
        error.className = "message";
        error.innerHTML = `
                <div class="avatar">AI</div>
                <div class="message-content" style="color:red;">Error ${text}</div>
        `;
        chatMessages.appendChild(error);
        return error;
    }

    function formatBoldText(responseText) {
        responseText = responseText.replace(/\*\s\*\*(.*?)\*\*/g, "<br><br><b>$1</b>");
        responseText = responseText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
        return responseText;
    }
    
});