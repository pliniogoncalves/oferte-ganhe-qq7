const { PythonShell } = require('python-shell');
const path = require('path');
const os = require('os');

const pythonExecutable = os.platform() === 'win32'
    ? path.join(__dirname, '../../.venv/Scripts/python.exe') 
    : path.join(__dirname, '../../.venv/bin/python');

PythonShell.defaultOptions = {
    pythonPath: pythonExecutable,
};

async function exportUsersReport() {
    const scriptPath = path.join(__dirname, '../reports/export_users.py');

    return new Promise((resolve, reject) => {
        const pythonProcess = new PythonShell(scriptPath, {
            pythonOptions: ['-u'],
        });

        let stdout = [];
        let stderr = [];

        console.log(`Executando script Python em: ${scriptPath}`);
        console.log(`Usando Python executável: ${pythonExecutable}`);

        pythonProcess.on('message', (message) => {
            console.log(`stdout: ${message}`);
            stdout.push(message);
        });

        pythonProcess.on('stderr', (stderrMessage) => {
            console.error(`stderr: ${stderrMessage}`);
            stderr.push(stderrMessage);
        });

        pythonProcess.on('close', () => {
            console.log("Processo Python finalizado.");
        });

        pythonProcess.end((err, code, signal) => {
            if(err){
                console.error(`Erro no processo Python: ${err.message}`);
                return reject(new Error(`Erro inesperado no processo Python: ${err.message}`));
            }
            console.log(`Código de saída do Python: ${code}`);
            const output = stdout.join('\n');
            if(code === 0 && output.includes("STATUS: SUCCESS")){
                console.log("Processo Python concluído com sucesso.");
                resolve(path.join(__dirname, '../../relatorios/usuarios.csv'));
            }else{
                console.error(`Erro no script Python: ${stderr.join('\n')}`);
                reject(new Error(`Erro ao exportar CSV: saída não reconhecida ou código de erro ${code}.`));
            }
        });
    });
}

async function exportStoresReport() {
    const scriptPath = path.join(__dirname, '../reports/export_stores.py');

    return new Promise((resolve, reject) => {
        const pythonProcess = new PythonShell(scriptPath, {
            pythonOptions: ['-u'],
        });

        let stdout = [];
        let stderr = [];

        console.log(`Executando script Python em: ${scriptPath}`);
        console.log(`Usando Python executável: ${pythonExecutable}`);

        pythonProcess.on('message', (message) => {
            console.log(`stdout: ${message}`);
            stdout.push(message);
        });

        pythonProcess.on('stderr', (stderrMessage) => {
            console.error(`stderr: ${stderrMessage}`);
            stderr.push(stderrMessage);
        });

        pythonProcess.on('close', () => {
            console.log("Processo Python finalizado.");
        });

        pythonProcess.end((err, code, signal) => {
            if(err){
                console.error(`Erro no processo Python: ${err.message}`);
                return reject(new Error(`Erro inesperado no processo Python: ${err.message}`));
            }
            console.log(`Código de saída do Python: ${code}`);
            const output = stdout.join('\n');
            if(code === 0 && output.includes("STATUS: SUCCESS")){
                console.log("Processo Python concluído com sucesso.");
                resolve(path.join(__dirname, '../../relatorios/lojas.csv'));
            }else{
                console.error(`Erro no script Python: ${stderr.join('\n')}`);
                reject(new Error(`Erro ao exportar CSV: saída não reconhecida ou código de erro ${code}.`));
            }
        });
    });
}

async function exportProfilesReport() {
    const scriptPath = path.join(__dirname, '../reports/export_profiles.py');

    return new Promise((resolve, reject) => {
        const pythonProcess = new PythonShell(scriptPath, {
            pythonOptions: ['-u'],
        });

        let stdout = [];
        let stderr = [];

        console.log(`Executando script Python em: ${scriptPath}`);
        console.log(`Usando Python executável: ${pythonExecutable}`);

        pythonProcess.on('message', (message) => {
            console.log(`stdout: ${message}`);
            stdout.push(message);
        });

        pythonProcess.on('stderr', (stderrMessage) => {
            console.error(`stderr: ${stderrMessage}`);
            stderr.push(stderrMessage);
        });

        pythonProcess.on('close', () => {
            console.log("Processo Python finalizado.");
        });

        pythonProcess.end((err, code, signal) => {
            if(err){
                console.error(`Erro no processo Python: ${err.message}`);
                return reject(new Error(`Erro inesperado no processo Python: ${err.message}`));
            }
            console.log(`Código de saída do Python: ${code}`);
            const output = stdout.join('\n');
            if(code === 0 && output.includes("STATUS: SUCCESS")){
                console.log("Processo Python concluído com sucesso.");
                resolve(path.join(__dirname, '../../relatorios/perfis.csv'));
            }else{
                console.error(`Erro no script Python: ${stderr.join('\n')}`);
                reject(new Error(`Erro ao exportar CSV: saída não reconhecida ou código de erro ${code}.`));
            }
        });
    });
}

async function exportStocksReport() {
    const scriptPath = path.join(__dirname, '../reports/export_stocks.py');

    return new Promise((resolve, reject) => {
        const pythonProcess = new PythonShell(scriptPath, {
            pythonOptions: ['-u'],
        });

        let stdout = [];
        let stderr = [];

        console.log(`Executando script Python em: ${scriptPath}`);
        console.log(`Usando Python executável: ${pythonExecutable}`);

        pythonProcess.on('message', (message) => {
            console.log(`stdout: ${message}`);
            stdout.push(message);
        });

        pythonProcess.on('stderr', (stderrMessage) => {
            console.error(`stderr: ${stderrMessage}`);
            stderr.push(stderrMessage);
        });

        pythonProcess.on('close', () => {
            console.log("Processo Python finalizado.");
        });

        pythonProcess.end((err, code, signal) => {
            if(err){
                console.error(`Erro no processo Python: ${err.message}`);
                return reject(new Error(`Erro inesperado no processo Python: ${err.message}`));
            }
            console.log(`Código de saída do Python: ${code}`);
            const output = stdout.join('\n');
            if(code === 0 && output.includes("STATUS: SUCCESS")){
                console.log("Processo Python concluído com sucesso.");
                resolve(path.join(__dirname, '../../relatorios/estoques.csv'));
            }else{
                console.error(`Erro no script Python: ${stderr.join('\n')}`);
                reject(new Error(`Erro ao exportar CSV: saída não reconhecida ou código de erro ${code}.`));
            }
        });
    });
}

module.exports = {
    exportUsersReport,
    exportStoresReport,
    exportProfilesReport,
    exportStocksReport,
};
