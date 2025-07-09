export const parseSuggestions = (rawText) => {
            return rawText
                        .split("\n") // Split into lines
                        .map(line => {
                                    const match = line.match(/\*\*(.+?)\*\*/); // Match content inside bold ** **
                                    return match ? match[1].trim() : null; // Extract the actual suggestion
                        })
                        .filter(Boolean); // Remove nulls or empty lines
};




export const cleanAIText = (text) => {
            // Remove emphasis: *like this* → like this
            let cleaned = text.replace(/\*(.*?)\*/g, '$1');

            // Optionally remove any remaining standalone asterisks
            cleaned = cleaned.replace(/\*/g, '');

            return [cleaned];
}
