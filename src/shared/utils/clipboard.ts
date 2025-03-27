export const copyToClipboard = async (text: string, onSuccess: () => void, onFail: () => void): Promise<void> => {
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            onSuccess()
            console.log("Copied to clipboard successfully!");
        } catch (err) {
            onFail()
            console.error("Failed to copy text to clipboard: ", err);
        }
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";  // ป้องกันจากการ Scroll
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            onSuccess()
            console.log("Copied to clipboard using fallback!");
        } catch (err) {
            onFail()
            console.error("Fallback: Could not copy text to clipboard: ", err);
        }

        document.body.removeChild(textArea);
    }
};