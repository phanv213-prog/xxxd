function xorString(input, key) {
    return input.split('').map((char, index) => {
        return String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(index % key.length));
    }).join('');
}

function caesarCipher(input, shift) {
    return input.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const base = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char; // Non-alphabetic characters are not changed
    }).join('');
}

function obfuscate(jsonObject) {
    const jsonString = JSON.stringify(jsonObject);
    const xorKey = 'secret'; // Key for XOR
    const xorResult = xorString(jsonString, xorKey);
    const caesarResult = caesarCipher(xorResult, 3); // Shift by 3 for Caesar cipher
    return btoa(caesarResult); // Base64 encode
}

function deobfuscate(obfuscatedString) {
    const caesarResult = atob(obfuscatedString); // Decode from Base64
    const caesarReversed = caesarCipher(caesarResult, -3); // Reverse Caesar cipher
    const xorKey = 'secret'; // Key for XOR
    const originalJsonString = xorString(caesarReversed, xorKey);
    return JSON.parse(originalJsonString);
}

document.getElementById('obfuscateBtn').addEventListener('click', function() {
    const jsonInput = document.getElementById('jsonInput').value;

    try {
        const jsonObject = JSON.parse(jsonInput);
        const obfuscated = obfuscate(jsonObject);
        document.getElementById('obfuscatedOutput').textContent = obfuscated;
        document.getElementById('deobfuscatedOutput').textContent = ''; // Clear previous output
    } catch (error) {
        alert('Invalid JSON input. Please enter valid JSON.');
    }
});

document.getElementById('deobfuscateBtn').addEventListener('click', function() {
    const obfuscatedInput = document.getElementById('obfuscatedOutput').textContent;

    try {
        const deobfuscated = deobfuscate(obfuscatedInput);
        document.getElementById('deobfuscatedOutput').textContent = JSON.stringify(deobfuscated, null, 2);
    } catch (error) {
        alert('Invalid obfuscated input. Please obfuscate JSON first.');
    }
});