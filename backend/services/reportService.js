const { PythonShell } = require('python-shell');
const path = require('path');
const os = require('os');

// Define o executável do Python de acordo com o sistema operacional
const pythonExecutable = os.platform() === 'win32'
    ? path.join(__dirname, '../../.venv/Scripts/python.exe') 
    : path.join(__dirname, '../../.venv/bin/python');

// Configurações padrão do PythonShell
PythonShell.defaultOptions = {
    pythonPath: pythonExecutable,
};

async function exportUsersReport() {
    const scriptPath = path.join(__dirname, '../reports/export_users.py');

    return new Promise((resolve, reject) => {
        const pythonProcess = new PythonShell(scriptPath, {
            pythonOptions: ['-u'], // Saída sem buffer
        });

        let stdout = [];
        let stderr = [];

        // Captura saída padrão
        pythonProcess.stdout.on('data', (data) => {
            stdout.push(data.toString());
            console.log(`stdout: ${data}`);
        });

        // Captura erros
        pythonProcess.stderr.on('data', (data) => {
            stderr.push(data.toString());
            console.error(`stderr: ${data}`);
        });

        // Evento de finalização do processo
        pythonProcess.on('close', (code) => {
            console.log(`Código de saída do Python: ${code}`);
            const output = stdout.join('\n');
            if (output.includes("STATUS: SUCCESS")) {
                console.log("Processo Python concluído com sucesso.");
                resolve(path.join(__dirname, '../../relatorios/usuarios.csv'));
            } else if (output.includes("STATUS: ERROR")) {
                console.error(`Erro no script Python: ${stderr.join('\n')}`);
                reject(new Error(`Erro ao executar script Python: ${stderr.join('\n')}`));
            } else {
                console.error(`Código de saída indefinido ou inesperado.`);
                reject(new Error(`Erro ao exportar CSV: saída não reconhecida.`));
            }
        });

        // Trata o evento de erro diretamente no processo Python
        pythonProcess.on('error', (error) => {
            console.error(`Erro no processo Python: ${error.message}`);
            reject(new Error(`Erro inesperado no processo Python: ${error.message}`));
        });
    });
}

module.exports = {
    exportUsersReport,
};
