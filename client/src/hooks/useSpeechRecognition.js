import { useRef, useState } from "react";

const useSpeechRecognition = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");

    const recognitionRef = useRef(null);
    const shouldListenRef = useRef(false);
    const finalTranscriptRef = useRef("");


    const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser");
            return;
        }

        if(shouldListenRef.current) return;

        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognitionRef.current = recognition;
        shouldListenRef.current = true

        finalTranscriptRef.current = ""
        setTranscript("")

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            let intrimText = "";

            for (let i = event.resultIndex;i < event.results.length;i++){
                const result = event.results[i];
                const text = result[0].transcript

                if(result.isFinal){
                    finalTranscriptRef.current += text + " "
                }
                else{
                    intrimText+=text;
                }
            }

            setTranscript(finalTranscriptRef.current+intrimText);
        };

        recognition.onerror = (event) => {
            console.error(
                "Speech recognition error:",
                event.error
            );
            shouldListenRef.current = false
            setIsListening(false);
        };

        recognition.onend = () => {
            if(shouldListenRef.current){
                try{
                    recognition.start()
                }catch(err){
                    console.warn("Recognition restart failed: ",err)
                }
            }
            else{
                setIsListening(false);
            }
        };
        try {
            recognition.start();
        } catch (err) {
            console.error("Could not start recognition:", err);
            shouldListenRef.current = false;
            recognitionRef.current = null;
            setIsListening(false);
        }

    };

    const stopListening = () => {
        shouldListenRef.current=false
        recognitionRef.current?.stop();
        recognitionRef.current = null;
        setIsListening(false);
        return finalTranscriptRef.current.trim();
    };

    const resetTranscript = () => {
        finalTranscriptRef.current = "";
        setTranscript("");
    };

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
        resetTranscript
    };
};

export default useSpeechRecognition;