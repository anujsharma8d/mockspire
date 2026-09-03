import { useRef, useState } from "react";

const useSpeechRecognition = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");

    const recognitionRef = useRef(null);

    const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            let text = "";

            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {
                text += event.results[i][0].transcript;
            }

            setTranscript(text);
        };

        recognition.onerror = (event) => {
            console.error(
                "Speech recognition error:",
                event.error
            );

            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;

        recognition.start();
    };

    const stopListening = () => {
        recognitionRef.current?.stop();
        recognitionRef.current = null;
        setIsListening(false);
    };

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
    };
};

export default useSpeechRecognition;