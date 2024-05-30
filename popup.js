document.addEventListener('DOMContentLoaded', function () {
    // 恢复数据
    restoreData();

    document.getElementById('generate').addEventListener('click', generateOutput);
    document.getElementById('clear').addEventListener('click', clearInputs);

    // 保存数据
    const inputs = ['context', 'object', 'style', 'tone', 'audience', 'response'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            saveData();
        });
    });
});

function saveData() {
    const data = {
        context: document.getElementById('context').value.trim(),
        object: document.getElementById('object').value.trim(),
        style: document.getElementById('style').value.trim(),
        tone: document.getElementById('tone').value.trim(),
        audience: document.getElementById('audience').value.trim(),
        response: document.getElementById('response').value.trim(),
        output: document.getElementById('output').value.trim()
    };
    chrome.storage.local.set({ textData: data });
}

function restoreData() {
    chrome.storage.local.get('textData', function(result) {
        if (result.textData) {
            document.getElementById('context').value = result.textData.context || '';
            document.getElementById('object').value = result.textData.object || '';
            document.getElementById('style').value = result.textData.style || '';
            document.getElementById('tone').value = result.textData.tone || '';
            document.getElementById('audience').value = result.textData.audience || '';
            document.getElementById('response').value = result.textData.response || '';
            document.getElementById('output').value = result.textData.output || '';
        }
    });
}

function generateOutput() {
    const context = document.getElementById('context').value.trim();
    const object_ = document.getElementById('object').value.trim();
    const style = document.getElementById('style').value.trim();
    const tone = document.getElementById('tone').value.trim();
    const audience = document.getElementById('audience').value.trim();
    const response = document.getElementById('response').value.trim();

    const output = `
##context
"${context}"

##object
"${object_}"

##style
"${style}"

##tone
"${tone}"

##audience
"${audience}"

##response
"${response}"
`;
    document.getElementById('output').value = output;

    // 保存生成的输出
    saveData();
}

function clearInputs() {
    const inputs = ['context', 'object', 'style', 'tone', 'audience', 'response', 'output'];
    inputs.forEach(id => {
        document.getElementById(id).value = '';
    });
    chrome.storage.local.remove('textData');
}
