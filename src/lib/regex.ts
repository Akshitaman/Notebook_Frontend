export const LANGUAGE_PATTERNS = {
    javascript: [
        { name: 'keyword', pattern: /\b(const|let|var|function|return|if|else|for|while|import|export|class|new|this|async|await)\b/g },
        { name: 'string', pattern: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g },
        { name: 'comment', pattern: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g },
        { name: 'number', pattern: /\b(\d+)\b/g },
    ],
    c: [
        { name: 'keyword', pattern: /\b(int|char|float|double|if|else|for|while|return|void|include|define|struct|typedef)\b/g },
        { name: 'string', pattern: /("(?:[^"\\]|\\.)*")/g },
        { name: 'comment', pattern: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g },
    ],
    java: [
        { name: 'keyword', pattern: /\b(public|private|protected|class|interface|extends|implements|static|final|void|int|double|float|long|boolean|if|else|for|while|return|new|new|this|super|package|import)\b/g },
        { name: 'string', pattern: /("(?:[^"\\]|\\.)*")/g },
        { name: 'comment', pattern: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g },
    ],
};

export const HTML_CLEANER_PATTERN = /<\/?span[^>]*>/g;
