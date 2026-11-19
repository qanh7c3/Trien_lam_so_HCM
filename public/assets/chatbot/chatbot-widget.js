const CHAT_ENDPOINT = "/api/chat";

(function () {
  function initChatbot() {
    if (document.getElementById("lf-chatbot-root")) return;

    const root = document.createElement("div");
    root.id = "lf-chatbot-root";

    const trigger = document.createElement("button");
    trigger.className = "lf-widget-trigger";
    trigger.setAttribute("aria-label", "Mở khung chat");
    trigger.innerHTML = `
      <svg viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
      </svg>
    `;

    const chatWindow = document.createElement("div");
    chatWindow.className = "lf-widget-window";
    chatWindow.innerHTML = `
      <div class="lf-widget-header">
        <div class="lf-widget-header-title">
          <div class="lf-widget-avatar">AI</div>
          <div>
            <div class="lf-widget-name">Trợ Lý AI Triển Lãm</div>
            <div class="lf-widget-status">Sẵn sàng phản hồi</div>
          </div>
        </div>
        <div class="lf-widget-actions">
          <button id="lf-toggle-theme" class="lf-icon-btn" title="Chuyển chế độ sáng/tối" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          <button id="lf-clear-chat" class="lf-icon-btn" title="Xóa hội thoại" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
          <button id="lf-close-chat" class="lf-icon-btn" title="Đóng" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <div class="lf-widget-messages" id="lf-messages-container">
        <div class="lf-message lf-message-bot">Xin chào! Tôi là Trợ lý AI của Triển Lãm Số Hồ Chí Minh. Tôi có thể giúp gì cho bạn dựa trên kho tài liệu lịch sử đã được kiểm chứng?</div>
        <div class="lf-typing-indicator" id="lf-typing">
          <div class="lf-dot"></div>
          <div class="lf-dot"></div>
          <div class="lf-dot"></div>
        </div>
      </div>
      <form class="lf-widget-input-area" id="lf-chat-form">
        <textarea class="lf-widget-input" id="lf-input" placeholder="Đặt câu hỏi về tư liệu lịch sử..." rows="1"></textarea>
        <button class="lf-widget-send" id="lf-send-btn" type="submit" aria-label="Gửi tin nhắn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    `;

    root.appendChild(trigger);
    root.appendChild(chatWindow);
    document.body.appendChild(root);

    const messagesContainer = chatWindow.querySelector("#lf-messages-container");
    const typingIndicator = chatWindow.querySelector("#lf-typing");
    const chatForm = chatWindow.querySelector("#lf-chat-form");
    const inputField = chatWindow.querySelector("#lf-input");
    const sendBtn = chatWindow.querySelector("#lf-send-btn");
    const closeBtn = chatWindow.querySelector("#lf-close-chat");
    const clearBtn = chatWindow.querySelector("#lf-clear-chat");
    const themeBtn = chatWindow.querySelector("#lf-toggle-theme");

    let isOpen = false;
    let isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (isDark) {
      chatWindow.classList.add("lf-dark");
    } else {
      chatWindow.classList.add("lf-light");
    }

    trigger.addEventListener("click", function () {
      isOpen = !isOpen;
      if (isOpen) {
        chatWindow.classList.add("lf-open");
        inputField.focus();
      } else {
        chatWindow.classList.remove("lf-open");
      }
    });

    closeBtn.addEventListener("click", function () {
      isOpen = false;
      chatWindow.classList.remove("lf-open");
    });

    themeBtn.addEventListener("click", function () {
      isDark = !isDark;
      if (isDark) {
        chatWindow.classList.remove("lf-light");
        chatWindow.classList.add("lf-dark");
      } else {
        chatWindow.classList.remove("lf-dark");
        chatWindow.classList.add("lf-light");
      }
    });

    clearBtn.addEventListener("click", function () {
      messagesContainer.innerHTML = `
        <div class="lf-message lf-message-bot">Hội thoại đã được làm mới. Hãy đặt câu hỏi về các tài liệu lịch sử để tôi hỗ trợ bạn!</div>
        <div class="lf-typing-indicator" id="lf-typing">
          <div class="lf-dot"></div>
          <div class="lf-dot"></div>
          <div class="lf-dot"></div>
        </div>
      `;
    });

    inputField.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event("submit"));
      }
    });

    chatForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const message = inputField.value.trim();
      if (!message) return;

      appendMessage(message, "user");
      inputField.value = "";
      inputField.style.height = "auto";
      sendBtn.disabled = true;

      const typing = messagesContainer.querySelector("#lf-typing");
      if (typing) {
        messagesContainer.appendChild(typing);
        typing.classList.add("lf-active");
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }

      try {
        const response = await fetch(CHAT_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ message })
        });

        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }

        const data = await response.json();
        let botText = "";

        if (data?.text) {
          botText = data.text;
        } else if (data?.outputs?.[0]?.outputs?.[0]?.results?.message?.text) {
          botText = data.outputs[0].outputs[0].results.message.text;
        } else if (data?.outputs?.[0]?.outputs?.[0]?.artifacts?.message) {
          botText = data.outputs[0].outputs[0].artifacts.message;
        } else if (typeof data === "string") {
          botText = data;
        } else if (data?.result) {
          botText = typeof data.result === "string" ? data.result : JSON.stringify(data.result);
        } else {
          botText = "Không nhận được phản hồi phù hợp từ hệ thống Trợ lý AI.";
        }

        appendMessage(botText, "bot");
      } catch (err) {
        appendMessage("Không thể kết nối tới máy chủ Trợ lý AI. Vui lòng thử lại sau giây lát.", "bot");
      } finally {
        if (typing) {
          typing.classList.remove("lf-active");
        }
        sendBtn.disabled = false;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    });

    function appendMessage(text, sender) {
      const msgDiv = document.createElement("div");
      msgDiv.className = "lf-message lf-message-" + sender;
      msgDiv.textContent = text;
      const typing = messagesContainer.querySelector("#lf-typing");
      if (typing) {
        messagesContainer.insertBefore(msgDiv, typing);
      } else {
        messagesContainer.appendChild(msgDiv);
      }
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatbot);
  } else {
    initChatbot();
  }
})();
